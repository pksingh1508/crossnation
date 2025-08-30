"use client";

import * as React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Users, UserCheck, Award, Building2, Globe } from "lucide-react";
import { RippleButton } from "../ui/ripple-button";

interface Stat {
  icon: React.ReactNode;
  number: string;
  label: string;
}

export function WhyChooseUs() {
  const t = useTranslations("whyChooseUs");

  const stats: Stat[] = [
    {
      icon: <UserCheck className="w-8 h-8 text-yellow-600" />,
      number: t("stats.visaSuccess.number"),
      label: t("stats.visaSuccess.label"),
    },
    {
      icon: <Users className="w-8 h-8 text-yellow-600" />,
      number: t("stats.guidedClients.number"),
      label: t("stats.guidedClients.label"),
    },
    {
      icon: <Award className="w-8 h-8 text-yellow-600" />,
      number: t("stats.experts.number"),
      label: t("stats.experts.label"),
    },
    {
      icon: <Building2 className="w-8 h-8 text-yellow-600" />,
      number: t("stats.offices.number"),
      label: t("stats.offices.label"),
    },
    {
      icon: <Globe className="w-8 h-8 text-yellow-600" />,
      number: t("stats.onlineServices.number"),
      label: t("stats.onlineServices.label"),
    },
  ];

  return (
    <div className="w-full bg-white dark:bg-gray-900 py-16">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Section - Content */}
          <div className="space-y-8">
            {/* Border decoration */}
            <div className="border-l-4 border-yellow-500 pl-8">
              <h2 className="text-3xl lg:text-4xl font-bold font-poppins text-gray-900 dark:text-white mb-4">
                {t("heading")}
              </h2>
              <p className="text-lg font-inter text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                {t("description")}
              </p>
              <RippleButton
                variant="brandOutline"
                size="lg"
                className="bg-yellow-400 hover:bg-yellow-500 rounded-none text-white px-10 py-6 text-xl font-semibold shadow-md transition-all"
              >
                {t("readMore")}
              </RippleButton>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center space-y-2">
                  <div className="flex justify-center mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold font-poppins text-gray-900 dark:text-white">
                    {stat.number}
                  </div>
                  <div className="text-sm font-inter text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Section - Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg">
              <Image
                src="/home_compressed.jpg"
                alt="Professional woman working"
                width={600}
                height={400}
                className="w-full h-[50vh] object-cover rounded-lg shadow-lg"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
