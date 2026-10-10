(() => {
  'use strict';

  const KEY = 'titanai.v2';

  /* ---------- Icons ---------- */
  const ICONS = {
    plus: '<path d="M12 5v14M5 12h14"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    panel: '<rect x="3" y="4" width="18" height="16" rx="3"/><path d="M9 4v16"/>',
    edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    library: '<rect x="3" y="4" width="4" height="16" rx="1"/><rect x="9" y="4" width="4" height="16" rx="1"/><path d="m15.5 5.5 3.8-1 2.7 14.5-3.8 1z"/>',
    at: '<circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"/>',
    dots: '<circle cx="5" cy="12" r="1.4" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1.4" fill="currentColor" stroke="none"/>',
    pin: '<path d="M12 17v5"/><path d="M9 3h6l-1 6 3 3v2H7v-2l3-3Z"/>',
    mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
    arrowup: '<path d="M12 19V5M5 12l7-7 7 7"/>',
    chevd: '<path d="m6 9 6 6 6-6"/>',
    chevr: '<path d="m9 6 6 6-6 6"/>',
    sparkle: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8Z"/><path d="M19 16v4M17 18h4"/>',
    user: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="10" r="3"/><path d="M6.5 18.5a7 7 0 0 1 11 0"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z"/>',
    help: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.5"/><path d="m5.6 5.6 3.9 3.9M14.5 14.5l3.9 3.9M18.4 5.6l-3.9 3.9M9.5 14.5l-3.9 3.9"/>',
    logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>',
    sliders: '<path d="M4 6h8M18 6h2M4 12h2M12 12h8M4 18h10M20 18h0"/><circle cx="15" cy="6" r="2"/><circle cx="9" cy="12" r="2"/><circle cx="17" cy="18" r="2"/>',
    temp: '<path d="M20 12a8 8 0 0 1-14 5.3M4 12a8 8 0 0 1 14-5.3"/><path d="M18 3v4h-4M6 21v-4h4"/>',
    clip: '<path d="m21 11.5-8.6 8.6a5 5 0 0 1-7-7l8.6-8.6a3.3 3.3 0 0 1 4.7 4.7l-8.6 8.6a1.7 1.7 0 0 1-2.4-2.4l7.9-7.9"/>',
    trash: '<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    book: '<path d="M2 5h7a3 3 0 0 1 3 3v12a2 2 0 0 0-2-2H2ZM22 5h-7a3 3 0 0 0-3 3v12a2 2 0 0 1 2-2h8Z"/>',
    code: '<path d="m8 8-5 4 5 4M16 8l5 4-5 4M14 5l-4 14"/>',
    copy: '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 0 1 2-2h8"/>',
    check: '<path d="m5 12.5 4.5 4.5L19 7"/>',
  };
  const svg = (n) => `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[n] || ''}</svg>`;
  const paintIcons = (root) => root.querySelectorAll('[data-ic]').forEach((e) => { e.innerHTML = svg(e.dataset.ic); });
  paintIcons(document);

  /* ---------- Elements ---------- */
  const els = {};
  [
    'app', 'sidebar', 'backdrop', 'brandBtn', 'brandMenu', 'searchBtn', 'collapseBtn', 'searchBox', 'searchInput',
    'newChat', 'pinnedHead', 'pinnedList', 'recentList', 'recentEmpty', 'profileBtn', 'profileMenu', 'avatar',
    'pName', 'pPlan', 'pmAvatar', 'pmName', 'pmPlan', 'menuBtn', 'modeSeg', 'tempBtn', 'chat', 'messages', 'hero',
    'greeting', 'heroSlot', 'suggest', 'bottomSlot', 'composerWrap', 'chatForm', 'input', 'plusBtn', 'plusMenu',
    'effortBtn', 'effortLabel', 'effortMenu', 'micBtn', 'sendBtn', 'fileInput', 'ctx', 'toast',
  ].forEach((id) => { els[id] = document.getElementById(id); });

  /* ---------- State ---------- */
  function load() {
    const base = { sessions: [], profile: { name: 'Гост', plan: 'Безплатен', instructions: '' }, effort: 'medium', mode: 'chat', pinnedOpen: true };
    try {
      const d = JSON.parse(localStorage.getItem(KEY));
      if (d && typeof d === 'object') {
        return { ...base, ...d, profile: { ...base.profile, ...(d.profile || {}) }, sessions: Array.isArray(d.sessions) ? d.sessions : [] };
      }
    } catch (e) { /* ignore */ }
    return base;
  }
  const state = load();
  let activeId = null;
  let busy = false;
  let tempMode = false;

  function save() {
    try {
      localStorage.setItem(KEY, JSON.stringify({ ...state, sessions: state.sessions.filter((s) => !s.temp) }));
    } catch (e) { /* storage unavailable */ }
  }

  const getActive = () => state.sessions.find((s) => s.id === activeId) || null;

  /* ---------- Helpers ---------- */
  let toastTimer;
  function toast(msg) {
    els.toast.textContent = msg;
    els.toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => els.toast.classList.remove('show'), 2200);
  }

  const isMobile = () => window.matchMedia('(max-width: 820px)').matches;

  function initials(name) {
    const parts = String(name || '').trim().split(/\s+/).filter(Boolean);
    if (!parts.length) return 'G';
    return (parts[0][0] + (parts[1] ? parts[1][0] : '')).toUpperCase();
  }

  function mkBtn(text, cls, fn) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = cls || '';
    b.textContent = text;
    b.addEventListener('click', fn);
    return b;
  }

  function menuItem(icon, label, fn, danger) {
    const b = document.createElement('button');
    b.type = 'button';
    if (danger) b.className = 'danger';
    b.innerHTML = `<i class="ic">${svg(icon)}</i><span class="grow"></span>`;
    b.querySelector('.grow').textContent = label;
    b.addEventListener('click', () => { closeMenus(); fn(); });
    return b;
  }

  function closeMenus() {
    [els.ctx, els.profileMenu, els.effortMenu, els.plusMenu, els.brandMenu].forEach((m) => { m.hidden = true; });
  }

  function toggleMenu(menu, build) {
    const wasOpen = !menu.hidden;
    closeMenus();
    if (wasOpen) return;
    if (build) build();
    menu.hidden = false;
  }

  document.addEventListener('click', (e) => { if (!e.target.closest('.menu')) closeMenus(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMenus();
      const ov = document.querySelector('.overlay');
      if (ov) ov.remove();
    }
  });

  /* ---------- Modal ---------- */
  function modal(title, body, opts = {}) {
    const { ok = 'Запази', onOk, cancel = 'Отказ', danger = false } = opts;
    const ov = document.createElement('div');
    ov.className = 'overlay';
    const box = document.createElement('div');
    box.className = 'modal';
    const h = document.createElement('h3');
    h.textContent = title;
    const act = document.createElement('div');
    act.className = 'm-actions';
    const close = () => ov.remove();
    if (cancel) act.append(mkBtn(cancel, '', close));
    if (onOk) act.append(mkBtn(ok, danger ? 'danger' : 'primary', () => { if (onOk(box) !== false) close(); }));
    box.append(h, body, act);
    ov.append(box);
    ov.addEventListener('mousedown', (e) => { if (e.target === ov) close(); });
    document.body.append(ov);
    const f = box.querySelector('input, textarea');
    if (f) { f.focus(); if (f.select && f.tagName === 'INPUT') f.select(); }
  }

  function field(labelText, el) {
    const wrap = document.createElement('div');
    const l = document.createElement('label');
    l.textContent = labelText;
    wrap.append(l, el);
    return wrap;
  }

  function textBlock(html) {
    const d = document.createElement('div');
    d.innerHTML = html;
    return d;
  }

  /* ---------- Markdown (safe: escapes HTML first) ---------- */
  function md(src) {
    const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const blocks = [];
    let t = esc(String(src)).replace(/```[\w-]*\n?([\s\S]*?)```/g, (m, c) => {
      blocks.push(`<pre><code>${c.replace(/\n$/, '')}</code></pre>`);
      return `\u0000${blocks.length - 1}\u0000`;
    });
    t = t.replace(/`([^`\n]+)`/g, '<code>$1</code>').replace(/\*\*([^*\n]+)\*\*/g, '<strong>$1</strong>');
    let html = '';
    let list = null;
    const closeList = () => { if (list) { html += `</${list}>`; list = null; } };
    for (const line of t.split('\n')) {
      let m;
      if (/^\u0000\d+\u0000$/.test(line.trim())) { closeList(); html += line.trim(); }
      else if ((m = line.match(/^\s*[-*]\s+(.*)/))) { if (list !== 'ul') { closeList(); html += '<ul>'; list = 'ul'; } html += `<li>${m[1]}</li>`; }
      else if ((m = line.match(/^\s*\d+[.)]\s+(.*)/))) { if (list !== 'ol') { closeList(); html += '<ol>'; list = 'ol'; } html += `<li>${m[1]}</li>`; }
      else if ((m = line.match(/^#{1,4}\s+(.*)/))) { closeList(); html += `<h4>${m[1]}</h4>`; }
      else if (!line.trim()) { closeList(); }
      else { closeList(); html += `<p>${line}</p>`; }
    }
    closeList();
    return html.replace(/\u0000(\d+)\u0000/g, (m, i) => blocks[i]);
  }

  /* ---------- Rendering: sidebar ---------- */
  function chatItem(s) {
    const li = document.createElement('li');
    li.className = 'chat-item' + (s.id === activeId ? ' active' : '');
    li.innerHTML = `<span class="title"></span>${s.pinned ? `<i class="ic pin-mark">${svg('pin')}</i>` : ''}<button class="dots" type="button" title="Опции">${svg('dots')}</button>`;
    li.querySelector('.title').textContent = s.title;
    li.addEventListener('click', () => selectSession(s.id));
    li.querySelector('.dots').addEventListener('click', (e) => {
      e.stopPropagation();
      openCtx(e.currentTarget, s);
    });
    return li;
  }

  function renderSidebar() {
    const q = els.searchInput.value.trim().toLowerCase();
    const vis = state.sessions
      .filter((s) => !s.temp && (!q || s.title.toLowerCase().includes(q)))
      .sort((a, b) => (b.updated || 0) - (a.updated || 0));
    const pinned = vis.filter((s) => s.pinned);
    const recent = vis.filter((s) => !s.pinned);

    els.pinnedList.innerHTML = '';
    els.recentList.innerHTML = '';
    pinned.forEach((s) => els.pinnedList.appendChild(chatItem(s)));
    recent.forEach((s) => els.recentList.appendChild(chatItem(s)));

    els.pinnedHead.hidden = !pinned.length;
    els.pinnedList.hidden = !pinned.length || !state.pinnedOpen;
    els.pinnedHead.querySelector('.ic').style.transform = state.pinnedOpen ? '' : 'rotate(-90deg)';
    els.recentEmpty.hidden = recent.length > 0;
    els.recentEmpty.textContent = q ? 'Няма резултати' : 'Няма чатове';
  }

  function openCtx(btn, s) {
    closeMenus();
    const m = els.ctx;
    m.innerHTML = '';
    m.append(
      menuItem('pin', s.pinned ? 'Откачи' : 'Закачи', () => { s.pinned = !s.pinned; save(); renderSidebar(); }),
      menuItem('edit', 'Преименувай', () => renameModal(s)),
      menuItem('trash', 'Изтрий', () => deleteModal(s), true)
    );
    m.hidden = false;
    const r = btn.getBoundingClientRect();
    m.style.top = Math.max(8, Math.min(r.bottom + 6, window.innerHeight - m.offsetHeight - 10)) + 'px';
    m.style.left = Math.max(8, Math.min(r.left, window.innerWidth - m.offsetWidth - 10)) + 'px';
  }

  function renameModal(s) {
    const inp = document.createElement('input');
    inp.value = s.title;
    inp.maxLength = 60;
    modal('Преименуване', field('Име на чата', inp), {
      onOk: () => {
        const v = inp.value.trim();
        if (!v) return false;
        s.title = v;
        save();
        renderSidebar();
      },
    });
  }

  function deleteModal(s) {
    modal('Изтриване на чата?', textBlock('<p>Чатът ще бъде изтрит завинаги от това устройство.</p>'), {
      ok: 'Изтрий', danger: true,
      onOk: () => {
        state.sessions = state.sessions.filter((x) => x.id !== s.id);
        if (activeId === s.id) activeId = null;
        save();
        renderAll();
      },
    });
  }

  /* ---------- Rendering: chat ---------- */
  function scrollToBottom(smooth = true) {
    els.messages.scrollTo({ top: els.messages.scrollHeight, behavior: smooth ? 'smooth' : 'auto' });
  }

  function row(role, text, isErr) {
    const r = document.createElement('div');
    r.className = 'row ' + (role === 'user' ? 'user' : 'ai');
    if (role === 'user') {
      const b = document.createElement('div');
      b.className = 'ububble';
      b.textContent = text;
      r.append(b);
      return r;
    }
    const av = document.createElement('div');
    av.className = 'ai-av';
    av.textContent = 'T';
    const c = document.createElement('div');
    c.className = 'content' + (isErr ? ' err' : '');
    if (isErr) {
      c.textContent = text;
    } else if (text) {
      c.innerHTML = md(text);
      const acts = document.createElement('div');
      acts.className = 'acts';
      const cp = document.createElement('button');
      cp.type = 'button';
      cp.title = 'Копирай';
      cp.innerHTML = svg('copy');
      cp.addEventListener('click', () => {
        navigator.clipboard.writeText(text).then(() => toast('Копирано'), () => toast('Неуспешно копиране'));
      });
      acts.append(cp);
      c.append(acts);
    }
    r.append(av, c);
    return r;
  }

  function renderChat() {
    els.messages.innerHTML = '';
    const s = getActive();
    if (s) s.messages.forEach((m) => els.messages.appendChild(row(m.role, m.content)));
    scrollToBottom(false);
  }

  function layout() {
    const s = getActive();
    const empty = !s || !s.messages.length;
    els.chat.classList.toggle('empty', empty);
    (empty ? els.heroSlot : els.bottomSlot).appendChild(els.composerWrap);
  }

  const SUGGESTIONS = {
    chat: [
      ['mail', 'Напиши ми учтив имейл за отказ от оферта'],
      ['book', 'Обясни ми как работи блокчейнът с прости думи'],
      ['code', 'Помогни ми да открия грешка в моя код'],
    ],
    work: [
      ['mail', 'Направи ми план за седмицата по приоритети'],
      ['book', 'Помогни ми да обобщя дълъг текст в 5 ключови точки'],
      ['code', 'Напиши ми шаблон за седмичен отчет към шефа'],
    ],
  };

  function updateHero() {
    els.greeting.textContent = tempMode ? 'Временен чат — няма да бъде запазен' : state.mode === 'work' ? 'По какво работим днес?' : 'Какво предстои днес?';
    els.suggest.innerHTML = '';
    SUGGESTIONS[state.mode].forEach(([ic, text]) => {
      const li = document.createElement('li');
      const b = document.createElement('button');
      b.type = 'button';
      b.innerHTML = `<i class="ic">${svg(ic)}</i><span></span>`;
      b.querySelector('span').textContent = text;
      b.addEventListener('click', () => send(text));
      li.append(b);
      els.suggest.append(li);
    });
    els.modeSeg.querySelectorAll('button').forEach((b) => b.classList.toggle('on', b.dataset.mode === state.mode));
    els.tempBtn.classList.toggle('on', tempMode);
    els.effortLabel.textContent = state.effort.charAt(0).toUpperCase() + state.effort.slice(1);
  }

  function updateProfile() {
    const n = state.profile.name || 'Гост';
    els.pName.textContent = els.pmName.textContent = n;
    els.pPlan.textContent = els.pmPlan.textContent = state.profile.plan;
    els.avatar.textContent = els.pmAvatar.textContent = initials(n);
  }

  function renderAll() {
    renderSidebar();
    renderChat();
    layout();
    updateHero();
    updateProfile();
  }

  /* ---------- Sessions ---------- */
  function newSession() {
    const s = { id: 's' + Date.now() + Math.random().toString(36).slice(2, 6), title: 'Нов чат', messages: [], pinned: false, updated: Date.now(), temp: tempMode };
    state.sessions.unshift(s);
    activeId = s.id;
    return s;
  }

  function selectSession(id) {
    if (busy) return;
    activeId = id;
    tempMode = false;
    renderAll();
    if (isMobile()) els.app.classList.remove('sb-open');
  }

  function startNewChat() {
    if (busy) return;
    activeId = null;
    tempMode = false;
    renderAll();
    if (isMobile()) els.app.classList.remove('sb-open');
    els.input.focus();
  }

  /* ---------- Sending ---------- */
  function updateSend() {
    els.sendBtn.disabled = busy || !els.input.value.trim();
  }

  function autoResize() {
    els.input.style.height = 'auto';
    els.input.style.height = Math.min(els.input.scrollHeight, 180) + 'px';
  }

  function showTyping() {
    const r = row('assistant', null);
    r.classList.add('typing-row');
    r.querySelector('.content').innerHTML = '<span class="tdots"><i></i><i></i><i></i></span><span class="tlabel">TitanAI пише…</span>';
    els.messages.appendChild(r);
    scrollToBottom();
    return r;
  }

  async function send(raw) {
    const text = String(raw || '').trim();
    if (busy || !text) return;

    let s = getActive();
    if (!s) s = newSession();
    const history = s.messages.map((m) => ({ role: m.role, content: m.content }));

    s.messages.push({ role: 'user', content: text });
    if (s.title === 'Нов чат') s.title = text.length > 36 ? text.slice(0, 36) + '…' : text;
    s.updated = Date.now();
    save();

    els.input.value = '';
    autoResize();
    busy = true;
    updateSend();
    layout();
    renderSidebar();
    els.messages.appendChild(row('user', text));
    const typing = showTyping();
    const sid = s.id;

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history,
          mode: state.mode,
          effort: state.effort,
          instructions: state.profile.instructions,
          userName: state.profile.name === 'Гост' ? '' : state.profile.name,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Грешка при заявката (' + res.status + ')');

      s.messages.push({ role: 'assistant', content: data.reply });
      s.updated = Date.now();
      save();
      if (activeId === sid) {
        typing.remove();
        els.messages.appendChild(row('assistant', data.reply));
      }
    } catch (err) {
      if (activeId === sid) {
        typing.remove();
        els.messages.appendChild(row('assistant', 'Грешка: ' + err.message, true));
      }
    } finally {
      busy = false;
      updateSend();
      renderSidebar();
      scrollToBottom();
      els.input.focus();
    }
  }

  /* ---------- Composer events ---------- */
  els.chatForm.addEventListener('submit', (e) => { e.preventDefault(); send(els.input.value); });
  els.input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) {
      e.preventDefault();
      send(els.input.value);
    }
  });
  els.input.addEventListener('input', () => { autoResize(); updateSend(); });

  els.plusBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu(els.plusMenu, () => {
      els.plusMenu.innerHTML = '';
      els.plusMenu.append(
        menuItem('clip', 'Прикачи текстов файл', () => els.fileInput.click()),
        menuItem('trash', 'Изчисти полето', () => { els.input.value = ''; autoResize(); updateSend(); })
      );
    });
  });

  els.fileInput.addEventListener('change', () => {
    const f = els.fileInput.files[0];
    els.fileInput.value = '';
    if (!f) return;
    if (f.size > 200 * 1024) { toast('Файлът е твърде голям (макс. 200 KB)'); return; }
    const reader = new FileReader();
    reader.onload = () => {
      const body = String(reader.result).slice(0, 9000);
      els.input.value = (els.input.value ? els.input.value + '\n\n' : '') + `Файл „${f.name}“:\n\`\`\`\n${body}\n\`\`\`\n`;
      autoResize();
      updateSend();
      els.input.focus();
      toast('Файлът е добавен към съобщението');
    };
    reader.onerror = () => toast('Файлът не може да се прочете');
    reader.readAsText(f);
  });

  const EFFORTS = [['low', 'Low', 'Кратки и бързи отговори'], ['medium', 'Medium', 'Балансиран отговор'], ['high', 'High', 'Подробни, задълбочени отговори']];
  els.effortBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu(els.effortMenu, () => {
      els.effortMenu.innerHTML = '';
      EFFORTS.forEach(([key, label, desc]) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.innerHTML = `<span class="grow"></span><i class="ic">${key === state.effort ? svg('check') : ''}</i>`;
        b.querySelector('.grow').innerHTML = `${label}<small>${desc}</small>`;
        b.addEventListener('click', () => { state.effort = key; save(); closeMenus(); updateHero(); });
        els.effortMenu.append(b);
      });
    });
  });

  /* Voice input (Web Speech API, where supported) */
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  let rec = null;
  els.micBtn.addEventListener('click', () => {
    if (!SR) { toast('Браузърът ти не поддържа гласово въвеждане'); return; }
    if (rec) { rec.stop(); return; }
    rec = new SR();
    rec.lang = 'bg-BG';
    rec.interimResults = false;
    rec.onresult = (ev) => {
      const t = Array.from(ev.results).map((r) => r[0].transcript).join(' ');
      els.input.value = (els.input.value ? els.input.value + ' ' : '') + t;
      autoResize();
      updateSend();
    };
    rec.onend = () => { rec = null; els.micBtn.classList.remove('rec'); };
    rec.onerror = () => { toast('Микрофонът не е достъпен'); };
    els.micBtn.classList.add('rec');
    rec.start();
  });

  /* ---------- Top bar & sidebar events ---------- */
  els.modeSeg.addEventListener('click', (e) => {
    const b = e.target.closest('button[data-mode]');
    if (!b) return;
    state.mode = b.dataset.mode;
    save();
    updateHero();
  });

  els.tempBtn.addEventListener('click', () => {
    if (busy) return;
    tempMode = !tempMode;
    activeId = null;
    renderAll();
    toast(tempMode ? 'Временен чат: няма да се запазва' : 'Временният чат е изключен');
  });

  els.newChat.addEventListener('click', startNewChat);

  document.querySelectorAll('[data-soon]').forEach((b) => {
    b.addEventListener('click', () => toast(b.dataset.soon + ' — скоро'));
  });

  els.searchBtn.addEventListener('click', () => {
    els.searchBox.hidden = !els.searchBox.hidden;
    els.searchBtn.classList.toggle('on', !els.searchBox.hidden);
    if (els.searchBox.hidden) { els.searchInput.value = ''; renderSidebar(); } else els.searchInput.focus();
  });
  els.searchInput.addEventListener('input', renderSidebar);

  els.pinnedHead.addEventListener('click', () => { state.pinnedOpen = !state.pinnedOpen; save(); renderSidebar(); });

  els.collapseBtn.addEventListener('click', () => {
    if (isMobile()) els.app.classList.remove('sb-open');
    else els.app.classList.add('collapsed');
  });
  els.menuBtn.addEventListener('click', () => {
    if (isMobile()) els.app.classList.add('sb-open');
    else els.app.classList.remove('collapsed');
  });
  els.backdrop.addEventListener('click', () => els.app.classList.remove('sb-open'));

  els.brandBtn.addEventListener('click', (e) => { e.stopPropagation(); toggleMenu(els.brandMenu); });

  /* ---------- Profile menu ---------- */
  els.profileBtn.addEventListener('click', (e) => { e.stopPropagation(); toggleMenu(els.profileMenu); });

  els.profileMenu.addEventListener('click', (e) => {
    const b = e.target.closest('[data-act]');
    if (!b) return;
    closeMenus();
    ({
      upgrade: () => toast('Плановете скоро ще бъдат достъпни'),
      personal: personalModal,
      profile: profileModal,
      settings: settingsModal,
      help: helpModal,
      logout: logoutModal,
    })[b.dataset.act]();
  });

  function profileModal() {
    const inp = document.createElement('input');
    inp.value = state.profile.name === 'Гост' ? '' : state.profile.name;
    inp.placeholder = 'Как да те наричам?';
    inp.maxLength = 40;
    modal('Профил', field('Име', inp), {
      onOk: () => {
        state.profile.name = inp.value.trim() || 'Гост';
        save();
        updateProfile();
      },
    });
  }

  function personalModal() {
    const ta = document.createElement('textarea');
    ta.rows = 6;
    ta.maxLength = 1000;
    ta.value = state.profile.instructions || '';
    ta.placeholder = 'Напр.: Отговаряй кратко и на „ти“. Давай примери с код, когато е уместно.';
    modal('Персонализация', field('Как да ти отговаря TitanAI?', ta), {
      onOk: () => {
        state.profile.instructions = ta.value.trim();
        save();
        toast('Персонализацията е запазена');
      },
    });
  }

  function settingsModal() {
    const wrap = document.createElement('div');
    wrap.append(textBlock('<p>Чатовете се пазят само в този браузър.</p>'));
    const clear = mkBtn('Изтрий всички чатове', 'inline-btn danger', () => {
      modal('Изтриване на всички чатове?', textBlock('<p>Това действие е необратимо.</p>'), {
        ok: 'Изтрий всичко', danger: true,
        onOk: () => {
          state.sessions = [];
          activeId = null;
          save();
          renderAll();
          toast('Всички чатове са изтрити');
        },
      });
    });
    clear.style.marginTop = '14px';
    wrap.append(clear);
    modal('Настройки', wrap, { cancel: 'Затвори' });
  }

  function helpModal() {
    modal('Помощ', textBlock(
      '<ul><li><b>Enter</b> — изпраща съобщението, <b>Shift+Enter</b> — нов ред.</li>' +
      '<li><b>+</b> — прикачва текстов файл към съобщението.</li>' +
      '<li><b>Low / Medium / High</b> — колко подробен да е отговорът.</li>' +
      '<li><b>Chat / Work</b> — свободен разговор или работен режим.</li>' +
      '<li>Иконата горе вдясно пуска <b>временен чат</b>, който не се запазва.</li></ul>'
    ), { cancel: 'Затвори' });
  }

  function logoutModal() {
    modal('Излизане от акаунта', textBlock('<p>Профилът и всички чатове ще бъдат изчистени от това устройство.</p>'), {
      ok: 'Излез', danger: true,
      onOk: () => {
        try { localStorage.removeItem(KEY); } catch (e) { /* ignore */ }
        location.reload();
      },
    });
  }

  /* ---------- Init ---------- */
  renderAll();
  updateSend();
  els.input.focus();
})();