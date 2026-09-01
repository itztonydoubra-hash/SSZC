/* Shared date helpers (design.md C6/C7/C10). No fabrication — formats supplied
 * ISO dates only. Upcoming/open derived by comparing to `now`. */

export function fmtDate(iso: string, opts?: Intl.DateTimeFormatOptions): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(
    "en-GB",
    opts ?? { day: "2-digit", month: "short", year: "numeric" },
  );
}

export function isFuture(iso: string, now = new Date()): boolean {
  const d = new Date(iso);
  return !Number.isNaN(d.getTime()) && d.getTime() >= now.getTime();
}

/** deadline within `days` from now (for "closing soon" crimson). */
export function isSoon(iso: string, days = 14, now = new Date()): boolean {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return false;
  const diff = d.getTime() - now.getTime();
  return diff >= 0 && diff <= days * 86_400_000;
}
