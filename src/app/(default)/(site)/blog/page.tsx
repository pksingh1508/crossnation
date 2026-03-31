import { Metadata } from "next";
import BlogPage, {
  generateMetadata as generateLocalizedMetadata,
} from "@/app/[lang]/(site)/blog/page";
import { siteConfig } from "@/constants/site";

export async function generateMetadata(): Promise<Metadata> {
  return generateLocalizedMetadata({
    params: Promise.resolve({ lang: siteConfig.defaultLanguage }),
  });
}

export default function DefaultBlogPage() {
  return (
    <BlogPage
      params={Promise.resolve({ lang: siteConfig.defaultLanguage })}
    />
  );
}
