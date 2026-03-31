import { Metadata } from "next";
import { HomePageContent } from "@/components/pages/HomePageContent";
import {
  generateLocalizedMetadata,
  getLocalizedPageConfig,
} from "@/lib/seo/metadata";

interface HomePageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const { lang } = await params;

  const pageConfig = getLocalizedPageConfig("home", lang);

  return generateLocalizedMetadata({
    ...pageConfig,
    locale: lang,
    pathname: "",
  });
}

export default async function HomePage({ params }: HomePageProps) {
  await params;

  return <HomePageContent />;
}
