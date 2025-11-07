import { useTranslations } from "next-intl";
import { Metadata } from "next";
import { CommonContact } from "@/components/sections/CommonContact";
import { GovernmentLinks } from "@/components/sections/GovernmentLinks";
import { RecruiterContent } from "@/components/recruiter/RecruiterContent";
import { RecentTestimonials } from "@/components/sections/RecentTestimonials";
import { RecentBlog } from "@/components/sections/RecentBlog";
import { NewsSection } from "@/components/immigration_faq/NewsSection";

export const metadata: Metadata = {
  title: "Recruiter Services | EU Career Serwis",
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
      <RecentTestimonials />
      <RecentBlog />
      <NewsSection />
      <GovernmentLinks />
    </div>
  );
}
