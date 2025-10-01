import type { Metadata } from "next";
import { fontSans, fontMono } from "@/fonts";
import "./globals.css";
import { siteConfig } from "@/constants/site";
import { Toaster } from "react-hot-toast";
import { ReactLenis } from "@/utils/lenis";
import { LenisOptions } from "lenis";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { generateMetadata } from "@/lib/seo/metadata";

const fonts = `${fontSans.variable} ${fontMono.variable}`;

export const metadata: Metadata = generateMetadata({
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: [
    "immigration services",
    "work permits",
    "visa assistance",
    "european recruitment",
    "career guidance",
  ],
});

const lenisOptions: Partial<LenisOptions> = {
  // smoothing controls
  duration: 1.2,

  // input multipliers & behavior
  wheelMultiplier: 1, // mouse wheel sensitivity
  touchMultiplier: 2,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={siteConfig.defaultLanguage}>
      <ReactLenis root options={lenisOptions}>
        <body className={fonts}>
          {process.env.NEXT_PUBLIC_GA_ID && (
            <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
          )}
          {children}
          <Toaster position="top-right" reverseOrder={false} />
        </body>
      </ReactLenis>
    </html>
  );
}
