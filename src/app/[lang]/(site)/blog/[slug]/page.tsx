import { BlogArticleClient } from "./ClientPage";

export { generateMetadata } from "./metadata";

interface PageProps {
  params: Promise<{ slug: string; lang: string }>;
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug, lang } = await params;
  return <BlogArticleClient slug={slug} lang={lang} />;
}
