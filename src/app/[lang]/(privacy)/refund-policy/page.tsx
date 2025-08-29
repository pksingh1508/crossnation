import { useTranslations } from "next-intl";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy | CountryNation",
  description: "Our refund policy and terms for service cancellations",
};

export default function RefundPolicyPage() {
  // const t = useTranslations("policies.refund");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <h1>Refund Policy</h1>
    </div>
  );
}
