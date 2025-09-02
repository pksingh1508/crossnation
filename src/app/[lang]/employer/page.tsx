import { Metadata } from "next";
import { CommonContact } from "@/components/sections/CommonContact";
import { Inspiration } from "@/components/sections/Inspiration";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { AnyQuestion } from "@/components/sections/AnyQuestion";
import { GovernmentLinks } from "@/components/sections/GovernmentLinks";
import { EmployerContent } from "@/components/employer/EmployerContent";

export const metadata: Metadata = {
  title: "Employer Services | CountryNation",
  description: "International recruitment and employer support services",
};

export default function EmployerPage() {
  return (
    <div className="min-h-screen">
      <CommonContact />
      {/* some employer realted page content */}
      <EmployerContent />
      <Inspiration />
      <WhyChooseUs />
      <AnyQuestion />
      <GovernmentLinks />
    </div>
  );
}
