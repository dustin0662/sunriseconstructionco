// EOD (End-of-Day) report PDF generator — recreates the branded daily report
// from a day's load tickets plus admin-entered safety/equipment info and any
// uploaded JSA / inspection attachments. Pure pdf-lib (standard Helvetica),
// so it runs unchanged inside a Netlify Function.
//
// Input (all strings pre-formatted by the caller so this stays deterministic):
//   {
//     project:   { name, client, block },
//     dateLabel, generatedLabel, submittedBy, company,
//     loads: [ { id, whenLabel, filler, notes,
//                items:[{color,block,qtyPerBundle,bundlesPerLoad}],
//                photo:Uint8Array|null (jpeg), signature:Uint8Array|null (png) } ],
//     safety: { jsaSummary, dailyNotes, equipmentText },
//     attachments: [ { name, kind:'pdf'|'jpg'|'png', bytes:Uint8Array } ],
//   }
// Returns a Uint8Array (the PDF bytes).

import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { SRC_LOGO_PNG_B64 } from "./logo.mjs";

const LETTER = [612, 792];
const M = 44;                 // page margin
const CW = LETTER[0] - M * 2; // content width
const ORANGE = rgb(0.976, 0.451, 0.086);
const INK = rgb(0.039, 0.039, 0.078);
const GRAY = rgb(0.42, 0.42, 0.42);
const LGRAY = rgb(0.55, 0.55, 0.55);
const LINE = rgb(0.89, 0.867, 0.831);
const HEADBG = rgb(0.039, 0.039, 0.078);
const ZEBRA = rgb(0.98, 0.973, 0.961);

const num = (v) => { const n = Number(v); return isNaN(n) ? 0 : n; };
const titleCase = (s) => String(s || "").toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());

export async function buildEodPdf(data) {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const oblique = await doc.embedFont(StandardFonts.HelveticaOblique);
  let logo = null;
  try { logo = await doc.embedPng(Buffer.from(SRC_LOGO_PNG_B64, "base64")); } catch {}

  const project = data.project || {};
  const client = project.client || "Client";

  // ---- derive tickets (one per color line-item) + aggregates ----
  const tickets = [];
  (data.loads || []).forEach((ld) => {
    (ld.items || []).forEach((it) => {
      const pieces = num(it.qtyPerBundle) * num(it.bundlesPerLoad);
      tickets.push({ loadId: ld.id, filedBy: ld.filler || "", color: it.color || "",
        block: it.block || "", qtyPerBundle: it.qtyPerBundle, bundlesPerLoad: it.bundlesPerLoad,
        pieces, note: ld.notes || "" });
    });
  });
  const sum = (arr, f) => arr.reduce((n, x) => n + f(x), 0);
  // Destinations are whatever blocks the day's tickets actually went to —
  // a load/day can span multiple blocks; nothing is hard-coded.
  const distinctBlocks = [...new Set(tickets.map((t) => t.block).filter(Boolean))];
  const destLabel = distinctBlocks.length
    ? (distinctBlocks.length <= 3 ? distinctBlocks.join(", ") : distinctBlocks.length + " blocks")
    : (project.block || "—");
  const totals = {
    loads: tickets.length,
    bundles: sum(tickets, (t) => num(t.bundlesPerLoad)),
    pieces: sum(tickets, (t) => t.pieces),
    destination: distinctBlocks.length ? distinctBlocks.join(", ") : (project.block || "—"),
  };
  const groupAgg = (keyFn) => {
    const m = new Map();
    tickets.forEach((t) => {
      const k = keyFn(t) || "—";
      const g = m.get(k) || { key: k, loads: 0, bundles: 0, pieces: 0 };
      g.loads += 1; g.bundles += num(t.bundlesPerLoad); g.pieces += t.pieces;
      m.set(k, g);
    });
    return [...m.values()].sort((a, b) => b.pieces - a.pieces);
  };
  const perPerson = groupAgg((t) => t.filedBy);
  const perColor = groupAgg((t) => titleCase(t.color));
  const perBlock = groupAgg((t) => t.block);

  const pageMeta = []; // {page, kind} for footer stamping

  const T = (page, x, y, str, o = {}) => {
    const f = o.font || font, size = o.size || 10;
    let s = String(str == null ? "" : str);
    if (o.maxWidth) { // naive truncation to fit
      while (s.length && f.widthOfTextAtSize(s, size) > o.maxWidth) s = s.slice(0, -1);
    }
    let x2 = x;
    if (o.align === "right") x2 = x - f.widthOfTextAtSize(s, size);
    else if (o.align === "center") x2 = x - f.widthOfTextAtSize(s, size) / 2;
    page.drawText(s, { x: x2, y, size, font: f, color: o.color || INK });
  };
  const wrap = (page, x, y, str, o = {}) => { // simple word-wrap, returns new y
    const f = o.font || font, size = o.size || 10, lh = o.lh || size + 3, maxW = o.maxWidth || CW;
    const words = String(str || "").split(/\s+/); let line = "", yy = y;
    for (const w of words) {
      const test = line ? line + " " + w : w;
      if (f.widthOfTextAtSize(test, size) > maxW && line) { T(page, x, yy, line, { font: f, size, color: o.color }); yy -= lh; line = w; }
      else line = test;
    }
    if (line) { T(page, x, yy, line, { font: f, size, color: o.color }); yy -= lh; }
    return yy;
  };
  const drawLogo = (page, x, y, h) => { if (!logo) return; const d = logo.scale(h / logo.height); page.drawImage(logo, { x, y: y - d.height, width: d.width, height: d.height }); };

  // top running header (small)
  const header = (page) => {
    if (logo) drawLogo(page, M, LETTER[1] - 20, 26);
    T(page, LETTER[0] - M, LETTER[1] - 30, "EOD REPORT", { font: bold, size: 11, align: "right" });
    T(page, LETTER[0] - M, LETTER[1] - 42, `${data.dateLabel || ""}  ·  ${project.name || ""}${destLabel ? " — " + destLabel : ""}`, { font, size: 8, color: GRAY, align: "right" });
    page.drawRectangle({ x: M, y: LETTER[1] - 50, width: CW, height: 1.4, color: ORANGE });
  };

  const newPage = (kind, withHeader = true) => {
    const page = doc.addPage(LETTER);
    pageMeta.push({ page, kind });
    if (withHeader) header(page);
    return page;
  };

  // ---- table helper ----
  function table(page, x, yTop, cols, rows, opt = {}) {
    // cols: [{title, w, align}]  rows: [[...], ...]  opt.totalRow: [...]
    const rh = opt.rh || 22, th = opt.th || 22;
    let y = yTop;
    // header
    page.drawRectangle({ x, y: y - th, width: cols.reduce((s, c) => s + c.w, 0), height: th, color: HEADBG });
    let cx = x;
    cols.forEach((c) => { T(page, c.align === "right" ? cx + c.w - 8 : cx + 8, y - th + 7, c.title, { font: bold, size: 8.5, color: rgb(1, 1, 1), align: c.align === "right" ? "right" : "left" }); cx += c.w; });
    y -= th;
    rows.forEach((r, i) => {
      if (i % 2 === 1) page.drawRectangle({ x, y: y - rh, width: cols.reduce((s, c) => s + c.w, 0), height: rh, color: ZEBRA });
      cx = x;
      cols.forEach((c, ci) => {
        const isColor = c.color;
        T(page, c.align === "right" ? cx + c.w - 8 : cx + 8, y - rh + 7, r[ci], { font: isColor ? bold : font, size: 9.5, color: isColor ? ORANGE : INK, align: c.align === "right" ? "right" : "left", maxWidth: c.w - 12 });
        cx += c.w;
      });
      page.drawLine({ start: { x, y: y - rh }, end: { x: x + cols.reduce((s, c) => s + c.w, 0), y: y - rh }, thickness: 0.5, color: LINE });
      y -= rh;
    });
    if (opt.totalRow) {
      page.drawRectangle({ x, y: y - rh, width: cols.reduce((s, c) => s + c.w, 0), height: rh, color: rgb(0.95, 0.95, 0.95) });
      cx = x;
      cols.forEach((c, ci) => { if (opt.totalRow[ci] != null) T(page, c.align === "right" ? cx + c.w - 8 : cx + 8, y - rh + 7, opt.totalRow[ci], { font: bold, size: 9.5, align: c.align === "right" ? "right" : "left" }); cx += c.w; });
      y -= rh;
    }
    return y;
  }

  // ================= COVER =================
  {
    const p = newPage("cover");
    let y = LETTER[1] - 96;
    T(p, M, y, "EOD REPORT", { font: bold, size: 40 }); y -= 24;
    T(p, M, y, `End of Day Logs & Reports — Project ${project.name || ""}${distinctBlocks.length ? ", " + (distinctBlocks.length <= 3 ? "Blocks " + distinctBlocks.join(", ") : distinctBlocks.length + " Blocks") : ""}`, { font, size: 12, color: GRAY }); y -= 14;
    p.drawRectangle({ x: M, y: y - 4, width: CW, height: 2.5, color: ORANGE }); y -= 30;
    // details grid (two columns)
    const colL = M, colR = M + CW / 2;
    const detail = (x, yy, k, v) => { T(p, x, yy, k, { font: bold, size: 9.5 }); return wrap(p, x + 92, yy, v, { size: 9.5, maxWidth: CW / 2 - 100, lh: 12 }); };
    let yl = y, yr = y;
    yl = detail(colL, yl, "Report Date:", data.dateLabel || "");
    yl = detail(colL, yl - 4, "Generated:", data.generatedLabel || "");
    yl = detail(colL, yl - 4, "Prepared For:", client);
    yr = detail(colR, yr, "Submitted By:", data.submittedBy || "");
    yr = detail(colR, yr - 4, "Company:", data.company || "Sun Rise Construction and Development LLC");
    y = Math.min(yl, yr) - 20;

    // DAILY TOTALS
    T(p, M, y, "DAILY TOTALS", { font: bold, size: 13 }); y -= 8;
    y = table(p, M, y, [
      { title: "Total Loads Delivered", w: CW / 4, align: "center" },
      { title: "Total Bundles", w: CW / 4, align: "center" },
      { title: "Total Pieces", w: CW / 4, align: "center" },
      { title: "Destination", w: CW / 4, align: "center" },
    ], [[String(totals.loads), String(totals.bundles), String(totals.pieces), String(totals.destination)]], { rh: 30 });
    y -= 20;

    // LOADS PER PERSON
    T(p, M, y, "LOADS PER PERSON", { font: bold, size: 13 }); y -= 8;
    y = table(p, M, y, [
      { title: "Team Member", w: CW * 0.46 },
      { title: "Loads", w: CW * 0.18, align: "right" },
      { title: "Bundles", w: CW * 0.18, align: "right" },
      { title: "Pieces", w: CW * 0.18, align: "right" },
    ], perPerson.map((g) => [g.key, String(g.loads), String(g.bundles), String(g.pieces)]),
      { totalRow: ["TOTAL", String(totals.loads), String(totals.bundles), String(totals.pieces)] });
    y -= 20;

    // MATERIAL BREAKDOWN BY COLOR
    T(p, M, y, "MATERIAL BREAKDOWN BY COLOR", { font: bold, size: 13 }); y -= 8;
    y = table(p, M, y, [
      { title: "Color", w: CW * 0.46 },
      { title: "Loads", w: CW * 0.18, align: "right" },
      { title: "Bundles", w: CW * 0.18, align: "right" },
      { title: "Pieces", w: CW * 0.18, align: "right" },
    ], perColor.map((g) => [g.key, String(g.loads), String(g.bundles), String(g.pieces)]),
      { totalRow: ["TOTAL", String(totals.loads), String(totals.bundles), String(totals.pieces)] });
    y -= 20;

    // SAFETY & INSPECTIONS — move to its own page if the cover is running low,
    // so long notes/equipment never overlap the footer.
    const safety = data.safety || {};
    let sp = p;
    if (y < 300) { sp = newPage("safety"); y = LETTER[1] - 72; }
    T(sp, M, y, "SAFETY & INSPECTIONS", { font: bold, size: 13 }); y -= 16;
    sp.drawRectangle({ x: M, y: y - 6, width: CW, height: 22, borderColor: LINE, borderWidth: 1 });
    T(sp, M + 8, y, "JSAs / Pre-Task Plans Filed", { font: bold, size: 9 });
    T(sp, M + CW * 0.34, y, safety.jsaSummary || "None", { font, size: 9, maxWidth: CW * 0.6 });
    y -= 22;
    if (safety.dailyNotes) { T(sp, M, y, "Daily Notes:", { font: bold, size: 9 }); y = wrap(sp, M + 62, y, safety.dailyNotes, { size: 9, maxWidth: CW - 66, lh: 12 }); y -= 2; }
    if (safety.equipmentText) { T(sp, M, y, "Total equipment onsite:", { font: bold, size: 9 }); y = wrap(sp, M + 120, y, safety.equipmentText, { size: 9, maxWidth: CW - 124, lh: 12 }); }
  }

  // ============ DELIVERIES BY BLOCK ============
  // Shows every destination the day's loads went to and how much — a load/day
  // can span multiple blocks, so this is derived from the tickets, not fixed.
  if (distinctBlocks.length) {
    const p = newPage("blocks");
    let y = LETTER[1] - 72;
    T(p, M, y, "DELIVERIES BY BLOCK / DESTINATION", { font: bold, size: 13 }); y -= 14;
    T(p, M, y, `Material delivered to ${distinctBlocks.length} block${distinctBlocks.length !== 1 ? "s" : ""} this day.`, { font, size: 9.5, color: GRAY }); y -= 10;
    table(p, M, y, [
      { title: "Block / Destination", w: CW * 0.46 },
      { title: "Loads", w: CW * 0.18, align: "right" },
      { title: "Bundles", w: CW * 0.18, align: "right" },
      { title: "Pieces", w: CW * 0.18, align: "right" },
    ], perBlock.map((g) => [g.key, String(g.loads), String(g.bundles), String(g.pieces)]),
      { totalRow: ["TOTAL", String(totals.loads), String(totals.bundles), String(totals.pieces)] });
  }

  // ============ SECTION 1 — LOAD TICKETS SUMMARY ============
  {
    const cols = [
      { title: "#", w: CW * 0.045, align: "right" },
      { title: "Report ID", w: CW * 0.15 },
      { title: "Filed By", w: CW * 0.19 },
      { title: "Color", w: CW * 0.14, color: true },
      { title: "Block", w: CW * 0.13 },
      { title: "Qty/Bnd", w: CW * 0.10, align: "right" },
      { title: "Bundles", w: CW * 0.095, align: "right" },
      { title: "Pieces", w: CW * 0.13, align: "right" },
    ];
    let idx = 0, first = true;
    while (idx < tickets.length || first) {
      const p = newPage("summary");
      let y = LETTER[1] - 72;
      if (first) { T(p, M, y, "SECTION 1 — MATERIALS / LOAD TICKETS", { font: bold, size: 13 }); y -= 14;
        T(p, M, y, `${tickets.length} load ticket${tickets.length !== 1 ? "s" : ""}. Full signed tickets on the following pages.`, { font, size: 9.5, color: GRAY }); y -= 12; }
      const rowsThisPage = Math.max(1, Math.floor((y - 110) / 22)); // dynamic — never overflow the page
      const slice = tickets.slice(idx, idx + rowsThisPage);
      const rows = slice.map((t, i) => [String(idx + i + 1), "#" + t.loadId, t.filedBy, titleCase(t.color), t.block, String(t.qtyPerBundle), String(t.bundlesPerLoad), String(t.pieces)]);
      const last = idx + rowsThisPage >= tickets.length;
      y = table(p, M, y, cols, rows, last ? { totalRow: [null, null, null, null, null, null, String(totals.bundles), String(totals.pieces)] } : {});
      if (last) {
        const noted = tickets.filter((t) => t.note);
        let ny = y - 12;
        noted.slice(0, 5).forEach((t) => { ny = wrap(p, M, ny, `Note (#${t.loadId}): “${t.note}”`, { font: oblique, size: 9, color: GRAY, maxWidth: CW, lh: 12 }); });
      }
      idx += rowsThisPage; first = false;
      if (idx >= tickets.length) break;
    }
  }

  // ============ PER-LOAD TICKET PAGES ============
  for (const ld of (data.loads || [])) {
    const p = newPage("ticket");
    let y = LETTER[1] - 80;
    T(p, M, y, "Load Report", { font: bold, size: 24 });
    T(p, LETTER[0] - M, y + 4, "Report #" + ld.id, { font, size: 9, color: GRAY, align: "right" });
    y -= 6;
    p.drawLine({ start: { x: M, y }, end: { x: M + CW, y }, thickness: 1, color: LINE }); y -= 16;
    T(p, M, y, `Filed by ${ld.filler || ""}   ·   ${ld.whenLabel || ""}`, { font, size: 10, color: GRAY }); y -= 20;
    // items table
    y = table(p, M, y, [
      { title: "#", w: CW * 0.07, align: "right" },
      { title: "Color", w: CW * 0.33, color: true },
      { title: "Block", w: CW * 0.2 },
      { title: "Qty / Bundle", w: CW * 0.2, align: "right" },
      { title: "Bundles / Load", w: CW * 0.2, align: "right" },
    ], (ld.items || []).map((it, i) => [String(i + 1), titleCase(it.color), it.block, String(it.qtyPerBundle), String(it.bundlesPerLoad)]));
    y -= 16;
    if (ld.notes) { T(p, M, y, "NOTES", { font: bold, size: 9, color: GRAY }); y -= 12; y = wrap(p, M, y, ld.notes, { size: 10, maxWidth: CW }); y -= 6; }
    // photo
    T(p, M, y, "LOAD PHOTO", { font: bold, size: 9, color: GRAY }); y -= 8;
    if (ld.photo) {
      try {
        const img = await doc.embedJpg(ld.photo);
        const maxW = CW, maxH = y - 185; // leave room for the certification block above the footer
        const d = img.scale(Math.min(maxW / img.width, maxH / img.height, 1));
        p.drawImage(img, { x: M, y: y - d.height, width: d.width, height: d.height });
        y -= d.height + 14;
      } catch { T(p, M, y - 12, "(photo unavailable)", { font, size: 9, color: LGRAY }); y -= 26; }
    } else { T(p, M, y - 12, "(no photo)", { font, size: 9, color: LGRAY }); y -= 26; }
    // Certification block, fixed above the footer. Signature rests ON/ABOVE the line.
    T(p, M, 168, "CERTIFICATION", { font: bold, size: 9, color: GRAY });
    if (ld.signature) {
      try {
        const sig = await doc.embedPng(ld.signature);
        const d = sig.scale(Math.min(300 / sig.width, 50 / sig.height, 1));
        p.drawImage(sig, { x: M, y: 112, width: d.width, height: d.height }); // bottom sits just above the line
      } catch {}
    }
    p.drawLine({ start: { x: M, y: 110 }, end: { x: M + 300, y: 110 }, thickness: 1, color: INK });
    T(p, LETTER[0] - M, 124, `Signed by ${ld.filler || ""}`, { font, size: 9, color: GRAY, align: "right" });
    T(p, LETTER[0] - M, 112, ld.whenLabel || "", { font, size: 9, color: GRAY, align: "right" });
    T(p, M, 96, "CERTIFIED ACCURATE BY THE SIGNER ABOVE.", { font: bold, size: 8, color: ORANGE });
  }

  // ============ SECTION 2 — JSA / ATTACHMENTS ============
  const attachments = data.attachments || [];
  if ((data.safety && data.safety.jsaSummary) || attachments.length) {
    const p = newPage("jsa");
    let y = LETTER[1] - 72;
    T(p, M, y, "SECTION 2 — JSA / PRE-TASK PLANS & INSPECTIONS", { font: bold, size: 13 }); y -= 16;
    if (data.safety && data.safety.jsaSummary) y = wrap(p, M, y, data.safety.jsaSummary, { size: 10, maxWidth: CW, lh: 14 });
    if (attachments.length) { y -= 6; attachments.forEach((a) => { T(p, M, y, "• " + a.name, { font, size: 10 }); y -= 14; }); }
  }
  // append attachment files
  for (const a of attachments) {
    try {
      if (a.kind === "pdf") {
        const src = await PDFDocument.load(a.bytes);
        const pages = await doc.copyPages(src, src.getPageIndices());
        pages.forEach((pg) => { doc.addPage(pg); pageMeta.push({ page: pg, kind: "attach" }); });
      } else {
        const p = newPage("attach", false);
        const img = a.kind === "png" ? await doc.embedPng(a.bytes) : await doc.embedJpg(a.bytes);
        const d = img.scale(Math.min((LETTER[0] - 40) / img.width, (LETTER[1] - 60) / img.height, 1));
        p.drawImage(img, { x: (LETTER[0] - d.width) / 2, y: (LETTER[1] - d.height) / 2, width: d.width, height: d.height });
        T(p, M, 30, a.name, { font, size: 8, color: LGRAY });
      }
    } catch (e) { /* skip unreadable attachment */ }
  }

  // ============ FOOTERS (page N of M) ============
  const all = doc.getPages();
  const total = all.length;
  all.forEach((page, i) => {
    if (logo) drawLogo(page, M, 44, 20);
    page.drawLine({ start: { x: M, y: 52 }, end: { x: M + CW, y: 52 }, thickness: 0.5, color: LINE });
    T(page, LETTER[0] / 2, 40, `CONFIDENTIAL — This report is intended solely for ${client}.`, { font, size: 7.5, color: LGRAY, align: "center" });
    T(page, LETTER[0] / 2, 30, `Unauthorized review, use, or distribution is prohibited.  ·  Sun Rise Construction & Development LLC`, { font, size: 7.5, color: LGRAY, align: "center" });
    T(page, LETTER[0] - M, 40, `Page ${i + 1} of ${total}`, { font, size: 8, color: GRAY, align: "right" });
  });

  return await doc.save();
}
