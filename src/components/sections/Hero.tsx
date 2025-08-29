"use client";

import { useTranslations } from "@/hooks/useTranslations";
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

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
  const t = useTranslations("home");
  const common = useTranslations("common");

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.12 },
    },
  };

  return (
    <motion.section
      variants={container}
      initial="hidden"
      animate="show"
      className="relative min-h-screen md:min-h-[80vh] flex items-center justify-center overflow-hidden"
    >
      <div className="container mx-auto px-2 relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col pt-8 md:pt-0 md:flex-row items-center justify-between">
          {/* Main Content */}

          <motion.div className="w-[90%] md:w-[50vw]">
            <Image
              src="/home.jpg"
              alt="Home"
              width={160}
              height={48}
              className="w-[90vw] md:w-[40vw] h-[70vh] md:h-[70vh] object-cover"
            />
          </motion.div>

          {/* CTA Button */}
          <div className="w-[50vw] pt-7 md:pt-0 flex items-center justify-center flex-col space-y-8">
            {/* Heading */}
            <div className="text-center">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900">
                {t("title1")}
              </h2>
              <p className="text-4xl sm:text-5xl md:text-6xl text-gray-900">
                {t("title2")}
              </p>
            </div>

            {/* First Row Buttons */}
            <div className="flex gap-6">
              <Button
                size="lg"
                className="bg-yellow-400 hover:bg-yellow-500 rounded-none text-white px-10 py-6 text-xl font-semibold shadow-md transition-all"
              >
                {t("btn1")}
              </Button>
              <Button
                size="lg"
                className="bg-purple-600 hover:bg-purple-700 rounded-none text-white px-10 py-6 text-xl font-semibold shadow-md transition-all"
              >
                {t("btn2")}
              </Button>
            </div>

            {/* Second Row Buttons */}
            <div className="flex gap-6">
              <Button
                size="lg"
                className="bg-teal-500 hover:bg-teal-600 text-white rounded-none px-11 py-6 text-xl font-semibold shadow-md transition-all"
              >
                {t("btn3")}
              </Button>
              <Button
                size="lg"
                className="bg-green-500 hover:bg-green-600 text-white rounded-none px-11 py-6 text-xl font-semibold shadow-md transition-all"
              >
                {t("btn4")}
              </Button>
            </div>

            {/* Counselling Section */}
            <div className="flex items-center gap-3 mt-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7 text-amber-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 10h.01M12 14h.01M16 10h.01M21 16v-2a4 4 0 00-3-3.87V9a7 7 0 10-14 0v1.13A4 4 0 001 14v2m20 0a2 2 0 01-2 2H5a2 2 0 01-2-2"
                />
              </svg>
              <div>
                <p className="text-gray-800 font-medium">{t("cta1")}</p>
                <button className="text-red-600 font-semibold hover:underline">
                  {t("cta2")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
