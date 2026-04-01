"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { fontInter, fontPoppins } from "@/fonts";
import { BulletList, SectionTitle, cardMotion } from "./CountryJobShared";

type ProcessingGuideCard = {
  title: string;
  icon: LucideIcon;
  description: string;
  duration: string;
  points: string[];
};

type ProcessingGuideProps = {
  title: string;
  description: string;
  cards: ProcessingGuideCard[];
  dividerClassName?: string;
};

export default function ProcessingGuide({
  title,
  description,
  cards,
  dividerClassName = "bg-[#fac800]",
}: ProcessingGuideProps) {
  return (
    <section className="bg-white px-4 py-5 md:py-10">
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          dividerClassName={dividerClassName}
          eyebrow="Processing Guide"
          title={title}
          description={description}
        />

        <div className="grid gap-6 xl:grid-cols-2">
          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <motion.div
                key={card.title}
                {...cardMotion}
                whileHover={{ y: -4 }}
                className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm md:p-8"
              >
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-[#fac800]">
                  <Icon className="h-6 w-6" />
                </div>
                <h3
                  className={`text-2xl font-bold text-gray-700 ${fontPoppins.className}`}
                >
                  {card.title}
                </h3>
                <p
                  className={`mt-4 text-base leading-8 text-slate-600 ${fontInter.className}`}
                >
                  {card.description}
                </p>
                <div className="mt-6 rounded-2xl bg-amber-50 p-4">
                  <p
                    className={`text-xl font-semibold text-[#fac800] ${fontPoppins.className}`}
                  >
                    {card.duration}
                  </p>
                </div>
                <BulletList items={card.points} className="mt-6" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
