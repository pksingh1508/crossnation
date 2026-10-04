import { Car, Factory, Flame, Warehouse, Wrench } from "lucide-react";
import {
  paidAfterPermit,
  paidAfterVisa,
  paidToStart,
  standardCountry,
} from "../standard";

export const slovakia = standardCountry({
  slug: "slovakia",
  name: "Slovakia",
  adjective: "Slovak",
  code: "SK",
  code3: "SVK",
  roles: [
    { title: "Warehouse Worker", icon: Warehouse },
    { title: "Automobile Plant Manufacturing (Seats)", icon: Car },
    { title: "Auxiliary Worker in Car Factory", icon: Factory },
    { title: "Welder (MIG/MAG/TIG)", icon: Flame },
    { title: "Assembly Operator", icon: Wrench },
  ],
  facts: [
    { label: "Salary", value: "€900–€1,500/month (gross)" },
    { label: "Eligibility", value: "Male/Female, Ages 20–40" },
  ],
  documents: [
    "Valid passport (scanned copy, all pages)",
    "CV/Bio-data with address",
  ],
  payments: [paidToStart(800), paidAfterPermit(1000), paidAfterVisa(1100)],
  permitAuthority:
    "the Office of Labour, Social Affairs and Family (Úrad práce, sociálnych vecí a rodiny)",
  permitDays: [40, 55],
});
