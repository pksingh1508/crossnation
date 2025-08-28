import { ReactNode } from "react";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { siteConfig } from "@/constants/site";
import Layout from "@/components/layout/Layout";
import Breadcrumbs from "@/components/layout/Breadcrumbs";

interface LangLayoutProps {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function LangLayout({
  children,
  params,
}: LangLayoutProps) {
  const { lang } = await params;

  if (!siteConfig.supportedLanguages.includes(lang as any)) {
    return null; // 404
  }

  const messages = await getMessages({ locale: lang });

  return (
    <NextIntlClientProvider locale={lang} messages={messages}>
      <Layout container className="flex-1">
        <div className="container mx-auto px-4 py-3">
          <Breadcrumbs />
        </div>
        {children}
      </Layout>
    </NextIntlClientProvider>
  );
}
