import { Eye, Heart, type LucideIcon } from "lucide-react";
import type { BlogPostCard, NewsArticleCard } from "@/lib/cms/types";

/** The CMS lists with pages of their own: the blog and the immigration news */
export type Collection = "blog" | "news";

/** An item in either list */
export type ArticleCardData = BlogPostCard | NewsArticleCard;

interface CollectionSettings {
  /** Where the list is; an article is at path/slug */
  path: string;
  /** Its pages' translations. Both have the same keys: title, heading, count, share … */
  namespace: "blogsPage" | "immigrationPage";
  /** The list's name in the breadcrumbs (the breadcrumbs are in English) */
  breadcrumb: string;
  /** The heading and link above the other articles at the end of an article */
  more: {
    namespace: "RecentBlogs" | "ImmigrationNews";
    heading: string;
    link: string;
  };
}

export const COLLECTIONS: Record<Collection, CollectionSettings> = {
  blog: {
    path: "/blog",
    namespace: "blogsPage",
    breadcrumb: "Blog",
    more: { namespace: "RecentBlogs", heading: "heading", link: "cta" },
  },
  news: {
    path: "/immigration-news",
    namespace: "immigrationPage",
    breadcrumb: "Immigration News",
    more: { namespace: "ImmigrationNews", heading: "latest", link: "cta" },
  },
};

/** The number shown with an article: a blog post's likes, a news article's views */
export function articleStat(
  article: { likes_count: number } | { views_count: number }
): {
  count: number;
  /** Its name for screen readers, a key in the collection's translations */
  label: "totalLikes" | "totalViews";
  icon: LucideIcon;
  iconClassName: string;
} {
  return "likes_count" in article
    ? {
        count: article.likes_count,
        label: "totalLikes",
        icon: Heart,
        iconClassName: "fill-red-500 text-red-500",
      }
    : {
        count: article.views_count,
        label: "totalViews",
        icon: Eye,
        iconClassName: "text-neutral-500",
      };
}
