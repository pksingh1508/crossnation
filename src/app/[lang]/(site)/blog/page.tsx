import { BlogsSection } from "@/components/blogs/BlogsSection";
import { Metadata } from "next";
import { StructuredData } from "@/components/seo/StructuredData";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { generateLocalizedMetadata, pageConfigs } from "@/lib/seo/metadata";
import { organizationSchema, websiteSchema } from "@/lib/seo/structuredData";
import { getBlogPosts } from "@/lib/cms/queries";

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

  // Page 1 is rendered here; the section loads further pages in the browser
  const initialPage = await getBlogPosts(1, 10).catch((error) => {
    console.error("Failed to load blog posts:", error);
    return null;
  });

  const structuredData = [organizationSchema, websiteSchema];

  const breadcrumbItems = [{ name: "Blog", href: `/${lang}/blog` }];

  return (
    <div>
      <StructuredData data={structuredData} />
      <div className="container mx-auto px-4 py-4">
        <Breadcrumbs items={breadcrumbItems} />
      </div>
      <BlogsSection
        initialPage={initialPage}
        latestPosts={initialPage?.items.slice(0, 5) ?? []}
      />
    </div>
  );
}
