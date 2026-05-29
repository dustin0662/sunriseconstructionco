/* Shared multi-user data layer for the Midway field tool.
 * Auth: Netlify Identity. Data + photos: Netlify Functions backed by Blobs.
 * Every capture is stamped server-side with the signed-in user + timestamp.
 * Exposes window.MidwayAPI.
 */
(function () {
  const FN = "/.netlify/functions";
  let identity = null;
  const listeners = [];

  function loadScript(src) {
    return new Promise((res, rej) => {
      const s = document.createElement("script");
      s.src = src; s.onload = res; s.onerror = rej; document.head.appendChild(s);
    });
  }

  async function init() {
    if (!window.netlifyIdentity) {
      await loadScript("https://identity.netlify.com/v1/netlify-identity-widget.js");
    }
    identity = window.netlifyIdentity;
    identity.init();
    return new Promise((resolve) => {
      // init fires before currentUser is ready in some cases; use a tick.
      identity.on("init", (u) => resolve(u));
      setTimeout(() => resolve(identity.currentUser()), 400);
    });
  }

  function user() { return identity ? identity.currentUser() : null; }
  function isAdmin() {
    const u = user();
    const roles = (u && u.app_metadata && u.app_metadata.roles) || [];
    return roles.includes("admin");
  }
  function userName() {
    const u = user();
    if (!u) return "";
    return u.email || (u.user_metadata && u.user_metadata.full_name) || u.id;
  }
  function onChange(fn) { listeners.push(fn); }
  function fire() { const u = user(); listeners.forEach((f) => { try { f(u); } catch (_) {} }); }

  function login() { if (identity) identity.open("login"); }
  function logout() { if (identity) identity.logout(); }

  async function token() {
    const u = user();
    if (!u) return null;
    try { return await u.jwt(); } catch (_) { return (u.token && u.token.access_token) || null; }
  }
  async function authHeaders() {
    const t = await token();
    return t ? { authorization: "Bearer " + t } : {};
  }

  async function listCaptures() {
    const r = await fetch(`${FN}/captures`, { headers: await authHeaders() });
    if (!r.ok) throw new Error("captures " + r.status);
    const j = await r.json();
    return j.captures || {};
  }

  async function saveCapture(moduleId, { row, serial, photoDataUrl } = {}) {
    const r = await fetch(`${FN}/capture`, {
      method: "POST",
      headers: { "content-type": "application/json", ...(await authHeaders()) },
      body: JSON.stringify({ moduleId, row, serial, photoDataUrl }),
    });
    if (r.status === 401) throw new Error("Sign in required");
    if (!r.ok) throw new Error("capture " + r.status);
    return r.json();
  }

  function photoUrl(moduleId, bust) {
    return `${FN}/photo?id=${encodeURIComponent(moduleId)}` + (bust ? `&t=${bust}` : "");
  }

  async function invite(email) {
    const r = await fetch(`${FN}/invite`, {
      method: "POST",
      headers: { "content-type": "application/json", ...(await authHeaders()) },
      body: JSON.stringify({ email }),
    });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(j.error || ("invite " + r.status));
    return j;
  }

  window.MidwayAPI = {
    init, user, userName, isAdmin, onChange,
    login, logout, listCaptures, saveCapture, photoUrl, invite,
    _identity: () => identity,
  };
  // Re-fire listeners on identity events once available.
  init().then(() => {
    ["login", "logout", "init"].forEach((ev) => identity && identity.on(ev, fire));
    fire();
  });
})();
