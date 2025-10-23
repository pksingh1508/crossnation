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
  title: "Europe's Premier Immigration & Recruitment Consultancy",
  description:
    "Partner with EU Career Serwis for premium immigration, recruitment, and HR consulting services in Europe. Tailored solutions for professionals and employers seeking growth and global opportunities.",
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
  // ✅ Structured Data Schemas (safe for production)
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "EU Career Serwis",
    alternateName: "EU Career Serwis Poland",
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
    <html lang={siteConfig.defaultLanguage}>
      <head>
        <link rel="icon" href="./favicon.ico" />
        <meta name="theme-color" content="#0b74da" />
        <meta name="robots" content="index, follow" />

        {/* ✅ JSON-LD for Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        {/* ✅ Open Graph */}
        <meta property="og:site_name" content="EU Career Serwis" />
        <meta property="og:title" content="EU Career Serwis" />
        <meta
          property="og:description"
          content="Immigration services, work permits and career guidance in Poland"
        />
        <meta
          property="og:image"
          content="https://eucareerserwis.pl/logoImage.jpeg"
        />
        <meta property="og:url" content="https://eucareerserwis.pl" />
      </head>
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
