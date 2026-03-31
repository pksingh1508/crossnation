import { Metadata } from "next";
import MigratePage, {
  generateMetadata as generateLocalizedMetadata,
} from "@/app/[lang]/(site)/migrate/page";
import { siteConfig } from "@/constants/site";

export async function generateMetadata(): Promise<Metadata> {
  return generateLocalizedMetadata({
    params: Promise.resolve({ lang: siteConfig.defaultLanguage }),
  });
}

export default function DefaultMigratePage() {
  return (
    <MigratePage
      params={Promise.resolve({ lang: siteConfig.defaultLanguage })}
    />
  );
}
