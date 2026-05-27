#!/usr/bin/env python3
"""Extract pile positions from the Midway foundation cover sheet PDF.

Outputs data/piles.json with one entry per detected pile: serial #, group,
PDF (x, y) center in points, post type, color label.
"""
import json, math, sys, os
from collections import Counter, defaultdict
import pymupdf

PDF_PATH = os.environ.get('PILE_PDF', os.path.join(os.path.dirname(__file__), '..', 'data', 'midway_cover.pdf'))
OUT_PATH = os.path.join(os.path.dirname(__file__), '..', 'data', 'piles.json')

LEGEND = [
    # (color name, post type, embedment, shape, length, fill_rgb_refs, hex)
    ('YELLOW/RED',   'INT DR TYP 2',              8.0, 'W6X10.5', 187, [(1,1,0),(1,0,0)],         '#FFD400'),
    ('BLUE',         'EDGE RE TYP 2',             8.0, 'W6X16',   195, [(0,0,1)],                  '#1E66F5'),
    ('PINK',         'INT ND TYP 2',              7.0, 'W6X10.4', 183, [(1,0.5,0.87)],             '#FF7FBF'),
    ('GREEN',        'INT MS TYP 2',              7.5, 'W6X12',   189, [(0,1,0)],                  '#22C55E'),
    ('PURPLE',       'EXT ND TYP 2/EXT MS TYP 2', 8.0, 'W6X20',   195, [(0.75,0,1)],               '#A855F7'),
    ('ORANGE',       'EDGE RE TYP 1',             7.5, 'W6X12',   165, [(1,0.65,0)],               '#F97316'),
    ('WHITE',        'EXT ND TYP 1/EXT MS TYP 1', 8.0, 'W6X16',   171, [],                         '#F5F5F5'),
    ('BLACK',        'EXT DR TYP 1',              8.0, 'W6X16',   163, [(0,0,0)],                  '#111111'),
    ('GREY',         'INT MS TYP 1',              7.0, 'W6X9',    159, [(0.5,0.5,0.5)],            '#8A8A8A'),
    ('RED',          'INT ND TYP 1',              8.0, 'W6X8.5',  163, [(1,0,0)],                  '#DC2626'),
    ('YELLOW',       'INT ND TYP 1',              6.5, 'W6X7',    153, [(1,1,0)],                  '#EAB308'),
    ('YELLOW/GREEN', 'EXT DR TYP 2',              8.0, 'W6X20',   187, [(1,1,0),(0,1,0)],          '#84CC16'),
]
LEGEND_BY_NAME = {row[0]: row for row in LEGEND}


def color_dist(a, b):
    return (a[0]-b[0])**2 + (a[1]-b[1])**2 + (a[2]-b[2])**2


def build_spatial_index(items, cell=4):
    idx = defaultdict(list)
    for it in items:
        idx[(int(it[0]/cell), int(it[1]/cell))].append(it)
    return idx


def near_in(idx, cx, cy, r, cell=4):
    bx, by = int(cx/cell), int(cy/cell)
    out = []
    rr = r * r
    for dx in (-1, 0, 1):
        for dy in (-1, 0, 1):
            for it in idx[(bx+dx, by+dy)]:
                if (it[0]-cx)**2 + (it[1]-cy)**2 <= rr:
                    out.append(it)
    return out


def classify_pile(cx, cy, fill_idx, black_idx):
    near_fills = near_in(fill_idx, cx, cy, 3.5)
    near_black = near_in(black_idx, cx, cy, 3.5)
    cc = Counter()
    for it in near_fills:
        cc[tuple(round(c, 2) for c in it[2])] += 1
    if not cc:
        return 'BLACK' if len(near_black) > 5 else 'WHITE'
    top = cc.most_common(3)
    if len(top) >= 2 and top[1][1] >= top[0][1] * 0.45:
        c1, c2 = top[0][0], top[1][0]
        for name, _, _, _, _, refs, _ in LEGEND:
            if len(refs) == 2:
                if (color_dist(c1, refs[0]) < 0.1 and color_dist(c2, refs[1]) < 0.1) or \
                   (color_dist(c1, refs[1]) < 0.1 and color_dist(c2, refs[0]) < 0.1):
                    return name
    c1 = top[0][0]
    best, bd = None, 99
    for name, _, _, _, _, refs, _ in LEGEND:
        if len(refs) != 1:
            continue
        d = color_dist(c1, refs[0])
        if d < bd:
            bd, best = d, name
    return best


def main():
    if not os.path.exists(PDF_PATH):
        print(f'PDF not found: {PDF_PATH}', file=sys.stderr)
        sys.exit(1)
    doc = pymupdf.open(PDF_PATH)
    page = doc[0]
    ds = page.get_drawings()

    outers = []
    for d in ds:
        bb = d['rect']
        w, h = bb.width, bb.height
        if 7.0 < w < 7.2 and 7.0 < h < 7.2 and d['type'] == 's' and len(d['items']) == 4:
            outers.append((bb.x0 + w/2, bb.y0 + h/2))

    fills, black_fills = [], []
    for d in ds:
        if d['type'] not in ('fs', 'f', 'sf'):
            continue
        bb = d['rect']
        if bb.width > 10 or bb.height > 10:
            continue
        f = d.get('fill')
        if not f:
            continue
        if f == (1.0, 1.0, 1.0):
            continue
        cx, cy = bb.x0 + bb.width/2, bb.y0 + bb.height/2
        if f == (0.0, 0.0, 0.0):
            black_fills.append((cx, cy, f))
        else:
            fills.append((cx, cy, f))

    fill_idx = build_spatial_index(fills)
    black_idx = build_spatial_index(black_fills)

    # Group labels (N1..N9)
    labels = []
    for block in page.get_text('dict')['blocks']:
        for line in block.get('lines', []):
            for span in line.get('spans', []):
                t = span.get('text', '').strip()
                if t in {'N1','N2','N3','N4','N5','N6','N7','N7-A','N7-B','N8','N9'}:
                    bb = span['bbox']
                    labels.append((t, (bb[0]+bb[2])/2, (bb[1]+bb[3])/2))

    def nearest_group(x, y):
        best, bd = None, math.inf
        for name, lx, ly in labels:
            d = (x-lx)**2 + (y-ly)**2
            if d < bd:
                bd, best = d, name
        return best

    piles = []
    # Sort piles by group first, then row, then column for stable serial numbers
    raw = [(cx, cy, classify_pile(cx, cy, fill_idx, black_idx), nearest_group(cx, cy)) for cx, cy in outers]
    # Order: group, then y (top to bottom), then x (left to right)
    group_order = ['N1','N2','N3','N4','N5','N6','N7-A','N7-B','N8','N9']
    raw.sort(key=lambda r: (group_order.index(r[3]) if r[3] in group_order else 99, round(r[1], 0), r[0]))

    for i, (cx, cy, color, group) in enumerate(raw, 1):
        legend = LEGEND_BY_NAME.get(color)
        if legend:
            _, post_type, embedment, shape, length, _, hex_color = legend
        else:
            post_type, embedment, shape, length, hex_color = 'UNKNOWN', None, None, None, '#888'
        serial = f'P-{i:04d}'
        piles.append({
            'serial': serial,
            'group': group,
            'cx': round(cx, 3),
            'cy': round(cy, 3),
            'color': color,
            'hex': hex_color,
            'postType': post_type,
            'embedment': embedment,
            'shape': shape,
            'length': length,
        })

    # Bbox
    xs = [p['cx'] for p in piles]
    ys = [p['cy'] for p in piles]
    meta = {
        'count': len(piles),
        'pdfBounds': {
            'minX': min(xs), 'maxX': max(xs),
            'minY': min(ys), 'maxY': max(ys),
        },
        'colorCounts': dict(Counter(p['color'] for p in piles)),
        'groupCounts': dict(Counter(p['group'] for p in piles)),
        'legend': [
            {
                'color': name, 'postType': pt, 'embedment': e, 'shape': sh, 'length': L,
                'hex': hex_c,
            }
            for (name, pt, e, sh, L, _, hex_c) in LEGEND
        ],
        'project': 'Midway',
        'sheet': 'TT24-10195 Cover Sheet Rev.D',
    }

    os.makedirs(os.path.dirname(OUT_PATH), exist_ok=True)
    with open(OUT_PATH, 'w') as f:
        json.dump({'meta': meta, 'piles': piles}, f, separators=(',', ':'))
    print(f'wrote {OUT_PATH}: {len(piles)} piles')
    print('color counts:', meta['colorCounts'])
    print('group counts:', meta['groupCounts'])


if __name__ == '__main__':
    main()
