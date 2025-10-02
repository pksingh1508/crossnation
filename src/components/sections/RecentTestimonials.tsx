"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion, easeOut, Variants } from "framer-motion";
import { TestimonialItem } from "@/lib/strapi";
import { SingleTestimonial } from "./SingleTestimonial";
import { fontPoppins } from "@/fonts";

export function RecentTestimonials() {
  const testimonialData: TestimonialItem[] = [
    {
      id: 1,
      name: "Manoj",
      what_they_say:
        "Thanks to EU Career Serwis, my work permit journey was smooth and well-organized. From paperwork to embassy coordination, their expert team handled everything with care. Their knowledge and support truly make a difference for international candidates like me",
      user_image: {
        url: "https://ik.imagekit.io/eucareerserwis/home/Manoj.webp",
      },
    },
    {
      id: 2,
      user_image: {
        url: "https://ik.imagekit.io/eucareerserwis/home/workPermit.webp",
      },
    },
    {
      id: 3,
      user_image: {
        url: "https://ik.imagekit.io/eucareerserwis/home/stamp.webp",
      },
    },
  ];
  const locale = useLocale();
  const t = useTranslations("testimonials");

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
            <h2
              className={`text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 ${fontPoppins.className}`}
            >
              {t("heading") || "Testimonials"}
            </h2>
            <div className="h-2 bg-yellow-500 rounded w-24 mx-auto"></div>
          </motion.div>

          {/* Testimonials Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {testimonialData.map((testimonial, index) => (
              <SingleTestimonial
                key={testimonial.id}
                testimonial={testimonial}
                index={index}
                locale={locale}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
