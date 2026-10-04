"use client";

import { useLocale } from "next-intl";
import type { BlogPostCard } from "@/lib/cms/types";
import { useTranslations } from "@/hooks/useTranslations";
import {
  ArticleRow,
  ArticleRowSkeleton,
} from "@/components/articles/ArticleRow";
import { getLocalizedPath } from "@/lib/locale-paths";

/** "Recent Blogs" and its link to the blog */
function useHeader() {
  const t = useTranslations("RecentBlogs");
  const locale = useLocale();
  return {
    title: t("heading"),
    link: { href: getLocalizedPath(locale, "/blog"), label: t("cta") },
  };
}

/** The newest blog posts, with a link to the blog. Used on several pages. */
export function RecentBlogList({ blogs }: { blogs: BlogPostCard[] }) {
  return <ArticleRow collection="blog" articles={blogs} {...useHeader()} />;
}

/** Shown while the posts stream in from the server, in the same layout */
export function RecentBlogSkeleton() {
  return <ArticleRowSkeleton {...useHeader()} />;
}
