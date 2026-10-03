import { ImmigrationNewsSection } from "@/components/immigration_news/ImmigrationNewsSection";
import { Metadata } from "next";
import { StructuredData } from "@/components/seo/StructuredData";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { generateLocalizedMetadata, pageConfigs } from "@/lib/seo/metadata";
import { organizationSchema, websiteSchema } from "@/lib/seo/structuredData";
import { getNewsArticles } from "@/lib/cms/queries";

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

  // Page 1 is rendered here; the section loads further pages in the browser
  const initialPage = await getNewsArticles(1, 10).catch((error) => {
    console.error("Failed to load immigration news:", error);
    return null;
  });

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
      <ImmigrationNewsSection
        initialPage={initialPage}
        latestNews={initialPage?.items.slice(0, 7) ?? []}
      />
    </div>
  );
}
