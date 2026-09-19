/**
 * Prefix for static assets on GitHub Pages project sites.
 * next.config rewrites next/image + next/link automatically, but plain
 * <img src> and metadata icon paths need this manual prefix.
 * Set via NEXT_BASE_PATH at build time (exposed as NEXT_PUBLIC_BASE_PATH).
 */
export const BASE: string = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  return `${BASE}${path}`;
}
