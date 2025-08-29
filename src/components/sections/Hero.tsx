"use client";

import { useTranslations } from "@/hooks/useTranslations";
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface CounterProps {
  target: number;
  suffix?: string;
  duration?: number;
}

function Counter({ target, suffix = "", duration = 2000 }: CounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const startValue = 0;

    const updateCount = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(
        startValue + (target - startValue) * easeOutQuart
      );

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    const timer = setTimeout(() => {
      requestAnimationFrame(updateCount);
    }, 500); // Start animation after 500ms delay

    return () => clearTimeout(timer);
  }, [target, duration]);

  return (
    <span className="text-2xl font-bold text-gray-800">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export function Hero() {
  const t = useTranslations("home.hero");
  const common = useTranslations("common");
  const shouldReduceMotion = useReducedMotion();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.12 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 12 },
    show: {
      opacity: 1,
      y: 0,
    },
  };

  const itemTransition = {
    duration: 0.6,
    ease: "easeOut",
  };

  return (
    <motion.section
      variants={container}
      initial="hidden"
      animate="show"
      className="relative min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-amber-400 rounded-full blur-3xl"
          animate={shouldReduceMotion ? {} : { y: [0, -6, 0] }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-40 h-40 bg-orange-400 rounded-full blur-3xl"
          animate={shouldReduceMotion ? {} : { y: [0, 8, 0] }}
          transition={{
            duration: 9,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-300 rounded-full blur-3xl"
          animate={shouldReduceMotion ? {} : { y: [0, 5, 0] }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Stats Cards - Positioned Absolutely */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {/* Countries Card - Top Left */}
        <div className="absolute top-8 left-4 md:top-16 md:left-8 lg:top-20 lg:left-12 pointer-events-auto">
          <motion.div
            variants={item}
            whileHover={shouldReduceMotion ? {} : { y: -4, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 250, damping: 20 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg border border-white/20 max-w-[200px] md:max-w-xs"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-amber-100 rounded-full flex items-center justify-center">
                <Globe className="w-4 h-4 md:w-5 md:h-5 text-amber-600" />
              </div>
              <Counter target={25} suffix="+" />
            </div>
            <p className="text-gray-600 text-xs md:text-sm font-medium">
              {t("countries")}
            </p>
          </motion.div>
        </div>

        {/* Success Stories Card - Bottom Right */}
        <div className="absolute bottom-32 right-4 md:bottom-40 md:right-8 lg:bottom-48 lg:right-12 pointer-events-auto">
          <motion.div
            variants={item}
            whileHover={shouldReduceMotion ? {} : { y: -4, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 250, damping: 20 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg border border-white/20 max-w-[200px] md:max-w-xs"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-amber-100 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 md:w-5 md:h-5 text-amber-600" />
              </div>
              <Counter target={10000} suffix="+" />
            </div>
            <p className="text-gray-600 text-xs md:text-sm font-medium">
              {t("successStories")}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-20">
        <div className="max-w-6xl mx-auto">
          {/* Main Content */}
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1
              variants={item}
              className="text-balance text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight"
            >
              {t("title.part1")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500">
                {t("title.highlight")}
              </span>
            </motion.h1>

            <motion.p
              variants={item}
              className="text-lg md:text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              {t("description")}
            </motion.p>

            {/* CTA Button */}
            <motion.div
              variants={item}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.div
                whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                >
                  {t("cta")}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>

              <motion.div
                whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-amber-500 text-amber-700 hover:bg-amber-50 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white bg-transparent"
                >
                  {common("contact")}
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <motion.div
        initial={shouldReduceMotion ? {} : { y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="absolute bottom-0 left-0 right-0"
      >
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </motion.div>
    </motion.section>
  );
}
