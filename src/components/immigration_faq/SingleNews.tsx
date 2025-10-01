import React from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { NewsItem } from "@/lib/strapi";
import { fontInter } from "@/fonts";

interface SingleNewsProps {
  news: NewsItem;
}

export function SingleNews({ news }: SingleNewsProps) {
  const locale = useLocale();

  // Handle both nested attributes structure and flat structure
  const title = news.attributes?.title || news.title || "Untitled";
  const publishedAt = news.attributes?.updatedAt || news.updatedAt || "";
  const views = news.attributes?.views || news.views || 0;
  const short_desc = news.attributes?.short_desc || news.short_desc || "";
  const slug = news.attributes?.slug || news.slug || "";

  // Truncate short description to 200 characters
  const truncateText = (text: string, maxLength: number = 30) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + " ";
  };

  // Format the date to show like "03 Jun"
  const formatDate = (dateString: string) => {
    if (!dateString) return "No date";
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "short",
    };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <article className="border-b border-gray-200 pb-4 mb-4 last:border-b-0">
      <div className="space-y-3">
        {/* Title */}
        <Link href={`/${locale}/immigration-news/${slug}`}>
          <h3
            className={`text-lg font-semibold text-gray-800 leading-tight hover:text-yellow-500 cursor-pointer transition-colors ${fontInter.className}`}
          >
            {title}
          </h3>
        </Link>

        {/* Short Description */}
        <div className="flex gap-3">
          <div className="text-gray-700 leading-relaxed">
            <p className="flex flex-wrap items-center text-gray-700">
              {/* Description */}
              <span className={`${fontInter.className}`}>
                {truncateText(short_desc)}
              </span>

              {/* Read More */}
              <Link href={`/${locale}/immigration-news/${slug}`}>
                <span
                  className={`text-yellow-500 cursor-pointer hover:underline ml-1 ${fontInter.className}`}
                >
                  [Read More...]
                </span>
              </Link>

              {/* Published Date */}
              <span className="flex items-center space-x-1 text-sm text-gray-600 ml-4">
                <span className="inline-block w-3 h-3 bg-yellow-500 rounded-sm"></span>
                <span className={`${fontInter.className}`}>
                  {formatDate(publishedAt)}
                </span>
              </span>

              {/* Views */}
              <span className="flex items-center space-x-1 text-sm text-gray-600 ml-4">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                <span className={`${fontInter.className}`}>{views} views</span>
              </span>
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
