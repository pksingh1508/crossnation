"use client";

import React, { useEffect, useState } from "react";
import { NewsItem } from "@/lib/strapi";
import { useTranslations } from "@/hooks/useTranslations";
import { useLocaleStore } from "@/store/useLocaleStore";
import { Loader2 } from "lucide-react";
import { SingleLatestNews } from "./SingleLatestNews";

export function LatestNewsPost() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const t = useTranslations("ImmigrationNews");
  const { locale } = useLocaleStore();

  useEffect(() => {
    const loadNews = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `/api/recent-news?locale=${locale}&page=1&pageSize=7`
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch news");
        }

        const data = await response.json();
        console.log("data", data);
        setNews(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load news");
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, [locale]);

  if (loading) {
    return (
      <div>
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {t("heading") || "Immigration News"}
          </h2>
          <div className="h-1 bg-yellow-500 rounded w-16"></div>
        </div>
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-8 h-8 animate-spin text-yellow-500" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {t("heading") || "Immigration News"}
          </h2>
          <div className="h-1 bg-yellow-500 rounded w-16"></div>
        </div>

        {/* Error State */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700">Error loading news: {error}</p>
        </div>
      </div>
    );
  }

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
