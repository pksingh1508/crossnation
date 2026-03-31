import { Metadata } from "next";
import ImmigrationNewsPage, {
  generateMetadata as generateLocalizedMetadata,
} from "@/app/[lang]/(site)/immigration-news/page";
import { siteConfig } from "@/constants/site";

export async function generateMetadata(): Promise<Metadata> {
  return generateLocalizedMetadata({
    params: Promise.resolve({ lang: siteConfig.defaultLanguage }),
  });
}

export default function DefaultImmigrationNewsPage() {
  return (
    <ImmigrationNewsPage
      params={Promise.resolve({ lang: siteConfig.defaultLanguage })}
    />
  );
}
