// GET /.netlify/functions/photo?id=<moduleId>  -> JPEG bytes
import { getStore } from "@netlify/blobs";

export default async (req) => {
  const id = new URL(req.url).searchParams.get("id");
  if (!id) return new Response("id required", { status: 400 });
  const store = getStore("captures");
  try {
    const buf = await store.get(id, { type: "arrayBuffer" });
    if (!buf || buf.byteLength === 0) return new Response("Not found", { status: 404 });
    return new Response(buf, {
      headers: { "content-type": "image/jpeg", "cache-control": "private, max-age=60" },
    });
  } catch (e) {
    return new Response("Not found", { status: 404 });
  }
};
