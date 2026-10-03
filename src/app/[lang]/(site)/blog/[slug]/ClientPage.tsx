"use client";

import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Heart,
  FolderOpen,
  Share2,
  Clock,
  MessageCircle,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { LatestBlogPost } from "@/components/blogs/LatestBlogPost";
import { StructuredData } from "@/components/seo/StructuredData";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import {
  generateArticleSchema,
  organizationSchema,
} from "@/lib/seo/structuredData";
import { getLocalizedPath } from "@/lib/locale-paths";
import type { BlogPost, BlogPostCard } from "@/lib/cms/types";

interface BlogArticleClientProps {
  post: BlogPost;
  latestPosts: BlogPostCard[];
  /** The publish date, formatted on the server so the browser renders the same text */
  publishedAt: string;
  readingMinutes: number;
}

export function BlogArticleClient({
  post,
  latestPosts,
  publishedAt,
  readingMinutes,
}: BlogArticleClientProps) {
  const locale = useLocale();

  // Share functionality
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: `Check out this blog post: ${post.title}`,
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
    post.title,
    post.excerpt || post.title,
    post.published_at ?? post.created_at,
    post.updated_at,
    post.image_url ?? undefined,
    post.author_name ?? undefined
  );

  const structuredData = [organizationSchema, articleSchema];

  const breadcrumbItems = [
    { name: "Blog", href: getLocalizedPath(locale, "/blog") },
    {
      name: post.title,
      href: getLocalizedPath(locale, `/blog/${post.slug}`),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50/30 flex items-center justify-center">
      <StructuredData data={structuredData} />
      <div className="max-w-7xl grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-4 mx-auto">
        <article className="container mx-auto px-2 py-12">
          <div className="mb-6">
            <Breadcrumbs items={breadcrumbItems} />
          </div>
          {post.image_url && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative w-full h-64 md:h-[30rem] rounded-2xl overflow-hidden mb-8 shadow-xl"
            >
              <Image
                src={post.image_url}
                alt={post.image_alt || post.title}
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
            className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-purple-50 p-8 md:p-12"
          >
            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-500">
              <div className="flex items-center gap-2 bg-purple-50 rounded-full px-4 py-2 text-purple-600">
                <Calendar className="w-4 h-4" />
                <time dateTime={post.published_at ?? undefined}>
                  {publishedAt}
                </time>
              </div>
              <div className="flex items-center gap-2 bg-yellow-50 rounded-full px-4 py-2 text-yellow-600">
                <FolderOpen className="w-4 h-4" />
                Blog
              </div>
              <div className="flex items-center gap-2 bg-pink-50 rounded-full px-4 py-2 text-pink-600">
                <Heart className="w-4 h-4" />
                {post.likes_count.toLocaleString("en-US")} likes
              </div>
              <div className="flex items-center gap-2 bg-blue-50 rounded-full px-4 py-2 text-blue-600">
                <MessageCircle className="w-4 h-4" />
                {post.comments_count.toLocaleString("en-US")} comments
              </div>
              <div className="flex items-center gap-2 bg-green-50 rounded-full px-4 py-2 text-green-600">
                <Clock className="w-4 h-4" />
                {readingMinutes} min read
              </div>
            </div>

            <header className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="w-6 h-6 text-purple-500" />
                <span className="text-sm font-semibold tracking-wider text-purple-500 uppercase">
                  Featured Insight
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-6">
                {post.title}
              </h1>
              {/* <div className="flex flex-wrap gap-3">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 text-purple-600 text-sm font-medium"
                  >
                    <Tag className="w-4 h-4" />
                    {tag}
                  </span>
                ))}
              </div> */}
            </header>

            {/* The CMS cleaned this HTML against an allowlist when it was saved, so it is inserted as it is */}
            <div
              className="cms-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
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
                <span className="text-gray-600 text-sm">Share this post:</span>
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
              <Link href={getLocalizedPath(locale, "/blog")}>
                <Button variant="ghost" className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to All Posts
                </Button>
              </Link>
            </div>
          </motion.footer>
        </article>
        <div className="my-4 md:mt-20">
          <LatestBlogPost posts={latestPosts} />
        </div>
      </div>
    </div>
  );
}
