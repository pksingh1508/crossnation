"use client";

import type { ReactNode } from "react";
import { SectionHeader } from "@/components/ui/section-header";
import { fontPoppins } from "@/fonts";
import { cn } from "@/lib/utils";
import { ArticleCard, WIDE_AT_MD } from "./ArticleCard";
import type { ArticleCardData, Collection } from "./collections";

interface RowHeader {
  title: string;
  /** To the whole list: at the right on larger screens, under the title on phones */
  link: { href: string; label: string };
}

interface ArticleRowProps extends RowHeader {
  collection: Collection;
  articles: ArticleCardData[];
}

/**
 * Up to three articles under a heading, with a link to their list: the newest posts on
 * the home page, and more articles at the end of an article. With an odd number of cards,
 * the first spans both columns from md to lg, so no card is left alone in a row.
 */
export function ArticleRow({
  collection,
  articles,
  title,
  link,
}: ArticleRowProps) {
  if (articles.length === 0) return null;
  const wideFirst = articles.length % 2 === 1;

  return (
    <RowSection title={title} link={link}>
      {articles.map((article, index) => (
        <ArticleCard
          key={article.id}
          collection={collection}
          article={article}
          start={index * 120}
          {...(index === 0 && wideFirst ? WIDE_AT_MD : {})}
        />
      ))}
    </RowSection>
  );
}

/** Shown while the articles stream in from the server, in the same layout */
export function ArticleRowSkeleton({ title, link }: RowHeader) {
  return (
    <RowSection title={title} link={link}>
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
    </RowSection>
  );
}

function RowSection({
  title,
  link,
  children,
}: RowHeader & { children: ReactNode }) {
  return (
    <section className={cn("bg-white py-20 sm:py-24", fontPoppins.className)}>
      <div className="mx-auto w-full max-w-7xl px-4">
        <SectionHeader title={title} link={link} />
        <ul className="mt-10 grid gap-x-6 gap-y-14 sm:mt-12 md:grid-cols-2 lg:grid-cols-3">
          {children}
        </ul>
      </div>
    </section>
  );
}
