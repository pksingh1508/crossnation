import type { CountryJobs } from "../types";
import { albania } from "./albania";
import { armenia } from "./armenia";
import { belarus } from "./belarus";
import { bulgaria } from "./bulgaria";
import { czechRepublic } from "./czech-republic";
import { lithuania } from "./lithuania";
import { mauritius } from "./mauritius";
import { northMacedonia } from "./north-macedonia";
import { poland } from "./poland";
import { romania } from "./romania";
import { serbia } from "./serbia";
import { slovakia } from "./slovakia";
import { ukraine } from "./ukraine";

/** The countries with a jobs page, by the end of its address: /jobs-in-<slug> */
export const COUNTRY_JOBS = {
  albania,
  armenia,
  belarus,
  bulgaria,
  "czech-republic": czechRepublic,
  lithuania,
  mauritius,
  "north-macedonia": northMacedonia,
  poland,
  romania,
  serbia,
  slovakia,
  ukraine,
} satisfies Record<string, CountryJobs>;

export type CountrySlug = keyof typeof COUNTRY_JOBS;
