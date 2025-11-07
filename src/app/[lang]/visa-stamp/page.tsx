import type { Metadata } from "next";
import { AllVisaStampImage } from "@/components/visaStamp/AllVisaStampImage";
import { generateMetadata as buildMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/constants/site";
import { getAllStampImages } from "@/lib/strapi";

const canonicalUrl = `${siteConfig.url}/${siteConfig.defaultLanguage}/visa-stamp`;

export const metadata: Metadata = buildMetadata({
  title: "Visa Stamp Approvals Gallery | EU Career Serwis",
  description:
    "See real visa stamp approvals earned by EU Career Serwis clients, demonstrating trusted immigration outcomes for travel and work across Europe.",
  keywords: [
    "visa stamp approvals",
    "immigration proof gallery",
    "eu career serwis visas",
  ],
  canonical: canonicalUrl,
});

async function getInitialStamps() {
  const token = process.env.STRAPI_ACCESS_TOKEN;
  if (!token) {
    return { stamps: [], meta: undefined };
  }

  try {
    const response = await getAllStampImages(token, 1, 20, "visa-stamps");
    const pagination = response.meta?.pagination;
    const meta = pagination
      ? {
          currentPage: pagination.page ?? 1,
          totalPages: pagination.pageCount ?? 0,
          hasNextPage:
            (pagination.page ?? 1) < (pagination.pageCount ?? 0),
        }
      : undefined;

    return { stamps: response.data ?? [], meta };
  } catch (error) {
    console.error("Failed to prefetch visa stamp gallery:", error);
    return { stamps: [], meta: undefined };
  }
}

export default async function VisaStampGalleryPage() {
  const { stamps, meta } = await getInitialStamps();
  return <AllVisaStampImage initialStamps={stamps} initialMeta={meta} />;
}
