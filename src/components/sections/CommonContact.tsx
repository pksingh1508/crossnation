"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { RippleButton } from "@/components/ui/ripple-button";
import { MyForm } from "./MyForm";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

export function CommonContact() {
  const t = useTranslations("pages.commonContact");
  const locale = useLocale();
  const router = useRouter();
  return (
    <div className="w-full min-h-[80vh] bg-white">
      <div className="container mx-auto max-w-7xl px-4 py-10">
        <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl p-2 sm:p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
            {/* Left Section - Image + Content at Bottom */}
            <div className="relative flex flex-col justify-end p-3 order-2 lg:order-1 rounded-2xl overflow-hidden">
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-50"
                style={{
                  backgroundImage:
                    "url('https://ik.imagekit.io/eucareerserwis/home/Untitled%20design%20(7).webp')",
                }}
              ></div>

              {/* Foreground Content */}
              <div className="relative z-10 space-y-4">
                <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold font-montserrat text-gray-900 dark:text-white leading-tight">
                  Interested in Working With Us As an Employee, Employer, or
                  Partner?
                </h2>
              </div>
            </div>

            {/* Right Section - Form */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 lg:p-10 order-1 lg:order-2">
              <div className="mb-8">
                <p className="text-gray-600 dark:text-gray-300 font-inter">
                  {t("formInstruction")}
                </p>
              </div>
              <MyForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
