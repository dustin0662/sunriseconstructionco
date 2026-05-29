// GET /.netlify/functions/captures  -> { captures: { moduleId: {serial,user,ts,row,hasPhoto} } }
import { getStore } from "@netlify/blobs";
import { userFromReq } from "./lib/auth.mjs";

export default async (req) => {
  const me = await userFromReq(req);
  if (!me) return new Response(JSON.stringify({ error: "Sign in required" }), { status: 401 });
  const store = getStore("captures");
  const out = {};
  try {
    const { blobs } = await store.list();
    await Promise.all(blobs.map(async (b) => {
      const res = await store.getWithMetadata(b.key, { type: "text" });
      const m = (res && res.metadata) || {};
      out[b.key] = { serial: m.serial || "", user: m.user || "", ts: m.ts || "",
        row: m.row || "", hasPhoto: !!m.hasPhoto };
    }));
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), { status: 500 });
  }
  return new Response(JSON.stringify({ captures: out }), {
    headers: { "content-type": "application/json", "cache-control": "no-store" } });
};
