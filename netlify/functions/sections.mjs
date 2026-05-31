// /.netlify/functions/sections
//   GET                   -> { sections: { moduleId: sectionName } }
//   POST  { assign: { moduleId: sectionName, ... } }   admin: bulk assign
//   POST  { clear: [moduleId, ...] }                   admin: unassign
//
// One index blob, conditional-write read-modify-update so two admins
// editing at the same time can't clobber each other.
import { userFromReq } from "./lib/auth.mjs";
import { readSectionsIndex, updateSections } from "./lib/store.mjs";

const json = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { "content-type": "application/json" } });

export default async (req) => {
  const me = await userFromReq(req);
  if (!me) return json({ error: "Sign in required" }, 401);

  if (req.method === "GET") {
    const { entries } = await readSectionsIndex();
    return json({ sections: entries });
  }
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });
  if (me.role !== "admin") return json({ error: "Admin only" }, 403);

  let body; try { body = await req.json(); } catch { return json({ error: "Bad JSON" }, 400); }
  const assign = body.assign || null;
  const clear = Array.isArray(body.clear) ? body.clear : null;

  await updateSections((entries) => {
    if (assign && typeof assign === "object") {
      for (const [id, sec] of Object.entries(assign)) {
        if (sec) entries[id] = String(sec);
        else delete entries[id];
      }
    }
    if (clear) for (const id of clear) delete entries[id];
  });

  return json({ ok: true });
};
