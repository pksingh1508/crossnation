"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { fontInter, fontPoppins } from "@/fonts";
import {
  BadgeCheck,
  Banknote,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ClipboardList,
  Clock3,
  FileCheck2,
  FileText,
  Globe2,
  Home,
  Hotel,
  Plane,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import TopTitleBar from "./TopTitleBar";
import CountryFooter from "./countryFooter";
import { RecentTestimonials } from "../sections/RecentTestimonials";
import WorkPermit from "./WorkPermit";
import CompanyOverview from "./CompanyOverview";
import {
  BulletList,
  FeatureCardGrid,
  InfoCard,
  SectionTitle,
  StepList,
  cardMotion,
} from "./CountryJobShared";

const visaReasons = [
  "Bulgaria is one of the more affordable countries in the EU, which makes saving easier.",
  "Thousands of jobs are available in hospitality, construction, agriculture, and logistics.",
  "Monthly salaries usually range from €600 to €1,200 depending on the role and experience.",
  "The labour market is stable and demand for international workers is increasing.",
  "Standard schedules are usually 40 hours across five days, with regulated overtime.",
  "Employees receive around 20 days of annual leave plus public holidays.",
  "Working in Bulgaria can support longer-term career opportunities within the EU.",
  "Work permit and visa processing usually takes around 2 to 3 months.",
];

const advantages = [
  "Employees work in an EU-regulated environment with legal protections and safer workplaces.",
  "There is strong demand in hospitality for chefs, hotel staff, cleaners, and maintenance workers.",
  "Official employment contracts include social security and tax contributions.",
  "Workers gain international exposure by working in multicultural teams and building EU experience.",
  "Employers often provide official invitation letters and legal visa support.",
  "Long-term work can create a path toward residence permits.",
];

const permitOptions = [
  {
    type: "Standard Work Permit",
    description:
      "Issued for up to one year with renewal options based on a confirmed job offer.",
  },
  {
    type: "Seasonal Permit",
    description:
      "For short-term jobs of up to 90 days, mainly in tourism and agriculture.",
  },
  {
    type: "EU Blue Card",
    description:
      "For highly skilled professionals earning well above the national average.",
  },
  {
    type: "Intra-Company Transfer Permit",
    description: "For employees moving within multinational organisations.",
  },
  {
    type: "Freelance / Business Visa",
    description: "For self-employed applicants or investors.",
  },
  {
    type: "Temporary Residence Permit",
    description:
      "Required together with a work permit for legal stay in Bulgaria.",
  },
];

const popularRoles = [
  "Massage Therapist – Around €800/month with experience in therapeutic or relaxation techniques.",
  "Truck Mechanic – Around €750/month with at least 3 years of experience.",
  "Heavy Vehicle Driver (C+E) – Up to €1,200/month with 5+ years of experience and licence.",
  "Furniture Maker – Around €750/month with practical experience.",
  "Welder – Around €750/month with relevant technical skills.",
  "Blaster / Metal Worker – Around €700/month with prior experience.",
  "Butcher – Around €700/month with meat processing experience.",
  "Florist / Flower Arranger – Around €700/month with creative floral design experience preferred.",
  "Insulation Worker – Around €750/month with construction experience.",
  "Plumber / Electrician – Around €750/month with technical experience and skills.",
];

const roleNotes = [
  "Many employers provide accommodation and food vouchers.",
  "Salaries may vary by city and are often higher in Sofia or Varna.",
  "Overtime and night shifts may include extra pay.",
];

const eligibleRegions = [
  "Africa: Egypt, Morocco, Tunisia, South Africa, and others.",
  "Central Asia: Kazakhstan, Uzbekistan, Kyrgyzstan, and others.",
  "Middle East: UAE, Saudi Arabia, Qatar, and others.",
  "Asia: India, Nepal, Bangladesh, Vietnam, Indonesia, and others.",
  "Americas: Brazil, Mexico, Argentina, Colombia, and others.",
];

const pricingPlan = [
  "Initial payment: €1000 for eligibility check, documentation, and job matching.",
  "After work permit approval: €1200.",
  "After visa approval: €1200.",
];

const whyChoose = [
  "Clear and transparent pricing with no hidden charges.",
  "Complete assistance from application through settlement.",
  "Professional support from experienced consultants.",
  "A fully legal and compliant immigration process.",
];

const initialRequirements = [
  "Valid passport, preferably with at least 3 years validity.",
  "Passport copy submitted immediately after selection.",
];

const importantConditions = [
  "All original documents must be sent to Bulgaria within 20 days.",
  "Delays can lead to replacement of the candidate.",
];

const keyDocuments = [
  "Police Clearance Certificate for overseas employment.",
  "Police certificate must include apostille and official verification.",
  "Police certificate must remain valid after arrival.",
  "Educational certificates are required for some roles and are mandatory for drivers.",
  "Educational documents must be notarised and apostilled.",
];

const processingInfo = [
  "Documents are translated and legalised in Bulgaria.",
  "Processing usually takes between 1 and 3 months.",
  "Preferred applicant age is below 42 years.",
];

const processSteps = [
  "Sign the agreement and start the application with the €1000 payment.",
  "Complete the eligibility assessment.",
  "Submit and verify documents.",
  "Start employer matching.",
  "Submit the work permit application.",
  "Receive regular updates on the application.",
  "Make the second payment of €1200 after approval.",
  "Receive documents by courier dispatch.",
  "Book the visa appointment.",
  "Get interview preparation and support.",
  "Make the final payment of €1200 before travel.",
];

const postArrivalServices = [
  "Airport pickup and initial support.",
  "One-day temporary accommodation.",
  "Help with housing arrangements.",
  "SIM card setup.",
  "Support for opening a bank account.",
  "Tax ID registration.",
  "Cultural guidance and settlement support.",
  "Full relocation support.",
  "Start work with the employer.",
];

const accommodationDetails = [
  "Shared rooms with 2 to 4 occupants.",
  "Furnished spaces with shared kitchen and bathroom.",
  "Housing depends on availability.",
  "Not suitable for families or pets.",
];

const paymentSummary = [
  "€1000 for the initial stage.",
  "€1200 after work permit approval.",
  "€1200 before travel after visa approval.",
];

const reasonIcons = [
  Wallet,
  BriefcaseBusiness,
  Banknote,
  TrendingUp,
  Clock3,
  BadgeCheck,
  Globe2,
  Sparkles,
];

const advantageIcons = [
  ShieldCheck,
  Building2,
  FileCheck2,
  Users,
  FileText,
  Home,
];

export default function JobsInBulgaria() {
  return (
    <div className="bg-white">
      <section className="px-4 pb-5 pt-5 md:pb-9 md:pt-9">
        <TopTitleBar
          name="Bulgaria"
          imageUrl="https://ik.imagekit.io/eucareerserwis/Country%20Flag/flag/Flag_of_Bulgaria.svg"
        />
      </section>
      <section className="bg-white px-4 py-5 md:py-10">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Why Bulgaria"
            title="Why Consider a Bulgaria Work Visa?"
          />
          <FeatureCardGrid
            items={visaReasons}
            icons={reasonIcons}
            columnsClassName="md:grid-cols-2 xl:grid-cols-4"
          />
        </div>
      </section>

      <section className="bg-white px-4 py-5 md:py-10">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Advantages"
            title="Advantages of Working in Bulgaria"
          />
          <FeatureCardGrid
            items={advantages}
            icons={advantageIcons}
            columnsClassName="md:grid-cols-2 xl:grid-cols-3"
            tone="muted"
          />
        </div>
      </section>

      <section className="bg-white px-4 py-5 md:py-10">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Permit Options"
            title="Work Permit Options for Non-EU Applicants"
          />
          <WorkPermit permitTypes={permitOptions} />
        </div>
      </section>

      <section className="bg-white px-4 py-5 md:py-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
            <InfoCard
              icon={BriefcaseBusiness}
              title="Popular Job Roles in Bulgaria"
              items={popularRoles}
            >
              <div className="mt-8 rounded-2xl bg-amber-50 p-4">
                <BulletList items={roleNotes} />
              </div>
            </InfoCard>

            <InfoCard
              icon={Globe2}
              title="Eligible Regions for Recruitment"
              items={eligibleRegions}
              tone="accent"
            />
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-5 md:py-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 xl:grid-cols-3">
            <InfoCard
              icon={Wallet}
              title="Pricing Plan"
              items={pricingPlan}
              tone="accent"
            />
            <InfoCard
              icon={ShieldCheck}
              title="Why Consider EU Career Serwis?"
              items={whyChoose}
            />
            <InfoCard
              icon={FileText}
              title="Initial Requirements"
              items={initialRequirements}
              tone="muted"
            />
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-5 md:py-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 xl:grid-cols-3">
            <InfoCard
              icon={BadgeCheck}
              title="Important Conditions"
              items={importantConditions}
            />
            <InfoCard
              icon={FileCheck2}
              title="Key Documents"
              items={keyDocuments}
            />
            <InfoCard
              icon={Clock3}
              title="Work Permit Processing"
              items={processingInfo}
              tone="accent"
            />
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-5 md:py-10">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Application Process"
            title="Bulgaria Work Permit Process"
          />
          <motion.div
            {...cardMotion}
            className="mx-auto max-w-5xl rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm md:p-8"
          >
            <StepList items={processSteps} />
          </motion.div>
        </div>
      </section>

      <section className="bg-white px-4 py-5 md:py-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 xl:grid-cols-3">
            <InfoCard
              icon={Plane}
              title="Post-Arrival Services"
              items={postArrivalServices}
            />
            <InfoCard
              icon={Home}
              title="Accommodation Details"
              items={accommodationDetails}
              tone="muted"
            />
            <InfoCard
              icon={Banknote}
              title="Payment Summary"
              items={paymentSummary}
              tone="accent"
            />
          </div>
        </div>
      </section>
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
