"use client";

import { TestimonialItem } from "@/lib/strapi";
import Image from "next/image";
import { motion } from "framer-motion";
import { Eye, User } from "lucide-react";

interface SingleOneTestimonialProps {
  testimonial: TestimonialItem;
  index?: number;
}

export function SingleOneTestimonial({
  testimonial,
  index = 0,
}: SingleOneTestimonialProps) {
  const URL = process.env.NEXT_PUBLIC_CMS_URL;
  // Extract data with fallback handling for both Strapi attribute structure and flat structure
  const data = {
    id: testimonial.id,
    name: testimonial.attributes?.name || testimonial.name || "Anonymous",
    what_they_say:
      testimonial.attributes?.what_they_say || testimonial.what_they_say || "",
    role: testimonial.attributes?.role || testimonial.role || "",
    slug: testimonial.attributes?.slug || testimonial.slug || "",
    view_count:
      testimonial.attributes?.view_count || testimonial.view_count || 0,
    updatedAt: testimonial.attributes?.updatedAt || testimonial.updatedAt || "",
    user_image:
      testimonial.attributes?.user_image?.data?.attributes?.url ||
      testimonial.user_image?.url ||
      null,
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="w-full"
    >
      <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
          {/* Left side - Image */}
          <div className="flex-shrink-0">
            <div className="rounded-xl overflow-hidden shadow-md">
              {data.user_image ? (
                <Image
                  src={`${URL}${data.user_image}`}
                  alt={`${data.name} - testimonial`}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                  <User className="w-8 h-8 md:w-12 md:h-12 text-white" />
                </div>
              )}
            </div>
          </div>

          {/* Right side - Content */}
          <div className="flex-1 min-w-0">
            {/* Name */}
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 truncate">
              {data.name}
            </h3>

            {/* View count */}
            <div className="flex items-center gap-2 mb-4">
              <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                <Eye className="w-4 h-4" />
                <span>Views: {data.view_count.toLocaleString()}</span>
              </div>
              {data.role && (
                <div className="inline-flex items-center bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                  {data.role}
                </div>
              )}
            </div>

            {/* Testimonial content */}
            <div className="text-gray-700 leading-relaxed">
              <p className="text-base md:text-lg">{data.what_they_say}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
