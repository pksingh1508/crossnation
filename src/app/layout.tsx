import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { fontSans, fontMono } from "@/fonts";
import "./globals.css";
import { siteConfig } from "@/constants/site";
import { Toaster } from "react-hot-toast";
import { ReactLenis } from "@/utils/lenis";
import { LenisOptions } from "lenis";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { generateMetadata } from "@/lib/seo/metadata";
import { StructuredData } from "@/components/seo/StructuredData";
import Script from "next/script";

const fonts = `${fontSans.variable} ${fontMono.variable}`;

export const metadata: Metadata = generateMetadata({
  title: "European Recruitment Agency for Unskilled & Semi-Skilled Workers",
  description:
    "EU Career Serwis is a trusted recruitment agency in Poland, connecting European employers with qualified unskilled and semi-skilled workers from non-EU countries.",
  keywords: [
    "international recruitment agency",
    "recruitment agency in Poland",
    "hire unskilled workers in Europe",
    "semi-skilled worker recruitment",
    "manpower agency Poland",
    "foreign worker recruitment",
    "legal employment abroad",
    "non-EU worker hiring in Europe",
    "European labor supply agency",
    "overseas recruitment services",
    "immigration services",
    "work permits",
    "visa assistance",
    "european recruitment",
    "career guidance",
  ],
});

export const viewport: Viewport = {
  themeColor: "#0b74da",
};

const lenisOptions: Partial<LenisOptions> = {
  // smoothing controls
  duration: 1.2,

  // input multipliers & behavior
  wheelMultiplier: 1, // mouse wheel sensitivity
  touchMultiplier: 2,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale =
    (await headers()).get("x-next-intl-locale") || siteConfig.defaultLanguage;

  // ✅ Structured Data Schemas (safe for production)
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "EU Career Serwis",
    alternateName: "EU Career Serwis",
    url: "https://eucareerserwis.pl",
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "EU Career Serwis",
    url: "https://eucareerserwis.pl",
    logo: "https://eucareerserwis.pl/logoImage.jpeg",
    sameAs: [
      "https://www.linkedin.com/company/eu-career-serwis",
      "https://www.facebook.com/eucareerserwis/",
      "https://instagram.com/eucareerserwis",
    ],
  };
  return (
    <html lang={locale}>
      <ReactLenis root options={lenisOptions}>
        <body className={fonts}>
          <StructuredData data={[websiteSchema, organizationSchema]} />
          {process.env.NEXT_PUBLIC_GA_ID && (
            <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
          )}
          {/* Google Ads Tag */}
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=AW-17774544099"
            strategy="afterInteractive"
          />
          <Script id="google-ads" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-17774544099');
            `}
          </Script>
          {children}
          <Toaster position="top-right" reverseOrder={false} />
        </body>
      </ReactLenis>
    </html>
  );
}
