"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { BlogItem } from "@/lib/strapi";
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
  Heart,
  Tag,
  FolderOpen,
  Share2,
  Clock,
  Loader2,
  AlertCircle,
  MessageCircle,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import "highlight.js/styles/github.css";
import { LatestBlogPost } from "@/components/blogs/LatestBlogPost";
import { StructuredData } from "@/components/seo/StructuredData";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import {
  generateArticleSchema,
  organizationSchema,
} from "@/lib/seo/structuredData";

interface BlogArticleClientProps {
  slug: string;
  lang?: string;
}

export function BlogArticleClient({ slug }: BlogArticleClientProps) {
  const [blog, setBlog] = useState<BlogItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const locale = useLocale();
  const URL = process.env.NEXT_PUBLIC_CMS_URL;

  useEffect(() => {
    const fetchSingleBlog = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `/api/single-blog?slug=${slug}&locale=${locale}`
        );

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Blog post not found");
          }
          throw new Error(`Failed to fetch blog: ${response.statusText}`);
        }

        const data: BlogItem = await response.json();
        setBlog(data);
      } catch (err) {
        console.error("Error fetching single blog:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch blog post"
        );
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchSingleBlog();
    }
  }, [slug, locale]);

  // Extract data with fallback handling
  const blogData = blog
    ? {
        id: blog.id,
        title: blog.attributes?.title || blog.title || "Untitled",
        contents: blog.attributes?.contents || blog.contents || "",
        updatedAt: blog.attributes?.updatedAt || blog.updatedAt || "",
        likes_count: blog.attributes?.likes_count || blog.likes_count || 0,
        comments_count:
          blog.attributes?.comments_count || blog.comments_count || 0,
        tags: blog.attributes?.tags || blog.tags || "",
        category: blog.attributes?.category || blog.category || "",
        slug: blog.attributes?.slug || blog.slug || "",
        blog_image:
          blog.attributes?.blog_image?.data?.attributes?.url ||
          blog.blog_image?.url ||
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

  // FIXED: Parse tags using # as delimiter
  const parseTags = (tagsString: string) => {
    if (!tagsString) return [];
    return tagsString
      .split("#")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);
  };

  // Share functionality
  const handleShare = async () => {
    if (navigator.share && blogData) {
      try {
        await navigator.share({
          title: blogData.title,
          text: `Check out this blog post: ${blogData.title}`,
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50/30 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-yellow-500 mx-auto mb-4" />
        </div>
      </div>
    );
  }

  if (error || !blogData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50/30 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Blog Post Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            {error || "The requested blog post could not be found."}
          </p>
          <Link href={`/${locale}/blog`}>
            <Button className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const tags = parseTags(blogData.tags);

  const articleSchema = generateArticleSchema(
    blogData.title,
    blogData.contents.substring(0, 160) + "...",
    blogData.updatedAt,
    blogData.updatedAt,
    blogData.blog_image || undefined
  );

  const structuredData = [organizationSchema, articleSchema];

  const breadcrumbItems = [
    { name: "Blog", href: `/${locale}/blog` },
    { name: blogData.title, href: `/${locale}/blog/${blogData.slug}` },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50/30 flex items-center justify-center">
      <StructuredData data={structuredData} />
      <div className="max-w-7xl grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-4 mx-auto">
        <article className="container mx-auto px-2 py-12">
          <div className="mb-6">
            <Breadcrumbs items={breadcrumbItems} />
          </div>
          {blogData.blog_image && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative w-full h-64 md:h-[30rem] rounded-2xl overflow-hidden mb-8 shadow-xl"
            >
              <Image
                src={`${URL}${blogData.blog_image}`}
                alt={blogData.title}
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
            className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-purple-50 p-8 md:p-12"
          >
            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-500">
              <div className="flex items-center gap-2 bg-purple-50 rounded-full px-4 py-2 text-purple-600">
                <Calendar className="w-4 h-4" />
                {formatDate(blogData.updatedAt)}
              </div>
              <div className="flex items-center gap-2 bg-yellow-50 rounded-full px-4 py-2 text-yellow-600">
                <FolderOpen className="w-4 h-4" />
                {blogData.category || "General"}
              </div>
              <div className="flex items-center gap-2 bg-pink-50 rounded-full px-4 py-2 text-pink-600">
                <Heart className="w-4 h-4" />
                {blogData.likes_count} likes
              </div>
              <div className="flex items-center gap-2 bg-blue-50 rounded-full px-4 py-2 text-blue-600">
                <MessageCircle className="w-4 h-4" />
                {blogData.comments_count} comments
              </div>
              <div className="flex items-center gap-2 bg-green-50 rounded-full px-4 py-2 text-green-600">
                <Clock className="w-4 h-4" />
                5 min read
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
                {blogData.title}
              </h1>
              <div className="flex flex-wrap gap-3">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 text-purple-600 text-sm font-medium"
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
                        className="text-purple-600 hover:text-purple-800 hover:underline font-medium transition-colors"
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
                {blogData.contents}
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
              <Link href={`/${locale}/blog`}>
                <Button variant="ghost" className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to All Posts
                </Button>
              </Link>
            </div>
          </motion.footer>
        </article>
        <div className="my-4 md:mt-20">
          <LatestBlogPost />
        </div>
      </div>
    </div>
  );
}
