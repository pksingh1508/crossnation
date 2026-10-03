import type { Metadata } from "next";
import { AllTestimonials } from "@/components/testimonials/AllTestimonials";
import { getTestimonials } from "@/lib/cms/queries";
import { generateMetadata as buildMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/constants/site";
import { getLocalizedUrl } from "@/lib/locale-paths";

const canonicalUrl = getLocalizedUrl(
  siteConfig.defaultLanguage,
  "/success-stories"
);

export const metadata: Metadata = buildMetadata({
  title: "Success Stories & Testimonials",
  description:
    "Read authentic immigration and recruitment success stories from EU Career Serwis clients who secured legal work permits and visas across Europe.",
  keywords: [
    "eu career serwis testimonials",
    "immigration success stories",
    "client reviews poland recruitment",
  ],
  canonical: canonicalUrl,
});

// Shows the client testimonials (eu_testimonials), as it did with Strapi
export default async function SuccessStoriesPage() {
  const initialPage = await getTestimonials(1, 10).catch((error) => {
    console.error("Failed to load testimonials:", error);
    return null;
  });

  return <AllTestimonials initialPage={initialPage} />;
}
