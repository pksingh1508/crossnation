"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { fontInter } from "@/fonts";
import { SectionTitle, cardMotion } from "./CountryJobShared";

type WhyChooseUsProps = {
  title: string;
  items: string[];
  dividerClassName?: string;
};

export default function WhyChooseUs({
  title,
  items,
  dividerClassName = "bg-[#fac800]",
}: WhyChooseUsProps) {
  return (
    <motion.div
      {...cardMotion}
      whileHover={{ y: -4 }}
      className="rounded-[32px] border border-slate-200 bg-stone-50 p-6 shadow-sm md:p-8"
    >
      <SectionTitle
        dividerClassName={dividerClassName}
        eyebrow="Why Choose Us"
        title={title}
      />
      <div className="-mt-2 space-y-4">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-3">
            <ShieldCheck className="mt-1 h-5 w-5 flex-shrink-0 text-[#fac800]" />
            <p className={`text-base leading-7 text-slate-700 ${fontInter.className}`}>
              {item}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
