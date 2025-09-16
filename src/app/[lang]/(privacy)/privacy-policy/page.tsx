import { Metadata } from "next";
import Privacy_Policy from "@/components/Terms_Conditions/Privacy_Policy";

export const metadata: Metadata = {
  title: "Privacy Policy | EU Career Serwis",
  description:
    "Our terms, conditions, privacy policy and data protection practices",
};

export default function PrivacyPolicyPage() {
  return <Privacy_Policy />;
}
