/*
 * Static-export helper (deployment only).
 *
 * `output: export` rejects a dynamic route whose generateStaticParams() returns
 * an EMPTY array. While a content domain is still empty, this returns a single
 * sentinel slug so the route can be exported; the page itself calls notFound()
 * for the sentinel, so NO fabricated content is rendered — just a valid 404.
 * Under the normal server build this returns the real params only.
 *
 * The fallback must apply to EVERY export target, not one named host: it is a
 * constraint of `output: export` itself. (Scoping it to a single target broke the
 * root-served "static" build the moment that target was added — see
 * docs/decisions.md D8.)
 */
const SENTINEL = "__none";
export const EXPORT_SENTINEL = SENTINEL;

/** DEPLOY_TARGET values that produce a static export (must match next.config.mjs). */
const EXPORT_TARGETS = new Set(["gh-pages", "static"]);

/** True when this build is a static export and therefore needs the sentinel. */
export function isStaticExport(): boolean {
  return EXPORT_TARGETS.has(process.env.DEPLOY_TARGET ?? "");
}

export function withExportFallback<T extends { slug: string }>(params: T[]): { slug: string }[] {
  if (params.length > 0) return params.map((p) => ({ slug: p.slug }));
  return isStaticExport() ? [{ slug: SENTINEL }] : [];
}
