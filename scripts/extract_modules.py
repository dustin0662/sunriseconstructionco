#!/usr/bin/env python3
"""Extract PV module rectangles from the Midway DC-allocation stringing plans.

The four E120-E123 sheets are panned regional views of the same site (no
shared coordinate frame), so modules are extracted per-sheet in that
sheet's PDF page coordinates and tagged with the sheet id. The viewer
positions each sheet as an independently-alignable layer.

Output: data/modules.json
  {
    meta: { sheets: [{id, count, bounds:{minX,maxX,minY,maxY}}], total },
    modules: [ {sheet, cx, cy, w, h}, ... ]   # PDF points, y-down
  }
"""
import json, os, sys
import pymupdf

BASE = os.environ.get("STRINGING_DIR",
    "/root/.claude/uploads/672f189e-e548-4841-817f-4b1e5c3446d8")
SHEETS = [
    ("E120", "e9b19daf-E120STRINGINGPLANSDCALLOCATION1Rev.1"),
    ("E121", "fcd95741-E121STRINGINGPLANSDCALLOCATION2Rev.1"),
    ("E122", "30548685-E122STRINGINGPLANSDCALLOCATION3Rev.1"),
    ("E123", "c6080523-E123STRINGINGPLANSDCALLOCATION4Rev.1"),
]
OUT = os.path.join(os.path.dirname(__file__), "..", "data", "modules.json")


def is_module_cell(d):
    """A module cell: cyan stroke ~(0,0.65,0.87), ~12.8x5.9 pt box."""
    c = d.get("color")
    if not c or len(c) != 3:
        return False
    if not (abs(c[0]) < 0.12 and 0.5 < c[1] < 0.8 and c[2] > 0.78):
        return False
    bb = d["rect"]
    w, h = bb.width, bb.height
    # accept either orientation just in case
    if (11 < w < 14 and 5 < h < 7) or (5 < w < 7 and 11 < h < 14):
        return True
    return False


def main():
    sheets_meta = []
    modules = []          # flat [sheetIndex, cx, cy] triples kept compact
    for sidx, (sid, fname) in enumerate(SHEETS):
        path = os.path.join(BASE, fname + ".pdf")
        if not os.path.exists(path):
            print(f"missing {path}", file=sys.stderr)
            continue
        doc = pymupdf.open(path)
        page = doc[0]
        ds = page.get_drawings()
        cells = []
        ws, hs = [], []
        for d in ds:
            if is_module_cell(d):
                bb = d["rect"]
                cells.append((round(bb.x0 + bb.width / 2, 1),
                              round(bb.y0 + bb.height / 2, 1)))
                ws.append(bb.width); hs.append(bb.height)
        cells.sort()
        deduped = []
        seen = set()
        for cx, cy in cells:
            key = (round(cx * 2) / 2, round(cy * 2) / 2)
            if key in seen:
                continue
            seen.add(key)
            deduped.append((cx, cy))
        xs = [c[0] for c in deduped]
        ys = [c[1] for c in deduped]
        bounds = {
            "minX": min(xs), "maxX": max(xs),
            "minY": min(ys), "maxY": max(ys),
        } if deduped else None
        med_w = round(sorted(ws)[len(ws)//2], 2) if ws else 12.8
        med_h = round(sorted(hs)[len(hs)//2], 2) if hs else 5.9
        sheets_meta.append({"id": sid, "count": len(deduped), "bounds": bounds,
                            "w": med_w, "h": med_h})
        for cx, cy in deduped:
            modules.append([sidx, cx, cy])
        print(f"{sid}: {len(deduped)} modules (cell {med_w}x{med_h})")

    out = {"meta": {"sheets": sheets_meta, "total": len(modules),
                    "project": "Midway", "source": "E120-E123 stringing plans"},
           "modules": modules}
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, "w") as f:
        json.dump(out, f, separators=(",", ":"))
    print(f"wrote {OUT}: {len(modules)} modules across {len(sheets_meta)} sheets "
          f"({os.path.getsize(OUT)//1024} KB)")


if __name__ == "__main__":
    main()
