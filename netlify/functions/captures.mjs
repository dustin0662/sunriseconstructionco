// GET /.netlify/functions/captures
//   -> { captures: { moduleId: {serial,user,ts,row,hasPhoto} }, sections: { moduleId: sectionName } }
//
// One round-trip per index blob. Scales to 20k+ entries without
// fanning out per-blob requests.
import { userFromReq } from "./lib/auth.mjs";
import { readCapturesIndex, readSectionsIndex } from "./lib/store.mjs";

export default async (req) => {
  const me = await userFromReq(req);
  if (!me) return new Response(JSON.stringify({ error: "Sign in required" }), { status: 401 });
  try {
    const [caps, secs] = await Promise.all([readCapturesIndex(), readSectionsIndex()]);
    return new Response(JSON.stringify({ captures: caps.entries, sections: secs.entries }), {
      headers: { "content-type": "application/json", "cache-control": "no-store" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), { status: 500 });
  }
};
