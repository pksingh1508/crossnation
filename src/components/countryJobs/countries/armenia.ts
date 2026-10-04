import { HardHat, SprayCan, Tractor, Warehouse } from "lucide-react";
import { paidAfterVisa, paidToStart, standardCountry } from "../standard";

export const armenia = standardCountry({
  slug: "armenia",
  name: "Armenia",
  adjective: "Armenian",
  code: "AM",
  code3: "ARM",
  roles: [
    { title: "Warehouse Worker", icon: Warehouse },
    { title: "Construction Worker", icon: HardHat },
    { title: "General Cleaner", icon: SprayCan },
    { title: "Farm Worker", icon: Tractor },
  ],
  facts: [
    { label: "Salary", value: "€900–€1,200/month (net)" },
    { label: "Eligibility", value: "Male/Female, Ages 30–55" },
  ],
  documents: [
    "Valid passport (scanned copy, all pages)",
    "CV/Bio-data with address",
    "Education certificate/diploma with apostille translated into Armenian",
  ],
  payments: [paidToStart(700), paidAfterVisa(2200)],
  permitAuthority: "the Ministry of Labour and Social Affairs (MLSA)",
  permitDays: [25, 35],
});
