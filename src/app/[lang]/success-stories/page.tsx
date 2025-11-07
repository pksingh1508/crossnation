import type { Metadata } from "next";
import { AllTestimonials } from "@/components/testimonials/AllTestimonials";
import { generateMetadata as buildMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/constants/site";

const canonicalUrl = `${siteConfig.url}/${siteConfig.defaultLanguage}/success-stories`;

export const metadata: Metadata = buildMetadata({
  title: "Success Stories & Testimonials | EU Career Serwis",
  description:
    "Read authentic immigration and recruitment success stories from EU Career Serwis clients who secured legal work permits and visas across Europe.",
  keywords: [
    "eu career serwis testimonials",
    "immigration success stories",
    "client reviews poland recruitment",
  ],
  canonical: canonicalUrl,
});

export default function SuccessStoriesPage() {
  return <AllTestimonials />;
}
