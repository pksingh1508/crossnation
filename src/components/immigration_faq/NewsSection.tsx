import { Suspense } from "react";
import { getNewsArticles } from "@/lib/cms/queries";
import { ImmigrationNews, ImmigrationNewsSkeleton } from "./ImmigrationNews";

/** The latest immigration news beside a short FAQ. Used on the home page and several others. */
export function NewsSection() {
  return (
    <Suspense fallback={<ImmigrationNewsSkeleton />}>
      <LatestImmigrationNews />
    </Suspense>
  );
}

/** The six newest articles. Rendered on the server, so the links are in the page's HTML. */
async function LatestImmigrationNews() {
  const news = await getNewsArticles(1, 6)
    .then((page) => page.items)
    .catch((error) => {
      // Show the FAQ without the news rather than fail the whole page
      console.error("Failed to load immigration news:", error);
      return [];
    });

  return <ImmigrationNews news={news} />;
}
