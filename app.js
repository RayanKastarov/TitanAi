(() => {
  'use strict';

  const STORAGE_KEY = 'titanai.sessions.v1';

  const $ = (id) => document.getElementById(id);
  const els = {
    sidebar: $('sidebar'),
    list: $('chatList'),
    newChat: $('newChat'),
    menuBtn: $('menuBtn'),
    title: $('chatTitle'),
    messages: $('messages'),
    typing: $('typing'),
    form: $('chatForm'),
    input: $('input'),
    send: $('sendBtn'),
  };

  let sessions = loadSessions();
  let activeId = sessions.length ? sessions[0].id : null;
  let busy = false;

  /* ---------- Storage ---------- */
  function loadSessions() {
    try {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return Array.isArray(data) ? data : [];
    } catch (e) {
      return [];
    }
  }

  function saveSessions() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
    } catch (e) { /* storage unavailable */ }
  }

  /* ---------- Sessions ---------- */
  function createSession() {
    const s = { id: 's' + Date.now() + Math.random().toString(36).slice(2, 6), title: 'New chat', messages: [] };
    sessions.unshift(s);
    activeId = s.id;
    saveSessions();
    return s;
  }

  function getActive() {
    return sessions.find((s) => s.id === activeId) || null;
  }

  function selectSession(id) {
    if (busy) return;
    activeId = id;
    renderAll();
    els.sidebar.classList.remove('open');
  }

  function deleteSession(id) {
    if (busy) return;
    sessions = sessions.filter((s) => s.id !== id);
    if (activeId === id) activeId = sessions.length ? sessions[0].id : null;
    saveSessions();
    renderAll();
  }

  /* ---------- Rendering ---------- */
  function renderSidebar() {
    els.list.innerHTML = '';
    sessions.forEach((s) => {
      const li = document.createElement('li');
      li.className = 'chat-item' + (s.id === activeId ? ' active' : '');

      const title = document.createElement('span');
      title.className = 'title';
      title.textContent = s.title;

      const del = document.createElement('button');
      del.className = 'del';
      del.type = 'button';
      del.title = 'Delete chat';
      del.textContent = '\u00D7';
      del.addEventListener('click', (e) => {
        e.stopPropagation();
        deleteSession(s.id);
      });

      li.addEventListener('click', () => selectSession(s.id));
      li.append(title, del);
      els.list.appendChild(li);
    });
  }

  function createBubble(role, text, isError) {
    const wrap = document.createElement('div');
    wrap.className = 'msg ' + (role === 'user' ? 'user' : 'ai') + (isError ? ' error' : '');

    const who = document.createElement('div');
    who.className = 'who';
    who.textContent = role === 'user' ? 'You' : 'TitanAI';

    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.textContent = text;

    wrap.append(who, bubble);
    return wrap;
  }

  function renderMessages() {
    els.messages.innerHTML = '';
    const s = getActive();
    if (!s || s.messages.length === 0) {
      const w = document.createElement('div');
      w.className = 'welcome';
      w.innerHTML = '<h2>TITANAI</h2><p>Ask anything. Your chats are saved in this browser.</p>';
      els.messages.appendChild(w);
    } else {
      s.messages.forEach((m) => els.messages.appendChild(createBubble(m.role, m.content)));
    }
    scrollToBottom(false);
  }

  function renderAll() {
    const s = getActive();
    els.title.textContent = s ? s.title : 'New chat';
    renderSidebar();
    renderMessages();
  }

  function scrollToBottom(smooth = true) {
    els.messages.scrollTo({ top: els.messages.scrollHeight, behavior: smooth ? 'smooth' : 'auto' });
  }

  function setBusy(state) {
    busy = state;
    els.send.disabled = state;
    els.typing.classList.toggle('show', state);
    if (state) scrollToBottom();
  }

  function appendBubble(role, text, isError) {
    const welcome = els.messages.querySelector('.welcome');
    if (welcome) welcome.remove();
    els.messages.appendChild(createBubble(role, text, isError));
    scrollToBottom();
  }

  /* ---------- Sending ---------- */
  async function sendMessage(text) {
    let session = getActive();
    if (!session) session = createSession();

    const history = session.messages.map((m) => ({ role: m.role, content: m.content }));

    session.messages.push({ role: 'user', content: text });
    if (session.title === 'New chat') {
      session.title = text.length > 32 ? text.slice(0, 32) + '\u2026' : text;
    }
    saveSessions();
    els.title.textContent = session.title;
    renderSidebar();
    appendBubble('user', text);
    setBusy(true);

    const sessionId = session.id;

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Request failed (' + res.status + ')');

      session.messages.push({ role: 'assistant', content: data.reply });
      saveSessions();
      if (activeId === sessionId) appendBubble('assistant', data.reply);
    } catch (err) {
      if (activeId === sessionId) appendBubble('assistant', 'Error: ' + err.message, true);
    } finally {
      setBusy(false);
      els.input.focus();
    }
  }

  /* ---------- Events ---------- */
  els.form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = els.input.value.trim();
    if (!text || busy) return;
    els.input.value = '';
    autoResize();
    sendMessage(text);
  });

  els.input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      els.form.requestSubmit();
    }
  });

  function autoResize() {
    els.input.style.height = 'auto';
    els.input.style.height = Math.min(els.input.scrollHeight, 160) + 'px';
  }
  els.input.addEventListener('input', autoResize);

  els.newChat.addEventListener('click', () => {
    if (busy) return;
    const s = getActive();
    if (!s || s.messages.length > 0) createSession();
    renderAll();
    els.sidebar.classList.remove('open');
    els.input.focus();
  });

  els.menuBtn.addEventListener('click', () => els.sidebar.classList.toggle('open'));

  /* ---------- Init ---------- */
  renderAll();
  els.input.focus();
})();
