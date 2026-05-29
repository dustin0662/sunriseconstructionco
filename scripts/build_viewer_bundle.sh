#!/usr/bin/env bash
# Builds the Midway field-tool deploy bundle at $1 (default /tmp/bundle).
# Multi-page: dashboard (index) + 3D model + drawings data-entry, plus the
# Netlify Functions backend (captures/photo/invite over Blobs + Identity).
set -euo pipefail

OUT="${1:-/tmp/bundle}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

rm -rf "$OUT"
mkdir -p "$OUT/assets" "$OUT/data/kmz/files" "$OUT/models" "$OUT/netlify/functions"

# Pages
cp "$ROOT/dashboard.html"                         "$OUT/index.html"
cp "$ROOT/pile_viewer.html"                       "$OUT/model.html"
cp "$ROOT/drawings.html"                          "$OUT/drawings.html"
cp "$ROOT/favicon.svg"                            "$OUT/favicon.svg"

# Data + model
cp "$ROOT/models/midway.glb"                      "$OUT/models/"
cp "$ROOT/data/piles.json"                        "$OUT/data/" 2>/dev/null || true
cp "$ROOT/data/modules.json"                      "$OUT/data/" 2>/dev/null || true
cp "$ROOT/data/cad_cells.json"                    "$OUT/data/" 2>/dev/null || true
cp "$ROOT/data/cad_rows.json"                     "$OUT/data/" 2>/dev/null || true
cp "$ROOT/data/kmz_reference.json"                "$OUT/data/"
cp "$ROOT/data/kmz/files/"*.JPG                   "$OUT/data/kmz/files/"

# Front-end libs
cp "$ROOT/assets/three.module-C7ia6f3T.js"        "$OUT/assets/"
cp "$ROOT/assets/GLTFLoader-CGtRWvqK.js"          "$OUT/assets/"
cp "$ROOT/assets/OrbitControls-Bk8Ii4mF.js"       "$OUT/assets/"
cp "$ROOT/assets/midway-api.js"                   "$OUT/assets/"

# Serverless backend (Netlify Functions + Blobs) + deploy config
cp "$ROOT/netlify/functions/"*.mjs                "$OUT/netlify/functions/"
cp "$ROOT/netlify.deploy.toml"                    "$OUT/netlify.toml"
cp "$ROOT/package.deploy.json"                    "$OUT/package.json"

cat > "$OUT/README.md" <<'EOF'
# Midway Field Tool — auto-deployed bundle

Rebuilt from scripts/build_viewer_bundle.sh on the work branch. Pages:
/ = dashboard · /model.html = 3D model · /drawings.html = row data entry.

Backend: Netlify Functions (netlify/functions) over Netlify Blobs, with
Netlify Identity for login + invites. See SETUP in the work-branch docs.
EOF

echo "Bundle ready at $OUT ($(du -sh "$OUT" | cut -f1))"
