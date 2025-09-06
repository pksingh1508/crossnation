import { useTranslations } from "next-intl";
import { Metadata } from "next";
import { CommonContact } from "@/components/sections/CommonContact";
import { GovernmentLinks } from "@/components/sections/GovernmentLinks";
import { JobseekerContent } from "@/components/jobseeker/JobseekerContent";
import { RecentTestimonials } from "@/components/sections/RecentTestimonials";
import { RecentBlog } from "@/components/sections/RecentBlog";
import { NewsSection } from "@/components/immigration_faq/NewsSection";
import { SolveQuery } from "@/components/sections/SolveQuery";

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
      <RecentTestimonials />
      <RecentBlog />
      <NewsSection />
      <SolveQuery />
      <GovernmentLinks />
    </div>
  );
}
