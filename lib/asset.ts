/*
 * Asset paths under a deployment sub-path (decisions.md D7).
 *
 * THE PROBLEM this solves: the review deployment is GitHub Pages, which serves
 * the site from a project sub-path (`basePath: "/SSZC"`) and has no image
 * optimisation server, so that build also sets `images.unoptimized`. Next.js
 * applies `basePath` to the `/_next/image` optimiser URL — but when an image is
 * UNOPTIMISED the `src` is emitted verbatim, with no `basePath`. A portrait
 * stored as `/chapters/name.jpg` therefore requests `/chapters/name.jpg`
 * instead of `/SSZC/chapters/name.jpg` and 404s: a broken image on every
 * portrait, logo and gallery item once deployed.
 *
 * THE FIX: prefix root-relative asset paths with the build's base path at the
 * point of use. `NEXT_PUBLIC_BASE_PATH` is empty for local/dev/server builds, so
 * this is a no-op there and the optimiser keeps working normally.
 *
 * Content files stay deployment-agnostic: they keep storing plain paths like
 * "/chapters/name.jpg", exactly as the schema documents.
 */

/** The deployment sub-path ("" for local/dev/server builds, "/SSZC" for Pages). */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Resolve a root-relative asset path (e.g. "/chapters/name.jpg") for the current
 * deployment. External URLs, data URLs and already-prefixed paths pass through
 * untouched, so this is safe to apply blindly at any image call site.
 */
export function assetPath(src: string): string {
  if (!BASE_PATH || !src) return src;
  if (!src.startsWith("/")) return src; // relative, protocol-relative or data URL
  if (src === BASE_PATH || src.startsWith(`${BASE_PATH}/`)) return src;
  return `${BASE_PATH}${src}`;
}
