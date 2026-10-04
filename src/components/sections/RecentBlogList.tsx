"use client";

import type { ReactNode } from "react";
import { useLocale } from "next-intl";
import type { BlogPostCard } from "@/lib/cms/types";
import { useTranslations } from "@/hooks/useTranslations";
import { SectionHeader } from "@/components/ui/section-header";
import { BlogCard, WIDE_AT_MD } from "@/components/blogs/BlogCard";
import { fontPoppins } from "@/fonts";
import { cn } from "@/lib/utils";
import { getLocalizedPath } from "@/lib/locale-paths";

interface RecentBlogListProps {
  blogs: BlogPostCard[];
}

/** The newest blog posts, with a link to the blog. Used on several pages. */
export function RecentBlogList({ blogs }: RecentBlogListProps) {
  if (blogs.length === 0) return null;

  return (
    <BlogSection>
      {blogs.map((blog, index) => (
        // From md to lg the newest post spans both columns, so the three posts don't
        // leave a lone card in the second row
        <BlogCard
          key={blog.id}
          blog={blog}
          start={index * 120}
          {...(index === 0 ? WIDE_AT_MD : {})}
        />
      ))}
    </BlogSection>
  );
}

/** Shown while the posts stream in from the server, in the same layout */
export function RecentBlogSkeleton() {
  return (
    <BlogSection>
      {[0, 1, 2].map((index) => {
        const wide = index === 0;
        return (
          <li
            key={index}
            aria-hidden
            className={cn("animate-pulse", wide && WIDE_AT_MD.className)}
          >
            <div className={cn(wide && WIDE_AT_MD.bodyClassName)}>
              <div className="aspect-video rounded-3xl bg-neutral-100" />
              <div
                className={cn(
                  "mt-6 space-y-3",
                  wide && WIDE_AT_MD.textClassName
                )}
              >
                <div className="h-4 w-40 rounded-full bg-neutral-100" />
                <div className="h-6 w-11/12 rounded-full bg-neutral-100" />
                <div className="h-6 w-2/3 rounded-full bg-neutral-100" />
              </div>
            </div>
          </li>
        );
      })}
    </BlogSection>
  );
}

function BlogSection({ children }: { children: ReactNode }) {
  const t = useTranslations("RecentBlogs");
  const locale = useLocale();

  return (
    <section className={cn("bg-white py-20 sm:py-24", fontPoppins.className)}>
      <div className="mx-auto w-full max-w-7xl px-4">
        <SectionHeader
          title={t("heading")}
          link={{ href: getLocalizedPath(locale, "/blog"), label: t("cta") }}
        />
        <ul className="mt-10 grid gap-x-6 gap-y-14 sm:mt-12 md:grid-cols-2 lg:grid-cols-3">
          {children}
        </ul>
      </div>
    </section>
  );
}
