import React from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import type { NewsArticleCard } from "@/lib/cms/types";
import { formatDate } from "@/lib/cms/format";
import Image from "next/image";
import { getLocalizedPath } from "@/lib/locale-paths";

interface SingleNewsProps {
  news: NewsArticleCard;
}

export function SingleLatestNews({ news }: SingleNewsProps) {
  const locale = useLocale();

  const { title, slug } = news;
  const views = news.views_count;
  const news_image = news.image_url;

  // Show the date like "Jun 03"
  const publishedAt =
    formatDate(news.published_at, { day: "2-digit", month: "short" }) ||
    "No date";

  return (
    <Link
      href={getLocalizedPath(locale, `/immigration-news/${slug}`)}
      className="block max-w-2xl"
    >
      <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 p-1">
        <div className="flex gap-4 items-start">
          {/* Small Blog Image - Left Side */}
          <div className="flex-shrink-0 w-27 h-20 overflow-hidden rounded-lg">
            {news_image ? (
              <Image
                src={news_image}
                alt={news.image_alt || title}
                width={80}
                height={80}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400 text-xs">No Image</span>
              </div>
            )}
          </div>

          {/* Blog Content - Right Side */}
          <div className="flex-1 min-w-0">
            {/* Title */}
            <h3 className="text-base font-semibold text-gray-800 leading-tight hover:text-yellow-500 transition-colors mb-2">
              {title}
            </h3>

            {/* Date and Likes */}
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <span className="text-gray-500 font-medium">{publishedAt}</span>
              </div>

              <div className="flex items-center space-x-1">
                <svg
                  className="w-4 h-4 text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 5c-7.633 0-11 7-11 7s3.367 7 11 7 11-7 11-7-3.367-7-11-7zm0 12c-2.761 0-5-2.239-5-5s2.239-5 5-5 5 2.239 5 5-2.239 5-5 5zm0-8a3 3 0 100 6 3 3 0 000-6z" />
                </svg>
                <span>{views}</span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
