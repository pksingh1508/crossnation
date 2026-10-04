import type { Metadata } from "next";
import { PolicyPage } from "@/components/policy/PolicyPage";
import { generateMetadata as buildMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/constants/site";
import { getLocalizedUrl } from "@/lib/locale-paths";

export const metadata: Metadata = buildMetadata({
  title: "Refund Policy",
  description: "Our refund policy and terms for service cancellations",
  canonical: getLocalizedUrl(siteConfig.defaultLanguage, "/refund-policy"),
});

export default function RefundPolicyPage() {
  return <PolicyPage policy="refund" />;
}
