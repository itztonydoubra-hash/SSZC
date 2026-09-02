/*
 * ============================================================================
 * CONTENT SCHEMAS — the single typed shape of every content domain.
 * (design.md C13 / requirements.md §26.4, tasks.md 7.1)
 * ============================================================================
 * Every type below matches EXACTLY the `Data` line stated in design.md for its
 * section (B1–B5, C4–C11). Optional fields are truly optional (`?`) so that a
 * missing value is a first-class state — components omit or show a designed
 * placeholder, and NEVER fabricate. There is no code path that invents content.
 *
 * Images are referenced by an ImageRef with a REQUIRED, factual `alt` and an
 * explicit native `ratio` (design.md A5/C13). `blur`/`caption` optional.
 *
 * CMS-READY: components import ONLY the getX() functions in content/index.ts.
 * Swapping these file-backed values for a headless CMS means changing the
 * data-access layer only — these types and the components stay unchanged.
 * ============================================================================
 */

/* Shared ------------------------------------------------------------------- */

export type ImageRef = {
  /** path under /public, e.g. "/media/xyz.jpg" — or "" when [OFFICIAL IMAGE] not yet supplied */
  src: string;
  /** REQUIRED factual alt text; never fabricated. Empty string only for decorative. */
  alt: string;
  /** native aspect ratio, e.g. "3 / 2", "4 / 5" — not a forced uniform crop */
  ratio: string;
  /** optional blur placeholder data URL */
  blur?: string;
  /** optional caption — only if supplied by the client */
  caption?: string;
};

export type SocialLink = {
  /** platform name, e.g. "Instagram" */
  platform: string;
  /** full URL */
  url: string;
};

/* Leadership (design.md B1 / lines 206, 224) ------------------------------- */

export type ZonalExecutive = {
  /** two-digit order index, e.g. "01" */
  index: string;
  /** position/role, e.g. an official directorship title */
  role: string;
  name: string;
  portrait: ImageRef;
  /** optional detail-view route slug */
  slug?: string;
  bio?: string;
  socials?: SocialLink[];
};

export type CampusLeadership = {
  institution: string;
  director?: string;
  deputyDirector?: string;
};

export type StateLeadership = {
  state: string;
  director?: string;
  deputyDirector?: string;
  campuses: CampusLeadership[];
};

export type Leadership = {
  zonal: ZonalExecutive[];
  states: StateLeadership[];
};

/* Chapters (design.md B2 / line 252) --------------------------------------- */

/**
 * A chapter's LAWSAN President.
 *
 * EVERY field is optional and nothing here may be inferred. Until the client
 * supplies verified details the chapter profile renders its designed empty
 * state ("CHAPTER PRESIDENT / [NEEDS CONTENT]" and "[OFFICIAL IMAGE]"); when
 * the fields are populated the SAME component displays them — no redesign.
 */
export type ChapterPresident = {
  /** full name, exactly as supplied */
  name?: string;
  /** official role wording, only if supplied (the UI's own label is generic) */
  role?: string;
  /** official portrait — never a stock, generic or AI-generated photograph */
  portrait?: ImageRef;
  /** e.g. a session/tenure string, only if supplied */
  tenure?: string;
  socials?: SocialLink[];
  contact?: { email?: string; phone?: string };
};

export type Chapter = {
  institution: string;
  slug: string;
  /** city/campus location — only if supplied, never inferred/invented */
  location?: string;
  /** the chapter's LAWSAN President — see ChapterPresident */
  president?: ChapterPresident;
  /** other chapter executives — shape kept loose until the client supplies it */
  execs?: { role: string; name: string }[];
  contact?: { email?: string; phone?: string };
  images?: ImageRef[];
};

export type ChapterState = {
  /** full state name as it is displayed, e.g. "Bayelsa State" */
  state: string;
  /** url/query slug, e.g. "bayelsa" — also keys the map geography */
  slug: string;
  chapters: Chapter[];
};

export type Chapters = {
  zoneLabel: string;
  states: ChapterState[];
};

/* Publications (design.md B3 / line 276) ----------------------------------- */

export type PublicationCategory = {
  /** stable id used in the URL query, e.g. "legal" */
  id: string;
  /** display label, e.g. "Legal" */
  label: string;
};

export type Publication = {
  slug: string;
  title: string;
  /** category id referencing PublicationCategory.id */
  category: string;
  author: string;
  /** ISO date string */
  date: string;
  excerpt: string;
  featureImage?: ImageRef;
  /** in-site long-form body OR an external URL — one of the two */
  body?: string;
  externalUrl?: string;
  /** downloadable report */
  pdf?: { url: string; label?: string; size?: string };
  featured?: boolean;
};

export type Publications = {
  categories: PublicationCategory[];
  items: Publication[];
};

/* Impact (design.md B4 / line 302) ----------------------------------------- */

export type ImpactStat = {
  /** numeric value to count up to */
  value: number;
  /** optional display override, e.g. "21,000" */
  display?: string;
  /** optional suffix, e.g. "+" */
  suffix?: string;
  /** what the figure counts */
  descriptor: string;
  /** ONLY confirmed:true stats render (design.md B4) */
  confirmed: boolean;
  /** one-line evidence note shown in the margin */
  evidenceNote?: string;
  /** link into the substantiating page, e.g. "/chapters" */
  evidenceHref?: string;
};

export type Testimonial = {
  quote: string;
  attribution: string;
};

export type ImpactStory = {
  projects: string[];
  reachNote?: string;
  testimonials: Testimonial[];
};

export type Impact = {
  stats: ImpactStat[];
  story: ImpactStory;
};

/* Contact (design.md B5 / line 328) ---------------------------------------- */

export type Contact = {
  orgName: string;
  closingStatement?: string;
  email?: string;
  phone?: string;
  /** name of the person the phone/enquiries line belongs to (optional) */
  phoneName?: string;
  address?: string;
  mapUrl?: string;
  socials: SocialLink[];
  /** e.g. current administration/session line */
  session?: string;
};

/* About (design.md C4 / line 393, superseded in part by decisions.md D9) ---- */

/** A named principle or dimension: the word, and the sentence qualifying it. */
export type AboutPrinciple = {
  /** e.g. "Equality", "Connect" */
  name: string;
  description: string;
};

/**
 * One block of an About module. The modules are long-form editorial copy, so a
 * module is an ORDERED sequence of typed blocks rather than a single string —
 * that is the only way to keep the approved copy in its approved order (a beat
 * sits between two paragraphs; a set of parallel statements sits mid-module).
 *
 * Deliberately a tiny, closed vocabulary — it is not a rich-text engine, and it
 * maps directly onto a CMS block/portable-text field later.
 */
export type AboutBlock =
  /** ordinary body copy (Manrope, reading measure) */
  | { kind: "prose"; text: string }
  /** a short line set apart from the prose by scale and space */
  | { kind: "beat"; text: string }
  /** parallel statements read as a hairline-divided set */
  | { kind: "list"; items: string[] }
  /** named principles/dimensions (name + qualifying sentence) */
  | { kind: "principles"; items: AboutPrinciple[] }
  /** a quieter closing reference, e.g. a constitutional note */
  | { kind: "note"; text: string };

/** A narrative module: its heading and its blocks, in order. */
export type AboutModule = {
  /** display heading, e.g. "A region, brought together" */
  heading: string;
  blocks: AboutBlock[];
};

export type About = {
  /** the Zone's formal name — set as the record (Manrope) above the statement */
  title: string;
  /** the ONE idea of what the Zone is — the opening serif statement (C4) */
  statement: string;
  /** opening body paragraphs beneath the statement */
  intro: string[];
  /** the single pull line that closes the opening */
  pull?: string;
  history: AboutModule;
  purpose: AboutModule;
  values: AboutModule;
  roleInLawsan: AboutModule;
  /** the two short serif statements (C4) */
  vision: string;
  mission: string;
  /** "The Zone today" — the Zone's present scope */
  scope: AboutModule;
  /** the closing line */
  coda?: string;
  images: ImageRef[];
};

/* Projects (design.md C5 / line 403) --------------------------------------- */

export type ProjectVideo = {
  /** video source URL */
  src: string;
  /** poster shown before play (poster first, click-to-play) */
  poster: ImageRef;
};

export type Project = {
  slug: string;
  name: string;
  purpose: string;
  description: string;
  location?: string;
  date?: string;
  beneficiaries?: string;
  results?: string;
  images: ImageRef[];
  video?: ProjectVideo;
  /** slugs of related publications */
  relatedPublications?: string[];
};

/* Events (design.md C6 / line 413) ----------------------------------------- */

export type LawsanEvent = {
  slug: string;
  title: string;
  /** ISO date; upcoming/past derived from this vs today */
  date: string;
  endDate?: string;
  location?: string;
  description: string;
  /** external registration link (design decision: no on-site backend) */
  registrationUrl?: string;
  images: ImageRef[];
  video?: ProjectVideo;
  /** slugs of related news items */
  relatedNews?: string[];
};

/* News (design.md C7 / line 419) ------------------------------------------- */

export type NewsItem = {
  slug: string;
  title: string;
  /** ISO date */
  date: string;
  excerpt: string;
  body?: string;
  externalUrl?: string;
  image?: ImageRef;
  category?: string;
};

/* Media (design.md C8 / line 427) — CLIENT-SUPPLIED production content ------ */

export type MediaItem = {
  /** path under /public/media, e.g. "/media/convention/2026-convention-opening.jpg" */
  src: string;
  /** defaults to "image" — only set "video" for video items */
  type?: "image" | "video";
  /** for videos: poster shown before interaction */
  poster?: ImageRef;
  /** native ratio, e.g. "3 / 2" or "4 / 5". Optional — omit to use the default
   *  masonry ratio; set it for the most faithful crop. */
  ratio?: string;
  /** REQUIRED factual alt for accessibility. Use "[NEEDS CONTENT]" only if a
   *  factual description genuinely cannot be given. */
  alt: string;
  /** the following are used ONLY if actually supplied/verified — never fabricated */
  caption?: string;
  event?: string;
  year?: string;
  category?: string;
};

/* Administration Archive (design.md C9 / line 433) ------------------------- */

export type Administration = {
  /** session/year label, e.g. an official session string */
  session: string;
  director?: string;
  team?: { role: string; name: string }[];
  achievements?: string[];
  images?: ImageRef[];
};

/* Opportunities (design.md C10 / line 439) --------------------------------- */

export type OpportunityType =
  | "competition"
  | "scholarship"
  | "fellowship"
  | "internship"
  | "training"
  | "conference"
  | "call";

export type Opportunity = {
  slug: string;
  type: OpportunityType;
  title: string;
  summary: string;
  /** ISO deadline; open/closed derived from this vs today */
  deadline?: string;
  applyUrl?: string;
  /** open | closed — may be derived from deadline or set explicitly */
  status: "open" | "closed";
};

/* Partners (design.md C11 / line 445) — optional; section omitted if empty -- */

export type Partner = {
  name: string;
  logo: ImageRef;
  url?: string;
};

/* Site structure re-exported from content/site.ts (nav groups, wordmark). */
export type { NavItem, NavGroup } from "./site";
