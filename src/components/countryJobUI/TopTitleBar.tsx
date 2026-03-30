import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { fontPoppins, fontInter } from "@/fonts";

export default function TopTitleBar({ name }: { name: string }) {
  return (
    <div className="mx-auto max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="overflow-hidden rounded-[32px] border border-amber-100 bg-[linear-gradient(135deg,#fffaf0_0%,#fff7ed_45%,#f8fafc_100%)] p-8 shadow-sm md:p-12"
      >
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <Image
            src="/EU-logo.jpeg"
            alt="EU Career Serwis logo"
            width={172}
            height={64}
            className="h-20 w-fit rounded-lg object-cover"
          />
          <h1
            className={`mt-5 max-w-5xl text-2xl font-bold leading-tight text-gray-700 md:text-3xl lg:text-4xl pb-3 ${fontPoppins.className}`}
          >
            - International Recruitment agency in Europe
          </h1>
        </div>
        <h3
          className={`mt-5 max-w-5xl text-xl font-bold leading-tight text-gray-700 md:text-xl lg:text-2xl ${fontPoppins.className}`}
        >
          Your EU Career Starts Here: {name} Jobs & Visa Process Details
        </h3>
        <p
          className={`mt-6 max-w-4xl text-base leading-8 text-slate-600 md:text-lg ${fontInter.className}`}
        >
          A simple guide for job seekers who want to work in {name} legally,
          understand the work permit process, and get support both before and
          after arrival.
        </p>
      </motion.div>
    </div>
  );
}
