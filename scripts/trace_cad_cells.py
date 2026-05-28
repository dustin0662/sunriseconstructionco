#!/usr/bin/env python3
"""Auto-trace PV cells from the georeferenced CAD overlay JPEGs.

Detects the blue array regions in each KMZ CAD overlay and tiles them with
a grid of cells, emitting normalized (u, v) image coordinates. The viewer
parents these cells to the CAD overlay group, so they stay aligned with
whatever fit the user applies to the CAD image.

Output: data/cad_cells.json
  { meta:{...}, overlays:[ {icon, cellU, cellV, cells:[[u,v],...]} ] }
"""
import json, os, sys
from PIL import Image
import numpy as np

KMZ_FILES = os.path.join(os.path.dirname(__file__), "..", "data", "kmz", "files")
KMZ_JSON = os.path.join(os.path.dirname(__file__), "..", "data", "kmz_reference.json")
OUT = os.path.join(os.path.dirname(__file__), "..", "data", "cad_cells.json")

# Approx grid pitch in pixels (square cells). Tuned for ~few-thousand cells.
PITCH = float(os.environ.get("CELL_PITCH", "13"))
# Min fraction of array-mask coverage in a cell to keep it.
MIN_COVER = 0.45


def array_mask(im):
    a = np.asarray(im.convert("RGB")).astype(np.int16)
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    mask = (b > r + 18) & (b > 60) & (g > r - 10)
    mask &= ~((g > b + 25) & (g > r + 25))  # drop green stringing lines
    return mask


def main():
    if not os.path.exists(KMZ_JSON):
        print("kmz_reference.json missing", file=sys.stderr); sys.exit(1)
    kmz = json.load(open(KMZ_JSON))
    overlays_out = []
    total = 0
    for ov in kmz.get("overlays", []):
        icon = ov["icon"]
        path = os.path.join(os.path.dirname(__file__), "..", "data", "kmz", icon)
        if not os.path.exists(path):
            print("missing image", path, file=sys.stderr); continue
        im = Image.open(path)
        W, H = im.size
        mask = array_mask(im)
        p = int(round(PITCH))
        cells = []
        for y in range(0, H - p, p):
            for x in range(0, W - p, p):
                block = mask[y:y+p, x:x+p]
                if block.mean() >= MIN_COVER:
                    # normalized center
                    u = (x + p/2) / W
                    v = (y + p/2) / H
                    cells.append([round(u, 4), round(v, 4)])
        overlays_out.append({
            "icon": icon,
            "cellU": round(p / W, 5),
            "cellV": round(p / H, 5),
            "cells": cells,
        })
        total += len(cells)
        print(f"{icon}: {len(cells)} cells  (image {W}x{H}, pitch {p}px)")
    out = {"meta": {"pitchPx": PITCH, "minCover": MIN_COVER, "total": total},
           "overlays": overlays_out}
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    json.dump(out, open(OUT, "w"), separators=(",", ":"))
    print(f"wrote {OUT}: {total} cells ({os.path.getsize(OUT)//1024} KB)")


if __name__ == "__main__":
    main()
