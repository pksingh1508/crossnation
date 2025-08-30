import { useTranslations } from "next-intl";
import { Metadata } from "next";
import { CommonContact } from "@/components/sections/CommonContact";
import { Inspiration } from "@/components/sections/Inspiration";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { AnyQuestion } from "@/components/sections/AnyQuestion";
import { GovernmentLinks } from "@/components/sections/GovernmentLinks";

export const metadata: Metadata = {
  title: "Migration Services | CountryNation",
  description: "Complete migration and relocation assistance services",
};

export default function MigratePage() {
  // const t = useTranslations("pages.migrate");

  return (
    <div className="min-h-screen">
      <CommonContact />
      <Inspiration />
      <WhyChooseUs />
      <AnyQuestion />
      <GovernmentLinks />
    </div>
  );
}
