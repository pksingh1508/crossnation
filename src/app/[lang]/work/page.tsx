import { useTranslations } from "next-intl";
import { Metadata } from "next";
import { CommonContact } from "@/components/sections/CommonContact";

export const metadata: Metadata = {
  title: "Work Opportunities | CountryNation",
  description: "Find international work opportunities and visa assistance",
};

export default function WorkPage() {
  // const t = useTranslations("pages.work");

  return (
    <div className="min-h-screen">
      <CommonContact />
    </div>
  );
}
