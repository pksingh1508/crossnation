import { BlogsSection } from "@/components/blogs/BlogsSection";
import { Metadata } from "next";
import { StructuredData } from "@/components/seo/StructuredData";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { generateLocalizedMetadata, pageConfigs } from "@/lib/seo/metadata";
import { organizationSchema, websiteSchema } from "@/lib/seo/structuredData";

interface BlogPageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { lang } = await params;

  return generateLocalizedMetadata({
    ...pageConfigs.blog,
    locale: lang,
    pathname: "/blog",
  });
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { lang } = await params;

  const structuredData = [organizationSchema, websiteSchema];

  const breadcrumbItems = [{ name: "Blog", href: `/${lang}/blog` }];

  return (
    <div>
      <StructuredData data={structuredData} />
      <div className="container mx-auto px-4 py-4">
        <Breadcrumbs items={breadcrumbItems} />
      </div>
      <BlogsSection />
    </div>
  );
}
