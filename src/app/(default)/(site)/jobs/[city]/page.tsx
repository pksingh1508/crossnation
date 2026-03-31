import CityJobsPage from "@/app/[lang]/(site)/jobs/[city]/page";
import { siteConfig } from "@/constants/site";

interface DefaultCityJobsPageProps {
  params: Promise<{ city: string }>;
}

export default async function DefaultCityJobsPage({
  params,
}: DefaultCityJobsPageProps) {
  const { city } = await params;

  return (
    <CityJobsPage
      params={Promise.resolve({
        lang: siteConfig.defaultLanguage,
        city,
      })}
    />
  );
}
