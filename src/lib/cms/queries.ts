import "server-only";
import type { PostgrestError } from "@supabase/supabase-js";
import { cache } from "react";
import { cms } from "./client";
import type {
  BlogPost,
  BlogPostCard,
  GalleryImage,
  NewsArticle,
  NewsArticleCard,
  Page,
  SuccessStoryCard,
  TestimonialCard,
} from "./types";

// The database only ever returns published items whose publish date has passed. The status
// filter below makes that visible in the code and uses the index. Content is the same in
// every language: the CMS has no locales.

type ListResult<T> = {
  data: T[] | null;
  count: number | null;
  error: PostgrestError | null;
};

/** One page of a list. A page past the end comes back empty (Supabase answers it with 416 / PGRST103). */
async function paged<T>(
  page: number,
  pageSize: number,
  query: (from: number, to: number) => PromiseLike<ListResult<T>>
): Promise<Page<T>> {
  const size = Math.min(Math.max(Math.trunc(pageSize) || 10, 1), 50);
  const current = Math.max(Math.trunc(page) || 1, 1);
  const from = (current - 1) * size;
  const { data, count, error } = await query(from, from + size - 1);
  if (error && error.code !== "PGRST103") throw error;
  const total = count ?? 0;
  return {
    items: data ?? [],
    page: current,
    pageSize: size,
    total,
    pageCount: Math.ceil(total / size),
  };
}

// Blog

const BLOG_CARD =
  "id, title, slug, excerpt, image_url, image_alt, image_width, image_height, author_name, tags, likes_count, comments_count, published_at";

/**
 * A search term that is safe inside a PostgREST filter: commas and brackets would end the
 * filter early, and %, _ and * are wildcards. They become spaces. Capped at 100 characters.
 */
export function cleanSearch(search: string | undefined) {
  return (search ?? "")
    .replace(/[,()%_*\\"]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 100);
}

/**
 * Newest first. getBlogPosts(1, 3) gives the three latest posts. With a search term, only
 * the posts whose title or summary contains it (case-insensitive).
 */
export function getBlogPosts(
  page = 1,
  pageSize = 10,
  search?: string
): Promise<Page<BlogPostCard>> {
  const term = cleanSearch(search);
  return paged(page, pageSize, (from, to) => {
    let query = cms
      .from("eu_blog")
      .select(BLOG_CARD, { count: "exact" })
      .eq("status", "published");
    if (term) {
      query = query.or(`title.ilike.%${term}%,excerpt.ilike.%${term}%`);
    }
    return query.order("published_at", { ascending: false }).range(from, to);
  });
}

/** One post, or null (unknown slug, or not published). cache() lets generateMetadata and the page share it. */
export const getBlogPost = cache(
  async (slug: string): Promise<BlogPost | null> => {
    const { data, error } = await cms
      .from("eu_blog")
      .select("*")
      .eq("status", "published")
      .eq("slug", slug)
      .maybeSingle();
    if (error) throw error;
    return data;
  }
);

// News

const NEWS_CARD =
  "id, title, slug, excerpt, image_url, image_alt, image_width, image_height, tags, views_count, published_at";

/** Newest first; with a search term, like getBlogPosts. */
export function getNewsArticles(
  page = 1,
  pageSize = 10,
  search?: string
): Promise<Page<NewsArticleCard>> {
  const term = cleanSearch(search);
  return paged(page, pageSize, (from, to) => {
    let query = cms
      .from("eu_news")
      .select(NEWS_CARD, { count: "exact" })
      .eq("status", "published");
    if (term) {
      query = query.or(`title.ilike.%${term}%,excerpt.ilike.%${term}%`);
    }
    return query.order("published_at", { ascending: false }).range(from, to);
  });
}

export const getNewsArticle = cache(
  async (slug: string): Promise<NewsArticle | null> => {
    const { data, error } = await cms
      .from("eu_news")
      .select("*")
      .eq("status", "published")
      .eq("slug", slug)
      .maybeSingle();
    if (error) throw error;
    return data;
  }
);

// Success stories and testimonials (no pages of their own, so no slug)

export function getSuccessStories(
  page = 1,
  pageSize = 10
): Promise<Page<SuccessStoryCard>> {
  return paged(page, pageSize, (from, to) =>
    cms
      .from("eu_success_stories")
      .select(
        "id, name, story, image_url, image_alt, image_width, image_height, video_url, published_at",
        { count: "exact" }
      )
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .range(from, to)
  );
}

/** Newest first; with a search term, only those whose name or words contain it. */
export function getTestimonials(
  page = 1,
  pageSize = 10,
  search?: string
): Promise<Page<TestimonialCard>> {
  const term = cleanSearch(search);
  return paged(page, pageSize, (from, to) => {
    let query = cms
      .from("eu_testimonials")
      .select(
        "id, name, quote, image_url, image_alt, image_width, image_height, views_count, published_at",
        { count: "exact" }
      )
      .eq("status", "published");
    if (term) {
      query = query.or(`name.ilike.%${term}%,quote.ilike.%${term}%`);
    }
    return query.order("published_at", { ascending: false }).range(from, to);
  });
}

// Image galleries

const GALLERY =
  "id, image_url, image_alt, image_width, image_height, country, caption, published_at";

export function getWorkPermits(
  page = 1,
  pageSize = 20
): Promise<Page<GalleryImage>> {
  return paged(page, pageSize, (from, to) =>
    cms
      .from("eu_work_permits")
      .select(GALLERY, { count: "exact" })
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .range(from, to)
  );
}

export function getVisaStamps(
  page = 1,
  pageSize = 20
): Promise<Page<GalleryImage>> {
  return paged(page, pageSize, (from, to) =>
    cms
      .from("eu_visa_stamps")
      .select(GALLERY, { count: "exact" })
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .range(from, to)
  );
}

/**
 * A whole gallery, newest first, for its page: it holds a few dozen documents, which the
 * page filters and steps through in the browser. Capped, in case it ever grows very large.
 */
const GALLERY_LIMIT = 500;

export async function getAllWorkPermits(): Promise<GalleryImage[]> {
  const { data, error } = await cms
    .from("eu_work_permits")
    .select(GALLERY)
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(GALLERY_LIMIT);
  if (error) throw error;
  return data;
}

export async function getAllVisaStamps(): Promise<GalleryImage[]> {
  const { data, error } = await cms
    .from("eu_visa_stamps")
    .select(GALLERY)
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(GALLERY_LIMIT);
  if (error) throw error;
  return data;
}

// Sitemap

/** Every published post and article, with the date it last changed. */
export async function getSitemapEntries() {
  const [blog, news] = await Promise.all([
    cms.from("eu_blog").select("slug, updated_at").eq("status", "published"),
    cms.from("eu_news").select("slug, updated_at").eq("status", "published"),
  ]);
  if (blog.error) throw blog.error;
  if (news.error) throw news.error;
  return { blog: blog.data, news: news.data };
}
