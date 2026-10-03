import type { Tables } from "./database.types";

// Row types of the CMS tables. Safe to import in client components.

export type BlogPost = Tables<"eu_blog">;
export type NewsArticle = Tables<"eu_news">;
export type SuccessStory = Tables<"eu_success_stories">;
export type Testimonial = Tables<"eu_testimonials">;
export type WorkPermit = Tables<"eu_work_permits">;
export type VisaStamp = Tables<"eu_visa_stamps">;

/** One page of a list, as returned by the queries and by /api/cms/[collection]. */
export type Page<T> = {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
  pageCount: number;
};

/** The columns the lists select: everything except the article body and the SEO fields. */
export type BlogPostCard = Pick<
  BlogPost,
  | "id"
  | "title"
  | "slug"
  | "excerpt"
  | "image_url"
  | "image_alt"
  | "image_width"
  | "image_height"
  | "author_name"
  | "tags"
  | "likes_count"
  | "comments_count"
  | "published_at"
>;

export type NewsArticleCard = Pick<
  NewsArticle,
  | "id"
  | "title"
  | "slug"
  | "excerpt"
  | "image_url"
  | "image_alt"
  | "image_width"
  | "image_height"
  | "tags"
  | "views_count"
  | "published_at"
>;

export type SuccessStoryCard = Pick<
  SuccessStory,
  | "id"
  | "name"
  | "story"
  | "image_url"
  | "image_alt"
  | "image_width"
  | "image_height"
  | "video_url"
  | "published_at"
>;

export type TestimonialCard = Pick<
  Testimonial,
  | "id"
  | "name"
  | "quote"
  | "image_url"
  | "image_alt"
  | "image_width"
  | "image_height"
  | "views_count"
  | "published_at"
>;

/** A work permit or visa stamp: both tables have the same columns. */
export type GalleryImage = Pick<
  WorkPermit,
  | "id"
  | "image_url"
  | "image_alt"
  | "image_width"
  | "image_height"
  | "country"
  | "caption"
  | "published_at"
>;
