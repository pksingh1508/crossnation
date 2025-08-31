"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { RippleButton } from "@/components/ui/ripple-button";
import { MyForm } from "./MyForm";

export function CommonContact() {
  const t = useTranslations("pages.commonContact");

  return (
    <div className="w-full min-h-[80vh] bg-white">
      <div className="container mx-auto max-w-7xl px-4 py-10">
        <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl p-2 sm:p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Section - Content */}
            <div className="space-y-8 order-2 lg:order-1">
              <div className="space-y-4">
                <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold font-montserrat text-gray-900 dark:text-white leading-tight">
                  {t("title")}
                </h2>
                <p className="text-lg font-open-sans text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t("description")}
                </p>
              </div>

              {/* Four Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <RippleButton
                  variant="brandOutline"
                  size="lg"
                  className="h-12 text-base font-semibold font-montserrat border-2 hover:bg-yellow-400 hover:text-black hover:border-yellow-400"
                >
                  {t("buttons.work")}
                </RippleButton>
                <RippleButton
                  variant="brandOutline"
                  size="lg"
                  className="h-12 text-base font-semibold font-montserrat border-2 hover:bg-yellow-400 hover:text-black hover:border-yellow-400"
                >
                  {t("buttons.invest")}
                </RippleButton>
                <RippleButton
                  variant="brandOutline"
                  size="lg"
                  className="h-12 text-base font-semibold font-montserrat border-2 hover:bg-black hover:text-white hover:border-black"
                >
                  {t("buttons.employer")}
                </RippleButton>
                <RippleButton
                  variant="brandOutline"
                  size="lg"
                  className="h-12 text-base font-semibold font-montserrat border-2 hover:bg-black hover:text-white hover:border-black"
                >
                  {t("buttons.recruiter")}
                </RippleButton>
              </div>

              {/* Additional Info */}
              <div className="space-y-3 pt-4">
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="font-inter text-sm">
                    {t("features.quickResponse")}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="font-inter text-sm">
                    {t("features.consultation")}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="font-inter text-sm">
                    {t("features.secure")}
                  </span>
                </div>
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
