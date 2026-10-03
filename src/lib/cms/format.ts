// Display helpers for CMS content. Safe to import in client components.

/**
 * CMS timestamps are UTC. Formatting them in one fixed time zone makes the text rendered on
 * the server the same as the text rendered in the browser, whatever the visitor's time zone.
 */
const TIME_ZONE = "Europe/Warsaw";

/** e.g. formatDate(post.published_at, { month: "short", day: "numeric", year: "numeric" }) → "Jun 3, 2026" */
export function formatDate(
  iso: string | null | undefined,
  options: Intl.DateTimeFormatOptions
) {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-US", {
    ...options,
    timeZone: TIME_ZONE,
  }).format(date);
}

/** Minutes to read an HTML article, at about 220 words a minute. */
export function readingMinutes(html: string) {
  const words = html
    .replace(/<[^>]+>/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}
