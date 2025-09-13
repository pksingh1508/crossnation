"use client";

import { motion, easeOut, Variants } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "@/hooks/useTranslations";
import { HelpCircle, MessageSquare, Users, Phone } from "lucide-react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { RippleButton } from "../ui/ripple-button";
import { useRouter } from "next/navigation";

export function SolveQuery() {
  const t = useTranslations("solveQuery");
  const locale = useLocale();
  const router = useRouter();

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const itemTransition = {
    duration: 0.6,
    ease: easeOut,
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
    },
  };

  const imageTransition = {
    duration: 0.8,
    ease: easeOut,
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50/30 to-amber-50/30 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-400/10 rounded-full blur-2xl" />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-purple-400/10 rounded-full blur-xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
          >
            {/* Left side - Content */}
            <motion.div
              variants={itemVariants}
              transition={itemTransition}
              className="space-y-8"
            >
              {/* Icon and Badge */}
              <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-amber-200 rounded-full px-6 py-3 shadow-sm">
                <HelpCircle className="w-6 h-6 text-amber-600" />
                <span className="text-amber-800 font-semibold text-sm uppercase tracking-wide">
                  {t("title")}
                </span>
              </div>

              {/* Heading */}
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  {t("heading1")}{" "}
                  <span className="text-amber-600 relative">
                    {t("doubts")}
                    <div className="absolute -bottom-2 left-0 w-full h-3 bg-amber-200/60 -z-10 rounded-md" />
                  </span>
                </h2>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-blue-600">
                  {t("heading2")}
                </h3>
              </div>

              {/* Description */}
              <div className="space-y-6">
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                  {t("paragraph1")}
                </p>

                <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                  {t("paragraph2")}
                </p>
              </div>
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <RippleButton
                  variant="brandOutline"
                  size="lg"
                  onClick={() => router.push(`/${locale}/contact`)}
                  className="h-12 text-base font-semibold font-montserrat border-2 border-[#fecc00] text-yellow-500 hover:bg-yellow-400 hover:text-black hover:border-yellow-400 cursor-pointer"
                >
                  <MessageSquare className="w-5 h-5" />
                  {t("cta")}
                </RippleButton>
              </div>
            </motion.div>

            {/* Right side - Image */}
            <motion.div
              variants={imageVariants}
              transition={imageTransition}
              className="relative order-first lg:order-last"
            >
              <div className="relative group">
                {/* Main image container */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl transform group-hover:scale-[1.02] transition-transform duration-300">
                  <Image
                    src="/emp1.webp"
                    alt="Professional consultant helping with immigration and career queries"
                    width={600}
                    height={500}
                    className="w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover"
                    priority
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </div>

                {/* Floating elements */}
                <div className="absolute -top-4 -left-4 w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full flex items-center justify-center shadow-xl animate-pulse">
                  <HelpCircle className="w-8 h-8 md:w-10 md:h-10 text-white" />
                </div>

                <div className="absolute -bottom-3 -right-3 w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-xl">
                  <MessageSquare className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>

                {/* Background decoration */}
                <div className="absolute -z-10 top-4 left-4 md:top-8 md:left-8 w-full h-full bg-gradient-to-br from-amber-100/60 to-blue-100/60 rounded-2xl" />
              </div>

              {/* Stats cards */}
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-3 md:p-4 shadow-lg">
                <div className="text-center">
                  <div className="text-xl md:text-2xl font-bold text-amber-600">
                    1000+
                  </div>
                  <div className="text-xs text-gray-600">
                    {t("querySolved")}
                  </div>
                </div>
              </div>

              <div className="absolute bottom-12 md:bottom-16 left-4 bg-white/95 backdrop-blur-sm rounded-xl p-3 md:p-4 shadow-lg">
                <div className="text-center">
                  <div className="text-xl md:text-2xl font-bold text-blue-600">
                    24/7
                  </div>
                  <div className="text-xs text-gray-600">{t("support")}</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
