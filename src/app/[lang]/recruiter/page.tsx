import { useTranslations } from "next-intl";
import { Metadata } from "next";
import { CommonContact } from "@/components/sections/CommonContact";
import { Inspiration } from "@/components/sections/Inspiration";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { AnyQuestion } from "@/components/sections/AnyQuestion";
import { GovernmentLinks } from "@/components/sections/GovernmentLinks";
import { RecruiterContent } from "@/components/recruiter/RecruiterContent";

export const metadata: Metadata = {
  title: "Recruiter Services | CountryNation",
  description:
    "Professional recruitment services and talent acquisition support",
};

export default function RecruiterPage() {
  const t = useTranslations("pages.recruiter");

  return (
    <div className="min-h-screen">
      <CommonContact />
      {/* custom recruiter page content */}
      <RecruiterContent />
      <Inspiration />
      <WhyChooseUs />
      <AnyQuestion />
      <GovernmentLinks />
    </div>
  );
}
