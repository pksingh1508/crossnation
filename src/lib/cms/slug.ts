// Slugs of blog posts and news articles. No dependencies, so the middleware can use it too.

/** Old links can have capitals, spaces or %20 (e.g. /immigration-news/Schengen-Visa); slugs are lower case. */
export function canonicalSlug(slug: string) {
  let value = slug;
  try {
    value = decodeURIComponent(slug);
  } catch {
    // not URL-encoded: keep it as it is
  }
  return value.trim().toLowerCase();
}
