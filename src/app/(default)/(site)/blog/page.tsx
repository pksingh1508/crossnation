import { Metadata } from "next";
import BlogPage, {
  generateMetadata as generateLocalizedMetadata,
} from "@/app/[lang]/(site)/blog/page";
import { siteConfig } from "@/constants/site";

interface DefaultBlogPageProps {
  searchParams: Promise<{ page?: string | string[]; q?: string | string[] }>;
}

export async function generateMetadata({
  searchParams,
}: DefaultBlogPageProps): Promise<Metadata> {
  return generateLocalizedMetadata({
    params: Promise.resolve({ lang: siteConfig.defaultLanguage }),
    searchParams,
  });
}

export default function DefaultBlogPage({
  searchParams,
}: DefaultBlogPageProps) {
  return (
    <BlogPage
      params={Promise.resolve({ lang: siteConfig.defaultLanguage })}
      searchParams={searchParams}
    />
  );
}
