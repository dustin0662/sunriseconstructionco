// GET /.netlify/functions/drawing?id=<id>&k=<token>
// Streams the PDF (or whatever was uploaded) inline so the browser can
// preview it. Content-Disposition: inline keeps it in-tab.
import { userFromReq } from "./lib/auth.mjs";
import { drawingsStore, readDrawingsIndex } from "./lib/store.mjs";

export default async (req) => {
  const me = await userFromReq(req);
  if (!me) return new Response("Sign in required", { status: 401 });
  const id = new URL(req.url).searchParams.get("id");
  if (!id) return new Response("id required", { status: 400 });
  const { entries } = await readDrawingsIndex();
  const meta = entries[id];
  if (!meta) return new Response("Not found", { status: 404 });
  const buf = await drawingsStore().get(id, { type: "arrayBuffer" });
  if (!buf) return new Response("Not found", { status: 404 });
  const safe = (meta.name || "drawing.pdf").replace(/"/g, "");
  return new Response(buf, {
    headers: {
      "content-type": /\.pdf$/i.test(safe) ? "application/pdf" : "application/octet-stream",
      "content-disposition": `inline; filename="${safe}"`,
      "cache-control": "private, max-age=60",
    },
  });
};
