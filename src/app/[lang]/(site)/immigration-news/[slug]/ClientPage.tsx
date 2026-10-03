"use client";

import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Eye,
  FolderOpen,
  Share2,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { LatestNewsPost } from "@/components/immigration_news/LatestNewsPost";
import { StructuredData } from "@/components/seo/StructuredData";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import {
  generateArticleSchema,
  organizationSchema,
} from "@/lib/seo/structuredData";
import { getLocalizedPath } from "@/lib/locale-paths";
import type { NewsArticle, NewsArticleCard } from "@/lib/cms/types";

interface NewsArticleClientProps {
  news: NewsArticle;
  latestNews: NewsArticleCard[];
  /** The publish date, formatted on the server so the browser renders the same text */
  publishedAt: string;
  readingMinutes: number;
}

export function NewsArticleClient({
  news,
  latestNews,
  publishedAt,
  readingMinutes,
}: NewsArticleClientProps) {
  const locale = useLocale();

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: news.title,
          text: `Check out this article: ${news.title}`,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const articleSchema = generateArticleSchema(
    news.title,
    news.excerpt || news.title,
    news.published_at ?? news.created_at,
    news.updated_at,
    news.image_url ?? undefined
  );

  const structuredData = [organizationSchema, articleSchema];

  const breadcrumbItems = [
    {
      name: "Immigration News",
      href: getLocalizedPath(locale, "/immigration-news"),
    },
    {
      name: news.title,
      href: getLocalizedPath(locale, `/immigration-news/${news.slug}`),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      <StructuredData data={structuredData} />
      <div className="max-w-7xl grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-4 mx-auto">
        <article className="container mx-auto px-3 py-12">
          <div className="mb-6">
            <Breadcrumbs items={breadcrumbItems} />
          </div>
          {news.image_url && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative w-full h-64 md:h-[30rem] rounded-2xl overflow-hidden mb-8 shadow-xl"
            >
              <Image
                src={news.image_url}
                alt={news.image_alt || news.title}
                fill
                sizes="(max-width: 1024px) 100vw, 880px"
                className="object-cover"
                preload
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-blue-50 p-8 md:p-12"
          >
            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-500">
              <div className="flex items-center gap-2 bg-blue-50 rounded-full px-4 py-2 text-blue-600">
                <Calendar className="w-4 h-4" />
                <time dateTime={news.published_at ?? undefined}>
                  {publishedAt}
                </time>
              </div>
              <div className="flex items-center gap-2 bg-teal-50 rounded-full px-4 py-2 text-teal-600">
                <FolderOpen className="w-4 h-4" />
                News
              </div>
              <div className="flex items-center gap-2 bg-purple-50 rounded-full px-4 py-2 text-purple-600">
                <Eye className="w-4 h-4" />
                {news.views_count.toLocaleString("en-US")} views
              </div>
              <div className="flex items-center gap-2 bg-orange-50 rounded-full px-4 py-2 text-orange-600">
                <Clock className="w-4 h-4" />
                {readingMinutes} min read
              </div>
            </div>

            <header className="mb-10">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-6">
                {news.title}
              </h1>
              {/* <div className="flex flex-wrap gap-3">
                {news.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-medium"
                  >
                    <Tag className="w-4 h-4" />
                    {tag}
                  </span>
                ))}
              </div> */}
            </header>

            {/* The CMS cleaned this HTML against an allowlist when it was saved, so it is inserted as it is */}
            <div
              className="cms-content cms-content-news"
              dangerouslySetInnerHTML={{ __html: news.content }}
            />
          </motion.div>

          <motion.footer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 pt-8 border-t border-gray-200"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="text-gray-600 text-sm">
                  Share this article:
                </span>
                <Button
                  onClick={handleShare}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
              </div>
              <Link href={getLocalizedPath(locale, "/immigration-news")}>
                <Button variant="ghost" className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to All News
                </Button>
              </Link>
            </div>
          </motion.footer>
        </article>
        <div className="my-4 md:mt-20">
          <LatestNewsPost news={latestNews} />
        </div>
      </div>
    </div>
  );
}
