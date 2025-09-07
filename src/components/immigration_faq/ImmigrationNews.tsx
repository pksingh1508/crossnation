"use client";

import React, { useEffect, useState } from "react";
import { NewsItem } from "@/lib/strapi";
import { SingleNews } from "./SingleNews";
import { motion, easeOut, Variants } from "framer-motion";
import Link from "next/link";
import { useTranslations } from "@/hooks/useTranslations";

interface ImmigrationNewsProps {
  locale?: string;
}

export function ImmigrationNews({ locale = "en" }: ImmigrationNewsProps) {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const t = useTranslations("ImmigrationNews");

  useEffect(() => {
    const loadNews = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `/api/immigration-news?locale=${locale}&page=1&pageSize=10`
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

        {/* Loading State */}
        <div className="animate-pulse space-y-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="h-6 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))}
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
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {t("heading") || "Immigration News"}
        </h2>
        <div className="h-1 bg-yellow-500 rounded w-16"></div>
      </div>

      {/* News List */}
      <div className="space-y-0">
        {news.length > 0 ? (
          news.map((newsItem) => (
            <SingleNews key={newsItem.id} news={newsItem} />
          ))
        ) : (
          <p className="text-gray-600">No news articles found.</p>
        )}
      </div>
      {/* See all news buttons */}
      {news.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            delay: 0.4,
            ease: easeOut,
          }}
          // className="text-center"
        >
          <Link
            href={`/${locale}/immigration-news`}
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-105 whitespace-nowrap"
          >
            {t("cta") || "See All News"}
          </Link>
        </motion.div>
      )}
    </div>
  );
}
