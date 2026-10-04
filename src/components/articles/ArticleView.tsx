"use client";

import { useRef } from "react";
import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Clock } from "lucide-react";
import type { BlogPost, NewsArticle } from "@/lib/cms/types";
import { useTranslations } from "@/hooks/useTranslations";
import { WordReveal } from "@/components/ui/word-reveal";
import { StructuredData } from "@/components/seo/StructuredData";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { siteConfig } from "@/constants/site";
import { fontInter, fontPoppins } from "@/fonts";
import { delay, RISE_ON_REVEAL } from "@/lib/animation";
import { cn } from "@/lib/utils";
import {
  generateArticleSchema,
  organizationSchema,
} from "@/lib/seo/structuredData";
import { getLocalizedPath, getLocalizedUrl } from "@/lib/locale-paths";
import { ArticleRow } from "./ArticleRow";
import { ReadingProgress, ShareButtons } from "./ArticleTools";
import {
  articleStat,
  COLLECTIONS,
  type ArticleCardData,
  type Collection,
} from "./collections";

interface ArticleViewProps {
  collection: Collection;
  article: BlogPost | NewsArticle;
  /** The newest articles of the list; the others than this one are shown at the end */
  latest: ArticleCardData[];
  /** The publish date, formatted on the server so the browser renders the same text */
  publishedAt: string;
  readingMinutes: number;
}

/**
 * A blog post or news article: its header and cover, then the text in a narrow column
 * that's easy to read, with its tags and ways to share it; the latest other articles
 * follow. A yellow bar at the top of the window shows how far the text has been read.
 */
export function ArticleView({
  collection,
  article,
  latest,
  publishedAt,
  readingMinutes,
}: ArticleViewProps) {
  const { path, namespace, breadcrumb, more } = COLLECTIONS[collection];
  const t = useTranslations(namespace);
  const tMore = useTranslations(more.namespace);
  const locale = useLocale();
  const bodyRef = useRef<HTMLDivElement>(null);
  const url = getLocalizedUrl(locale, `${path}/${article.slug}`);
  const others = latest.filter(({ id }) => id !== article.id).slice(0, 3);
  const stat = articleStat(article);
  // News articles have no author of their own
  const author = ("author_name" in article && article.author_name) || null;

  const structuredData = [
    organizationSchema,
    generateArticleSchema(
      article.title,
      article.excerpt || article.title,
      article.published_at ?? article.created_at,
      article.updated_at,
      article.image_url ?? undefined,
      author ?? undefined
    ),
  ];

  const breadcrumbItems = [
    { name: breadcrumb, href: getLocalizedPath(locale, path) },
    {
      name: article.title,
      href: getLocalizedPath(locale, `${path}/${article.slug}`),
    },
  ];

  return (
    // fontPoppins.variable: the article's own headings use Poppins (see .cms-content)
    <div
      className={cn("bg-white", fontPoppins.className, fontPoppins.variable)}
    >
      <StructuredData data={structuredData} />
      <ReadingProgress target={bodyRef} />

      <div className="container mx-auto px-4 pt-6">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      <article>
        {/* The header and cover are on screen when the page opens, so shown from the start */}
        <header
          data-reveal="shown"
          className="mx-auto w-full max-w-3xl px-4 pt-10 sm:pt-14"
        >
          <p
            className={cn(
              "flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-neutral-500",
              fontInter.className,
              RISE_ON_REVEAL
            )}
          >
            {publishedAt && (
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays aria-hidden className="size-4" />
                <time dateTime={article.published_at ?? undefined}>
                  {publishedAt}
                </time>
              </span>
            )}
            <span className="inline-flex items-center gap-1.5">
              <Clock aria-hidden className="size-4" />
              {t("minRead", { minutes: readingMinutes })}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <stat.icon
                aria-hidden
                className={cn("size-4", stat.iconClassName)}
              />
              <span className="sr-only">{t(stat.label)}:</span>
              {stat.count.toLocaleString("en-US")}
            </span>
          </p>

          <h1 className="mt-5 text-[min(2.25rem,9vw)] leading-[1.1] font-semibold tracking-tight text-balance text-neutral-950 sm:text-5xl">
            <WordReveal
              text={article.title}
              delay={100}
              stagger={40}
              className="reveal-shown:animate-word motion-reduce:animate-none"
            />
          </h1>

          {article.excerpt && (
            <p
              className={cn(
                "mt-6 text-lg leading-relaxed text-neutral-600 sm:text-xl",
                fontInter.className,
                RISE_ON_REVEAL
              )}
              style={delay(400)}
            >
              {article.excerpt}
            </p>
          )}

          <div
            className={cn(
              "mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-neutral-200 py-4",
              RISE_ON_REVEAL
            )}
            style={delay(500)}
          >
            <p className="flex items-center gap-3 text-sm font-semibold text-neutral-950">
              <Image
                src="/EU-logo.jpeg"
                alt=""
                width={135}
                height={48}
                className="h-8 w-auto rounded-md"
              />
              {author ?? siteConfig.name}
            </p>
            <ShareButtons
              collection={collection}
              title={article.title}
              url={url}
            />
          </div>
        </header>

        {article.image_url && (
          <div
            data-reveal="shown"
            className="mx-auto mt-10 w-full max-w-5xl px-4 sm:mt-12"
          >
            {/* The frame wipes open while the picture settles from a slight zoom. It has the
                picture's own shape and is never wider than the picture, so a small
                screenshot stays sharp instead of being blown up. */}
            <div
              className="relative mx-auto aspect-video overflow-hidden rounded-[2rem] bg-neutral-100 ring-1 ring-black/5 reveal-shown:animate-reveal motion-reduce:animate-none"
              style={{
                ...delay(300),
                ...(article.image_width &&
                  article.image_height && {
                    maxWidth: article.image_width,
                    aspectRatio: `${article.image_width} / ${article.image_height}`,
                  }),
              }}
            >
              <Image
                src={article.image_url}
                alt={article.image_alt || article.title}
                fill
                preload
                sizes="(min-width: 1024px) 992px, 100vw"
                className="object-cover reveal-shown:animate-settle motion-reduce:animate-none"
                style={delay(300)}
              />
            </div>
          </div>
        )}

        <div
          ref={bodyRef}
          className="mx-auto w-full max-w-3xl px-4 pt-12 pb-20 sm:pt-16"
        >
          {/* The CMS cleaned this HTML against an allowlist when it was saved, so it is inserted as it is */}
          <div
            className={cn("cms-content", fontInter.className)}
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {article.tags.length > 0 && (
            <ul
              aria-label={t("tags")}
              className={cn("mt-12 flex flex-wrap gap-2", fontInter.className)}
            >
              {article.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full bg-neutral-100 px-3 py-1.5 text-sm text-neutral-700"
                >
                  #{tag}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-neutral-200 pt-8">
            <Link
              href={getLocalizedPath(locale, path)}
              className="group/back inline-flex items-center gap-2 rounded-sm font-semibold text-neutral-950 underline decoration-brand decoration-2 underline-offset-[6px] transition-[text-decoration-color] duration-300 outline-none hover:decoration-neutral-950 focus-visible:ring-2 focus-visible:ring-neutral-950"
            >
              <ArrowLeft
                aria-hidden
                className="size-4 transition-transform duration-300 ease-out-quint group-hover/back:-translate-x-1"
              />
              {t("backToList")}
            </Link>
            <ShareButtons
              collection={collection}
              title={article.title}
              url={url}
            />
          </div>
        </div>
      </article>

      {/* The latest other articles, with a link to the list */}
      {others.length > 0 && (
        <div className="border-t border-neutral-200">
          <ArticleRow
            collection={collection}
            articles={others}
            title={tMore(more.heading)}
            link={{
              href: getLocalizedPath(locale, path),
              label: tMore(more.link),
            }}
          />
        </div>
      )}
    </div>
  );
}
