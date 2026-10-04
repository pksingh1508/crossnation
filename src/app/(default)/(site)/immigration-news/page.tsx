import { Metadata } from "next";
import ImmigrationNewsPage, {
  generateMetadata as generateLocalizedMetadata,
} from "@/app/[lang]/(site)/immigration-news/page";
import type { ListSearchParams } from "@/lib/cms/list-page";
import { siteConfig } from "@/constants/site";

interface DefaultImmigrationNewsPageProps {
  searchParams: Promise<ListSearchParams>;
}

export async function generateMetadata({
  searchParams,
}: DefaultImmigrationNewsPageProps): Promise<Metadata> {
  return generateLocalizedMetadata({
    params: Promise.resolve({ lang: siteConfig.defaultLanguage }),
    searchParams,
  });
}

export default function DefaultImmigrationNewsPage({
  searchParams,
}: DefaultImmigrationNewsPageProps) {
  return (
    <ImmigrationNewsPage
      params={Promise.resolve({ lang: siteConfig.defaultLanguage })}
      searchParams={searchParams}
    />
  );
}
