"use client";

import { TestimonialItem } from "@/lib/strapi";
import Image from "next/image";
import { motion, easeInOut } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import Link from "next/link";

interface SingleTestimonialProps {
  testimonial: TestimonialItem;
  index?: number;
  locale: string;
}

export function SingleTestimonial({
  testimonial,
  index = 0,
  locale,
}: SingleTestimonialProps) {
  // Extract data with fallback handling for both Strapi attribute structure and flat structure
  const data = {
    id: testimonial.id,
    name: testimonial.attributes?.name || testimonial.name || "Anonymous",
    what_they_say:
      testimonial.attributes?.what_they_say || testimonial.what_they_say || "",
    role: testimonial.attributes?.role || testimonial.role || "Client",
    company: testimonial.attributes?.company || testimonial.company || "",
    slug: testimonial.attributes?.slug || testimonial.slug || "",
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

  const cardTransition = {
    duration: 0.6,
    delay: index * 0.1,
    ease: easeInOut,
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      transition={cardTransition}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ y: -8 }}
      className="h-full"
    >
      <Card className="relative h-full p-6 md:p-8 bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl group overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-purple-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Quote icon */}
        <div className="relative mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full shadow-lg">
            <Quote className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Stars rating */}
        <div className="relative flex items-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
          ))}
        </div>

        {/* Testimonial content */}
        <div className="relative mb-8">
          <blockquote className="text-gray-700 text-lg leading-relaxed font-medium">
            "{data.what_they_say}"
          </blockquote>
        </div>

        {/* Client info */}
        <Link href={`${locale}/testimonials`}>
          <div className="relative flex items-center gap-4 mt-auto pt-4 border-t border-gray-100">
            {/* Avatar */}
            <div className="relative">
              <div className="w-14 h-14 rounded-full overflow-hidden ring-4 ring-white shadow-md">
                {data.user_image ? (
                  <Image
                    src={
                      data.user_image.startsWith("http")
                        ? data.user_image
                        : `https://determined-unity-de531adc95.strapiapp.com${data.user_image}`
                    }
                    alt={`${data.name} - testimonial`}
                    width={56}
                    height={56}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">
                      {data.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
              {/* Online indicator */}
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full" />
            </div>

            {/* Client details */}
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-gray-900 text-lg truncate">
                {data.name}
              </h4>
              <p className="text-gray-500 text-sm font-medium truncate">
                {data.role}
                {data.company && (
                  <>
                    <span className="mx-2">•</span>
                    <span className="text-gray-400">{data.company}</span>
                  </>
                )}
              </p>
            </div>
          </div>
        </Link>

        {/* Hover effect overlay */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-amber-400/20 to-orange-400/20 rounded-full transform translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-500 opacity-0 group-hover:opacity-100" />
      </Card>
    </motion.div>
  );
}
