'use strict';

const path = require('path');
const crypto = require('crypto');
const express = require('express');
const helmet = require('helmet');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

/* ====================================================================
   AI models (OpenRouter)
   Models are tried in order; if one is unavailable or rate-limited,
   the next is used. Override on Render with OPENROUTER_MODEL
   (comma-separated list), e.g. OPENROUTER_MODEL=google/gemini-3.8-flash
   ==================================================================== */
const MODELS = (process.env.OPENROUTER_MODEL || 'apodex/apodex-1.1-mini:free')
  .split(',')
  .map((m) => m.trim())
  .filter(Boolean);
const FALLBACK_STATUSES = [400, 402, 404, 408, 429, 500, 502, 503, 504];
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

const SYSTEM_PROMPT =
  'You are TitanAI, a helpful, precise and friendly AI assistant. ' +
  'Always reply in the same language the user writes in.';

const EFFORT_HINTS = {
  low: 'Keep answers short and to the point.',
  medium: 'Give balanced answers: clear and reasonably detailed.',
  high: 'Give thorough, well-structured and detailed answers, reasoning step by step when useful.',
};
const MODE_HINTS = {
  work:
    'You are in Work mode: act as a professional productivity assistant. ' +
    'Be structured, concise and action-oriented (plans, drafts, checklists).',
};

function buildSystemPrompt({ mode, effort, instructions, userName }) {
  const parts = [SYSTEM_PROMPT];
  if (MODE_HINTS[mode]) parts.push(MODE_HINTS[mode]);
  if (EFFORT_HINTS[effort]) parts.push(EFFORT_HINTS[effort]);
  if (typeof userName === 'string' && userName.trim()) {
    parts.push(`The user's name is ${userName.trim().slice(0, 60)}.`);
  }
  if (typeof instructions === 'string' && instructions.trim()) {
    parts.push('Custom instructions from the user: ' + instructions.trim().slice(0, 1000));
  }
  return parts.join(' ');
}

const MAX_MESSAGE_LEN = 12000;
const MAX_HISTORY = 20;

/* ====================================================================
   Database (PostgreSQL via DATABASE_URL) - used for accounts & chat sync
   ==================================================================== */
const SCHEMA = `
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  pass_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS user_data (
  user_id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  data JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
`;

let pool = null;
if (process.env.DATABASE_URL) {
  const { Pool } = require('pg');
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_SSL === 'false' ? false : { rejectUnauthorized: false },
    max: 5,
  });
  pool.on('error', (e) => console.error('DB pool error:', e.message));
  pool
    .query(SCHEMA)
    .then(() => console.log('Database ready'))
    .catch((e) => console.error('Database init failed:', e.message));
} else {
  console.warn('DATABASE_URL is not set: accounts are disabled (guest mode only).');
}

/* ====================================================================
   Auth helpers (built-in crypto only: scrypt + HMAC-signed cookie)
   ==================================================================== */
const COOKIE = 'titanai_session';
const SESSION_MS = 30 * 24 * 60 * 60 * 1000;
const SECRET =
  process.env.SESSION_SECRET ||
  (() => {
    console.warn('SESSION_SECRET is not set: using a random one (everyone is logged out on each restart).');
    return crypto.randomBytes(32).toString('hex');
  })();

const scrypt = (pw, salt) =>
  new Promise((resolve, reject) => crypto.scrypt(pw, salt, 64, (e, k) => (e ? reject(e) : resolve(k))));

async function hashPassword(pw) {
  const salt = crypto.randomBytes(16);
  const key = await scrypt(pw, salt);
  return `scrypt$${salt.toString('base64')}$${key.toString('base64')}`;
}

async function verifyPassword(pw, stored) {
  const [alg, s, k] = String(stored).split('$');
  if (alg !== 'scrypt' || !s || !k) return false;
  const key = await scrypt(pw, Buffer.from(s, 'base64'));
  const expected = Buffer.from(k, 'base64');
  return expected.length === key.length && crypto.timingSafeEqual(expected, key);
}

const sign = (payload) => crypto.createHmac('sha256', SECRET).update(payload).digest('base64url');

function signToken(uid) {
  const payload = Buffer.from(JSON.stringify({ uid, exp: Date.now() + SESSION_MS })).toString('base64url');
  return `${payload}.${sign(payload)}`;
}

function readToken(token) {
  if (typeof token !== 'string') return null;
  const [payload, sig] = token.split('.');
  if (!payload || !sig) return null;
  const a = Buffer.from(sig);
  const b = Buffer.from(sign(payload));
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  try {
    const p = JSON.parse(Buffer.from(payload, 'base64url').toString());
    return p && p.uid && p.exp > Date.now() ? p : null;
  } catch (e) {
    return null;
  }
}

function getCookie(req, name) {
  const h = req.headers.cookie;
  if (!h) return null;
  for (const part of h.split(';')) {
    const i = part.indexOf('=');
    if (i > 0 && part.slice(0, i).trim() === name) return decodeURIComponent(part.slice(i + 1).trim());
  }
  return null;
}

function setSession(req, res, uid) {
  const parts = [`${COOKIE}=${signToken(uid)}`, 'HttpOnly', 'SameSite=Lax', 'Path=/', `Max-Age=${SESSION_MS / 1000}`];
  if (req.secure) parts.push('Secure');
  res.setHeader('Set-Cookie', parts.join('; '));
}

function clearSession(req, res) {
  const parts = [`${COOKIE}=`, 'HttpOnly', 'SameSite=Lax', 'Path=/', 'Max-Age=0'];
  if (req.secure) parts.push('Secure');
  res.setHeader('Set-Cookie', parts.join('; '));
}

function normEmail(v) {
  if (typeof v !== 'string') return '';
  const e = v.trim().toLowerCase();
  return e.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e) ? e : '';
}

function requireDb(req, res, next) {
  if (!pool) return res.status(503).json({ error: 'Профилите не са настроени на сървъра (липсва DATABASE_URL).' });
  next();
}

function requireAuth(req, res, next) {
  const p = readToken(getCookie(req, COOKIE));
  if (!p) return res.status(401).json({ error: 'Не си влязъл в акаунта.' });
  req.uid = p.uid;
  next();
}

/* ====================================================================
   Express setup
   ==================================================================== */
app.disable('x-powered-by');
app.set('trust proxy', 1);
app.use(helmet());
app.use('/api/data', express.json({ limit: '3mb' })); // chat history can be larger
app.use(express.json({ limit: '500kb' }));

// Static files (only the two public files, so server.js / package.json stay private)
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/index.html', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/app.js', (req, res) => res.sendFile(path.join(__dirname, 'app.js')));

// Tiny in-memory rate limiter (per IP + bucket, per minute)
const hits = new Map();
function limiter(name, max) {
  return (req, res, next) => {
    const now = Date.now();
    const key = `${name}:${req.ip}`;
    const entry = hits.get(key) || { count: 0, start: now };
    if (now - entry.start > 60 * 1000) {
      entry.count = 0;
      entry.start = now;
    }
    entry.count += 1;
    hits.set(key, entry);
    if (entry.count > max) {
      return res.status(429).json({ error: 'Твърде много заявки. Опитай след малко.' });
    }
    next();
  };
}
setInterval(() => {
  const now = Date.now();
  for (const [k, e] of hits) if (now - e.start > 60 * 1000) hits.delete(k);
}, 60 * 1000).unref();

/* ====================================================================
   Auth routes
   ==================================================================== */
app.post('/api/auth/register', requireDb, limiter('auth', 10), async (req, res) => {
  const email = normEmail(req.body?.email);
  const password = typeof req.body?.password === 'string' ? req.body.password : '';
  let name = typeof req.body?.name === 'string' ? req.body.name.trim().slice(0, 40) : '';

  if (!email) return res.status(400).json({ error: 'Въведи валиден имейл.' });
  if (password.length < 8 || password.length > 200) {
    return res.status(400).json({ error: 'Паролата трябва да е поне 8 символа.' });
  }
  if (!name) name = email.split('@')[0].slice(0, 40);

  try {
    const hash = await hashPassword(password);
    const r = await pool.query(
      'INSERT INTO users (email, name, pass_hash) VALUES ($1, $2, $3) RETURNING id, email, name',
      [email, name, hash]
    );
    setSession(req, res, r.rows[0].id);
    res.json({ user: r.rows[0] });
  } catch (e) {
    if (e.code === '23505') return res.status(409).json({ error: 'Този имейл вече е регистриран.' });
    console.error('register error:', e.message);
    res.status(500).json({ error: 'Грешка при регистрацията. Опитай пак.' });
  }
});

app.post('/api/auth/login', requireDb, limiter('auth', 10), async (req, res) => {
  const email = normEmail(req.body?.email);
  const password = typeof req.body?.password === 'string' ? req.body.password : '';
  if (!email || !password || password.length > 200) {
    return res.status(400).json({ error: 'Въведи имейл и парола.' });
  }
  try {
    const r = await pool.query('SELECT id, email, name, pass_hash FROM users WHERE email = $1', [email]);
    const u = r.rows[0];
    let ok = false;
    if (u) ok = await verifyPassword(password, u.pass_hash);
    else await scrypt(password, Buffer.alloc(16)); // same cost, no timing leak
    if (!ok) return res.status(401).json({ error: 'Грешен имейл или парола.' });
    setSession(req, res, u.id);
    res.json({ user: { id: u.id, email: u.email, name: u.name } });
  } catch (e) {
    console.error('login error:', e.message);
    res.status(500).json({ error: 'Грешка при влизането. Опитай пак.' });
  }
});

app.post('/api/auth/logout', (req, res) => {
  clearSession(req, res);
  res.json({ ok: true });
});

app.get('/api/auth/me', async (req, res) => {
  if (!pool) return res.json({ user: null });
  const p = readToken(getCookie(req, COOKIE));
  if (!p) return res.json({ user: null });
  try {
    const r = await pool.query('SELECT id, email, name FROM users WHERE id = $1', [p.uid]);
    if (!r.rows[0]) {
      clearSession(req, res);
      return res.json({ user: null });
    }
    res.json({ user: r.rows[0] });
  } catch (e) {
    console.error('me error:', e.message);
    res.json({ user: null });
  }
});

app.put('/api/auth/name', requireDb, requireAuth, async (req, res) => {
  const name = typeof req.body?.name === 'string' ? req.body.name.trim().slice(0, 40) : '';
  if (!name) return res.status(400).json({ error: 'Името не може да е празно.' });
  try {
    const r = await pool.query('UPDATE users SET name = $1 WHERE id = $2 RETURNING id, email, name', [name, req.uid]);
    res.json({ user: r.rows[0] });
  } catch (e) {
    console.error('name error:', e.message);
    res.status(500).json({ error: 'Грешка при запис.' });
  }
});

app.delete('/api/auth/account', requireDb, requireAuth, limiter('auth', 10), async (req, res) => {
  const password = typeof req.body?.password === 'string' ? req.body.password : '';
  try {
    const r = await pool.query('SELECT pass_hash FROM users WHERE id = $1', [req.uid]);
    if (!r.rows[0] || !(await verifyPassword(password, r.rows[0].pass_hash))) {
      return res.status(401).json({ error: 'Грешна парола.' });
    }
    await pool.query('DELETE FROM users WHERE id = $1', [req.uid]);
    clearSession(req, res);
    res.json({ ok: true });
  } catch (e) {
    console.error('delete account error:', e.message);
    res.status(500).json({ error: 'Грешка при изтриването.' });
  }
});

/* ====================================================================
   Chat sync (per account)
   ==================================================================== */
function cleanData(d) {
  if (!d || typeof d !== 'object') return null;
  const sessions = (Array.isArray(d.sessions) ? d.sessions : [])
    .slice(0, 300)
    .filter((s) => s && typeof s.id === 'string' && Array.isArray(s.messages))
    .map((s) => ({
      id: s.id.slice(0, 64),
      title: String(s.title || 'Нов чат').slice(0, 100),
      pinned: !!s.pinned,
      updated: Number(s.updated) || Date.now(),
      messages: s.messages
        .slice(0, 500)
        .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
        .map((m) => ({ role: m.role, content: m.content.slice(0, 50000) })),
    }));
  const p = d.profile && typeof d.profile === 'object' ? d.profile : {};
  return {
    sessions,
    profile: { name: String(p.name || '').slice(0, 40), instructions: String(p.instructions || '').slice(0, 1000) },
    effort: ['low', 'medium', 'high'].includes(d.effort) ? d.effort : 'medium',
    mode: d.mode === 'work' ? 'work' : 'chat',
    pinnedOpen: d.pinnedOpen !== false,
  };
}

app.get('/api/data', requireDb, requireAuth, async (req, res) => {
  try {
    const r = await pool.query('SELECT data FROM user_data WHERE user_id = $1', [req.uid]);
    res.json({ data: r.rows[0] ? r.rows[0].data : null });
  } catch (e) {
    console.error('data get error:', e.message);
    res.status(500).json({ error: 'Грешка при зареждане на данните.' });
  }
});

app.put('/api/data', requireDb, requireAuth, limiter('data', 60), async (req, res) => {
  const data = cleanData(req.body?.data);
  if (!data) return res.status(400).json({ error: 'Невалидни данни.' });
  try {
    await pool.query(
      `INSERT INTO user_data (user_id, data, updated_at) VALUES ($1, $2, now())
       ON CONFLICT (user_id) DO UPDATE SET data = EXCLUDED.data, updated_at = now()`,
      [req.uid, JSON.stringify(data)]
    );
    res.json({ ok: true });
  } catch (e) {
    console.error('data put error:', e.message);
    res.status(500).json({ error: 'Грешка при запис на данните.' });
  }
});

/* ====================================================================
   Chat route (works for guests and logged-in users)
   ==================================================================== */
function sanitizeHistory(history) {
  if (!Array.isArray(history)) return [];
  return history
    .filter(
      (m) =>
        m &&
        (m.role === 'user' || m.role === 'assistant') &&
        typeof m.content === 'string' &&
        m.content.trim()
    )
    .slice(-MAX_HISTORY)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_MESSAGE_LEN) }));
}

function callModel(model, messages) {
  return axios.post(
    OPENROUTER_URL,
    { model, messages },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.APP_URL || `http://localhost:${PORT}`,
        'X-Title': 'TitanAI',
      },
      timeout: 60000,
    }
  );
}

app.post('/api/chat', limiter('chat', 20), async (req, res) => {
  const { message, history, mode, effort, instructions, userName } = req.body || {};

  if (typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ error: 'Message is required.' });
  }
  if (!process.env.OPENROUTER_API_KEY) {
    return res.status(500).json({ error: 'Server is missing OPENROUTER_API_KEY.' });
  }

  const messages = [
    { role: 'system', content: buildSystemPrompt({ mode, effort, instructions, userName }) },
    ...sanitizeHistory(history),
    { role: 'user', content: message.slice(0, MAX_MESSAGE_LEN) },
  ];

  let lastStatus = 500;
  let lastDetail = 'Unknown error';
  const failures = [];

  for (let i = 0; i < MODELS.length; i += 1) {
    const model = MODELS[i];
    try {
      const response = await callModel(model, messages);
      const reply = response.data?.choices?.[0]?.message?.content;
      if (reply && reply.trim()) {
        return res.json({ reply, model });
      }
      lastStatus = 502;
      lastDetail = `Empty response from ${model}.`;
      failures.push(lastDetail);
    } catch (err) {
      lastStatus = err.response?.status || 500;
      lastDetail = err.response?.data?.error?.message || err.message;
      console.error(`OpenRouter error (${model}):`, lastStatus, lastDetail);
      failures.push(`${model} -> ${lastStatus}: ${lastDetail}`);
      if (!FALLBACK_STATUSES.includes(lastStatus) && err.response) break;
    }
  }

  res.status(lastStatus >= 400 && lastStatus < 600 ? lastStatus : 502).json({
    error: 'TitanAI could not get a response. ' + (failures.join(' | ') || lastDetail),
  });
});

app.use((req, res) => res.status(404).json({ error: 'Not found.' }));

app.listen(PORT, () => {
  console.log(`TitanAI is running on port ${PORT} (models: ${MODELS.join(', ')})`);
});