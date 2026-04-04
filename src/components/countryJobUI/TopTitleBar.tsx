"use client";

import React from "react";
import Image from "next/image";
import { fontPoppins } from "@/fonts";

type TopTitleBarProps = {
  name: string;
  imageUrl?: string;
};

export default function TopTitleBar({ name, imageUrl }: TopTitleBarProps) {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="overflow-hidden rounded-[32px] border border-amber-100 bg-[#fac800] p-4 shadow-sm">
        <div className="flex flex-col items-center gap-4 md:flex-row md:items-center justify-center">
          <Image
            src="/EU-logo.jpeg"
            alt="EU Career Serwis logo"
            width={172}
            height={64}
            className="h-20 w-fit rounded-lg object-cover"
          />
          <h1
            className={`mt-5 max-w-5xl text-[0.9rem] sm:text-[1.2rem] font-bold leading-tight text-gray-800 md:text-3xl lg:text-4xl pb-3 ${fontPoppins.className}`}
          >
            - Europe’s Premier Immigration Company.
          </h1>
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={`${name} flag`}
              width={172}
              height={64}
              className="h-20 w-fit rounded-lg object-cover"
            />
          )}
        </div>
        <div className="flex items-center justify-center">
          <h3
            className={`mt-5 max-w-5xl text-xl font-semibold leading-tight text-gray-700 md:text-xl lg:text-2xl text-center ${fontPoppins.className}`}
          >
            Your EU Career Starts Here - {name} Jobs & Visa Process Details
          </h3>
        </div>
      </div>
    </div>
  );
}
