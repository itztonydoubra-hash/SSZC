/** @type {import('next').NextConfig} */

// Deployment (review build) targets GitHub Pages, which serves static files with
// no image-optimisation server and under a project sub-path (/SSZC). These
// settings are deployment configuration only — no feature/design change.
const isPages = process.env.DEPLOY_TARGET === "gh-pages";
const basePath = isPages ? "/SSZC" : "";

const nextConfig = {
  reactStrictMode: true,
  images: {
    // GitHub Pages has no Image Optimization server → serve images as-is.
    // (Local dev/prod-server builds keep modern formats.)
    ...(isPages ? { unoptimized: true } : { formats: ["image/avif", "image/webp"] }),
  },
  // Published so lib/asset.ts can prefix UNOPTIMISED image sources, which
  // Next.js does not basePath itself (see docs/decisions.md D7). Empty string
  // for local/dev/server builds, so assetPath() is a no-op there.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  ...(isPages
    ? {
        output: "export",
        basePath,
        // trailingSlash makes static hosting resolve /route/ → /route/index.html
        trailingSlash: true,
      }
    : {}),
};

export default nextConfig;
