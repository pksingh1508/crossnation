import { Suspense } from "react";
import { getBlogPosts } from "@/lib/cms/queries";
import { RecentBlogList, RecentBlogSkeleton } from "./RecentBlogList";

/** The three newest blog posts. Rendered on the server, so the links are in the page's HTML. */
export function RecentBlog() {
  return (
    <Suspense fallback={<RecentBlogSkeleton />}>
      <RecentBlogContent />
    </Suspense>
  );
}

async function RecentBlogContent() {
  const blogs = await getBlogPosts(1, 3)
    .then((page) => page.items)
    .catch((error) => {
      // A small section: hide it rather than fail the whole page
      console.error("Failed to load recent blog posts:", error);
      return null;
    });
  if (!blogs) return null;

  return <RecentBlogList blogs={blogs} />;
}
