import type { Metadata } from "next";
import { AllPermitImage } from "@/components/work_permit/AllPermitImage";
import { generateMetadata as buildMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/constants/site";
import { getAllPermitImages } from "@/lib/strapi";

const canonicalUrl = `${siteConfig.url}/${siteConfig.defaultLanguage}/work-permit`;

export const metadata: Metadata = buildMetadata({
  title: "Work Permit Approvals Gallery | EU Career Serwis",
  description:
    "Browse verified EU Career Serwis work permit approvals that showcase successful immigration support for employers and candidates across Europe.",
  keywords: [
    "work permit approvals",
    "poland work permit gallery",
    "eu career serwis success",
  ],
  canonical: canonicalUrl,
});

async function getInitialPermits() {
  const token = process.env.STRAPI_ACCESS_TOKEN;
  if (!token) {
    return { permits: [], meta: undefined };
  }

  try {
    const response = await getAllPermitImages(token, 1, 20, "work-permits");
    const pagination = response.meta?.pagination;
    const meta = pagination
      ? {
          currentPage: pagination.page ?? 1,
          totalPages: pagination.pageCount ?? 0,
          hasNextPage:
            (pagination.page ?? 1) < (pagination.pageCount ?? 0),
        }
      : undefined;

    return { permits: response.data ?? [], meta };
  } catch (error) {
    console.error("Failed to prefetch work permit gallery:", error);
    return { permits: [], meta: undefined };
  }
}

export default async function WorkPermitGalleryPage() {
  const { permits, meta } = await getInitialPermits();
  return <AllPermitImage initialPermits={permits} initialMeta={meta} />;
}
