import { Metadata } from "next";
import { redirect } from "next/navigation";
import { ArticleIndex } from "@/components/articles/ArticleIndex";
import { StructuredData } from "@/components/seo/StructuredData";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { generateLocalizedMetadata, pageConfigs } from "@/lib/seo/metadata";
import { organizationSchema, websiteSchema } from "@/lib/seo/structuredData";
import { getBlogPosts } from "@/lib/cms/queries";
import {
  listHref,
  readListParams,
  type ListSearchParams,
} from "@/lib/cms/list-page";

/** Posts on a page: the newest shown large, then three rows of three */
const PAGE_SIZE = 10;

interface BlogPageProps {
  params: Promise<{ lang: string }>;
  searchParams?: Promise<ListSearchParams>;
}

export async function generateMetadata({
  params,
  searchParams,
}: BlogPageProps): Promise<Metadata> {
  const { lang } = await params;
  const { page, query } = readListParams(await searchParams);

  // Each page of the list is its own address; search results stay out of search engines
  return generateLocalizedMetadata({
    ...pageConfigs.blog,
    locale: lang,
    pathname: page > 1 ? `/blog?page=${page}` : "/blog",
    noIndex: Boolean(query),
  });
}

export default async function BlogPage({
  params,
  searchParams,
}: BlogPageProps) {
  const { lang } = await params;
  const { page, query } = readListParams(await searchParams);

  const result = await getBlogPosts(page, PAGE_SIZE, query).catch((error) => {
    console.error("Failed to load blog posts:", error);
    return null;
  });

  // An old link past the last page goes to the last page. A page past the end comes back
  // empty and without a total, so the first page tells how many pages there are.
  if (result && result.items.length === 0 && page > 1) {
    const first = await getBlogPosts(1, PAGE_SIZE, query).catch(() => null);
    redirect(listHref(lang, "/blog", first?.pageCount ?? 1, query));
  }

  const structuredData = [organizationSchema, websiteSchema];

  const breadcrumbItems = [{ name: "Blog", href: `/${lang}/blog` }];

  return (
    <div>
      <StructuredData data={structuredData} />
      <div className="container mx-auto px-4 pt-6">
        <Breadcrumbs items={breadcrumbItems} />
      </div>
      <ArticleIndex collection="blog" result={result} query={query} />
    </div>
  );
}
