// Upload + serve JSA / equipment-inspection attachment files.
//
//   POST { admin, projectId, date, kind, name, dataUrl } -> { key, name, kind }
//   GET  ?key=files/<...>                                -> the file bytes
//
// Files are stored as binary blobs and later appended into the issued EOD PDF.

import { getStore } from "@netlify/blobs";

const store = () => getStore({ name: "shipments", consistency: "strong" });
const ADMIN = process.env.ADMIN_PASSCODE || "sunrise2026";
const json = (d, s = 200) => new Response(JSON.stringify(d), { status: s, headers: { "content-type": "application/json" } });

const extOf = (name, mime) => {
  const m = String(name || "").toLowerCase().match(/\.(pdf|jpe?g|png)$/);
  if (m) return m[1] === "jpeg" ? "jpg" : m[1];
  if (/pdf/.test(mime)) return "pdf";
  if (/png/.test(mime)) return "png";
  return "jpg";
};
const ctOf = (ext) => (ext === "pdf" ? "application/pdf" : ext === "png" ? "image/png" : "image/jpeg");

export default async (req) => {
  const s = store();
  const url = new URL(req.url);

  if (req.method === "GET") {
    const key = url.searchParams.get("key");
    if (!key || !key.startsWith("files/")) return new Response("bad key", { status: 400 });
    const data = await s.get(key, { type: "arrayBuffer" });
    if (!data) return new Response("not found", { status: 404 });
    const ext = (key.match(/\.(\w+)$/) || [, "jpg"])[1];
    return new Response(data, { headers: { "content-type": ctOf(ext), "cache-control": "private, max-age=3600" } });
  }

  if (req.method === "POST") {
    let body;
    try { body = await req.json(); } catch { return json({ error: "Invalid JSON" }, 400); }
    if ((body.admin || "") !== ADMIN) return json({ error: "unauthorized" }, 401);
    if (!body.projectId || !body.date || !body.dataUrl) return json({ error: "projectId, date, dataUrl required" }, 400);
    const mime = (String(body.dataUrl).match(/^data:([^;]+)/) || [, ""])[1];
    const ext = extOf(body.name, mime);
    const b64 = String(body.dataUrl).split(",")[1] || "";
    const bytes = Buffer.from(b64, "base64");
    const fid = Math.random().toString(36).slice(2, 10);
    const key = `files/${body.projectId}/${body.date}/${fid}.${ext}`;
    await s.set(key, bytes, { metadata: { contentType: ctOf(ext), name: String(body.name || key) } });
    return json({ key, name: String(body.name || `${fid}.${ext}`), kind: body.kind || "file", ext }, 201);
  }

  return json({ error: "method not allowed" }, 405);
};
