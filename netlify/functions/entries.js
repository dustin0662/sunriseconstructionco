// Shipment tracking entries — shared store backed by Netlify Blobs.
//
//   GET  /.netlify/functions/entries  -> JSON array of entries, newest first
//   POST /.netlify/functions/entries  -> create one entry (+ store its photo)
//
// Each entry is its own blob (key `entries/<createdAt>-<id>`) so that many
// crews submitting at once never clobber a shared document. The load photo is
// stored as a separate binary blob (`photos/<id>.jpg`) and served by photo.js.
// Strong consistency makes a just-created entry visible to other pollers
// immediately (the default eventual mode can lag up to ~60s).

import { getStore } from "@netlify/blobs";

const store = () => getStore({ name: "shipments", consistency: "strong" });
const ADMIN = process.env.ADMIN_PASSCODE || "sunrise2026";

// Business date for a load: prefer the client-supplied local date (crew's
// device is in the site's timezone) and fall back to the UTC date.
const localDateOf = (e) => e.localDate || String(e.createdAt || "").slice(0, 10);

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json" },
  });

export default async (req) => {
  const s = store();

  if (req.method === "GET") {
    const url = new URL(req.url);
    // Admin: list the "Deleted" folder (archived loads) instead of active ones.
    if (url.searchParams.get("archived") != null) {
      if ((url.searchParams.get("admin") || "") !== ADMIN) return json({ error: "unauthorized" }, 401);
      const { blobs } = await s.list({ prefix: "archived/" });
      let items = (await Promise.all(blobs.map((b) => s.get(b.key, { type: "json" })))).filter(Boolean);
      items.sort((a, b) => ((a.archivedAt || a.createdAt) < (b.archivedAt || b.createdAt) ? 1 : -1));
      return json(items);
    }
    const wantProject = url.searchParams.get("project"); // optional filter
    const wantDate = url.searchParams.get("date");        // optional YYYY-MM-DD (local? uses ISO date prefix)
    const { blobs } = await s.list({ prefix: "entries/" });
    let items = (await Promise.all(blobs.map((b) => s.get(b.key, { type: "json" })))).filter(Boolean);
    if (wantProject) items = items.filter((e) => e.projectId === wantProject);
    if (wantDate) items = items.filter((e) => localDateOf(e.createdAt) === wantDate);
    items.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
    return json(items);
  }

  if (req.method === "POST") {
    let body;
    try {
      body = await req.json();
    } catch {
      return json({ error: "Invalid JSON body" }, 400);
    }

    // Admin bulk backfill: create many loads for a past date without photos
    // (used to import a day that wasn't logged in the field).
    if (body.action === "import") {
      if ((body.admin || "") !== ADMIN) return json({ error: "unauthorized" }, 401);
      if (!/^\d{4}-\d{2}-\d{2}$/.test(body.date || "")) return json({ error: "date (YYYY-MM-DD) required" }, 400);
      const rows = Array.isArray(body.rows) ? body.rows : [];
      if (!rows.length) return json({ error: "no rows to import" }, 400);
      const defBlock = String(body.block || ""); // fills rows with no block (single-destination reports)
      // Resolve the project: explicit, else the active one.
      let projectId = body.projectId || "";
      if (!projectId) { const active = await s.get("config/active", { type: "json" }).catch(() => null); projectId = (active && active.projectId) || ""; }
      let projectName = "";
      if (projectId) { const proj = await s.get(`projects/${projectId}`, { type: "json" }).catch(() => null); projectName = (proj && proj.name) || ""; }
      let created = 0;
      for (let i = 0; i < rows.length; i++) {
        const r = rows[i];
        if (!r || !r.color || !r.qtyPerBundle || !r.bundlesPerLoad) continue;
        const id = (r.id && String(r.id).replace(/[^a-z0-9]/gi, "")) || Math.random().toString(36).slice(2, 10);
        // Order the createdAt within the day so sorting stays stable.
        const createdAt = `${body.date}T${String(8 + Math.floor(i / 6)).padStart(2, "0")}:${String((i % 6) * 10).padStart(2, "0")}:00.000Z`;
        const entry = {
          id, createdAt, localDate: body.date, whenLabel: (r.whenLabel || new Date(createdAt).toLocaleString()),
          projectId, projectName, filler: String(r.filler || ""),
          items: [{ color: String(r.color), block: String(r.block || defBlock), qtyPerBundle: String(r.qtyPerBundle), bundlesPerLoad: String(r.bundlesPerLoad) }],
          notes: r.note ? String(r.note) : "", photoKey: "", signature: "", backfilled: true,
        };
        await s.setJSON(`entries/${createdAt}-${id}`, entry);
        created++;
      }
      return json({ ok: true, created, projectId, date: body.date });
    }

    // Admin repair: assign a destination block to a day's loads. By default only
    // fills items that have no block (e.g. rows imported from a single-destination
    // report with no Block column) so the BOM/delivered tracker can attribute them.
    if (body.action === "setBlock") {
      if ((body.admin || "") !== ADMIN) return json({ error: "unauthorized" }, 401);
      if (!body.projectId) return json({ error: "projectId required" }, 400);
      if (!/^\d{4}-\d{2}-\d{2}$/.test(body.date || "")) return json({ error: "date (YYYY-MM-DD) required" }, 400);
      const block = String(body.block || "");
      if (!block) return json({ error: "block required" }, 400);
      const onlyEmpty = body.onlyEmpty === false ? false : true;
      const { blobs } = await s.list({ prefix: "entries/" });
      let updated = 0;
      for (const b of blobs) {
        const e = await s.get(b.key, { type: "json" }).catch(() => null);
        if (!e || (e.projectId || "") !== body.projectId || localDateOf(e) !== body.date) continue;
        const items = Array.isArray(e.items) ? e.items : [];
        let changed = false;
        items.forEach((it) => { if (!onlyEmpty || !String(it.block || "").trim()) { if (String(it.block || "") !== block) { it.block = block; changed = true; } } });
        if (changed) { await s.setJSON(b.key, e); updated++; }
      }
      return json({ ok: true, updated, projectId: body.projectId, date: body.date, block });
    }

    // Admin delete → move the load to the "Deleted" folder (archived/ prefix).
    // Every consumer lists entries/, so this removes it from the feed, daily
    // reports, and BOM totals at once. The photo blob is kept for restore.
    if (body.action === "archive") {
      if ((body.admin || "") !== ADMIN) return json({ error: "unauthorized" }, 401);
      const id = String(body.id || ""), createdAt = String(body.createdAt || "");
      if (!id || !createdAt) return json({ error: "id and createdAt required" }, 400);
      const key = `entries/${createdAt}-${id}`;
      const e = await s.get(key, { type: "json" }).catch(() => null);
      if (!e) return json({ error: "not found" }, 404);
      e.archivedAt = new Date().toISOString();
      await s.setJSON(`archived/${createdAt}-${id}`, e);
      await s.delete(key);
      return json({ ok: true, archived: id });
    }

    // Admin restore → move an archived load back to the active set.
    if (body.action === "restore") {
      if ((body.admin || "") !== ADMIN) return json({ error: "unauthorized" }, 401);
      const id = String(body.id || ""), createdAt = String(body.createdAt || "");
      if (!id || !createdAt) return json({ error: "id and createdAt required" }, 400);
      const key = `archived/${createdAt}-${id}`;
      const e = await s.get(key, { type: "json" }).catch(() => null);
      if (!e) return json({ error: "not found" }, 404);
      delete e.archivedAt;
      await s.setJSON(`entries/${createdAt}-${id}`, e);
      await s.delete(key);
      return json({ ok: true, restored: id });
    }

    // Admin permanent delete → remove the archived load and its photo for good.
    if (body.action === "delete") {
      if ((body.admin || "") !== ADMIN) return json({ error: "unauthorized" }, 401);
      const id = String(body.id || ""), createdAt = String(body.createdAt || "");
      if (!id || !createdAt) return json({ error: "id and createdAt required" }, 400);
      const key = `archived/${createdAt}-${id}`;
      const e = await s.get(key, { type: "json" }).catch(() => null);
      if (!e) return json({ error: "not found" }, 404);
      if (e.photoKey) { try { await s.delete(e.photoKey); } catch {} }
      await s.delete(key);
      return json({ ok: true, deleted: id });
    }

    // A load carries one or more color line-items. Accept the items array;
    // tolerate a legacy flat payload (single color) for backward compatibility.
    let rawItems = Array.isArray(body.items) ? body.items : null;
    if (!rawItems && body.color) {
      rawItems = [{ color: body.color, block: body.block, qtyPerBundle: body.qtyPerBundle, bundlesPerLoad: body.bundlesPerLoad }];
    }
    if (!body.filler) return json({ error: "Missing filler" }, 400);
    if (!rawItems || !rawItems.length) return json({ error: "At least one color is required" }, 400);
    const itemFields = ["color", "block", "qtyPerBundle", "bundlesPerLoad"];
    const items = [];
    for (const it of rawItems) {
      const bad = itemFields.filter((k) => it[k] === undefined || it[k] === "" || it[k] === null);
      if (bad.length) return json({ error: "Color item missing: " + bad.join(", ") }, 400);
      items.push({
        color: String(it.color), block: String(it.block),
        qtyPerBundle: String(it.qtyPerBundle), bundlesPerLoad: String(it.bundlesPerLoad),
      });
    }
    if (!body.photo || typeof body.photo !== "string" || !body.photo.startsWith("data:image")) {
      return json({ error: "A load photo is required" }, 400);
    }
    if (!body.signature || typeof body.signature !== "string" || !body.signature.startsWith("data:image")) {
      return json({ error: "A signature is required" }, 400);
    }

    const id = Math.random().toString(36).slice(2, 10);
    const createdAt = new Date().toISOString();
    const localDate = /^\d{4}-\d{2}-\d{2}$/.test(body.localDate || "") ? body.localDate : createdAt.slice(0, 10);

    // Stamp the currently-active project (admin-set) so daily reports can
    // group by project. Crews don't choose it.
    let projectId = "", projectName = "";
    try {
      const active = await s.get("config/active", { type: "json" });
      if (active && active.projectId) {
        projectId = active.projectId;
        const proj = await s.get(`projects/${projectId}`, { type: "json" });
        projectName = (proj && proj.name) || "";
      }
    } catch {}

    // Decode the JPEG data URL and store it as its own binary blob.
    const b64 = body.photo.split(",")[1] || "";
    const bytes = Buffer.from(b64, "base64");
    const photoKey = `photos/${id}.jpg`;
    await s.set(photoKey, bytes, { metadata: { contentType: "image/jpeg" } });

    const entry = {
      id,
      createdAt,
      localDate,
      whenLabel: body.whenLabel ? String(body.whenLabel) : new Date(createdAt).toLocaleString(),
      projectId,
      projectName,
      filler: String(body.filler),
      items,
      notes: body.notes ? String(body.notes) : "",
      photoKey,
      signature: String(body.signature), // small PNG data URL, stored inline
    };

    await s.setJSON(`entries/${createdAt}-${id}`, entry);
    return json(entry, 201);
  }

  return json({ error: "Method not allowed" }, 405);
};
