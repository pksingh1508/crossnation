import type { Metadata } from "next";
import { AllVisaStampImage } from "@/components/visaStamp/AllVisaStampImage";
import { generateMetadata as buildMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/constants/site";
import { getVisaStamps } from "@/lib/cms/queries";
import { getLocalizedUrl } from "@/lib/locale-paths";

const canonicalUrl = getLocalizedUrl(
  siteConfig.defaultLanguage,
  "/visa-stamp"
);

export const metadata: Metadata = buildMetadata({
  title: "Visa Stamp Approvals Gallery",
  description:
    "See real visa stamp approvals earned by EU Career Serwis clients, demonstrating trusted immigration outcomes for travel and work across Europe.",
  keywords: [
    "visa stamp approvals",
    "immigration proof gallery",
    "eu career serwis visas",
  ],
  canonical: canonicalUrl,
});

export default async function VisaStampGalleryPage() {
  // Page 1 is rendered here; the gallery loads more images as the visitor scrolls
  const initialPage = await getVisaStamps(1, 20).catch((error) => {
    console.error("Failed to prefetch visa stamp gallery:", error);
    return null;
  });

  return <AllVisaStampImage initialPage={initialPage} />;
}
