# Pixel & Ping — Network management without the noise

Marketing & showcase site for **Pixel & Ping**, a network management product.
Built with Next.js 16, Tailwind CSS 4 and Framer Motion, deployed to GitHub Pages
as a fully static export.

**Live:** https://samyarahad.github.io/pixel-ping-showcase/

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS 4 + shadcn/ui primitives
- Framer Motion for scroll reveals, image-reveal showcase cards and tab transitions
- Hand-built SVG charts and product mockups (no chart library)

## Development

```bash
bun install
bun run dev        # dev server on :3000
bun run lint       # eslint
```

## Deploy (GitHub Pages)

The site ships as a static export. `scripts/build-static.sh` switches
`next.config.ts` into export mode (`NEXT_STATIC_EXPORT=1`) and adds `.nojekyll`
so `_next/` assets are served. Because this repo publishes under a sub-path,
the build also sets `NEXT_BASE_PATH=/pixel-ping-showcase` (basePath +
assetPrefix + manual `<img>` prefixing via `src/lib/asset.ts`).

On every push to `main`, the GitHub Action in `.github/workflows/deploy.yml`
rebuilds the site and force-pushes the export to the `gh-pages` branch, which
GitHub Pages serves.
