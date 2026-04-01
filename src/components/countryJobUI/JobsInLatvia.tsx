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
  Languages,
  Plane,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Truck,
  Users,
  Wallet,
} from "lucide-react";
import TopTitleBar from "./TopTitleBar";
import CountryFooter from "./countryFooter";
import { RecentTestimonials } from "../sections/RecentTestimonials";
import WorkPermit from "./WorkPermit";

const visaReasons = [
  "More than 70,000 jobs are available in sectors such as construction, manufacturing, healthcare, and logistics.",
  "Typical yearly earnings range from €15,000 to €18,000 depending on the region and job sector.",
  "Standard working time is about 40 hours per week.",
  "Workers benefit from strong social security and healthcare systems aligned with EU standards.",
  "Latvia offers affordable living, a calm lifestyle, and friendly communities in cities like Riga, Daugavpils, and Liepaja.",
];

const advantages = [
  "Strong demand for workers in IT, transport, construction, and hospitality.",
  "Employment contracts are legally binding and support job security and fair pay.",
  "Living costs are lower than in many other EU countries.",
  "Workers get access to EU-standard healthcare, pensions, and social protection.",
  "Latvia offers rich culture and natural beauty including forests, lakes, and the Baltic coastline.",
];

const permitCategories = [
  {
    type: "Type A",
    description:
      "For employees working under a normal contract with a Latvian company.",
  },
  {
    type: "Type B",
    description:
      "For executives or specialists working for more than six months.",
  },
  {
    type: "Type C",
    description:
      "For employees transferred from abroad to Latvia within the same company.",
  },
  {
    type: "Type D",
    description: "For cross-border services or temporary assignments.",
  },
  {
    type: "Type S",
    description: "For seasonal jobs in agriculture, tourism, or hospitality.",
  },
];

const temporaryPermitDetails = [
  "Combines permission to live and work in Latvia.",
  "Usually issued for 1 to 3 years depending on the employment contract.",
  "Can be renewed and may lead to permanent residency after 5 years.",
  "Provides access to the EU Blue Card pathway.",
];

const requiredDocuments = [
  "CE-category driving licence or equivalent international licence.",
  "Certificate confirming that the licence is authentic and valid.",
  "Passport valid for at least one year beyond arrival.",
  "Digital tachograph card, which the employer may help arrange.",
  "Police Clearance Certificate showing no criminal history.",
  "Medical fitness certificate for professional driving.",
  "Certificates from a psychiatrist and narcologist confirming mental and physical health.",
];

const documentNotes = [
  "International licences must match CE category requirements.",
  "Licences issued before September 2009 require a short Code 95 course.",
  "Documents in foreign languages must be translated, notarized, and apostilled.",
  "Police certificates must confirm a clean record and remain valid.",
  "Medical documents must confirm fitness and no substance abuse.",
];

const workExperience = [
  "Basic heavy truck driving experience, ideally at least 1 year.",
  "Knowledge of safety procedures and transport regulations.",
  "Ability to perform vehicle inspections and maintenance checks.",
];

const languageRequirements = [
  "English is required for applicants from Asia, Africa, and Gulf countries.",
  "Latvian is the official language but is not always mandatory.",
  "Russian may be accepted for candidates from CIS countries.",
];

const ageRequirements = [
  "Up to 45 years for candidates without EU driving experience.",
  "Up to 55 years for candidates with EU driving experience.",
];

const preEmploymentNotes = [
  "Do not resign from your current job until final confirmation is received.",
  "The full process from documents to arrival may take around 2 to 3 months.",
  "Candidates must pass a practical driving test in Riga.",
];

const professionalQualities = [
  "Clean driving history without major violations.",
  "Knowledge of EU transport laws and compliance procedures.",
  "Strong punctuality and time management skills.",
  "Responsible and professional attitude toward work.",
  "Ability to adapt to different work conditions.",
];

const trainingProcess = [
  "Candidates complete Code 95 training that usually lasts 1 to 3 weeks depending on the licence.",
  "Training covers documents, tachograph use, and safety rules.",
  "A final test is required after training is completed.",
  "Employment contracts are open-ended with a 3-month probation period.",
  "Internship trips and evaluations take place during probation.",
];

const jobConditions = [
  "Routes cover multiple European countries.",
  "Initial assignments may include team driving.",
  "Typical work cycle is 3 to 4 months followed by leave.",
  "One week of leave is provided for every month worked.",
  "Maximum rest period is 60 days.",
];

const employerBenefits = [
  "Salaries are paid multiple times per month.",
  "Strict compliance with EU driving and rest regulations.",
  "Modern vehicles such as Volvo, Mercedes, Ford, and DAF newer models.",
  "Opportunities to work across different European regions.",
  "Participation in large logistics projects such as Amazon and TNT.",
  "Paid parking and vehicle servicing across the EU.",
  "24/7 support services.",
  "Accommodation is provided between trips.",
  "Ongoing training and professional development.",
];

const salaryOverview = [
  "Entry level: €1350–€1500 net monthly.",
  "Mid-level: €1600–€2100 net monthly.",
  "Experienced: €2100–€2600 net monthly.",
  "Top level: up to €3200 depending on routes and region.",
];

const bonusOpportunities = [
  "Fuel efficiency rewards.",
  "Team driving bonuses.",
  "Loyalty and experience incentives.",
  "Extra payments for loading and unloading.",
  "Training supervision bonuses.",
];

const packageCosts = [
  "First payment: €900 for initial processing and eligibility check.",
  "Second payment: €1000 after work permit approval.",
  "Final payment: €800 after visa approval.",
];

const whyChoose = [
  "Transparent pricing with no hidden costs.",
  "Complete support from documentation through relocation.",
  "Professional guidance from experienced agents.",
  "Secure document delivery through courier services.",
];

const applicationProcess = [
  "Sign the agreement to begin the process.",
  "Check eligibility based on skills and nationality.",
  "Submit required documents.",
  "Make the initial payment.",
  "Receive a dedicated agent for assistance.",
  "Employer matching begins.",
  "Work permit application is submitted.",
  "Receive regular updates.",
  "Pay the second installment after approval.",
  "Documents are delivered by courier.",
  "Schedule the visa appointment.",
  "Submit the visa application.",
  "Attend interview preparation sessions.",
  "Receive the visa decision.",
  "Pay the final installment.",
  "Prepare for travel and departure.",
];

const postArrivalSupport = [
  "Airport assistance on arrival in Latvia.",
  "Free one-day accommodation.",
  "City orientation tour in Riga.",
  "Help with housing, SIM card, and bank account setup.",
  "Assistance with getting a tax identification number.",
  "Guidance on local culture and lifestyle.",
  "Optional Latvian language training.",
];

const livingInLatvia = [
  "Earn in euros in a stable and growing economy.",
  "Access affordable education and internationally recognised universities.",
  "Benefit from modern healthcare services.",
  "Enjoy a peaceful environment with natural beauty.",
  "Family reunification options are available.",
  "Visa-free travel is possible within the Schengen Zone.",
];

const salaryStructure = [
  "Average monthly salary is around €1,300 for a 40-hour workweek.",
  "Reduced hours of 36 per week usually pay around €1,170 monthly.",
  "Annual salary is approximately €14,000–€15,600.",
  "Salaries vary depending on the job, region, and experience.",
];

const keyNotes = [
  "Salaries mentioned are gross before tax deductions.",
  "Net income depends on taxes and social contributions.",
  "Pay rates differ by location and job role.",
];

const cardMotion = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 as const },
  transition: { duration: 0.4, ease: "easeOut" as const },
};

const reasonIcons = [BriefcaseBusiness, Banknote, Clock3, HeartPulse, Home];

const advantageIcons = [TrendingUp, ShieldCheck, Wallet, HeartPulse, Sparkles];

function SectionTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <motion.div
      {...cardMotion}
      className="mx-auto mb-10 max-w-4xl text-center md:mb-12"
    >
      <span className="inline-flex rounded-full bg-gray-100 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.18em] text-[#fac800]">
        {eyebrow}
      </span>
      <h2
        className={`mt-5 text-2xl font-bold leading-tight text-gray-700 md:text-2xl lg:text-3xl ${fontPoppins.className}`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mx-auto mt-4 max-w-3xl text-base leading-8 text-slate-600 md:text-lg ${fontInter.className}`}
        >
          {description}
        </p>
      )}
      <div className="mx-auto mt-5 h-1 w-24 rounded-full bg-amber-500"></div>
    </motion.div>
  );
}

function BulletList({
  items,
  className = "",
}: {
  items: string[];
  className?: string;
}) {
  return (
    <div className={`space-y-4 ${className}`}>
      {items.map((item) => (
        <div key={item} className="flex items-start gap-3">
          <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-[#fac800]" />
          <p
            className={`text-base leading-7 text-slate-600 ${fontInter.className}`}
          >
            {item}
          </p>
        </div>
      ))}
    </div>
  );
}

export default function JobsInLatvia() {
  return (
    <div className="bg-white">
      <section className="px-4 pb-5 pt-5 md:pb-9 md:pt-9">
        <TopTitleBar name="Latvia" />
      </section>
      <section className="bg-white px-4 py-5 md:py-10">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Why Latvia"
            title="Why Consider Applying for a Latvia Work Visa?"
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
            {visaReasons.map((item, index) => {
              const Icon = reasonIcons[index];
              return (
                <motion.div
                  key={item}
                  {...cardMotion}
                  whileHover={{ y: -4 }}
                  className="rounded-3xl border border-amber-100 bg-white p-6 shadow-sm"
                >
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-[#fac800]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <p
                    className={`text-base leading-7 text-slate-700 ${fontInter.className}`}
                  >
                    {item}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-5 md:py-10">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Advantages"
            title="Advantages of Working in Latvia"
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
            {advantages.map((item, index) => {
              const Icon = advantageIcons[index];
              return (
                <motion.div
                  key={item}
                  {...cardMotion}
                  whileHover={{ y: -4 }}
                  className="rounded-3xl border border-slate-200 bg-stone-50 p-6 shadow-sm"
                >
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-[#fac800]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <p
                    className={`text-base leading-7 text-slate-700 ${fontInter.className}`}
                  >
                    {item}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-5 md:py-10">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Permit Categories"
            title="Categories of Latvia Work Permits for Non-EU Nationals"
          />
          <WorkPermit permitTypes={permitCategories} />
        </div>
      </section>

      <section className="bg-white px-4 py-5 md:py-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
            <motion.div
              {...cardMotion}
              whileHover={{ y: -4 }}
              className="rounded-[32px] border border-amber-100 bg-[linear-gradient(135deg,#fffaf0_0%,#ffffff_100%)] p-6 shadow-sm md:p-8"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-[#fac800]">
                <BadgeCheck className="h-6 w-6" />
              </div>
              <h3
                className={`text-2xl font-bold text-gray-700 ${fontPoppins.className}`}
              >
                Temporary Residence and Work Permit
              </h3>
              <BulletList items={temporaryPermitDetails} className="mt-6" />
            </motion.div>

            <motion.div
              {...cardMotion}
              whileHover={{ y: -4 }}
              className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm md:p-8"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-[#fac800]">
                <FileText className="h-6 w-6" />
              </div>
              <h3
                className={`text-2xl font-bold text-gray-700 ${fontPoppins.className}`}
              >
                Required Documents Especially for Drivers
              </h3>
              <BulletList items={requiredDocuments} className="mt-6" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-5 md:py-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 xl:grid-cols-2">
            <motion.div
              {...cardMotion}
              whileHover={{ y: -4 }}
              className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm md:p-8"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-[#fac800]">
                <FileCheck2 className="h-6 w-6" />
              </div>
              <h3
                className={`text-2xl font-bold text-gray-700 ${fontPoppins.className}`}
              >
                Additional Document Notes
              </h3>
              <BulletList items={documentNotes} className="mt-6" />
            </motion.div>

            <motion.div
              {...cardMotion}
              whileHover={{ y: -4 }}
              className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm md:p-8"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-[#fac800]">
                <Truck className="h-6 w-6" />
              </div>
              <h3
                className={`text-2xl font-bold text-gray-700 ${fontPoppins.className}`}
              >
                Work Experience and Skills
              </h3>
              <BulletList items={workExperience} className="mt-6" />
            </motion.div>

            <motion.div
              {...cardMotion}
              whileHover={{ y: -4 }}
              className="rounded-[32px] border border-slate-200 bg-stone-50 p-6 shadow-sm md:p-8"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-[#fac800]">
                <Languages className="h-6 w-6" />
              </div>
              <h3
                className={`text-2xl font-bold text-gray-700 ${fontPoppins.className}`}
              >
                Language Requirements
              </h3>
              <BulletList items={languageRequirements} className="mt-6" />
            </motion.div>

            <motion.div
              {...cardMotion}
              whileHover={{ y: -4 }}
              className="rounded-[32px] border border-amber-100 bg-[linear-gradient(135deg,#fffaf0_0%,#ffffff_100%)] p-6 shadow-sm md:p-8"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-[#fac800]">
                <Users className="h-6 w-6" />
              </div>
              <h3
                className={`text-2xl font-bold text-gray-700 ${fontPoppins.className}`}
              >
                Age Requirements
              </h3>
              <BulletList items={ageRequirements} className="mt-6" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-5 md:py-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 xl:grid-cols-3">
            <motion.div
              {...cardMotion}
              whileHover={{ y: -4 }}
              className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm md:p-8"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-[#fac800]">
                <BadgeCheck className="h-6 w-6" />
              </div>
              <h3
                className={`text-2xl font-bold text-gray-700 ${fontPoppins.className}`}
              >
                Important Pre-Employment Notes
              </h3>
              <BulletList items={preEmploymentNotes} className="mt-6" />
            </motion.div>

            <motion.div
              {...cardMotion}
              whileHover={{ y: -4 }}
              className="rounded-[32px] border border-slate-200 bg-stone-50 p-6 shadow-sm md:p-8"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-[#fac800]">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3
                className={`text-2xl font-bold text-gray-700 ${fontPoppins.className}`}
              >
                Professional Qualities Expected
              </h3>
              <BulletList items={professionalQualities} className="mt-6" />
            </motion.div>

            <motion.div
              {...cardMotion}
              whileHover={{ y: -4 }}
              className="rounded-[32px] border border-amber-100 bg-[linear-gradient(135deg,#fffaf0_0%,#ffffff_100%)] p-6 shadow-sm md:p-8"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-[#fac800]">
                <ClipboardList className="h-6 w-6" />
              </div>
              <h3
                className={`text-2xl font-bold text-gray-700 ${fontPoppins.className}`}
              >
                Training and Employment Process
              </h3>
              <BulletList items={trainingProcess} className="mt-6" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-5 md:py-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
            <motion.div
              {...cardMotion}
              whileHover={{ y: -4 }}
              className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm md:p-8"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-[#fac800]">
                <Truck className="h-6 w-6" />
              </div>
              <h3
                className={`text-2xl font-bold text-gray-700 ${fontPoppins.className}`}
              >
                Job Conditions for Drivers
              </h3>
              <BulletList items={jobConditions} className="mt-6" />
            </motion.div>

            <motion.div
              {...cardMotion}
              whileHover={{ y: -4 }}
              className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm md:p-8"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-[#fac800]">
                <Building2 className="h-6 w-6" />
              </div>
              <h3
                className={`text-2xl font-bold text-gray-700 ${fontPoppins.className}`}
              >
                Employer Benefits
              </h3>
              <BulletList items={employerBenefits} className="mt-6" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-5 md:py-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 xl:grid-cols-3">
            <motion.div
              {...cardMotion}
              whileHover={{ y: -4 }}
              className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm md:p-8"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-[#fac800]">
                <Banknote className="h-6 w-6" />
              </div>
              <h3
                className={`text-2xl font-bold text-gray-700 ${fontPoppins.className}`}
              >
                Salary Overview
              </h3>
              <BulletList items={salaryOverview} className="mt-6" />
            </motion.div>

            <motion.div
              {...cardMotion}
              whileHover={{ y: -4 }}
              className="rounded-[32px] border border-slate-200 bg-stone-50 p-6 shadow-sm md:p-8"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-[#fac800]">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3
                className={`text-2xl font-bold text-gray-700 ${fontPoppins.className}`}
              >
                Bonus Opportunities
              </h3>
              <BulletList items={bonusOpportunities} className="mt-6" />
            </motion.div>

            <motion.div
              {...cardMotion}
              whileHover={{ y: -4 }}
              className="rounded-[32px] border border-amber-100 bg-[linear-gradient(135deg,#fffaf0_0%,#ffffff_100%)] p-6 shadow-sm md:p-8"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-[#fac800]">
                <Wallet className="h-6 w-6" />
              </div>
              <h3
                className={`text-2xl font-bold text-gray-700 ${fontPoppins.className}`}
              >
                Visa and Work Permit Package Costs
              </h3>
              <BulletList items={packageCosts} className="mt-6" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-5 md:py-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
            <motion.div
              {...cardMotion}
              whileHover={{ y: -4 }}
              className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm md:p-8"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-[#fac800]">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3
                className={`text-2xl font-bold text-gray-700 ${fontPoppins.className}`}
              >
                Why Choose This Service?
              </h3>
              <BulletList items={whyChoose} className="mt-6" />
            </motion.div>

            <motion.div
              {...cardMotion}
              whileHover={{ y: -4 }}
              className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm md:p-8"
            >
              <SectionTitle
                eyebrow="Application"
                title="Application Process Step by Step"
              />
              <div className="-mt-2 space-y-4">
                {applicationProcess.map((step) => (
                  <div key={step} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-[#fac800]" />
                    <p
                      className={`text-base leading-8 text-slate-600 ${fontInter.className}`}
                    >
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-5 md:py-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 xl:grid-cols-2">
            <motion.div
              {...cardMotion}
              whileHover={{ y: -4 }}
              className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm md:p-8"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-[#fac800]">
                <Plane className="h-6 w-6" />
              </div>
              <h3
                className={`text-2xl font-bold text-gray-700 ${fontPoppins.className}`}
              >
                Post-Arrival Support
              </h3>
              <BulletList items={postArrivalSupport} className="mt-6" />
            </motion.div>

            <motion.div
              {...cardMotion}
              whileHover={{ y: -4 }}
              className="rounded-[32px] border border-slate-200 bg-stone-50 p-6 shadow-sm md:p-8"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-[#fac800]">
                <Globe2 className="h-6 w-6" />
              </div>
              <h3
                className={`text-2xl font-bold text-gray-700 ${fontPoppins.className}`}
              >
                Living in Latvia
              </h3>
              <BulletList items={livingInLatvia} className="mt-6" />
            </motion.div>

            <motion.div
              {...cardMotion}
              whileHover={{ y: -4 }}
              className="rounded-[32px] border border-amber-100 bg-[linear-gradient(135deg,#fffaf0_0%,#ffffff_100%)] p-6 shadow-sm md:p-8"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-[#fac800]">
                <Banknote className="h-6 w-6" />
              </div>
              <h3
                className={`text-2xl font-bold text-gray-700 ${fontPoppins.className}`}
              >
                Salary Structure
              </h3>
              <BulletList items={salaryStructure} className="mt-6" />
            </motion.div>

            <motion.div
              {...cardMotion}
              whileHover={{ y: -4 }}
              className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm md:p-8"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-[#fac800]">
                <BadgeCheck className="h-6 w-6" />
              </div>
              <h3
                className={`text-2xl font-bold text-gray-700 ${fontPoppins.className}`}
              >
                Key Notes
              </h3>
              <BulletList items={keyNotes} className="mt-6" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-5 md:py-10">
        <div className="mx-auto max-w-5xl">
          <motion.div
            {...cardMotion}
            whileHover={{ y: -4 }}
            className="rounded-[32px] border border-amber-100 bg-[linear-gradient(135deg,#fffaf0_0%,#ffffff_100%)] p-8 text-center shadow-sm md:p-10"
          >
            <span className="inline-flex rounded-full bg-gray-100 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.18em] text-[#fac800]">
              Final Summary
            </span>
            <p
              className={`mt-6 text-lg leading-8 text-slate-700 md:text-xl ${fontInter.className}`}
            >
              Latvia is a strong option for foreign workers because it combines
              a growing job market, EU-standard benefits, and relatively
              affordable living. With opportunities across several industries
              and a clear route toward long-term residency, it offers both
              career growth and quality of life.
            </p>
          </motion.div>
        </div>
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
