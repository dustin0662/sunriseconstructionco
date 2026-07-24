// Daily EOD report: compile the draft, save admin extras, and issue the PDF.
//
//   GET  ?project=&date=&admin=|&pin=  -> { loads, extras, issued, totals, perPerson, perColor }
//   POST { admin, action:"save",  projectId, date, equipment, notes, submittedBy, jsaFiles, inspectionFiles }
//   POST { admin, action:"issue", projectId, date }  -> generates + stores eod/<proj>/<date>.pdf
//
// "Compile" is live from that day's load tickets — no scheduled job needed.

import { getStore } from "@netlify/blobs";
import { buildEodPdf } from "./lib/eodpdf.mjs";

const store = () => getStore({ name: "shipments", consistency: "strong" });
const ADMIN = process.env.ADMIN_PASSCODE || "sunrise2026";
const json = (d, s = 200) => new Response(JSON.stringify(d), { status: s, headers: { "content-type": "application/json" } });

const num = (v) => { const n = Number(v); return isNaN(n) ? 0 : n; };
const localDateOf = (e) => e.localDate || String(e.createdAt || "").slice(0, 10);
const titleCase = (s) => String(s || "").toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
const dayKey = (proj, date) => `days/${proj}/${date}`;

async function loadsFor(s, projectId, date) {
  const { blobs } = await s.list({ prefix: "entries/" });
  let items = (await Promise.all(blobs.map((b) => s.get(b.key, { type: "json" })))).filter(Boolean);
  items = items.filter((e) => (e.projectId || "") === projectId && localDateOf(e) === date);
  items.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  return items;
}

function aggregate(loads) {
  const tickets = [];
  loads.forEach((ld) => (ld.items || []).forEach((it) =>
    tickets.push({ loadId: ld.id, filedBy: ld.filler || "", color: titleCase(it.color),
      bundlesPerLoad: num(it.bundlesPerLoad), pieces: num(it.qtyPerBundle) * num(it.bundlesPerLoad) })));
  const sum = (f) => tickets.reduce((n, t) => n + f(t), 0);
  const grp = (key) => {
    const m = new Map();
    tickets.forEach((t) => { const k = key(t) || "—"; const g = m.get(k) || { key: k, loads: 0, bundles: 0, pieces: 0 };
      g.loads++; g.bundles += t.bundlesPerLoad; g.pieces += t.pieces; m.set(k, g); });
    return [...m.values()].sort((a, b) => b.pieces - a.pieces);
  };
  return {
    totals: { loads: tickets.length, bundles: sum((t) => t.bundlesPerLoad), pieces: sum((t) => t.pieces) },
    perPerson: grp((t) => t.filedBy), perColor: grp((t) => t.color),
  };
}

async function authorize(s, url, projectId) {
  if ((url.searchParams.get("admin") || "") === ADMIN) return true;
  const pin = url.searchParams.get("pin") || "";
  const proj = await s.get(`projects/${projectId}`, { type: "json" }).catch(() => null);
  return !!(proj && String(proj.clientPin || "") !== "" && String(proj.clientPin) === String(pin));
}

export default async (req) => {
  const s = store();
  const url = new URL(req.url);

  if (req.method === "GET") {
    const projectId = url.searchParams.get("project");
    // Calendar helper: list days that have loads and/or an issued report.
    if (url.searchParams.get("list") != null) {
      if (!projectId) return json({ error: "project required" }, 400);
      if (!(await authorize(s, url, projectId))) return json({ error: "unauthorized" }, 401);
      const issued = (await s.list({ prefix: `eod/${projectId}/` })).blobs
        .map((b) => (b.key.match(/\/(\d{4}-\d{2}-\d{2})\.pdf$/) || [])[1]).filter(Boolean);
      const { blobs } = await s.list({ prefix: "entries/" });
      const all = (await Promise.all(blobs.map((b) => s.get(b.key, { type: "json" })))).filter(Boolean);
      const loadDays = [...new Set(all.filter((e) => (e.projectId || "") === projectId).map(localDateOf))];
      return json({ issued, loadDays });
    }
    const date = url.searchParams.get("date");
    if (!projectId || !date) return json({ error: "project and date required" }, 400);
    if (!(await authorize(s, url, projectId))) return json({ error: "unauthorized" }, 401);
    const loads = await loadsFor(s, projectId, date);
    // Strip the (large) signature from the list payload; keep photoKey for thumbnails.
    const light = loads.map(({ signature, ...r }) => r);
    const extras = (await s.get(dayKey(projectId, date), { type: "json" }).catch(() => null)) || {};
    return json({ loads: light, extras, issued: !!extras.issued, issuedAt: extras.issuedAt || null, ...aggregate(loads) });
  }

  if (req.method === "POST") {
    let body;
    try { body = await req.json(); } catch { return json({ error: "Invalid JSON" }, 400); }
    if ((body.admin || "") !== ADMIN) return json({ error: "unauthorized" }, 401);
    const { projectId, date } = body;
    if (!projectId || !date) return json({ error: "projectId and date required" }, 400);
    const key = dayKey(projectId, date);
    const cur = (await s.get(key, { type: "json" }).catch(() => null)) || {};

    if (body.action === "save") {
      const next = { ...cur,
        equipment: Array.isArray(body.equipment) ? body.equipment : (cur.equipment || []),
        notes: body.notes !== undefined ? String(body.notes) : (cur.notes || ""),
        submittedBy: body.submittedBy !== undefined ? String(body.submittedBy) : (cur.submittedBy || ""),
        jsaFiles: Array.isArray(body.jsaFiles) ? body.jsaFiles : (cur.jsaFiles || []),
        inspectionFiles: Array.isArray(body.inspectionFiles) ? body.inspectionFiles : (cur.inspectionFiles || []),
      };
      await s.setJSON(key, next);
      return json({ ok: true, extras: next });
    }

    if (body.action === "issue") {
      const proj = await s.get(`projects/${projectId}`, { type: "json" }).catch(() => null);
      if (!proj) return json({ error: "project not found" }, 404);
      // Loads are optional — a day with only safety/equipment/notes (e.g. a
      // shakeout or stand-down day) can still be issued as a report.
      const loads = await loadsFor(s, projectId, date);

      // Fetch photos (parallel) + decode signatures.
      const withMedia = await Promise.all(loads.map(async (ld) => {
        let photo = null;
        try { photo = ld.photoKey ? await s.get(ld.photoKey, { type: "arrayBuffer" }) : null; } catch {}
        let signature = null;
        if (ld.signature && ld.signature.startsWith("data:image")) {
          try { signature = Buffer.from(ld.signature.split(",")[1] || "", "base64"); } catch {}
        }
        return { id: ld.id, whenLabel: ld.whenLabel || new Date(ld.createdAt).toLocaleString(),
          filler: ld.filler, notes: ld.notes || "", items: ld.items || [], photo, signature };
      }));

      // Attachments (JSA + inspections).
      const extras = cur;
      const keys = [...(extras.jsaFiles || []), ...(extras.inspectionFiles || [])];
      const attachments = [];
      for (const k of keys) {
        try {
          const res = await s.getWithMetadata(k, { type: "arrayBuffer" });
          if (!res || !res.data) continue;
          const ext = (k.match(/\.(\w+)$/) || [, "pdf"])[1].toLowerCase();
          const kind = ext === "pdf" ? "pdf" : ext === "png" ? "png" : "jpg";
          attachments.push({ name: (res.metadata && res.metadata.name) || k.split("/").pop(), kind, bytes: res.data });
        } catch {}
      }

      // JSA summary line + equipment text for the cover.
      const jsaCount = (extras.jsaFiles || []).length;
      const equipText = (extras.equipment || []).filter((e) => e.type).map((e) => `${e.count || ""} ${e.type}`.trim()).join(", ");
      const dateLabel = new Date(date + "T12:00:00Z").toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

      const bytes = await buildEodPdf({
        project: { name: proj.name, client: proj.client, block: proj.block },
        dateLabel,
        generatedLabel: new Date().toLocaleString("en-US"),
        submittedBy: extras.submittedBy || "",
        company: "Sun Rise Construction and Development LLC",
        loads: withMedia,
        safety: {
          jsaSummary: jsaCount ? `${jsaCount} JSA${jsaCount !== 1 ? "s" : ""} / pre-task plan${jsaCount !== 1 ? "s" : ""} filed (attached).` : "None on file.",
          dailyNotes: extras.notes || "",
          equipmentText: equipText,
        },
        attachments,
      });

      const mb = bytes.length / 1024 / 1024;
      if (mb > 25) return json({ error: `Generated report is ${mb.toFixed(1)} MB (over 25 MB). Reduce photos/attachments.` }, 413);
      const pdfKey = `eod/${projectId}/${date}.pdf`;
      await s.set(pdfKey, bytes, { metadata: { contentType: "application/pdf" } });
      const next = { ...cur, issued: true, issuedAt: new Date().toISOString(), pdfKey };
      await s.setJSON(key, next);
      return json({ ok: true, pdfKey, sizeMB: Number(mb.toFixed(2)), pages: null });
    }

    if (body.action === "uploadPdf") {
      // Store an externally-prepared EOD PDF for this day (e.g. a prior report).
      if (!body.dataUrl || !String(body.dataUrl).startsWith("data:application/pdf")) {
        return json({ error: "A PDF file is required" }, 400);
      }
      const b64 = String(body.dataUrl).split(",")[1] || "";
      const bytes = Buffer.from(b64, "base64");
      const mb = bytes.length / 1024 / 1024;
      if (mb > 25) return json({ error: `That PDF is ${mb.toFixed(1)} MB (over 25 MB).` }, 413);
      const pdfKey = `eod/${projectId}/${date}.pdf`;
      await s.set(pdfKey, bytes, { metadata: { contentType: "application/pdf" } });
      const next = { ...cur, issued: true, issuedAt: new Date().toISOString(), pdfKey, uploaded: true };
      await s.setJSON(key, next);
      return json({ ok: true, pdfKey, sizeMB: Number(mb.toFixed(2)) });
    }

    return json({ error: "unknown action" }, 400);
  }

  return json({ error: "method not allowed" }, 405);
};
