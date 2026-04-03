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

const unskilledJobs = [
  "Warehouse worker",
  "Welder (MIG/TIG)",
  "General Construction Worker",
  "Bakery",
  "Food Factory Worker",
  "Forklift Operator",
  "Packaging & Sorting Worker",
  "Kitchen Helper / Dishwasher",
  "Hotel Cleaner / Housekeeper",
  "Laundry Staff (Hotels & Hospitals)",
  "Agricultural Worker (Seasonal)",
  "Plastic Molding Worker",
  "Parcel Sorter (Logistics)",
];

const salaryAndEligibility = [
  "Salary: PLN 30.50/hour (net)",
  "Working Hours: 40 hours/week (8-10 hours/day, 5 days/week)",
  "Eligibility: Male/Female, Ages 18-55",
  "English Proficiency: Basic level",
];

const preArrivalServices = [
  "Assistance with work visa application and documentation",
  "Job offer confirmation and employment contract support",
  "Guidance on required documents and legalization process",
  "Travel planning and flight booking assistance",
  "Pre-departure briefing about life and work in Poland",
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
  "Provide a scanned copy of the first page of your passport",
  "Submit an updated CV",
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
  title: "Advantages of Employment in Poland",
  description:
    "Poland continues to attract international workers because it combines practical career opportunities with a stable and affordable lifestyle.",
  items: advantages,
  icons: advantageIcons,
};

const whyApplyData = {
  title: "Why Apply for a Poland Work Visa?",
  description:
    "For many international workers, Poland offers a strong balance of hiring demand, legal employment pathways, and long-term growth potential.",
  items: visaReasons,
  icons: visaIcons,
};

const openRolesData = {
  title: "Top Unskilled Job Opportunities Now Open in Poland",
  jobs: unskilledJobs,
  salaryAndEligibility,
};

const paymentChargePolicyData = {
  title: "Our Pricing",
  currencyLabel: "All Payments in Euros",
  totalCharge: "Total Charge: €2,100",
  installments: [
    {
      title: "Part 1: €600 (Prepayment to Start Processing)",
      description:
        "After receiving the initial payment, we will begin preparing all necessary supportive documents, including the work permit, to ensure a smooth application process.",
    },
    {
      title: "Part 2: €700 (after work permit is issued)",
      description:
        "Once the work permit has been successfully issued, we will send the documents via DHL post. Our immigration team will then assist you in completing the visa application process efficiently.",
    },
    {
      title: "Part 3: €800 (after visa issuance)",
      description:
        "After your visa has been successfully issued, the final payment must be made within 7 days.",
    },
  ],
  note: "The flight ticket is provided by the employer at no additional cost to the candidate.",
  documentsTitle: "Documents Required for a Poland Work Permit",
  requiredDocuments,
};

const whyChooseUsData = {
  title: "Why Choose EU Career Serwis?",
  items: whyChoose,
};

const processingGuideData = {
  title: "Poland Work Permit & Visa: Information and Processing Time",
  description:
    "Before applying for a Poland work permit and visa, it’s important to understand how the process works and how long each step may take. This overview helps you plan clearly and avoid unnecessary delays.",
  cards: [
    {
      title: "Poland Work Permit Processing",
      icon: Building2,
      description:
        "Work permit applications in Poland are handled by the Ministry of Labour, Human Resource Development based on the employer’s location.",
      duration: "60 to 90 working days",
      points: [
        "The exact timeline can vary depending on the number of applications being processed and the internal workflow of the office.",
        "In some cases, approvals may be issued faster, but during peak periods or high-demand seasons, delays may occur.",
      ],
    },
    {
      title: "Poland Work Visa Processing",
      icon: Users,
      description:
        "We schedule an appointment when the work permit is approved. The visa timeline starts only after document submission at the appointment.",
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
    "EU Career Serwis supports workers throughout the full journey, from documentation and travel planning to settlement and workplace support in Poland.",
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

export default function JobsInPoland() {
  return (
    <div className="bg-white">
      <section className="px-4 pb-5 pt-5 md:pb-9 md:pt-9">
        <TopTitleBar
          name="Poland"
          imageUrl="https://ik.imagekit.io/eucareerserwis/Country%20Flag/flag/Flag_of_Poland.svg"
        />
      </section>

      <EmploymentBenefits {...employmentBenefitsData} />

      <WhyApply {...whyApplyData} />

      <OpenRoles {...openRolesData} />

      <ProcessStep fees="€600" />

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
