"use client";

import { motion } from "framer-motion";
import { fontInter } from "@/fonts";
import { SectionTitle, cardMotion } from "./CountryJobShared";

type OpenRolesProps = {
  title: string;
  jobs: string[];
  salaryAndEligibility?: string[];
  dividerClassName?: string;
};

export default function OpenRoles({
  title,
  jobs,
  salaryAndEligibility,
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
          <div>
            <h3 className="text-lg font-semibold text-slate-900 md:text-xl">
              Open Jobs
            </h3>
            <div className="mt-2 flex flex-wrap gap-3">
              {jobs.map((job) => (
                <div
                  key={job}
                  className={`rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-medium text-slate-700 md:text-base ${fontInter.className}`}
                >
                  {job}
                </div>
              ))}
            </div>
          </div>
          {salaryAndEligibility?.length ? (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-slate-900 md:text-xl">
                Salary and Eligibility
              </h3>
              <div className="mt-2 flex flex-wrap gap-3">
                {salaryAndEligibility.map((item) => (
                  <div
                    key={item}
                    className={`rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-medium text-slate-700 md:text-base ${fontInter.className}`}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
}
