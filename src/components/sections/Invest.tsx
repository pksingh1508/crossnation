"use client";

import { useTranslations } from "@/hooks/useTranslations";
import { Button } from "@/components/ui/button";
import { DollarSign, ArrowRight } from "lucide-react";
import Image from "next/image";

export function Invest() {
  const t = useTranslations("invest");

  const features = [
    {
      key: "realEstate",
      text: t("features.realEstate"),
    },
    {
      key: "business",
      text: t("features.business"),
    },
    {
      key: "visa",
      text: t("features.visa"),
    },
    {
      key: "planning",
      text: t("features.planning"),
    },
  ];

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-4 lg:gap-8 items-center px-0 lg:px-10">
          {/* Image Section */}
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop"
                alt="Financial documents, calculator and investment planning"
                width={600}
                height={400}
                className="w-full h-[300px] md:h-[400px] object-cover"
              />

              {/* Floating Icon */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg transform rotate-12">
                <DollarSign className="w-8 h-8 text-white" />
              </div>

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>

          {/* Content Section */}
          <div className="order-1 lg:order-2">
            <div className="max-w-xl">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-6 leading-tight">
                {t("title")}
              </h2>

              <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                {t("description")}
              </p>

              {/* Features List */}
              <div className="space-y-4 mb-8">
                {features.map((feature, index) => (
                  <div key={feature.key} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-2 h-2 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full mt-3"></div>
                    <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                      {feature.text}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <Button
                size="lg"
                className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white px-8 py-4 text-base md:text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                {t("cta")}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
