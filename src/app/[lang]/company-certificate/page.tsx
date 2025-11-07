import type { Metadata } from "next";
import { CertificateGallery } from "@/components/companyCertificate/CertificateGallery";
import { generateMetadata as buildMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/constants/site";

const canonicalUrl = `${siteConfig.url}/${siteConfig.defaultLanguage}/company-certificate`;

export const metadata: Metadata = buildMetadata({
  title: "Company Certificates | EU Career Serwis",
  description:
    "Review EU Career Serwis company certificates and compliance credentials for transparent, trusted immigration services.",
  keywords: [
    "company certificates",
    "EU Career Serwis documentation",
    "immigration compliance Poland",
    "vat certificate europe",
  ],
  canonical: canonicalUrl,
});

export default function CompanyCertificatePage() {
  return <CertificateGallery />;
}
