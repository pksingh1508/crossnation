import { Metadata } from "next";
import { CommonContact } from "@/components/sections/CommonContact";
import { GovernmentLinks } from "@/components/sections/GovernmentLinks";
import { EmployerContent } from "@/components/employer/EmployerContent";
import { RecentTestimonials } from "@/components/sections/RecentTestimonials";
import { RecentBlog } from "@/components/sections/RecentBlog";
import { NewsSection } from "@/components/immigration_faq/NewsSection";
import { StructuredData } from "@/components/seo/StructuredData";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { generateLocalizedMetadata, pageConfigs } from "@/lib/seo/metadata";
import { serviceSchemas, organizationSchema } from "@/lib/seo/structuredData";

interface EmployerPageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({
  params,
}: EmployerPageProps): Promise<Metadata> {
  const { lang } = await params;

  return generateLocalizedMetadata({
    ...pageConfigs.employer,
    locale: lang,
    pathname: "/employer",
  });
}

export default async function EmployerPage({ params }: EmployerPageProps) {
  const { lang } = await params;

  const structuredData = [organizationSchema, serviceSchemas.employer];

  const breadcrumbItems = [
    { name: "Employer Services", href: `/${lang}/employer` },
  ];

  return (
    <div className="min-h-screen">
      <StructuredData data={structuredData} />
      <div className="container mx-auto px-4 py-4">
        <Breadcrumbs items={breadcrumbItems} />
      </div>
      <CommonContact />
      {/* some employer realted page content */}
      <EmployerContent />
      <RecentTestimonials />
      <RecentBlog />
      <NewsSection />
      <GovernmentLinks />
    </div>
  );
}
