// POST /.netlify/functions/capture
// Body: { moduleId, row?, serial?, photoDataUrl? }
// Upserts a capture. The server stamps the authenticated user's email and an
// ISO timestamp — never trusted from the client. Photo bytes (if provided)
// are stored as the blob value; metadata holds serial/user/ts/row/hasPhoto.
import { getStore } from "@netlify/blobs";

export default async (req, context) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });

  const user = context.clientContext && context.clientContext.user;
  if (!user) return new Response(JSON.stringify({ error: "Sign in required" }), { status: 401 });
  const who = user.email || (user.user_metadata && user.user_metadata.full_name) || user.sub;

  let body;
  try { body = await req.json(); } catch { return new Response("Bad JSON", { status: 400 }); }
  const { moduleId, row = "", serial = "", photoDataUrl } = body || {};
  if (!moduleId) return new Response(JSON.stringify({ error: "moduleId required" }), { status: 400 });

  const store = getStore("captures");
  const ts = new Date().toISOString();

  // Preserve existing photo if this update is serial-only.
  let existing = null;
  try { existing = await store.getWithMetadata(moduleId, { type: "arrayBuffer" }); } catch {}
  const prevMeta = (existing && existing.metadata) || {};

  let value;
  let hasPhoto = !!prevMeta.hasPhoto;
  if (photoDataUrl && photoDataUrl.startsWith("data:")) {
    const b64 = photoDataUrl.split(",")[1] || "";
    value = Buffer.from(b64, "base64");
    hasPhoto = true;
  } else if (existing && existing.data) {
    value = Buffer.from(existing.data);
  } else {
    value = Buffer.from("");
  }

  const metadata = {
    serial: serial || prevMeta.serial || "",
    user: who,
    ts,
    row: row || prevMeta.row || "",
    hasPhoto,
  };
  try {
    await store.set(moduleId, value, { metadata });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), { status: 500 });
  }
  return new Response(JSON.stringify({ ok: true, moduleId, ...metadata }), {
    headers: { "content-type": "application/json" },
  });
};
