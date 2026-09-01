/*
 * Content-display helpers (production polish).
 *
 * The content/data layer intentionally holds development placeholders like
 * "[NEEDS CONTENT] — …" and "[OFFICIAL NAME]" so the CMS-ready data shape is
 * visible during development. Those markers must NEVER reach the public UI.
 * These helpers detect a placeholder value so components can render a designed
 * empty state instead — without fabricating any organisational content.
 */

/** True when a value is missing or is a development placeholder marker. */
export function isPlaceholder(value: string | undefined | null): boolean {
  if (!value) return true;
  const v = value.trim();
  return v === "" || v.startsWith("[") || v.includes("[NEEDS CONTENT]") || v.includes("[OFFICIAL");
}

/** Returns the real value, or undefined when it is a placeholder/empty. */
export function realOr<T extends string>(value: T | undefined | null): T | undefined {
  return isPlaceholder(value ?? undefined) ? undefined : (value as T);
}
