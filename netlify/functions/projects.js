// Projects + active-project + client-PIN verification.
//
//   GET  ?admin=<passcode>            -> { projects:[...full], activeProjectId }
//   GET  ?pin=<clientPin>             -> { projects:[...public] } matching the PIN
//   POST { admin, action:"create", name, client, block, clientPin }
//   POST { admin, action:"setActive", projectId }
//   POST { admin, action:"update", projectId, ...fields }
//
// Admin writes require the admin passcode (env ADMIN_PASSCODE, default below).
// The client PIN path returns project metadata WITHOUT the PIN.

import { getStore } from "@netlify/blobs";

const store = () => getStore({ name: "shipments", consistency: "strong" });
const ADMIN = process.env.ADMIN_PASSCODE || "sunrise2026";

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json" } });

const pub = (p) => p && { id: p.id, name: p.name, client: p.client, block: p.block, createdAt: p.createdAt };

async function allProjects(s) {
  const { blobs } = await s.list({ prefix: "projects/" });
  return (await Promise.all(blobs.map((b) => s.get(b.key, { type: "json" })))).filter(Boolean);
}

export default async (req) => {
  const s = store();
  const url = new URL(req.url);

  if (req.method === "GET") {
    const pin = url.searchParams.get("pin");
    if (pin != null) {
      const all = await allProjects(s);
      const matches = all.filter((p) => String(p.clientPin || "") !== "" && String(p.clientPin) === String(pin));
      return json({ projects: matches.map(pub) });
    }
    if ((url.searchParams.get("admin") || "") !== ADMIN) return json({ error: "unauthorized" }, 401);
    const all = await allProjects(s);
    all.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
    const active = await s.get("config/active", { type: "json" }).catch(() => null);
    return json({ projects: all, activeProjectId: active ? active.projectId : "" });
  }

  if (req.method === "POST") {
    let body;
    try { body = await req.json(); } catch { return json({ error: "Invalid JSON" }, 400); }
    if ((body.admin || "") !== ADMIN) return json({ error: "unauthorized" }, 401);

    if (body.action === "create") {
      if (!body.name) return json({ error: "name required" }, 400);
      const slug = String(body.name).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 24) || "proj";
      const id = slug + "-" + Math.random().toString(36).slice(2, 6);
      const project = {
        id, name: String(body.name), client: String(body.client || ""),
        block: String(body.block || ""), clientPin: String(body.clientPin || ""),
        createdAt: new Date().toISOString(),
      };
      await s.setJSON(`projects/${id}`, project);
      const active = await s.get("config/active", { type: "json" }).catch(() => null);
      if (!active || !active.projectId) await s.setJSON("config/active", { projectId: id });
      return json(project, 201);
    }

    if (body.action === "setActive") {
      await s.setJSON("config/active", { projectId: String(body.projectId || "") });
      return json({ ok: true });
    }

    if (body.action === "update") {
      const cur = await s.get(`projects/${body.projectId}`, { type: "json" }).catch(() => null);
      if (!cur) return json({ error: "not found" }, 404);
      const next = { ...cur };
      ["name", "client", "block", "clientPin"].forEach((k) => { if (body[k] !== undefined) next[k] = String(body[k]); });
      await s.setJSON(`projects/${cur.id}`, next);
      return json(next);
    }

    return json({ error: "unknown action" }, 400);
  }

  return json({ error: "method not allowed" }, 405);
};
