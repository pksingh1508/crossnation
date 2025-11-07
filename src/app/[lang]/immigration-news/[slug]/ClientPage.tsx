"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { NewsItem } from "@/lib/strapi";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Eye,
  Tag,
  FolderOpen,
  Share2,
  Clock,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import "highlight.js/styles/github.css";
import { LatestNewsPost } from "@/components/immigration_news/LatestNewsPost";
import { StructuredData } from "@/components/seo/StructuredData";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import {
  generateArticleSchema,
  organizationSchema,
} from "@/lib/seo/structuredData";

interface NewsArticleClientProps {
  slug: string;
  lang?: string;
}

export function NewsArticleClient({ slug }: NewsArticleClientProps) {
  const [news, setNews] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const locale = useLocale();
  const URL = process.env.NEXT_PUBLIC_CMS_URL;

  useEffect(() => {
    const fetchSingleNews = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `/api/single-news?slug=${slug}&locale=${locale}`
        );

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("News article not found");
          }
          throw new Error(`Failed to fetch news: ${response.statusText}`);
        }

        const data: NewsItem = await response.json();
        setNews(data);
      } catch (err) {
        console.error("Error fetching single news:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch news article"
        );
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchSingleNews();
    }
  }, [slug, locale]);

  const newsData = news
    ? {
        id: news.id,
        title: news.attributes?.title || news.title || "Untitled",
        contents: news.attributes?.contents || news.contents || "",
        updatedAt: news.attributes?.updatedAt || news.updatedAt || "",
        views: news.attributes?.views || news.views || 0,
        tags: news.attributes?.tags || news.tags || "",
        category: news.attributes?.category || news.category || "",
        slug: news.attributes?.slug || news.slug || "",
        news_image:
          news.attributes?.news_image?.data?.attributes?.url ||
          news.news_image?.url ||
          null,
      }
    : null;

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "";
    }
  };

  const parseTags = (tagsString: string) => {
    if (!tagsString) return [];
    return tagsString
      .split("#")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);
  };

  const handleShare = async () => {
    if (navigator.share && newsData) {
      try {
        await navigator.share({
          title: newsData.title,
          text: `Check out this article: ${newsData.title}`,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-yellow-500 mx-auto mb-4" />
        </div>
      </div>
    );
  }

  if (error || !newsData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Article Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            {error || "The requested article could not be found."}
          </p>
          <Link href={`/${locale}/immigration-news`}>
            <Button className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to News
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const tags = parseTags(newsData.tags);

  const articleSchema = generateArticleSchema(
    newsData.title,
    newsData.contents.substring(0, 160) + "...",
    newsData.updatedAt,
    newsData.updatedAt,
    newsData.news_image || undefined
  );

  const structuredData = [organizationSchema, articleSchema];

  const breadcrumbItems = [
    { name: "Immigration News", href: `/${locale}/immigration-news` },
    {
      name: newsData.title,
      href: `/${locale}/immigration-news/${newsData.slug}`,
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
          {newsData.news_image && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative w-full h-64 md:h-[30rem] rounded-2xl overflow-hidden mb-8 shadow-xl"
            >
              <Image
                src={`${URL}${newsData.news_image}`}
                alt={newsData.title}
                fill
                className="object-cover"
                priority
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
                {formatDate(newsData.updatedAt)}
              </div>
              <div className="flex items-center gap-2 bg-teal-50 rounded-full px-4 py-2 text-teal-600">
                <FolderOpen className="w-4 h-4" />
                {newsData.category || "General"}
              </div>
              <div className="flex items-center gap-2 bg-purple-50 rounded-full px-4 py-2 text-purple-600">
                <Eye className="w-4 h-4" />
                {newsData.views} views
              </div>
              <div className="flex items-center gap-2 bg-orange-50 rounded-full px-4 py-2 text-orange-600">
                <Clock className="w-4 h-4" />
                4 min read
              </div>
            </div>

            <header className="mb-10">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-6">
                {newsData.title}
              </h1>
              <div className="flex flex-wrap gap-3">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-medium"
                  >
                    <Tag className="w-4 h-4" />
                    {tag}
                  </span>
                ))}
              </div>
            </header>

            <div className="prose prose-lg max-w-none text-gray-700">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight, rehypeRaw]}
                components={{
                  h1: ({ node, ...props }) => (
                    <h1
                      className="text-4xl font-bold text-gray-900 mb-6"
                      {...props}
                    />
                  ),
                  h2: ({ node, ...props }) => (
                    <h2
                      className="text-3xl font-bold text-gray-900 mb-5 mt-8"
                      {...props}
                    />
                  ),
                  h3: ({ node, ...props }) => (
                    <h3
                      className="text-2xl font-bold text-gray-900 mb-4 mt-6"
                      {...props}
                    />
                  ),
                  h4: ({ node, ...props }) => (
                    <h4
                      className="text-xl font-bold text-gray-900 mb-3 mt-5"
                      {...props}
                    />
                  ),
                  h5: ({ node, ...props }) => (
                    <h5
                      className="text-lg font-bold text-gray-900 mb-2 mt-4"
                      {...props}
                    />
                  ),
                  h6: ({ node, ...props }) => (
                    <h6
                      className="text-base font-bold text-gray-900 mb-2 mt-3"
                      {...props}
                    />
                  ),
                  p: ({ node, ...props }) => (
                    <p
                      className="text-gray-700 text-base leading-relaxed mb-4"
                      {...props}
                    />
                  ),
                  strong: ({ node, ...props }) => (
                    <strong className="font-bold text-gray-900" {...props} />
                  ),
                  img: ({ node, ...props }) => {
                    const src = typeof props.src === "string" ? props.src : "";
                    const alt = typeof props.alt === "string" ? props.alt : "";

                    return (
                      <Image
                        src={src || ""}
                        alt={alt || ""}
                        width={800}
                        height={400}
                        className="rounded-lg shadow-lg my-6"
                        style={{ width: "auto", height: "auto" }}
                      />
                    );
                  },
                  a: ({ node, ...props }) => {
                    const href =
                      typeof props.href === "string" ? props.href : "";
                    const isAbsoluteUrl =
                      href.startsWith("http://") || href.startsWith("https://");
                    const finalHref = isAbsoluteUrl
                      ? href
                      : href.startsWith("/")
                        ? href
                        : `https://${href}`;

                    return (
                      <a
                        {...props}
                        href={finalHref}
                        className="text-blue-600 hover:text-blue-800 hover:underline font-medium transition-colors"
                        target={
                          isAbsoluteUrl || !href.startsWith("/")
                            ? "_blank"
                            : undefined
                        }
                        rel={
                          isAbsoluteUrl || !href.startsWith("/")
                            ? "noopener noreferrer"
                            : undefined
                        }
                      />
                    );
                  },
                }}
              >
                {newsData.contents}
              </ReactMarkdown>
            </div>
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
              <Link href={`/${locale}/immigration-news`}>
                <Button variant="ghost" className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to All News
                </Button>
              </Link>
            </div>
          </motion.footer>
        </article>
        <div className="my-4 md:mt-20">
          <LatestNewsPost />
        </div>
      </div>
    </div>
  );
}
