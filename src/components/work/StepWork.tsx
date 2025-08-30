"use client";

import * as React from "react";
import Image from "next/image";

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
      <div className="container mx-auto max-w-7xl px-4 py-16">
        <div className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
          {/* Image Section */}
          <div className={`flex justify-center ${isReversed ? 'lg:justify-end' : 'lg:justify-start'} ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
            <div className="relative w-full max-w-lg">
              <Image
                src={image}
                alt={imageAlt}
                width={500}
                height={400}
                className="w-full h-auto object-cover rounded-md shadow-lg"
                priority
              />
            </div>
          </div>

          {/* Text Content Section */}
          <div className={`space-y-6 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
            <h2 className="text-3xl lg:text-4xl font-bold font-poppins text-gray-900 dark:text-white leading-tight">
              {heading}
            </h2>

            <div className="space-y-2">
              <p className="text-[1rem] font-inter text-gray-600 dark:text-gray-300 leading-relaxed">
                {paragraph1}
              </p>

              <p className="text-[1rem] font-inter text-gray-600 dark:text-gray-300 leading-relaxed">
                {paragraph2}
              </p>

              <p className="text-[1rem] font-inter text-gray-600 dark:text-gray-300 leading-relaxed">
                {paragraph3}
              </p>

              <p className="text-[1rem] font-inter text-gray-600 dark:text-gray-300 leading-relaxed">
                {paragraph4}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
