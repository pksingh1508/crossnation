import type { Metadata } from "next";
import TermsAndConditions from "@/components/Terms_Conditions/TermsAndConditions";
import { generateMetadata as buildMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/constants/site";

const canonicalUrl = `${siteConfig.url}/${siteConfig.defaultLanguage}/terms-conditions`;

export const metadata: Metadata = buildMetadata({
  title: "Terms & Conditions | EU Career Serwis",
  description:
    "Review the official EU Career Serwis terms and conditions covering service agreements, responsibilities, and legal policies for immigration support.",
  keywords: [
    "eu career serwis terms",
    "immigration service policies",
    "terms and conditions poland",
  ],
  canonical: canonicalUrl,
});

export default function TermsAndConditionsPage() {
  return <TermsAndConditions />;
}
