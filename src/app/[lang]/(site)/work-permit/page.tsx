import type { Metadata } from "next";
import { AllPermitImage } from "@/components/work_permit/AllPermitImage";
import { generateMetadata as buildMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/constants/site";
import { getWorkPermits } from "@/lib/cms/queries";
import { getLocalizedUrl } from "@/lib/locale-paths";

const canonicalUrl = getLocalizedUrl(
  siteConfig.defaultLanguage,
  "/work-permit"
);

export const metadata: Metadata = buildMetadata({
  title: "Work Permit Approvals Gallery",
  description:
    "Browse verified EU Career Serwis work permit approvals that showcase successful immigration support for employers and candidates across Europe.",
  keywords: [
    "work permit approvals",
    "poland work permit gallery",
    "eu career serwis success",
  ],
  canonical: canonicalUrl,
});

export default async function WorkPermitGalleryPage() {
  // Page 1 is rendered here; the gallery loads more images as the visitor scrolls
  const initialPage = await getWorkPermits(1, 20).catch((error) => {
    console.error("Failed to prefetch work permit gallery:", error);
    return null;
  });

  return <AllPermitImage initialPage={initialPage} />;
}
