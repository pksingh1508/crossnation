import { About } from "@/components/sections/About";
import { Hero } from "@/components/sections/Hero";
import { RecentTestimonials } from "@/components/sections/RecentTestimonials";
import { HeroCustomSection } from "@/components/hero/HeroCustomSection";
import { NewsSection } from "@/components/immigration_faq/NewsSection";
import { RecentBlog } from "@/components/sections/RecentBlog";
import { GovernmentLinks } from "@/components/sections/GovernmentLinks";
import { StructuredData } from "@/components/seo/StructuredData";
import {
  organizationSchema,
  websiteSchema,
  localBusinessSchema,
  serviceSchemas,
} from "@/lib/seo/structuredData";

export function HomePageContent() {
  const structuredData = [
    organizationSchema,
    websiteSchema,
    localBusinessSchema,
    serviceSchemas.work,
    serviceSchemas.migrate,
    serviceSchemas.employer,
  ];

  return (
    <div>
      <StructuredData data={structuredData} />
      <Hero />
      <About />
      <HeroCustomSection />
      <RecentTestimonials />
      <RecentBlog />
      <NewsSection />
      <GovernmentLinks />
    </div>
  );
}
