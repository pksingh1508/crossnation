"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { fontPoppins } from "@/fonts";
import { BulletList, SectionTitle, cardMotion } from "./CountryJobShared";

type SupportServiceCard = {
  title: string;
  icon: LucideIcon;
  items: string[];
};

type SupportServicesProps = {
  title: string;
  description: string;
  sections: SupportServiceCard[];
  dividerClassName?: string;
};

export default function SupportServices({
  title,
  description,
  sections,
  dividerClassName = "bg-[#fac800]",
}: SupportServicesProps) {
  return (
    <section className="bg-white px-4 py-5 md:py-10">
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          dividerClassName={dividerClassName}
          eyebrow="Support Services"
          title={title}
          description={description}
        />
        <div className="grid gap-6 xl:grid-cols-2">
          {sections.map((section) => {
            const Icon = section.icon;

            return (
              <motion.div
                key={section.title}
                {...cardMotion}
                whileHover={{ y: -4 }}
                className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm md:p-8"
              >
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-[#fac800]">
                  <Icon className="h-6 w-6" />
                </div>
                <h3
                  className={`text-2xl font-bold text-gray-700 ${fontPoppins.className}`}
                >
                  {section.title}
                </h3>
                <BulletList items={section.items} className="mt-6" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
