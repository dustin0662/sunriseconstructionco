// GET /.netlify/functions/captures
// Returns every capture's metadata (serial, user, timestamp, hasPhoto) as a
// map keyed by module id. Photo bytes are fetched separately via /photo.
import { getStore } from "@netlify/blobs";

export default async (req, context) => {
  const store = getStore("captures");
  const out = {};
  try {
    const { blobs } = await store.list();
    // Fetch metadata for each captured module (only captured ones exist).
    await Promise.all(blobs.map(async (b) => {
      const res = await store.getWithMetadata(b.key, { type: "text" });
      const m = (res && res.metadata) || {};
      out[b.key] = {
        serial: m.serial || "",
        user: m.user || "",
        ts: m.ts || "",
        row: m.row || "",
        hasPhoto: !!m.hasPhoto,
      };
    }));
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), { status: 500 });
  }
  return new Response(JSON.stringify({ captures: out }), {
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });
};
