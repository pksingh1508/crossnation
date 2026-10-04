import "server-only";
import { getLocalizedPath } from "@/lib/locale-paths";
import { cleanSearch } from "./queries";

// The address of a page of a CMS list (blog, news, success stories): ?page=2&q=permit

export type ListSearchParams = {
  page?: string | string[];
  q?: string | string[];
};

/** The page number (1 when missing or not a number) and the cleaned search term */
export function readListParams(searchParams: ListSearchParams = {}) {
  const first = (value?: string | string[]) =>
    (Array.isArray(value) ? value[0] : value) ?? "";
  return {
    page: Math.max(1, Math.trunc(Number(first(searchParams.page))) || 1),
    query: cleanSearch(first(searchParams.q)),
  };
}

/** e.g. listHref("pl", "/blog", 2, "visa") → "/pl/blog?q=visa&page=2" */
export function listHref(
  lang: string,
  path: string,
  page: number,
  query: string
) {
  const params = new URLSearchParams();
  if (query) params.set("q", query);
  if (page > 1) params.set("page", String(page));
  const search = params.toString();
  return `${getLocalizedPath(lang, path)}${search ? `?${search}` : ""}`;
}
