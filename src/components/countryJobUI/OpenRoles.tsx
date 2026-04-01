"use client";

import { motion } from "framer-motion";
import { fontInter } from "@/fonts";
import { SectionTitle, cardMotion } from "./CountryJobShared";

type OpenRolesProps = {
  title: string;
  jobs: string[];
  dividerClassName?: string;
};

export default function OpenRoles({
  title,
  jobs,
  dividerClassName = "bg-[#fac800]",
}: OpenRolesProps) {
  return (
    <section className="bg-white px-4 py-5 md:py-10">
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          dividerClassName={dividerClassName}
          eyebrow="Open Roles"
          title={title}
        />
        <motion.div
          {...cardMotion}
          className="rounded-[32px] border border-amber-100 bg-[linear-gradient(135deg,#fffaf0_0%,#ffffff_100%)] p-6 shadow-sm md:p-8"
        >
          <div className="flex flex-wrap gap-3">
            {jobs.map((job) => (
              <div
                key={job}
                className={`rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-medium text-slate-700 md:text-base ${fontInter.className}`}
              >
                {job}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
