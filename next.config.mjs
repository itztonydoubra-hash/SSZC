/** @type {import('next').NextConfig} */

// Deployment (review build) targets GitHub Pages, which serves static files with
// no image-optimisation server and under a project sub-path (/SSZC). These
// settings are deployment configuration only — no feature/design change.
/*
 * Three build targets, selected with DEPLOY_TARGET. These are DEPLOYMENT
 * settings only — no feature or design differs between them.
 *
 *   (unset)    Next.js app for `next dev` / `next start`. Image optimisation on.
 *   "static"   Static export served at a domain ROOT (Netlify, Cloudflare Pages,
 *              Vercel-as-static, or any plain file host / drag-and-drop).
 *   "gh-pages" Static export served from a project SUB-PATH (/SSZC), which is
 *              how GitHub Pages serves a project site.
 *
 * Note: GitHub Pages cannot serve a PRIVATE repository on a free plan, so the
 * "static" target exists so the site can be published for free while the
 * repository stays private (docs/decisions.md D8).
 */
const target = process.env.DEPLOY_TARGET ?? "";
const isPages = target === "gh-pages";
const isStatic = target === "static";
const isExport = isPages || isStatic;

// Only a project sub-path deployment needs a basePath; a root deployment must not
// have one, or every asset and link gains a phantom /SSZC prefix.
const basePath = isPages ? "/SSZC" : "";

const nextConfig = {
  reactStrictMode: true,
  images: {
    // A static export has no Image Optimization server → serve images as-is.
    // (Local dev / next start builds keep modern formats.)
    ...(isExport ? { unoptimized: true } : { formats: ["image/avif", "image/webp"] }),
  },
  // Published so lib/asset.ts can prefix UNOPTIMISED image sources, which
  // Next.js does not basePath itself (see docs/decisions.md D7). Empty string
  // for root/dev/server builds, so assetPath() is a no-op there.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  ...(isExport
    ? {
        output: "export",
        // trailingSlash makes static hosting resolve /route/ → /route/index.html
        trailingSlash: true,
        ...(basePath ? { basePath } : {}),
      }
    : {}),
};

export default nextConfig;
