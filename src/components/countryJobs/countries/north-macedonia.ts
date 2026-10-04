import {
  BrickWall,
  Grid2x2,
  HardHat,
  HeartHandshake,
  Layers,
  Sparkles,
} from "lucide-react";
import { paidAfterVisa, paidToStart, standardCountry } from "../standard";

export const northMacedonia = standardCountry({
  slug: "north-macedonia",
  name: "North Macedonia",
  adjective: "North Macedonian",
  code: "MK",
  code3: "MKD",
  roles: [
    { title: "Construction Worker", icon: HardHat },
    { title: "Tile Fitter", icon: Grid2x2 },
    { title: "Brick Worker", icon: BrickWall },
    { title: "Polisher", icon: Sparkles },
    { title: "Laminate / Parquet Installer", icon: Layers },
    { title: "Caregiver", icon: HeartHandshake },
  ],
  facts: [
    { label: "Salary", value: "€800–€1,000/month (net)" },
    { label: "Eligibility", value: "Male/Female, Ages 20–50" },
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
  permitAuthority:
    "the Employment Agency of the Republic of North Macedonia (ESARM)",
  permitDays: [25, 30],
});
