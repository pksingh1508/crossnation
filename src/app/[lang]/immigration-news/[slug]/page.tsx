"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
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

interface SingleNewsPageProps {
  params: Promise<{ slug: string; lang: string }>;
}

export default function SingleNewsPage({ params }: SingleNewsPageProps) {
  const [news, setNews] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [slug, setSlug] = useState<string>("");
  const locale = useLocale();

  // Handle async params
  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params;
      setSlug(resolvedParams.slug);
    };
    getParams();
  }, [params]);

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

  // Extract data with fallback handling
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

  // Format date
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

  // Parse tags
  const parseTags = (tagsString: string) => {
    if (!tagsString) return [];
    return tagsString
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);
  };

  // Share functionality
  const handleShare = async () => {
    if (navigator.share && newsData) {
      try {
        await navigator.share({
          title: newsData.title,
          text: `Check out this immigration news: ${newsData.title}`,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading article...</p>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      <div className="max-w-7xl grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-4 mx-auto">
        <article className="container mx-auto px-3 py-12">
          {/* Featured Image */}
          {newsData.news_image && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative w-full h-64 md:h-[30rem] rounded-2xl overflow-hidden mb-8 shadow-xl"
            >
              <Image
                src={
                  newsData.news_image.startsWith("http")
                    ? newsData.news_image
                    : `https://determined-unity-de531adc95.strapiapp.com${newsData.news_image}`
                }
                alt={newsData.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </motion.div>
          )}

          {/* Article Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >
            {/* Category and Tags */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {newsData.category && (
                <div className="flex items-center gap-1.5 bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full text-sm font-medium">
                  <FolderOpen className="w-4 h-4" />
                  {newsData.category}
                </div>
              )}
              {tags.map((tag, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1.5 bg-amber-100 text-amber-800 px-3 py-1.5 rounded-full text-sm font-medium"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </div>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {newsData.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span className="text-sm font-medium">
                  {formatDate(newsData.updatedAt)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                <span className="text-sm font-medium">
                  {newsData.views.toLocaleString()} views
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span className="text-sm font-medium">
                  {Math.ceil(newsData.contents.split(" ").length / 200)} min
                  read
                </span>
              </div>
            </div>
          </motion.header>

          {/* Article Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl p-8 md:p-12 shadow-xl"
          >
            <div
              className="prose prose-lg prose-gray max-w-none
                         prose-headings:text-gray-900 prose-headings:font-bold
                         prose-h1:text-3xl prose-h1:mb-6 prose-h1:mt-8
                         prose-h2:text-2xl prose-h2:mb-4 prose-h2:mt-6
                         prose-h3:text-xl prose-h3:mb-3 prose-h3:mt-4
                         prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
                         prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                         prose-strong:text-gray-900 prose-strong:font-semibold
                         prose-ul:my-4 prose-ol:my-4
                         prose-li:text-gray-700 prose-li:mb-2
                         prose-blockquote:border-l-4 prose-blockquote:border-blue-500
                         prose-blockquote:bg-blue-50 prose-blockquote:py-4 prose-blockquote:px-6
                         prose-blockquote:my-6 prose-blockquote:rounded-r-lg
                         prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded
                         prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-4 prose-pre:rounded-lg
                         prose-img:rounded-lg prose-img:shadow-lg prose-img:my-6"
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight, rehypeRaw]}
                components={{
                  // Custom image component
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
                  // Custom link component
                  a: ({ node, ...props }) => {
                    const href =
                      typeof props.href === "string" ? props.href : "";

                    return (
                      <a
                        {...props}
                        href={href}
                        className="text-blue-600 hover:text-blue-800 hover:underline font-medium transition-colors"
                        target={href?.startsWith("http") ? "_blank" : undefined}
                        rel={
                          href?.startsWith("http")
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

          {/* Article Footer */}
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
