"use client";

import { fontInter, fontPoppins } from "@/fonts";
import { useTranslations } from "next-intl";

export default function WorkInfo() {
  const tInfo = useTranslations("works.info");

  return (
    <section className="py-8 px-4 bg-white">
      <div className="max-w-6xl mx-auto p-2">
        {/* Main Heading */}
        <h1
          className={`text-3xl text-center font-bold text-gray-900 mb-4 ${fontPoppins.className}`}
        >
          {tInfo("heading")}
        </h1>

        {/* Underline decoration */}
        <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto mb-6"></div>

        {/* Subheading/Title */}
        <h2
          className={`text-xl text-center md:text-2xl font-semibold text-gray-800 mb-6 ${fontPoppins.className}`}
        >
          {tInfo("title")}
        </h2>

        {/* Description */}
        <p
          className={`text-gray-600 leading-relaxed max-w-6xl text-base text-justify hyphens-auto ${fontInter.className}`}
        >
          {tInfo("paragraph")}
        </p>
      </div>
    </section>
  );
}
