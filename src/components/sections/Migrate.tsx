"use client";

import { useTranslations } from "@/hooks/useTranslations";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";

export function Migrate() {
  const t = useTranslations("migrate");
  const locale = useLocale();

  const features = [
    {
      key: "skilled",
      text: t("features.skilled"),
    },
    {
      key: "express",
      text: t("features.express"),
    },
    {
      key: "document",
      text: t("features.document"),
    },
    {
      key: "settlement",
      text: t("features.settlement"),
    },
  ];

  return (
    <section className="py-16 px-4 xl:px-28">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-4 lg:gap-8 items-center">
          {/* Content Section */}
          <div className="order-2 lg:order-1">
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
                    <div className="flex-shrink-0 w-2 h-2 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full mt-3"></div>
                    <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                      {feature.text}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-4 text-base md:text-lg font-semibold rounded-md shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <Link
                  href={`/${locale}/migrate`}
                  className="flex items-center gap-2"
                >
                  {t("cta")}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Image Section */}
          <div className="relative order-1 lg:order-2">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=400&fit=crop"
                alt="Travel planning with maps and documents"
                width={600}
                height={400}
                className="w-full h-[300px] md:h-[400px] object-cover"
              />

              {/* Floating Icon */}
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg transform -rotate-12">
                <MapPin className="w-8 h-8 text-white" />
              </div>

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
