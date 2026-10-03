"use client";
import React from "react";
import type { BlogPostCard } from "@/lib/cms/types";
import { SingleLatestPost } from "./SingleLatestPost";

interface LatestBlogPostProps {
  /** The newest posts, loaded on the server by the page */
  posts: BlogPostCard[];
}

export function LatestBlogPost({ posts }: LatestBlogPostProps) {
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
            {posts.length > 0 ? (
              posts.map((blog) => (
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
