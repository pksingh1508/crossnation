import { Metadata } from "next";
import { redirect } from "next/navigation";
import { ArticleIndex } from "@/components/articles/ArticleIndex";
import { StructuredData } from "@/components/seo/StructuredData";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { generateLocalizedMetadata, pageConfigs } from "@/lib/seo/metadata";
import { organizationSchema, websiteSchema } from "@/lib/seo/structuredData";
import { getNewsArticles } from "@/lib/cms/queries";
import {
  listHref,
  readListParams,
  type ListSearchParams,
} from "@/lib/cms/list-page";

/** Articles on a page: the newest shown large, then three rows of three */
const PAGE_SIZE = 10;

interface ImmigrationNewsPageProps {
  params: Promise<{ lang: string }>;
  searchParams?: Promise<ListSearchParams>;
}

export async function generateMetadata({
  params,
  searchParams,
}: ImmigrationNewsPageProps): Promise<Metadata> {
  const { lang } = await params;
  const { page, query } = readListParams(await searchParams);

  // Each page of the list is its own address; search results stay out of search engines
  return generateLocalizedMetadata({
    ...pageConfigs.news,
    locale: lang,
    pathname: page > 1 ? `/immigration-news?page=${page}` : "/immigration-news",
    noIndex: Boolean(query),
  });
}

export default async function ImmigrationNewsPage({
  params,
  searchParams,
}: ImmigrationNewsPageProps) {
  const { lang } = await params;
  const { page, query } = readListParams(await searchParams);

  const result = await getNewsArticles(page, PAGE_SIZE, query).catch(
    (error) => {
      console.error("Failed to load immigration news:", error);
      return null;
    }
  );

  // An old link past the last page goes to the last page (see the blog's list)
  if (result && result.items.length === 0 && page > 1) {
    const first = await getNewsArticles(1, PAGE_SIZE, query).catch(() => null);
    redirect(listHref(lang, "/immigration-news", first?.pageCount ?? 1, query));
  }

  const structuredData = [organizationSchema, websiteSchema];

  const breadcrumbItems = [
    { name: "Immigration News", href: `/${lang}/immigration-news` },
  ];

  return (
    <div>
      <StructuredData data={structuredData} />
      <div className="container mx-auto px-4 pt-6">
        <Breadcrumbs items={breadcrumbItems} />
      </div>
      <ArticleIndex collection="news" result={result} query={query} />
    </div>
  );
}
