/* Shared multi-user data layer for the Midway field tool.
 * Built-in email+password auth (HMAC session token in localStorage).
 * Captures + sections live on the server in compact index blobs so the
 * read path stays one round-trip at 20k+ entries; photos are separate blobs.
 *
 * Offline behavior: saveCapture posts directly when online and falls back
 * to an IndexedDB outbox on network errors. A background flusher drains
 * the outbox on connectivity recovery, with exponential backoff and a
 * fatal-after-N-attempts cap. Subscribers see inFlight + queued counts
 * (for UI gating) and per-item success / failure events.
 */
(function () {
  const FN = "/.netlify/functions";
  const TOK = "midway_session";
  let token = null, me = null;
  const sessListeners = [];
  try { token = localStorage.getItem(TOK) || null; } catch (_) {}

  const fire = () => sessListeners.forEach((f) => { try { f(me); } catch (_) {} });
  const onChange = (fn) => { sessListeners.push(fn); };
  const user = () => me;
  const userName = () => (me ? (me.name || me.email) : "");
  const isAdmin = () => !!(me && me.role === "admin");

  function authHeader() { return token ? { authorization: "Bearer " + token } : {}; }

  async function api(action, payload) {
    const r = await fetch(`${FN}/auth`, {
      method: "POST",
      headers: { "content-type": "application/json", ...authHeader() },
      body: JSON.stringify({ action, ...(payload || {}) }),
    });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(j.error || (action + " " + r.status));
    return j;
  }

  function setSession(j) {
    token = j.token; me = j.user;
    try { localStorage.setItem(TOK, token); } catch (_) {}
    fire(); closeModal();
    flushOutbox();
  }
  function logout() {
    token = null; me = null;
    try { localStorage.removeItem(TOK); } catch (_) {}
    fire();
  }

  async function init() {
    const params = new URLSearchParams(location.search);
    if (params.get("invite") && params.get("email")) { openModal("accept", params); return me; }
    if (token) { try { const j = await api("me"); me = j.user; } catch (_) { logout(); } }
    fire();
    if (me) flushOutbox();
    return me;
  }

  // ---- IndexedDB outbox --------------------------------------------------
  // Single store keyed by auto-increment id. Each row: { moduleId, opts,
  // attempts, createdAt }. Photo data URLs live inside opts.photoDataUrl.
  const DB_NAME = "midway_v1", STORE = "outbox";
  let dbPromise = null;
  function openDB() {
    if (dbPromise) return dbPromise;
    dbPromise = new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, 1);
      req.onupgradeneeded = () => { req.result.createObjectStore(STORE, { keyPath: "id", autoIncrement: true }); };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
    return dbPromise;
  }
  function tx(mode) { return openDB().then((db) => db.transaction(STORE, mode).objectStore(STORE)); }
  function req2promise(r) { return new Promise((res, rej) => { r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); }); }
  async function outboxAdd(entry) { const s = await tx("readwrite"); return req2promise(s.add({ ...entry, createdAt: Date.now(), attempts: 0 })); }
  async function outboxAll() { const s = await tx("readonly"); return req2promise(s.getAll()); }
  async function outboxDel(id) { const s = await tx("readwrite"); return req2promise(s.delete(id)); }
  async function outboxUpd(id, patch) {
    const s = await tx("readwrite");
    const cur = await req2promise(s.get(id));
    if (!cur) return;
    return req2promise(s.put({ ...cur, ...patch }));
  }

  // ---- Queue state + listeners ------------------------------------------
  let inFlight = 0;
  let queuedCount = 0;
  const qListeners = [];
  const failListeners = [];
  const syncListeners = [];

  async function refreshQueued() { try { queuedCount = (await outboxAll()).length; } catch { queuedCount = 0; } emitQ(); }
  function emitQ() { qListeners.forEach((f) => { try { f({ inFlight, queued: queuedCount }); } catch {} }); }
  function emitFail(d) { failListeners.forEach((f) => { try { f(d); } catch {} }); }
  function emitSync(d) { syncListeners.forEach((f) => { try { f(d); } catch {} }); }

  function isNetworkErr(err) {
    // Network/offline errors come back as TypeError ("Failed to fetch")
    // or AbortError. Anything HTTP (4xx/5xx with JSON body) is treated as
    // non-retryable so we don't loop on 401/403/400.
    return err && (err.name === "TypeError" || err.name === "AbortError" || /network|failed to fetch|load failed/i.test(err.message || ""));
  }

  async function postCapture(moduleId, opts) {
    const r = await fetch(`${FN}/capture`, {
      method: "POST",
      headers: { "content-type": "application/json", ...authHeader() },
      body: JSON.stringify({ moduleId, ...opts }),
    });
    if (!r.ok) {
      let msg = "capture " + r.status;
      try { const j = await r.json(); if (j.error) msg = j.error; } catch {}
      const err = new Error(msg); err.status = r.status; throw err;
    }
    return r.json();
  }

  let flushing = false, flushTimer = null;
  function scheduleFlush(ms) {
    if (flushTimer) return;
    flushTimer = setTimeout(() => { flushTimer = null; flushOutbox(); }, ms);
  }
  async function flushOutbox() {
    if (flushing || !token) return;
    flushing = true;
    try {
      const items = await outboxAll();
      queuedCount = items.length; emitQ();
      for (const it of items) {
        if (!navigator.onLine) { scheduleFlush(5000); break; }
        inFlight++; emitQ();
        try {
          const res = await postCapture(it.moduleId, it.opts);
          await outboxDel(it.id);
          queuedCount--; emitQ();
          emitSync({ moduleId: it.moduleId, opts: it.opts, result: res });
        } catch (err) {
          const attempts = (it.attempts || 0) + 1;
          const fatal = !isNetworkErr(err) || attempts >= 4;
          if (fatal) {
            await outboxDel(it.id);
            queuedCount--; emitQ();
            emitFail({ moduleId: it.moduleId, opts: it.opts, error: err.message || String(err) });
          } else {
            await outboxUpd(it.id, { attempts });
            scheduleFlush(Math.min(60000, 2000 * Math.pow(2, attempts)));
            break;
          }
        } finally { inFlight--; emitQ(); }
      }
    } finally { flushing = false; }
  }
  window.addEventListener("online", () => flushOutbox());

  // ---- Data API ----------------------------------------------------------
  async function listCaptures() {
    const r = await fetch(`${FN}/captures`, { headers: authHeader() });
    if (!r.ok) throw new Error("captures " + r.status);
    const j = await r.json();
    // Backwards-compat: pile_viewer.html and drawings.html both call
    // listCaptures() and expect a moduleId-keyed map of capture metadata.
    return j.captures || {};
  }
  async function listAll() {
    const r = await fetch(`${FN}/captures`, { headers: authHeader() });
    if (!r.ok) throw new Error("captures " + r.status);
    return r.json(); // { captures, sections }
  }
  async function listSections() {
    const r = await fetch(`${FN}/sections`, { headers: authHeader() });
    if (!r.ok) throw new Error("sections " + r.status);
    return (await r.json()).sections || {};
  }
  async function assignSections(map) {
    const r = await fetch(`${FN}/sections`, {
      method: "POST",
      headers: { "content-type": "application/json", ...authHeader() },
      body: JSON.stringify({ assign: map }),
    });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(j.error || ("sections " + r.status));
    return j;
  }

  // Direct save attempt; on offline/network error, queue and return a
  // queued result. Anything else (auth, server) bubbles up so the caller
  // surfaces it immediately.
  async function saveCapture(moduleId, opts = {}) {
    if (!navigator.onLine) {
      await outboxAdd({ moduleId, opts });
      refreshQueued();
      scheduleFlush(2000);
      return { ok: true, queued: true, moduleId };
    }
    inFlight++; emitQ();
    try {
      const res = await postCapture(moduleId, opts);
      return { ok: true, online: true, ...res };
    } catch (err) {
      if (isNetworkErr(err)) {
        await outboxAdd({ moduleId, opts });
        refreshQueued();
        scheduleFlush(2000);
        return { ok: true, queued: true, moduleId };
      }
      throw err;
    } finally { inFlight--; emitQ(); }
  }

  function photoUrl(moduleId, bust) {
    return `${FN}/photo?id=${encodeURIComponent(moduleId)}&k=${encodeURIComponent(token || "")}` + (bust ? `&t=${bust}` : "");
  }
  async function invite(email, name) {
    const j = await api("invite", { email, name });
    const link = `${location.origin}/drawings.html?invite=${encodeURIComponent(j.inviteToken)}&email=${encodeURIComponent(j.email)}`;
    return { email: j.email, link };
  }

  // ---- Injected auth modal (unchanged) ----------------------------------
  let modal = null;
  function ensureModal() {
    if (modal) return modal;
    const wrap = document.createElement("div");
    wrap.id = "midway-auth";
    wrap.innerHTML = `
      <div class="ma-back"></div>
      <div class="ma-card">
        <div class="ma-title">Sign in</div>
        <div class="ma-sub"></div>
        <input class="ma-name" type="text" placeholder="Your name" style="display:none" autocomplete="name" />
        <input class="ma-email" type="email" placeholder="Email" autocomplete="username" />
        <input class="ma-pass" type="password" placeholder="Password" autocomplete="current-password" />
        <div class="ma-err"></div>
        <button class="ma-go">Sign in</button>
        <div class="ma-foot"></div>
      </div>`;
    const css = document.createElement("style");
    css.textContent = `
      #midway-auth{position:fixed;inset:0;z-index:9999;display:none;font-family:ui-sans-serif,system-ui,sans-serif}
      #midway-auth.show{display:block}
      #midway-auth .ma-back{position:absolute;inset:0;background:rgba(4,6,12,.7)}
      #midway-auth .ma-card{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:330px;max-width:92vw;
        background:#12162a;color:#e8eaf0;border:1px solid rgba(255,255,255,.1);border-radius:14px;padding:22px;box-shadow:0 12px 40px rgba(0,0,0,.5)}
      #midway-auth .ma-title{font-size:18px;font-weight:700}
      #midway-auth .ma-sub{color:#9aa1b2;font-size:12.5px;margin:4px 0 14px}
      #midway-auth input{width:100%;box-sizing:border-box;margin-bottom:10px;padding:11px;border-radius:9px;
        border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.05);color:#e8eaf0;font-size:15px;font-family:inherit}
      #midway-auth input:focus{outline:none;border-color:#f97316}
      #midway-auth .ma-err{color:#fca5a5;font-size:12px;min-height:16px;margin-bottom:6px}
      #midway-auth .ma-go{width:100%;padding:12px;border:0;border-radius:9px;background:#f97316;color:#1a1205;
        font-weight:700;font-size:15px;cursor:pointer;font-family:inherit}
      #midway-auth .ma-foot{color:#9aa1b2;font-size:12px;margin-top:12px;text-align:center}`;
    document.head.appendChild(css);
    document.body.appendChild(wrap);
    wrap.querySelector(".ma-back").addEventListener("click", closeModal);
    wrap.querySelector(".ma-go").addEventListener("click", submit);
    wrap.querySelector(".ma-pass").addEventListener("keydown", (e) => { if (e.key === "Enter") submit(); });
    modal = wrap; return wrap;
  }
  let mode = "login", inviteParams = null;
  async function openModal(forceMode, params) {
    ensureModal();
    inviteParams = params || null;
    if (forceMode) mode = forceMode;
    else { try { mode = (await api("status")).hasUsers ? "login" : "signup"; } catch { mode = "login"; } }
    const q = (s) => modal.querySelector(s);
    q(".ma-err").textContent = "";
    q(".ma-name").style.display = (mode === "login") ? "none" : "block";
    if (mode === "signup") {
      q(".ma-title").textContent = "Create admin account";
      q(".ma-sub").textContent = "You're the first user — this account becomes the project admin.";
      q(".ma-go").textContent = "Create account";
      q(".ma-pass").setAttribute("autocomplete", "new-password");
    } else if (mode === "accept") {
      q(".ma-title").textContent = "Set your password";
      q(".ma-sub").textContent = "You've been invited. Choose a password to join the project.";
      q(".ma-email").value = inviteParams ? inviteParams.get("email") : "";
      q(".ma-email").setAttribute("readonly", "true");
      q(".ma-go").textContent = "Join project";
      q(".ma-pass").setAttribute("autocomplete", "new-password");
    } else {
      q(".ma-title").textContent = "Sign in";
      q(".ma-sub").textContent = "Captures are shared and logged with your name + time.";
      q(".ma-go").textContent = "Sign in";
      q(".ma-email").removeAttribute("readonly");
      q(".ma-pass").setAttribute("autocomplete", "current-password");
    }
    modal.classList.add("show");
    setTimeout(() => { const e = q(mode === "accept" ? ".ma-pass" : ".ma-email"); e && e.focus(); }, 50);
  }
  function closeModal() { if (modal) modal.classList.remove("show"); }
  async function submit() {
    const q = (s) => modal.querySelector(s);
    const email = q(".ma-email").value.trim(), pass = q(".ma-pass").value, name = q(".ma-name").value.trim();
    const err = q(".ma-err"); err.textContent = "";
    try {
      if (mode === "signup") setSession(await api("signup", { email, password: pass, name }));
      else if (mode === "accept") setSession(await api("accept", { email, token: inviteParams.get("invite"), password: pass, name }));
      else setSession(await api("login", { email, password: pass }));
      if (mode === "accept") history.replaceState({}, "", location.pathname);
    } catch (e) { err.textContent = e.message || String(e); }
  }
  function login() { openModal(); }

  refreshQueued();

  window.MidwayAPI = {
    init, user, userName, isAdmin, onChange,
    login, logout,
    listCaptures, listAll, listSections, assignSections,
    saveCapture, photoUrl, invite,
    token: () => token,
    onQueueChange: (fn) => qListeners.push(fn),
    onCaptureFailed: (fn) => failListeners.push(fn),
    onCaptureSynced: (fn) => syncListeners.push(fn),
    queueState: () => ({ inFlight, queued: queuedCount }),
  };
})();
