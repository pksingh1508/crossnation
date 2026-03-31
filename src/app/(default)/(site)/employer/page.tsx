import { Metadata } from "next";
import EmployerPage, {
  generateMetadata as generateLocalizedMetadata,
} from "@/app/[lang]/(site)/employer/page";
import { siteConfig } from "@/constants/site";

export async function generateMetadata(): Promise<Metadata> {
  return generateLocalizedMetadata({
    params: Promise.resolve({ lang: siteConfig.defaultLanguage }),
  });
}

export default function DefaultEmployerPage() {
  return (
    <EmployerPage
      params={Promise.resolve({ lang: siteConfig.defaultLanguage })}
    />
  );
}
