import VisaStampGalleryPage from "@/app/[lang]/(site)/visa-stamp/page";
import { siteConfig } from "@/constants/site";

export { metadata } from "@/app/[lang]/(site)/visa-stamp/page";

interface DefaultVisaStampGalleryPageProps {
  searchParams: Promise<{ country?: string | string[] }>;
}

export default function DefaultVisaStampGalleryPage({
  searchParams,
}: DefaultVisaStampGalleryPageProps) {
  return (
    <VisaStampGalleryPage
      params={Promise.resolve({ lang: siteConfig.defaultLanguage })}
      searchParams={searchParams}
    />
  );
}
