#!/usr/bin/env bash
# Deploys the Pixel & Ping site to GitHub (samyarahad.github.io).
# - main branch  : full project source
# - gh-pages     : pre-built static export (what Pages serves)
# Requires: GH_TOKEN env var.
set -euo pipefail

GH_TOKEN="${GH_TOKEN:?set GH_TOKEN}"
OWNER="samyarahad"
REPO="samyarahad.github.io"
PROJECT="/home/z/my-project"
STAGE="/home/z/my-project/gh-deploy"
REMOTE="https://x-access-token:${GH_TOKEN}@github.com/${OWNER}/${REPO}.git"

echo "── 1. create repo (if missing) ─────────────────────────────"
code=$(curl -s -o /tmp/repo-resp.json -w "%{http_code}" \
  -X POST "https://api.github.com/user/repos" \
  -H "Authorization: Bearer ${GH_TOKEN}" \
  -H "Accept: application/vnd.github+json" \
  -d '{"name":"'"${REPO}"'","description":"Pixel & Ping — network management showcase site","homepage":"https://samyarahad.github.io","private":false,"auto_init":false}')
if [ "$code" = "201" ]; then
  echo "   repo created"
elif [ "$code" = "422" ]; then
  echo "   repo already exists — continuing"
else
  echo "   unexpected response (${code}):" >&2
  cat /tmp/repo-resp.json >&2
  exit 1
fi

echo "── 2. stage clean source tree ──────────────────────────────"
rm -rf "${STAGE}/source"
mkdir -p "${STAGE}/source/.github/workflows"
cd "${PROJECT}"
cp -r src public scripts prisma "${STAGE}/source/"
cp package.json bun.lock next.config.ts tsconfig.json postcss.config.mjs eslint.config.mjs components.json "${STAGE}/source/"
cp deploy-workflow/deploy.yml "${STAGE}/source/.github/workflows/deploy.yml"
cp deploy-workflow/README.md "${STAGE}/source/README.md"
cp deploy-workflow/gitignore "${STAGE}/source/.gitignore"

echo "── 3. push source → main ───────────────────────────────────"
cd "${STAGE}/source"
git init -q -b main
git config user.name "${OWNER}"
git config user.email "${OWNER}@users.noreply.github.com"
git add -A
git commit -q -m "Pixel & Ping showcase — initial commit

Professional single-page showcase built with Next.js 16, Tailwind CSS 4
and Framer Motion. Static export pipeline for GitHub Pages included."
git push -q --force "${REMOTE}" main
echo "   main pushed"

echo "── 4. push static build → gh-pages ─────────────────────────"
rm -rf "${STAGE}/site"
cp -r "${PROJECT}/out" "${STAGE}/site"
cd "${STAGE}/site"
git init -q -b gh-pages
git config user.name "${OWNER}"
git config user.email "${OWNER}@users.noreply.github.com"
git add -A
git commit -q -m "deploy: static export $(date -u +%Y-%m-%dT%H:%MZ)"
git push -q --force "${REMOTE}" gh-pages
echo "   gh-pages pushed"

echo "── 5. enable GitHub Pages (source: gh-pages) ───────────────"
code=$(curl -s -o /tmp/pages-resp.json -w "%{http_code}" \
  -X POST "https://api.github.com/repos/${OWNER}/${REPO}/pages" \
  -H "Authorization: Bearer ${GH_TOKEN}" \
  -H "Accept: application/vnd.github+json" \
  -d '{"source":{"branch":"gh-pages","path":"/"}}')
if [ "$code" = "201" ]; then
  echo "   Pages enabled"
elif [ "$code" = "409" ]; then
  echo "   Pages already enabled — updating source"
  curl -s -X PUT "https://api.github.com/repos/${OWNER}/${REPO}/pages" \
    -H "Authorization: Bearer ${GH_TOKEN}" \
    -H "Accept: application/vnd.github+json" \
    -d '{"source":{"branch":"gh-pages","path":"/"}}' >/dev/null
  echo "   source updated"
else
  echo "   pages api response (${code}):" >&2
  cat /tmp/pages-resp.json >&2
  exit 1
fi

echo "── 6. waiting for https://${OWNER}.github.io/ to go live ──"
for i in $(seq 1 30); do
  sleep 10
  http=$(curl -s -o /dev/null -w "%{http_code}" --max-time 15 "https://${OWNER}.github.io/" || true)
  echo "   attempt ${i}: HTTP ${http}"
  if [ "$http" = "200" ]; then
    echo ""
    echo "✔ LIVE: https://${OWNER}.github.io/"
    exit 0
  fi
done

echo "⚠ not 200 yet — Pages may still be building; check https://github.com/${OWNER}/${REPO}/deployments"
exit 1
