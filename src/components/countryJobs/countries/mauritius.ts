import { Bike, HardHat, Hotel } from "lucide-react";
import { paidAfterVisa, paidToStart, standardCountry } from "../standard";

export const mauritius = standardCountry({
  slug: "mauritius",
  name: "Mauritius",
  adjective: "Mauritian",
  code: "MU",
  code3: "MUS",
  roles: [
    { title: "Construction Worker", icon: HardHat },
    { title: "Food Delivery Jobs", icon: Bike },
    {
      title: "Hotel Jobs (Housekeeping, Kitchen Helper, General Hotel Roles)",
      icon: Hotel,
    },
  ],
  facts: [
    { label: "Salary", value: "€800–€1,000/month (net)" },
    { label: "Gender", value: "Male/Female" },
    { label: "Age limit", value: "20–50 years" },
    {
      label: "Nationality",
      value: "Only Indian & Nepalese candidates eligible",
    },
  ],
  documents: [
    "Valid passport (scanned copy, all pages)",
    "CV/Bio-data with address",
    "Recent Photograph",
  ],
  payments: [paidToStart(300), paidAfterVisa(2500)],
  permitAuthority: "the Voivodeship Office (Urząd Wojewódzki)",
  permitDays: [25, 30],
});
