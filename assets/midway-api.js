/* Shared multi-user data layer for the Midway field tool.
 * Built-in email+password auth (Netlify Functions + Blobs). Session is an
 * HMAC token kept in localStorage (credential only — all data lives server
 * side). Captures are stamped server-side with the signed-in user + time.
 * Exposes window.MidwayAPI.
 */
(function () {
  const FN = "/.netlify/functions";
  const TOK = "midway_session";
  let token = null, me = null;
  const listeners = [];
  try { token = localStorage.getItem(TOK) || null; } catch (_) {}

  const fire = () => listeners.forEach((f) => { try { f(me); } catch (_) {} });
  const onChange = (fn) => { listeners.push(fn); };
  const user = () => me;
  const userName = () => (me ? (me.name || me.email) : "");
  const isAdmin = () => !!(me && me.role === "admin");

  async function api(action, payload) {
    const r = await fetch(`${FN}/auth`, {
      method: "POST",
      headers: { "content-type": "application/json", ...(token ? { authorization: "Bearer " + token } : {}) },
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
    fire(); return me;
  }

  // ---- Data ----
  async function listCaptures() {
    const r = await fetch(`${FN}/captures`, { headers: token ? { authorization: "Bearer " + token } : {} });
    if (!r.ok) throw new Error("captures " + r.status);
    return (await r.json()).captures || {};
  }
  async function saveCapture(moduleId, { row, serial, photoDataUrl } = {}) {
    const r = await fetch(`${FN}/capture`, {
      method: "POST",
      headers: { "content-type": "application/json", ...(token ? { authorization: "Bearer " + token } : {}) },
      body: JSON.stringify({ moduleId, row, serial, photoDataUrl }),
    });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(j.error || ("capture " + r.status));
    return j;
  }
  function photoUrl(moduleId, bust) {
    return `${FN}/photo?id=${encodeURIComponent(moduleId)}&k=${encodeURIComponent(token || "")}` + (bust ? `&t=${bust}` : "");
  }
  async function invite(email, name) {
    const j = await api("invite", { email, name });
    const link = `${location.origin}/drawings.html?invite=${encodeURIComponent(j.inviteToken)}&email=${encodeURIComponent(j.email)}`;
    return { email: j.email, link };
  }

  // ---- Injected auth modal ----
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
    else {
      try { mode = (await api("status")).hasUsers ? "login" : "signup"; }
      catch { mode = "login"; }
    }
    const q = (s) => modal.querySelector(s);
    q(".ma-err").textContent = "";
    q(".ma-name").style.display = (mode === "login") ? "none" : "block";
    if (mode === "signup") {
      q(".ma-title").textContent = "Create admin account";
      q(".ma-sub").textContent = "You're the first user — this account becomes the project admin.";
      q(".ma-go").textContent = "Create account";
      q(".ma-foot").textContent = "";
      q(".ma-pass").setAttribute("autocomplete", "new-password");
    } else if (mode === "accept") {
      q(".ma-title").textContent = "Set your password";
      q(".ma-sub").textContent = "You've been invited. Choose a password to join the project.";
      q(".ma-email").value = inviteParams ? inviteParams.get("email") : "";
      q(".ma-email").setAttribute("readonly", "true");
      q(".ma-go").textContent = "Join project";
      q(".ma-foot").textContent = "";
      q(".ma-pass").setAttribute("autocomplete", "new-password");
    } else {
      q(".ma-title").textContent = "Sign in";
      q(".ma-sub").textContent = "Captures are shared and logged with your name + time.";
      q(".ma-go").textContent = "Sign in";
      q(".ma-email").removeAttribute("readonly");
      q(".ma-foot").textContent = "";
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
      // clean invite params from URL
      if (mode === "accept") history.replaceState({}, "", location.pathname);
    } catch (e) { err.textContent = e.message || String(e); }
  }
  function login() { openModal(); }

  window.MidwayAPI = {
    init, user, userName, isAdmin, onChange,
    login, logout, listCaptures, saveCapture, photoUrl, invite,
    token: () => token,
  };
})();
