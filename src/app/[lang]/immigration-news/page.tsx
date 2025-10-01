import { ImmigrationNewsSection } from "@/components/immigration_news/ImmigrationNewsSection";
import { Metadata } from "next";
import { StructuredData } from "@/components/seo/StructuredData";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { generateLocalizedMetadata, pageConfigs } from "@/lib/seo/metadata";
import { organizationSchema, websiteSchema } from "@/lib/seo/structuredData";

interface ImmigrationNewsPageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({
  params,
}: ImmigrationNewsPageProps): Promise<Metadata> {
  const { lang } = await params;

  return generateLocalizedMetadata({
    ...pageConfigs.news,
    locale: lang,
    pathname: "/immigration-news",
  });
}

export default async function ImmigrationNewsPage({
  params,
}: ImmigrationNewsPageProps) {
  const { lang } = await params;

  const structuredData = [organizationSchema, websiteSchema];

  const breadcrumbItems = [
    { name: "Immigration News", href: `/${lang}/immigration-news` },
  ];

  return (
    <div>
      <StructuredData data={structuredData} />
      <div className="container mx-auto px-4 py-4">
        <Breadcrumbs items={breadcrumbItems} />
      </div>
      <ImmigrationNewsSection />
    </div>
  );
}
