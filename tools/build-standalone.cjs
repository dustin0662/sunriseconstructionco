#!/usr/bin/env node
/**
 * Bundles pile-tracker.html and the libraries it loads from /assets into one
 * self-contained file that runs from disk, with no server.
 *
 *   node tools/build-standalone.cjs
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const SRC = path.join(ROOT, "pile-tracker.html");
const OUT = path.join(ROOT, "pile-tracker-standalone.html");

const read = (p) => fs.readFileSync(path.join(ROOT, p), "utf8");
const guard = (js, name) => {
  if (/<\/script/i.test(js)) throw new Error(name + " contains </script and cannot be inlined as-is");
  return js;
};

let html = fs.readFileSync(SRC, "utf8");

// The worker cannot be a <script>; it is handed to pdf.js as a blob URL built
// from source parked in a non-executing tag.
const worker = guard(read("assets/pdf.worker.min.js"), "pdf.worker.min.js");
// Replacements go in as functions: library sources are full of $& and $' which
// String.replace would otherwise expand.
const sub = (needle, text) => {
  if (!html.includes(needle)) throw new Error("not found in pile-tracker.html: " + needle);
  html = html.replace(needle, () => text);
};
sub('<script src="/assets/pdf.min.js"></script>',
  '<script id="pdf-worker-src" type="text/plain">\n' + worker + "\n</script>\n" +
  "<script>\n" +
  "  window.PDF_WORKER_SRC = URL.createObjectURL(new Blob(\n" +
  "    [document.getElementById('pdf-worker-src').textContent],\n" +
  "    { type: 'text/javascript' }\n" +
  "  ));\n" +
  "</script>\n" +
  "<script>\n" + guard(read("assets/pdf.min.js"), "pdf.min.js") + "\n</script>");
sub('<script src="/assets/pdf-lib.min.js"></script>',
  "<script>\n" + guard(read("assets/pdf-lib.min.js"), "pdf-lib.min.js") + "\n</script>");
// Served-only assets that would 404 from disk.
html = html.replace(/\n\s*<link rel="icon"[^>]*>/, "");

["/assets/pdf.min.js", "/assets/pdf-lib.min.js", 'src="/assets'].forEach((left) => {
  if (html.includes(left)) throw new Error("still referencing " + left);
});

fs.writeFileSync(OUT, html);
console.log("wrote " + path.relative(ROOT, OUT) + " (" + (html.length / 1048576).toFixed(2) + " MB)");
