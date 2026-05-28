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


def count_cells(mask, p, W, H, emit=False):
    """Count (or emit) grid cells. When emit, returns [[u,v,coverage],...]."""
    cells = []
    n = 0
    rows = int((H - p) / p)
    cols = int((W - p) / p)
    pe = max(1, int(round(p)))
    for ry in range(rows):
        y = int(round(ry * p))
        row = mask[y:y+pe]
        for cx in range(cols):
            x = int(round(cx * p))
            block = row[:, x:x+pe]
            if block.size:
                cov = block.mean()
                if cov >= MIN_COVER:
                    n += 1
                    if emit:
                        cells.append([round((x + p/2)/W, 4), round((y + p/2)/H, 4), float(cov)])
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
        masks.append((ov["icon"], im.size, array_mask(im)))

    # Binary-search a single global pitch so total cells ~= target.
    def total_at(p):
        return sum(count_cells(m, p, W, H) for (_, (W, H), m) in masks)

    # Calibrate so the grid produces at least `target` cells, then trim the
    # lowest-coverage (fuzzy edge) cells down to exactly `target`.
    lo, hi = 2.5, 20.0
    for _ in range(30):
        mid = (lo + hi) / 2
        if total_at(mid) > target:   # too many -> bigger pitch
            lo = mid
        else:
            hi = mid
    pitch = lo  # slightly denser side, guarantees >= target before trimming

    # Emit candidates with coverage, per overlay.
    raw = []
    for icon, (W, H), m in masks:
        for u, v, cov in count_cells(m, pitch, W, H, emit=True):
            raw.append((icon, W, H, u, v, cov))
    print(f"calibrated pitch: {pitch:.3f}px -> {len(raw)} candidate cells")

    # Trim to exactly target by dropping the lowest-coverage cells.
    if len(raw) > target:
        raw.sort(key=lambda c: c[5], reverse=True)
        raw = raw[:target]

    by_icon = {}
    for icon, W, H, u, v, cov in raw:
        by_icon.setdefault(icon, {"W": W, "H": H, "cells": []})["cells"].append([u, v])

    overlays_out = []
    total = 0
    for icon, (W, H), m in masks:
        d = by_icon.get(icon, {"cells": []})
        overlays_out.append({
            "icon": icon,
            "cellU": round(pitch / W, 5),
            "cellV": round(pitch / H, 5),
            "cells": d["cells"],
        })
        total += len(d["cells"])
        print(f"{icon}: {len(d['cells'])} cells")

    out = {"meta": {"pitchPx": round(pitch, 3), "target": target, "total": total},
           "overlays": overlays_out}
    json.dump(out, open(OUT, "w"), separators=(",", ":"))
    print(f"wrote {OUT}: {total} cells (target {target}, {os.path.getsize(OUT)//1024} KB)")


if __name__ == "__main__":
    main()
