"use client";
import { motion, easeOut, Variants } from "framer-motion";
import React, { useEffect, useState } from "react";
import { BlogItem } from "@/lib/strapi";
import { SingleBlog } from "./SingleBlog";
import { useLocaleStore } from "@/store/useLocaleStore";
import Link from "next/link";
import { useTranslations } from "@/hooks/useTranslations";

export function RecentBlog() {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { locale } = useLocaleStore();
  const t = useTranslations("RecentBlogs");

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `/api/recent-blog?pageSize=3&locale=${locale}`
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch blogs");
        }

        const data = await response.json();
        setBlogs(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load blogs");
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, [locale]);

  if (loading) {
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

  if (error) {
    return (
      <section className="py-16 md:py-24 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Recent Blogs
              </h2>
              <div className="h-1 bg-blue-500 rounded w-16 mx-auto mb-8"></div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md mx-auto">
                <p className="text-red-700">Error loading blogs: {error}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 md:pt-2 md:pb-10 lg:pb-16 bg-white mx-auto">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t("heading") || "Recent Blogs"}
            </h2>
            <div className="h-1 bg-blue-500 rounded w-16 mx-auto"></div>
          </div>

          {/* Blogs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto">
            {blogs.length > 0 ? (
              blogs.map((blog) => <SingleBlog key={blog.id} blog={blog} />)
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-600">No recent blogs found.</p>
              </div>
            )}
          </div>
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
            <Link
              href={`/${locale}/blog`}
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-105 whitespace-nowrap"
            >
              {t("cta") || "Read More Blogs"}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
