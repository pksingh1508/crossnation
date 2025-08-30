import { Metadata } from "next";
import { useTranslations } from "next-intl";
import { CommonContact } from "@/components/sections/CommonContact";
import { StepWork } from "@/components/work/StepWork";
import { WorkContent } from "@/components/work/WorkContent";

export const metadata: Metadata = {
  title: "Work Opportunities | CountryNation",
  description: "Find international work opportunities and visa assistance",
};

export default function WorkPage() {
  const tPoland = useTranslations("works.steps.poland");
  const tStep1 = useTranslations("works.steps.step1");

  return (
    <div className="min-h-screen">
      <CommonContact />
      <WorkContent />
    </div>
  );
}
