"use client";

import { useTranslations } from "next-intl";

export default function JobseekerInfo() {
  const tInfo = useTranslations("jobseeker.info");

  return (
    <section className="py-8 px-4 bg-white">
      <div className="max-w-6xl mx-auto p-2 text-center">
        {/* Main Heading */}
        <h1 className="text-3xl text-center font-bold text-gray-900 mb-4">
          {tInfo("heading")}
        </h1>

        {/* Underline decoration */}
        <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto mb-6"></div>

        {/* Subheading/Title */}
        <h2 className="text-xl text-center md:text-2xl font-semibold text-gray-800 mb-6">
          {tInfo("title")}
        </h2>

        {/* Description */}
        <p className="text-gray-600 leading-relaxed max-w-6xl text-base">
          {tInfo("paragraph1")}
        </p>
        <p className="text-gray-600 leading-relaxed max-w-6xl text-base">
          {tInfo("paragraph2")}
        </p>
        <p className="text-gray-600 leading-relaxed max-w-6xl text-base">
          {tInfo("paragraph3")}
        </p>
        <p className="text-gray-600 leading-relaxed max-w-6xl text-base">
          {tInfo("paragraph4")}
        </p>
        <p className="text-gray-600 leading-relaxed max-w-6xl text-base">
          {tInfo("paragraph5")}
        </p>
      </div>
    </section>
  );
}
