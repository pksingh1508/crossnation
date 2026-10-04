import { ArticleNotFound } from "@/components/articles/ArticleNotFound";

// Shown (with a 404 status) for a slug that is unknown or not published
export default function NewsArticleNotFound() {
  return <ArticleNotFound collection="news" />;
}
