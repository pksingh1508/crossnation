import { notFound } from "next/navigation";
import { formatDate, readingMinutes } from "@/lib/cms/format";
import { getBlogPost, getBlogPosts } from "@/lib/cms/queries";
import { canonicalSlug } from "@/lib/cms/slug";
import { BlogArticleClient } from "./ClientPage";

export { generateMetadata } from "./metadata";

interface PageProps {
  params: Promise<{ slug: string; lang: string }>;
}

export default async function BlogArticlePage({ params }: PageProps) {
  // Old links with capitals or spaces are redirected by the middleware before they get here
  const { slug } = await params;

  const [post, latestPosts] = await Promise.all([
    getBlogPost(canonicalSlug(slug)),
    getBlogPosts(1, 5)
      .then((page) => page.items)
      .catch((error) => {
        console.error("Failed to load the latest blog posts:", error);
        return [];
      }),
  ]);
  if (!post) notFound();

  return (
    <BlogArticleClient
      post={post}
      latestPosts={latestPosts}
      publishedAt={formatDate(post.published_at, {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })}
      readingMinutes={readingMinutes(post.content)}
    />
  );
}
