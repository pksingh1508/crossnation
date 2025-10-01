"use client";

import { BlogItem } from "@/lib/strapi";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Calendar, ArrowRight, BookOpen } from "lucide-react";
import { useLocale } from "next-intl";

interface SingleBlogSectionProps {
  blog: BlogItem;
  index?: number;
}

export function SingleBlogSection({ blog, index = 0 }: SingleBlogSectionProps) {
  const locale = useLocale();
  const URL = process.env.NEXT_PUBLIC_CMS_URL;

  // Extract data with fallback handling for both Strapi attribute structure and flat structure
  const data = {
    id: blog.id,
    title: blog.attributes?.title || blog.title || "Untitled",
    short_desc: blog.attributes?.short_desc || blog.short_desc || "",
    updatedAt: blog.attributes?.updatedAt || blog.updatedAt || "",
    likes_count: blog.attributes?.likes_count || blog.likes_count || 0,
    slug: blog.attributes?.slug || blog.slug || "",
    blog_image:
      blog.attributes?.blog_image?.data?.attributes?.url ||
      blog.blog_image?.url ||
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

  // Calculate reading time
  const calculateReadingTime = (text: string) => {
    const wordsPerMinute = 200;
    const wordCount = text.split(" ").length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
      },
    },
  };

  const blogUrl = `/${locale}/blog/${data.slug}`;

  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="w-full group"
    >
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:border-purple-200">
        <div className="flex flex-col md:flex-row">
          {/* Left side - Image */}
          <div className="md:w-80 md:flex-shrink-0">
            <div className="relative h-44 md:h-full md:min-h-[200px] overflow-hidden">
              {data.blog_image ? (
                <Image
                  src={`${URL}${data.blog_image}`}
                  alt={data.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
                  <div className="text-center text-white">
                    <BookOpen className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm font-medium">Blog Post</p>
                  </div>
                </div>
              )}

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

              {/* Likes badge */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-md">
                <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                <span className="text-sm font-semibold text-gray-900">
                  {data.likes_count}
                </span>
              </div>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="flex-1 p-3 md:p-5">
            {/* Meta information */}
            <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(data.updatedAt)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" />
                <span>{calculateReadingTime(data.short_desc)} min read</span>
              </div>
            </div>

            {/* Title */}
            <Link href={blogUrl}>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-yellow-500 transition-colors duration-200 cursor-pointer">
                {data.title}
              </h3>
            </Link>

            {/* Description */}
            <p className="text-gray-600 text-base leading-relaxed mb-4 line-clamp-3">
              {data.short_desc}
            </p>

            {/* Read more link and likes */}
            <div className="flex items-center justify-between">
              <Link href={blogUrl}>
                <div className="inline-flex items-center gap-2 text-yellow-500 hover:text-yellow-600 font-semibold text-sm group-hover:gap-3 transition-all duration-200 cursor-pointer">
                  <span>Read Full Post</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </Link>

              {/* Mobile likes display */}
              <div className="md:hidden flex items-center gap-1.5 text-gray-500">
                <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                <span className="text-sm font-medium">{data.likes_count}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
