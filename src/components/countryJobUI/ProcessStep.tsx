"use client";

import { motion } from "framer-motion";
import { NumberStepList, SectionTitle, cardMotion } from "./CountryJobShared";

type ProcessStepProps = {
  fees: string;
};

export default function ProcessStep({ fees }: ProcessStepProps) {
  const applicationProcess = [
    "Sign the agreement to begin the process.",
    "Complete eligibility verification.",
    "Submit documents.",
    `Pay the initial fee of ${fees}.`,
    "Receive a free eligibility assessment.",
    "Get a dedicated consultant.",
    "Start job matching with a verified employer.",
    "Submit the work permit application.",
    "Receive regular application updates.",
  ];

  return (
    <section className="bg-white px-4 py-5 md:py-10">
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          eyebrow="Application Process"
          title="Step-by-Step Application Process"
        />
        <motion.div
          {...cardMotion}
          className="mx-auto max-w-5xl rounded-[32px] border border-slate-200 bg-stone-50 p-6 shadow-sm md:p-8"
        >
          <NumberStepList items={applicationProcess} />
        </motion.div>
      </div>
    </section>
  );
}
