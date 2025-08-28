import { ReactNode } from "react";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { siteConfig } from "@/constants/site";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

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
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </NextIntlClientProvider>
  );
}
