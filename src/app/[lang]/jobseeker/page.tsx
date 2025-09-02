import { useTranslations } from "next-intl";
import { Metadata } from "next";
import { CommonContact } from "@/components/sections/CommonContact";
import { Inspiration } from "@/components/sections/Inspiration";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { AnyQuestion } from "@/components/sections/AnyQuestion";
import { GovernmentLinks } from "@/components/sections/GovernmentLinks";
import { JobseekerContent } from "@/components/jobseeker/JobseekerContent";

export const metadata: Metadata = {
  title: "Job Seeker Services | CountryNation",
  description:
    "Career guidance and job placement services for international opportunities",
};

export default function JobseekerPage() {
  // const t = useTranslations("pages.jobseeker");

  return (
    <div className="min-h-screen">
      <CommonContact />
      {/* some custom jobseeker page content */}
      <JobseekerContent />
      <Inspiration />
      <WhyChooseUs />
      <AnyQuestion />
      <GovernmentLinks />
    </div>
  );
}
