#!/usr/bin/env bash
# Builds the standalone pile-viewer deploy bundle at $1 (default /tmp/bundle).
# Pulls only what the viewer needs from the repo: pile_viewer.html (renamed
# to index.html), favicon, three.js assets, model, piles.json, KMZ data.
set -euo pipefail

OUT="${1:-/tmp/bundle}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

rm -rf "$OUT"
mkdir -p "$OUT/assets" "$OUT/data/kmz/files" "$OUT/models"

cp "$ROOT/pile_viewer.html"                       "$OUT/index.html"
cp "$ROOT/favicon.svg"                            "$OUT/favicon.svg"
cp "$ROOT/models/midway.glb"                      "$OUT/models/"
cp "$ROOT/data/piles.json"                        "$OUT/data/"
cp "$ROOT/data/modules.json"                      "$OUT/data/" 2>/dev/null || true
cp "$ROOT/data/cad_cells.json"                    "$OUT/data/" 2>/dev/null || true
cp "$ROOT/data/kmz_reference.json"                "$OUT/data/"
cp "$ROOT/data/kmz/files/"*.JPG                   "$OUT/data/kmz/files/"
cp "$ROOT/assets/three.module-C7ia6f3T.js"        "$OUT/assets/"
cp "$ROOT/assets/GLTFLoader-CGtRWvqK.js"          "$OUT/assets/"
cp "$ROOT/assets/OrbitControls-Bk8Ii4mF.js"       "$OUT/assets/"

cat > "$OUT/netlify.toml" <<'EOF'
[build]
  publish = "."

[[headers]]
  for = "/models/*.glb"
  [headers.values]
    Content-Type = "model/gltf-binary"
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/assets/*.js"
  [headers.values]
    Content-Type = "application/javascript"

[[headers]]
  for = "/data/kmz/files/*"
  [headers.values]
    Cache-Control = "public, max-age=86400"
EOF

cat > "$OUT/README.md" <<'EOF'
# Midway Pile Viewer — auto-deployed

This branch is rebuilt automatically from the source repo's
`scripts/build_viewer_bundle.sh`. Don't edit files here directly — edit
`pile_viewer.html` on the work branch and the deploy bot updates this branch.

`/` = admin mode · `/?view=readonly` = read-only
EOF

echo "Bundle ready at $OUT ($(du -sh "$OUT" | cut -f1))"
