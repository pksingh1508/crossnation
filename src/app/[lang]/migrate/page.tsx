import { Metadata } from "next";
import { CommonContact } from "@/components/sections/CommonContact";
import { GovernmentLinks } from "@/components/sections/GovernmentLinks";
import { RecentTestimonials } from "@/components/sections/RecentTestimonials";
import { RecentBlog } from "@/components/sections/RecentBlog";
import { NewsSection } from "@/components/immigration_faq/NewsSection";
import { SolveQuery } from "@/components/sections/SolveQuery";

export const metadata: Metadata = {
  title: "Migration Services | CountryNation",
  description: "Complete migration and relocation assistance services",
};

export default function MigratePage() {
  // const t = useTranslations("pages.migrate");

  return (
    <div className="min-h-screen">
      <CommonContact />
      <RecentTestimonials />
      <RecentBlog />
      <NewsSection />
      <SolveQuery />
      <GovernmentLinks />
    </div>
  );
}
