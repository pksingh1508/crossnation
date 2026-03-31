import { Metadata } from "next";
import BlogArticlePage from "@/app/[lang]/(site)/blog/[slug]/page";
import { generateMetadata as generateLocalizedMetadata } from "@/app/[lang]/(site)/blog/[slug]/metadata";
import { siteConfig } from "@/constants/site";

interface DefaultBlogArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: DefaultBlogArticlePageProps): Promise<Metadata> {
  const { slug } = await params;

  return generateLocalizedMetadata({
    params: Promise.resolve({
      slug,
      lang: siteConfig.defaultLanguage,
    }),
  });
}

export default async function DefaultBlogArticlePage({
  params,
}: DefaultBlogArticlePageProps) {
  const { slug } = await params;

  return (
    <BlogArticlePage
      params={Promise.resolve({
        slug,
        lang: siteConfig.defaultLanguage,
      })}
    />
  );
}
