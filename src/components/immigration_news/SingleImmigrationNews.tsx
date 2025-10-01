"use client";

import { NewsItem } from "@/lib/strapi";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, Calendar, ArrowRight } from "lucide-react";
import { useLocale } from "next-intl";

interface SingleImmigrationNewsProps {
  news: NewsItem;
  index?: number;
}

export function SingleImmigrationNews({
  news,
  index = 0,
}: SingleImmigrationNewsProps) {
  const locale = useLocale();
  const URL = process.env.NEXT_PUBLIC_CMS_URL;

  // Extract data with fallback handling for both Strapi attribute structure and flat structure
  const data = {
    id: news.id,
    title: news.attributes?.title || news.title || "Untitled",
    short_desc: news.attributes?.short_desc || news.short_desc || "",
    updatedAt:
      news.attributes?.updatedAt ||
      news.attributes?.publishedAt ||
      news.updatedAt ||
      news.publishedAt ||
      "",
    views: news.attributes?.views || news.views || 0,
    slug: news.attributes?.slug || news.slug || "",
    news_image:
      news.attributes?.news_image?.data?.attributes?.url ||
      news.news_image?.url ||
      null,
  };

  // Format date
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "";
    }
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const newsUrl = `/${locale}/immigration-news/${data.slug}`;

  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="w-full group"
    >
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:border-amber-200">
        <div className="flex flex-col md:flex-row">
          {/* Left side - Image */}
          <div className="md:w-80 md:flex-shrink-0">
            <div className="relative h-48 md:h-full md:min-h-[200px] overflow-hidden">
              {data.news_image ? (
                <Image
                  src={`${URL}${data.news_image}`}
                  alt={data.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Calendar className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm font-medium">News Image</p>
                  </div>
                </div>
              )}

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>

          {/* Right side - Content */}
          <div className="flex-1 p-6 md:p-8">
            {/* Meta information */}
            <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(data.updatedAt)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Eye className="w-4 h-4" />
                <span>{data.views.toLocaleString()} views</span>
              </div>
            </div>

            {/* Title */}
            <Link href={newsUrl}>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 line-clamp-2 group-hover:text-amber-500 transition-colors duration-200 cursor-pointer">
                {data.title}
              </h3>
            </Link>

            {/* Description */}
            <p className="text-gray-600 text-base leading-relaxed mb-6 line-clamp-3">
              {data.short_desc}
            </p>

            {/* Read more link */}
            <Link href={newsUrl}>
              <div className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-600 font-semibold text-sm group-hover:gap-3 transition-all duration-200 cursor-pointer">
                <span>Read Full Article</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
