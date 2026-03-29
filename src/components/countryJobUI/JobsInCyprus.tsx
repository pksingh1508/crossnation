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

const visaReasons = [
  "Cyprus offers more than 50,000 employment opportunities in tourism, hospitality, construction, IT, and healthcare.",
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
    description:
      "For temporary jobs in tourism, agriculture, and hospitality.",
  },
  {
    type: "Intra-Company Transfer Permit",
    description:
      "For employees moved within multinational companies operating in Cyprus.",
  },
  {
    type: "Domestic Worker Permit",
    description:
      "For household and caregiving roles, usually with annual renewal options.",
  },
];

const temporaryPermitDetails = [
  "Allows a person to live and work in Cyprus at the same time.",
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
  "Travel expenses from India to Cyprus are paid by the employee.",
  "Return travel costs are paid by the employee after contract completion or early termination.",
  "Daily working hours are 8 to 10 hours, six days a week.",
  "Overtime is paid according to Cyprus labour regulations.",
  "Employers handle salary taxes and levies.",
  "Compensation in case of death is provided according to labour law.",
  "Employees are entitled to annual leave and public holidays as required by regulations.",
  "Transport between housing and the workplace is arranged and paid by the employer.",
  "Repatriation costs for terminated employees are paid by the employee.",
  "Employers pay repatriation costs for sick or injured workers.",
  "In case of death, repatriation follows Cyprus labour law.",
  "Safety equipment and protective clothing are provided by the employer.",
  "A one-month notice period applies to termination from either side.",
  "All work takes place within Cyprus.",
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
  "Arrival assistance is provided in Cyprus.",
  "Support is given for accommodation setup.",
  "Assistance is provided for bank account and SIM card setup.",
  "Help is given for getting a tax identification number.",
  "Orientation is provided on local culture and work environment.",
  "Begin legal employment in Cyprus.",
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

const cardMotion = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 as const },
  transition: { duration: 0.4, ease: "easeOut" as const },
};

const reasonIcons = [
  BriefcaseBusiness,
  Banknote,
  Clock3,
  HeartPulse,
  Sparkles,
];

const advantageIcons = [
  TrendingUp,
  Wallet,
  BadgeCheck,
  ShieldCheck,
  Home,
  Globe2,
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

export default function JobsInCyprus() {
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
              Jobs in Cyprus
            </span>
            <h1
              className={`mt-5 max-w-5xl text-4xl font-bold leading-tight text-slate-900 md:text-5xl lg:text-6xl ${fontPoppins.className}`}
            >
              Cyprus Work Visa, Job Matching, and Settlement Support for
              Foreign Workers
            </h1>
            <p
              className={`mt-6 max-w-4xl text-base leading-8 text-slate-600 md:text-lg ${fontInter.className}`}
            >
              A leading immigration service provider in Europe, helping
              candidates understand Cyprus work permits, employment conditions,
              pricing, and relocation support in a simple way.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-stone-50 px-4 py-12 md:py-16">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Why Cyprus"
            title="Reasons to Choose a Cyprus Work Visa"
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
            eyebrow="Advantages"
            title="Advantages of Working in Cyprus"
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
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
            eyebrow="Permit Categories"
            title="Categories of Work Permits in Cyprus for Non-EU Nationals"
          />
          <div className="space-y-4">
            {permitCategories.map((permit) => (
              <motion.div
                key={permit.type}
                {...cardMotion}
                whileHover={{ y: -3 }}
                className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-[230px_1fr] md:items-center md:p-6"
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
          <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
            <motion.div
              {...cardMotion}
              whileHover={{ y: -4 }}
              className="rounded-[32px] border border-amber-100 bg-[linear-gradient(135deg,#fffaf0_0%,#ffffff_100%)] p-6 shadow-sm md:p-8"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-500">
                <BadgeCheck className="h-6 w-6" />
              </div>
              <h3 className={`text-2xl font-bold text-slate-900 ${fontPoppins.className}`}>
                Temporary Residence and Employment Permit
              </h3>
              <BulletList items={temporaryPermitDetails} className="mt-6" />
            </motion.div>

            <motion.div
              {...cardMotion}
              whileHover={{ y: -4 }}
              className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm md:p-8"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-500">
                <ClipboardList className="h-6 w-6" />
              </div>
              <h3 className={`text-2xl font-bold text-slate-900 ${fontPoppins.className}`}>
                Employment Conditions in Cyprus
              </h3>
              <BulletList items={employmentConditions} className="mt-6" />
            </motion.div>
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
                <BriefcaseBusiness className="h-6 w-6" />
              </div>
              <h3 className={`text-2xl font-bold text-slate-900 ${fontPoppins.className}`}>
                Example Job Role
              </h3>
              <BulletList items={exampleRole} className="mt-6" />
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
                Service Charges Breakdown
              </h3>
              <BulletList items={serviceCharges} className="mt-6" />
            </motion.div>

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
                <FileText className="h-6 w-6" />
              </div>
              <h3 className={`text-2xl font-bold text-slate-900 ${fontPoppins.className}`}>
                Documents Required for Cyprus Work Permit
              </h3>
              <BulletList items={requiredDocuments} className="mt-6" />
            </motion.div>

            <motion.div
              {...cardMotion}
              whileHover={{ y: -4 }}
              className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm md:p-8"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-500">
                <Users className="h-6 w-6" />
              </div>
              <h3 className={`text-2xl font-bold text-slate-900 ${fontPoppins.className}`}>
                Eligibility Criteria
              </h3>
              <BulletList items={eligibilityCriteria} className="mt-6" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-stone-50 px-4 py-12 md:py-16">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Application Process"
            title="Cyprus Work Permit Process"
          />
          <div className="grid gap-4">
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
          <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
            <motion.div
              {...cardMotion}
              whileHover={{ y: -4 }}
              className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm md:p-8"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-500">
                <Banknote className="h-6 w-6" />
              </div>
              <h3 className={`text-2xl font-bold text-slate-900 ${fontPoppins.className}`}>
                Estimated Monthly Salaries in Cyprus
              </h3>
              <BulletList items={salaryEstimates} className="mt-6" />
            </motion.div>

            <div className="grid gap-6">
              <motion.div
                {...cardMotion}
                whileHover={{ y: -4 }}
                className="rounded-[32px] border border-slate-200 bg-stone-50 p-6 shadow-sm md:p-8"
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
                className="rounded-[32px] border border-amber-100 bg-[linear-gradient(135deg,#fffaf0_0%,#ffffff_100%)] p-6 shadow-sm md:p-8"
              >
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-500">
                  <Hotel className="h-6 w-6" />
                </div>
                <h3 className={`text-2xl font-bold text-slate-900 ${fontPoppins.className}`}>
                  Accommodation Details
                </h3>
                <BulletList items={accommodationDetails} className="mt-6" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
