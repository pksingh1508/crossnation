import { Package, SprayCan, Tractor } from "lucide-react";
import { paidAfterVisa, paidToStart, standardCountry } from "../standard";

export const bulgaria = standardCountry({
  slug: "bulgaria",
  name: "Bulgaria",
  adjective: "Bulgarian",
  code: "BG",
  code3: "BGR",
  roles: [
    { title: "Packaging Worker", icon: Package },
    { title: "General Cleaner", icon: SprayCan },
    { title: "Farm Worker", icon: Tractor },
  ],
  facts: [
    { label: "Salary", value: "€900–€1,200/month (net)" },
    { label: "Eligibility", value: "Male/Female, Ages 18–55" },
  ],
  documents: [
    "Valid passport (scanned copy, all pages)",
    "CV/Bio-data with address",
    "Education certificate/diploma with apostille translated into Bulgarian",
  ],
  payments: [paidToStart(700), paidAfterVisa(2200)],
  permitAuthority: "the Employment Agency (EA)",
  permitDays: [25, 35],
});
