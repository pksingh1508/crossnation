import { NewsArticleClient } from "./ClientPage";

export { generateMetadata } from "./metadata";

interface PageProps {
  params: Promise<{ slug: string; lang: string }>;
}

export default async function NewsArticlePage({ params }: PageProps) {
  const { slug, lang } = await params;
  return <NewsArticleClient slug={slug} lang={lang} />;
}
