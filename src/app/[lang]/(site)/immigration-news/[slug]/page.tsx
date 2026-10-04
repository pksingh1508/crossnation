import { notFound } from "next/navigation";
import { ArticleView } from "@/components/articles/ArticleView";
import { formatDate, readingMinutes } from "@/lib/cms/format";
import { getNewsArticle, getNewsArticles } from "@/lib/cms/queries";
import { canonicalSlug } from "@/lib/cms/slug";

export { generateMetadata } from "./metadata";

interface PageProps {
  params: Promise<{ slug: string; lang: string }>;
}

export default async function NewsArticlePage({ params }: PageProps) {
  // Old links with capitals (e.g. /immigration-news/Schengen-Visa) are redirected by the
  // middleware before they get here
  const { slug } = await params;

  const [news, latestNews] = await Promise.all([
    getNewsArticle(canonicalSlug(slug)),
    getNewsArticles(1, 5)
      .then((page) => page.items)
      .catch((error) => {
        console.error("Failed to load the latest immigration news:", error);
        return [];
      }),
  ]);
  if (!news) notFound();

  return (
    <ArticleView
      collection="news"
      article={news}
      latest={latestNews}
      publishedAt={formatDate(news.published_at, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}
      readingMinutes={readingMinutes(news.content)}
    />
  );
}
