"use client";

import * as React from "react";
import { fontPoppins, fontInter, fontMontserrat } from "@/fonts";
import { RippleButton } from "@/components/ui/ripple-button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

interface ButtonData {
  text: string;
  onClick?: () => void;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "brand"
    | "brandOutline";
}

interface CustomHeroProps {
  heading: string;
  paragraph1: string;
  paragraph2: string;
  buttons: ButtonData[];
  isReversed?: boolean;
  imageSrc?: string;
  imageAlt?: string;
}

export function CustomHero({
  heading,
  paragraph1,
  paragraph2,
  buttons,
  isReversed = false,
  imageSrc,
  imageAlt = "Hero image",
}: CustomHeroProps) {
  const router = useRouter();
  const locale = useLocale();

  const handleButtonClick = () => {
    router.push(`/${locale}/contact`);
  };

  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto max-w-7xl px-3">
        <div
          className={cn(
            "grid lg:grid-cols-2 gap-8 lg:gap-12 ",
            isReversed ? "lg:grid-flow-col-dense" : ""
          )}
        >
          {/* Content Section */}
          <div
            className={cn(
              "space-y-6",
              isReversed ? "lg:order-2" : "lg:order-1"
            )}
          >
            {/* Heading */}
            <h1
              className={cn("text-2xl font-bold text-gray-800 leading-tight")}
            >
              {heading}
            </h1>

            {/* Paragraphs */}
            <div className="space-y-2">
              <p
                className={cn(
                  "text-base text-gray-600 leading-relaxed",
                  fontInter.className
                )}
              >
                {paragraph1}
              </p>

              <p
                className={cn(
                  "text-base text-gray-600 leading-relaxed",
                  fontInter.className
                )}
              >
                {paragraph2}
              </p>
            </div>

            {/* Buttons Grid */}
            <div className="pt-2">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                {buttons.slice(0, 10).map((button, index) => (
                  <RippleButton
                    key={index}
                    variant={button.variant || "outline"}
                    onClick={button.onClick || handleButtonClick}
                    className={cn(
                      "h-8 sm:h-10 text-sm sm:text-base font-medium transition-all duration-200",
                      "border-yellow-400 text-yellow-500 hover:bg-yellow-400 hover:text-black",
                      "focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 cursor-pointer py-2",
                      fontInter.className
                    )}
                  >
                    {button.text}
                  </RippleButton>
                ))}
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div
            className={cn("relative", isReversed ? "lg:order-1" : "lg:order-2")}
          >
            {imageSrc ? (
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src={imageSrc}
                  alt={imageAlt}
                  className="w-full h-[550px] object-cover"
                />
              </div>
            ) : (
              <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-yellow-100 to-yellow-200 aspect-[4/3] flex items-center justify-center">
                <div className="text-center space-y-4 p-8">
                  <div className="w-16 h-16 bg-yellow-400 rounded-full mx-auto flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-black"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p
                    className={cn("text-gray-600 text-lg", fontInter.className)}
                  >
                    Image Placeholder
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
