// GET /.netlify/functions/photo?id=<moduleId>&k=<token>  -> JPEG bytes
import { userFromReq } from "./lib/auth.mjs";
import { photosStore } from "./lib/store.mjs";

export default async (req) => {
  const me = await userFromReq(req);
  if (!me) return new Response("Sign in required", { status: 401 });
  const id = new URL(req.url).searchParams.get("id");
  if (!id) return new Response("id required", { status: 400 });
  try {
    const buf = await photosStore().get(id, { type: "arrayBuffer" });
    if (!buf || buf.byteLength === 0) return new Response("Not found", { status: 404 });
    return new Response(buf, { headers: { "content-type": "image/jpeg", "cache-control": "private, max-age=60" } });
  } catch { return new Response("Not found", { status: 404 }); }
};
