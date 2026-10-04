"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { CalendarDays } from "lucide-react";
import { formatDate } from "@/lib/cms/format";
import { useTranslations } from "@/hooks/useTranslations";
import { useReveal } from "@/hooks/useReveal";
import { fontInter } from "@/fonts";
import { delay, RISE_ON_REVEAL } from "@/lib/animation";
import { cn } from "@/lib/utils";
import { getLocalizedPath } from "@/lib/locale-paths";
import {
  articleStat,
  COLLECTIONS,
  type ArticleCardData,
  type Collection,
} from "./collections";

/**
 * Classes for a card that spans both columns of a two-column list (md to lg), with its
 * picture beside the text, so a list with an odd number of articles has no lone card.
 */
export const WIDE_AT_MD = {
  className: "md:max-lg:col-span-2",
  bodyClassName:
    "md:max-lg:grid md:max-lg:grid-cols-2 md:max-lg:items-center md:max-lg:gap-8",
  textClassName: "md:max-lg:mt-0",
};

interface ArticleCardProps {
  collection: Collection;
  article: ArticleCardData;
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
 * A blog post or news article in a list: picture, date and likes or views, title and
 * summary. The title's link covers the whole card, so the card is one click target but
 * screen readers just hear the title. The link's area reaches 12px past the card, so its
 * focus ring clears the card's corners. It rises into view, and its picture settles, when
 * it scrolls in.
 */
export function ArticleCard({
  collection,
  article,
  start = 0,
  sizes = "(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw",
  className,
  bodyClassName,
  textClassName,
}: ArticleCardProps) {
  const { path } = COLLECTIONS[collection];
  const locale = useLocale();
  const [ref, reveal] = useReveal<HTMLLIElement>();
  const date = formatDate(article.published_at, {
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
          {article.image_url && (
            <Image
              src={article.image_url}
              alt=""
              fill
              sizes={sizes}
              className="object-cover transition-[scale] duration-700 ease-out-quint reveal-waiting:scale-[1.12] reveal-shown:animate-settle motion-reduce:animate-none motion-safe:group-hover/post:scale-[1.04]"
            />
          )}
        </div>

        <div className={cn("mt-6", textClassName)}>
          <ArticleMeta collection={collection} article={article} date={date} />

          <h3 className="mt-3 line-clamp-3 text-xl leading-snug font-semibold text-neutral-950">
            <Link
              href={getLocalizedPath(locale, `${path}/${article.slug}`)}
              className="decoration-brand decoration-2 underline-offset-4 outline-none group-hover/post:underline after:absolute after:-inset-3 after:rounded-[2.25rem] focus-visible:after:ring-2 focus-visible:after:ring-neutral-950"
            >
              {article.title}
            </Link>
          </h3>

          {article.excerpt && (
            <p
              className={cn(
                "mt-3 line-clamp-2 leading-relaxed text-neutral-600",
                fontInter.className
              )}
            >
              {article.excerpt}
            </p>
          )}
        </div>
      </article>
    </li>
  );
}

interface ArticleMetaProps {
  collection: Collection;
  article: Pick<ArticleCardData, "published_at"> &
    ({ likes_count: number } | { views_count: number });
  /** The publish date as text */
  date: string;
  className?: string;
}

/** An article's date and its likes or views, in a small grey line */
export function ArticleMeta({
  collection,
  article,
  date,
  className,
}: ArticleMetaProps) {
  const t = useTranslations(COLLECTIONS[collection].namespace);
  const stat = articleStat(article);

  return (
    <p
      className={cn(
        "flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-neutral-500",
        fontInter.className,
        className
      )}
    >
      {date && article.published_at && (
        <span className="inline-flex items-center gap-1.5">
          <CalendarDays aria-hidden className="size-4" />
          <time dateTime={article.published_at}>{date}</time>
        </span>
      )}
      <span className="inline-flex items-center gap-1.5">
        <stat.icon aria-hidden className={cn("size-4", stat.iconClassName)} />
        <span className="sr-only">{t(stat.label)}:</span>
        {stat.count.toLocaleString("en-US")}
      </span>
    </p>
  );
}
