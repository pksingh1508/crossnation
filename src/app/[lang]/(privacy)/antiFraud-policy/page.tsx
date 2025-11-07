import { useTranslations } from "next-intl";
import { Metadata } from "next";
import AntiFraudPolicy from "@/components/Terms_Conditions/AntiFraudPolicy";

export const metadata: Metadata = {
  title: "Anti-Fraud Policy | EU Career Serwis",
  description: "Our anti-fraud policy and security measures",
};

export default function AntiFraudPolicyPage() {
  return <AntiFraudPolicy />;
}
