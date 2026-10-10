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
    x: '<path d="M6 6l12 12M18 6 6 18"/>',
    image: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="1.6"/><path d="m21 16-5-5-8 8"/>',
    film: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M8 4v16M16 4v16M3 9h5M3 15h5M16 9h5M16 15h5"/>',
    file: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z"/><path d="M14 3v5h5"/>',
    bookmark: '<path d="M6 4h12v17l-6-4-6 4Z"/>',
    volume: '<path d="M11 5 6 9H3v6h3l5 4Z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"/>',
    download: '<path d="M12 4v11M7 11l5 5 5-5M5 20h14"/>',
    upload: '<path d="M12 16V5M7 9l5-5 5 5M5 20h14"/>',
    users: '<circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0"/><circle cx="17" cy="9" r="2.5"/><path d="M16 14.2A5 5 0 0 1 21 19"/>',
    stop: '<rect x="7" y="7" width="10" height="10" rx="2" fill="currentColor"/>',
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
    'effortBtn', 'effortLabel', 'effortMenu', 'micBtn', 'sendBtn', 'fileInput', 'ctx', 'toast', 'logoutLabel',
    'libraryBtn', 'pluginsBtn', 'browseBtn', 'pluginsBadge', 'attachTray', 'enhanceBtn', 'slashMenu',
  ].forEach((id) => { els[id] = document.getElementById(id); });

  /* ---------- State ---------- */
  function load() {
    const base = { sessions: [], saved: [], notes: [], plugins: [], profile: { name: 'Гост', plan: 'Безплатен', instructions: '' }, effort: 'medium', mode: 'chat', pinnedOpen: true, accent: 'silver' };
    try {
      const d = JSON.parse(localStorage.getItem(KEY));
      if (d && typeof d === 'object') {
        return {
          ...base,
          ...d,
          profile: { ...base.profile, ...(d.profile || {}) },
          sessions: Array.isArray(d.sessions) ? d.sessions : [],
          saved: Array.isArray(d.saved) ? d.saved : [],
          notes: Array.isArray(d.notes) ? d.notes : [],
          plugins: Array.isArray(d.plugins) ? d.plugins : [],
        };
      }
    } catch (e) { /* ignore */ }
    return base;
  }
  const state = load();
  let activeId = null;
  let busy = false;
  let tempMode = false;
  let account = null;       // logged-in user {id, email, name}, or null for guest
  let remoteReady = false;  // account data loaded, so saving to the server is safe
  let remoteTimer = null;

  const snapshot = () => ({ ...state, sessions: state.sessions.filter((s) => !s.temp) });

  function save() {
    if (account) {
      if (!remoteReady) return;
      clearTimeout(remoteTimer);
      remoteTimer = setTimeout(() => pushRemote(false), 1200);
      return;
    }
    try { localStorage.setItem(KEY, JSON.stringify(snapshot())); } catch (e) { /* storage unavailable */ }
  }

  async function pushRemote(keepalive) {
    clearTimeout(remoteTimer);
    remoteTimer = null;
    if (!account || !remoteReady) return;
    const body = JSON.stringify({ data: snapshot() });
    try {
      await fetch('/api/data', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body,
        keepalive: !!keepalive && body.length < 60000,
      });
    } catch (e) { /* retried on next save */ }
  }

  window.addEventListener('pagehide', () => { if (remoteTimer) pushRemote(true); });

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
    [els.ctx, els.profileMenu, els.effortMenu, els.plusMenu, els.brandMenu, els.slashMenu].forEach((m) => { m.hidden = true; });
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
      if (busy && !document.querySelector('.overlay') && els.slashMenu.hidden) stopGen();
      closeMenus();
      const ov = document.querySelector('.overlay');
      if (ov) ov.remove();
    }
  });

  /* ---------- Modal ---------- */
  function modal(title, body, opts = {}) {
    const { ok = 'Запази', onOk, cancel = 'Отказ', danger = false, wide = false } = opts;
    const ov = document.createElement('div');
    ov.className = 'overlay';
    const box = document.createElement('div');
    box.className = 'modal' + (wide ? ' wide' : '');
    if (wide) body.classList.add('body');
    const h = document.createElement('h3');
    h.textContent = title;
    const act = document.createElement('div');
    act.className = 'm-actions';
    const close = () => ov.remove();
    if (cancel) act.append(mkBtn(cancel, '', close));
    if (onOk) {
      const okBtn = mkBtn(ok, danger ? 'danger' : 'primary', async () => {
        okBtn.disabled = true;
        let r;
        try { r = await onOk(box); } finally { okBtn.disabled = false; }
        if (r !== false) close();
      });
      act.append(okBtn);
    }
    box.append(h, body, act);
    ov.append(box);
    ov.addEventListener('mousedown', (e) => { if (e.target === ov) close(); });
    document.body.append(ov);
    const f = box.querySelector('input, textarea');
    if (f) { f.focus(); if (f.select && f.tagName === 'INPUT') f.select(); }
    return box;
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
    t = t.replace(/<code>(#(?:[0-9a-fA-F]{6}|[0-9a-fA-F]{3}))<\/code>/g, '<span class="sw" style="background:$1"></span><code>$1</code>');
    let html = '';
    let list = null;
    const closeList = () => { if (list) { html += `</${list}>`; list = null; } };
    const mdLines = t.split('\n');
    for (let li = 0; li < mdLines.length; li += 1) {
      const line = mdLines[li];
      let m;
      if (/^\s*\|.*\|\s*$/.test(line) && li + 1 < mdLines.length && /^\s*\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?\s*$/.test(mdLines[li + 1])) {
        closeList();
        const cells = (r) => r.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((c) => c.trim());
        let tb = '<div class="tbl"><table><thead><tr>' + cells(line).map((c) => `<th>${c}</th>`).join('') + '</tr></thead><tbody>';
        li += 2;
        while (li < mdLines.length && /^\s*\|.*\|\s*$/.test(mdLines[li])) {
          tb += '<tr>' + cells(mdLines[li]).map((c) => `<td>${c}</td>`).join('') + '</tr>';
          li += 1;
        }
        li -= 1;
        html += tb + '</tbody></table></div>';
        continue;
      }
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
      menuItem('download', 'Изтегли като .md', () => exportChat(s)),
      menuItem('copy', 'Копирай чата', () => navigator.clipboard.writeText(chatMarkdown(s)).then(() => toast('Чатът е копиран'), () => toast('Неуспешно копиране'))),
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

  const KIND_LABEL = { text: 'Файл / код', image: 'Изображение', video: 'Видео' };
  const KIND_ICON = { text: 'file', image: 'image', video: 'film' };

  function attChip(f, onRemove) {
    const d = document.createElement('div');
    d.className = 'att' + (f.status === 'loading' ? ' loading' : '');
    let lead;
    if (f.thumb) {
      lead = document.createElement('img');
      lead.className = 'thumb';
      lead.alt = '';
      lead.src = f.thumb;
    } else {
      lead = document.createElement('span');
      lead.className = 'ficon';
      lead.innerHTML = svg(KIND_ICON[f.kind] || 'file');
    }
    const meta = document.createElement('span');
    meta.className = 'meta';
    const b = document.createElement('b');
    b.textContent = f.name;
    const sm = document.createElement('small');
    sm.textContent = f.status === 'loading' ? 'Обработва се…' : (KIND_LABEL[f.kind] || 'Файл') + (f.note ? ' · ' + f.note : '');
    meta.append(b, sm);
    d.append(lead, meta);
    if (onRemove) {
      const x = document.createElement('button');
      x.type = 'button';
      x.className = 'x';
      x.title = 'Премахни';
      x.innerHTML = svg('x');
      x.addEventListener('click', onRemove);
      d.append(x);
    }
    return d;
  }

  function saveReply(text) {
    if (state.saved.some((x) => x.text === text)) { toast('Вече е в библиотеката'); return; }
    const s = getActive();
    state.saved.unshift({ id: 'v' + Date.now(), title: s ? s.title : 'Отговор', text, ts: Date.now() });
    state.saved = state.saved.slice(0, 200);
    save();
    toast('Запазено в библиотеката');
  }

  /* ---------- Save a reply as a picture (for social posts) ---------- */
  function replyBlocks(src) {
    const blocks = [];
    const parts = String(src).split(/```[\w-]*\n?/);
    parts.forEach((part, i) => {
      if (i % 2 === 1) { blocks.push({ type: 'code', text: part.replace(/\n$/, '') }); return; }
      part.split('\n').forEach((raw) => {
        const line = raw.replace(/\*\*([^*]+)\*\*/g, '$1').replace(/`([^`]+)`/g, '$1');
        let m;
        if (!line.trim()) blocks.push({ type: 'gap' });
        else if ((m = line.match(/^#{1,4}\s+(.*)/))) blocks.push({ type: 'h', text: m[1] });
        else if ((m = line.match(/^\s*[-*]\s+(.*)/))) blocks.push({ type: 'li', text: '• ' + m[1] });
        else if ((m = line.match(/^\s*(\d+)[.)]\s+(.*)/))) blocks.push({ type: 'li', text: m[1] + '. ' + m[2] });
        else blocks.push({ type: 'p', text: line });
      });
    });
    return blocks;
  }

  function exportImage(text) {
    const W = 1080;
    const PAD = 72;
    const MAXH = 5200;
    const sans = (w, sz) => `${w} ${sz}px "Segoe UI", system-ui, -apple-system, Roboto, Arial, sans-serif`;
    const MONO = '26px Consolas, "SF Mono", monospace';
    const c = document.createElement('canvas');
    c.width = W;
    c.height = 10;
    const g = c.getContext('2d');
    const maxW = W - PAD * 2;

    const wrap = (str, font, width) => {
      g.font = font;
      const out = [];
      let line = '';
      const push = (w) => {
        const test = line ? line + ' ' + w : w;
        if (g.measureText(test).width <= width) { line = test; return; }
        if (line) out.push(line);
        line = '';
        if (g.measureText(w).width <= width) { line = w; return; }
        let chunk = '';
        for (const ch of w) {
          if (g.measureText(chunk + ch).width > width) { out.push(chunk); chunk = ''; }
          chunk += ch;
        }
        line = chunk;
      };
      String(str).split(/\s+/).filter(Boolean).forEach(push);
      if (line) out.push(line);
      return out.length ? out : [''];
    };

    const ops = [];
    let y = PAD + 76; // below the header
    let cut = false;
    for (const b of replyBlocks(text)) {
      if (y > MAXH) { cut = true; break; }
      if (b.type === 'gap') { y += 14; continue; }
      if (b.type === 'code') {
        const lines = b.text.split('\n').flatMap((l) => wrap(l.replace(/\t/g, '  ') || ' ', MONO, maxW - 48));
        const h = lines.length * 38 + 36;
        ops.push({ k: 'rect', x: PAD, y, w: maxW, h, color: '#111113', r: 18 });
        lines.forEach((l, i) => ops.push({ k: 'text', x: PAD + 24, y: y + 18 + 28 + i * 38 - 6, s: l, font: MONO, color: '#d9dce1' }));
        y += h + 18;
        continue;
      }
      const isH = b.type === 'h';
      const font = isH ? sans('700', 38) : sans('400', 32);
      const lh = isH ? 56 : 48;
      const ind = b.type === 'li' ? 0 : 0;
      wrap(b.text, font, maxW - ind).forEach((l) => {
        ops.push({ k: 'text', x: PAD + ind, y: y + lh - 14, s: l, font, color: isH ? '#ffffff' : '#e6e7ea' });
        y += lh;
      });
      y += isH ? 6 : 8;
    }
    if (cut) { ops.push({ k: 'text', x: PAD, y: y + 34, s: '…', font: sans('400', 32), color: '#8e8e95' }); y += 48; }

    const H = Math.round(y + 56 + PAD);
    c.width = W;
    c.height = H;
    const bg = g.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0, '#0b0b0c');
    bg.addColorStop(1, '#1a1b22');
    g.fillStyle = bg;
    g.fillRect(0, 0, W, H);

    // header: logo badge + name
    const badge = g.createLinearGradient(PAD, PAD, PAD + 52, PAD + 52);
    badge.addColorStop(0, '#f6f7f9');
    badge.addColorStop(1, '#9a9ea6');
    g.fillStyle = badge;
    g.beginPath();
    g.arc(PAD + 26, PAD + 26, 26, 0, Math.PI * 2);
    g.fill();
    g.fillStyle = '#111';
    g.font = sans('800', 30);
    g.textAlign = 'center';
    g.fillText('T', PAD + 26, PAD + 37);
    g.textAlign = 'left';
    g.fillStyle = '#f4f5f7';
    g.font = sans('700', 34);
    g.fillText('TitanAI', PAD + 70, PAD + 38);

    ops.forEach((o) => {
      if (o.k === 'rect') {
        g.fillStyle = o.color;
        g.beginPath();
        if (g.roundRect) g.roundRect(o.x, o.y, o.w, o.h, o.r); else g.rect(o.x, o.y, o.w, o.h);
        g.fill();
      } else {
        g.font = o.font;
        g.fillStyle = o.color;
        g.fillText(o.s, o.x, o.y);
      }
    });

    g.fillStyle = '#6b6b72';
    g.font = sans('400', 24);
    g.fillText('Създадено с TitanAI', PAD, H - PAD + 6);

    c.toBlob((blob) => {
      if (!blob) { toast('Картинката не можа да се създаде'); return; }
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'titanai-' + Date.now() + '.png';
      document.body.append(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 3000);
      toast('Картинката е запазена');
    }, 'image/png');
  }

  function row(role, text, isErr, files) {
    const r = document.createElement('div');
    r.className = 'row ' + (role === 'user' ? 'user' : 'ai');
    if (role === 'user') {
      const col = document.createElement('div');
      col.className = 'ucol';
      if (files && files.length) {
        const fw = document.createElement('div');
        fw.className = 'ufiles';
        files.forEach((f) => fw.append(attChip(f)));
        col.append(fw);
      }
      if (text) {
        const b = document.createElement('div');
        b.className = 'ububble';
        b.textContent = text;
        col.append(b);
      }
      r.append(col);
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
      const bm = document.createElement('button');
      bm.type = 'button';
      bm.title = 'Запази в библиотеката';
      bm.innerHTML = svg('bookmark');
      bm.addEventListener('click', () => saveReply(text));
      const im = document.createElement('button');
      im.type = 'button';
      im.title = 'Запази като картинка';
      im.innerHTML = svg('image');
      im.addEventListener('click', () => exportImage(text));
      const sp = document.createElement('button');
      sp.type = 'button';
      sp.title = 'Прочети на глас';
      sp.innerHTML = svg('volume');
      sp.addEventListener('click', () => speak(text));
      acts.append(cp, bm, im, sp);
      c.append(acts);
    }
    r.append(av, c);
    return r;
  }

  function renderChat() {
    els.messages.innerHTML = '';
    const s = getActive();
    if (s) s.messages.forEach((m) => els.messages.appendChild(row(m.role, m.content, false, m.files)));
    renderChips();
    scrollToBottom(false);
  }

  /* ====================================================================
     TitanAI extras: follow-up chips, read aloud, expert council, prompt
     enhancer, slash commands, export & backup, accent colors, plans, shortcuts
     ==================================================================== */
  let councilOn = false;
  let abortCtl = null;
  let enhancing = false;
  let lastEnhanced = '';
  let undoDraft = '';
  let installEvt = null;

  const CHIPS = [
    ['Опрости', 'Обясни последния си отговор по-просто, с по-кратки изречения.'],
    ['По-кратко', 'Съкрати последния си отговор до най-важното.'],
    ['Дай пример', 'Дай ми конкретен пример към последния ти отговор.'],
    ['Продължи', 'Продължи оттам, където спря.'],
    ['Друг вариант', 'Дай ми различен вариант на последния си отговор.'],
    ['На английски', 'Преведи последния си отговор на английски.'],
  ];

  function renderChips() {
    document.querySelectorAll('.chips').forEach((n) => n.remove());
    if (busy) return;
    const s = getActive();
    if (!s || !s.messages.length || s.messages[s.messages.length - 1].role !== 'assistant') return;
    const rows = els.messages.querySelectorAll('.row.ai');
    const last = rows[rows.length - 1];
    const c = last && last.querySelector('.content');
    if (!c || c.classList.contains('err')) return;
    const box = document.createElement('div');
    box.className = 'chips';
    CHIPS.forEach(([label, prompt]) => box.append(mkBtn(label, 'chip', () => send(prompt))));
    c.append(box);
  }

  function stopGen() { if (abortCtl) abortCtl.abort(); }

  function speak(text) {
    if (!('speechSynthesis' in window)) { toast('Браузърът не поддържа четене на глас'); return; }
    if (window.speechSynthesis.speaking) { window.speechSynthesis.cancel(); return; }
    const clean = String(text).replace(/```[\s\S]*?```/g, ' кодов блок. ').replace(/[*#`_|]/g, '');
    const u = new SpeechSynthesisUtterance(clean.slice(0, 4000));
    u.lang = 'bg-BG';
    window.speechSynthesis.speak(u);
  }

  /* ----- Expert council (3 experts argue, then TitanAI combines them) ----- */
  function setCouncil(on) {
    councilOn = !!on;
    els.plusBtn.classList.toggle('on', councilOn);
    els.input.placeholder = councilOn ? 'Попитай съвета от 3 експерта…' : 'Попитайте TitanAI';
    if (on) toast('Съвет от експерти: Оптимист, Скептик и Прагматик ще отговорят');
  }

  async function askPersona(persona, message, history, signal) {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal,
      body: JSON.stringify({ message, history, persona, stream: false }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || 'Грешка при заявката (' + res.status + ')');
    return String(data.reply || '').trim();
  }

  async function runCouncil(question, history, typing, signal) {
    const label = typing.querySelector('.tlabel');
    const experts = [['optimist', 'Оптимистът'], ['skeptic', 'Скептикът'], ['pragmatist', 'Прагматикът']];
    let done = 0;
    if (label) label.textContent = 'Съветът мисли… (0/3)';
    const results = await Promise.all(experts.map(async ([id, name]) => {
      try {
        return { name, r: await askPersona(id, question, history.slice(-6), signal) };
      } catch (e) {
        return { name, r: '' };
      } finally {
        done += 1;
        if (label) label.textContent = 'Съветът мисли… (' + done + '/3)';
      }
    }));
    if (signal && signal.aborted) { const e = new Error('Спряно.'); e.name = 'AbortError'; throw e; }
    const ok = results.filter((x) => x.r);
    if (!ok.length) throw new Error('Експертите не успяха да отговорят (възможно е лимитът на безплатния модел да е изчерпан). Опитай пак след малко.');
    if (label) label.textContent = 'TitanAI обобщава мненията…';
    return 'Въпрос на потребителя: ' + question + '\n\nТри мнения от експертен съвет:\n' +
      ok.map((x) => '### ' + x.name + '\n' + x.r).join('\n\n') +
      '\n\nСъбери тези мнения в един ясен окончателен отговор: най-напред кратко кои са разногласията, ' +
      'после твоята препоръка и конкретни следващи стъпки. Не цитирай мненията дословно.';
  }

  /* ----- Prompt enhancer ----- */
  els.enhanceBtn.addEventListener('click', async () => {
    if (enhancing || busy) return;
    const draft = els.input.value.trim();
    if (undoDraft && draft === lastEnhanced) {      // second click = undo
      els.input.value = undoDraft;
      undoDraft = '';
      lastEnhanced = '';
      autoResize(); updateSend();
      toast('Върнах оригиналния текст');
      return;
    }
    if (!draft) { toast('Първо напиши нещо в полето'); return; }
    enhancing = true;
    els.enhanceBtn.classList.add('busy');
    try {
      const better = await askPersona('enhancer', draft.slice(0, 3000), [], undefined);
      if (!better) throw new Error('Не получих подобрен вариант');
      undoDraft = els.input.value;
      lastEnhanced = better.slice(0, 12000);
      els.input.value = lastEnhanced;
      autoResize(); updateSend();
      toast('Промптът е подобрен ✨ — натисни пак за връщане');
    } catch (e) {
      toast(e.message || 'Неуспешно подобряване');
    } finally {
      enhancing = false;
      els.enhanceBtn.classList.remove('busy');
    }
  });

  /* ----- Slash commands ----- */
  const SLASH = [
    ['/съвет', 'users', 'Попитай съвет от 3 експерта', null],
    ['/превод', 'book', 'Превод между български и английски', 'Преведи на английски и обясни нюансите: '],
    ['/обобщи', 'library', 'Резюме в 5 ключови точки', 'Обобщи в 5 ключови точки: '],
    ['/поправи', 'edit', 'Поправи правопис и стил', 'Поправи правописа и стила, без да променяш смисъла: '],
    ['/просто', 'sparkle', 'Обясни като на 10-годишен', 'Обясни ми като на 10-годишен: '],
    ['/имейл', 'mail', 'Професионален имейл', 'Напиши професионален имейл за: '],
    ['/идеи', 'sparkle', '10 нестандартни идеи', 'Дай ми 10 нестандартни идеи за: '],
    ['/план', 'clock', 'Стъпков план със срокове', 'Направи ми стъпков план със срокове за: '],
    ['/код', 'code', 'Работещ код с коментари', 'Напиши работещ код с коментари за: '],
    ['/таблица', 'panel', 'Отговор във вид на таблица', 'Представи в таблица (колоните ги избери ти): '],
    ['/плюсове', 'sliders', 'Плюсове, минуси и препоръка', 'Дай ми плюсове, минуси и ясна препоръка за: '],
  ];
  let slashItems = [];
  let slashIdx = 0;
  const slashOpen = () => !els.slashMenu.hidden;
  function slashHide() { els.slashMenu.hidden = true; slashItems = []; }

  function slashPick(i) {
    const it = slashItems[i];
    slashHide();
    if (!it) return;
    if (it[3] === null) { els.input.value = ''; setCouncil(true); } else els.input.value = it[3];
    autoResize(); updateSend();
    els.input.focus();
    els.input.setSelectionRange(els.input.value.length, els.input.value.length);
  }

  function slashPaint() {
    els.slashMenu.innerHTML = '';
    slashItems.forEach((it, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      if (i === slashIdx) b.style.background = '#2b2b30';
      b.innerHTML = `<i class="ic">${svg(it[1])}</i><span class="grow"><b></b><small></small></span>`;
      b.querySelector('b').textContent = it[0];
      b.querySelector('small').textContent = it[2];
      b.addEventListener('mousedown', (e) => e.preventDefault());
      b.addEventListener('click', () => slashPick(i));
      els.slashMenu.append(b);
    });
  }

  function slashUpdate() {
    const m = els.input.value.match(/^\/(\S*)$/);
    if (!m) { if (slashOpen()) slashHide(); return; }
    const q = ('/' + m[1]).toLowerCase();
    slashItems = SLASH.filter((it) => it[0].startsWith(q));
    if (!slashItems.length) { slashHide(); return; }
    slashIdx = 0;
    closeMenus();
    slashPaint();
    els.slashMenu.hidden = false;
  }

  function slashKey(e) {
    if (!slashOpen()) return false;
    if (e.key === 'ArrowDown') { slashIdx = (slashIdx + 1) % slashItems.length; slashPaint(); e.preventDefault(); return true; }
    if (e.key === 'ArrowUp') { slashIdx = (slashIdx - 1 + slashItems.length) % slashItems.length; slashPaint(); e.preventDefault(); return true; }
    if (e.key === 'Enter' || e.key === 'Tab') { e.preventDefault(); slashPick(slashIdx); return true; }
    if (e.key === 'Escape') { slashHide(); e.preventDefault(); return true; }
    return false;
  }

  /* ----- Export chat / backup ----- */
  function downloadBlob(name, text, type) {
    const blob = new Blob([text], { type });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name;
    document.body.append(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 3000);
  }

  const slug = (t) => String(t || 'chat').replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-+|-+$/g, '').slice(0, 40) || 'chat';

  function chatMarkdown(sess) {
    const out = ['# ' + sess.title, ''];
    sess.messages.forEach((m) => {
      out.push(m.role === 'user' ? '**Ти:**' : '**TitanAI:**', '', m.content);
      (m.files || []).forEach((f) => out.push('', '_[файл: ' + f.name + ']_'));
      out.push('');
    });
    return out.join('\n');
  }

  function exportChat(sess) {
    downloadBlob('titanai-' + slug(sess.title) + '.md', chatMarkdown(sess), 'text/markdown;charset=utf-8');
    toast('Чатът е изтеглен');
  }

  function backupData() {
    downloadBlob('titanai-backup-' + new Date().toISOString().slice(0, 10) + '.json', JSON.stringify(snapshot()), 'application/json');
    toast('Резервното копие е изтеглено');
  }

  function restoreBackup() {
    const inp = document.createElement('input');
    inp.type = 'file';
    inp.accept = '.json,application/json';
    inp.addEventListener('change', () => {
      const f = inp.files && inp.files[0];
      if (!f) return;
      const r = new FileReader();
      r.onload = () => {
        let d = null;
        try { d = JSON.parse(String(r.result)); } catch (e) { d = null; }
        if (!d || !Array.isArray(d.sessions)) { toast('Файлът не е валидно резервно копие'); return; }
        modal('Възстановяване от копие', textBlock('<p>Чатовете, бележките и запазените отговори от копието ще бъдат <b>добавени</b> към текущите. Нищо не се изтрива.</p>'), {
          ok: 'Добави',
          onOk: () => {
            const have = new Set(state.sessions.map((x) => x.id));
            d.sessions.forEach((x) => {
              if (x && typeof x.id === 'string' && Array.isArray(x.messages) && !have.has(x.id)) state.sessions.push(x);
            });
            (Array.isArray(d.saved) ? d.saved : []).forEach((x) => {
              if (x && typeof x.text === 'string' && !state.saved.some((y) => y.text === x.text)) state.saved.push(x);
            });
            (Array.isArray(d.notes) ? d.notes : []).forEach((x) => { if (x && typeof x.text === 'string') addNote(x.text); });
            save();
            renderAll();
            toast('Копието е добавено');
          },
        });
      };
      r.readAsText(f);
    });
    inp.click();
  }

  /* ----- Accent colors ----- */
  const ACCENTS = {
    silver: ['Сребро', '#f6f7f9', '#c4c7cd', '#9a9ea6', '#5b6cff'],
    blue: ['Синьо', '#cfe6ff', '#7db2ff', '#4f8cff', '#4f8cff'],
    purple: ['Лилаво', '#e6d2ff', '#b690ff', '#8a5cf0', '#8a5cf0'],
    gold: ['Злато', '#fff0bd', '#f0c75a', '#c99a33', '#d9a93d'],
    green: ['Зелено', '#c9f7d9', '#5fd896', '#2fa86a', '#2fa86a'],
    rose: ['Розово', '#ffd6e5', '#ff7aa6', '#e0457c', '#e0457c'],
  };

  function applyAccent() {
    const a = ACCENTS[state.accent] || ACCENTS.silver;
    const st = document.documentElement.style;
    st.setProperty('--grad', `linear-gradient(135deg, ${a[1]} 0%, ${a[2]} 50%, ${a[3]} 100%)`);
    st.setProperty('--accent', a[4]);
  }

  function settingsExtras() {
    const box = document.createElement('div');
    box.style.marginTop = '14px';

    const lab = document.createElement('label');
    lab.textContent = 'Цвят на акцента';
    const sw = document.createElement('div');
    sw.style.cssText = 'display:flex;gap:10px;flex-wrap:wrap;margin:6px 0 16px';
    Object.entries(ACCENTS).forEach(([id, a]) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.title = a[0];
      b.style.cssText = 'width:34px;height:34px;border-radius:50%;border:2px solid ' + (state.accent === id ? '#fff' : 'transparent') +
        ';background:linear-gradient(135deg,' + a[1] + ',' + a[3] + ')';
      b.addEventListener('click', () => {
        state.accent = id;
        save();
        applyAccent();
        sw.querySelectorAll('button').forEach((x) => { x.style.borderColor = 'transparent'; });
        b.style.borderColor = '#fff';
      });
      sw.append(b);
    });

    const lab2 = document.createElement('label');
    lab2.textContent = 'Резервно копие';
    const r2 = document.createElement('div');
    r2.style.cssText = 'display:flex;gap:10px;flex-wrap:wrap;margin-top:6px';
    r2.append(mkBtn('Изтегли копие', 'inline-btn', backupData), mkBtn('Възстанови от копие', 'inline-btn', restoreBackup));

    box.append(lab, sw, lab2, r2);
    if (installEvt) {
      const r3 = document.createElement('div');
      r3.style.marginTop = '14px';
      r3.append(mkBtn('Инсталирай като приложение', 'inline-btn', async () => {
        try { installEvt.prompt(); await installEvt.userChoice; } catch (e) { /* ignore */ }
        installEvt = null;
      }));
      box.append(r3);
    } else {
      box.append(textBlock('<p class="hint" style="margin-top:14px">На телефон: меню на браузъра → „Добави към началния екран“, за да я ползваш като приложение.</p>'));
    }
    return box;
  }

  window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); installEvt = e; });

  /* ----- Plans ----- */
  function plansModal() {
    const li = (arr) => arr.map(([t, d]) => `<li><span class="ok">✓</span> <b>${t}</b>${d ? ' — ' + d : ''}</li>`).join('');
    const html =
      '<div class="plans">' +
      '<div class="plan"><h4>TitanAI Free</h4><div class="price">0 €</div><ul>' + li([
        ['Чат с базови модели', ''],
        ['Памет', 'до 10 бележки'],
        ['Прикачени файлове', 'до 5 текстови'],
        ['Закачени снимки', 'до 3, за анализи'],
        ['Библиотека', 'до 50 запазени отговора'],
        ['Мобилно приложение', 'пълен достъп'],
      ]) + '</ul></div>' +
      '<div class="plan pro"><h4>TitanAI Pro</h4><div class="price">7 € <small>/ месец</small></div><ul>' + li([
        ['Приоритетна скорост', 'без задръствания'],
        ['Генериране на промптове', 'за Midjourney / DALL-E'],
        ['Анализ на видео', 'до 60 секунди'],
        ['Големи прикачени файлове', 'без лимита от 300 KB'],
        ['Неограничена памет', 'бележките'],
        ['Export на картини', 'за социални мрежи'],
        ['Приоритетна поддръжка', 'от екипа'],
      ]) + '</ul></div></div>' +
      '<p class="hint" style="margin-top:12px">Плащанията още не са свързани — Pro идва скоро.</p>';
    const body = textBlock(html);
    body.classList.add('scroll');
    modal('Планове', body, { cancel: 'Затвори', wide: true });
  }

  /* ----- Shortcuts (by physical key, so they work on a Bulgarian layout too) ----- */
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.code === 'KeyK') {
      e.preventDefault();
      if (els.searchBox.hidden) els.searchBtn.click(); else els.searchInput.focus();
    } else if (e.altKey && e.code === 'KeyN') {
      e.preventDefault();
      startNewChat();
    }
  });

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
    els.greeting.textContent = tempMode ? 'Временен чат — няма да бъде запазен' : state.mode === 'business' ? 'Какъв бизнес въпрос да проучим?' : state.mode === 'work' ? 'По какво работим днес?' : 'Какво предстои днес?';
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
    const n = account ? account.name : (state.profile.name || 'Гост');
    els.pName.textContent = els.pmName.textContent = n;
    els.pPlan.textContent = els.pmPlan.textContent = account ? account.email : 'Влез или се регистрирай';
    els.avatar.textContent = els.pmAvatar.textContent = initials(n);
    els.logoutLabel.textContent = account ? 'Излизане от акаунта' : 'Вход или регистрация';
  }

  function renderAll() {
    renderSidebar();
    renderChat();
    layout();
    updateHero();
    updateProfile();
    updatePluginsBadge();
    applyAccent();
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

  /* ---------- Attachments (code/text files, images, video) ---------- */
  const MAX_FILES = 5;
  const MAX_TEXT_BYTES = 300 * 1024;
  const MAX_TEXT_CHARS = 40000;
  const MAX_IMAGE_BYTES = 25 * 1024 * 1024;
  const MAX_VIDEO_BYTES = 200 * 1024 * 1024;
  const VIDEO_FRAMES = 4;
  let pending = []; // files in the composer: {id, name, kind, status, text|dataUrl|frames, thumb, note}
  let attSeq = 0;

  function renderTray() {
    els.attachTray.innerHTML = '';
    pending.forEach((a) => els.attachTray.append(attChip(a, () => {
      pending = pending.filter((x) => x !== a);
      renderTray();
      updateSend();
    })));
    els.attachTray.hidden = !pending.length;
  }

  function guessKind(f) {
    if (/^image\//.test(f.type) || /\.(png|jpe?g|webp|gif|bmp|svg|avif)$/i.test(f.name)) return 'image';
    if (/^video\//.test(f.type) || /\.(mp4|webm|mov|m4v|ogv)$/i.test(f.name)) return 'video';
    return 'text';
  }

  function toJpeg(src, w, h, max, q) {
    const k = Math.min(1, max / Math.max(w, h));
    const c = document.createElement('canvas');
    c.width = Math.max(1, Math.round(w * k));
    c.height = Math.max(1, Math.round(h * k));
    const g = c.getContext('2d');
    g.fillStyle = '#fff';
    g.fillRect(0, 0, c.width, c.height);
    g.drawImage(src, 0, 0, c.width, c.height);
    return c.toDataURL('image/jpeg', q);
  }

  function readText(file) {
    return new Promise((ok, bad) => {
      const r = new FileReader();
      r.onload = () => ok(String(r.result));
      r.onerror = () => bad(new Error('Файлът „' + file.name + '“ не може да се прочете'));
      r.readAsText(file);
    });
  }

  async function processImage(file, a) {
    if (file.size > MAX_IMAGE_BYTES) throw new Error('Снимката е твърде голяма (макс. 25 MB)');
    const url = URL.createObjectURL(file);
    try {
      const img = new Image();
      await new Promise((ok, bad) => {
        img.onload = ok;
        img.onerror = () => bad(new Error('Този формат снимка не се поддържа от браузъра'));
        img.src = url;
      });
      const w = img.naturalWidth || 1;
      const h = img.naturalHeight || 1;
      a.dataUrl = toJpeg(img, w, h, 1280, 0.82);
      a.thumb = toJpeg(img, w, h, 120, 0.7);
    } finally { URL.revokeObjectURL(url); }
  }

  function seekTo(v, t) {
    return new Promise((ok) => {
      const timer = setTimeout(ok, 4000);
      v.onseeked = () => { clearTimeout(timer); ok(); };
      v.currentTime = t;
    });
  }

  async function processVideo(file, a) {
    if (file.size > MAX_VIDEO_BYTES) throw new Error('Видеото е твърде голямо (макс. 200 MB)');
    const url = URL.createObjectURL(file);
    const v = document.createElement('video');
    v.muted = true;
    v.playsInline = true;
    v.preload = 'auto';
    try {
      await new Promise((ok, bad) => {
        v.onloadeddata = ok;
        v.onerror = () => bad(new Error('Този формат видео не се поддържа от браузъра'));
        v.src = url;
      });
      const dur = isFinite(v.duration) && v.duration > 0 ? v.duration : 0;
      const w = v.videoWidth || 640;
      const h = v.videoHeight || 360;
      const frames = [];
      for (let i = 0; i < VIDEO_FRAMES; i += 1) {
        await seekTo(v, Math.max(0.05, dur ? (dur * (i + 0.5)) / VIDEO_FRAMES : 0.05));
        frames.push(toJpeg(v, w, h, 768, 0.8));
        if (i === 0) a.thumb = toJpeg(v, w, h, 120, 0.7);
      }
      a.frames = frames;
      a.note = dur ? Math.round(dur) + ' сек.' : '';
    } finally { URL.revokeObjectURL(url); }
  }

  async function processText(file, a) {
    if (file.size > MAX_TEXT_BYTES) throw new Error('Файлът „' + file.name + '“ е твърде голям (макс. 300 KB)');
    const t = await readText(file);
    if (t.includes('\u0000')) throw new Error('„' + file.name + '“ не е текстов файл или код и не може да се прочете');
    a.text = t.slice(0, MAX_TEXT_CHARS);
    if (t.length > MAX_TEXT_CHARS) a.note = 'съкратен';
  }

  async function addFiles(list) {
    const files = Array.from(list || []);
    for (const f of files) {
      if (pending.length >= MAX_FILES) { toast('Най-много ' + MAX_FILES + ' файла наведнъж'); break; }
      const kind = guessKind(f);
      if (kind === 'video' && pending.some((x) => x.kind === 'video')) { toast('Може да прикачиш само едно видео наведнъж'); continue; }
      const a = { id: ++attSeq, name: f.name || 'файл', kind, status: 'loading' };
      pending.push(a);
      renderTray();
      updateSend();
      try {
        if (kind === 'image') await processImage(f, a);
        else if (kind === 'video') await processVideo(f, a);
        else await processText(f, a);
        a.status = 'ready';
      } catch (e) {
        pending = pending.filter((x) => x !== a);
        toast(e.message || 'Файлът не може да се добави');
      }
      renderTray();
      updateSend();
    }
  }

  /* ---------- Sending ---------- */
  function updateSend() {
    els.sendBtn.disabled = busy ? false : (!els.input.value.trim() && !pending.length);
    const m = busy ? 'stop' : 'send';
    if (els.sendBtn.dataset.mode !== m) {
      els.sendBtn.dataset.mode = m;
      els.sendBtn.title = busy ? 'Спри' : 'Изпрати';
      els.sendBtn.querySelector('.ic').innerHTML = svg(busy ? 'stop' : 'arrowup');
    }
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

  // What the model should "remember" about an earlier message (text files stay, pictures become a note)
  function historyContent(m) {
    let c = m.content || '';
    (m.files || []).forEach((f) => {
      if (f.kind === 'text') c += '\n\nФайл „' + f.name + '“:\n```\n' + (f.text || '') + '\n```';
      else c += '\n[Прикачено ' + (f.kind === 'video' ? 'видео' : 'изображение') + ': ' + f.name + ']';
    });
    return c.trim();
  }

  async function send(raw) {
    const text = String(raw || '').trim();
    if (busy) return;
    if (pending.some((a) => a.status === 'loading')) { toast('Изчакай файловете да се обработят'); return; }
    const ready = pending.filter((a) => a.status === 'ready');
    if (!text && !ready.length) return;

    const useCouncil = councilOn && !!text && !ready.length && text.length <= 3000;
    if (councilOn) {
      if (!useCouncil) toast('Съветът работи само с текст до 3000 знака — отговарям обикновено');
      setCouncil(false);
    }

    // "запомни: ..." saves a note in Memory
    const rm = text.match(/^запомни(?:,?\s+че)?\s*[:,]?\s+([\s\S]{2,})$/i);
    if (rm && addNote(rm[1])) toast('Запомних го в Паметта');

    let s = getActive();
    if (!s) s = newSession();
    const history = s.messages.map((m) => ({ role: m.role, content: historyContent(m) })).filter((m) => m.content);

    const files = ready.map((a) => {
      const f = { name: a.name, kind: a.kind };
      if (a.kind === 'text') f.text = a.text;
      if (a.thumb) f.thumb = a.thumb;
      if (a.note) f.note = a.note;
      return f;
    });
    const attachments = ready.map((a) => {
      if (a.kind === 'text') return { kind: 'text', name: a.name, text: a.text };
      if (a.kind === 'image') return { kind: 'image', name: a.name, dataUrl: a.dataUrl };
      return { kind: 'video', name: a.name, frames: a.frames };
    });

    const msg = { role: 'user', content: text };
    if (files.length) msg.files = files;
    s.messages.push(msg);
    if (s.title === 'Нов чат') {
      const base = text || (files[0] ? files[0].name : 'Нов чат');
      s.title = base.length > 36 ? base.slice(0, 36) + '…' : base;
    }
    s.updated = Date.now();
    save();

    els.input.value = '';
    pending = [];
    renderTray();
    autoResize();
    busy = true;
    updateSend();
    layout();
    renderSidebar();
    els.messages.appendChild(row('user', text, false, files));
    const typing = showTyping();
    const sid = s.id;
    document.querySelectorAll('.chips').forEach((n) => n.remove());
    abortCtl = new AbortController();
    const signal = abortCtl.signal;

    try {
      let apiText = text;
      if (useCouncil) apiText = await runCouncil(text, history, typing, signal);
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal,
        body: JSON.stringify({
          message: apiText,
          attachments,
          history,
          mode: state.mode,
          effort: state.effort,
          plugins: state.plugins,
          notes: state.notes.map((n) => n.text),
          stream: true,
          instructions: state.profile.instructions,
          userName: state.profile.name === 'Гост' ? '' : state.profile.name,
        }),
      });
      const ct = res.headers.get('content-type') || '';
      let reply = '';
      let live = null;

      if (res.ok && ct.includes('text/event-stream') && res.body) {
        // Answer arrives piece by piece: show it as it comes
        let contentEl = null;
        let raf = 0;
        let streamErr = '';
        let stopped = false;
        const paint = () => {
          raf = 0;
          if (!contentEl) return;
          const near = els.messages.scrollHeight - els.messages.scrollTop - els.messages.clientHeight < 140;
          contentEl.innerHTML = md(reply);
          if (near) scrollToBottom(false);
        };
        const reader = res.body.getReader();
        const dec = new TextDecoder();
        let buf = '';
        try {
          for (;;) {
            const { done, value } = await reader.read();
            if (done) break;
            buf += dec.decode(value, { stream: true });
            let i = buf.indexOf('\n\n');
            while (i >= 0) {
              const block = buf.slice(0, i);
              buf = buf.slice(i + 2);
              i = buf.indexOf('\n\n');
              const line = block.split('\n').find((l) => l.startsWith('data:'));
              if (!line) continue;
              let ev;
              try { ev = JSON.parse(line.slice(5)); } catch (e) { continue; }
              if (ev.t) {
                reply += ev.t;
                if (!live && activeId === sid) {
                  typing.remove();
                  live = row('assistant', null);
                  contentEl = live.querySelector('.content');
                  els.messages.appendChild(live);
                }
                if (!raf) raf = requestAnimationFrame(paint);
              } else if (ev.error) {
                streamErr = String(ev.error);
              }
            }
          }
        } catch (e) {
          if (signal.aborted) stopped = true;
          else streamErr = streamErr || 'връзката прекъсна';
        }
        if (raf) cancelAnimationFrame(raf);
        if (!reply) throw new Error(stopped ? 'Спряно.' : (streamErr || 'Празен отговор от модела'));
        if (stopped) reply += '\n\n(спряно)';
        else if (streamErr) reply += '\n\n(Отговорът беше прекъснат: ' + streamErr + ')';
      } else {
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || (res.status === 413 ? 'Файловете са твърде големи за изпращане' : 'Грешка при заявката (' + res.status + ')'));
        reply = data.reply;
      }

      s.messages.push({ role: 'assistant', content: reply });
      s.updated = Date.now();
      save();
      if (activeId === sid) {
        typing.remove();
        const final = row('assistant', reply);
        if (live) live.replaceWith(final); else els.messages.appendChild(final);
      }
    } catch (err) {
      if (activeId === sid) {
        typing.remove();
        const aborted = err.name === 'AbortError' || err.message === 'Спряно.';
        els.messages.appendChild(row('assistant', aborted ? 'Спряно.' : 'Грешка: ' + err.message, true));
      }
    } finally {
      busy = false;
      abortCtl = null;
      updateSend();
      renderSidebar();
      renderChips();
      scrollToBottom();
      els.input.focus();
    }
  }

  /* ---------- Composer events ---------- */
  els.chatForm.addEventListener('submit', (e) => { e.preventDefault(); if (busy) { stopGen(); return; } send(els.input.value); });
  els.input.addEventListener('keydown', (e) => {
    if (slashKey(e)) return;
    if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) {
      e.preventDefault();
      send(els.input.value);
    }
  });
  els.input.addEventListener('input', () => { autoResize(); updateSend(); slashUpdate(); });

  els.plusBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu(els.plusMenu, () => {
      els.plusMenu.innerHTML = '';
      els.plusMenu.append(
        menuItem('clip', 'Прикачи файл, снимка или видео', () => els.fileInput.click()),
        menuItem('users', councilOn ? 'Изключи съвета от експерти' : 'Попитай съвет от 3 експерта', () => setCouncil(!councilOn)),
        menuItem('trash', 'Изчисти полето', () => {
          els.input.value = '';
          pending = [];
          renderTray();
          autoResize();
          updateSend();
        })
      );
    });
  });

  els.fileInput.addEventListener('change', () => {
    const list = Array.from(els.fileInput.files || []);
    els.fileInput.value = '';
    addFiles(list);
  });

  // Paste a screenshot / drag & drop files onto the composer
  els.input.addEventListener('paste', (e) => {
    const fs = e.clipboardData && e.clipboardData.files;
    if (fs && fs.length) { e.preventDefault(); addFiles(fs); }
  });
  ['dragenter', 'dragover'].forEach((ev) => els.composerWrap.addEventListener(ev, (e) => {
    if (e.dataTransfer && Array.from(e.dataTransfer.types || []).includes('Files')) {
      e.preventDefault();
      els.composerWrap.classList.add('drag');
    }
  }));
  els.composerWrap.addEventListener('dragleave', (e) => {
    if (!els.composerWrap.contains(e.relatedTarget)) els.composerWrap.classList.remove('drag');
  });
  els.composerWrap.addEventListener('drop', (e) => {
    if (!e.dataTransfer || !e.dataTransfer.files.length) return;
    e.preventDefault();
    els.composerWrap.classList.remove('drag');
    addFiles(e.dataTransfer.files);
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

  /* ---------- Library, Plugins, Browse ---------- */
  const fmtDate = (ts) => new Date(ts).toLocaleDateString('bg-BG', { day: 'numeric', month: 'short', year: 'numeric' });
  const closeModal = (node) => { const ov = node.closest('.overlay'); if (ov) ov.remove(); };

  function libraryModal() {
    let tab = 'files';
    const body = document.createElement('div');
    const tabs = document.createElement('div');
    tabs.className = 'tabs';
    const tFiles = mkBtn('Файлове', 'tab', () => setTab('files'));
    const tSaved = mkBtn('Запазени отговори', 'tab', () => setTab('saved'));
    tabs.append(tFiles, tSaved);
    const list = document.createElement('div');
    list.className = 'scroll';
    list.style.marginTop = '12px';
    body.append(tabs, list);

    function emptyNote(t) {
      const d = document.createElement('div');
      d.className = 'empty-note';
      d.textContent = t;
      return d;
    }

    function renderFiles() {
      const items = [];
      state.sessions.filter((x) => !x.temp).forEach((x) => x.messages.forEach((m) => (m.files || []).forEach((f) => items.push({ f, s: x }))));
      items.sort((a, b) => (b.s.updated || 0) - (a.s.updated || 0));
      if (!items.length) { list.append(emptyNote('Още няма файлове. Прикачените в чатовете файлове, снимки и видеа ще се появят тук.')); return; }
      items.forEach(({ f, s: sess }) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'item';
        if (f.thumb) { const im = document.createElement('img'); im.className = 'thumb'; im.alt = ''; im.src = f.thumb; b.append(im); }
        else { const ic = document.createElement('span'); ic.className = 'ficon'; ic.innerHTML = svg(KIND_ICON[f.kind] || 'file'); b.append(ic); }
        const info = document.createElement('span');
        info.className = 'info';
        const t = document.createElement('b');
        t.textContent = f.name;
        const sm = document.createElement('small');
        sm.textContent = (KIND_LABEL[f.kind] || 'Файл') + ' · ' + sess.title + ' · ' + fmtDate(sess.updated);
        info.append(t, sm);
        b.append(info);
        b.addEventListener('click', () => { closeModal(body); selectSession(sess.id); });
        list.append(b);
      });
    }

    function renderSaved() {
      if (!state.saved.length) { list.append(emptyNote('Още няма запазени отговори. Натисни иконата с отметка под отговор на TitanAI, за да го запазиш тук.')); return; }
      state.saved.forEach((it) => {
        const d = document.createElement('div');
        d.className = 'item';
        const info = document.createElement('div');
        info.className = 'info';
        const t = document.createElement('b');
        t.textContent = it.title || 'Отговор';
        const sm = document.createElement('small');
        sm.textContent = fmtDate(it.ts);
        const p = document.createElement('p');
        const short = it.text.length > 180 ? it.text.slice(0, 180) + '…' : it.text;
        let open = false;
        p.textContent = short;
        info.style.cursor = 'pointer';
        info.addEventListener('click', () => { open = !open; p.textContent = open ? it.text : short; });
        info.append(t, sm, p);
        const btns = document.createElement('div');
        btns.className = 'btns';
        const cp = document.createElement('button');
        cp.type = 'button'; cp.title = 'Копирай'; cp.innerHTML = svg('copy');
        cp.addEventListener('click', () => navigator.clipboard.writeText(it.text).then(() => toast('Копирано'), () => toast('Неуспешно копиране')));
        const del = document.createElement('button');
        del.type = 'button'; del.title = 'Премахни'; del.innerHTML = svg('trash');
        del.addEventListener('click', () => { state.saved = state.saved.filter((x) => x.id !== it.id); save(); setTab('saved'); });
        btns.append(cp, del);
        d.append(info, btns);
        list.append(d);
      });
    }

    function setTab(t) {
      tab = t;
      tFiles.classList.toggle('on', t === 'files');
      tSaved.classList.toggle('on', t === 'saved');
      list.innerHTML = '';
      if (tab === 'files') renderFiles(); else renderSaved();
    }

    modal('Библиотека', body, { cancel: 'Затвори', wide: true });
    setTab('files');
  }

  const PLUGINS = [
    ['coder', 'Кодер', 'Намира грешки и пише чист, коментиран код.', 'code'],
    ['translator', 'Преводач', 'Превежда текстове (по подразбиране между български и английски).', 'book'],
    ['writer', 'Писател', 'Помага с имейли, есета и постове и ги редактира.', 'edit'],
    ['summarizer', 'Обобщител', 'Прави кратко резюме и ключови точки от дълги текстове.', 'library'],
    ['teacher', 'Учител', 'Обяснява стъпка по стъпка, с пример и въпрос за проверка.', 'sparkle'],
    ['imageprompt', 'Промпт за картинки', 'Превръща описание в готов промпт за Midjourney или друг генератор на картинки.', 'image'],
    ['designer', 'Дизайнер', 'Предлага палитри с цветове, стил, композиция и CSS код.', 'sparkle'],
    ['reviewer', 'Ревизор', 'Преглежда код за грешки и рискове, преди да го пуснеш.', 'search'],
    ['analyst', 'Анализатор', 'Сравнява варианти, плюсове и минуси и дава препоръка.', 'sliders'],
    ['marketer', 'Маркетолог', 'Идеи за реклама, текстове и план за социални мрежи.', 'sparkle'],
    ['debater', 'Дебатьор', 'Защитава обратната гледна точка, за да провериш идеите си.', 'sliders'],
    ['factcheck', 'Проверка на факти', 'Отделя сигурното от несигурното и казва какво да провериш.', 'search'],
    ['interviewer', 'Интервюър', 'Задава въпроси като на интервю и оценява отговорите ти.', 'user'],
    ['chef', 'Готвач', 'Рецепти по продуктите, които имаш, с количества и стъпки.', 'book'],
    ['coach', 'Треньор', 'Планове за навици и тренировки на малки стъпки (не е лекар).', 'check'],
    ['strategist', 'Стратег', 'Разбива цел на етапи, срокове и първи действия за днес.', 'clock'],
    ['storyteller', 'Разказвач', 'Пише истории, сцени и диалози с характер.', 'edit'],
  ];

  function updatePluginsBadge() {
    const n = state.plugins.length;
    els.pluginsBadge.hidden = !n;
    els.pluginsBadge.textContent = n;
  }

  function pluginsModal() {
    const body = document.createElement('div');
    const sub = document.createElement('p');
    sub.className = 'sub';
    sub.textContent = 'Включените плъгини влияят на всички следващи отговори на TitanAI.';
    const list = document.createElement('div');
    list.className = 'scroll';
    PLUGINS.forEach(([id, name, desc, icon]) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'item' + (state.plugins.includes(id) ? ' on' : '');
      b.innerHTML = `<span class="ficon">${svg(icon)}</span><span class="info"><b></b><small></small></span><span class="switch"></span>`;
      b.querySelector('b').textContent = name;
      b.querySelector('small').textContent = desc;
      b.addEventListener('click', () => {
        const on = !state.plugins.includes(id);
        if (on && state.plugins.length >= 8) { toast('Най-много 8 плъгина наведнъж'); return; }
        state.plugins = on ? [...state.plugins, id] : state.plugins.filter((x) => x !== id);
        b.classList.toggle('on', on);
        save();
        updatePluginsBadge();
      });
      list.append(b);
    });
    body.append(sub, list);
    modal('Плъгини', body, { cancel: 'Готово', wide: true });
  }

  const BROWSE = [
    ['Писане', [
      'Напиши учтив имейл до колега, в който моля за удължаване на срока',
      'Преработи този текст, за да звучи по-професионално: ',
      'Измисли 5 заглавия за публикация на тема: ',
    ]],
    ['Код', [
      'Обясни ми този код ред по ред: ',
      'Намери грешката в този код и ми покажи поправка: ',
      'Напиши функция на JavaScript, която ',
      'Как мога да оптимизирам тази SQL заявка? ',
    ]],
    ['Учене', [
      'Обясни ми как работи фотосинтезата с прости думи',
      'Направи ми план за учене на английски за 30 дни',
      'Изпитай ме с 5 въпроса по темата: ',
    ]],
    ['Работа', [
      'Направи ми план за седмицата по приоритети: ',
      'Обобщи този текст в 5 ключови точки: ',
      'Напиши шаблон за седмичен отчет към шефа',
    ]],
    ['Идеи', [
      'Предложи ми 10 идеи за подарък за ',
      'Измисли име за проект, който ',
      'Какво мога да сготвя със следните продукти: ',
    ]],
  ];

  function browseModal() {
    const body = document.createElement('div');
    const sub = document.createElement('p');
    sub.className = 'sub';
    sub.textContent = 'Избери идея и тя ще се появи в полето за съобщение — можеш да я допълниш преди изпращане.';
    const list = document.createElement('div');
    list.className = 'scroll';
    BROWSE.forEach(([cat, prompts]) => {
      const h = document.createElement('div');
      h.className = 'cat';
      h.textContent = cat;
      list.append(h);
      prompts.forEach((p) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'item';
        b.innerHTML = `<span class="info"><b style="white-space:normal"></b></span>`;
        b.querySelector('b').textContent = p.trim();
        b.addEventListener('click', () => {
          closeModal(body);
          if (busy) { toast('Изчакай отговора на TitanAI'); return; }
          startNewChat();
          els.input.value = p;
          autoResize();
          updateSend();
          els.input.focus();
          els.input.setSelectionRange(p.length, p.length);
        });
        list.append(b);
      });
    });
    body.append(sub, list);
    modal('Разглеждане', body, { cancel: 'Затвори', wide: true });
  }

  els.libraryBtn.addEventListener('click', libraryModal);
  els.pluginsBtn.addEventListener('click', pluginsModal);
  els.browseBtn.addEventListener('click', browseModal);

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
      upgrade: plansModal,
      personal: personalModal,
      memory: memoryModal,
      profile: () => (account ? profileModal() : authModal('login')),
      settings: settingsModal,
      help: helpModal,
      logout: () => (account ? logoutModal() : authModal('login')),
    })[b.dataset.act]();
  });

  function profileModal() {
    const wrap = document.createElement('div');
    const inp = document.createElement('input');
    inp.value = account.name;
    inp.maxLength = 40;
    const mail = document.createElement('input');
    mail.value = account.email;
    mail.disabled = true;
    wrap.append(field('Име', inp), field('Имейл', mail));
    const del = mkBtn('Изтрий акаунта', 'inline-btn danger', deleteAccountModal);
    del.style.marginTop = '16px';
    wrap.append(del);
    modal('Профил', wrap, {
      onOk: async () => {
        const v = inp.value.trim();
        if (!v) return false;
        if (v === account.name) return;
        try {
          const d = await api('/api/auth/name', 'PUT', { name: v });
          account.name = d.user.name;
          state.profile.name = account.name;
          save();
          updateProfile();
        } catch (e) { toast(e.message); return false; }
      },
    });
  }

  function deleteAccountModal() {
    const pw = document.createElement('input');
    pw.type = 'password';
    pw.autocomplete = 'current-password';
    modal('Изтриване на акаунта', field('Въведи паролата си. Акаунтът и чатовете му ще бъдат изтрити завинаги.', pw), {
      ok: 'Изтрий завинаги', danger: true,
      onOk: async () => {
        try {
          await api('/api/auth/account', 'DELETE', { password: pw.value });
          location.reload();
        } catch (e) { toast(e.message); return false; }
      },
    });
  }

  function addNote(raw) {
    const t = String(raw || '').trim().slice(0, 300);
    if (!t) return false;
    if (state.notes.some((n) => n.text === t)) return true;
    if (state.notes.length >= 40) { toast('Паметта е пълна (макс. 40 бележки). Изтрий някоя.'); return false; }
    state.notes.push({ id: 'n' + Date.now() + Math.random().toString(36).slice(2, 5), text: t, ts: Date.now() });
    save();
    return true;
  }

  function memoryModal() {
    const body = document.createElement('div');
    const sub = document.createElement('p');
    sub.className = 'sub';
    sub.textContent = 'Бележките се пращат на TitanAI във всеки разговор, за да те познава. Можеш и да напишеш в чата „запомни: …“.';
    const row1 = document.createElement('div');
    row1.style.cssText = 'display:flex;gap:8px;margin-bottom:12px';
    const inp = document.createElement('input');
    inp.maxLength = 300;
    inp.placeholder = 'Напр.: Работя като фризьор и пиша на „ти“';
    const add = mkBtn('Добави', 'inline-btn', () => {
      if (addNote(inp.value)) { inp.value = ''; draw(); }
    });
    inp.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); add.click(); } });
    row1.append(inp, add);
    const list = document.createElement('div');
    list.className = 'scroll';
    body.append(sub, row1, list);

    function draw() {
      list.innerHTML = '';
      if (!state.notes.length) {
        const d = document.createElement('div');
        d.className = 'empty-note';
        d.textContent = 'Още няма бележки.';
        list.append(d);
        return;
      }
      state.notes.forEach((n) => {
        const d = document.createElement('div');
        d.className = 'item';
        const info = document.createElement('div');
        info.className = 'info';
        const p = document.createElement('p');
        p.style.marginTop = '0';
        p.textContent = n.text;
        info.append(p);
        const btns = document.createElement('div');
        btns.className = 'btns';
        const del = document.createElement('button');
        del.type = 'button'; del.title = 'Изтрий'; del.innerHTML = svg('trash');
        del.addEventListener('click', () => { state.notes = state.notes.filter((x) => x.id !== n.id); save(); draw(); });
        btns.append(del);
        d.append(info, btns);
        list.append(d);
      });
    }
    modal('Памет', body, { cancel: 'Затвори', wide: true });
    draw();
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
    wrap.append(textBlock(account
      ? '<p>Чатовете ти се синхронизират с акаунта.</p>'
      : '<p>Чатовете се пазят само в този браузър. Влез в профил, за да ги имаш навсякъде.</p>'));
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
    wrap.append(settingsExtras());
    clear.style.marginTop = '18px';
    wrap.append(clear);
    modal('Настройки', wrap, { cancel: 'Затвори' });
  }

  function helpModal() {
    modal('Помощ', textBlock(
      '<ul><li><b>Enter</b> — изпраща съобщението, <b>Shift+Enter</b> — нов ред.</li>' +
      '<li><b>+</b> — прикачва файл с код или текст, снимка или видео (може и с влачене или поставяне на снимка).</li>' +
      '<li><b>Памет</b> (в менюто на профила) — бележки, които TitanAI помни; под всеки отговор има бутони за копиране, запазване и <b>запис като картинка</b>.</li>' +
      '<li><b>Плъгини</b> — включват специални умения; <b>Библиотека</b> — файловете и запазените отговори; <b>Разглеждане</b> — готови идеи.</li>' +
      '<li><b>Low / Medium / High</b> — колко подробен да е отговорът.</li>' +
      '<li><b>Chat / Work</b> — свободен разговор или работен режим.</li>' +
      '<li>Иконата горе вдясно пуска <b>временен чат</b>, който не се запазва.</li>' +
      '<li>Напиши <b>/</b> в полето за готови команди (/превод, /обобщи, /съвет…).</li>' +
      '<li><b>✨</b> до полето подобрява промпта ти (натисни пак за връщане); <b>+ → Съвет от 3 експерта</b> задава въпроса на трима „експерти“.</li>' +
      '<li>Бутонът за изпращане става <b>Спри</b> по време на отговор (или Esc). Под отговора има бутони за бързи продължения и четене на глас.</li>' +
      '<li><b>Ctrl+K</b> — търсене, <b>Alt+N</b> — нов чат.</li></ul>'
    ), { cancel: 'Затвори' });
  }

  function logoutModal() {
    modal('Излизане от акаунта', textBlock('<p>Чатовете ти остават запазени в акаунта и ще ги видиш, когато влезеш отново.</p>'), {
      ok: 'Излез', danger: true,
      onOk: async () => {
        await pushRemote(false);
        try { await api('/api/auth/logout', 'POST'); } catch (e) { /* ignore */ }
        location.reload();
      },
    });
  }

  /* ---------- Accounts ---------- */
  async function api(url, method = 'GET', body) {
    const res = await fetch(url, {
      method,
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || 'Грешка (' + res.status + ')');
    return data;
  }

  function authModal(initial) {
    let mode = initial || 'login';
    let okBtn = null;
    const wrap = document.createElement('div');
    const tabs = document.createElement('div');
    tabs.className = 'tabs';
    const tLogin = mkBtn('Вход', 'tab', () => setMode('login'));
    const tReg = mkBtn('Регистрация', 'tab', () => setMode('register'));
    tabs.append(tLogin, tReg);

    const name = document.createElement('input');
    name.maxLength = 40;
    name.placeholder = 'Как да те наричам?';
    name.autocomplete = 'name';
    const email = document.createElement('input');
    email.type = 'email';
    email.maxLength = 254;
    email.placeholder = 'ime@primer.com';
    email.autocomplete = 'email';
    const pass = document.createElement('input');
    pass.type = 'password';
    pass.maxLength = 200;

    const nameField = field('Име', name);
    const hint = textBlock('<p class="hint">Паролата трябва да е поне 8 символа.</p>');
    const err = document.createElement('div');
    err.className = 'form-err';
    wrap.append(tabs, nameField, field('Имейл', email), field('Парола', pass), hint, err);

    function setMode(m) {
      mode = m;
      tLogin.classList.toggle('on', m === 'login');
      tReg.classList.toggle('on', m === 'register');
      nameField.hidden = m !== 'register';
      hint.hidden = m !== 'register';
      pass.autocomplete = m === 'login' ? 'current-password' : 'new-password';
      if (okBtn) okBtn.textContent = m === 'login' ? 'Вход' : 'Създай профил';
      err.textContent = '';
    }

    const box = modal('Добре дошъл в TitanAI', wrap, {
      ok: 'Вход',
      onOk: async () => {
        err.textContent = '';
        try {
          const data = await api(
            mode === 'login' ? '/api/auth/login' : '/api/auth/register',
            'POST',
            { email: email.value, password: pass.value, name: name.value }
          );
          await adoptAccount(data.user, false);
        } catch (e) {
          err.textContent = e.message;
          return false;
        }
      },
    });
    okBtn = box.querySelector('.m-actions .primary');
    wrap.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { e.preventDefault(); okBtn.click(); }
    });
    setMode(mode);
    email.focus();
  }

  async function adoptAccount(user, silent) {
    account = user;
    remoteReady = false;
    let remote = null;
    let loaded = false;
    try {
      remote = (await api('/api/data')).data;
      loaded = true;
    } catch (e) {
      toast('Чатовете не можаха да се заредят от акаунта');
    }
    if (loaded) {
      const hasRemote = remote && Array.isArray(remote.sessions);
      if (hasRemote) {
        state.sessions = remote.sessions;
        state.saved = Array.isArray(remote.saved) ? remote.saved : state.saved;
        state.plugins = Array.isArray(remote.plugins) ? remote.plugins : state.plugins;
        state.notes = Array.isArray(remote.notes) ? remote.notes : state.notes;
        state.profile = { ...state.profile, ...(remote.profile || {}) };
        state.effort = remote.effort || state.effort;
        state.mode = remote.mode || state.mode;
        state.pinnedOpen = remote.pinnedOpen !== false;
        state.accent = remote.accent || state.accent;
      }
      state.profile.name = user.name;
      remoteReady = true;
      if (!hasRemote) await pushRemote(false); // new account: keep the guest chats
    }
    activeId = null;
    tempMode = false;
    renderAll();
    if (!silent) toast('Влязъл си като ' + user.email);
  }

  async function loadAccount() {
    try {
      const { user } = await api('/api/auth/me');
      if (user) await adoptAccount(user, true);
    } catch (e) { /* stay in guest mode */ }
  }

  /* ---------- Init ---------- */
  renderAll();
  updateSend();
  els.input.focus();
  loadAccount();
})();