import { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { siteConfig } from "@/constants/site";

interface DefaultLocaleLayoutProps {
  children: ReactNode;
}

export default async function DefaultLocaleLayout({
  children,
}: DefaultLocaleLayoutProps) {
  const locale = siteConfig.defaultLanguage;
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
