import { Refund_Policy } from "@/components/Terms_Conditions/Refund_Policy";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy | EU Career Serwis",
  description: "Our refund policy and terms for service cancellations",
};

export default function RefundPolicyPage() {
  return <Refund_Policy />;
}
