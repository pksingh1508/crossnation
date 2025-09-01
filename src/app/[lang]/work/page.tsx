import { Metadata } from "next";
import { CommonContact } from "@/components/sections/CommonContact";
import { WorkContent } from "@/components/work/WorkContent";

export const metadata: Metadata = {
  title: "Work Opportunities | CountryNation",
  description: "Find international work opportunities and visa assistance",
};

export default function WorkPage() {
  return (
    <div className="min-h-screen">
      <CommonContact />
      <WorkContent />
    </div>
  );
}
