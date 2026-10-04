import type { Metadata } from "next";
import { PolicyPage } from "@/components/policy/PolicyPage";
import { generateMetadata as buildMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/constants/site";
import { getLocalizedUrl } from "@/lib/locale-paths";

export const metadata: Metadata = buildMetadata({
  title: "Anti-Fraud Policy",
  description: "Our anti-fraud policy and security measures",
  canonical: getLocalizedUrl(siteConfig.defaultLanguage, "/antiFraud-policy"),
});

export default function AntiFraudPolicyPage() {
  return <PolicyPage policy="antiFraud" />;
}
