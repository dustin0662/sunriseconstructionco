// POST /.netlify/functions/capture
// Body: { moduleId, row?, serial?, photoDataUrl? }
// Upserts a capture. Server stamps the authenticated user + ISO timestamp.
import { getStore } from "@netlify/blobs";
import { userFromReq } from "./lib/auth.mjs";

export default async (req) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });
  const me = await userFromReq(req);
  if (!me) return new Response(JSON.stringify({ error: "Sign in required" }), { status: 401 });

  let body; try { body = await req.json(); } catch { return new Response("Bad JSON", { status: 400 }); }
  const { moduleId, row = "", serial = "", photoDataUrl } = body || {};
  if (!moduleId) return new Response(JSON.stringify({ error: "moduleId required" }), { status: 400 });

  const store = getStore("captures");
  const ts = new Date().toISOString();
  let existing = null;
  try { existing = await store.getWithMetadata(moduleId, { type: "arrayBuffer" }); } catch {}
  const prev = (existing && existing.metadata) || {};

  let value, hasPhoto = !!prev.hasPhoto;
  if (photoDataUrl && photoDataUrl.startsWith("data:")) {
    value = Buffer.from(photoDataUrl.split(",")[1] || "", "base64"); hasPhoto = true;
  } else if (existing && existing.data) {
    value = Buffer.from(existing.data);
  } else { value = Buffer.from(""); }

  const metadata = {
    serial: serial || prev.serial || "",
    user: me.name || me.email, ts,
    row: row || prev.row || "", hasPhoto,
  };
  try { await store.set(moduleId, value, { metadata }); }
  catch (e) { return new Response(JSON.stringify({ error: String(e) }), { status: 500 }); }
  return new Response(JSON.stringify({ ok: true, moduleId, ...metadata }), { headers: { "content-type": "application/json" } });
};
