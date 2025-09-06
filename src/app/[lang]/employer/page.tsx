import { Metadata } from "next";
import { CommonContact } from "@/components/sections/CommonContact";
import { GovernmentLinks } from "@/components/sections/GovernmentLinks";
import { EmployerContent } from "@/components/employer/EmployerContent";
import { RecentTestimonials } from "@/components/sections/RecentTestimonials";
import { RecentBlog } from "@/components/sections/RecentBlog";
import { NewsSection } from "@/components/immigration_faq/NewsSection";
import { SolveQuery } from "@/components/sections/SolveQuery";

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
      <RecentTestimonials />
      <RecentBlog />
      <NewsSection />
      <SolveQuery />
      <GovernmentLinks />
    </div>
  );
}
