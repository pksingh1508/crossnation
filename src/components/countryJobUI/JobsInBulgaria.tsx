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
    description:
      "For employees moving within multinational organisations.",
  },
  {
    type: "Freelance / Business Visa",
    description:
      "For self-employed applicants or investors.",
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

const cardMotion = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 as const },
  transition: { duration: 0.4, ease: "easeOut" as const },
};

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

export default function JobsInBulgaria() {
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
              Jobs in Bulgaria
            </span>
            <h1
              className={`mt-5 max-w-5xl text-4xl font-bold leading-tight text-slate-900 md:text-5xl lg:text-6xl ${fontPoppins.className}`}
            >
              Bulgaria Work Visa, Job Matching, and Settlement Support for
              Foreign Workers
            </h1>
            <p
              className={`mt-6 max-w-4xl text-base leading-8 text-slate-600 md:text-lg ${fontInter.className}`}
            >
              A trusted immigration company in Europe, helping workers
              understand Bulgaria work permits, job opportunities, pricing, and
              relocation support through a clear step-by-step process.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-stone-50 px-4 py-12 md:py-16">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Why Bulgaria"
            title="Why Consider a Bulgaria Work Visa?"
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
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
            title="Advantages of Working in Bulgaria"
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
            eyebrow="Permit Options"
            title="Work Permit Options for Non-EU Applicants"
          />
          <div className="space-y-4">
            {permitOptions.map((permit) => (
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
          <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
            <motion.div
              {...cardMotion}
              whileHover={{ y: -4 }}
              className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm md:p-8"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-500">
                <BriefcaseBusiness className="h-6 w-6" />
              </div>
              <h3 className={`text-2xl font-bold text-slate-900 ${fontPoppins.className}`}>
                Popular Job Roles in Bulgaria
              </h3>
              <BulletList items={popularRoles} className="mt-6" />
              <div className="mt-8 rounded-2xl bg-amber-50 p-4">
                <BulletList items={roleNotes} />
              </div>
            </motion.div>

            <motion.div
              {...cardMotion}
              whileHover={{ y: -4 }}
              className="rounded-[32px] border border-amber-100 bg-[linear-gradient(135deg,#fffaf0_0%,#ffffff_100%)] p-6 shadow-sm md:p-8"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-500">
                <Globe2 className="h-6 w-6" />
              </div>
              <h3 className={`text-2xl font-bold text-slate-900 ${fontPoppins.className}`}>
                Eligible Regions for Recruitment
              </h3>
              <BulletList items={eligibleRegions} className="mt-6" />
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
              className="rounded-[32px] border border-amber-100 bg-[linear-gradient(135deg,#fffaf0_0%,#ffffff_100%)] p-6 shadow-sm md:p-8"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-500">
                <Wallet className="h-6 w-6" />
              </div>
              <h3 className={`text-2xl font-bold text-slate-900 ${fontPoppins.className}`}>
                Pricing Plan
              </h3>
              <BulletList items={pricingPlan} className="mt-6" />
            </motion.div>

            <motion.div
              {...cardMotion}
              whileHover={{ y: -4 }}
              className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm md:p-8"
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
              className="rounded-[32px] border border-slate-200 bg-stone-50 p-6 shadow-sm md:p-8"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-500">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className={`text-2xl font-bold text-slate-900 ${fontPoppins.className}`}>
                Initial Requirements
              </h3>
              <BulletList items={initialRequirements} className="mt-6" />
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
                <BadgeCheck className="h-6 w-6" />
              </div>
              <h3 className={`text-2xl font-bold text-slate-900 ${fontPoppins.className}`}>
                Important Conditions
              </h3>
              <BulletList items={importantConditions} className="mt-6" />
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
                Key Documents
              </h3>
              <BulletList items={keyDocuments} className="mt-6" />
            </motion.div>

            <motion.div
              {...cardMotion}
              whileHover={{ y: -4 }}
              className="rounded-[32px] border border-amber-100 bg-[linear-gradient(135deg,#fffaf0_0%,#ffffff_100%)] p-6 shadow-sm md:p-8"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-500">
                <Clock3 className="h-6 w-6" />
              </div>
              <h3 className={`text-2xl font-bold text-slate-900 ${fontPoppins.className}`}>
                Work Permit Processing
              </h3>
              <BulletList items={processingInfo} className="mt-6" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-stone-50 px-4 py-12 md:py-16">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Application Process"
            title="Bulgaria Work Permit Process"
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
          <div className="grid gap-6 xl:grid-cols-3">
            <motion.div
              {...cardMotion}
              whileHover={{ y: -4 }}
              className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm md:p-8"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-500">
                <Plane className="h-6 w-6" />
              </div>
              <h3 className={`text-2xl font-bold text-slate-900 ${fontPoppins.className}`}>
                Post-Arrival Services
              </h3>
              <BulletList items={postArrivalServices} className="mt-6" />
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
              <h3 className={`text-2xl font-bold text-slate-900 ${fontPoppins.className}`}>
                Payment Summary
              </h3>
              <BulletList items={paymentSummary} className="mt-6" />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
