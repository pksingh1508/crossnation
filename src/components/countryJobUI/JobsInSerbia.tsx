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
  HeartPulse,
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
  FeatureCardGrid,
  InfoCard,
  SectionTitle,
  StepList,
  cardMotion,
} from "./CountryJobShared";

const visaReasons = [
  "Serbia offers more than 50,000 employment opportunities in tourism, hospitality, construction, IT, and healthcare.",
  "Typical yearly earnings usually range from €20,000 to €25,000.",
  "Standard working hours are normally around 38 to 40 hours per week.",
  "Workers benefit from a reliable healthcare system and social security coverage.",
  "The country offers a Mediterranean climate, a secure environment, and a more cost-effective lifestyle in cities such as Nicosia, Limassol, and Larnaca.",
];

const advantages = [
  "There are over 50,000 jobs in tourism, construction, shipping, IT, and healthcare.",
  "Monthly salaries usually range from €1,600 to €2,100 depending on skills and the role.",
  "Employees usually work 38 to 40 hours per week and receive paid leave and public holidays.",
  "Workers can access both public and private healthcare through social security contributions.",
  "The cost of living is lower than in many EU countries, helping with work-life balance.",
  "English is widely spoken, which makes adjustment easier for international workers.",
];

const permitCategories = [
  {
    type: "General Employment Permit",
    description:
      "For foreign nationals employed by Cypriot companies under a formal agreement.",
  },
  {
    type: "Skilled Worker Permit",
    description:
      "For professionals in sectors such as IT, finance, engineering, and healthcare.",
  },
  {
    type: "Seasonal Work Permit",
    description: "For temporary jobs in tourism, agriculture, and hospitality.",
  },
  {
    type: "Intra-Company Transfer Permit",
    description:
      "For employees moved within multinational companies operating in Serbia.",
  },
  {
    type: "Domestic Worker Permit",
    description:
      "For household and caregiving roles, usually with annual renewal options.",
  },
];

const temporaryPermitDetails = [
  "Allows a person to live and work in Serbia at the same time.",
  "Usually valid for one year and renewable if employment continues.",
  "Work permits are tied to a specific employer.",
  "Permits are issued by the Civil Registry and Migration Department based on the job type and employer authorisation.",
];

const employmentConditions = [
  "Applicants must be between 18 and 50 years old.",
  "Base monthly salary starts at around €600 net.",
  "Salary increases depend on individual performance.",
  "Extra benefits or allowances may be provided based on performance.",
  "Employment contracts are usually valid for one year, with possible extension.",
  "Accommodation is usually provided by the employer.",
  "Food allowances are not included.",
  "Insurance premiums are paid by the employer.",
  "Annual medical check-ups are paid by the employer.",
  "Travel expenses from India to Serbia are paid by the employee.",
  "Return travel costs are paid by the employee after contract completion or early termination.",
  "Daily working hours are 8 to 10 hours, six days a week.",
  "Overtime is paid according to Serbia labour regulations.",
  "Employers handle salary taxes and levies.",
  "Compensation in case of death is provided according to labour law.",
  "Employees are entitled to annual leave and public holidays as required by regulations.",
  "Transport between housing and the workplace is arranged and paid by the employer.",
  "Repatriation costs for terminated employees are paid by the employee.",
  "Employers pay repatriation costs for sick or injured workers.",
  "In case of death, repatriation follows Serbia labour law.",
  "Safety equipment and protective clothing are provided by the employer.",
  "A one-month notice period applies to termination from either side.",
  "All work takes place within Serbia.",
];

const exampleRole = [
  "Kitchen Helper (Unskilled)",
  "Vacancies: 50",
  "Salary: €600 net per month",
];

const serviceCharges = [
  "Initial payment: €1000 for eligibility assessment, document processing, and job matching.",
  "Second payment: €1000 after work permit approval.",
  "Final payment: €1200 after visa approval and before travel.",
];

const whyChoose = [
  "Transparent pricing with no hidden costs.",
  "Complete support from documentation through arrival.",
  "Professional assistance at every stage.",
];

const requiredDocuments = [
  "Valid passport copies including personal details and travel history.",
  "Educational certificates or professional qualifications relevant to the role.",
  "Proof of previous work experience where applicable.",
  "English language proficiency at B1 level may be required for some roles.",
];

const eligibilityCriteria = [
  "Applicants from most non-EU countries are eligible.",
  "Individuals from India and Nepal aged 18 to 45 are currently not eligible to apply.",
];

const processSteps = [
  "Sign the agreement and begin the application process.",
  "Eligibility is checked based on nationality, age, and job category.",
  "Submit required documents such as passport and certificates.",
  "The candidate is matched with an approved employer.",
  "The work permit application is submitted to the authorities.",
  "Regular status updates are provided.",
  "The second payment of €1000 is made after permit approval.",
  "The approved permit is sent for visa processing.",
  "Attend the visa appointment at the embassy.",
  "Receive support for visa interview preparation.",
  "The final payment of €1200 is made after visa approval.",
  "Pre-departure guidance is provided.",
  "Travel arrangements are coordinated, excluding ticket costs.",
  "Arrival assistance is provided in Serbia.",
  "Support is given for accommodation setup.",
  "Assistance is provided for bank account and SIM card setup.",
  "Help is given for getting a tax identification number.",
  "Orientation is provided on local culture and work environment.",
  "Begin legal employment in Serbia.",
];

const salaryEstimates = [
  "Waiter / Cook: €800–€1,100",
  "Kitchen Helper / Dishwasher: €600–€800",
  "Bartender: €900–€1,200",
  "Hotel Cleaner: €700–€950",
  "Housekeeping Staff: €650–€900",
  "Construction Worker: €900–€1,300",
  "Gardener / Maintenance: €700–€1,000",
  "Caregiver: €650–€900",
  "Factory Worker: €800–€1,100",
  "Driver / Delivery Staff: €900–€1,200",
];

const importantNotes = [
  "Entry-level roles usually pay between €600 and €1,000 per month.",
  "The salaries listed are before tax and social security deductions.",
  "Net income depends on the applicable deductions.",
  "Additional earnings may be possible through overtime or night shifts.",
  "Pay can vary by location, with higher wages often in coastal areas such as Limassol and Larnaca.",
];

const accommodationDetails = [
  "Housing is usually shared between 2 and 4 workers.",
  "Rooms are furnished and include shared kitchen and bathroom facilities.",
  "Family members, partners, and pets are not allowed in employer-provided housing.",
];

const reasonIcons = [BriefcaseBusiness, Banknote, Clock3, HeartPulse, Sparkles];

const advantageIcons = [
  TrendingUp,
  Wallet,
  BadgeCheck,
  ShieldCheck,
  Home,
  Globe2,
];

export default function JobsInSerbia() {
  return (
    <div className="bg-white">
      <section className="px-4 pb-5 pt-5 md:pb-9 md:pt-9">
        <TopTitleBar
          name="Serbia"
          imageUrl="https://ik.imagekit.io/eucareerserwis/Country%20Flag/flag/Flag_of_Serbia.svg"
        />
      </section>
      <section className="bg-white px-4 py-5 md:py-10">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Why Serbia"
            title="Reasons to Choose a Serbia Work Visa"
          />
          <FeatureCardGrid
            items={visaReasons}
            icons={reasonIcons}
            columnsClassName="md:grid-cols-2 xl:grid-cols-5"
            layout="stacked"
          />
        </div>
      </section>

      <section className="bg-white px-4 py-5 md:py-10">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Advantages"
            title="Advantages of Working in Serbia"
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
            eyebrow="Permit Categories"
            title="Categories of Work Permits in Serbia for Non-EU Nationals"
          />
          <WorkPermit permitTypes={permitCategories} />
        </div>
      </section>

      <section className="bg-white px-4 py-5 md:py-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
            <InfoCard
              icon={BadgeCheck}
              title="Temporary Residence and Employment Permit"
              items={temporaryPermitDetails}
              tone="accent"
            />
            <InfoCard
              icon={ClipboardList}
              title="Employment Conditions in Serbia"
              items={employmentConditions}
            />
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-5 md:py-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 xl:grid-cols-3">
            <InfoCard
              icon={BriefcaseBusiness}
              title="Example Job Role"
              items={exampleRole}
            />
            <InfoCard
              icon={Wallet}
              title="Service Charges Breakdown"
              items={serviceCharges}
              tone="accent"
            />
            <InfoCard
              icon={ShieldCheck}
              title="Why Consider EU Career Serwis?"
              items={whyChoose}
              tone="muted"
            />
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-5 md:py-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 xl:grid-cols-2">
            <InfoCard
              icon={FileText}
              title="Documents Required for Serbia Work Permit"
              items={requiredDocuments}
            />
            <InfoCard
              icon={Users}
              title="Eligibility Criteria"
              items={eligibilityCriteria}
            />
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-5 md:py-10">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Application Process"
            title="Serbia Work Permit Process"
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
          <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
            <InfoCard
              icon={Banknote}
              title="Estimated Monthly Salaries in Serbia"
              items={salaryEstimates}
            />

            <div className="grid gap-6">
              <InfoCard
                icon={BadgeCheck}
                title="Important Notes"
                items={importantNotes}
                tone="muted"
              />
              <InfoCard
                icon={Hotel}
                title="Accommodation Details"
                items={accommodationDetails}
                tone="accent"
              />
            </div>
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
