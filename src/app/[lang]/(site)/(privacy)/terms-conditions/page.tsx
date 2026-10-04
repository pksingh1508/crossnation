import type { Metadata } from "next";
import { PolicyPage } from "@/components/policy/PolicyPage";
import { generateMetadata as buildMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/constants/site";
import { getLocalizedUrl } from "@/lib/locale-paths";

export const metadata: Metadata = buildMetadata({
  title: "Terms & Conditions",
  description:
    "Review the official EU Career Serwis terms and conditions covering service agreements, responsibilities, and legal policies for immigration support.",
  keywords: [
    "eu career serwis terms",
    "immigration service policies",
    "terms and conditions poland",
  ],
  canonical: getLocalizedUrl(siteConfig.defaultLanguage, "/terms-conditions"),
});

export default function TermsAndConditionsPage() {
  return <PolicyPage policy="terms" />;
}
