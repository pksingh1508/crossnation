import { Metadata } from "next";
import NewsArticlePage from "@/app/[lang]/(site)/immigration-news/[slug]/page";
import { generateMetadata as generateLocalizedMetadata } from "@/app/[lang]/(site)/immigration-news/[slug]/metadata";
import { siteConfig } from "@/constants/site";

interface DefaultNewsArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: DefaultNewsArticlePageProps): Promise<Metadata> {
  const { slug } = await params;

  return generateLocalizedMetadata({
    params: Promise.resolve({
      slug,
      lang: siteConfig.defaultLanguage,
    }),
  });
}

export default async function DefaultNewsArticlePage({
  params,
}: DefaultNewsArticlePageProps) {
  const { slug } = await params;

  return (
    <NewsArticlePage
      params={Promise.resolve({
        slug,
        lang: siteConfig.defaultLanguage,
      })}
    />
  );
}
