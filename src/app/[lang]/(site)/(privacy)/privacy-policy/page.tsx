import type { Metadata } from "next";
import { PolicyPage } from "@/components/policy/PolicyPage";
import { generateMetadata as buildMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/constants/site";
import { getLocalizedUrl } from "@/lib/locale-paths";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "Our terms, conditions, privacy policy and data protection practices",
  canonical: getLocalizedUrl(siteConfig.defaultLanguage, "/privacy-policy"),
});

export default function PrivacyPolicyPage() {
  return <PolicyPage policy="privacy" />;
}
