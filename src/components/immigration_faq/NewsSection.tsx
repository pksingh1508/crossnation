import React, { Suspense } from "react";
import { getNewsArticles } from "@/lib/cms/queries";
import { ImmigrationNews, ImmigrationNewsSkeleton } from "./ImmigrationNews";
import { SomeFAQ } from "./SomeFAQ";

export function NewsSection() {
  return (
    <div className="py-16 md:py-9">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Desktop Layout: FAQ left, News right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* FAQ Section - Left Half */}
            <div className="order-1 lg:order-2">
              <SomeFAQ />
            </div>

            {/* Immigration News Section - Right Half */}
            <div className="order-2 lg:order-1">
              <Suspense fallback={<ImmigrationNewsSkeleton />}>
                <LatestImmigrationNews />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** The ten newest articles. Rendered on the server, so the links are in the page's HTML. */
async function LatestImmigrationNews() {
  const news = await getNewsArticles(1, 10)
    .then((page) => page.items)
    .catch((error) => {
      // A small section: hide it rather than fail the whole page
      console.error("Failed to load immigration news:", error);
      return null;
    });
  if (!news) return null;

  return <ImmigrationNews news={news} />;
}
