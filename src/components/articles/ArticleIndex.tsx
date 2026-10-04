"use client";

import type { Page } from "@/lib/cms/types";
import { ListIndex } from "@/components/list/ListIndex";
import { ArticleCard, WIDE_AT_MD } from "./ArticleCard";
import { FeaturedArticle } from "./FeaturedArticle";
import {
  COLLECTIONS,
  type ArticleCardData,
  type Collection,
} from "./collections";

interface ArticleIndexProps {
  collection: Collection;
  /** The page of articles the address asks for; null when it couldn't be loaded */
  result: Page<ArticleCardData> | null;
  /** The search term in the address, already cleaned */
  query: string;
}

/**
 * The list of the blog or the news (pages, search: see ListIndex). The newest article of
 * each page is shown large, the others as cards; search results are all cards.
 */
export function ArticleIndex({ collection, result, query }: ArticleIndexProps) {
  return (
    <ListIndex
      namespace={COLLECTIONS[collection].namespace}
      result={result}
      query={query}
    >
      {(articles) => {
        const featured = query ? null : articles[0];
        const cards = featured ? articles.slice(1) : articles;

        return (
          <>
            {featured && (
              <div data-reveal="shown" className="mb-16 sm:mb-20">
                <FeaturedArticle collection={collection} article={featured} />
              </div>
            )}
            {cards.length > 0 && (
              <ul className="grid grid-cols-1 gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
                {cards.map((article, index) => (
                  <ArticleCard
                    key={article.id}
                    collection={collection}
                    article={article}
                    // Each row's cards come in one after another
                    start={(index % 3) * 100}
                    // With an odd number of cards, the last spans both columns
                    {...(index === cards.length - 1 && cards.length % 2 === 1
                      ? WIDE_AT_MD
                      : {})}
                  />
                ))}
              </ul>
            )}
          </>
        );
      }}
    </ListIndex>
  );
}
