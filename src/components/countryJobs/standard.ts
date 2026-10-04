import {
  BadgeCheck,
  Banknote,
  BriefcaseBusiness,
  Building2,
  Clock3,
  Globe2,
  HeartPulse,
  MapPinned,
  Sparkles,
  Stethoscope,
  TrendingUp,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import type { CountryJobs, Fact, IconText, Payment, Role } from "./types";

/** €2,100 */
export const formatEuro = (amount: number) =>
  new Intl.NumberFormat("en", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(amount);

/** "The Czech Republic", for the start of a sentence */
const capitalize = (text: string) => text[0].toUpperCase() + text.slice(1);

/** "an Armenia work visa", "a Ukraine work visa" */
const withArticle = (name: string) =>
  `${/^[AEIO]/.test(name) ? "an" : "a"} ${name}`;

const withIcons = (texts: string[], icons: LucideIcon[]): IconText[] =>
  texts.map((text, index) => ({ text, icon: icons[index] }));

// The three moments a payment can be due, and what we do then

export const paidToStart = (amount: number): Payment => ({
  amount,
  when: "Prepayment to start processing",
  description:
    "After receiving the initial payment, we will begin preparing all necessary supportive documents, including the work permit, to ensure a smooth application process.",
});

export const paidAfterPermit = (amount: number): Payment => ({
  amount,
  when: "After the work permit is issued",
  description:
    "Once the work permit has been successfully issued, we will send the documents via DHL post. Our immigration team will then assist you in completing the visa application process efficiently.",
});

export const paidAfterVisa = (amount: number): Payment => ({
  amount,
  when: "After the visa is issued",
  description:
    "After your visa has been successfully issued, the final payment must be made within 7 days.",
});

/** What a standard page needs; the rest is the same for every country */
interface StandardCountry {
  slug: string;
  name: string;
  /** How the name reads after "in", if not just the name: "the Czech Republic" */
  place?: string;
  /** For its culture: Polish */
  adjective: string;
  code: string;
  code3: string;
  roles: Role[];
  facts: Fact[];
  documents: string[];
  payments: Payment[];
  /** Who decides on work permits, e.g. "the Voivodeship Office (Urząd Wojewódzki)" */
  permitAuthority: string;
  /** How long a work permit takes, in working days */
  permitDays: [number, number];
}

/**
 * The page of a country with the standard offer: the same reasons, application steps,
 * services and promises, with the country's own jobs, terms, documents and prices.
 */
export function standardCountry({
  slug,
  name,
  place = name,
  adjective,
  code,
  code3,
  roles,
  facts,
  documents,
  payments,
  permitAuthority,
  permitDays,
}: StandardCountry): CountryJobs {
  return {
    slug,
    name,
    place,
    code,
    code3,
    facts,
    documents,
    payments,
    roles: {
      title: `Top Unskilled Job Opportunities Now Open in ${place}`,
      groups: [{ roles }],
    },
    why: [
      {
        title: `Advantages of Employment in ${place}`,
        description: `${capitalize(place)} continues to attract international workers because it combines practical career opportunities with a stable and affordable lifestyle.`,
        items: withIcons(
          [
            "Expanding Job Opportunities",
            "Stable and Growing Income Levels",
            "Standard Work Schedule",
            "Access to Public Medical Services",
            "Cost-Effective Living Environment",
            "Career Advancement Opportunities",
            "Strategic Location in Europe",
            "Rich Culture and Modern Lifestyle",
          ],
          [
            BriefcaseBusiness,
            TrendingUp,
            Clock3,
            Stethoscope,
            Wallet,
            BadgeCheck,
            Globe2,
            Sparkles,
          ]
        ),
      },
      {
        title: `Why Apply for ${withArticle(name)} Work Visa?`,
        description: `For many international workers, ${place} offers a strong balance of hiring demand, legal employment pathways, and long-term growth potential.`,
        items: withIcons(
          [
            "Massive Hiring Demand",
            "Reliable Earnings with Growth Potential",
            "Structured Work Routine",
            "Strong Health and Social Coverage",
            "Budget-Friendly Lifestyle",
            "Easy Access to Europe",
            "Professional Development Opportunities",
            "Dynamic Living Experience",
          ],
          [
            Building2,
            Banknote,
            Clock3,
            HeartPulse,
            Wallet,
            MapPinned,
            TrendingUp,
            Sparkles,
          ]
        ),
      },
    ],
    steps: {
      title: "Step-by-Step Application Process",
      items: [
        "Sign the agreement to begin the process.",
        "Complete eligibility verification.",
        "Submit documents.",
        `Pay the initial fee of ${formatEuro(payments[0].amount)}.`,
        "Receive a free eligibility assessment.",
        "Get a dedicated consultant.",
        "Start job matching with a verified employer.",
        "Submit the work permit application.",
        "Receive regular application updates.",
      ],
    },
    processing: {
      title: `${name} Work Permit & Visa: Information and Processing Time`,
      description: `Before applying for ${withArticle(name)} work permit and visa, it’s important to understand how the process works and how long each step may take. This overview helps you plan clearly and avoid unnecessary delays.`,
      permit: {
        title: `${name} Work Permit Processing`,
        description: `Work permit applications in ${place} are handled by ${permitAuthority} based on the employer’s location.`,
        days: permitDays,
        points: [
          "The exact timeline can vary depending on the number of applications being processed and the internal workflow of the office.",
          "In some cases, approvals may be issued faster, but during peak periods or high-demand seasons, delays may occur.",
        ],
      },
      visa: {
        title: `${name} Work Visa Processing`,
        description:
          "We schedule an appointment when the work permit is approved. The visa timeline starts only after document submission at the appointment.",
        days: [15, 35],
        points: [
          "Processing times can vary depending on document verification, biometric submissions, and embassy workload.",
          "Submitting complete and accurate documents helps avoid unnecessary delays.",
        ],
      },
    },
    paymentNote:
      "The flight ticket is provided by the employer at no additional cost to the candidate.",
    whyUs: [
      "Trusted and Verified Job Opportunities",
      "Strong Employer Network",
      "Fast and Transparent Process",
      "Visa and Documentation Assistance",
      "Pre-Arrival and Post-Arrival Services",
      "Opportunities for Unskilled and Skilled Workers",
      "Affordable and Reliable Services",
      "Dedicated Customer Support",
      "Your Gateway to a Career in Europe",
    ],
    services: {
      title: "Pre-Arrival and Post-Arrival Services",
      description: `EU Career Serwis supports workers throughout the full journey, from documentation and travel planning to settlement and workplace support in ${place}.`,
      before: {
        title: "Pre-Arrival Services (Before You Travel)",
        items: [
          "Assistance with work visa application and documentation",
          "Job offer confirmation and employment contract support",
          "Guidance on required documents and legalization process",
          "Travel planning and flight booking assistance",
          `Pre-departure briefing about life and work in ${place}`,
          "Information about employer, job role, and workplace",
          "Accommodation guidance before arrival",
          "Packing checklist and travel preparation support",
          `Basic orientation on ${adjective} culture and rules`,
          "24/7 support for any queries before departure",
        ],
      },
      after: {
        title: "Post-Arrival Services (After You Arrive)",
        items: [
          "Airport pickup and welcome assistance",
          "Help with accommodation and settling in",
          "Support with local registration and legal formalities",
          "Assistance in obtaining residence permit (if required)",
          "Help with opening a bank account",
          "Guidance on local transport and daily life",
          "Introduction to workplace and job onboarding",
          "Support in getting a SIM card and communication setup",
          "Ongoing assistance for any work or living issues",
          "Continuous support and guidance throughout your stay",
        ],
      },
    },
  };
}
