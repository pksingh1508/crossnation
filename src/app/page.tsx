import { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Layout from "@/components/layout/Layout";
import { HomePageContent } from "@/components/pages/HomePageContent";
import { siteConfig } from "@/constants/site";
import {
  generateLocalizedMetadata,
  getLocalizedPageConfig,
} from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const locale = siteConfig.defaultLanguage;
  const pageConfig = getLocalizedPageConfig("home", locale);

  return generateLocalizedMetadata({
    ...pageConfig,
    locale,
    pathname: "",
  });
}

export default async function RootPage() {
  const locale = siteConfig.defaultLanguage;
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Layout className="flex-1">
        <HomePageContent />
      </Layout>
    </NextIntlClientProvider>
  );
}
