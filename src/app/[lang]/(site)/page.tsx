import { Metadata } from "next";
import { About } from "@/components/sections/About";
import { Hero } from "@/components/sections/Hero";
import { RecentTestimonials } from "@/components/sections/RecentTestimonials";
import { HeroCustomSection } from "@/components/hero/HeroCustomSection";
import { NewsSection } from "@/components/immigration_faq/NewsSection";
import { RecentBlog } from "@/components/sections/RecentBlog";
import { GovernmentLinks } from "@/components/sections/GovernmentLinks";
import { StructuredData } from "@/components/seo/StructuredData";
import {
  generateLocalizedMetadata,
  getLocalizedPageConfig,
} from "@/lib/seo/metadata";
import {
  organizationSchema,
  websiteSchema,
  localBusinessSchema,
  serviceSchemas,
} from "@/lib/seo/structuredData";

interface HomePageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const { lang } = await params;

  const pageConfig = getLocalizedPageConfig("home", lang);

  return generateLocalizedMetadata({
    ...pageConfig,
    locale: lang,
    pathname: "",
  });
}

export default async function HomePage({ params }: HomePageProps) {
  const { lang } = await params;

  // Combine all structured data for homepage
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
