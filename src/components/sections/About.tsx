"use client";

import { useTranslations } from "@/hooks/useTranslations";
import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";

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
    }, 300);

    return () => clearTimeout(timer);
  }, [target, duration]);

  return (
    <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-amber-600">
      {count}
      {suffix}
    </span>
  );
}

export function About() {
  const t = useTranslations("about");

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Right Image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                {/* Placeholder for the consulting image */}
                <div className="aspect-[4/3] bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-20 h-20 bg-amber-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="w-10 h-10 text-amber-600" />
                    </div>
                    <p className="text-gray-600 text-lg font-medium">
                      {t("imageAlt")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Trusted by Thousands Badge */}
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-amber-400 to-orange-400 text-white px-6 py-4 rounded-2xl shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  <span className="font-bold text-sm md:text-base">
                    {t("trustedBadge")}
                  </span>
                </div>
              </div>
            </div>

            {/* Left Content */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  {t("title")}
                </h2>

                <div className="space-y-6 text-gray-600">
                  <p className="text-lg leading-relaxed">
                    {t("description.paragraph1")}
                  </p>

                  <p className="text-lg leading-relaxed">
                    {t("description.paragraph2")}
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-8">
                {/* Years Experience */}
                <div className="text-center lg:text-left">
                  <div className="mb-2">
                    <Counter target={15} suffix="+" />
                  </div>
                  <p className="text-gray-600 font-medium">
                    {t("stats.experience")}
                  </p>
                </div>

                {/* Success Rate */}
                <div className="text-center lg:text-left">
                  <div className="mb-2">
                    <Counter target={99} suffix="%" />
                  </div>
                  <p className="text-gray-600 font-medium">
                    {t("stats.successRate")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
