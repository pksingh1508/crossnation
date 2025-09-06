"use client";

import React from "react";
import { ImmigrationNews } from "./ImmigrationNews";
import { SomeFAQ } from "./SomeFAQ";
import { useLocaleStore } from "@/store/useLocaleStore";

export function NewsSection() {
  const { locale } = useLocaleStore();

  return (
    <div className="py-16 md:py-9">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Desktop Layout: FAQ left, News right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* FAQ Section - Left Half */}
            <div className="order-1 lg:order-2">
              <SomeFAQ />
            </div>

            {/* Immigration News Section - Right Half */}
            <div className="order-2 lg:order-1">
              <ImmigrationNews locale={locale} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
