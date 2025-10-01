"use client";

import { fontInter, fontPoppins } from "@/fonts";
import { useTranslations } from "next-intl";

export default function RecruiterInfo() {
  const tInfo = useTranslations("recruiter.info");

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

        {/* Description */}
        <p
          className={`text-gray-600 leading-relaxed max-w-6xl text-base text-justify hyphens-auto mb-6 ${fontInter.className}`}
        >
          {tInfo("description")}
        </p>

        {/* Bullet Points */}
        <div className="space-y-2">
          <div className="flex items-start">
            <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2.5 mr-2 flex-shrink-0"></div>
            <p
              className={`text-gray-600 leading-relaxed text-base text-justify hyphens-auto ${fontInter.className}`}
            >
              {tInfo("bullets.b1")}
            </p>
          </div>
          <div className="flex items-start">
            <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2.5 mr-2 flex-shrink-0"></div>
            <p
              className={`text-gray-600 leading-relaxed text-base text-justify hyphens-auto ${fontInter.className}`}
            >
              {tInfo("bullets.b2")}
            </p>
          </div>
          <div className="flex items-start">
            <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2.5 mr-2 flex-shrink-0"></div>
            <p
              className={`text-gray-600 leading-relaxed text-base text-justify hyphens-auto ${fontInter.className}`}
            >
              {tInfo("bullets.b3")}
            </p>
          </div>
          <div className="flex items-start">
            <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2.5 mr-2 flex-shrink-0"></div>
            <p
              className={`text-gray-600 leading-relaxed text-base text-justify hyphens-auto ${fontInter.className}`}
            >
              {tInfo("bullets.b4")}
            </p>
          </div>
          <div className="flex items-start">
            <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2.5 mr-2 flex-shrink-0"></div>
            <p
              className={`text-gray-600 leading-relaxed text-base text-justify hyphens-auto ${fontInter.className}`}
            >
              {tInfo("bullets.b5")}
            </p>
          </div>
          <div className="flex items-start">
            <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2.5 mr-2 flex-shrink-0"></div>
            <p
              className={`text-gray-600 leading-relaxed text-base text-justify hyphens-auto ${fontInter.className}`}
            >
              {tInfo("bullets.b6")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
