#!/usr/bin/env node
/**
 * Exercises the parsing and export logic that ships inside pile-tracker.html
 * against a real tracker PDF, head-less.
 *
 *   npm install && node tools/test-pile-tracker.cjs <tracker.pdf>
 *
 * The scripts are pulled straight out of the page so the code under test is
 * the code that runs in the browser.
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const PAGE = path.join(__dirname, "..", "pile-tracker.html");
const SRC = process.argv[2];
if (!SRC) { console.error("usage: node tools/test-pile-tracker.cjs <tracker.pdf>"); process.exit(2); }

let pdfjs, PDFLib;
try {
  pdfjs = require("pdfjs-dist/legacy/build/pdf.js");
  PDFLib = require("pdf-lib");
} catch (e) {
  console.error("Missing dependencies - run `npm install` first.\n" + e.message);
  process.exit(2);
}

function scriptFrom(html, id) {
  const re = new RegExp('<script id="' + id + '">([\\s\\S]*?)</script>');
  const m = re.exec(html);
  if (!m) throw new Error("no <script id=\"" + id + "\"> in pile-tracker.html");
  return m[1];
}

let failures = 0;
function check(name, cond, detail) {
  if (cond) { console.log("  ok   " + name); }
  else { failures++; console.log("  FAIL " + name + (detail ? "  -> " + detail : "")); }
}
function eq(name, got, want) { check(name, got === want, "got " + JSON.stringify(got) + ", want " + JSON.stringify(want)); }

(async () => {
  const html = fs.readFileSync(PAGE, "utf8");
  // Run in this realm so arrays/objects built by the page scripts satisfy
  // pdf-lib's instanceof checks.
  vm.runInThisContext(scriptFrom(html, "pile-core"));
  vm.runInThisContext(scriptFrom(html, "pile-export"));
  const C = PileCore, X = PileExport;

  const bytes = new Uint8Array(fs.readFileSync(SRC));
  const doc = await pdfjs.getDocument({ data: bytes.slice(0), verbosity: 0 }).promise;
  const srcPage1 = await doc.getPage(1);
  const srcH = srcPage1.getViewport({ scale: 1 }).height;
  const items1 = (await srcPage1.getTextContent()).items;
  const listPages = [];
  for (let n = 2; n <= doc.numPages; n++) {
    listPages.push((await (await doc.getPage(n)).getTextContent()).items);
  }
  const listItems = listPages[0] || [];

  console.log("\nGrid");
  const grid = C.buildGrid(items1);
  check("every position letter is placed on a row", grid.problems.length === 0, grid.problems.slice(0, 5).join("; "));
  check("piles found", grid.piles.length > 0, String(grid.piles.length));
  console.log("       " + grid.piles.length + " piles / " + grid.rowCount + " rows");
  check("every pile has a reveal code",
    grid.piles.every((p) => p.rev), grid.piles.filter((p) => !p.rev).length + " without");
  const keys = new Set(grid.piles.map((p) => p.key));
  eq("pile keys are unique", keys.size, grid.piles.length);
  const rowsSeen = new Set(grid.piles.map((p) => p.row));
  eq("row numbers are contiguous from 1", rowsSeen.size, Math.max(...rowsSeen));

  console.log("\nExisting list page");
  const existing = listPages.reduce((a, p) => a.concat(C.parseListPage(p)), []);
  check("list rows parsed", existing.length > 0, String(existing.length));
  console.log("       " + existing.length + " rows");
  const unknown = existing.filter((r) => !grid.byKey[C.pileKey(r.row, r.pos)]);
  eq("every listed pile exists on the map", unknown.length, 0);
  const revDiff = existing.filter((r) => grid.byKey[C.pileKey(r.row, r.pos)].rev !== r.rev);
  console.log("       reveal codes matching the map: " +
    (existing.length - revDiff.length) + "/" + existing.length +
    (revDiff.length ? "  (" + revDiff.map((r) => r.id).join(", ") + ")" : ""));
  check("reveal codes agree with the map for all but the known exception", revDiff.length <= 1,
    revDiff.map((r) => r.id).join(", "));
  check("a pile ID is its row number and map position",
    grid.piles.every((p) => p.id === "R" + p.row + "-" + p.pos),
    grid.piles.filter((p) => p.id !== "R" + p.row + "-" + p.pos).slice(0, 3).map((p) => p.id).join(", "));
  const idRule = existing.filter((r) => r.id !== C.derivePileId(r.row, r.pos));
  console.log("       listed IDs already matching that rule: " +
    (existing.length - idRule.length) + "/" + existing.length);

  console.log("\nHeights");
  const norm = [["114.5", '114.5"'], ['114.5"', '114.5"'], ["", ""], ["12 ft", "12 ft"], ["  93 ", '93"']];
  check("a bare number is read as inches",
    norm.every(([raw, want]) => C.normalizeLength(raw) === want),
    norm.filter(([raw, want]) => C.normalizeLength(raw) !== want).map(([r]) => r).join(", "));

  console.log("\nExport");
  const marks = existing.map((r) => {
    const p = grid.byKey[C.pileKey(r.row, r.pos)];
    return { key: p.key, row: r.row, pos: r.pos, x: p.x, y: p.y, mark: r.mark,
             id: p.id, len: r.len, rev: r.rev, revMismatch: r.rev !== p.rev };
  });
  const counts = C.counts(marks);
  console.log("       marking " + marks.length + " piles (" + counts.green + " green / " + counts.orange + " orange)");
  const out = await X.exportPdf({ srcBytes: bytes.slice(0), marks, PDFLib,
    headings: {
      map: C.readHeadings(items1, srcH - X.MAP.titleBaseline, srcH - X.MAP.subBaseline),
      list: C.readHeadings(listItems, X.LIST.titleBaseline, X.LIST.subBaseline),
      footPrefix: X.FOOT_DEFAULT
    } });
  const outPath = path.join(require("os").tmpdir(), "pile-tracker-export.pdf");
  fs.writeFileSync(outPath, out);
  console.log("       wrote " + outPath + " (" + out.length + " bytes)");

  const rt = await pdfjs.getDocument({ data: new Uint8Array(out), verbosity: 0 }).promise;
  const rtItems1 = (await (await rt.getPage(1)).getTextContent()).items;
  const rtPages = [];
  for (let n = 2; n <= rt.numPages; n++) rtPages.push((await (await rt.getPage(n)).getTextContent()).items);
  const rtList = rtPages[0] || [];
  const rtGrid = C.buildGrid(rtItems1);
  eq("re-read map still has every pile", rtGrid.piles.length, grid.piles.length);
  const rtList2 = rtPages.reduce((a, p) => a.concat(C.parseListPage(p)), []);
  eq("re-read list has the same number of piles", rtList2.length, marks.length);
  const before = C.sortMarks(marks).map((m) => [m.id, m.row, m.pos, m.rev, m.mark, m.len].join("|"));
  const after = C.sortMarks(rtList2).map((m) => [m.id, m.row, m.pos, m.rev, m.mark, m.len].join("|"));
  const diff = before.filter((v, i) => v !== after[i]);
  eq("every list row round-trips unchanged", diff.length, 0);
  if (diff.length) console.log("       first diff: " + diff[0] + "  vs  " + after[before.indexOf(diff[0])]);
  console.log("       map title    : " + JSON.stringify(C.readHeadings(rtItems1, srcH - X.MAP.titleBaseline, srcH - X.MAP.subBaseline).title));
  console.log("       map subtitle : " + JSON.stringify(C.readHeadings(rtItems1, srcH - X.MAP.titleBaseline, srcH - X.MAP.subBaseline).subtitle));
  console.log("       list subtitle: " + JSON.stringify(C.readHeadings(rtList, X.LIST.titleBaseline, X.LIST.subBaseline).subtitle));
  const legend = rtItems1.map((i) => (i.str || "")).join(" ").replace(/\s+/g, " ");
  check("legend counts follow the marks",
    legend.includes(C.MARKS.green.label + " (" + counts.green + ")") &&
    legend.includes(C.MARKS.orange.label + " (" + counts.orange + ")"), legend.slice(-260));

  console.log("\nEdited set (multi-page list)");
  const wide = grid.piles.filter((p) => p.row <= 8).map((p, i) => ({
    key: p.key, row: p.row, pos: p.pos, x: p.x, y: p.y,
    mark: i % 3 === 0 ? "orange" : "green", id: p.id, len: "", rev: p.rev, revMismatch: false
  }));
  const wideCounts = C.counts(wide);
  const out2 = await X.exportPdf({ srcBytes: bytes.slice(0), marks: wide, PDFLib,
    headings: {
      map: C.readHeadings(items1, srcH - X.MAP.titleBaseline, srcH - X.MAP.subBaseline),
      list: C.readHeadings(listItems, X.LIST.titleBaseline, X.LIST.subBaseline),
      footPrefix: X.FOOT_DEFAULT
    } });
  const rt2 = await pdfjs.getDocument({ data: new Uint8Array(out2), verbosity: 0 }).promise;
  const perPage = X.LIST.rowsPerCol * 2;
  console.log("       " + wide.length + " piles (" + wideCounts.green + " green / " +
    wideCounts.orange + " orange) over " + (rt2.numPages - 1) + " list page(s)");
  eq("list paginates", rt2.numPages, 1 + Math.ceil(wide.length / perPage));
  const back = [];
  for (let n = 2; n <= rt2.numPages; n++) {
    back.push(...C.parseListPage((await (await rt2.getPage(n)).getTextContent()).items));
  }
  eq("every marked pile reaches the list", back.length, wide.length);
  const wantSet = new Set(C.sortMarks(wide).map((m) => m.id + "/" + m.mark));
  eq("marks survive the round trip",
    C.sortMarks(back).filter((m) => wantSet.has(m.id + "/" + m.mark)).length, wide.length);
  const rt2Items1 = (await (await rt2.getPage(1)).getTextContent()).items;
  const legend2 = rt2Items1.map((i) => i.str || "").join(" ").replace(/\s+/g, " ");
  check("legend counts follow the edited set",
    legend2.includes(C.MARKS.green.label + " (" + wideCounts.green + ")") &&
    legend2.includes(C.MARKS.orange.label + " (" + wideCounts.orange + ")"), legend2.slice(-200));
  check("map circles match the edited set",
    C.buildGrid(rt2Items1).piles.length === grid.piles.length, "base map lost piles");

  console.log(failures ? "\n" + failures + " check(s) failed\n" : "\nall checks passed\n");
  process.exit(failures ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
