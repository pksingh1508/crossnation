import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { TestimonialIndex } from "@/components/testimonials/TestimonialIndex";
import { getTestimonials } from "@/lib/cms/queries";
import {
  listHref,
  readListParams,
  type ListSearchParams,
} from "@/lib/cms/list-page";
import { generateMetadata as buildMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/constants/site";
import { getLocalizedPath, getLocalizedUrl } from "@/lib/locale-paths";

/** Stories on a page: the newest shown large, then three columns of three */
const PAGE_SIZE = 10;

interface SuccessStoriesPageProps {
  params: Promise<{ lang: string }>;
  searchParams?: Promise<ListSearchParams>;
}

export async function generateMetadata({
  searchParams,
}: SuccessStoriesPageProps): Promise<Metadata> {
  const { page, query } = readListParams(await searchParams);

  // Every language points to the English page. Each page of the list is its own address;
  // search results stay out of search engines.
  return buildMetadata({
    title: "Success Stories & Testimonials",
    description:
      "Read authentic immigration and recruitment success stories from EU Career Serwis clients who secured legal work permits and visas across Europe.",
    keywords: [
      "eu career serwis testimonials",
      "immigration success stories",
      "client reviews poland recruitment",
    ],
    canonical: getLocalizedUrl(
      siteConfig.defaultLanguage,
      page > 1 ? `/success-stories?page=${page}` : "/success-stories"
    ),
    noIndex: Boolean(query),
  });
}

// Shows the client testimonials (eu_testimonials), as it did with Strapi
export default async function SuccessStoriesPage({
  params,
  searchParams,
}: SuccessStoriesPageProps) {
  const { lang } = await params;
  const { page, query } = readListParams(await searchParams);

  const result = await getTestimonials(page, PAGE_SIZE, query).catch(
    (error) => {
      console.error("Failed to load testimonials:", error);
      return null;
    }
  );

  // An old link past the last page goes to the last page (see the blog's list)
  if (result && result.items.length === 0 && page > 1) {
    const first = await getTestimonials(1, PAGE_SIZE, query).catch(() => null);
    redirect(listHref(lang, "/success-stories", first?.pageCount ?? 1, query));
  }

  return (
    <div>
      <div className="container mx-auto px-4 pt-6">
        <Breadcrumbs
          items={[
            {
              name: "Success Stories",
              href: getLocalizedPath(lang, "/success-stories"),
            },
          ]}
        />
      </div>
      <TestimonialIndex result={result} query={query} />
    </div>
  );
}
