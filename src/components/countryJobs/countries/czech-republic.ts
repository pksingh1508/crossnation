import { HardHat, Warehouse } from "lucide-react";
import {
  paidAfterPermit,
  paidAfterVisa,
  paidToStart,
  standardCountry,
} from "../standard";

export const czechRepublic = standardCountry({
  slug: "czech-republic",
  name: "Czech Republic",
  place: "the Czech Republic",
  adjective: "Czech",
  code: "CZ",
  code3: "CZE",
  roles: [
    { title: "Construction Worker", icon: HardHat },
    { title: "Warehouse Worker", icon: Warehouse },
  ],
  facts: [
    { label: "Salary", value: "€950–€1,200/month (gross)" },
    { label: "Eligibility", value: "Male, Ages 18–50" },
  ],
  documents: [
    "Valid passport (scanned copy, all pages)",
    "CV/Bio-data with address",
  ],
  payments: [paidToStart(800), paidAfterPermit(1100), paidAfterVisa(1100)],
  permitAuthority:
    "the Labour Office of the Czech Republic (Úřad práce České republiky)",
  permitDays: [35, 45],
});
