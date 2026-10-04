import { HardHat } from "lucide-react";
import {
  paidAfterPermit,
  paidAfterVisa,
  paidToStart,
  standardCountry,
} from "../standard";

export const ukraine = standardCountry({
  slug: "ukraine",
  name: "Ukraine",
  adjective: "Ukrainian",
  code: "UA",
  code3: "UKR",
  roles: [{ title: "Construction (Handyman, Foreman)", icon: HardHat }],
  facts: [
    { label: "Salary", value: "€600–€700/month (net)" },
    { label: "Eligibility", value: "Male/Female, Ages 20–50" },
  ],
  documents: [
    "Valid passport (scanned copy, all pages)",
    "CV/Bio-data with address",
  ],
  payments: [paidToStart(900), paidAfterPermit(900), paidAfterVisa(1200)],
  permitAuthority: "the Ministry of Labour and Social Affairs (MLSA)",
  permitDays: [25, 30],
});
