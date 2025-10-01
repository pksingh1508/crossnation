"use client";
import { motion, easeOut, Variants } from "framer-motion";
import React, { useEffect, useState } from "react";
import { BlogItem } from "@/lib/strapi";
import { useLocaleStore } from "@/store/useLocaleStore";
import { useTranslations } from "@/hooks/useTranslations";
import { RippleButton } from "../ui/ripple-button";
import { useRouter } from "next/navigation";
import { SingleLatestPost } from "./SingleLatestPost";
import { Loader2 } from "lucide-react";

export function LatestBlogPost() {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { locale } = useLocaleStore();
  const t = useTranslations("RecentBlogs");
  const router = useRouter();

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `/api/recent-blog?pageSize=5&locale=${locale}`
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
      <section className="py-16 md:py-24 bg-white h-fit">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {t("heading") || "Recent Blogs"}
              </h2>
              <div className="h-1 bg-yellow-500 rounded w-24 mx-auto"></div>
            </div>
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-8 h-8 animate-spin text-yellow-500" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 md:py-24 lg:py-32 bg-gray-50 h-fit">
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
    <section className=" bg-gray-50 h-fit py-2 rounded-lg">
      <div className="container mx-auto px-2">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Latest Posts
            </h2>
            <div className="h-1.5 bg-amber-500 rounded w-16 mx-auto"></div>
          </div>
          {/* Blog post */}
          <div className="grid grid-cols-1 gap-2 mx-auto">
            {blogs.length > 0 ? (
              blogs.map((blog) => (
                <SingleLatestPost key={blog.id} blog={blog} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-600">No recent blogs found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
