"use client";

import * as React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

interface GovernmentLink {
  name: string;
  logo: string;
  url: string;
  alt: string;
}

export function GovernmentLinks() {
  const t = useTranslations("governmentLinks");

  const governmentLinks: GovernmentLink[] = [
    {
      name: "Ministry of Foreign Affairs",
      logo: "/960px-Ministerstwo_Spraw_Zagranicznych_logo_2022.png",
      url: "https://www.gov.pl/web/dyplomacja",
      alt: "Ministry of Foreign Affairs Republic of Poland",
    },
    {
      name: "Council of Ministers",
      logo: "/Logo-kprm.png",
      url: "https://www.gov.pl/web/premier",
      alt: "Council of Ministers Republic of Poland",
    },
    {
      name: "National Bank of Poland",
      logo: "/Narodowy_Bank_Polski_logo_and_wordmark.png",
      url: "https://www.nbp.pl/",
      alt: "National Bank of Poland",
    },
    {
      name: "European Union",
      logo: "/europeanUnion.png",
      url: "https://european-union.europa.eu/index_en",
      alt: "National Bank of Poland",
    },
    {
      name: "Statistics Poland",
      logo: "/static.png",
      url: "https://stat.gov.pl/en/",
      alt: "Statistics Poland",
    },
  ];

  const handleLinkClick = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="w-full bg-gray-50 dark:bg-gray-900 pt-16 pb-10">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold font-poppins text-gray-900 dark:text-white mb-4">
            {t("title")}
          </h2>
          <div className="w-16 h-1 bg-yellow-500 mx-auto"></div>
        </div>

        {/* Government Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {governmentLinks.map((link, index) => (
            <div
              key={index}
              onClick={() => handleLinkClick(link.url)}
              className="flex justify-center items-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105 border border-gray-200 dark:border-gray-700"
            >
              <div className="relative w-full h-20 flex items-center justify-center">
                <Image
                  src={link.logo}
                  alt={link.alt}
                  width={200}
                  height={80}
                  className="max-w-full max-h-full object-contain filter hover:brightness-110 transition-all duration-300"
                  priority={index < 3}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-8">
          <p className="text-sm font-inter text-gray-600 dark:text-gray-400">
            {t("description")}
          </p>
        </div>
      </div>
    </div>
  );
}
