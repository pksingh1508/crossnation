import { Metadata } from "next";
import { CommonContact } from "@/components/sections/CommonContact";
import { GovernmentLinks } from "@/components/sections/GovernmentLinks";
import { RecentTestimonials } from "@/components/sections/RecentTestimonials";
import { RecentBlog } from "@/components/sections/RecentBlog";
import { NewsSection } from "@/components/immigration_faq/NewsSection";
import { StructuredData } from "@/components/seo/StructuredData";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { generateLocalizedMetadata, pageConfigs } from "@/lib/seo/metadata";
import { serviceSchemas, organizationSchema } from "@/lib/seo/structuredData";

interface MigratePageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({
  params,
}: MigratePageProps): Promise<Metadata> {
  const { lang } = await params;

  return generateLocalizedMetadata({
    ...pageConfigs.migrate,
    locale: lang,
    pathname: "/migrate",
  });
}

export default async function MigratePage({ params }: MigratePageProps) {
  const { lang } = await params;

  const structuredData = [organizationSchema, serviceSchemas.migrate];

  const breadcrumbItems = [
    { name: "Migration Services", href: `/${lang}/migrate` },
  ];

  return (
    <div className="min-h-screen">
      <StructuredData data={structuredData} />
      <div className="container mx-auto px-4 py-4">
        <Breadcrumbs items={breadcrumbItems} />
      </div>
      <CommonContact />
      <RecentTestimonials />
      <RecentBlog />
      <NewsSection />
      <GovernmentLinks />
    </div>
  );
}
