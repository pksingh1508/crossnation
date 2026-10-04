import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { DocumentGallery } from "@/components/gallery/DocumentGallery";
import { generateMetadata as buildMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/constants/site";
import { getAllVisaStamps } from "@/lib/cms/queries";
import { toGalleryDocuments } from "@/lib/cms/gallery";
import { getLocalizedPath, getLocalizedUrl } from "@/lib/locale-paths";

const canonicalUrl = getLocalizedUrl(siteConfig.defaultLanguage, "/visa-stamp");

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

interface VisaStampGalleryPageProps {
  params: Promise<{ lang: string }>;
  /** ?country=pl shows only that country's stamps, once they have countries */
  searchParams?: Promise<{ country?: string | string[] }>;
}

export default async function VisaStampGalleryPage({
  params,
  searchParams,
}: VisaStampGalleryPageProps) {
  const { lang } = await params;
  const [country] = [(await searchParams)?.country].flat();

  const documents = await getAllVisaStamps()
    .then((stamps) => toGalleryDocuments(stamps, lang))
    .catch((error) => {
      console.error("Failed to load the visa stamp gallery:", error);
      return null;
    });

  return (
    <div>
      <div className="container mx-auto px-4 pt-6">
        <Breadcrumbs
          items={[
            {
              name: "Visa Stamps",
              href: getLocalizedPath(lang, "/visa-stamp"),
            },
          ]}
        />
      </div>
      <DocumentGallery
        namespace="visaStamp"
        documents={documents}
        country={country}
      />
    </div>
  );
}
