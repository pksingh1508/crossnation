import { Metadata } from "next";
import WorkPage, {
  generateMetadata as generateLocalizedMetadata,
} from "@/app/[lang]/(site)/work/page";
import { siteConfig } from "@/constants/site";

export async function generateMetadata(): Promise<Metadata> {
  return generateLocalizedMetadata({
    params: Promise.resolve({ lang: siteConfig.defaultLanguage }),
  });
}

export default function DefaultWorkPage() {
  return (
    <WorkPage
      params={Promise.resolve({ lang: siteConfig.defaultLanguage })}
    />
  );
}
