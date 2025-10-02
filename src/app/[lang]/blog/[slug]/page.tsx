"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
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

interface SingleBlogPageProps {
  params: Promise<{ slug: string; lang: string }>;
}

export default function SingleBlogPage({ params }: SingleBlogPageProps) {
  const [blog, setBlog] = useState<BlogItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [slug, setSlug] = useState<string>("");
  const locale = useLocale();
  const URL = process.env.NEXT_PUBLIC_CMS_URL;

  // Handle async params
  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params;
      setSlug(resolvedParams.slug);
    };
    getParams();
  }, [params]);

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
      // Fallback - copy to clipboard
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

  // Generate structured data for the blog post
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
          {/* Featured Image */}
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

          {/* Article Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >
            {/* Category and Tags */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {blogData.category && (
                <div className="flex items-center gap-1.5 bg-purple-100 text-purple-800 px-3 py-1.5 rounded-full text-sm font-medium">
                  <FolderOpen className="w-4 h-4" />
                  {blogData.category}
                </div>
              )}
              {tags.map((tag, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1.5 bg-pink-100 text-pink-800 px-3 py-1.5 rounded-full text-sm font-medium"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </div>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {blogData.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span className="text-sm font-medium">
                  {formatDate(blogData.updatedAt)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                <span className="text-sm font-medium">
                  {blogData.likes_count.toLocaleString()} likes
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                <span className="text-sm font-medium">
                  {blogData.comments_count.toLocaleString()} comments
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span className="text-sm font-medium">
                  {Math.ceil(blogData.contents.split(" ").length / 200)} min
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
                         prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-8
                         prose-h2:text-3xl prose-h2:mb-5 prose-h2:mt-8
                         prose-h3:text-2xl prose-h3:mb-4 prose-h3:mt-6
                         prose-h4:text-xl prose-h4:mb-3 prose-h4:mt-5
                         prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4 prose-p:text-base
                         prose-a:text-purple-600 prose-a:no-underline hover:prose-a:underline
                         prose-strong:text-gray-900 prose-strong:font-bold
                         prose-ul:my-4 prose-ol:my-4
                         prose-li:text-gray-700 prose-li:mb-2
                         prose-blockquote:border-l-4 prose-blockquote:border-purple-500
                         prose-blockquote:bg-purple-50 prose-blockquote:py-4 prose-blockquote:px-6
                         prose-blockquote:my-6 prose-blockquote:rounded-r-lg
                         prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm
                         prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-4 prose-pre:rounded-lg
                         prose-img:rounded-lg prose-img:shadow-lg prose-img:my-6"
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight, rehypeRaw]}
                components={{
                  // FIXED: Custom heading components with proper styling
                  h1: ({ node, ...props }) => (
                    <h1
                      className="text-4xl font-bold text-gray-900 mb-6 mt-8"
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
                  // FIXED: Paragraph styling
                  p: ({ node, ...props }) => (
                    <p
                      className="text-gray-700 text-base leading-relaxed mb-4"
                      {...props}
                    />
                  ),
                  // FIXED: Strong/bold text
                  strong: ({ node, ...props }) => (
                    <strong className="font-bold text-gray-900" {...props} />
                  ),
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
                  // FIXED: Custom link component with proper URL handling
                  a: ({ node, ...props }) => {
                    const href =
                      typeof props.href === "string" ? props.href : "";

                    // Check if the URL is already absolute (starts with http:// or https://)
                    const isAbsoluteUrl =
                      href.startsWith("http://") || href.startsWith("https://");

                    // If not absolute and doesn't start with /, add https://
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

          {/* Article Footer */}
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
