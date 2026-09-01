/*
 * Site structure (design.md C1 navigation grouping, tasks.md 7.1 `site`).
 *
 * This is SITE STRUCTURE (routes/labels/groups), not organisational content, so
 * it is authored here directly — it is not [NEEDS CONTENT]. Organisational
 * content (names, stats, chapters, contact channels, logo) remains [OFFICIAL]/
 * [NEEDS CONTENT] in their own content files.
 *
 * The nav grouping is the approved C1 structure. Both the full-screen Menu
 * (Phase 6) and the colophon's final navigation (Phase 12) read from here, so
 * the structure has a single source of truth.
 */

export type NavItem = { label: string; href: string };
export type NavGroup = { index: string; title: string; items: NavItem[] };

export const NAV_GROUPS: NavGroup[] = [
  {
    index: "01",
    title: "THE ZONE",
    items: [
      { label: "About", href: "/about" },
      { label: "Leadership", href: "/leadership" },
      { label: "Chapters", href: "/chapters" },
      { label: "Administration Archive", href: "/archive" },
    ],
  },
  {
    index: "02",
    title: "EXPLORE",
    items: [
      { label: "Events", href: "/events" },
      { label: "Projects & Initiatives", href: "/projects" },
      { label: "Publications", href: "/publications" },
      { label: "News & Updates", href: "/news" },
      { label: "Opportunities", href: "/opportunities" },
      { label: "Media", href: "/media" },
    ],
  },
  {
    index: "03",
    title: "CONNECT",
    items: [{ label: "Contact", href: "/contact" }],
  },
];

/* The wordmark text fallback used until the official logo asset is supplied.
 * The logo itself is [OFFICIAL LOGO] (design.md A8 / C15). */
export const WORDMARK_FALLBACK = "LAWSAN South South";
