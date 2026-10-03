"use client";

import React from "react";
import type { NewsArticleCard } from "@/lib/cms/types";
import { useTranslations } from "@/hooks/useTranslations";
import { SingleLatestNews } from "./SingleLatestNews";

interface LatestNewsPostProps {
  /** The newest articles, loaded on the server by the page */
  news: NewsArticleCard[];
}

export function LatestNewsPost({ news }: LatestNewsPostProps) {
  const t = useTranslations("ImmigrationNews");

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t("latest")}</h2>
        <div className="h-1 bg-yellow-500 rounded w-16"></div>
      </div>

      {/* News List */}
      <div className="grid grid-cols-1 gap-2 mx-auto">
        {news.length > 0 ? (
          news.map((newsItem) => (
            <SingleLatestNews key={newsItem.id} news={newsItem} />
          ))
        ) : (
          <p className="text-gray-600">No news articles found.</p>
        )}
      </div>
    </div>
  );
}
