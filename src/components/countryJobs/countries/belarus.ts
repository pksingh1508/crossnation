import { Bike, CarTaxiFront, Warehouse } from "lucide-react";
import {
  paidAfterPermit,
  paidAfterVisa,
  paidToStart,
  standardCountry,
} from "../standard";

export const belarus = standardCountry({
  slug: "belarus",
  name: "Belarus",
  adjective: "Belarusian",
  code: "BY",
  code3: "BLR",
  roles: [
    { title: "Warehouse Worker", icon: Warehouse },
    { title: "Taxi Driver", icon: CarTaxiFront },
    { title: "Food Delivery", icon: Bike },
  ],
  facts: [
    { label: "Salary", value: "€800–€1,000/month (net)" },
    { label: "Eligibility", value: "Male/Female, Ages 20–50" },
  ],
  documents: [
    "Valid passport (scanned copy, all pages)",
    "CV/Bio-data with address",
  ],
  payments: [paidToStart(900), paidAfterPermit(1000), paidAfterVisa(1100)],
  permitAuthority: "Regional Executive Committees",
  permitDays: [25, 30],
});
