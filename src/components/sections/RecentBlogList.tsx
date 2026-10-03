"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { CalendarDays, Heart } from "lucide-react";
import type { BlogPostCard } from "@/lib/cms/types";
import { formatDate } from "@/lib/cms/format";
import { useTranslations } from "@/hooks/useTranslations";
import { useReveal } from "@/hooks/useReveal";
import { SectionHeader } from "@/components/ui/section-header";
import { fontInter, fontPoppins } from "@/fonts";
import { delay, RISE_ON_REVEAL } from "@/lib/animation";
import { cn } from "@/lib/utils";
import { getLocalizedPath } from "@/lib/locale-paths";

// From md to lg the newest post spans both columns with its picture beside the text, so
// the three posts don't leave a lone card in the second row
const FEATURED = {
  item: "md:max-lg:col-span-2",
  body: "md:max-lg:grid md:max-lg:grid-cols-2 md:max-lg:items-center md:max-lg:gap-8",
  text: "md:max-lg:mt-0",
};

interface RecentBlogListProps {
  blogs: BlogPostCard[];
}

/** The newest blog posts, with a link to the blog. Used on several pages. */
export function RecentBlogList({ blogs }: RecentBlogListProps) {
  if (blogs.length === 0) return null;

  return (
    <BlogSection>
      {blogs.map((blog, index) => (
        <PostCard
          key={blog.id}
          blog={blog}
          start={index * 120}
          featured={index === 0}
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
        const featured = index === 0;
        return (
          <li
            key={index}
            aria-hidden
            className={cn("animate-pulse", featured && FEATURED.item)}
          >
            <div className={cn(featured && FEATURED.body)}>
              <div className="aspect-video rounded-3xl bg-neutral-100" />
              <div className={cn("mt-6 space-y-3", featured && FEATURED.text)}>
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

interface PostCardProps {
  blog: BlogPostCard;
  /** When its entrance starts after it comes into view, in ms */
  start: number;
  featured: boolean;
}

/**
 * A post: picture, date and likes, title and summary. The title's link covers the whole
 * card, so the card is one click target but screen readers just hear the title. The
 * link's area reaches 12px past the card, so its focus ring clears the card's corners.
 */
function PostCard({ blog, start, featured }: PostCardProps) {
  const t = useTranslations("blogsPage");
  const locale = useLocale();
  const [ref, reveal] = useReveal<HTMLLIElement>();
  const date = formatDate(blog.published_at, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <li
      ref={ref}
      data-reveal={reveal}
      className={cn(featured && FEATURED.item, RISE_ON_REVEAL)}
      style={delay(start)}
    >
      <article className={cn("group/post relative", featured && FEATURED.body)}>
        <div className="relative aspect-video overflow-hidden rounded-3xl bg-neutral-100 ring-1 ring-black/5">
          {blog.image_url && (
            <Image
              src={blog.image_url}
              alt=""
              fill
              sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
              className="object-cover transition-[scale] duration-700 ease-out-quint reveal-waiting:scale-[1.12] reveal-shown:animate-settle motion-reduce:animate-none motion-safe:group-hover/post:scale-[1.04]"
            />
          )}
        </div>

        <div className={cn("mt-6", featured && FEATURED.text)}>
          <p
            className={cn(
              "flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-neutral-500",
              fontInter.className
            )}
          >
            {date && blog.published_at && (
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays aria-hidden className="size-4" />
                <time dateTime={blog.published_at}>{date}</time>
              </span>
            )}
            <span className="inline-flex items-center gap-1.5">
              <Heart aria-hidden className="size-4 fill-red-500 text-red-500" />
              <span className="sr-only">{t("totalLikes")}:</span>
              {blog.likes_count.toLocaleString("en-US")}
            </span>
          </p>

          <h3 className="mt-3 line-clamp-3 text-xl leading-snug font-semibold text-neutral-950">
            <Link
              href={getLocalizedPath(locale, `/blog/${blog.slug}`)}
              className="decoration-brand decoration-2 underline-offset-4 outline-none group-hover/post:underline after:absolute after:-inset-3 after:rounded-[2.25rem] focus-visible:after:ring-2 focus-visible:after:ring-neutral-950"
            >
              {blog.title}
            </Link>
          </h3>

          {blog.excerpt && (
            <p
              className={cn(
                "mt-3 line-clamp-2 leading-relaxed text-neutral-600",
                fontInter.className
              )}
            >
              {blog.excerpt}
            </p>
          )}
        </div>
      </article>
    </li>
  );
}
