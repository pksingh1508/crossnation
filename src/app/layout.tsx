import type { Metadata } from "next";
import { fontSans, fontMono } from "@/fonts";
import "./globals.css";
import { siteConfig } from "@/constants/site";

const fonts = `${fontSans.variable} ${fontMono.variable}`;

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  icons: { icon: [{ url: "/favicon.ico" }] },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={siteConfig.defaultLanguage}>
      <body className={fonts}>{children}</body>
    </html>
  );
}
