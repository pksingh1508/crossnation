"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { SuccessStoryCard } from "@/lib/cms/types";
import { formatDate } from "@/lib/cms/format";

interface SingleSuccessStoryProps {
  successStory: SuccessStoryCard;
  index: number;
}

export function SingleSuccessStory({
  successStory,
  index,
}: SingleSuccessStoryProps) {
  const { name } = successStory;
  const story = successStory.story ?? "";
  const publishedAt = formatDate(successStory.published_at, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Image URLs from the CMS are complete
  const imageUrl = successStory.image_url ?? "";
  const imageAlt = successStory.image_alt || name;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
    >
      {/* Mobile Layout (Small devices) - Vertical */}
      <div className="block lg:hidden">
        {/* Image at top */}
        {imageUrl && (
          <div className="mb-4">
            <div className="relative w-full aspect-square max-w-[200px] mx-auto">
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                className="object-cover rounded-xl"
                sizes="200px"
              />
            </div>
          </div>
        )}

        {/* Name below image */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
          {name}
        </h3>

        {/* What they say below name */}
        <div className="text-gray-600 leading-relaxed mb-3">
          <p className="italic whitespace-pre-line">"{story}"</p>
        </div>

        {/* Date */}
        {publishedAt && (
          <div className="text-sm text-gray-500 text-center">{publishedAt}</div>
        )}
      </div>

      {/* Desktop Layout (Large devices) - Horizontal */}
      <div className="hidden lg:flex lg:items-start lg:gap-6">
        {/* Image on the left */}
        {imageUrl && (
          <div className="flex-shrink-0">
            <div className="relative w-24 h-24">
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                className="object-cover rounded-xl"
                sizes="96px"
              />
            </div>
          </div>
        )}

        {/* Content on the right */}
        <div className="flex-1 min-w-0">
          {/* Name */}
          <h3 className="text-xl font-bold text-gray-900 mb-2">{name}</h3>

          {/* What they say */}
          <div className="text-gray-600 leading-relaxed mb-3">
            <p className="italic whitespace-pre-line">"{story}"</p>
          </div>

          {/* Date */}
          {publishedAt && (
            <div className="text-sm text-gray-500">{publishedAt}</div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
