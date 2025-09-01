"use client";

import { useTranslations } from "next-intl";

export default function WorkInfo() {
  const tInfo = useTranslations("works.info");

  return (
    <section className="py-8 px-4 bg-white">
      <div className="max-w-7xl mx-auto text-center p-2">
        {/* Main Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {tInfo("heading")}
        </h1>

        {/* Underline decoration */}
        <div className="w-24 h-1.5 bg-blue-600 mx-auto mb-8"></div>

        {/* Subheading/Title */}
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">
          {tInfo("title")}
        </h2>

        {/* Description */}
        <p className="text-gray-600 leading-relaxed max-w-6xl mx-auto text-base md:text-lg">
          {tInfo("paragraph")}
        </p>
      </div>
    </section>
  );
}
