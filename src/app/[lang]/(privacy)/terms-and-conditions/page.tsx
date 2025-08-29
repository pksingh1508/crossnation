import { useTranslations } from "next-intl";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions | CountryNation",
  description: "Our terms and conditions for using our services",
};

export default function TermsAndConditionsPage() {
  // const t = useTranslations("policies.terms");

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <h1>Terms and Conditions</h1>
    </div>
  );
}
