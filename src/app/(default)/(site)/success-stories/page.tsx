import { Metadata } from "next";
import SuccessStoriesPage, {
  generateMetadata as generateListMetadata,
} from "@/app/[lang]/(site)/success-stories/page";
import { siteConfig } from "@/constants/site";

interface DefaultSuccessStoriesPageProps {
  searchParams: Promise<{ page?: string | string[]; q?: string | string[] }>;
}

export async function generateMetadata({
  searchParams,
}: DefaultSuccessStoriesPageProps): Promise<Metadata> {
  return generateListMetadata({
    params: Promise.resolve({ lang: siteConfig.defaultLanguage }),
    searchParams,
  });
}

export default function DefaultSuccessStoriesPage({
  searchParams,
}: DefaultSuccessStoriesPageProps) {
  return (
    <SuccessStoriesPage
      params={Promise.resolve({ lang: siteConfig.defaultLanguage })}
      searchParams={searchParams}
    />
  );
}
