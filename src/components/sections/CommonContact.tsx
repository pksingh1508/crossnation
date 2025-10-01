"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { RippleButton } from "@/components/ui/ripple-button";
import { MyForm } from "./MyForm";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { fontInter } from "@/fonts";

export function CommonContact() {
  const t = useTranslations("pages.commonContact");
  const locale = useLocale();
  const router = useRouter();
  return (
    <div className="w-full min-h-[80vh] bg-white">
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 rounded-2xl">
          <div className="grid lg:grid-cols-[1fr_400px] gap-8 lg:gap-6 items-stretch">
            {/* Left Section - Image + Content at Bottom */}
            <div className="relative flex flex-col justify-end p-2 order-2 lg:order-1 rounded-2xl overflow-hidden h-[90vh] border-5 border-yellow-500">
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-center"
                style={{
                  backgroundImage:
                    "url('https://ik.imagekit.io/eucareerserwis/home/peoples.webp')",
                }}
              ></div>

              {/* Foreground Content */}
              <div className="relative z-10 flex items-center flex-col my-24 rounded-2xl py-3 bg-black opacity-70 w-fit mx-auto px-3">
                <p
                  className={`text-3xl lg:text-4xl font-bold font-montserrat text-yellow-500 dark:text-white leading-tight ${fontInter.className}`}
                >
                  Interested in Working With Us
                </p>
                <p
                  className={`text-3xl lg:text-4xl font-bold font-montserrat text-yellow-500 dark:text-white leading-tight ${fontInter.className}`}
                >
                  As an Employee, Employer, or Partner?
                </p>
              </div>
            </div>

            {/* Right Section - Form */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-3 lg:p-6 order-1 lg:order-2 border-5 border-yellow-500">
              <div className="mb-8">
                <p
                  className={`text-gray-600 dark:text-gray-300 font-inter text-center ${fontInter.className}`}
                >
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
