"use client";

import {
  BadgeCheck,
  Banknote,
  BriefcaseBusiness,
  Building2,
  Clock3,
  FileText,
  Globe2,
  HeartPulse,
  Landmark,
  MapPinned,
  Plane,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import TopTitleBar from "./TopTitleBar";
import CountryFooter from "./countryFooter";
import WorkPermit from "./WorkPermit";
import { RecentTestimonials } from "../sections/RecentTestimonials";
import CompanyOverview from "./CompanyOverview";
import { SectionTitle } from "./CountryJobShared";
import EmploymentBenefits from "./EmploymentBenefits";
import WhyApply from "./WhyApply";
import OpenRoles from "./OpenRoles";
import PaymentChargePolicy from "./PaymentChargePolicy";
import WhyChooseUs from "./WhyChooseUs";
import ProcessingGuide from "./ProcessingGuide";
import SupportServices from "./SupportServices";
import ProcessStep from "./ProcessStep";

const advantages = [
  "Expanding Job Opportunities",
  "Stable and Growing Income Levels",
  "Standard Work Schedule",
  "Access to Public Medical Services",
  "Cost-Effective Living Environment",
  "Career Advancement Opportunities",
  "Strategic Location in Europe",
  "Rich Culture and Modern Lifestyle",
];

const visaReasons = [
  "Massive Hiring Demand",
  "Reliable Earnings with Growth Potential",
  "Structured Work Routine",
  "Strong Health and Social Coverage",
  "Budget-Friendly Lifestyle",
  "Easy Access to Europe",
  "Professional Development Opportunities",
  "Dynamic Living Experience",
];

const permitTypes = [
  {
    type: "Type A",
    description:
      "For work with a Polish company under an official employment agreement.",
  },
  {
    type: "Type B",
    description:
      "For foreign nationals working in management roles within a Polish company for a period longer than six months.",
  },
  {
    type: "Type C",
    description:
      "For work at a Polish branch of a company that is based outside the country.",
  },
  {
    type: "Type D",
    description:
      "For work in Bulgaria while providing services on behalf of a company based in another country.",
  },
  {
    type: "Type S",
    description:
      "For temporary work in sectors like farming, gardening, or tourism during peak seasons.",
  },
];

const unskilledJobs = ["Packaging work", "General Cleaner", "Farm Work"];

const salaryAndEligibility = [
  "Salary: €900–€1,200/month (net)",
  "Eligibility: Male/Female, Ages 18–55",
];

const preArrivalServices = [
  "Assistance with work visa application and documentation",
  "Job offer confirmation and employment contract support",
  "Guidance on required documents and legalization process",
  "Travel planning and flight booking assistance",
  "Pre-departure briefing about life and work in Bulgaria",
  "Information about employer, job role, and workplace",
  "Accommodation guidance before arrival",
  "Packing checklist and travel preparation support",
  "Basic orientation on Polish culture and rules",
  "24/7 support for any queries before departure",
];

const postArrivalServices = [
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
];

const whyChoose = [
  "Trusted and Verified Job Opportunities",
  "Strong Employer Network",
  "Fast and Transparent Process",
  "Visa and Documentation Assistance",
  "Pre-Arrival and Post-Arrival Services",
  "Opportunities for Unskilled and Skilled Workers",
  "Affordable and Reliable Services",
  "Dedicated Customer Support",
  "Your Gateway to a Career in Europe",
];

const requiredDocuments = [
  "Valid passport (scanned copy, all pages)",
  "CV/Bio-data with address",
  "Education certificate/diploma with apostille translated into Serbian",
];

const advantageIcons = [
  BriefcaseBusiness,
  TrendingUp,
  Clock3,
  Stethoscope,
  Wallet,
  BadgeCheck,
  Globe2,
  Sparkles,
];

const visaIcons = [
  Building2,
  Banknote,
  Clock3,
  HeartPulse,
  Wallet,
  MapPinned,
  TrendingUp,
  Sparkles,
];

const employmentBenefitsData = {
  title: "Advantages of Employment in Bulgaria",
  description:
    "Bulgaria continues to attract international workers because it combines practical career opportunities with a stable and affordable lifestyle.",
  items: advantages,
  icons: advantageIcons,
};

const whyApplyData = {
  title: "Why Apply for a Bulgaria Work Visa?",
  description:
    "For many international workers, Bulgaria offers a strong balance of hiring demand, legal employment pathways, and long-term growth potential.",
  items: visaReasons,
  icons: visaIcons,
};

const openRolesData = {
  title: "Top Unskilled Job Opportunities Now Open in Bulgaria",
  jobs: unskilledJobs,
  salaryAndEligibility,
};

const paymentChargePolicyData = {
  title: "Our Pricing",
  currencyLabel: "All Payments in Euros",
  totalCharge: "Total Charge: €2,900",
  installments: [
    {
      title: "Part 1: €700 (Prepayment to Start Processing)",
      description:
        "After receiving the initial payment, we will begin preparing all necessary supportive documents, including the work permit, to ensure a smooth application process.",
    },
    {
      title: "Part 2: €2200 (after visa issuance) ",
      description:
        "After your visa has been successfully issued, the final payment must be made within 7 days.",
    },
  ],
  note: "The flight ticket is provided by the employer at no additional cost to the candidate.",
  documentsTitle: "Documents Required for a Bulgaria Work Permit",
  requiredDocuments,
};

const whyChooseUsData = {
  title: "Why Choose EU Career Serwis?",
  items: whyChoose,
};

const processingGuideData = {
  title: "Bulgaria Work Permit & Visa: Information and Processing Time",
  description:
    "Before applying for a Bulgaria work permit and visa, it’s important to understand how the process works and how long each step may take. This overview helps you plan clearly and avoid unnecessary delays.",
  cards: [
    {
      title: "Bulgaria Work Permit Processing",
      icon: Building2,
      description:
        "Work permit applications in Bulgaria are handled by the Voivodeship Office (Urząd Wojewódzki) based on the employer’s location.",
      duration: "25 to 35 working days",
      points: [
        "The exact timeline can vary depending on the number of applications being processed and the internal workflow of the office.",
        "In some cases, approvals may be issued faster, but during peak periods or high-demand seasons, delays may occur.",
      ],
    },
    {
      title: "Bulgaria Work Visa Processing",
      icon: Users,
      description:
        "After the work permit is approved, the next step is to schedule an appointment at the Polish Embassy or a VFS center in your country. The visa timeline starts only after document submission at the appointment.",
      duration: "15 to 35 working days",
      points: [
        "Processing times can vary depending on document verification, biometric submissions, and embassy workload.",
        "Submitting complete and accurate documents helps avoid unnecessary delays.",
      ],
    },
  ],
};

const supportServicesData = {
  title: "Pre-Arrival and Post-Arrival Services",
  description:
    "EU Career Serwis supports workers throughout the full journey, from documentation and travel planning to settlement and workplace support in Bulgaria.",
  sections: [
    {
      title: "Pre-Arrival Services (Before You Travel)",
      icon: Plane,
      items: preArrivalServices,
    },
    {
      title: "Post-Arrival Services (After You Arrive)",
      icon: Landmark,
      items: postArrivalServices,
    },
  ],
};

export default function JobsInBulgaria() {
  return (
    <div className="bg-white">
      <section className="px-4 pb-5 pt-5 md:pb-9 md:pt-9">
        <TopTitleBar
          name="Bulgaria"
          imageUrl="https://ik.imagekit.io/eucareerserwis/Country%20Flag/flag/Flag_of_Bulgaria.svg"
        />
      </section>

      <EmploymentBenefits {...employmentBenefitsData} />

      <WhyApply {...whyApplyData} />

      <section className="bg-white px-4 py-5 md:py-10">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            dividerClassName="bg-[#fac800]"
            eyebrow="Work Permits"
            title="Types of Work Permits in Bulgaria for Non-EU Citizens"
          />
          <WorkPermit permitTypes={permitTypes} />
        </div>
      </section>

      <OpenRoles {...openRolesData} />

      <ProcessStep fees="€700" />

      <section className="bg-white px-4 py-5 md:py-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
            <PaymentChargePolicy {...paymentChargePolicyData} />
            <WhyChooseUs {...whyChooseUsData} />
          </div>
        </div>
      </section>

      <ProcessingGuide {...processingGuideData} />

      <SupportServices {...supportServicesData} />

      <section>
        <CompanyOverview />
      </section>

      <section>
        <RecentTestimonials />
      </section>
      <section>
        <CountryFooter />
      </section>
    </div>
  );
}
