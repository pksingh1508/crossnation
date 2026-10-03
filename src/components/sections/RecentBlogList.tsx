"use client";
import { motion, easeOut } from "framer-motion";
import React from "react";
import { useLocale } from "next-intl";
import type { BlogPostCard } from "@/lib/cms/types";
import { SingleBlog } from "./SingleBlog";
import { useTranslations } from "@/hooks/useTranslations";
import { RippleButton } from "../ui/ripple-button";
import { useRouter } from "next/navigation";
import { fontPoppins } from "@/fonts";
import { getLocalizedPath } from "@/lib/locale-paths";

interface RecentBlogListProps {
  blogs: BlogPostCard[];
}

export function RecentBlogList({ blogs }: RecentBlogListProps) {
  const locale = useLocale();
  const t = useTranslations("RecentBlogs");
  const router = useRouter();

  return (
    <section className="py-10 md:pt-2 md:pb-10 lg:pb-16 bg-white mx-auto">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2
              className={`text-3xl font-bold text-gray-900 mb-4 ${fontPoppins.className}`}
            >
              {t("heading") || "Recent Blogs"}
            </h2>
            <div className="h-1 bg-yellow-500 rounded w-24 mx-auto"></div>
          </div>
          {/* Blog post */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto">
            {blogs.length > 0 ? (
              blogs.map((blog) => <SingleBlog key={blog.id} blog={blog} />)
            ) : (
              <div className="col-span-full text-center py-12">
                <p className={`text-gray-600 ${fontPoppins.className}`}>
                  No recent blogs found.
                </p>
              </div>
            )}
          </div>

          {blogs.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.4,
                ease: easeOut,
              }}
              className="text-center mt-16"
            >
              <RippleButton
                variant="brandOutline"
                size="lg"
                onClick={() => router.push(getLocalizedPath(locale, "/blog"))}
                className={`h-12 text-base font-semibold font-montserrat border-3 text-yellow-500 border-[#fecc00] hover:bg-yellow-400 hover:text-black hover:border-yellow-400 cursor-pointer ${fontPoppins.className}`}
              >
                {t("cta") || "Read More Blogs"}
              </RippleButton>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

/** Shown while the posts stream in from the server */
export function RecentBlogSkeleton() {
  const t = useTranslations("RecentBlogs");

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t("heading") || "Recent Blogs"}
            </h2>
            <div className="h-1 bg-yellow-500 rounded w-24 mx-auto"></div>
          </div>

          {/* Loading State */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse"
              >
                <div className="aspect-video bg-gray-200"></div>
                <div className="p-6 space-y-3">
                  <div className="h-6 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
