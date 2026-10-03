"use client";

import React from "react";
import { useLocale } from "next-intl";
import type { NewsArticleCard } from "@/lib/cms/types";
import { SingleNews } from "./SingleNews";
import { motion, easeOut } from "framer-motion";
import { useTranslations } from "@/hooks/useTranslations";
import { RippleButton } from "../ui/ripple-button";
import { useRouter } from "next/navigation";
import { fontInter, fontPoppins } from "@/fonts";
import { getLocalizedPath } from "@/lib/locale-paths";

interface ImmigrationNewsProps {
  news: NewsArticleCard[];
}

export function ImmigrationNews({ news }: ImmigrationNewsProps) {
  const locale = useLocale();
  const t = useTranslations("ImmigrationNews");
  const router = useRouter();

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h2
          className={`text-2xl font-bold text-gray-900 mb-2 ${fontInter.className}`}
        >
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
          <p className={`text-gray-600 ${fontInter.className}`}>
            No news articles found.
          </p>
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
          className="flex justify-end"
        >
          <RippleButton
            variant="brandOutline"
            size="lg"
            onClick={() =>
              router.push(getLocalizedPath(locale, "/immigration-news"))
            }
            className={`h-12 text-base font-semibold font-montserrat border-2 border-[#fecc00] text-yellow-500 hover:bg-yellow-400 hover:text-black hover:border-yellow-400 cursor-pointer ${fontPoppins.className}`}
          >
            {t("cta") || "See All News"}
          </RippleButton>
        </motion.div>
      )}
    </div>
  );
}

/** Shown while the articles stream in from the server */
export function ImmigrationNewsSkeleton() {
  const t = useTranslations("ImmigrationNews");

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h2
          className={`text-2xl font-bold text-gray-900 mb-2 ${fontInter.className}`}
        >
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
