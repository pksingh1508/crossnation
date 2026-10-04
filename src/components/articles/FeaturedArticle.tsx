"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/cms/format";
import { useTranslations } from "@/hooks/useTranslations";
import { fontInter } from "@/fonts";
import { delay, RISE_ON_REVEAL } from "@/lib/animation";
import { cn } from "@/lib/utils";
import { getLocalizedPath } from "@/lib/locale-paths";
import { ArticleMeta } from "./ArticleCard";
import {
  COLLECTIONS,
  type ArticleCardData,
  type Collection,
} from "./collections";

interface FeaturedArticleProps {
  collection: Collection;
  article: ArticleCardData;
}

/**
 * The first article of a page of a list, large: picture beside the text from lg up. Like
 * the cards, the title's link covers it all. Put it in a shown reveal block: it comes in
 * whenever it appears, as the page opens and after a change of page.
 */
export function FeaturedArticle({ collection, article }: FeaturedArticleProps) {
  const { path, namespace } = COLLECTIONS[collection];
  const t = useTranslations(namespace);
  const locale = useLocale();
  const date = formatDate(article.published_at, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article className="group/post relative grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
      {/* The frame wipes open while the picture settles from a slight zoom */}
      <div
        className="relative aspect-video overflow-hidden rounded-[2rem] bg-neutral-100 ring-1 ring-black/5 reveal-shown:animate-reveal motion-reduce:animate-none lg:col-span-7"
        style={delay(150)}
      >
        {article.image_url && (
          <Image
            src={article.image_url}
            alt=""
            fill
            preload
            sizes="(min-width: 1280px) 720px, (min-width: 1024px) 58vw, 100vw"
            className="object-cover transition-[scale] duration-700 ease-out-quint reveal-shown:animate-settle motion-reduce:animate-none motion-safe:group-hover/post:scale-[1.03]"
            style={delay(150)}
          />
        )}
      </div>

      <div className="lg:col-span-5">
        <div className={RISE_ON_REVEAL} style={delay(350)}>
          <ArticleMeta collection={collection} article={article} date={date} />
        </div>

        <h2
          className={cn(
            "mt-4 text-[min(1.875rem,8vw)] leading-[1.15] font-semibold tracking-tight text-balance text-neutral-950 sm:text-4xl",
            RISE_ON_REVEAL
          )}
          style={delay(420)}
        >
          <Link
            href={getLocalizedPath(locale, `${path}/${article.slug}`)}
            className="decoration-brand decoration-2 underline-offset-[6px] outline-none group-hover/post:underline after:absolute after:-inset-3 after:rounded-[2.5rem] focus-visible:after:ring-2 focus-visible:after:ring-neutral-950"
          >
            {article.title}
          </Link>
        </h2>

        {article.excerpt && (
          <p
            className={cn(
              "mt-4 line-clamp-4 leading-relaxed text-neutral-600 sm:text-lg",
              fontInter.className,
              RISE_ON_REVEAL
            )}
            style={delay(500)}
          >
            {article.excerpt}
          </p>
        )}

        {/* Looks like a link; the title's link already covers the card */}
        <span
          aria-hidden
          className={cn(
            "mt-6 inline-flex items-center gap-2 font-semibold text-neutral-950 underline decoration-brand decoration-2 underline-offset-[6px] transition-[text-decoration-color] duration-300 group-hover/post:decoration-neutral-950",
            RISE_ON_REVEAL
          )}
          style={delay(580)}
        >
          {t("readPost")}
          <ArrowRight className="size-4 transition-transform duration-300 ease-out-quint group-hover/post:translate-x-1" />
        </span>
      </div>
    </article>
  );
}
