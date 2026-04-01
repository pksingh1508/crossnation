"use client";

import type { LucideIcon } from "lucide-react";
import { fontPoppins } from "@/fonts";
import { FeatureCardGrid, SectionTitle } from "./CountryJobShared";

type EmploymentBenefitsProps = {
  title: string;
  description: string;
  items: string[];
  icons: LucideIcon[];
  dividerClassName?: string;
};

export default function EmploymentBenefits({
  title,
  description,
  items,
  icons,
  dividerClassName = "bg-[#fac800]",
}: EmploymentBenefitsProps) {
  return (
    <section className="bg-white px-4 py-5 md:py-10">
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          dividerClassName={dividerClassName}
          eyebrow="Employment Benefits"
          title={title}
          description={description}
        />
        <FeatureCardGrid
          items={items}
          icons={icons}
          columnsClassName="md:grid-cols-2 xl:grid-cols-4"
          itemTextClassName={`pt-2 text-lg font-semibold leading-7 text-gray-700 ${fontPoppins.className}`}
        />
      </div>
    </section>
  );
}
