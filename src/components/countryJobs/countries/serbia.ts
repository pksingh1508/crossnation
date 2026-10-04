import { HardHat, SprayCan } from "lucide-react";
import {
  paidAfterPermit,
  paidAfterVisa,
  paidToStart,
  standardCountry,
} from "../standard";

export const serbia = standardCountry({
  slug: "serbia",
  name: "Serbia",
  adjective: "Serbian",
  code: "RS",
  code3: "SRB",
  roles: [
    { title: "Construction Worker", icon: HardHat },
    { title: "General Cleaner", icon: SprayCan },
  ],
  facts: [
    { label: "Salary", value: "€800–€1,000/month (net)" },
    { label: "Eligibility", value: "Male/Female, Ages 18–50" },
  ],
  documents: [
    "Valid passport (scanned copy, all pages)",
    "CV/Bio-data with address",
    "Education certificate/diploma with apostille translated into Serbian",
  ],
  payments: [paidToStart(700), paidAfterPermit(800), paidAfterVisa(800)],
  permitAuthority:
    "the Ministry of the Interior (Ministarstvo unutrašnjih poslova)",
  permitDays: [30, 40],
});
