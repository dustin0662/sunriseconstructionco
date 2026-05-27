#!/usr/bin/env python3
"""Extract georeferenced data from the Midway GIS KMZ.

Pulls the CAD Image Overlay lat/lon bounding boxes (the ground truth
extent of the array layout), the 7 boring locations, and the tax parcel
polygon. Copies overlay JPEGs into data/kmz/ so the viewer can drape
them on the terrain.
"""
import json, os, shutil, zipfile, sys
import xml.etree.ElementTree as ET

KMZ = os.environ.get('KMZ', os.path.join(os.path.dirname(__file__), '..', 'data', 'midway_gis.kmz'))
OUT_DIR = os.path.join(os.path.dirname(__file__), '..', 'data')
OUT_KMZ_DIR = os.path.join(OUT_DIR, 'kmz')
OUT_JSON = os.path.join(OUT_DIR, 'kmz_reference.json')

NS = {'k': 'http://www.opengis.net/kml/2.2', 'gx': 'http://www.google.com/kml/ext/2.2'}


def main():
    if not os.path.exists(KMZ):
        print(f'KMZ not found: {KMZ}', file=sys.stderr)
        sys.exit(1)

    os.makedirs(OUT_KMZ_DIR, exist_ok=True)
    with zipfile.ZipFile(KMZ, 'r') as z:
        z.extractall(OUT_KMZ_DIR)

    kml_path = os.path.join(OUT_KMZ_DIR, 'doc.kml')
    tree = ET.parse(kml_path)
    root = tree.getroot()
    doc = root.find('k:Document', NS)

    def find_folder(el, name):
        for f in el.findall('.//k:Folder', NS):
            n = f.find('k:name', NS)
            if n is not None and n.text == name:
                return f
        return None

    overlays = []
    ov_folder = find_folder(doc, 'Image Overlays')
    if ov_folder is not None:
        for ov in ov_folder.findall('.//k:GroundOverlay', NS):
            name = ov.find('k:name', NS)
            icon = ov.find('.//k:href', NS)
            llb = ov.find('k:LatLonBox', NS)
            entry = {
                'name': name.text if name is not None else '',
                'icon': icon.text if icon is not None else '',
            }
            if llb is not None:
                for tag in ('north', 'south', 'east', 'west', 'rotation'):
                    t = llb.find(f'k:{tag}', NS)
                    if t is not None and t.text is not None:
                        entry[tag] = float(t.text)
                # rotation may be absent — default 0
                if 'rotation' not in entry:
                    entry['rotation'] = 0.0
            overlays.append(entry)

    borings = []
    bor_folder = find_folder(doc, 'Borings')
    if bor_folder is not None:
        for pm in bor_folder.findall('k:Placemark', NS):
            n = pm.find('k:name', NS)
            coords = pm.find('.//k:coordinates', NS)
            if coords is None or coords.text is None:
                continue
            ll = coords.text.strip().split(',')
            borings.append({
                'name': n.text if n is not None else '',
                'lon': float(ll[0]),
                'lat': float(ll[1]),
                'alt': float(ll[2]) if len(ll) > 2 else 0.0,
            })

    parcel = None
    parc_folder = find_folder(doc, 'Tax Parcel')
    if parc_folder is not None:
        pm = parc_folder.find('k:Placemark', NS)
        if pm is not None:
            coords = pm.find('.//k:coordinates', NS)
            if coords is not None and coords.text is not None:
                pts = []
                for c in coords.text.strip().split():
                    parts = c.split(',')
                    if len(parts) >= 2:
                        pts.append([float(parts[0]), float(parts[1])])
                parcel = {'coordinates': pts}

    # Combined overlay bbox (used as the geographic frame for the layout)
    if overlays:
        north = max(o['north'] for o in overlays)
        south = min(o['south'] for o in overlays)
        east = max(o['east'] for o in overlays)
        west = min(o['west'] for o in overlays)
        combined = {'north': north, 'south': south, 'east': east, 'west': west}
    else:
        combined = None

    out = {
        'project': 'Midway',
        'source': os.path.basename(KMZ),
        'overlays': overlays,
        'combinedOverlayBbox': combined,
        'borings': borings,
        'taxParcel': parcel,
    }
    with open(OUT_JSON, 'w') as f:
        json.dump(out, f, indent=2)

    # Clean up: keep only the JPEG overlays + JSON; drop boring PNGs and the
    # raw KML to keep the repo light.
    for fname in os.listdir(os.path.join(OUT_KMZ_DIR, 'files')):
        if 'overlay' not in fname.lower() and fname.lower().endswith(('.png',)):
            try: os.remove(os.path.join(OUT_KMZ_DIR, 'files', fname))
            except OSError: pass
    raw_kml = os.path.join(OUT_KMZ_DIR, 'doc.kml')
    if os.path.exists(raw_kml):
        os.remove(raw_kml)

    print(f'wrote {OUT_JSON}')
    print(f'  overlays: {len(overlays)}')
    print(f'  borings: {len(borings)}')
    print(f'  combined bbox: {combined}')


if __name__ == '__main__':
    main()
