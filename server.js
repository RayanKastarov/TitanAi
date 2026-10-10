'use strict';

const path = require('path');
const express = require('express');
const helmet = require('helmet');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Models are tried in order; if one is unavailable or rate-limited, the next is used.
// Override on Render with OPENROUTER_MODEL (comma-separated list), e.g.:
//   OPENROUTER_MODEL=google/gemini-3.8-flash
const MODELS = (process.env.OPENROUTER_MODEL || 'apodex/apodex-1.1-mini:free,inclusionai/ling-3.1-flash')
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

app.disable('x-powered-by');
app.set('trust proxy', 1);
app.use(helmet());
app.use(express.json({ limit: '500kb' }));

// Static files (only the two public files, so server.js / package.json stay private)
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/index.html', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/app.js', (req, res) => res.sendFile(path.join(__dirname, 'app.js')));

// Very small in-memory rate limiter (per IP, 20 requests / minute)
const hits = new Map();
function rateLimit(req, res, next) {
  const now = Date.now();
  const windowMs = 60 * 1000;
  const entry = hits.get(req.ip) || { count: 0, start: now };
  if (now - entry.start > windowMs) {
    entry.count = 0;
    entry.start = now;
  }
  entry.count += 1;
  hits.set(req.ip, entry);
  if (entry.count > 20) {
    return res.status(429).json({ error: 'Too many requests. Please slow down.' });
  }
  next();
}
setInterval(() => {
  const now = Date.now();
  for (const [ip, e] of hits) if (now - e.start > 60 * 1000) hits.delete(ip);
}, 60 * 1000).unref();

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

app.post('/api/chat', rateLimit, async (req, res) => {
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
    } catch (err) {
      lastStatus = err.response?.status || 500;
      lastDetail = err.response?.data?.error?.message || err.message;
      console.error(`OpenRouter error (${model}):`, lastStatus, lastDetail);
      if (!FALLBACK_STATUSES.includes(lastStatus) && err.response) break;
    }
  }

  res.status(lastStatus >= 400 && lastStatus < 600 ? lastStatus : 502).json({
    error: 'TitanAI could not get a response. ' + lastDetail,
  });
});

app.use((req, res) => res.status(404).json({ error: 'Not found.' }));

app.listen(PORT, () => {
  console.log(`TitanAI is running on port ${PORT} (models: ${MODELS.join(', ')})`);
});