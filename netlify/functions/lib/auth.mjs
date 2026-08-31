// Shared auth helpers for the Midway functions (not an endpoint — lives in a
// subfolder so Netlify doesn't treat it as a function).
import crypto from "node:crypto";
import { getStore } from "@netlify/blobs";

export function authStore() { return getStore("auth"); }

// Persistent signing secret (auto-generated once, stored in Blobs).
export async function getSecret(store) {
  let s = await store.get("secret", { type: "text" }).catch(() => null);
  if (!s) {
    s = crypto.randomBytes(32).toString("hex");
    await store.set("secret", s);
  }
  return s;
}

export function hashPassword(pw, salt) {
  salt = salt || crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(String(pw), salt, 32).toString("hex");
  return { salt, hash };
}
export function verifyPassword(pw, salt, hash) {
  const h = crypto.scryptSync(String(pw), salt, 32).toString("hex");
  return crypto.timingSafeEqual(Buffer.from(h), Buffer.from(hash));
}

function b64url(buf) { return Buffer.from(buf).toString("base64url"); }
export function signToken(payload, secret) {
  const body = b64url(JSON.stringify(payload));
  const sig = crypto.createHmac("sha256", secret).update(body).digest("base64url");
  return `${body}.${sig}`;
}
export function verifyToken(token, secret) {
  if (!token || token.indexOf(".") < 0) return null;
  const [body, sig] = token.split(".");
  const exp = crypto.createHmac("sha256", secret).update(body).digest("base64url");
  if (sig.length !== exp.length || !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(exp))) return null;
  try {
    const p = JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
    if (p.exp && Date.now() > p.exp) return null;
    return p;
  } catch { return null; }
}

// Extract + verify the bearer token (header or ?k= query) -> session payload.
export async function userFromReq(req) {
  const store = authStore();
  const secret = await getSecret(store);
  let tok = null;
  const auth = req.headers.get("authorization");
  if (auth && auth.startsWith("Bearer ")) tok = auth.slice(7);
  if (!tok) { try { tok = new URL(req.url).searchParams.get("k"); } catch {} }
  return verifyToken(tok, secret);
}

export async function countUsers(store) {
  const { blobs } = await store.list({ prefix: "user:" });
  return blobs.length;
}
