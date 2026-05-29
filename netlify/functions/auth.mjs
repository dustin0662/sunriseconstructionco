// POST /.netlify/functions/auth   Body: { action, ... }
// Built-in email+password auth backed by Blobs. Actions:
//   status                              -> { hasUsers }
//   signup {email,name,password}        -> first user only, becomes admin
//   login  {email,password}             -> { token, user }
//   invite {email,name}        (admin)  -> { inviteToken }  (share a link)
//   accept {email,token,password,name}  -> activates an invited user -> { token, user }
//   me                         (token)  -> { user }
import crypto from "node:crypto";
import {
  authStore, getSecret, hashPassword, verifyPassword,
  signToken, userFromReq, countUsers,
} from "./lib/auth.mjs";

const TTL = 30 * 24 * 3600 * 1000; // 30 days
const json = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { "content-type": "application/json" } });
const norm = (e) => String(e || "").trim().toLowerCase();
const pub = (u) => ({ email: u.email, name: u.name || u.email, role: u.role || "user" });

export default async (req) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });
  const store = authStore();
  const secret = await getSecret(store);
  let body; try { body = await req.json(); } catch { return json({ error: "Bad JSON" }, 400); }
  const action = body.action;

  const getUser = (email) => store.get("user:" + norm(email), { type: "json" }).catch(() => null);
  const putUser = (u) => store.setJSON("user:" + norm(u.email), u);
  const mkToken = (u) => signToken({ email: u.email, role: u.role || "user", name: u.name || u.email, exp: Date.now() + TTL }, secret);

  if (action === "status") {
    return json({ hasUsers: (await countUsers(store)) > 0 });
  }

  if (action === "signup") {
    if ((await countUsers(store)) > 0) return json({ error: "Signups are invite-only. Ask an admin to invite you." }, 403);
    const email = norm(body.email);
    if (!email || !body.password) return json({ error: "Email and password required" }, 400);
    const { salt, hash } = hashPassword(body.password);
    const u = { email, name: (body.name || email), role: "admin", salt, hash, status: "active", createdAt: new Date().toISOString() };
    await putUser(u);
    return json({ token: mkToken(u), user: pub(u) });
  }

  if (action === "login") {
    const u = await getUser(body.email);
    if (!u || u.status !== "active" || !u.hash) return json({ error: "Invalid email or password" }, 401);
    if (!verifyPassword(body.password, u.salt, u.hash)) return json({ error: "Invalid email or password" }, 401);
    return json({ token: mkToken(u), user: pub(u) });
  }

  if (action === "invite") {
    const me = await userFromReq(req);
    if (!me) return json({ error: "Sign in required" }, 401);
    if (me.role !== "admin") return json({ error: "Admin only" }, 403);
    const email = norm(body.email);
    if (!email) return json({ error: "Email required" }, 400);
    const existing = await getUser(email);
    if (existing && existing.status === "active") return json({ error: "User already active" }, 409);
    const inviteToken = crypto.randomBytes(18).toString("base64url");
    const u = { email, name: body.name || email, role: "user", status: "invited",
      inviteToken, invitedBy: me.email, createdAt: new Date().toISOString() };
    await putUser(u);
    return json({ ok: true, email, inviteToken });
  }

  if (action === "accept") {
    const u = await getUser(body.email);
    if (!u || u.status !== "invited") return json({ error: "No pending invite for this email" }, 400);
    if (!body.token || body.token !== u.inviteToken) return json({ error: "Invalid invite link" }, 403);
    if (!body.password || body.password.length < 6) return json({ error: "Password must be 6+ characters" }, 400);
    const { salt, hash } = hashPassword(body.password);
    u.salt = salt; u.hash = hash; u.status = "active"; u.name = body.name || u.name;
    delete u.inviteToken;
    await putUser(u);
    return json({ token: mkToken(u), user: pub(u) });
  }

  if (action === "me") {
    const me = await userFromReq(req);
    if (!me) return json({ error: "Not signed in" }, 401);
    return json({ user: { email: me.email, name: me.name, role: me.role } });
  }

  return json({ error: "Unknown action" }, 400);
};
