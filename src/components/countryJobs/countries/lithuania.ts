import { Truck } from "lucide-react";
import {
  paidAfterPermit,
  paidAfterVisa,
  paidToStart,
  standardCountry,
} from "../standard";

export const lithuania = standardCountry({
  slug: "lithuania",
  name: "Lithuania",
  adjective: "Lithuanian",
  code: "LT",
  code3: "LTU",
  roles: [{ title: "Truck Driver", icon: Truck }],
  facts: [
    { label: "Salary", value: "€2,500–€2,700/month (net)" },
    {
      label: "Benefits",
      value:
        "Accommodation, medical insurance, and uniform provided by the employer",
    },
    { label: "Eligibility", value: "Male/Female, Ages 25–50" },
  ],
  documents: [
    "Valid passport (scanned copy, all pages)",
    "Police Clearance Certificate (PCC)",
    "Valid C+E driving license",
  ],
  payments: [paidToStart(1000), paidAfterPermit(1500), paidAfterVisa(1500)],
  permitAuthority: "the Employment Service (Užimtumo tarnyba)",
  permitDays: [40, 55],
});
