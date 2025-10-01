"use client";

import { fontInter, fontMontserrat, fontPoppins } from "@/fonts";
import { useTranslations } from "@/hooks/useTranslations";
import { TrendingUp } from "lucide-react";
import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export function About() {
  const locale = useLocale();
  const t = useTranslations("about");

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Right Image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                {/* Placeholder for the consulting image */}
                <Image
                  src="https://ik.imagekit.io/eucareerserwis/home/about.webp"
                  alt="Consulting"
                  width={600}
                  height={400}
                  className="w-full h-[70vh] md:h-[80vh] object-cover"
                />
              </div>

              {/* Trusted by Thousands Badge */}
              <Link
                href={`/${locale}/company-certificate`}
                className="absolute -bottom-2 left-6 bg-gradient-to-r from-amber-400 to-orange-400 text-white px-6 py-4 rounded-2xl shadow-lg transform rotate-0 hover:rotate-3 transition-transform duration-300"
              >
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  <span
                    className={`font-bold text-sm md:text-base ${fontInter.className}`}
                  >
                    {t("trustedBadge")}
                  </span>
                </div>
              </Link>
            </div>

            {/* Left Content */}
            <div className="space-y-8">
              <div>
                <p className="text-lg text-amber-600 mb-4">{t("smallTitle")}</p>
                <h2
                  className={`text-3xl md:text-4xl font-bold text-gray-900 mb-6 ${fontPoppins.className}`}
                >
                  {t("title")}
                </h2>

                <div className="space-y-6 text-gray-600">
                  <p
                    className={`text-base text-gray-600 leading-relaxed ${fontInter.className}`}
                  >
                    {t("description.paragraph1")}
                  </p>

                  <p
                    className={`text-base text-gray-600 leading-relaxed ${fontInter.className}`}
                  >
                    {t("description.paragraph2")}
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
