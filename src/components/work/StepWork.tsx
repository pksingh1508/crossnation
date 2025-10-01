"use client";

import * as React from "react";
import Image from "next/image";
import { fontInter, fontPoppins } from "@/fonts";

interface StepWorkProps {
  image: string;
  imageAlt?: string;
  heading: string;
  paragraph1: string;
  paragraph2: string;
  paragraph3: string;
  paragraph4: string;
  isReversed?: boolean;
}

export function StepWork({
  image,
  imageAlt = "Step illustration",
  heading,
  paragraph1,
  paragraph2,
  paragraph3,
  paragraph4,
  isReversed = false,
}: StepWorkProps) {
  return (
    <div className="w-full">
      <div className="container mx-auto max-w-7xl px-4 lg:py-16 py-8">
        <div
          className={`grid lg:grid-cols-2 gap-12 lg:gap-16 ${isReversed ? "lg:flex-row-reverse" : ""}`}
        >
          {/* Image Section */}
          <div
            className={`flex justify-center ${isReversed ? "lg:justify-end" : "lg:justify-start"} ${isReversed ? "lg:order-2" : "lg:order-1"}`}
          >
            <div className="relative w-full h-auto max-w-lg">
              <Image
                src={image}
                alt={imageAlt}
                width={500}
                height={400}
                className="w-full h-[550px] object-cover rounded-md shadow-lg"
                priority
              />
            </div>
          </div>

          {/* Text Content Section */}
          <div
            className={`space-y-6 ${isReversed ? "lg:order-1" : "lg:order-2"}`}
          >
            <h2
              className={`text-3xl font-bold font-poppins text-gray-900 dark:text-white ${fontPoppins.className}`}
            >
              {heading}
            </h2>

            <div className="space-y-2">
              <p
                className={`font-inter text-gray-600 dark:text-gray-300 ${fontInter.className}`}
              >
                {paragraph1}
              </p>

              <p
                className={`font-inter text-gray-600 dark:text-gray-300 ${fontInter.className}`}
              >
                {paragraph2}
              </p>

              <p
                className={`font-inter text-gray-600 dark:text-gray-300 ${fontInter.className}`}
              >
                {paragraph3}
              </p>

              <p
                className={`font-inter text-gray-600 dark:text-gray-300 ${fontInter.className}`}
              >
                {paragraph4}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
