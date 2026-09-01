/*
 * ============================================================================
 * DATA-ACCESS LAYER  (design.md C13 / requirements.md §26.4, tasks.md 7.1)
 * ============================================================================
 * The ONLY content API components may import. Components call getX(); they never
 * import the data files in content/data/* directly. This is the seam that makes
 * the site CMS-READY: to move to a headless CMS later, reimplement these getX()
 * functions to fetch from the CMS — the schemas (content/types.ts) and every
 * component stay UNCHANGED. No application restructuring.
 *
 * All functions are synchronous today (file-backed). Their signatures return
 * plain typed data; a future CMS version can make them async without changing
 * call sites if we adopt async everywhere at that time (documented migration).
 * ============================================================================
 */

import type {
  About,
  Administration,
  Chapters,
  Contact,
  Impact,
  LawsanEvent,
  Leadership,
  MediaItem,
  NewsItem,
  Opportunity,
  Partner,
  Project,
  Publications,
} from "./types";

import { about } from "./data/about";
import { administrations } from "./data/administrations";
import { chapters } from "./data/chapters";
import { contact } from "./data/contact";
import { events } from "./data/events";
import { impact } from "./data/impact";
import { leadership } from "./data/leadership";
import { media } from "./data/media";
import { news } from "./data/news";
import { opportunities } from "./data/opportunities";
import { partners } from "./data/partners";
import { projects } from "./data/projects";
import { publications } from "./data/publications";

/* Site structure (nav groups / wordmark) lives in content/site.ts and is
 * re-exported for a single import surface. */
export { NAV_GROUPS, WORDMARK_FALLBACK } from "./site";

/* --- Domain accessors ---------------------------------------------------- */

export function getLeadership(): Leadership {
  return leadership;
}

export function getChapters(): Chapters {
  return chapters;
}

export function getPublications(): Publications {
  return publications;
}

/** Only CONFIRMED statistics are exposed (design.md B4 — no fake numbers). */
export function getImpact(): Impact {
  return {
    ...impact,
    stats: impact.stats.filter((s) => s.confirmed),
  };
}

export function getContact(): Contact {
  return contact;
}

export function getAbout(): About {
  return about;
}

export function getProjects(): Project[] {
  return projects;
}

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getEvents(): LawsanEvent[] {
  return events;
}

export function getEvent(slug: string): LawsanEvent | undefined {
  return events.find((e) => e.slug === slug);
}

export function getNews(): NewsItem[] {
  return news;
}

export function getNewsItem(slug: string): NewsItem | undefined {
  return news.find((n) => n.slug === slug);
}

/** CLIENT-SUPPLIED MEDIA (decisions.md D2). Empty until file intake. */
export function getMedia(): MediaItem[] {
  return media;
}

export function getAdministrations(): Administration[] {
  return administrations;
}

export function getOpportunities(): Opportunity[] {
  return opportunities;
}

/** Partners is optional; an empty array means the section is omitted (C11). */
export function getPartners(): Partner[] {
  return partners;
}
