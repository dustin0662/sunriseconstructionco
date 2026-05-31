// Chunked uploader for reference PDFs (and other admin-uploaded docs).
// Netlify Functions cap request bodies at ~6 MB, so we split the file
// client-side into ~3 MB raw chunks, POST each as base64, then call
// "finalize" to stitch them into one blob in the "drawings" store.
//
//   GET                                 -> { docs: [{id,name,size,uploader,ts,kind,note}] }
//   POST { action:"begin", filename, size }            -> { id, chunkSize }       (admin)
//   POST { action:"chunk", id, index, data }                                       (admin)
//   POST { action:"finalize", id, totalChunks, filename, size, kind?, note? }      (admin)
//   POST { action:"delete", id }                                                   (admin)
import { userFromReq } from "./lib/auth.mjs";
import {
  readDrawingsIndex, updateDrawingsIndex,
  drawingsStore, drawingChunksStore,
} from "./lib/store.mjs";

const json = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { "content-type": "application/json" } });
const CHUNK_BYTES = 3 * 1024 * 1024; // 3 MB raw -> ~4 MB base64, well under the 6 MB request cap.

export default async (req) => {
  const me = await userFromReq(req);
  if (!me) return json({ error: "Sign in required" }, 401);

  if (req.method === "GET") {
    const { entries } = await readDrawingsIndex();
    const docs = Object.entries(entries)
      .map(([id, v]) => ({ id, ...v }))
      .sort((a, b) => String(b.ts || "").localeCompare(a.ts || ""));
    return json({ docs });
  }

  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });
  if (me.role !== "admin") return json({ error: "Admin only" }, 403);

  let body; try { body = await req.json(); } catch { return json({ error: "Bad JSON" }, 400); }
  const action = body.action;

  if (action === "begin") {
    if (!body.filename) return json({ error: "filename required" }, 400);
    const id = "doc_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 8);
    return json({ id, chunkSize: CHUNK_BYTES });
  }

  if (action === "chunk") {
    const { id, index, data } = body;
    if (!id || index == null || !data) return json({ error: "id, index, data required" }, 400);
    const bytes = Buffer.from(data, "base64");
    await drawingChunksStore().set(`${id}/${index}`, bytes);
    return json({ ok: true, bytes: bytes.length });
  }

  if (action === "finalize") {
    const { id, totalChunks, filename, size, kind, note } = body;
    if (!id || !totalChunks || !filename) return json({ error: "id, totalChunks, filename required" }, 400);
    const cs = drawingChunksStore();
    const parts = [];
    for (let i = 0; i < totalChunks; i++) {
      const buf = await cs.get(`${id}/${i}`, { type: "arrayBuffer" });
      if (!buf) return json({ error: `missing chunk ${i}` }, 400);
      parts.push(Buffer.from(buf));
    }
    const all = Buffer.concat(parts);
    if (size && all.length !== size) return json({ error: `size mismatch: expected ${size}, got ${all.length}` }, 400);
    await drawingsStore().set(id, all);
    for (let i = 0; i < totalChunks; i++) { try { await cs.delete(`${id}/${i}`); } catch {} }
    const ts = new Date().toISOString();
    let entry;
    await updateDrawingsIndex((entries) => {
      entry = {
        name: String(filename).slice(0, 200),
        size: all.length,
        uploader: me.name || me.email,
        ts,
        kind: String(kind || "").slice(0, 60),
        note: String(note || "").slice(0, 400),
      };
      entries[id] = entry;
    });
    return json({ ok: true, id, ...entry });
  }

  if (action === "delete") {
    const { id } = body;
    if (!id) return json({ error: "id required" }, 400);
    try { await drawingsStore().delete(id); } catch {}
    await updateDrawingsIndex((entries) => { delete entries[id]; });
    return json({ ok: true });
  }

  return json({ error: "Unknown action" }, 400);
};
