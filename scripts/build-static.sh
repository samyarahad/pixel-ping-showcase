#!/usr/bin/env bash
# Builds the static export of the site into ./out (GitHub Pages ready).
# Usage: bash scripts/build-static.sh
set -euo pipefail
cd "$(dirname "$0")/.."

# Route handlers are not supported by `next export`; the site has no API usage.
if [ -d src/app/api ]; then
  mv src/app/api .api-stash
  trap 'if [ -d .api-stash ]; then mv .api-stash src/app/api; fi' EXIT
fi

NEXT_STATIC_EXPORT=1 bun run next build

# With a custom distDir the export lands inside export-dist/ — collect it into out/.
rm -rf out
mkdir out
cp -r export-dist/. out/

# GitHub Pages must be allowed to serve the _next/ folder.
touch out/.nojekyll

echo "✔ static export ready in ./out"
