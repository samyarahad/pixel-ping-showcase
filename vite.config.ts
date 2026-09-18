import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// The repository name. Update this if you fork to a different repo name.
// Vite needs the correct base path so that all assets load from
// https://USERNAME.github.io/REPO_NAME/ on GitHub Pages.
const REPO_NAME = "pixel-ping-showcase";

// Detect GitHub Pages environment (Actions sets GITHUB_ACTIONS=true and CI=true).
// On GitHub Pages the site is served from /REPO_NAME/, locally from /.
const isCI = process.env.CI === "true" || process.env.GITHUB_ACTIONS === "true";

export default defineConfig({
  base: isCI ? `/${REPO_NAME}/` : "/",
  plugins: [react()],
  build: {
    target: "es2020",
    outDir: "dist",
    assetsInlineLimit: 4096,
    chunkSizeWarningLimit: 1200,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ["three"],
          r3f: ["@react-three/fiber", "@react-three/drei"],
          lenis: ["lenis"],
          react: ["react", "react-dom"],
        },
      },
    },
  },
});
