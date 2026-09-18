# Pixel & Ping — Showcase

A cinematic, immersive, interactive marketing/showcase website for the **Pixel & Ping** product. The site is purely presentational — no backend, no authentication, no fake data. It tells one continuous visual story: darkness → network → product → full reveal → end.

## Stack

- **Vite + React + TypeScript** — modern, fast, static-friendly
- **Three.js + @react-three/fiber + @react-three/drei** — particle network backdrop
- **Lenis** — smooth scroll storytelling
- **CSS** — premium design system (glass, gradients, noise, vignette)
- **GitHub Pages + GitHub Actions** — automatic deployment

## Showcase structure

```
Hero ─────────────────── darkness → logo → "Control your network. See everything."
Network ──────────────── "Everything connected."
Dashboard ────────────── real screenshot
Users ────────────────── real screenshot
Servers ──────────────── real screenshot
Endpoints ────────────── abstract visualization
IP Scanner ───────────── real screenshot
Ports ────────────────── abstract visualization
Cloudflare ───────────── abstract visualization
Config Generator ─────── abstract visualization
Traffic ──────────────── abstract visualization
Analytics ────────────── abstract visualization
Failover ─────────────── abstract visualization
Logs ─────────────────── abstract visualization
Notifications ────────── abstract visualization
Settings ─────────────── real screenshot
Full Reveal ──────────── all surfaces orbit the Pixel & Ping core
Final ────────────────── "One view. One network."
Footer ───────────────── logo + brand + social links
```

## Local development

```bash
npm install
npm run dev
```

The dev server starts on http://localhost:5173.

## Production build

```bash
npm run build
npm run preview    # optional — preview the built site locally
```

The static build is emitted to `./dist`.

## Deploy to GitHub Pages

Deployment is **automatic**. Any push to the `main` branch triggers the workflow at `.github/workflows/deploy.yml`, which:

1. Checks out the repository
2. Sets up Node 20
3. Installs dependencies with `npm ci`
4. Builds with `npm run build` (with `CI=true` so the Vite `base` is set to `/pixel-ping-showcase/`)
5. Uploads the `dist/` artifact
6. Deploys it to GitHub Pages

### One-time repository setup

1. Push this project to a GitHub repository named `pixel-ping-showcase`.
2. In the repository settings, go to **Settings → Pages**.
3. Under **Build and deployment → Source**, select **GitHub Actions**.
4. Trigger the workflow by pushing to `main` (or via the **Actions** tab → **Run workflow**).

The site will be published at:

```
https://<your-username>.github.io/pixel-ping-showcase/
```

### If you rename the repository

Update `REPO_NAME` in `vite.config.ts` to match the new repository name so the asset paths resolve correctly.

## Accessibility

- Semantic HTML, keyboard navigation, focus states
- Alt text on all screenshots
- `prefers-reduced-motion: reduce` is respected — major camera movement, particles, and parallax are reduced or disabled
- WebGL fallback: if WebGL is unavailable, a CSS-only animated backdrop is shown instead
- Touch devices: custom cursor disabled; layout collapses to single column

## Assets

All product screenshots and the Pixel & Ping logo live in `public/screenshots/` and `public/logo/`. They are the source of truth for the product UI — the showcase does not recreate or invent new dashboard visuals.

## License & ownership

This showcase is for the Pixel & Ping product. All trademarks and product visuals belong to their respective owners.
