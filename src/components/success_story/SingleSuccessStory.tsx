"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SuccessItem } from "@/lib/strapi";

interface SingleSuccessStoryProps {
  successStory: SuccessItem;
  index: number;
}

export function SingleSuccessStory({
  successStory,
  index,
}: SingleSuccessStoryProps) {
  const URL = process.env.NEXT_PUBLIC_CMS_URL;
  // Get values from both nested and flat structure
  const name = successStory.attributes?.name || successStory.name || "";
  const story = successStory.attributes?.story || successStory.story || "";
  const updatedAt =
    successStory.attributes?.updatedAt || successStory.updatedAt || "";

  // Get image URL from nested or flat structure
  const imageUrl =
    successStory.attributes?.success_image?.data?.attributes?.url ||
    successStory.success_image?.url ||
    "";

  const fullImageUrl = imageUrl.startsWith("http")
    ? imageUrl
    : `${URL}${imageUrl}`;

  // Format date
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return "";
    }
  };

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
                src={`${fullImageUrl}`}
                alt={name}
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
          <p className="italic">"{story}"</p>
        </div>

        {/* Date */}
        {updatedAt && (
          <div className="text-sm text-gray-500 text-center">
            {formatDate(updatedAt)}
          </div>
        )}
      </div>

      {/* Desktop Layout (Large devices) - Horizontal */}
      <div className="hidden lg:flex lg:items-start lg:gap-6">
        {/* Image on the left */}
        {imageUrl && (
          <div className="flex-shrink-0">
            <div className="relative w-24 h-24">
              <Image
                src={fullImageUrl}
                alt={name}
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
            <p className="italic">"{story}"</p>
          </div>

          {/* Date */}
          {updatedAt && (
            <div className="text-sm text-gray-500">{formatDate(updatedAt)}</div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
