import { redirect } from "next/navigation";
import { CommonContact } from "@/components/sections/CommonContact";
import { TestimonialIndex } from "@/components/testimonials/TestimonialIndex";
import { getTestimonials } from "@/lib/cms/queries";
import {
  listHref,
  readListParams,
  type ListSearchParams,
} from "@/lib/cms/list-page";
import { Metadata } from "next";

/** As on the success stories page, which shows the same list */
const PAGE_SIZE = 10;

export const metadata: Metadata = {
  title: "Client Testimonials",
  description:
    "Read what our clients say about their experience with EU Career Serwis. Real stories from people who achieved their dreams with our immigration and recruitment services.",
  keywords: [
    "testimonials",
    "client reviews",
    "immigration success stories",
    "EU Career Serwis reviews",
  ],
};

interface TestimonialsPageProps {
  params: Promise<{ lang: string }>;
  searchParams?: Promise<ListSearchParams>;
}

export default async function TestimonialsPage({
  params,
  searchParams,
}: TestimonialsPageProps) {
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
    redirect(listHref(lang, "/testimonials", first?.pageCount ?? 1, query));
  }

  return (
    <div>
      <CommonContact />
      <TestimonialIndex result={result} query={query} />
    </div>
  );
}
