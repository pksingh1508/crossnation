import type { LucideIcon } from "lucide-react";

/** A short text with an icon beside it */
export interface IconText {
  text: string;
  icon: LucideIcon;
}

/** A list under a title of its own */
export interface TitledList<T = string> {
  title: string;
  description?: string;
  items: T[];
}

/** An open job */
export interface Role {
  title: string;
  icon: LucideIcon;
  /** Its pay, where it differs from job to job, e.g. "€500–€700" */
  salary?: string;
  /** What comes with it, e.g. "Includes 1 meal and accommodation" */
  note?: string;
}

export interface RoleGroup {
  /** Where a page has several kinds of jobs, e.g. "Hospitality and Service Roles" */
  title?: string;
  roles: Role[];
}

/** A term of the jobs, e.g. Salary: €900–€1,200/month (net) */
export interface Fact {
  label: string;
  value: string;
}

/** A part of the price, paid at a given point of the process */
export interface Payment {
  /** In euros */
  amount: number;
  /** When it is paid, e.g. "After the work permit is issued" */
  when: string;
  /** What happens then */
  description?: string;
}

/** One stage of the processing: the work permit or the visa */
export interface ProcessingStage {
  title: string;
  description: string;
  /** How long it usually takes, in working days: from, to */
  days: [number, number];
  points: string[];
}

export interface Processing {
  title: string;
  description: string;
  permit: ProcessingStage;
  visa: ProcessingStage;
}

/** A usual monthly salary, in euros */
export interface SalaryExample {
  role: string;
  min: number;
  max: number;
}

/** What working and living there is like */
export interface Living {
  life: TitledList;
  accommodation: TitledList;
  salary: TitledList & { examples: TitledList<SalaryExample> };
}

/** Everything a country's jobs page shows */
export interface CountryJobs {
  /** The page's address is /jobs-in-<slug> */
  slug: string;
  /** e.g. Poland */
  name: string;
  /** How the name reads after "in", e.g. "the Czech Republic" */
  place: string;
  /** ISO codes: PL for the flag, POL for the boarding pass */
  code: string;
  code3: string;
  /** The terms of the jobs: salary, hours, who can apply */
  facts: Fact[];
  roles: { title: string; groups: RoleGroup[] };
  /** Two lists of reasons to work there */
  why: [TitledList<IconText>, TitledList<IconText>];
  /** What an applicant sends us */
  documents: string[];
  steps: TitledList;
  /** How long the work permit and the visa take; not on every page */
  processing?: Processing;
  payments: Payment[];
  /** Below the payments, e.g. who pays for the flight */
  paymentNote?: string;
  whyUs: string[];
  /** Our help before and after the move; not on every page */
  services?: {
    title: string;
    description: string;
    before: TitledList;
    after: TitledList;
  };
  /** Life, housing and salaries there; not on every page */
  living?: Living;
  /** A closing word, above the application form */
  summary?: string;
}
