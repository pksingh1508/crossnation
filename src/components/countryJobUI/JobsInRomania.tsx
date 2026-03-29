"use client";

import { motion } from "framer-motion";
import { fontInter, fontPoppins } from "@/fonts";
import {
  BadgeCheck,
  Banknote,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ClipboardList,
  FileCheck2,
  FileText,
  Globe2,
  Home,
  Languages,
  Plane,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";

const visaReasons = [
  "More than 60,000 jobs open every year across hospitality, agriculture, construction, logistics, IT, and healthcare.",
  "Annual salaries usually range from €8,000 to €18,000 depending on the role and industry.",
  "Romania has a relatively low unemployment rate of around 5.6%, which supports stable work opportunities.",
  "The standard work schedule is 40 hours per week, usually in 8-hour shifts.",
  "Employees receive 20 to 21 days of paid leave each year, plus public holidays.",
  "Wages have been growing steadily, with average salaries increasing by around 10% in recent years.",
];

const advantages = [
  "Lower living costs for housing, food, and daily needs compared with much of Western Europe.",
  "A growing economy with rising foreign investment.",
  "Job openings for both skilled and unskilled workers, especially in agriculture, construction, manufacturing, and IT.",
  "Worker protections such as employment contracts, paid leave, parental benefits, and social security coverage.",
  "Language flexibility, with jobs available in English, Romanian, or Hungarian depending on the region.",
  "A strategic location in Eastern Europe with easy access to nearby EU countries and neighbors.",
  "Standard working hours and family-focused benefits that support work-life balance.",
  "A long-term legal route that can lead to residency opportunities.",
];

const permitTypes = [
  {
    type: "Single Work Permit",
    description:
      "For regular employment based on a job offer. Usually valid for 1 year and renewable.",
  },
  {
    type: "EU Blue Card",
    description:
      "For highly skilled professionals. Usually valid for up to 2 years with renewal options.",
  },
  {
    type: "Seasonal Work Permit",
    description:
      "For temporary jobs in sectors such as agriculture and tourism, valid for up to 6 months.",
  },
  {
    type: "Cross-Border Permit",
    description:
      "For people living in neighboring countries who work in Romania.",
  },
  {
    type: "Secondment Permit",
    description:
      "For employees temporarily assigned to Romania by a foreign company.",
  },
  {
    type: "Business Permit",
    description:
      "For entrepreneurs or self-employed people operating in Romania.",
  },
  {
    type: "Working Holiday Visa",
    description:
      "A limited program for young people from selected countries that allows work and travel for up to 1 year.",
  },
];

const highDemandJobs = [
  {
    code: "CGR75",
    role: "Kitchen Equipment / AC Technician (Commercial Use)",
    salary: "$900/month",
    benefits: "Accommodation provided",
    selection: "CV + video + passport -> interview",
    eligible: "Candidates from Oman, Malaysia, Albania, Kuwait, and Qatar",
  },
  {
    code: "DAG95",
    role: "Leather Goods Worker (Shoes, Bags, Car Interiors)",
    salary: "€700/month for the first 3 months of training",
    benefits: "Accommodation + 1 meal per day + bonuses",
    selection: "CV + video + passport -> interview + PCC",
    eligible: "Candidates from Gulf countries, Singapore, and Malaysia",
  },
  {
    code: "TTR139",
    role: "Car Mechanic (Minimum 5 Years Experience)",
    salary: "€5.5/hour",
    benefits: "Meal tickets + accommodation",
    selection: "CV + video -> interview + PCC -> employer interview",
    eligible: "Candidates from Gulf countries, Singapore, and Malaysia",
  },
  {
    code: "FTC135",
    role: "Truck Mechanic (Electrical & Diagnostics)",
    salary: "€1000/month",
    benefits: "Accommodation + meal tickets",
    selection: "CV + video -> interview + PCC -> employer interview",
    eligible: "Candidates from Gulf countries, Singapore, and Malaysia",
  },
  {
    code: "RUI144",
    role: "Mechanics / Tow Truck Drivers / Tyre Repair Technicians",
    salary:
      "€1000–€1400 for mechanics, €800–€1200 for drivers",
    benefits: "Standard company benefits",
    selection: "Multi-stage interview process",
    eligible: "Candidates from Gulf countries, Singapore, and Malaysia",
  },
  {
    code: "VCN154 / AGT156 / BAC157 / STE161 / CLT164",
    role: "Heavy Truck Drivers",
    salary:
      "€400 during documentation, €1500 for the first 3 months, then €2000 after 3 months",
    benefits: "Accommodation provided",
    selection: "CV + video -> interview + PCC -> employer interview",
    eligible: "Candidates from Gulf countries, Singapore, and Malaysia",
  },
];

const eligibleCandidates = [
  "Applicants currently living in Gulf countries such as UAE, Qatar, Kuwait, Oman, Saudi Arabia, and Bahrain.",
  "Candidates currently residing in Singapore or Malaysia.",
];

const requiredDocuments = [
  "Updated CV",
  "Passport copy",
  "Valid residence permit from the current country",
  "Introduction video",
  "Police Clearance Certificate after the interview stage",
];

const pricingDetails = [
  "Initial payment: €1500 for eligibility check, documentation, and job matching.",
  "Second payment: €1500 after work permit approval.",
  "Final payment: €1500 after visa issuance and before travel.",
];

const whyChoose = [
  "Transparent pricing without hidden fees.",
  "Complete support from application through settlement.",
  "Experienced consultants guiding every step.",
  "Secure document delivery through DHL.",
];

const permitDocuments = [
  "Valid passport with at least 12 months validity.",
  "European-style CV.",
  "Proof of 2 to 5 years of work experience.",
  "Clear passport scan.",
  "Minimum basic or secondary education.",
  "Introduction video of 1 to 2 minutes in English.",
  "Work demonstration video.",
  "Police Clearance Certificate (PCC).",
];

const processSteps = [
  "Sign the service agreement.",
  "Complete the eligibility check.",
  "Submit the required documents.",
  "Pay the initial fee of €1500.",
  "Get a dedicated agent.",
  "Begin employer matching.",
  "Submit the work permit application.",
  "Receive progress updates.",
];

const afterPermitApproval = [
  "Pay the second fee of €1500.",
  "Receive the approved documents.",
  "Get visa guidance.",
  "Schedule the visa appointment, with optional extra service cost if needed.",
  "Submit the visa application.",
  "Prepare for the interview.",
  "Receive support in case of visa rejection.",
];

const finalSteps = [
  "Pay the final fee of €1500.",
  "Receive a pre-departure checklist.",
  "Get financial guidance.",
  "Arrange travel.",
  "Receive airport assistance.",
  "Get one day of free accommodation.",
];

const afterArrivalServices = [
  "Local orientation.",
  "Welcome support.",
  "Housing assistance.",
  "SIM card and bank account setup.",
];

const salaryOverview = [
  "40 hours per week: €700–€1200 per month and €8,400–€14,400 per year.",
  "36 hours per week: €600–€1050 per month and €7,200–€12,600 per year.",
];

const importantNotes = [
  "Salaries are approximate and depend on the job role, region, and experience.",
  "All figures are gross amounts before tax deductions.",
];

const accommodationDetails = [
  "Shared rooms with 2 to 4 people.",
  "Furnished accommodation with shared kitchen and bathroom.",
  "Not suitable for families or pets.",
];

const companyOverview = [
  "More than 500 successful applicants.",
  "Operating since 2009.",
  "Headquarters in Warsaw, Poland.",
  "Presence across multiple European countries.",
];

const cardMotion = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 as const },
  transition: { duration: 0.4, ease: "easeOut" as const },
};

const reasonIcons = [
  BriefcaseBusiness,
  Banknote,
  TrendingUp,
  BadgeCheck,
  Sparkles,
  Wallet,
];

const advantageIcons = [
  Wallet,
  TrendingUp,
  BriefcaseBusiness,
  ShieldCheck,
  Languages,
  Globe2,
  BadgeCheck,
  Building2,
];

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
      <span className="inline-flex rounded-full bg-amber-100 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.18em] text-amber-700">
        {eyebrow}
      </span>
      <h2
        className={`mt-5 text-3xl font-bold leading-tight text-slate-900 md:text-4xl lg:text-5xl ${fontPoppins.className}`}
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
          <p className={`text-base leading-7 text-slate-600 ${fontInter.className}`}>
            {item}
          </p>
        </div>
      ))}
    </div>
  );
}

export default function JobsInRomania() {
  return (
    <div className="bg-white">
      <section className="px-4 pb-10 pt-12 md:pb-16 md:pt-16">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="overflow-hidden rounded-[32px] border border-amber-100 bg-[linear-gradient(135deg,#fffaf0_0%,#fff7ed_40%,#f8fafc_100%)] p-8 shadow-sm md:p-12"
          >
            <span className="inline-flex rounded-full bg-amber-100 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.18em] text-amber-700">
              Jobs in Romania
            </span>
            <h1
              className={`mt-5 max-w-5xl text-4xl font-bold leading-tight text-slate-900 md:text-5xl lg:text-6xl ${fontPoppins.className}`}
            >
              Romania Work Visa, Job Matching, and Relocation Support for
              Foreign Workers
            </h1>
            <p
              className={`mt-6 max-w-4xl text-base leading-8 text-slate-600 md:text-lg ${fontInter.className}`}
            >
              A leading immigration company across Europe, helping workers
              understand job options, work permits, documents, pricing, and
              support before and after arrival in Romania.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-stone-50 px-4 py-12 md:py-16">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Why Romania"
            title="Why Choose a Romania Work Visa?"
            description="Romania continues to attract foreign workers because it offers broad job availability, practical living costs, and a stable legal route for employment."
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {visaReasons.map((item, index) => {
              const Icon = reasonIcons[index];
              return (
                <motion.div
                  key={item}
                  {...cardMotion}
                  whileHover={{ y: -4 }}
                  className="rounded-3xl border border-amber-100 bg-white p-6 shadow-sm"
                >
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-500">
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
            eyebrow="Work Benefits"
            title="Advantages of Working in Romania"
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {advantages.map((item, index) => {
              const Icon = advantageIcons[index];
              return (
                <motion.div
                  key={item}
                  {...cardMotion}
                  whileHover={{ y: -4 }}
                  className="rounded-3xl border border-slate-200 bg-stone-50 p-6 shadow-sm"
                >
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-500">
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

      <section className="bg-stone-50 px-4 py-12 md:py-16">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Work Permits"
            title="All Types of Romania Work Permits for Non-EU Citizens"
          />
          <div className="space-y-4">
            {permitTypes.map((permit) => (
              <motion.div
                key={permit.type}
                {...cardMotion}
                whileHover={{ y: -3 }}
                className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-[220px_1fr] md:items-center md:p-6"
              >
                <div className="inline-flex w-fit items-center gap-3 rounded-2xl bg-amber-100 px-4 py-3 text-amber-700">
                  <span
                    className={`text-lg font-bold md:text-xl ${fontPoppins.className}`}
                  >
                    {permit.type}
                  </span>
                </div>
                <p
                  className={`text-base leading-8 text-slate-600 ${fontInter.className}`}
                >
                  {permit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-12 md:py-16">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="High-Demand Roles"
            title="High-Demand Jobs in Romania"
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {highDemandJobs.map((job) => (
              <motion.div
                key={job.code}
                {...cardMotion}
                whileHover={{ y: -4 }}
                className="rounded-[28px] border border-amber-100 bg-[linear-gradient(180deg,#fffaf0_0%,#ffffff_100%)] p-6 shadow-sm"
              >
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-500">
                    <BriefcaseBusiness className="h-6 w-6" />
                  </div>
                  <span
                    className={`rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold tracking-[0.16em] text-slate-600 ${fontInter.className}`}
                  >
                    {job.code}
                  </span>
                </div>
                <h3
                  className={`text-xl font-bold text-slate-900 ${fontPoppins.className}`}
                >
                  {job.role}
                </h3>
                <div className="mt-5 space-y-3">
                  <p className={`text-sm leading-7 text-slate-600 md:text-base ${fontInter.className}`}>
                    <span className="font-semibold text-slate-800">Salary:</span>{" "}
                    {job.salary}
                  </p>
                  <p className={`text-sm leading-7 text-slate-600 md:text-base ${fontInter.className}`}>
                    <span className="font-semibold text-slate-800">Benefits:</span>{" "}
                    {job.benefits}
                  </p>
                  <p className={`text-sm leading-7 text-slate-600 md:text-base ${fontInter.className}`}>
                    <span className="font-semibold text-slate-800">Selection:</span>{" "}
                    {job.selection}
                  </p>
                  <p className={`text-sm leading-7 text-slate-600 md:text-base ${fontInter.className}`}>
                    <span className="font-semibold text-slate-800">Eligible:</span>{" "}
                    {job.eligible}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-stone-50 px-4 py-12 md:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 xl:grid-cols-3">
            <motion.div
              {...cardMotion}
              whileHover={{ y: -4 }}
              className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm md:p-8"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-500">
                <Users className="h-6 w-6" />
              </div>
              <h3 className={`text-2xl font-bold text-slate-900 ${fontPoppins.className}`}>
                Eligible Candidates
              </h3>
              <BulletList items={eligibleCandidates} className="mt-6" />
            </motion.div>

            <motion.div
              {...cardMotion}
              whileHover={{ y: -4 }}
              className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm md:p-8"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-500">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className={`text-2xl font-bold text-slate-900 ${fontPoppins.className}`}>
                Required Documents
              </h3>
              <BulletList items={requiredDocuments} className="mt-6" />
            </motion.div>

            <motion.div
              {...cardMotion}
              whileHover={{ y: -4 }}
              className="rounded-[32px] border border-amber-100 bg-[linear-gradient(135deg,#fffaf0_0%,#ffffff_100%)] p-6 shadow-sm md:p-8"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-500">
                <Wallet className="h-6 w-6" />
              </div>
              <h3 className={`text-2xl font-bold text-slate-900 ${fontPoppins.className}`}>
                Pricing Details
              </h3>
              <BulletList items={pricingDetails} className="mt-6" />
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
              className="rounded-[32px] border border-slate-200 bg-stone-50 p-6 shadow-sm md:p-8"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-500">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className={`text-2xl font-bold text-slate-900 ${fontPoppins.className}`}>
                Why Consider EU Career Serwis?
              </h3>
              <BulletList items={whyChoose} className="mt-6" />
            </motion.div>

            <motion.div
              {...cardMotion}
              whileHover={{ y: -4 }}
              className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm md:p-8"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-500">
                <FileCheck2 className="h-6 w-6" />
              </div>
              <h3 className={`text-2xl font-bold text-slate-900 ${fontPoppins.className}`}>
                Required Documents for Romania Work Permit
              </h3>
              <BulletList items={permitDocuments} className="mt-6" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-stone-50 px-4 py-12 md:py-16">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Process"
            title="Romania Work Permit Process"
          />
          <div className="grid gap-4 md:grid-cols-2">
            {processSteps.map((step, index) => (
              <motion.div
                key={step}
                {...cardMotion}
                whileHover={{ y: -2 }}
                className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-[72px_1fr] md:items-center md:p-6"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-lg font-bold text-amber-700">
                  {index + 1}
                </div>
                <p className={`text-base leading-8 text-slate-600 ${fontInter.className}`}>
                  {step}
                </p>
              </motion.div>
            ))}
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
                <ClipboardList className="h-6 w-6" />
              </div>
              <h3 className={`text-2xl font-bold text-slate-900 ${fontPoppins.className}`}>
                After Work Permit Approval
              </h3>
              <BulletList items={afterPermitApproval} className="mt-6" />
            </motion.div>

            <motion.div
              {...cardMotion}
              whileHover={{ y: -4 }}
              className="rounded-[32px] border border-amber-100 bg-[linear-gradient(135deg,#fffaf0_0%,#ffffff_100%)] p-6 shadow-sm md:p-8"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-500">
                <Plane className="h-6 w-6" />
              </div>
              <h3 className={`text-2xl font-bold text-slate-900 ${fontPoppins.className}`}>
                Final Steps
              </h3>
              <BulletList items={finalSteps} className="mt-6" />
            </motion.div>

            <motion.div
              {...cardMotion}
              whileHover={{ y: -4 }}
              className="rounded-[32px] border border-slate-200 bg-stone-50 p-6 shadow-sm md:p-8"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-500">
                <Home className="h-6 w-6" />
              </div>
              <h3 className={`text-2xl font-bold text-slate-900 ${fontPoppins.className}`}>
                After Arrival Services
              </h3>
              <BulletList items={afterArrivalServices} className="mt-6" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-stone-50 px-4 py-12 md:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 xl:grid-cols-2">
            <motion.div
              {...cardMotion}
              whileHover={{ y: -4 }}
              className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm md:p-8"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-500">
                <Banknote className="h-6 w-6" />
              </div>
              <h3 className={`text-2xl font-bold text-slate-900 ${fontPoppins.className}`}>
                Salary Overview in Romania
              </h3>
              <BulletList items={salaryOverview} className="mt-6" />
            </motion.div>

            <motion.div
              {...cardMotion}
              whileHover={{ y: -4 }}
              className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm md:p-8"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-500">
                <BadgeCheck className="h-6 w-6" />
              </div>
              <h3 className={`text-2xl font-bold text-slate-900 ${fontPoppins.className}`}>
                Important Notes
              </h3>
              <BulletList items={importantNotes} className="mt-6" />
            </motion.div>

            <motion.div
              {...cardMotion}
              whileHover={{ y: -4 }}
              className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm md:p-8"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-500">
                <Home className="h-6 w-6" />
              </div>
              <h3 className={`text-2xl font-bold text-slate-900 ${fontPoppins.className}`}>
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
                <Building2 className="h-6 w-6" />
              </div>
              <h3 className={`text-2xl font-bold text-slate-900 ${fontPoppins.className}`}>
                Company Overview
              </h3>
              <BulletList items={companyOverview} className="mt-6" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-12 md:py-16">
        <div className="mx-auto max-w-5xl">
          <motion.div
            {...cardMotion}
            whileHover={{ y: -4 }}
            className="rounded-[32px] border border-amber-100 bg-[linear-gradient(135deg,#fffaf0_0%,#ffffff_100%)] p-8 text-center shadow-sm md:p-10"
          >
            <span className="inline-flex rounded-full bg-amber-100 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.18em] text-amber-700">
              Final Overview
            </span>
            <p
              className={`mt-6 text-lg leading-8 text-slate-700 md:text-xl ${fontInter.className}`}
            >
              Romania offers affordable living, growing job opportunities, and
              a clear path for foreign workers who want to build a stable career
              in Europe.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
