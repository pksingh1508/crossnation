import { useTranslations } from "next-intl";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Anti-Fraud Policy | CountryNation",
  description: "Our anti-fraud policy and security measures",
};

export default function AntiFraudPolicyPage() {
  // const t = useTranslations("policies.antiFraud");

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100">
      <h1>Anti-Fraud Policy</h1>
    </div>
  );
}
