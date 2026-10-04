import { Metadata } from "next";
import { redirect } from "next/navigation";
import { BlogIndex } from "@/components/blogs/BlogIndex";
import { StructuredData } from "@/components/seo/StructuredData";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { generateLocalizedMetadata, pageConfigs } from "@/lib/seo/metadata";
import { organizationSchema, websiteSchema } from "@/lib/seo/structuredData";
import { cleanSearch, getBlogPosts } from "@/lib/cms/queries";
import { getLocalizedPath } from "@/lib/locale-paths";

/** Posts on a page: the newest shown large, then three rows of three */
const PAGE_SIZE = 10;

type SearchParams = { page?: string | string[]; q?: string | string[] };

interface BlogPageProps {
  params: Promise<{ lang: string }>;
  searchParams?: Promise<SearchParams>;
}

/** The page number and search term from the address (?page=2&q=permit) */
function readList(searchParams: SearchParams = {}) {
  const first = (value?: string | string[]) =>
    (Array.isArray(value) ? value[0] : value) ?? "";
  return {
    page: Math.max(1, Math.trunc(Number(first(searchParams.page))) || 1),
    query: cleanSearch(first(searchParams.q)),
  };
}

export async function generateMetadata({
  params,
  searchParams,
}: BlogPageProps): Promise<Metadata> {
  const { lang } = await params;
  const { page, query } = readList(await searchParams);

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
  const { page, query } = readList(await searchParams);

  const result = await getBlogPosts(page, PAGE_SIZE, query).catch((error) => {
    console.error("Failed to load blog posts:", error);
    return null;
  });

  // An old link past the last page goes to the last page. A page past the end comes back
  // empty and without a total, so the first page tells how many pages there are.
  if (result && result.items.length === 0 && page > 1) {
    const first = await getBlogPosts(1, PAGE_SIZE, query).catch(() => null);
    const last = Math.max(1, first?.pageCount ?? 1);
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (last > 1) params.set("page", String(last));
    const search = params.toString();
    redirect(`${getLocalizedPath(lang, "/blog")}${search ? `?${search}` : ""}`);
  }

  const structuredData = [organizationSchema, websiteSchema];

  const breadcrumbItems = [{ name: "Blog", href: `/${lang}/blog` }];

  return (
    <div>
      <StructuredData data={structuredData} />
      <div className="container mx-auto px-4 pt-6">
        <Breadcrumbs items={breadcrumbItems} />
      </div>
      <BlogIndex result={result} query={query} />
    </div>
  );
}
