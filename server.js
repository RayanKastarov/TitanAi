'use strict';

const path = require('path');
const express = require('express');
const helmet = require('helmet');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;
const MODEL = process.env.OPENROUTER_MODEL || 'google/gemini-2.5-flash:free';
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

const SYSTEM_PROMPT =
  'You are TitanAI, a helpful, precise and friendly AI assistant. ' +
  'Always reply in the same language the user writes in.';

const MAX_MESSAGE_LEN = 4000;
const MAX_HISTORY = 20;

app.disable('x-powered-by');
app.set('trust proxy', 1);
app.use(helmet());
app.use(express.json({ limit: '100kb' }));

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

app.post('/api/chat', rateLimit, async (req, res) => {
  const { message, history } = req.body || {};

  if (typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ error: 'Message is required.' });
  }
  if (!process.env.OPENROUTER_API_KEY) {
    return res.status(500).json({ error: 'Server is missing OPENROUTER_API_KEY.' });
  }

  const messages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...sanitizeHistory(history),
    { role: 'user', content: message.slice(0, MAX_MESSAGE_LEN) },
  ];

  try {
    const response = await axios.post(
      OPENROUTER_URL,
      { model: MODEL, messages },
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

    const reply = response.data?.choices?.[0]?.message?.content;
    if (!reply) {
      return res.status(502).json({ error: 'Empty response from the model.' });
    }
    res.json({ reply });
  } catch (err) {
    const status = err.response?.status || 500;
    const detail = err.response?.data?.error?.message || err.message;
    console.error('OpenRouter error:', status, detail);
    res.status(status >= 400 && status < 600 ? status : 500).json({
      error: 'TitanAI could not get a response. ' + detail,
    });
  }
});

app.use((req, res) => res.status(404).json({ error: 'Not found.' }));

app.listen(PORT, () => {
  console.log(`TitanAI is running on port ${PORT}`);
});
