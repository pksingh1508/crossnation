"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { CalendarDays, Eye } from "lucide-react";
import type { NewsArticleCard } from "@/lib/cms/types";
import { formatDate } from "@/lib/cms/format";
import { useTranslations } from "@/hooks/useTranslations";
import { useReveal } from "@/hooks/useReveal";
import { SectionHeader } from "@/components/ui/section-header";
import { fontInter, fontPoppins } from "@/fonts";
import { RISE_ON_REVEAL } from "@/lib/animation";
import { cn } from "@/lib/utils";
import { getLocalizedPath } from "@/lib/locale-paths";
import { SomeFAQ } from "./SomeFAQ";

interface ImmigrationNewsProps {
  news: NewsArticleCard[];
}

/** The latest immigration news beside the FAQ. Without news, the FAQ stands alone. */
export function ImmigrationNews({ news }: ImmigrationNewsProps) {
  if (news.length === 0) {
    return (
      <div className={cn("bg-white py-20 sm:py-24", fontPoppins.className)}>
        <div className="mx-auto w-full max-w-3xl px-4">
          <SomeFAQ />
        </div>
      </div>
    );
  }

  return (
    <NewsLayout>
      <ol className="divide-y divide-neutral-200">
        {news.map((article) => (
          <NewsItem key={article.id} article={article} />
        ))}
      </ol>
    </NewsLayout>
  );
}

/** Shown while the news streams in from the server, in the same layout */
export function ImmigrationNewsSkeleton() {
  return (
    <NewsLayout>
      <ol aria-hidden className="divide-y divide-neutral-200">
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <li
            key={index}
            className="flex animate-pulse items-start gap-5 py-6 first:pt-0 last:pb-0 sm:gap-8"
          >
            <div className="min-w-0 flex-1 space-y-3">
              <div className="h-4 w-3/5 rounded-full bg-neutral-100" />
              <div className="h-5 w-11/12 rounded-full bg-neutral-100" />
              <div className="h-5 w-2/3 rounded-full bg-neutral-100" />
            </div>
            <div className="aspect-[4/3] w-24 shrink-0 rounded-2xl bg-neutral-100 sm:w-32" />
          </li>
        ))}
      </ol>
    </NewsLayout>
  );
}

/** The section heading over two columns: the news (passed in) and the FAQ */
function NewsLayout({ children }: { children: ReactNode }) {
  const t = useTranslations("ImmigrationNews");
  const locale = useLocale();

  return (
    <div className={cn("bg-white py-20 sm:py-24", fontPoppins.className)}>
      <div className="mx-auto w-full max-w-7xl px-4">
        <SectionHeader
          title={t("heading")}
          link={{
            href: getLocalizedPath(locale, "/immigration-news"),
            label: t("cta"),
          }}
        />
        <div className="mt-10 grid grid-cols-1 items-start gap-14 sm:mt-12 lg:grid-cols-[7fr_5fr] lg:gap-12 xl:gap-16">
          {children}
          <SomeFAQ />
        </div>
      </div>
    </div>
  );
}

/**
 * One article: date and views, headline and summary, with a thumbnail at the right. The
 * headline's link covers the whole row, so the row is one click target.
 */
function NewsItem({ article }: { article: NewsArticleCard }) {
  const t = useTranslations("ImmigrationNews");
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
      className={cn("py-6 first:pt-0 last:pb-0", RISE_ON_REVEAL)}
    >
      {/* The thumbnail comes first, so the headline link's overlay (painted after it)
          covers it too; the reversed row still shows it at the right */}
      <article className="group/news relative flex flex-row-reverse items-start gap-5 sm:gap-8">
        <div className="relative aspect-[4/3] w-24 shrink-0 overflow-hidden rounded-2xl bg-neutral-100 ring-1 ring-black/5 sm:w-32">
          {article.image_url && (
            <Image
              src={article.image_url}
              alt=""
              fill
              sizes="(min-width: 640px) 128px, 96px"
              className="object-cover transition-[scale] duration-700 ease-out-quint motion-safe:group-hover/news:scale-[1.06]"
            />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p
            className={cn(
              "flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-neutral-500",
              fontInter.className
            )}
          >
            {date && article.published_at && (
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays aria-hidden className="size-4" />
                <time dateTime={article.published_at}>{date}</time>
              </span>
            )}
            <span className="inline-flex items-center gap-1.5">
              <Eye aria-hidden className="size-4" />
              {t("views", { count: article.views_count })}
            </span>
          </p>

          <h3 className="mt-2 line-clamp-3 text-base leading-snug font-semibold text-neutral-950 sm:line-clamp-2 sm:text-lg">
            <Link
              href={getLocalizedPath(
                locale,
                `/immigration-news/${article.slug}`
              )}
              className="decoration-brand decoration-2 underline-offset-4 outline-none group-hover/news:underline after:absolute after:-inset-3 after:rounded-[1.75rem] focus-visible:after:ring-2 focus-visible:after:ring-neutral-950"
            >
              {article.title}
            </Link>
          </h3>

          {/* On phones the headline alone keeps the list short */}
          {article.excerpt && (
            <p
              className={cn(
                "mt-2 line-clamp-2 leading-relaxed text-neutral-600 max-sm:hidden",
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
