"use client";

import React, { useEffect, useState } from "react";
import { NewsItem } from "@/lib/strapi";
import { SingleNews } from "./SingleNews";
import { motion, easeOut, Variants } from "framer-motion";
import Link from "next/link";
import { useTranslations } from "@/hooks/useTranslations";
import { RippleButton } from "../ui/ripple-button";
import { useRouter } from "next/navigation";

interface ImmigrationNewsProps {
  locale?: string;
}

export function ImmigrationNews({ locale = "en" }: ImmigrationNewsProps) {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const t = useTranslations("ImmigrationNews");
  const router = useRouter();

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
        >
          <RippleButton
            variant="brandOutline"
            size="lg"
            onClick={() => router.push(`/${locale}/immigration-news`)}
            className="h-12 text-base font-semibold font-montserrat border-2 hover:bg-yellow-400 hover:text-black hover:border-yellow-400 cursor-pointer"
          >
            {t("cta") || "See All News"}
          </RippleButton>
        </motion.div>
      )}
    </div>
  );
}
