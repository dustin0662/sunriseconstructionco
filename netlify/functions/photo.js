// Serve a stored load photo by its blob key.
//
//   GET /.netlify/functions/photo?key=photos/<id>.jpg -> image/jpeg bytes
//
// Photos are immutable once written (keyed by a random id), so we let the
// browser cache them aggressively.

import { getStore } from "@netlify/blobs";

export default async (req) => {
  const key = new URL(req.url).searchParams.get("key");
  if (!key || !key.startsWith("photos/")) {
    return new Response("bad key", { status: 400 });
  }

  const s = getStore({ name: "shipments", consistency: "strong" });
  const data = await s.get(key, { type: "arrayBuffer" });
  if (!data) return new Response("not found", { status: 404 });

  return new Response(data, {
    headers: {
      "content-type": "image/jpeg",
      "cache-control": "public, max-age=31536000, immutable",
    },
  });
};
