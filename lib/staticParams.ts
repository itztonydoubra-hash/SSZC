/*
 * Static-export helper (deployment only). GitHub Pages uses `output: export`,
 * which rejects a dynamic route whose generateStaticParams() returns an EMPTY
 * array. While the client content is still empty, this returns a single sentinel
 * slug so the route can be exported; the page itself calls notFound() for the
 * sentinel, so NO fabricated content is rendered — just a valid 404. Under the
 * normal server build this returns the real params only.
 */
const SENTINEL = "__none";
export const EXPORT_SENTINEL = SENTINEL;

export function withExportFallback<T extends { slug: string }>(params: T[]): { slug: string }[] {
  if (params.length > 0) return params.map((p) => ({ slug: p.slug }));
  // Only emit the sentinel during the Pages static export.
  return process.env.DEPLOY_TARGET === "gh-pages" ? [{ slug: SENTINEL }] : [];
}
