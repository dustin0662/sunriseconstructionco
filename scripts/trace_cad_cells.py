#!/usr/bin/env python3
"""Auto-trace PV cells from the georeferenced CAD overlay JPEGs.

Detects the blue array regions, cleans noise (morphological opening + drop
small components so stray tree/edge pixels don't become cells), then lays a
uniform grid whose pitch is auto-calibrated so the TOTAL cell count matches
the drawing module quantity. Cells are emitted as normalized (u,v) image
coordinates; the viewer parents them to the CAD overlay so they track the fit.

Output: data/cad_cells.json
"""
import json, os, sys
from PIL import Image
import numpy as np
from scipy import ndimage

KMZ_JSON = os.path.join(os.path.dirname(__file__), "..", "data", "kmz_reference.json")
MODULES_JSON = os.path.join(os.path.dirname(__file__), "..", "data", "modules.json")
OUT = os.path.join(os.path.dirname(__file__), "..", "data", "cad_cells.json")

MIN_COVER = 0.5
MIN_COMPONENT_PX = 800       # drop array blobs smaller than this (noise)
# Per the stringing-plan System Summary: 708 strings x 25 modules = 17,700.
DEFAULT_TARGET = 17700


def array_mask(im):
    a = np.asarray(im.convert("RGB")).astype(np.int16)
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    m = (b > r + 18) & (b > 60) & (g > r - 10)
    m &= ~((g > b + 25) & (g > r + 25))
    m = ndimage.binary_opening(m, structure=np.ones((3, 3)), iterations=1)
    lab, nl = ndimage.label(m)
    if nl:
        sizes = ndimage.sum(np.ones_like(lab), lab, range(1, nl + 1))
        keep = np.zeros_like(m)
        for i, s in enumerate(sizes, 1):
            if s >= MIN_COMPONENT_PX:
                keep |= (lab == i)
        m = keep
    return m


def detect_row_pitch(mask):
    """Dominant horizontal period of the tracker rows, in px."""
    prof = mask.mean(axis=0).astype(np.float32)
    prof = prof - prof.mean()
    ac = np.correlate(prof, prof, "full")[len(prof)-1:]
    best, bestv = 13, -1
    for i in range(6, 30):
        if ac[i] > ac[i-1] and ac[i] > ac[i+1] and ac[i] > bestv:
            bestv, best = ac[i], i
    return best


def detect_phase(mask, ph):
    """Column offset (0..ph-1) whose row-centers cover the most array."""
    colcov = mask.mean(axis=0)
    W = mask.shape[1]
    best_off, best_score = 0, -1
    for off in range(ph):
        xs = range(off, W, ph)
        score = sum(colcov[x] for x in xs)
        if score > best_score:
            best_score, best_off = score, off
    return best_off


def gen_cells(mask, W, H, ph, pv, emit=False):
    """Place cells only along detected tracker rows (preserving row gaps).
    One column of cells per row (pitch ph), packed vertically at pitch pv."""
    half = max(1, int(round(ph * 0.35)))
    pve = max(1, int(round(pv)))
    off = detect_phase(mask, ph)
    cells = []
    n = 0
    rows = int(H / pv)
    for x in range(off, W, ph):
        x0 = max(0, x - half); x1 = min(W, x + half + 1)
        band = mask[:, x0:x1].mean(axis=1)   # vertical coverage of this row
        for ry in range(rows):
            y = int(round(ry * pv))
            blk = band[y:y+pve]
            if blk.size:
                cov = float(blk.mean())
                if cov >= MIN_COVER:
                    n += 1
                    if emit:
                        cells.append([round((x + 0.5)/W, 4), round((y + pv/2)/H, 4), cov])
    return (cells if emit else n)


def main():
    kmz = json.load(open(KMZ_JSON))
    # The drawings' System Summary is the source of truth: 17,700 modules.
    target = int(os.environ.get("MODULE_TARGET", DEFAULT_TARGET))
    print(f"drawing module total (target): {target}")

    masks = []
    for ov in kmz.get("overlays", []):
        path = os.path.join(os.path.dirname(__file__), "..", "data", "kmz", ov["icon"])
        if not os.path.exists(path):
            continue
        im = Image.open(path)
        m = array_mask(im)
        ph = detect_row_pitch(m)
        masks.append((ov["icon"], im.size, m, ph))
        print(f"{ov['icon']}: row pitch {ph}px")

    # Calibrate the vertical (along-row) pitch so total cells >= target,
    # placing cells only along detected rows; then trim to exactly target.
    def total_at(pv):
        return sum(gen_cells(m, W, H, ph, pv) for (_, (W, H), m, ph) in masks)

    lo, hi = 2.0, 24.0
    for _ in range(30):
        mid = (lo + hi) / 2
        if total_at(mid) > target:   # too many -> bigger vertical pitch
            lo = mid
        else:
            hi = mid
    pv = lo

    raw = []
    for icon, (W, H), m, ph in masks:
        for u, v, cov in gen_cells(m, W, H, ph, pv, emit=True):
            raw.append((icon, W, H, ph, u, v, cov))
    print(f"calibrated vertical pitch: {pv:.3f}px -> {len(raw)} candidate cells")

    if len(raw) > target:
        raw.sort(key=lambda c: c[6], reverse=True)
        raw = raw[:target]

    by_icon = {}
    for icon, W, H, ph, u, v, cov in raw:
        by_icon.setdefault(icon, {"W": W, "H": H, "ph": ph, "cells": []})["cells"].append([u, v])

    overlays_out = []
    total = 0
    for icon, (W, H), m, ph in masks:
        d = by_icon.get(icon, {"cells": [], "ph": ph})
        overlays_out.append({
            "icon": icon,
            # cell sized to the row: ~70% of row pitch wide, vertical pitch tall
            "cellU": round(ph * 0.7 / W, 5),
            "cellV": round(pv * 0.92 / H, 5),
            "cells": d["cells"],
        })
        total += len(d["cells"])
        print(f"{icon}: {len(d['cells'])} cells")

    out = {"meta": {"rowPitchPx": masks[0][3] if masks else 0, "vPitchPx": round(pv, 3),
                    "target": target, "total": total},
           "overlays": overlays_out}
    json.dump(out, open(OUT, "w"), separators=(",", ":"))
    print(f"wrote {OUT}: {total} cells (target {target}, {os.path.getsize(OUT)//1024} KB)")


if __name__ == "__main__":
    main()
