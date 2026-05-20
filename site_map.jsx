import { useState, useEffect, useRef, useCallback, useMemo } from "react";

const STAGES = [
  { key: "bores", label: "Bores", color: "#dc2626", level: 1 },
  { key: "piles", label: "Piles", color: "#e86a10", level: 2 },
  { key: "postCaps", label: "Post Caps", color: "#eab308", level: 3 },
  { key: "torqueTube", label: "Torque Tube", color: "#0891b2", level: 4 },
  { key: "modules", label: "Modules", color: "#16a34a", level: 5 },
];

function stageByLevel(l) {
  return STAGES.find((s) => s.level === l) || null;
}

function PileIcon({ s = 14, color }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <rect x="9.5" y="3" width="2" height="18" fill={color} />
      <rect x="12.5" y="3" width="2" height="18" fill={color} />
      <rect x="8" y="9.5" width="8" height="2.5" rx=".5" fill={color} />
      <line x1="5" y1="17" x2="19" y2="17" stroke={color} strokeWidth="1.2" strokeDasharray="2 1.5" opacity=".5" />
    </svg>
  );
}
function TorqueTubeIcon({ s = 14, color }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <g transform="rotate(90 12 12)">
        <rect x="3" y="10" width="18" height="4" rx="2" fill={color} />
        <circle cx="5" cy="12" r="2.2" fill={color} opacity=".65" />
        <circle cx="19" cy="12" r="2.2" fill={color} opacity=".65" />
      </g>
    </svg>
  );
}
function BoreIcon({ s = 14, color }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="7" stroke={color} strokeWidth="1.5" fill="none" />
      <circle cx="12" cy="12" r="3" fill={color} opacity=".55" />
      <path d="M12 4L12 6" stroke={color} strokeWidth="1.2" />
      <path d="M12 18L12 20" stroke={color} strokeWidth="1.2" />
      <path d="M4 12L6 12" stroke={color} strokeWidth="1.2" />
      <path d="M18 12L20 12" stroke={color} strokeWidth="1.2" />
    </svg>
  );
}
function PostCapIcon({ s = 14, color }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <rect x="9" y="12" width="6" height="9" rx=".5" fill={color} opacity=".4" />
      <rect x="6" y="8" width="12" height="5" rx="1.5" fill={color} />
      <rect x="7" y="7" width="10" height="2" rx="1" fill={color} opacity=".65" />
    </svg>
  );
}
function ModuleIcon({ s = 14, color }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="5" width="18" height="14" rx="1.5" fill={color} />
      <line x1="3" y1="9.5" x2="21" y2="9.5" stroke="#fff" strokeWidth=".5" opacity=".3" />
      <line x1="3" y1="14.5" x2="21" y2="14.5" stroke="#fff" strokeWidth=".5" opacity=".3" />
      <line x1="9" y1="5" x2="9" y2="19" stroke="#fff" strokeWidth=".5" opacity=".3" />
      <line x1="15" y1="5" x2="15" y2="19" stroke="#fff" strokeWidth=".5" opacity=".3" />
    </svg>
  );
}

const ICON_MAP = {
  bores: BoreIcon,
  piles: PileIcon,
  postCaps: PostCapIcon,
  torqueTube: TorqueTubeIcon,
  modules: ModuleIcon,
};

function calcPcts(levels) {
  const t = levels.length;
  if (!t) return { _overall: 0 };
  const r = {};
  STAGES.forEach((st) => {
    r[st.key] = (levels.filter((l) => l >= st.level).length / t) * 100;
  });
  r._overall = (levels.reduce((a, b) => a + b, 0) / t / 5) * 100;
  return r;
}

function rowStarts(rl) {
  const s = [0];
  for (let i = 0; i < rl.length; i++) s.push(s[i] + rl[i]);
  return s;
}

/* ============================================================
   PDF / image ingest + computer-vision pipeline
   ============================================================ */

const PDFJS_VER = "3.11.174";
async function ensurePdfJs() {
  if (window.pdfjsLib) return window.pdfjsLib;
  await new Promise((res, rej) => {
    const s = document.createElement("script");
    s.src = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS_VER}/pdf.min.js`;
    s.onload = res;
    s.onerror = rej;
    document.head.appendChild(s);
  });
  window.pdfjsLib.GlobalWorkerOptions.workerSrc =
    `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS_VER}/pdf.worker.min.js`;
  return window.pdfjsLib;
}

async function fileToCanvas(file, pdfScale = 2) {
  if (file.type === "application/pdf" || /\.pdf$/i.test(file.name)) {
    const pdfjs = await ensurePdfJs();
    const buf = await file.arrayBuffer();
    const pdf = await pdfjs.getDocument({ data: buf }).promise;
    const page = await pdf.getPage(1);
    let viewport = page.getViewport({ scale: pdfScale });
    // Cap to a max long edge so detection stays interactive on large drawings.
    const maxEdge = 4000;
    const longest = Math.max(viewport.width, viewport.height);
    if (longest > maxEdge) {
      viewport = page.getViewport({ scale: pdfScale * (maxEdge / longest) });
    }
    const canvas = document.createElement("canvas");
    canvas.width = Math.ceil(viewport.width);
    canvas.height = Math.ceil(viewport.height);
    await page.render({ canvasContext: canvas.getContext("2d"), viewport }).promise;
    return canvas;
  }
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise((res, rej) => {
      const i = new Image();
      i.onload = () => res(i);
      i.onerror = rej;
      i.src = url;
    });
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    canvas.getContext("2d").drawImage(img, 0, 0);
    return canvas;
  } finally {
    URL.revokeObjectURL(url);
  }
}

// Find enclosed light regions (the interior of every dark-outlined marker).
// Works for circles regardless of fill color (including pure white) because we
// segment on "is this pixel surrounded by darker pixels" rather than on color.
function detectPoints(canvas, opts = {}) {
  const {
    darkV = 0.40,        // V <= darkV is treated as the outline / "wall"
    minBlob = 30,
    maxBlob = 2000,
    arMin = 0.55,
    arMax = 1.8,
    minBboxPx = 8,
    maxBboxPx = 80,
  } = opts;
  const W = canvas.width;
  const H = canvas.height;
  const data = canvas.getContext("2d").getImageData(0, 0, W, H).data;
  const N = W * H;
  // light[i] = 1 means the pixel is part of background / interior (not wall).
  const light = new Uint8Array(N);
  const v255 = Math.round(darkV * 255);
  for (let i = 0; i < N; i++) {
    const r = data[4 * i];
    const g = data[4 * i + 1];
    const b = data[4 * i + 2];
    const mx = r > g ? (r > b ? r : b) : (g > b ? g : b);
    if (mx > v255) light[i] = 1;
  }
  // Flood-fill light pixels reachable from the image border. Anything reached
  // is the outer background; anything light but unreached is enclosed.
  const reached = new Uint8Array(N);
  const queue = new Int32Array(N);
  let qh = 0;
  let qt = 0;
  const push = (idx) => { if (light[idx] && !reached[idx]) { reached[idx] = 1; queue[qt++] = idx; } };
  for (let x = 0; x < W; x++) { push(x); push((H - 1) * W + x); }
  for (let y = 0; y < H; y++) { push(y * W); push(y * W + W - 1); }
  while (qh < qt) {
    const q = queue[qh++];
    const qx = q % W;
    const qy = (q - qx) / W;
    if (qx > 0) push(q - 1);
    if (qx < W - 1) push(q + 1);
    if (qy > 0) push(q - W);
    if (qy < H - 1) push(q + W);
  }
  // Label remaining (enclosed) light pixels into connected components.
  const visited = new Uint8Array(N);
  const points = [];
  const q2 = queue; // reuse
  for (let p = 0; p < N; p++) {
    if (!light[p] || reached[p] || visited[p]) continue;
    let h2 = 0;
    let t2 = 0;
    q2[t2++] = p;
    visited[p] = 1;
    let sx = 0;
    let sy = 0;
    let cnt = 0;
    let mnX = W;
    let mnY = H;
    let mxX = 0;
    let mxY = 0;
    while (h2 < t2) {
      const q = q2[h2++];
      const qx = q % W;
      const qy = (q - qx) / W;
      sx += qx;
      sy += qy;
      cnt++;
      if (qx < mnX) mnX = qx;
      if (qy < mnY) mnY = qy;
      if (qx > mxX) mxX = qx;
      if (qy > mxY) mxY = qy;
      if (qx > 0) { const n = q - 1; if (light[n] && !reached[n] && !visited[n]) { visited[n] = 1; q2[t2++] = n; } }
      if (qx < W - 1) { const n = q + 1; if (light[n] && !reached[n] && !visited[n]) { visited[n] = 1; q2[t2++] = n; } }
      if (qy > 0) { const n = q - W; if (light[n] && !reached[n] && !visited[n]) { visited[n] = 1; q2[t2++] = n; } }
      if (qy < H - 1) { const n = q + W; if (light[n] && !reached[n] && !visited[n]) { visited[n] = 1; q2[t2++] = n; } }
    }
    if (cnt < minBlob || cnt > maxBlob) continue;
    const w = mxX - mnX + 1;
    const h = mxY - mnY + 1;
    const ar = w / h;
    if (ar < arMin || ar > arMax) continue;
    const bboxLong = Math.max(w, h);
    if (bboxLong < minBboxPx || bboxLong > maxBboxPx) continue;
    // Use the bbox center rather than the pixel centroid: the post-rivnut dot
    // inside each circle skews the centroid otherwise.
    points.push({ x: (mnX + mxX) / 2, y: (mnY + mxY) / 2, size: cnt, w, h });
  }
  return points;
}

// Median nearest-neighbor distance gives within-row spacing; angle histogram
// of NN bearings gives the field's row orientation.
function estimateGrid(points) {
  const N = points.length;
  if (N < 4) return { spacing: 12, angle: 0 };
  // Spatial bucket for fast NN.
  const approxSpacing = (() => {
    const sampleN = Math.min(200, N);
    const ds = [];
    for (let k = 0; k < sampleN; k++) {
      const a = points[(k * 9973) % N];
      let best = Infinity;
      for (let j = 0; j < N; j++) {
        if (j === ((k * 9973) % N)) continue;
        const dx = points[j].x - a.x;
        const dy = points[j].y - a.y;
        const d = dx * dx + dy * dy;
        if (d < best) best = d;
      }
      ds.push(Math.sqrt(best));
    }
    ds.sort((a, b) => a - b);
    return ds[Math.floor(ds.length / 2)] || 12;
  })();
  const cell = approxSpacing * 3;
  const buckets = new Map();
  const bkey = (cx, cy) => cx * 1000003 + cy;
  for (let i = 0; i < N; i++) {
    const cx = Math.floor(points[i].x / cell);
    const cy = Math.floor(points[i].y / cell);
    const k = bkey(cx, cy);
    let arr = buckets.get(k);
    if (!arr) { arr = []; buckets.set(k, arr); }
    arr.push(i);
  }
  const dists = [];
  const angles = [];
  const sampleStep = Math.max(1, Math.floor(N / 800));
  for (let i = 0; i < N; i += sampleStep) {
    const px = points[i].x;
    const py = points[i].y;
    const cx = Math.floor(px / cell);
    const cy = Math.floor(py / cell);
    let best = Infinity;
    let bdx = 0;
    let bdy = 0;
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        const arr = buckets.get(bkey(cx + dx, cy + dy));
        if (!arr) continue;
        for (const j of arr) {
          if (j === i) continue;
          const ddx = points[j].x - px;
          const ddy = points[j].y - py;
          const d = ddx * ddx + ddy * ddy;
          if (d < best) { best = d; bdx = ddx; bdy = ddy; }
        }
      }
    }
    if (best === Infinity) continue;
    dists.push(Math.sqrt(best));
    let a = Math.atan2(bdy, bdx);
    while (a < 0) a += Math.PI;
    while (a >= Math.PI) a -= Math.PI;
    angles.push(a);
  }
  dists.sort((a, b) => a - b);
  const spacing = dists[Math.floor(dists.length / 2)] || approxSpacing;
  const BIN = 90;
  const bins = new Array(BIN).fill(0);
  for (const a of angles) {
    const b = Math.min(BIN - 1, Math.floor((a / Math.PI) * BIN));
    bins[b]++;
  }
  let peak = 0;
  for (let i = 1; i < BIN; i++) if (bins[i] > bins[peak]) peak = i;
  // Weighted mean ±2 bins for sub-bin accuracy.
  let wsum = 0;
  let asum = 0;
  for (let d = -2; d <= 2; d++) {
    const bi = (peak + d + BIN) % BIN;
    const w = bins[bi];
    const a = (bi + 0.5) / BIN * Math.PI;
    wsum += w;
    asum += w * a;
  }
  const angle = wsum ? asum / wsum : 0;
  return { spacing, angle };
}

// Build a single section from the subset of points inside a user-drawn
// rectangle. Estimates grid (spacing, angle) from those points only, clusters
// them into rows, and produces { x, y, angle, colGap, rowGap, rl, offsets,
// levels } in image coordinates.
function buildSectionFromRect(points, rect, opts = {}) {
  const minX = Math.min(rect.x1, rect.x2);
  const maxX = Math.max(rect.x1, rect.x2);
  const minY = Math.min(rect.y1, rect.y2);
  const maxY = Math.max(rect.y1, rect.y2);
  const inside = points.filter((p) => p.x >= minX && p.x <= maxX && p.y >= minY && p.y <= maxY);
  if (inside.length < 4) return null;
  const { spacing, angle } = estimateGrid(inside);
  const cosNA = Math.cos(-angle);
  const sinNA = Math.sin(-angle);
  const rot = inside.map((p) => ({ rx: p.x * cosNA - p.y * sinNA, ry: p.x * sinNA + p.y * cosNA }));
  rot.sort((a, b) => a.ry - b.ry);
  const rowEps = spacing * 0.55;
  const rowGroups = [];
  let cur = [rot[0]];
  for (let i = 1; i < rot.length; i++) {
    if (rot[i].ry - cur[cur.length - 1].ry > rowEps) { rowGroups.push(cur); cur = [rot[i]]; }
    else cur.push(rot[i]);
  }
  rowGroups.push(cur);
  const colDs = [];
  for (const row of rowGroups) {
    row.sort((a, b) => a.rx - b.rx);
    for (let i = 1; i < row.length; i++) colDs.push(row[i].rx - row[i - 1].rx);
  }
  colDs.sort((a, b) => a - b);
  const colGap = colDs.length ? colDs[Math.floor(colDs.length * 0.3)] : spacing;
  const rowCenters = rowGroups.map((r) => r.reduce((a, p) => a + p.ry, 0) / r.length);
  let rowGap = spacing * 2;
  if (rowCenters.length > 1) {
    const gaps = [];
    for (let i = 1; i < rowCenters.length; i++) gaps.push(rowCenters[i] - rowCenters[i - 1]);
    gaps.sort((a, b) => a - b);
    rowGap = gaps[Math.floor(gaps.length / 2)] || rowGap;
  }
  const minRx = Math.min(...rot.map((p) => p.rx));
  const minRy = rowCenters[0];
  const rl = [];
  const offsets = [];
  for (const row of rowGroups) {
    const startCol = Math.round((row[0].rx - minRx) / colGap);
    const endCol = Math.round((row[row.length - 1].rx - minRx) / colGap);
    offsets.push(startCol);
    rl.push(endCol - startCol + 1);
  }
  const total = rl.reduce((a, b) => a + b, 0);
  const cosA = Math.cos(angle);
  const sinA = Math.sin(angle);
  const x = minRx * cosA - minRy * sinA;
  const y = minRx * sinA + minRy * cosA;
  return {
    x, y, angle, colGap, rowGap, rl, offsets,
    levels: new Array(total).fill(0),
    pointCount: inside.length,
  };
}

// (Retained but unused by the import flow now that sections are manual.)
function clusterIntoSections(points, opts = {}) {
  if (!points.length) return { sections: [], spacing: 12, angle: 0 };
  const { spacing, angle } = estimateGrid(points);
  const cosNA = Math.cos(-angle);
  const sinNA = Math.sin(-angle);
  const rot = points.map((p) => ({
    rx: p.x * cosNA - p.y * sinNA,
    ry: p.x * sinNA + p.y * cosNA,
    src: p,
  }));
  const N = rot.length;
  const parent = new Int32Array(N);
  for (let i = 0; i < N; i++) parent[i] = i;
  const find = (x) => { while (parent[x] !== x) { parent[x] = parent[parent[x]]; x = parent[x]; } return x; };
  const union = (a, b) => { const ra = find(a); const rb = find(b); if (ra !== rb) parent[ra] = rb; };
  const cell = spacing * 2.5;
  const bk = new Map();
  const k = (cx, cy) => cx * 1000003 + cy;
  for (let i = 0; i < N; i++) {
    const cx = Math.floor(rot[i].rx / cell);
    const cy = Math.floor(rot[i].ry / cell);
    const kk = k(cx, cy);
    let a = bk.get(kk);
    if (!a) { a = []; bk.set(kk, a); }
    a.push(i);
  }
  const maxD2 = (spacing * 2.6) * (spacing * 2.6);
  for (let i = 0; i < N; i++) {
    const cx = Math.floor(rot[i].rx / cell);
    const cy = Math.floor(rot[i].ry / cell);
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        const arr = bk.get(k(cx + dx, cy + dy));
        if (!arr) continue;
        for (const j of arr) {
          if (j <= i) continue;
          const ax = rot[i].rx - rot[j].rx;
          const ay = rot[i].ry - rot[j].ry;
          if (ax * ax + ay * ay <= maxD2) union(i, j);
        }
      }
    }
  }
  const groups = new Map();
  for (let i = 0; i < N; i++) {
    const r = find(i);
    let g = groups.get(r);
    if (!g) { g = []; groups.set(r, g); }
    g.push(i);
  }
  const cosA = Math.cos(angle);
  const sinA = Math.sin(angle);
  const sections = [];
  for (const indices of groups.values()) {
    if (indices.length < 6) continue;
    const pts = indices.map((i) => rot[i]).sort((a, b) => a.ry - b.ry);
    // Row clustering by ry (gap > 0.55 × spacing breaks a row).
    const rowEps = spacing * 0.55;
    const rowGroups = [];
    let cur = [pts[0]];
    for (let kk = 1; kk < pts.length; kk++) {
      if (pts[kk].ry - cur[cur.length - 1].ry > rowEps) {
        rowGroups.push(cur);
        cur = [pts[kk]];
      } else {
        cur.push(pts[kk]);
      }
    }
    rowGroups.push(cur);
    // Estimate column spacing from intra-row gaps (30th percentile).
    const colDs = [];
    for (const row of rowGroups) {
      row.sort((a, b) => a.rx - b.rx);
      for (let i = 1; i < row.length; i++) colDs.push(row[i].rx - row[i - 1].rx);
    }
    colDs.sort((a, b) => a - b);
    const colGap = colDs.length
      ? colDs[Math.floor(colDs.length * 0.3)]
      : spacing;
    // Row spacing from row centers.
    const rowCenters = rowGroups.map(
      (r) => r.reduce((a, p) => a + p.ry, 0) / r.length
    );
    let rowGap = spacing * 2;
    if (rowCenters.length > 1) {
      const gaps = [];
      for (let i = 1; i < rowCenters.length; i++) gaps.push(rowCenters[i] - rowCenters[i - 1]);
      gaps.sort((a, b) => a - b);
      rowGap = gaps[Math.floor(gaps.length / 2)] || rowGap;
    }
    const minRx = Math.min(...pts.map((p) => p.rx));
    const minRy = rowCenters[0];
    const rl = [];
    const offsets = [];
    for (let ri = 0; ri < rowGroups.length; ri++) {
      const row = rowGroups[ri];
      const startCol = Math.round((row[0].rx - minRx) / colGap);
      const endCol = Math.round((row[row.length - 1].rx - minRx) / colGap);
      offsets.push(startCol);
      rl.push(endCol - startCol + 1);
    }
    const total = rl.reduce((a, b) => a + b, 0);
    // Section origin in unrotated (image) coords.
    const ox = minRx * cosA - minRy * sinA;
    const oy = minRx * sinA + minRy * cosA;
    sections.push({
      id: 0,
      label: "",
      x: ox,
      y: oy,
      angle,
      colGap,
      rowGap,
      rl,
      offsets,
      levels: new Array(total).fill(0),
    });
  }
  sections.sort((a, b) => a.y - b.y || a.x - b.x);
  sections.forEach((s, i) => { s.id = i + 1; s.label = `N${i + 1}`; });
  return { sections, spacing, angle };
}

/* ============================================================
   Per-section 2D grid (free-positioned, rotated)
   ============================================================ */

function Section2D({
  section,
  index,
  activeTask,
  viewMode,
  gridEdit,
  selected,
  onSelect,
  onUpdate,
  onRemove,
  showLabel,
  cellSize,
  zoom,
  moveMode,
}) {
  const aLvl = activeTask
    ? STAGES.find((s) => s.key === activeTask)?.level || 0
    : 0;
  const editable = activeTask && !viewMode;
  const painting = useRef(false);
  const paintMode = useRef(null);

  const { rl, offsets, levels } = section;
  const safeOffsets = offsets && offsets.length === rl.length ? offsets : rl.map(() => 0);
  const minOff = Math.min(0, ...safeOffsets);
  const maxRight = Math.max(...rl.map((l, i) => (safeOffsets[i] || 0) + l));
  const cs = cellSize;
  const colW = section.colGap || cs;
  const rowH = section.rowGap || cs;

  const toggle = useCallback(
    (idx) => {
      if (!activeTask || viewMode) return;
      const newLevels = [...levels];
      if (paintMode.current === null) {
        paintMode.current = newLevels[idx] < aLvl ? "add" : "remove";
      }
      newLevels[idx] = paintMode.current === "add" ? aLvl : 0;
      onUpdate({ levels: newLevels });
    },
    [activeTask, aLvl, levels, viewMode, onUpdate]
  );

  useEffect(() => {
    const up = () => {
      painting.current = false;
      paintMode.current = null;
    };
    window.addEventListener("pointerup", up);
    return () => window.removeEventListener("pointerup", up);
  }, []);

  const onCellDown = (i) => (e) => {
    if (!activeTask || viewMode) return;
    e.preventDefault();
    e.stopPropagation();
    painting.current = true;
    paintMode.current = null;
    toggle(i);
  };
  const onCellEnter = (i) => () => {
    if (painting.current && activeTask && !viewMode) toggle(i);
  };

  // Free-2D rendering uses absolute positioning per cell so col/row gaps come
  // from the original drawing rather than CSS flex defaults.
  const cells = [];
  let idx = 0;
  for (let r = 0; r < rl.length; r++) {
    const off = safeOffsets[r] || 0;
    for (let c = 0; c < rl[r]; c++) {
      const i = idx++;
      const lvl = levels[i] || 0;
      let ds = null;
      if (viewMode === "all" || (!activeTask && !viewMode)) {
        ds = stageByLevel(lvl);
      } else if (activeTask) {
        if (lvl >= aLvl) ds = STAGES.find((s) => s.key === activeTask);
      }
      const left = (off - minOff) * colW;
      const top = r * rowH;
      if (ds) {
        const Icon = ICON_MAP[ds.key];
        cells.push(
          <div
            key={i}
            onPointerDown={onCellDown(i)}
            onPointerEnter={onCellEnter(i)}
            style={{
              position: "absolute",
              left,
              top,
              width: colW,
              height: rowH,
              borderRadius: 1,
              background: `${ds.color}22`,
              border: `0.5px solid ${ds.color}55`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: editable ? "pointer" : "default",
              boxSizing: "border-box",
            }}
          >
            <Icon s={Math.max(4, Math.min(colW, rowH) - 3)} color={ds.color} />
          </div>
        );
      } else {
        cells.push(
          <div
            key={i}
            onPointerDown={onCellDown(i)}
            onPointerEnter={onCellEnter(i)}
            style={{
              position: "absolute",
              left,
              top,
              width: colW,
              height: rowH,
              borderRadius: 1,
              background: gridEdit ? "#eee8dd" : "#f7f5f2",
              border: gridEdit ? "0.5px solid #d0c8b5" : "0.5px solid #e8e4de",
              cursor: editable ? "pointer" : "default",
              boxSizing: "border-box",
            }}
          />
        );
      }
    }
  }

  const widthPx = (maxRight - minOff) * colW;
  const heightPx = rl.length * rowH;
  const pcts = calcPcts(levels);

  // Section-level drag (translate the whole section in image coords)
  const dragRef = useRef(null);
  const onSectionPointerDown = (e) => {
    if (!moveMode) return;
    e.preventDefault();
    e.stopPropagation();
    onSelect(section.id);
    dragRef.current = { sx: e.clientX, sy: e.clientY, ox: section.x, oy: section.y };
    const mv = (ev) => {
      if (!dragRef.current) return;
      const dx = (ev.clientX - dragRef.current.sx) / zoom;
      const dy = (ev.clientY - dragRef.current.sy) / zoom;
      onUpdate({ x: dragRef.current.ox + dx, y: dragRef.current.oy + dy });
    };
    const up = () => {
      dragRef.current = null;
      window.removeEventListener("pointermove", mv);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", mv);
    window.addEventListener("pointerup", up);
  };

  const angleDeg = ((section.angle || 0) * 180) / Math.PI;
  const labelOffsetX = (-minOff) * colW;
  return (
    <div
      onPointerDown={onSectionPointerDown}
      onClick={(e) => { if (moveMode) return; onSelect(section.id); }}
      style={{
        position: "absolute",
        left: section.x,
        top: section.y,
        transform: `rotate(${angleDeg}deg)`,
        transformOrigin: `${labelOffsetX}px 0px`,
        cursor: moveMode ? "grab" : "default",
      }}
    >
      {selected && (
        <div
          style={{
            position: "absolute",
            left: -2,
            top: -2,
            width: widthPx + 4,
            height: heightPx + 4,
            border: "2px solid #e86a10",
            borderRadius: 3,
            pointerEvents: "none",
          }}
        />
      )}
      <div style={{ position: "relative", width: widthPx, height: heightPx }}>
        {cells}
      </div>
      {showLabel && (
        <div
          style={{
            position: "absolute",
            left: widthPx / 2 - 26,
            top: heightPx / 2 - 9,
            width: 52,
            background: "rgba(100,100,100,.92)",
            color: "#fff",
            textAlign: "center",
            fontFamily: "var(--d)",
            fontSize: 13,
            letterSpacing: ".05em",
            padding: "1px 0",
            pointerEvents: "none",
            borderRadius: 2,
          }}
        >
          {section.label}
        </div>
      )}
      {gridEdit && (
        <div
          style={{
            position: "absolute",
            left: widthPx + 6,
            top: -2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            transform: `rotate(${-angleDeg}deg)`,
          }}
        >
          <button
            onClick={(e) => { e.stopPropagation(); onRemove(section.id); }}
            style={{
              width: 18, height: 18, borderRadius: 9,
              background: "#dc2626", color: "#fff", border: "none",
              cursor: "pointer", fontSize: 10, fontWeight: 700,
            }}
            title="Delete section"
          >✕</button>
          <button
            onClick={(e) => { e.stopPropagation(); onUpdate({ angle: (section.angle || 0) + Math.PI / 180 }); }}
            style={{ width: 18, height: 18, borderRadius: 4, background: "#fff", border: "1px solid #ccc", cursor: "pointer", fontSize: 11 }}
            title="Rotate +1°"
          >↻</button>
          <button
            onClick={(e) => { e.stopPropagation(); onUpdate({ angle: (section.angle || 0) - Math.PI / 180 }); }}
            style={{ width: 18, height: 18, borderRadius: 4, background: "#fff", border: "1px solid #ccc", cursor: "pointer", fontSize: 11 }}
            title="Rotate −1°"
          >↺</button>
        </div>
      )}
      {selected && !gridEdit && (
        <div
          style={{
            position: "absolute",
            left: widthPx + 8,
            top: 0,
            background: "#fff",
            border: "1px solid #e0ddd8",
            borderRadius: 3,
            padding: "4px 6px",
            fontSize: 9,
            fontFamily: "var(--b)",
            color: "#333",
            transform: `rotate(${-angleDeg}deg)`,
            transformOrigin: "0 0",
            whiteSpace: "nowrap",
            boxShadow: "0 1px 4px rgba(0,0,0,.08)",
          }}
        >
          <div style={{ fontWeight: 700, marginBottom: 2 }}>{section.label}</div>
          <div>Overall {(pcts._overall || 0).toFixed(1)}%</div>
          <div>{levels.length} pos · {rl.length} rows</div>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   2D canvas (positioned + rotated sections, optional backdrop)
   ============================================================ */

function CanvasView({
  sections,
  bgUrl,
  bgWidth,
  bgHeight,
  showBg,
  bgOpacity,
  activeTask,
  viewMode,
  gridEdit,
  selectedId,
  setSelectedId,
  updateSection,
  removeSection,
  cellSize,
  zoom,
  setZoom,
  moveMode,
}) {
  const containerRef = useRef(null);
  // Compute bbox of sections
  const bbox = useMemo(() => {
    if (!sections.length) return { x: 0, y: 0, w: 800, h: 600 };
    let mnX = Infinity, mnY = Infinity, mxX = -Infinity, mxY = -Infinity;
    for (const s of sections) {
      const safeOff = s.offsets || s.rl.map(() => 0);
      const minOff = Math.min(0, ...safeOff);
      const maxRight = Math.max(...s.rl.map((l, i) => (safeOff[i] || 0) + l));
      const w = (maxRight - minOff) * (s.colGap || cellSize);
      const h = s.rl.length * (s.rowGap || cellSize);
      const a = s.angle || 0;
      const cs2 = Math.abs(Math.cos(a));
      const sn2 = Math.abs(Math.sin(a));
      const bw = w * cs2 + h * sn2;
      const bh = w * sn2 + h * cs2;
      const x = s.x;
      const y = s.y;
      mnX = Math.min(mnX, x);
      mnY = Math.min(mnY, y);
      mxX = Math.max(mxX, x + bw);
      mxY = Math.max(mxY, y + bh);
    }
    if (bgWidth && bgHeight && showBg) {
      mnX = Math.min(mnX, 0);
      mnY = Math.min(mnY, 0);
      mxX = Math.max(mxX, bgWidth);
      mxY = Math.max(mxY, bgHeight);
    }
    return { x: mnX, y: mnY, w: mxX - mnX, h: mxY - mnY };
  }, [sections, bgWidth, bgHeight, showBg, cellSize]);

  const padW = bbox.w + 80;
  const padH = bbox.h + 80;

  return (
    <div
      ref={containerRef}
      onClick={() => setSelectedId(null)}
      style={{
        position: "relative",
        width: "100%",
        height: "calc(100vh - 220px)",
        minHeight: 500,
        overflow: "auto",
        background: "#f0ebe2",
        border: "1px solid #e0ddd8",
        borderRadius: 3,
      }}
    >
      <div
        style={{
          position: "relative",
          width: padW * zoom,
          height: padH * zoom,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: padW,
            height: padH,
            transform: `scale(${zoom})`,
            transformOrigin: "0 0",
          }}
        >
          {bgUrl && showBg && (
            <img
              src={bgUrl}
              alt="Source drawing"
              style={{
                position: "absolute",
                left: 40 - bbox.x,
                top: 40 - bbox.y,
                width: bgWidth,
                height: bgHeight,
                opacity: bgOpacity,
                pointerEvents: "none",
                userSelect: "none",
              }}
              draggable={false}
            />
          )}
          <div
            style={{
              position: "absolute",
              left: 40 - bbox.x,
              top: 40 - bbox.y,
            }}
          >
            {sections.map((s, i) => (
              <Section2D
                key={s.id}
                section={s}
                index={i}
                activeTask={activeTask}
                viewMode={viewMode}
                gridEdit={gridEdit}
                selected={selectedId === s.id}
                onSelect={setSelectedId}
                onUpdate={(u) => updateSection(s.id, u)}
                onRemove={removeSection}
                showLabel={true}
                cellSize={cellSize}
                zoom={zoom}
                moveMode={moveMode}
              />
            ))}
          </div>
        </div>
      </div>
      <div
        className="no-print"
        style={{
          position: "absolute",
          right: 10,
          bottom: 10,
          display: "flex",
          gap: 4,
          background: "#fff",
          border: "1px solid #e0ddd8",
          borderRadius: 4,
          padding: 4,
          boxShadow: "0 1px 4px rgba(0,0,0,.08)",
        }}
      >
        <button
          onClick={(e) => { e.stopPropagation(); setZoom(Math.max(0.2, zoom - 0.15)); }}
          style={zoomBtnStyle}
        >−</button>
        <div style={{ minWidth: 36, textAlign: "center", fontFamily: "var(--b)", fontSize: 10, padding: "3px 0" }}>
          {Math.round(zoom * 100)}%
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); setZoom(Math.min(4, zoom + 0.15)); }}
          style={zoomBtnStyle}
        >+</button>
        <button
          onClick={(e) => { e.stopPropagation(); setZoom(1); }}
          style={{ ...zoomBtnStyle, fontSize: 9 }}
        >1:1</button>
      </div>
    </div>
  );
}
const zoomBtnStyle = {
  width: 22, height: 22, borderRadius: 3,
  border: "1px solid #ddd", background: "#fff",
  cursor: "pointer", fontSize: 12, fontWeight: 600,
  outline: "none",
};

/* ============================================================
   Import modal: upload + preview detected points + tune + accept
   ============================================================ */

function ImportModal({ onClose, onAccept }) {
  const [stage, setStage] = useState("upload"); // upload | outline
  const [canvas, setCanvas] = useState(null);
  const [dataUrl, setDataUrl] = useState(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(null);
  const [darkV, setDarkV] = useState(0.40);
  const [minBlob, setMinBlob] = useState(30);
  const [maxBlob, setMaxBlob] = useState(2000);
  const [points, setPoints] = useState([]);
  const [rects, setRects] = useState([]); // user-drawn axis-aligned rects
  const [draft, setDraft] = useState(null); // in-progress rect while dragging
  const [zoom, setZoom] = useState(1);
  const overlayRef = useRef(null);
  const imgRef = useRef(null);
  const surfaceRef = useRef(null);

  // After the drawing loads, fit it to the available pane width.
  useEffect(() => {
    if (stage !== "outline" || !canvas || !surfaceRef.current) return;
    const w = surfaceRef.current.clientWidth - 4;
    if (w > 0 && canvas.width > w) {
      setZoom(w / canvas.width);
    }
  }, [stage, canvas]);

  const handleFile = async (file) => {
    if (!file) return;
    setBusy(true);
    setErr(null);
    try {
      const c = await fileToCanvas(file);
      setCanvas(c);
      setDataUrl(c.toDataURL());
      setStage("outline");
      requestAnimationFrame(() => runDetect(c, darkV, minBlob, maxBlob));
    } catch (e) {
      console.error(e);
      setErr(e?.message || "Failed to load file");
    } finally {
      setBusy(false);
    }
  };

  const runDetect = (c, dv, mnB, mxB) => {
    if (!c) return;
    setBusy(true);
    setTimeout(() => {
      try {
        const pts = detectPoints(c, { darkV: dv, minBlob: mnB, maxBlob: mxB });
        setPoints(pts);
      } catch (e) {
        console.error(e);
        setErr(e?.message || "Detection failed");
      } finally {
        setBusy(false);
      }
    }, 30);
  };

  const reDetect = () => runDetect(canvas, darkV, minBlob, maxBlob);

  // Redraw overlay (points + drawn rects + draft)
  useEffect(() => {
    if (stage !== "outline" || !overlayRef.current || !canvas) return;
    const oc = overlayRef.current;
    const ctx = oc.getContext("2d");
    oc.width = canvas.width;
    oc.height = canvas.height;
    ctx.clearRect(0, 0, oc.width, oc.height);
    ctx.fillStyle = "rgba(0,160,255,.75)";
    const r = Math.max(1.5, Math.min(canvas.width, canvas.height) / 800);
    for (const p of points) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.fill();
    }
    const drawRect = (rc, color, label) => {
      const x = Math.min(rc.x1, rc.x2);
      const y = Math.min(rc.y1, rc.y2);
      const w = Math.abs(rc.x2 - rc.x1);
      const h = Math.abs(rc.y2 - rc.y1);
      ctx.lineWidth = Math.max(2, canvas.width / 1200);
      ctx.strokeStyle = color;
      ctx.fillStyle = color.replace(/[\d.]+\)$/, "0.10)");
      ctx.fillRect(x, y, w, h);
      ctx.strokeRect(x, y, w, h);
      if (label) {
        ctx.fillStyle = color;
        ctx.font = `bold ${Math.max(14, canvas.width / 100)}px sans-serif`;
        ctx.fillText(label, x + 6, y + Math.max(18, canvas.width / 90));
      }
    };
    rects.forEach((rc, i) => drawRect(rc, "rgba(232,106,16,.9)", rc.label || `N${i + 1}`));
    if (draft) drawRect(draft, "rgba(22,163,74,.9)", "");
  }, [stage, canvas, points, rects, draft]);

  const clientToImage = (e) => {
    const el = imgRef.current;
    if (!el) return null;
    const r = el.getBoundingClientRect();
    const scale = canvas.width / r.width;
    return {
      x: (e.clientX - r.left) * scale,
      y: (e.clientY - r.top) * scale,
    };
  };

  const onSurfaceDown = (e) => {
    if (!canvas) return;
    if (e.button !== 0) return;
    const p = clientToImage(e);
    if (!p) return;
    e.preventDefault();
    setDraft({ x1: p.x, y1: p.y, x2: p.x, y2: p.y });
  };
  const onSurfaceMove = (e) => {
    if (!draft) return;
    const p = clientToImage(e);
    if (!p) return;
    setDraft({ ...draft, x2: p.x, y2: p.y });
  };
  const onSurfaceUp = () => {
    if (!draft) return;
    const w = Math.abs(draft.x2 - draft.x1);
    const h = Math.abs(draft.y2 - draft.y1);
    if (w > 10 && h > 10) {
      setRects((r) => [...r, { ...draft, label: `N${r.length + 1}` }]);
    }
    setDraft(null);
  };

  const removeRect = (idx) => setRects((r) => r.filter((_, i) => i !== idx));
  const clearRects = () => setRects([]);

  const previewSections = useMemo(() => {
    if (!points.length || !rects.length) return [];
    const out = [];
    rects.forEach((rc, i) => {
      const sec = buildSectionFromRect(points, rc);
      if (sec) {
        out.push({ ...sec, label: rc.label || `N${i + 1}`, id: i + 1 });
      }
    });
    return out;
  }, [points, rects]);

  const accept = () => {
    if (!previewSections.length) return;
    onAccept({
      sections: previewSections,
      bgUrl: dataUrl,
      bgWidth: canvas.width,
      bgHeight: canvas.height,
    });
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(0,0,0,.55)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 16,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff", borderRadius: 6, padding: 14,
          width: "100%", maxWidth: 1400, height: "94vh",
          display: "flex", flexDirection: "column", gap: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <h2 style={{ fontFamily: "var(--d)", fontSize: 22, color: "#1a1a1a", letterSpacing: ".04em" }}>
            Import Drawing
          </h2>
          <span style={{ fontFamily: "var(--b)", fontSize: 11, color: "#888" }}>
            {stage === "upload"
              ? "Upload PDF or image to begin"
              : "Drag rectangles on the drawing to define each section. Every detected point inside the rectangle becomes a cell."}
          </span>
          <button
            onClick={onClose}
            style={{ marginLeft: "auto", padding: "4px 10px", border: "1px solid #ddd", background: "#fff", borderRadius: 4, cursor: "pointer", fontSize: 11 }}
          >Close</button>
        </div>

        {stage === "upload" && (
          <div
            style={{
              border: "2px dashed #ccc", borderRadius: 6, padding: 40,
              textAlign: "center", color: "#666", fontFamily: "var(--b)",
            }}
          >
            <input
              id="sm-file"
              type="file"
              accept="application/pdf,image/*"
              onChange={(e) => handleFile(e.target.files?.[0])}
              style={{ display: "none" }}
            />
            <label
              htmlFor="sm-file"
              style={{
                display: "inline-block", padding: "10px 18px",
                background: "#e86a10", color: "#fff", borderRadius: 4,
                cursor: "pointer", fontWeight: 600,
                textTransform: "uppercase", letterSpacing: ".06em",
                fontSize: 12,
              }}
            >
              Choose PDF or Image
            </label>
            <div style={{ marginTop: 12, fontSize: 11, opacity: .7 }}>
              Auto-detects every dark-outlined circular marker (any fill color).
            </div>
            {busy && <div style={{ marginTop: 12 }}>Loading…</div>}
            {err && <div style={{ marginTop: 12, color: "#c00" }}>{err}</div>}
          </div>
        )}

        {stage === "outline" && (
          <div style={{ display: "flex", gap: 12, flex: 1, minHeight: 0 }}>
            <div
              ref={surfaceRef}
              style={{
                flex: 1, overflow: "auto", border: "1px solid #e0ddd8",
                borderRadius: 3, background: "#f6f4ef", position: "relative",
                cursor: "crosshair", userSelect: "none",
              }}
              onPointerDown={onSurfaceDown}
              onPointerMove={onSurfaceMove}
              onPointerUp={onSurfaceUp}
              onPointerLeave={onSurfaceUp}
            >
              {dataUrl && canvas && (
                <div style={{ position: "relative", width: canvas.width * zoom, height: canvas.height * zoom }}>
                  <img
                    ref={imgRef}
                    src={dataUrl}
                    alt="src"
                    style={{ display: "block", width: canvas.width * zoom, height: canvas.height * zoom, pointerEvents: "none", userSelect: "none" }}
                    draggable={false}
                  />
                  <canvas
                    ref={overlayRef}
                    style={{
                      position: "absolute", left: 0, top: 0,
                      width: canvas.width * zoom, height: canvas.height * zoom,
                      pointerEvents: "none",
                    }}
                  />
                </div>
              )}
            </div>
            <div style={{ width: 280, display: "flex", flexDirection: "column", gap: 10, fontFamily: "var(--b)", fontSize: 11, overflowY: "auto" }}>
              <div style={{ background: "#f6f4ef", padding: 8, borderRadius: 4 }}>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>Detection</div>
                <div>Points found: <b>{points.length}</b></div>
                <div>Sections drawn: <b>{rects.length}</b></div>
                <div>Cells in sections: <b>{previewSections.reduce((a, s) => a + s.levels.length, 0)}</b></div>
              </div>
              <details>
                <summary style={{ cursor: "pointer", fontWeight: 600 }}>Detection settings</summary>
                <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 6 }}>
                  <Slider label="Darkness threshold (V≤)" min={0.20} max={0.70} step={0.02} value={darkV} onChange={setDarkV} />
                  <Slider label="Min blob (px)" min={5} max={300} step={1} value={minBlob} onChange={(v) => setMinBlob(Math.round(v))} />
                  <Slider label="Max blob (px)" min={200} max={5000} step={20} value={maxBlob} onChange={(v) => setMaxBlob(Math.round(v))} />
                  <button
                    onClick={reDetect}
                    disabled={busy}
                    style={{
                      padding: "6px 10px", borderRadius: 4,
                      background: "#1a1a1a", color: "#fff", border: "none",
                      cursor: busy ? "wait" : "pointer", fontWeight: 600,
                      fontSize: 10, textTransform: "uppercase", letterSpacing: ".06em",
                    }}
                  >
                    {busy ? "Working…" : "Re-detect"}
                  </button>
                </div>
              </details>
              <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                <span style={{ fontWeight: 600 }}>Zoom</span>
                <button onClick={() => setZoom((z) => Math.max(0.1, z - 0.1))} style={zoomBtnStyle}>−</button>
                <span style={{ minWidth: 36, textAlign: "center" }}>{Math.round(zoom * 100)}%</span>
                <button onClick={() => setZoom((z) => Math.min(3, z + 0.1))} style={zoomBtnStyle}>+</button>
                <button onClick={() => setZoom(1)} style={{ ...zoomBtnStyle, fontSize: 9 }}>1:1</button>
              </div>
              <div style={{ background: "#f6f4ef", padding: 8, borderRadius: 4 }}>
                <div style={{ fontWeight: 600, marginBottom: 4, display: "flex", alignItems: "center" }}>
                  Sections
                  {rects.length > 0 && (
                    <button onClick={clearRects} style={{ marginLeft: "auto", fontSize: 9, border: "1px solid #ccc", background: "#fff", padding: "2px 6px", borderRadius: 3, cursor: "pointer" }}>
                      Clear all
                    </button>
                  )}
                </div>
                {rects.length === 0 && (
                  <div style={{ fontSize: 10, color: "#888", lineHeight: 1.4 }}>
                    Drag a rectangle on the drawing to add a section. Repeat for each section in the layout.
                  </div>
                )}
                {rects.map((rc, i) => {
                  const sec = previewSections.find((s) => s.id === i + 1);
                  return (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 4, padding: "3px 0", borderBottom: "1px solid #eee" }}>
                      <input
                        value={rc.label}
                        onChange={(e) => setRects((rs) => rs.map((r, ix) => ix === i ? { ...r, label: e.target.value } : r))}
                        style={{ width: 60, padding: "1px 4px", fontSize: 10, fontFamily: "var(--d)", border: "1px solid #ddd", borderRadius: 2 }}
                      />
                      <span style={{ fontSize: 9, color: "#666" }}>
                        {sec ? `${sec.levels.length} cells · ${sec.rl.length} rows` : "—"}
                      </span>
                      <button
                        onClick={() => removeRect(i)}
                        style={{ marginLeft: "auto", width: 16, height: 16, borderRadius: 8, background: "#dc2626", color: "#fff", border: "none", cursor: "pointer", fontSize: 9, fontWeight: 700 }}
                      >✕</button>
                    </div>
                  );
                })}
              </div>
              {err && <div style={{ color: "#c00" }}>{err}</div>}
              <div style={{ flex: 1 }} />
              <div style={{ display: "flex", gap: 6 }}>
                <button
                  onClick={onClose}
                  style={{
                    flex: 1, padding: "8px 12px", borderRadius: 4,
                    background: "#fff", color: "#555", border: "1px solid #ccc",
                    cursor: "pointer", fontWeight: 600,
                  }}
                >Cancel</button>
                <button
                  onClick={accept}
                  disabled={!previewSections.length}
                  style={{
                    flex: 1, padding: "8px 12px", borderRadius: 4,
                    background: previewSections.length ? "#16a34a" : "#aaa",
                    color: "#fff", border: "none",
                    cursor: previewSections.length ? "pointer" : "not-allowed",
                    fontWeight: 700,
                    textTransform: "uppercase", letterSpacing: ".06em",
                  }}
                >Accept ({previewSections.length})</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Slider({ label, min, max, step, value, onChange }) {
  return (
    <label style={{ display: "block", fontSize: 10, color: "#444" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>{label}</span>
        <span style={{ fontFamily: "var(--d)" }}>{typeof value === "number" ? value.toFixed(value < 1 ? 2 : 0) : value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        style={{ width: "100%" }}
      />
    </label>
  );
}

/* ============================================================
   Sidebar: per-section badges/progress
   ============================================================ */

function SectionRowSummary({ section, selected, onSelect, activeTask, setActiveTask }) {
  const pcts = calcPcts(section.levels);
  return (
    <div
      onClick={() => onSelect(section.id)}
      style={{
        padding: "6px 8px",
        borderRadius: 4,
        border: selected ? "2px solid #e86a10" : "1px solid #e8e4de",
        background: selected ? "#fff7ee" : "#fff",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
        <span style={{ fontFamily: "var(--d)", fontSize: 16, color: "#1a1a1a", letterSpacing: ".04em" }}>
          {section.label}
        </span>
        <span style={{ fontFamily: "var(--d)", fontSize: 13, color: "#e86a10", marginLeft: "auto" }}>
          {(pcts._overall || 0).toFixed(1)}%
        </span>
      </div>
      <div style={{ fontSize: 9, color: "#888", fontFamily: "var(--b)" }}>
        {section.levels.length} pos · {section.rl.length} rows
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 1, marginTop: 2 }}>
        {STAGES.map((st) => {
          const Icon = ICON_MAP[st.key];
          const pct = pcts[st.key] || 0;
          const isA = activeTask === st.key;
          return (
            <div
              key={st.key}
              onClick={(e) => { e.stopPropagation(); setActiveTask(st.key); }}
              style={{
                display: "flex", alignItems: "center", gap: 4,
                padding: "1px 3px", borderLeft: `3px solid ${st.color}`,
                background: isA ? `${st.color}15` : "transparent",
                borderRadius: 2,
              }}
            >
              <Icon s={9} color={st.color} />
              <span style={{ fontSize: 8, fontFamily: "var(--d)", color: "#666", letterSpacing: ".05em", textTransform: "uppercase" }}>
                {st.label}
              </span>
              <span style={{ marginLeft: "auto", fontFamily: "var(--d)", fontSize: 9, color: pct > 0 ? "#1a1a1a" : "#bbb" }}>
                {pct.toFixed(1)}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ============================================================
   Toolbar bits
   ============================================================ */

function FilterBtn({ stage, active, onClick }) {
  const Icon = ICON_MAP[stage.key];
  const isV = active === stage.key;
  return (
    <button
      onClick={() => onClick(stage.key)}
      style={{
        display: "flex", alignItems: "center", gap: 4,
        padding: "4px 8px", borderRadius: 4,
        border: isV ? `2px solid ${stage.color}` : "1px solid #ddd",
        background: isV ? `${stage.color}0a` : "#fff",
        cursor: "pointer", outline: "none",
      }}
    >
      <div
        style={{
          width: 18, height: 18, borderRadius: 3,
          background: `${stage.color}18`,
          border: `1px solid ${stage.color}44`,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >
        <Icon s={11} color={stage.color} />
      </div>
      <span
        style={{
          fontSize: 10, fontWeight: isV ? 700 : 500,
          color: isV ? stage.color : "#555",
          fontFamily: "var(--b)", textTransform: "uppercase", letterSpacing: ".04em",
        }}
      >
        {stage.label}
      </span>
    </button>
  );
}

/* ============================================================
   Defaults (used until a drawing is imported)
   ============================================================ */

function initSouth(rl) {
  const t = rl.reduce((a, b) => a + b, 0);
  const p = Math.round(t * 0.84);
  const b = Math.round(t * 0.08);
  return Array.from({ length: t }, (_, i) => (i < p ? 2 : i < p + b ? 1 : 0));
}

function buildDefaultSections() {
  const cs = 12;
  const s1Rl = [30, 30, 30, 30, 30, 30, 24, 24, 24, 24, 24];
  const s2Rl = [24, 26, 28, 30, 30, 30, 30, 28, 26, 22];
  return [
    {
      id: 1,
      label: "PCS001",
      x: 40,
      y: 40,
      angle: 0,
      colGap: cs,
      rowGap: cs,
      rl: s1Rl,
      offsets: [0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3],
      levels: new Array(s1Rl.reduce((a, b) => a + b, 0)).fill(0),
    },
    {
      id: 2,
      label: "PCS002",
      x: 40,
      y: 40 + (s1Rl.length + 2) * cs,
      angle: 0,
      colGap: cs,
      rowGap: cs,
      rl: s2Rl,
      offsets: [3, 2, 1, 0, 0, 0, 0, 1, 2, 4],
      levels: initSouth(s2Rl),
    },
  ];
}

/* ============================================================
   Main component
   ============================================================ */

export default function SiteMap() {
  const [ready, setReady] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [activeTask, setActiveTask] = useState(null);
  const [viewMode, setViewMode] = useState("all");
  const [gridEdit, setGridEdit] = useState(false);
  const [moveMode, setMoveMode] = useState(false);
  const [importing, setImporting] = useState(false);
  const [sections, setSections] = useState(buildDefaultSections);
  const [bgUrl, setBgUrl] = useState(null);
  const [bgWidth, setBgWidth] = useState(0);
  const [bgHeight, setBgHeight] = useState(0);
  const [showBg, setShowBg] = useState(true);
  const [bgOpacity, setBgOpacity] = useState(0.35);
  const [selectedId, setSelectedId] = useState(null);
  const [zoom, setZoom] = useState(1);
  const nextId = useRef(3);

  // Load persisted state
  useEffect(() => {
    (async () => {
      try {
        const res = await window.storage?.get?.("site-map-v4");
        if (res && res.value) {
          const d = JSON.parse(res.value);
          if (d.sections && Array.isArray(d.sections)) {
            setSections(migrateSections(d.sections));
            nextId.current = d.nextId || d.sections.length + 1;
          }
          if (d.bgUrl) { setBgUrl(d.bgUrl); setBgWidth(d.bgWidth || 0); setBgHeight(d.bgHeight || 0); }
        }
      } catch (e) {
        // first load
      }
      setLoaded(true);
      setTimeout(() => setReady(true), 100);
    })();
  }, []);

  // Persist
  const saveTimer = useRef(null);
  useEffect(() => {
    if (!loaded) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async () => {
      try {
        await window.storage?.set?.(
          "site-map-v4",
          JSON.stringify({
            sections, nextId: nextId.current,
            bgUrl, bgWidth, bgHeight,
          })
        );
      } catch (e) {}
    }, 600);
  }, [sections, loaded, bgUrl, bgWidth, bgHeight]);

  const updateSection = useCallback((id, updates) => {
    setSections((prev) => prev.map((s) => (s.id === id ? { ...s, ...updates } : s)));
  }, []);

  const removeSection = useCallback((id) => {
    setSections((prev) => (prev.length <= 1 ? prev : prev.filter((s) => s.id !== id)));
  }, []);

  const addBlankSection = () => {
    const num = String(nextId.current).padStart(3, "0");
    const drl = [20, 20, 20, 20, 20, 20, 20, 20];
    const total = drl.reduce((a, b) => a + b, 0);
    const cs = 12;
    setSections((prev) => [
      ...prev,
      {
        id: nextId.current,
        label: `PCS${num}`,
        x: 60 + ((prev.length * 30) % 400),
        y: 60 + ((prev.length * 70) % 300),
        angle: 0,
        colGap: cs,
        rowGap: cs,
        rl: drl,
        offsets: drl.map(() => 0),
        levels: new Array(total).fill(0),
      },
    ]);
    nextId.current++;
  };

  const handleTask = (key) => {
    if (activeTask === key) { setActiveTask(null); setViewMode("all"); }
    else { setActiveTask(key); setViewMode(null); }
  };
  const goAll = () => { setActiveTask(null); setViewMode("all"); };
  const goView = (key) => { setActiveTask(key); setViewMode("view"); };
  const goEdit = (key) => { setActiveTask(key); setViewMode(null); };
  const exportPDF = () => window.print();

  const onImportAccept = ({ sections: secs, bgUrl: u, bgWidth: w, bgHeight: h }) => {
    // Reassign ids continuing from nextId
    const reIded = secs.map((s, i) => ({ ...s, id: nextId.current + i }));
    nextId.current = nextId.current + reIded.length;
    setSections(reIded);
    setBgUrl(u);
    setBgWidth(w);
    setBgHeight(h);
    setShowBg(true);
    setImporting(false);
    setSelectedId(reIded[0]?.id || null);
  };

  const activeStage = STAGES.find((s) => s.key === activeTask);
  const isEditing = activeTask && !viewMode;

  const allLevels = sections.flatMap((s) => s.levels);
  const totalCells = allLevels.length;
  const overall = totalCells
    ? (allLevels.reduce((a, b) => a + b, 0) / totalCells / 5) * 100
    : 0;

  return (
    <div style={{ width: "100%", minHeight: "100vh", background: "#fafafa" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600;700&display=swap');
        :root { --d: 'Bebas Neue', sans-serif; --b: 'DM Sans', sans-serif; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        button { font-family: 'DM Sans', sans-serif; }
        @media print {
          .no-print { display: none !important; }
          body, html { background: #fff !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          @page { size: landscape; margin: 8mm; }
        }
      `}</style>

      <div className="no-print" style={{ background: "#1a1a1a", padding: "6px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ color: "#e86a10", fontSize: 14 }}>⚠</span>
          <span style={{ fontSize: 11, fontWeight: 500, color: "#fff", fontFamily: "var(--b)", letterSpacing: ".06em", textTransform: "uppercase" }}>
            Field Reporting — Site Progress Tracker
          </span>
        </div>
        <span style={{ fontSize: 10, color: "#888", fontFamily: "var(--b)" }}>
          BORES → PILES → POST CAPS → TORQUE TUBE → MODULES
        </span>
      </div>

      <div className="no-print" style={{ padding: "8px 16px", display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center", borderBottom: "1px solid #e0ddd8", background: "#fff" }}>
        <button onClick={goAll} style={{ padding: "5px 14px", borderRadius: 4, border: viewMode === "all" && !activeTask ? "2px solid #e86a10" : "1px solid #ddd", background: viewMode === "all" && !activeTask ? "#e86a10" : "#fff", color: viewMode === "all" && !activeTask ? "#fff" : "#555", cursor: "pointer", fontSize: 10, fontWeight: 600, outline: "none", textTransform: "uppercase", letterSpacing: ".06em" }}>
          🗺️ All Tasks
        </button>
        <div style={{ width: 1, height: 22, background: "#e0ddd8" }} />
        {STAGES.map((st) => {
          const isV = activeTask === st.key && viewMode === "view";
          const isE = activeTask === st.key && !viewMode;
          return (
            <div key={st.key} style={{ display: "flex", gap: 1 }}>
              <FilterBtn stage={st} active={isV ? st.key : null} onClick={() => goView(st.key)} />
              <button onClick={() => goEdit(st.key)} title={`Edit ${st.label}`} style={{ padding: "4px 5px", borderRadius: "0 4px 4px 0", border: isE ? `2px solid ${st.color}` : "1px solid #ddd", borderLeft: "none", background: isE ? `${st.color}15` : "#fff", cursor: "pointer", outline: "none", fontSize: 10 }}>
                ✏️
              </button>
            </div>
          );
        })}
        <div style={{ width: 1, height: 22, background: "#e0ddd8" }} />
        <button onClick={() => setImporting(true)} style={{ padding: "5px 14px", borderRadius: 4, border: "1px solid #ddd", background: "#fff", color: "#555", cursor: "pointer", fontSize: 10, fontWeight: 600, outline: "none", textTransform: "uppercase", letterSpacing: ".06em" }}>
          📥 Import Drawing
        </button>
        <button onClick={() => setMoveMode((m) => !m)} style={{ padding: "5px 14px", borderRadius: 4, border: moveMode ? "2px solid #1a1a1a" : "1px solid #ddd", background: moveMode ? "#1a1a1a" : "#fff", color: moveMode ? "#fff" : "#555", cursor: "pointer", fontSize: 10, fontWeight: 600, outline: "none", textTransform: "uppercase", letterSpacing: ".06em" }}>
          ✥ {moveMode ? "Done Moving" : "Move"}
        </button>
        <button onClick={() => setGridEdit((g) => !g)} style={{ padding: "5px 14px", borderRadius: 4, border: gridEdit ? "2px solid #1a1a1a" : "1px solid #ddd", background: gridEdit ? "#1a1a1a" : "#fff", color: gridEdit ? "#fff" : "#555", cursor: "pointer", fontSize: 10, fontWeight: 600, outline: "none", textTransform: "uppercase", letterSpacing: ".06em" }}>
          ⊞ {gridEdit ? "Done" : "Edit Grid"}
        </button>
        <button onClick={addBlankSection} style={{ padding: "5px 14px", borderRadius: 4, border: "1px solid #ddd", background: "#fff", color: "#555", cursor: "pointer", fontSize: 10, fontWeight: 600, outline: "none", textTransform: "uppercase", letterSpacing: ".06em" }}>
          + Add Section
        </button>
        <div style={{ width: 1, height: 22, background: "#e0ddd8" }} />
        {bgUrl && (
          <label style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10, fontFamily: "var(--b)", color: "#555", textTransform: "uppercase", letterSpacing: ".06em" }}>
            <input type="checkbox" checked={showBg} onChange={(e) => setShowBg(e.target.checked)} />
            Backdrop
            <input
              type="range" min={0} max={1} step={0.05} value={bgOpacity}
              onChange={(e) => setBgOpacity(parseFloat(e.target.value))}
              style={{ width: 70 }}
            />
          </label>
        )}
        <button onClick={exportPDF} style={{ marginLeft: "auto", padding: "5px 14px", borderRadius: 4, border: "1px solid #ddd", background: "#fff", color: "#555", cursor: "pointer", fontSize: 10, fontWeight: 600, outline: "none", textTransform: "uppercase", letterSpacing: ".06em", display: "flex", alignItems: "center", gap: 5 }}>
          📄 Export PDF
        </button>
        {activeStage && (
          <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "4px 12px", borderRadius: 20, background: `${activeStage.color}10`, border: `1px solid ${activeStage.color}33` }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: activeStage.color }} />
            <span style={{ fontSize: 10, fontWeight: 600, color: activeStage.color, fontFamily: "var(--b)", textTransform: "uppercase" }}>
              {isEditing ? "Editing" : "Viewing"}: {activeStage.label}
            </span>
          </div>
        )}
      </div>

      <div style={{ padding: "12px 16px" }}>
        <div style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 11, color: "#999", fontFamily: "var(--b)", fontWeight: 500, textTransform: "uppercase", letterSpacing: ".1em" }}>
            {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }).toUpperCase()}
          </div>
          <h1 style={{ fontSize: 32, fontWeight: 400, color: "#1a1a1a", fontFamily: "var(--d)", letterSpacing: ".03em", textTransform: "uppercase", lineHeight: 1 }}>
            Site Progress Map
          </h1>
          <div style={{ height: 3, background: "linear-gradient(90deg, #e86a10, #f5a623)", borderRadius: 2, marginTop: 4, maxWidth: 400 }} />
        </div>

        <div style={{ background: "#1a1a1a", borderRadius: 6, padding: "8px 14px", display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
          <span style={{ fontSize: 14, color: "#fff", fontFamily: "var(--d)", letterSpacing: ".06em", textTransform: "uppercase" }}>
            Total Project Progress
          </span>
          <span style={{ fontSize: 26, color: "#e86a10", fontFamily: "var(--d)" }}>
            {overall.toFixed(2)}%
          </span>
          <div style={{ flex: 1, height: 5, background: "#333", borderRadius: 3, overflow: "hidden" }}>
            <div style={{ height: "100%", borderRadius: 3, width: `${overall}%`, background: "linear-gradient(90deg, #e86a10, #f5a623)", transition: "width .5s ease" }} />
          </div>
          <span style={{ fontSize: 10, color: "#888", fontFamily: "var(--b)", textTransform: "uppercase" }}>
            {sections.length} sections · {totalCells} pos
          </span>
        </div>

        <div style={{ display: "flex", gap: 10, opacity: ready ? 1 : 0, transition: "opacity .4s ease" }}>
          <div style={{ width: 200, display: "flex", flexDirection: "column", gap: 4, maxHeight: "calc(100vh - 220px)", overflowY: "auto" }}>
            {sections.map((s) => (
              <SectionRowSummary
                key={s.id}
                section={s}
                selected={selectedId === s.id}
                onSelect={setSelectedId}
                activeTask={activeTask}
                setActiveTask={handleTask}
              />
            ))}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <CanvasView
              sections={sections}
              bgUrl={bgUrl}
              bgWidth={bgWidth}
              bgHeight={bgHeight}
              showBg={showBg}
              bgOpacity={bgOpacity}
              activeTask={activeTask}
              viewMode={viewMode}
              gridEdit={gridEdit}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              updateSection={updateSection}
              removeSection={removeSection}
              cellSize={12}
              zoom={zoom}
              setZoom={setZoom}
              moveMode={moveMode}
            />
          </div>
        </div>
      </div>

      {importing && (
        <ImportModal
          onClose={() => setImporting(false)}
          onAccept={onImportAccept}
        />
      )}
    </div>
  );
}

// Migration for sections coming from older storage shapes (v3 etc.)
function migrateSections(arr) {
  const cs = 12;
  let curY = 40;
  return arr.map((s, i) => {
    const rl = s.rl || [];
    const offsets = s.offsets && s.offsets.length === rl.length ? s.offsets : rl.map(() => 0);
    const total = rl.reduce((a, b) => a + b, 0);
    const levels = s.levels && s.levels.length === total ? s.levels : new Array(total).fill(0);
    const colGap = s.colGap || cs;
    const rowGap = s.rowGap || cs;
    const x = typeof s.x === "number" ? s.x : 40;
    const y = typeof s.y === "number" ? s.y : curY;
    const angle = typeof s.angle === "number" ? s.angle : 0;
    curY = y + (rl.length + 2) * rowGap;
    return {
      id: s.id ?? i + 1,
      label: s.label || `N${i + 1}`,
      x, y, angle, colGap, rowGap, rl, offsets, levels,
    };
  });
}
