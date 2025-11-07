import { Metadata } from "next";
import { CommonContact } from "@/components/sections/CommonContact";
import { GovernmentLinks } from "@/components/sections/GovernmentLinks";
import { JobseekerContent } from "@/components/jobseeker/JobseekerContent";
import { RecentTestimonials } from "@/components/sections/RecentTestimonials";
import { RecentBlog } from "@/components/sections/RecentBlog";
import { NewsSection } from "@/components/immigration_faq/NewsSection";

export const metadata: Metadata = {
  title: "Job Seeker Services | EU Career Serwis",
  description:
    "Career guidance and job placement services for international opportunities",
};

export default function JobseekerPage() {
  return (
    <div className="min-h-screen">
      <CommonContact />
      {/* some custom jobseeker page content */}
      <JobseekerContent />
      <RecentTestimonials />
      <RecentBlog />
      <NewsSection />
      <GovernmentLinks />
    </div>
  );
}
