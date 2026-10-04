import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { DocumentGallery } from "@/components/gallery/DocumentGallery";
import { generateMetadata as buildMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/constants/site";
import { getAllWorkPermits } from "@/lib/cms/queries";
import { toGalleryDocuments } from "@/lib/cms/gallery";
import { getLocalizedPath, getLocalizedUrl } from "@/lib/locale-paths";

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

interface WorkPermitGalleryPageProps {
  params: Promise<{ lang: string }>;
  /** ?country=pl shows only that country's permits */
  searchParams?: Promise<{ country?: string | string[] }>;
}

export default async function WorkPermitGalleryPage({
  params,
  searchParams,
}: WorkPermitGalleryPageProps) {
  const { lang } = await params;
  const [country] = [(await searchParams)?.country].flat();

  const documents = await getAllWorkPermits()
    .then((permits) => toGalleryDocuments(permits, lang))
    .catch((error) => {
      console.error("Failed to load the work permit gallery:", error);
      return null;
    });

  return (
    <div>
      <div className="container mx-auto px-4 pt-6">
        <Breadcrumbs
          items={[
            {
              name: "Work Permits",
              href: getLocalizedPath(lang, "/work-permit"),
            },
          ]}
        />
      </div>
      <DocumentGallery
        namespace="workPermit"
        documents={documents}
        country={country}
      />
    </div>
  );
}
