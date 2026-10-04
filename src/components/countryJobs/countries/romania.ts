import { HardHat, Sofa, Warehouse } from "lucide-react";
import {
  paidAfterPermit,
  paidAfterVisa,
  paidToStart,
  standardCountry,
} from "../standard";

export const romania = standardCountry({
  slug: "romania",
  name: "Romania",
  adjective: "Romanian",
  code: "RO",
  code3: "ROU",
  roles: [
    { title: "Warehouse Worker", icon: Warehouse },
    { title: "Construction Worker", icon: HardHat },
    {
      title: "Assembly Operator (Sofa & Beds – Production Line)",
      icon: Sofa,
    },
  ],
  facts: [
    { label: "Salary", value: "€1,000–€1,200/month (net)" },
    { label: "Eligibility", value: "Male/Female, Ages 20–50" },
  ],
  documents: [
    "Provide a scanned copy of the first page of your passport",
    "Submit an updated CV",
  ],
  payments: [paidToStart(900), paidAfterPermit(1000), paidAfterVisa(1100)],
  permitAuthority: "the General Inspectorate for Immigration (IGI)",
  permitDays: [60, 90],
});
