import WorkPermitGalleryPage from "@/app/[lang]/(site)/work-permit/page";
import { siteConfig } from "@/constants/site";

export { metadata } from "@/app/[lang]/(site)/work-permit/page";

interface DefaultWorkPermitGalleryPageProps {
  searchParams: Promise<{ country?: string | string[] }>;
}

export default function DefaultWorkPermitGalleryPage({
  searchParams,
}: DefaultWorkPermitGalleryPageProps) {
  return (
    <WorkPermitGalleryPage
      params={Promise.resolve({ lang: siteConfig.defaultLanguage })}
      searchParams={searchParams}
    />
  );
}
