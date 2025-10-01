import React from "react";
import Link from "next/link";
import { BlogItem } from "@/lib/strapi";
import Image from "next/image";
import { useLocale } from "next-intl";

interface LatestPostProps {
  blog: BlogItem;
}

export function SingleLatestPost({ blog }: LatestPostProps) {
  // Handle both nested attributes structure and flat structure
  const title = blog.attributes?.title || blog.title || "Untitled";
  const updatedAt = blog.attributes?.updatedAt || blog.updatedAt || "";
  const likes_count = blog.attributes?.likes_count || blog.likes_count || 0;
  const slug = blog.attributes?.slug || blog.slug || "";
  const image_url = blog.blog_image?.url || "";
  const locale = useLocale();
  const URL = process.env.NEXT_PUBLIC_CMS_URL;

  // Format the date to show like "03 Jun"
  const formatDate = (dateString: string) => {
    if (!dateString) return "No date";
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "short",
    };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <Link href={`/${locale}/blog/${slug}`} className="block max-w-2xl">
      <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 p-1">
        <div className="flex gap-4 items-start">
          {/* Small Blog Image - Left Side */}
          <div className="flex-shrink-0 w-27 h-20 overflow-hidden rounded-lg">
            {image_url ? (
              <Image
                src={`${URL}${image_url}`}
                alt={title}
                width={80}
                height={80}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400 text-xs">No Image</span>
              </div>
            )}
          </div>

          {/* Blog Content - Right Side */}
          <div className="flex-1 min-w-0">
            {/* Title */}
            <h3 className="text-base font-semibold text-gray-800 leading-tight hover:text-blue-600 transition-colors mb-2">
              {title}
            </h3>

            {/* Date and Likes */}
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <span className="text-amber-500 font-medium">
                  {formatDate(updatedAt)}
                </span>
              </div>

              <div className="flex items-center space-x-1">
                <svg
                  className="w-4 h-4 text-red-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <span>{likes_count}</span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
