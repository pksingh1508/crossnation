"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion, easeOut, Variants } from "framer-motion";
import { TestimonialItem, TestimonialResponse } from "@/lib/strapi";
import { SingleTestimonial } from "./SingleTestimonial";
import { Loader2, Users, MessageCircle } from "lucide-react";
import Link from "next/link";

export function RecentTestimonials() {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const locale = useLocale();
  const t = useTranslations("testimonials");

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `/api/recent-testimonial?locale=${locale}&pageSize=3`
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch testimonials: ${response.statusText}`
          );
        }

        const data: TestimonialResponse = await response.json();
        setTestimonials(data.data || []);
      } catch (err) {
        console.error("Error fetching testimonials:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch testimonials"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, [locale]);

  // Animation variants for container
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const headerVariants: Variants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const headerTransition = {
    duration: 0.6,
    ease: easeOut,
  };

  if (loading) {
    return (
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-blue-50/30">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center justify-center min-h-[400px]">
              <Loader2 className="w-12 h-12 animate-spin text-amber-500 mb-4" />
              <p className="text-gray-600 text-lg">Loading testimonials...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-blue-50/30">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <MessageCircle className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Unable to load testimonials
              </h3>
              <p className="text-gray-600 max-w-md">{error}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!testimonials.length) {
    return (
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-blue-50/30">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No testimonials available
              </h3>
              <p className="text-gray-600 max-w-md">
                Check back later for client testimonials.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            variants={headerVariants}
            initial="hidden"
            whileInView="visible"
            transition={headerTransition}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            {/* Title */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              {t("heading") || "Testimonials"}
            </h2>
            <div className="h-1 bg-amber-600 rounded w-24 mx-auto"></div>
          </motion.div>

          {/* Testimonials Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <SingleTestimonial
                key={testimonial.id}
                testimonial={testimonial}
                index={index}
                locale={locale}
              />
            ))}
          </motion.div>

          {/* Call to Action */}
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
              href={`/${locale}/testimonials`}
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-105 whitespace-nowrap"
            >
              Read More Testimonials
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
