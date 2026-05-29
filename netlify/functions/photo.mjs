// GET /.netlify/functions/photo?id=<moduleId>&k=<token>  -> JPEG bytes
import { getStore } from "@netlify/blobs";
import { userFromReq } from "./lib/auth.mjs";

export default async (req) => {
  const me = await userFromReq(req);          // token via ?k= so <img> works
  if (!me) return new Response("Sign in required", { status: 401 });
  const id = new URL(req.url).searchParams.get("id");
  if (!id) return new Response("id required", { status: 400 });
  const store = getStore("captures");
  try {
    const buf = await store.get(id, { type: "arrayBuffer" });
    if (!buf || buf.byteLength === 0) return new Response("Not found", { status: 404 });
    return new Response(buf, { headers: { "content-type": "image/jpeg", "cache-control": "private, max-age=60" } });
  } catch { return new Response("Not found", { status: 404 }); }
};
