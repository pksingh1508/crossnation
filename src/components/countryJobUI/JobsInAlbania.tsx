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
  Wrench,
} from "lucide-react";
import TopTitleBar from "./TopTitleBar";
import CountryFooter from "./countryFooter";
import { RecentTestimonials } from "../sections/RecentTestimonials";
import WorkPermit from "./WorkPermit";

const visaReasons = [
  "A wide range of jobs is available in sectors like agriculture, energy, and textiles.",
  "There is less competition compared with many other countries when applying for work visas.",
  "A developing economy creates room for career growth.",
  "Work settings include scenic cities as well as peaceful rural areas.",
  "The visa application process is generally straightforward with fewer complications.",
  "Work experience in Albania can help open future opportunities connected to Europe.",
];

const advantages = [
  "The cost of living is low, especially for food and accommodation.",
  "Flexible schedules can support a healthier work-life balance.",
  "Support is available for people interested in starting businesses.",
  "The country offers strong natural beauty and UNESCO heritage sites.",
  "Communities are friendly and the cultural environment is welcoming.",
  "Workers can gain useful experience in a stable and growing market.",
];

const permitTypes = [
  {
    type: "Type A - Employment Permit",
    description: "For regular employees, seasonal workers, and students.",
  },
  {
    type: "Type B - Self-Employment Permit",
    description: "For investors and independent professionals.",
  },
  {
    type: "Type C - Special Permit",
    description: "For unique or exceptional employment situations.",
  },
  {
    type: "Type D - Permanent Permit",
    description: "For long-term and continuous work authorisation.",
  },
];

const technicalRoles = [
  "Light Vehicle Auto Electrician - €500–€700, male candidates preferred, includes 1 meal and accommodation.",
  "Light Vehicle Mechanic - €500–€700 with similar benefits.",
  "Heavy Truck Mechanic - €600–€800 with food and housing included.",
  "Mason (Construction Worker) - €500–€600 with basic benefits.",
  "Tile Installer - €500–€600 with accommodation support.",
  "Truck Driver (Damper/Cement Mixer) - €600–€800.",
  "Cement Pump Operator - €600–€800.",
  "Heavy Equipment Mechanic - €700–€900.",
  "Sand System Operator - €600–€800.",
  "General Welder - €600–€700.",
];

const hospitalityRoles = [
  "Beach Attendant - €500, open to males and females, includes 3 meals and shared accommodation.",
  "Waiter/Waitress - €600 with meals and shared housing.",
  "Assistant Waiter/Waitress - €500.",
  "Bartender - €700.",
  "Assistant Bartender - €500.",
  "Dishwasher - €500.",
  "Housekeeping Staff - €600.",
  "Sanitation Worker - €500.",
];

const employmentConditions = [
  "Working hours are normally 8 hours per day.",
  "Overtime is paid according to Albanian labour regulations.",
  "Employers usually provide at least one meal per working day.",
  "Shared accommodation is usually part of the job package.",
];

const pricingPlan = [
  "Total service cost: €3000.",
  "First installment: €1000 to begin the process and sign the agreement.",
  "Second installment: €2000 after E-visa approval.",
];

const whyChoose = [
  "Transparent pricing with no hidden charges.",
  "Full support from documentation through settlement after arrival.",
  "Professional guidance from experienced agents at every stage.",
];

const requiredDocuments = [
  "Valid passport with all necessary pages.",
  "Passport-size photograph (35x45 mm) matching visa guidelines.",
  "Educational qualifications and professional certificates relevant to the job.",
  "Proof of previous work experience if available.",
  "Some roles may require English at B1 level.",
  "A short video showing work experience such as construction, driving, or welding.",
  "A self-introduction video explaining skills and willingness to work abroad.",
];

const processSteps = [
  "Gather required documents such as passport, contract, qualifications, and accommodation proof.",
  "Register on the e-Albania online portal.",
  "Complete the application form and upload the documents.",
  "Pay the application fee online.",
  "Submit the application and keep confirmation records.",
  "Attend an interview if requested by the authorities.",
  "Wait for the decision through email or portal updates.",
  "After approval, receive the entry visa for further processing.",
  "Travel to Albania within the visa validity period.",
  "Register the residential address with local authorities.",
  "Collect the residence permit card.",
  "Begin legal work after all formalities are completed.",
];

const lifeInAlbania = [
  "Workers can earn income in Albanian Lek or Euros in a developing economy.",
  "Education and skill development programs are generally affordable.",
  "Basic healthcare services are available and standards are improving.",
  "Low living costs and scenic surroundings support a peaceful lifestyle.",
  "The country can suit families who want to settle and work.",
  "There is a mix of vibrant urban life and beautiful rural areas.",
  "Travel access to nearby European countries is relatively easy.",
];

const accommodationDetails = [
  "Rooms are shared between 2 and 4 people depending on availability.",
  "Basic furnished housing includes shared kitchen and bathroom.",
  "Housing is not available for family members or pets.",
];

const salaryOverview = [
  "Salaries vary by industry and role and are often calculated on a 36-hour workweek.",
  "Gross salary means earnings before tax and social contributions.",
  "Net income depends on deductions under Albanian regulations.",
  "Overtime and holiday work can provide extra income.",
  "Cities like Tirana may offer higher wages than other regions.",
];

const exampleSalaries = [
  "Cleaning Worker - €500 to €700.",
  "Car Wash Worker - €600 to €1000.",
  "Construction Worker - €600 to €1000.",
];

const cardMotion = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 as const },
  transition: { duration: 0.4, ease: "easeOut" as const },
};

const reasonIcons = [
  BriefcaseBusiness,
  ShieldCheck,
  TrendingUp,
  Home,
  BadgeCheck,
  Globe2,
];

const advantageIcons = [Wallet, Clock3, Building2, Sparkles, Users, BadgeCheck];

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
      <span className="inline-flex rounded-full bg-amber-100 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.18em] text-amber-500">
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
          <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-amber-500" />
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

export default function JobsInAlbania() {
  return (
    <div className="bg-white">
      <section className="px-4 pb-10 pt-12 md:pb-16 md:pt-16">
        <TopTitleBar name="Albania" />
      </section>
      <section className="bg-white px-4 py-12 md:py-16">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Why Albania"
            title="Why Choose an Albania Work Visa?"
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {visaReasons.map((item, index) => {
              const Icon = reasonIcons[index];
              return (
                <motion.div
                  key={item}
                  {...cardMotion}
                  whileHover={{ y: -4 }}
                  className="flex items-start gap-4 rounded-3xl border border-amber-100 bg-white p-6 shadow-sm"
                >
                  <div className="inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-500">
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

      <section className="bg-white px-4 py-12 md:py-16">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Advantages"
            title="Advantages of Working in Albania"
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {advantages.map((item, index) => {
              const Icon = advantageIcons[index];
              return (
                <motion.div
                  key={item}
                  {...cardMotion}
                  whileHover={{ y: -4 }}
                  className="flex items-start gap-4 rounded-3xl border border-slate-200 bg-stone-50 p-6 shadow-sm"
                >
                  <div className="inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-500">
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

      <section className="bg-white px-4 py-12 md:py-16">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Permit Types"
            title="Types of Work Permits in Albania for Non-EU Nationals"
          />
          <WorkPermit permitTypes={permitTypes} />
        </div>
      </section>

      <section className="bg-white px-4 py-12 md:py-16">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Job Opportunities"
            title="High-Demand Jobs and Industries in Albania"
          />
          <div className="grid gap-6 xl:grid-cols-2">
            <motion.div
              {...cardMotion}
              whileHover={{ y: -4 }}
              className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm md:p-8"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-500">
                <Wrench className="h-6 w-6" />
              </div>
              <h3
                className={`text-2xl font-bold text-gray-700 ${fontPoppins.className}`}
              >
                Technical and Construction Roles
              </h3>
              <BulletList items={technicalRoles} className="mt-6" />
            </motion.div>

            <motion.div
              {...cardMotion}
              whileHover={{ y: -4 }}
              className="rounded-[32px] border border-amber-100 bg-[linear-gradient(135deg,#fffaf0_0%,#ffffff_100%)] p-6 shadow-sm md:p-8"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-500">
                <Hotel className="h-6 w-6" />
              </div>
              <h3
                className={`text-2xl font-bold text-gray-700 ${fontPoppins.className}`}
              >
                Hospitality and Service Roles
              </h3>
              <BulletList items={hospitalityRoles} className="mt-6" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-12 md:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 xl:grid-cols-3">
            <motion.div
              {...cardMotion}
              whileHover={{ y: -4 }}
              className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm md:p-8"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-500">
                <Clock3 className="h-6 w-6" />
              </div>
              <h3
                className={`text-2xl font-bold text-gray-700 ${fontPoppins.className}`}
              >
                General Employment Conditions
              </h3>
              <BulletList items={employmentConditions} className="mt-6" />
            </motion.div>

            <motion.div
              {...cardMotion}
              whileHover={{ y: -4 }}
              className="rounded-[32px] border border-amber-100 bg-[linear-gradient(135deg,#fffaf0_0%,#ffffff_100%)] p-6 shadow-sm md:p-8"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-500">
                <Wallet className="h-6 w-6" />
              </div>
              <h3
                className={`text-2xl font-bold text-gray-700 ${fontPoppins.className}`}
              >
                Work Visa Packages for 2025
              </h3>
              <BulletList items={pricingPlan} className="mt-6" />
            </motion.div>

            <motion.div
              {...cardMotion}
              whileHover={{ y: -4 }}
              className="rounded-[32px] border border-slate-200 bg-stone-50 p-6 shadow-sm md:p-8"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-500">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3
                className={`text-2xl font-bold text-gray-700 ${fontPoppins.className}`}
              >
                Why Select This Service?
              </h3>
              <BulletList items={whyChoose} className="mt-6" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-12 md:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
            <motion.div
              {...cardMotion}
              whileHover={{ y: -4 }}
              className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm md:p-8"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-500">
                <FileText className="h-6 w-6" />
              </div>
              <h3
                className={`text-2xl font-bold text-gray-700 ${fontPoppins.className}`}
              >
                Documents Required for an Albania Work Permit
              </h3>
              <BulletList items={requiredDocuments} className="mt-6" />
            </motion.div>

            <motion.div
              {...cardMotion}
              whileHover={{ y: -4 }}
              className="rounded-[32px] border border-amber-100 bg-[linear-gradient(135deg,#fffaf0_0%,#ffffff_100%)] p-6 shadow-sm md:p-8"
            >
              <SectionTitle
                eyebrow="Application"
                title="Steps to Obtain an Albania E-Work Permit and D-Type Visa"
              />
              <div className="-mt-2 space-y-4">
                {processSteps.map((step) => (
                  <div key={step} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-amber-500" />
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

      <section className="bg-white px-4 py-12 md:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 xl:grid-cols-2">
            <motion.div
              {...cardMotion}
              whileHover={{ y: -4 }}
              className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm md:p-8"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-500">
                <Globe2 className="h-6 w-6" />
              </div>
              <h3
                className={`text-2xl font-bold text-gray-700 ${fontPoppins.className}`}
              >
                Life and Opportunities in Albania
              </h3>
              <BulletList items={lifeInAlbania} className="mt-6" />
            </motion.div>

            <motion.div
              {...cardMotion}
              whileHover={{ y: -4 }}
              className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm md:p-8"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-500">
                <Home className="h-6 w-6" />
              </div>
              <h3
                className={`text-2xl font-bold text-gray-700 ${fontPoppins.className}`}
              >
                Accommodation Details
              </h3>
              <BulletList items={accommodationDetails} className="mt-6" />
            </motion.div>

            <motion.div
              {...cardMotion}
              whileHover={{ y: -4 }}
              className="rounded-[32px] border border-amber-100 bg-[linear-gradient(135deg,#fffaf0_0%,#ffffff_100%)] p-6 shadow-sm md:p-8"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-500">
                <Banknote className="h-6 w-6" />
              </div>
              <h3
                className={`text-2xl font-bold text-gray-700 ${fontPoppins.className}`}
              >
                Salary Overview in Albania
              </h3>
              <BulletList items={salaryOverview} className="mt-6" />
              <div className="mt-8 rounded-2xl bg-stone-50 p-4">
                <h4
                  className={`text-lg font-semibold text-gray-700 ${fontPoppins.className}`}
                >
                  Example Monthly Salaries
                </h4>
                <BulletList items={exampleSalaries} className="mt-4" />
              </div>
            </motion.div>

            <motion.div
              {...cardMotion}
              whileHover={{ y: -4 }}
              className="rounded-[32px] border border-slate-200 bg-stone-50 p-6 shadow-sm md:p-8"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-500">
                <Plane className="h-6 w-6" />
              </div>
              <h3
                className={`text-2xl font-bold text-gray-700 ${fontPoppins.className}`}
              >
                Final Summary
              </h3>
              <p
                className={`text-base leading-8 text-slate-600 ${fontInter.className}`}
              >
                Albania is becoming a more attractive choice for foreign workers
                because of its growing economy, affordable lifestyle, and rising
                number of job opportunities. It offers a practical mix of work,
                culture, and natural beauty for people seeking international
                employment.
              </p>
            </motion.div>
          </div>
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
