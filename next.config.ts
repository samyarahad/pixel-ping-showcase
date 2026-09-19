import type { NextConfig } from "next";

/**
 * Two build modes:
 * - Default (sandbox / server): output "standalone" for the running dev server.
 * - NEXT_STATIC_EXPORT=1: pure static export into ./out — used for GitHub Pages.
 *   A separate distDir keeps the export build from touching the dev server's .next.
 */
const isStaticExport = process.env.NEXT_STATIC_EXPORT === "1";
// GitHub Pages project sites live under /<repo>/ — set NEXT_BASE_PATH to match.
const basePath = process.env.NEXT_BASE_PATH || "";

const nextConfig: NextConfig = isStaticExport
  ? {
      output: "export",
      distDir: "export-dist",
      images: { unoptimized: true },
      reactStrictMode: false,
      typescript: { ignoreBuildErrors: true },
      ...(basePath
        ? {
            basePath,
            assetPrefix: basePath,
            // expose to client bundles (plain <img> tags are NOT rewritten by basePath)
            env: { NEXT_PUBLIC_BASE_PATH: basePath },
          }
        : {}),
    }
  : {
      output: "standalone",
      typescript: { ignoreBuildErrors: true },
      reactStrictMode: false,
    };

export default nextConfig;
