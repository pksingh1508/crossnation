import { Cities } from "@/constants/JobCities";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { CommonContact } from "@/components/sections/CommonContact";

interface CityJobsPageProps {
  params: Promise<{ lang: string; city: string }>;
}

export default async function CityJobsPage({ params }: CityJobsPageProps) {
  const { lang, city } = await params;

  const cityData = Cities.find((item) => item.href === `/${city}`);
  const cityName = cityData?.cityName ?? city;
  const breadcrumbItems = [
    { name: "Jobs", href: `/${lang}/jobs` },
    { name: cityName, href: `/${lang}/jobs/${city}` },
  ];

  return (
    <div className=" bg-white">
      <div className="container mx-auto px-4 py-4">
        <Breadcrumbs items={breadcrumbItems} />
      </div>
      <div>{/* <CommonContact /> */}</div>
    </div>
  );
}
