#!/usr/bin/env python3
"""Trace PV modules from the CAD overlay JPEGs into a labeled row/module/group
structure shared by the model and the drawings data-entry tool.

Output: data/cad_rows.json
  {
    meta: { total, target, rowCount, groups:[{id,label,color}] },
    overlays: [{icon, w, h}],
    rows: [ {id, label, group, ov, cellU, cellV,
             modules:[ {id, n, u, v}, ... ]} ]
  }
"""
import json, os, sys
from PIL import Image
import numpy as np
from scipy import ndimage

KMZ_JSON = os.path.join(os.path.dirname(__file__), "..", "data", "kmz_reference.json")
OUT = os.path.join(os.path.dirname(__file__), "..", "data", "cad_rows.json")

MIN_COVER = 0.5
MIN_COMPONENT_PX = 800
TARGET = int(os.environ.get("MODULE_TARGET", "17700"))   # drawings System Summary
GROUP_COLORS = ["#38bdf8", "#22c55e", "#f59e0b", "#a855f7", "#ef4444",
                "#ec4899", "#14b8a6", "#eab308", "#6366f1", "#f97316"]


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


def group_labels(mask):
    """Big array blocks (groups) via dilation+labeling. Returns label image."""
    dil = ndimage.binary_dilation(mask, structure=np.ones((9, 9)), iterations=2)
    lab, nl = ndimage.label(dil)
    sizes = ndimage.sum(np.ones_like(lab), lab, range(1, nl + 1)) if nl else []
    # keep big blocks, renumber 1..K
    keep_ids = [i for i, s in enumerate(sizes, 1) if s >= 5000]
    remap = {old: new for new, old in enumerate(keep_ids, 1)}
    out = np.zeros_like(lab)
    for old, new in remap.items():
        out[lab == old] = new
    out[~mask] = 0  # only label actual array pixels
    return out, len(keep_ids)


def detect_row_pitch(mask):
    prof = mask.mean(axis=0).astype(np.float32); prof -= prof.mean()
    ac = np.correlate(prof, prof, "full")[len(prof)-1:]
    best, bestv = 13, -1
    for i in range(6, 30):
        if ac[i] > ac[i-1] and ac[i] > ac[i+1] and ac[i] > bestv:
            bestv, best = ac[i], i
    return best


def detect_phase(mask, ph):
    colcov = mask.mean(axis=0); W = mask.shape[1]
    best_off, best_score = 0, -1
    for off in range(ph):
        score = float(colcov[off::ph].sum())
        if score > best_score:
            best_score, best_off = score, off
    return best_off


def num_to_label(n):
    """0->A, 25->Z, 26->AA ..."""
    s = ""
    n += 1
    while n > 0:
        n, r = divmod(n - 1, 26)
        s = chr(65 + r) + s
    return s


def main():
    kmz = json.load(open(KMZ_JSON))
    overlays_meta = []
    all_rows = []          # tuples to sort/label later
    gid_counter = 0
    groups = []            # {id,label,color}

    for ov_i, ov in enumerate(kmz.get("overlays", [])):
        path = os.path.join(os.path.dirname(__file__), "..", "data", "kmz", ov["icon"])
        if not os.path.exists(path):
            continue
        im = Image.open(path); W, H = im.size
        overlays_meta.append({"icon": ov["icon"], "w": W, "h": H})
        mask = array_mask(im)
        glab, ng = group_labels(mask)
        # register groups for this overlay
        group_id_map = {}
        for k in range(1, ng + 1):
            gid_counter += 1
            gid = f"G{gid_counter}"
            groups.append({"id": gid, "label": gid,
                           "color": GROUP_COLORS[(gid_counter - 1) % len(GROUP_COLORS)]})
            group_id_map[k] = gid
        ph = detect_row_pitch(mask)
        off = detect_phase(mask, ph)
        half = max(1, int(round(ph * 0.35)))
        # vertical pitch chosen later globally; first collect raw runs per row col
        # We'll just store row columns + their masked y-extent; subdivide in pass 2.
        for x in range(off, W, ph):
            x0 = max(0, x - half); x1 = min(W, x + half + 1)
            band = mask[:, x0:x1].mean(axis=1)
            ys = np.where(band >= MIN_COVER)[0]
            if ys.size < 3:
                continue
            # group = majority group label along this column
            gcol = glab[ys, x] if x < glab.shape[1] else []
            gcol = gcol[gcol > 0]
            grp = group_id_map.get(int(np.bincount(gcol).argmax()), None) if gcol.size else None
            all_rows.append({"ov": ov_i, "x": x, "ys": ys, "band": band,
                             "ph": ph, "W": W, "H": H, "group": grp})

    all_rows.sort(key=lambda r: (r["ov"], r["x"]))

    def build(pv):
        pve = max(1, int(round(pv)))
        out = []
        for r in all_rows:
            ys = r["ys"]; y0, y1 = int(ys.min()), int(ys.max())
            band = r["band"]; W = r["W"]; H = r["H"]; ph = r["ph"]
            mods = []
            steps = int((y1 - y0) / pv) + 1
            for si in range(steps):
                yy = int(round(y0 + si * pv))
                blk = band[yy:yy+pve]
                if blk.size:
                    cov = float(blk.mean())
                    if cov >= MIN_COVER:
                        mods.append({"u": round((r["x"] + 0.5)/W, 4),
                                     "v": round((yy + pv/2)/H, 4), "cov": cov})
            if mods:
                out.append({"ov": r["ov"], "group": r["group"], "W": W, "H": H,
                            "ph": ph, "mods": mods})
        return out

    # Calibrate vertical pitch on the REAL emitted module count (>= target so
    # the trim step can bring it to exactly target).
    lo, hi = 1.5, 24.0
    for _ in range(26):
        mid = (lo + hi) / 2
        tot = sum(len(r["mods"]) for r in build(mid))
        if tot > TARGET:
            lo = mid
        else:
            hi = mid
    pv = lo
    built = build(pv)

    # Trim to exactly TARGET by dropping lowest-coverage modules globally.
    flat = [(ri, mi, m["cov"]) for ri, row in enumerate(built) for mi, m in enumerate(row["mods"])]
    if len(flat) > TARGET:
        flat.sort(key=lambda t: t[2], reverse=True)
        keep = set((ri, mi) for ri, mi, _ in flat[:TARGET])
        for ri, row in enumerate(built):
            row["mods"] = [m for mi, m in enumerate(row["mods"]) if (ri, mi) in keep]
        built = [r for r in built if r["mods"]]

    # Emit labeled rows.
    rows_out = []
    total = 0
    for ri, row in enumerate(built):
        label = num_to_label(ri)
        ph = row["ph"]; W = row["W"]; H = row["H"]
        modules = []
        for n, m in enumerate(sorted(row["mods"], key=lambda m: m["v"]), 1):
            modules.append({"id": f"{label}-{n:03d}", "n": n, "u": m["u"], "v": m["v"]})
        rows_out.append({
            "id": label, "label": label, "group": row["group"], "ov": row["ov"],
            "cellU": round(ph * 0.7 / W, 5), "cellV": round(pv * 0.92 / H, 5),
            "modules": modules,
        })
        total += len(modules)

    out = {
        "meta": {"total": total, "target": TARGET, "rowCount": len(rows_out),
                 "groups": groups, "vPitchPx": round(pv, 3)},
        "overlays": overlays_meta,
        "rows": rows_out,
    }
    json.dump(out, open(OUT, "w"), separators=(",", ":"))
    print(f"wrote {OUT}: {total} modules, {len(rows_out)} rows, {len(groups)} groups "
          f"({os.path.getsize(OUT)//1024} KB)")


if __name__ == "__main__":
    main()
