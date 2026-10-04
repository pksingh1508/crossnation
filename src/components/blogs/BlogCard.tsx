"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { CalendarDays, Heart } from "lucide-react";
import type { BlogPostCard } from "@/lib/cms/types";
import { formatDate } from "@/lib/cms/format";
import { useTranslations } from "@/hooks/useTranslations";
import { useReveal } from "@/hooks/useReveal";
import { fontInter } from "@/fonts";
import { delay, RISE_ON_REVEAL } from "@/lib/animation";
import { cn } from "@/lib/utils";
import { getLocalizedPath } from "@/lib/locale-paths";

/**
 * Classes for a card that spans both columns of a two-column list (md to lg), with its
 * picture beside the text, so a list with an odd number of posts has no lone card.
 */
export const WIDE_AT_MD = {
  className: "md:max-lg:col-span-2",
  bodyClassName:
    "md:max-lg:grid md:max-lg:grid-cols-2 md:max-lg:items-center md:max-lg:gap-8",
  textClassName: "md:max-lg:mt-0",
};

interface BlogCardProps {
  blog: BlogPostCard;
  /** When its entrance starts after it comes into view, in ms */
  start?: number;
  /** The picture's sizes attribute, for the layout the card is in */
  sizes?: string;
  /** Extra classes: on the list item, on the card, and on the text below the picture */
  className?: string;
  bodyClassName?: string;
  textClassName?: string;
}

/**
 * A blog post in a list: picture, date and likes, title and summary. The title's link
 * covers the whole card, so the card is one click target but screen readers just hear the
 * title. The link's area reaches 12px past the card, so its focus ring clears the card's
 * corners. It rises into view, and its picture settles, when it scrolls in.
 */
export function BlogCard({
  blog,
  start = 0,
  sizes = "(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw",
  className,
  bodyClassName,
  textClassName,
}: BlogCardProps) {
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
      className={cn(RISE_ON_REVEAL, className)}
      style={delay(start)}
    >
      <article className={cn("group/post relative", bodyClassName)}>
        <div className="relative aspect-video overflow-hidden rounded-3xl bg-neutral-100 ring-1 ring-black/5">
          {blog.image_url && (
            <Image
              src={blog.image_url}
              alt=""
              fill
              sizes={sizes}
              className="object-cover transition-[scale] duration-700 ease-out-quint reveal-waiting:scale-[1.12] reveal-shown:animate-settle motion-reduce:animate-none motion-safe:group-hover/post:scale-[1.04]"
            />
          )}
        </div>

        <div className={cn("mt-6", textClassName)}>
          <PostMeta
            date={date}
            publishedAt={blog.published_at}
            likes={blog.likes_count}
            likesLabel={t("totalLikes")}
          />

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

interface PostMetaProps {
  date: string;
  publishedAt: string | null;
  likes: number;
  /** Read out before the number, e.g. "Total Likes:" */
  likesLabel: string;
  className?: string;
}

/** A post's date and likes, in a small grey line */
export function PostMeta({
  date,
  publishedAt,
  likes,
  likesLabel,
  className,
}: PostMetaProps) {
  return (
    <p
      className={cn(
        "flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-neutral-500",
        fontInter.className,
        className
      )}
    >
      {date && publishedAt && (
        <span className="inline-flex items-center gap-1.5">
          <CalendarDays aria-hidden className="size-4" />
          <time dateTime={publishedAt}>{date}</time>
        </span>
      )}
      <span className="inline-flex items-center gap-1.5">
        <Heart aria-hidden className="size-4 fill-red-500 text-red-500" />
        <span className="sr-only">{likesLabel}:</span>
        {likes.toLocaleString("en-US")}
      </span>
    </p>
  );
}
