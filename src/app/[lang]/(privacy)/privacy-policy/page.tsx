import { useTranslations } from "next-intl";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | CountryNation",
  description: "Our privacy policy and data protection practices",
};

export default function PrivacyPolicyPage() {
  // const t = useTranslations("policies.privacy");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <h1>Privacy Policy</h1>
    </div>
  );
}
