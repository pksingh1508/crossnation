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
  PackageCheck,
  Plane,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";

const visaReasons = [
  "Demand is growing for international workers in agriculture, construction, logistics, hospitality, and manufacturing.",
  "Foreign applicants can get legal jobs through employer-sponsored contracts.",
  "Work permits are usually issued together with residence authorisation for 1 to 2 years.",
  "The cost of living is relatively low, including housing, food, and daily expenses.",
  "Working in Moldova gives valuable European work experience that can support future opportunities within the EU.",
];

const advantages = [
  "More than 50,000 vacancies are open in farming, food production, transport, construction, and textiles.",
  "Average monthly earnings usually range from €400 to €700 depending on the job and experience.",
  "The normal workweek is around 40 hours.",
  "Workers receive access to healthcare services and social insurance support.",
  "Cities such as Chisinau, Balti, and Cahul offer a more budget-friendly lifestyle.",
  "Moldova offers a safe and welcoming environment for foreign workers, with improving infrastructure.",
  "Workers can renew permits and later apply for long-term residence.",
];

const permitTypes = [
  {
    type: "Standard Employment Permit",
    description:
      "For workers employed under a contract with a Moldovan employer.",
  },
  {
    type: "Seasonal Work Authorization",
    description:
      "For short-term roles of up to 6 months in agriculture, tourism, or hospitality.",
  },
  {
    type: "Skilled Worker Permit",
    description:
      "For professionals in logistics, construction, IT, healthcare, and transportation.",
  },
  {
    type: "Temporary Residence Permit",
    description:
      "Issued together with the work permit, allowing legal stay for 1 to 2 years.",
  },
  {
    type: "Long-Term Residence Option",
    description:
      "Available through extensions after a period of legal employment in Moldova.",
  },
];

const constructionLabourDetails = [
  "Eligible countries: India, Nepal, Sri Lanka, Philippines, Bangladesh, Pakistan, and African nations.",
  "Vacancies available: 100.",
  "Salary range: €600 to €800 per month net.",
];

const jobResponsibilities = [
  "General labour work at construction sites.",
  "Handling materials, loading, and unloading.",
  "Cleaning and maintaining the work area.",
  "Helping skilled workers with daily operations.",
  "No formal education is required, but physical fitness, teamwork, reliability, and willingness to work outdoors are important.",
];

const employmentTerms = [
  "Accommodation is provided by the employer.",
  "Meals are included free of cost.",
  "Transport is arranged by the employer.",
  "Medical insurance is provided according to local labour regulations.",
  "Daily working hours are 8 to 9 hours, with possible overtime.",
  "Weekly rest days are provided according to Moldovan labour law.",
];

const pricingDetails = [
  "Initial payment: €1000 for eligibility assessment and job matching.",
  "Second payment: €1000 after work permit approval.",
  "Final payment: €1200 after visa issuance.",
];

const whyWorkWithUs = [
  "Transparent fees with no hidden charges.",
  "Complete support from document preparation through arrival.",
  "Secure delivery of permits and approvals.",
];

const requiredDocuments = [
  "Valid international passport with at least 12 months validity.",
  "CV in European format showing education and work experience.",
  "Proof of at least one year of relevant work experience.",
  "Scanned copy of the passport bio page.",
  "Minimum educational qualification such as basic or secondary education, depending on the job.",
];

const videoRequirements = [
  "A short 1 to 2 minute introduction video in English with personal details and work experience.",
  "A second video showing practical skills such as cleaning, packing, loading, or tool handling.",
  "These videos help assess communication, confidence, and job ability.",
];

const workPermitTimeline = [
  "The employer submits the application to the Bureau for Migration and Asylum (BMA) or another relevant authority.",
  "Processing usually takes around 19 to 20 weeks, or about 65 to 96 working days.",
  "Timelines can vary depending on the region, job category, and application volume.",
  "Delays can happen if documents are incomplete or if extra verification is required.",
];

const visaTimeline = [
  "After work permit approval, applicants can apply for a Type D long-stay work visa at the Moldovan embassy or consulate.",
  "Processing starts only after the visa appointment and full document submission.",
  "Standard visa processing time is around 15 to 20 working days.",
  "In some cases, it can extend to 30 to 60 days depending on embassy workload.",
  "The visa is issued only for the employer and job role approved in the work permit.",
  "Applicants must have a confirmed job offer approved by Moldovan authorities before applying.",
];

const processSteps = [
  "Sign the service agreement and submit initial documents such as passport, CV, photos, and video.",
  "Eligibility is checked and the application is submitted.",
  "The candidate is matched with a verified employer.",
  "Work permit approval is obtained.",
  "Documents are delivered securely and visa process guidance is provided.",
  "Support is given for visa appointment booking and interview preparation.",
  "After visa approval, pre-departure and travel support is provided.",
  "Arrival support includes airport pickup, accommodation help, and local registration.",
];

const paymentStructure = [
  "Step 1: €900 as pre-payment.",
  "Step 2: €1200 after work permit approval.",
  "Step 3: €900 after visa approval.",
];

const accommodationDetails = [
  "Shared rooms with 2 to 4 occupants.",
  "Fully furnished with shared kitchen and bathroom facilities.",
  "Housing is provided based on availability.",
  "Family members, partners, and pets are not allowed.",
];

const companyAchievements = [
  "More than 500 successful applicants placed.",
  "More than 4 million individuals guided.",
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
  BadgeCheck,
  FileCheck2,
  Wallet,
  Globe2,
];

const advantageIcons = [
  TrendingUp,
  Banknote,
  Clock3,
  HeartPulse,
  Home,
  ShieldCheck,
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

export default function JobsInMoldova() {
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
              Jobs in Moldova
            </span>
            <h1
              className={`mt-5 max-w-5xl text-4xl font-bold leading-tight text-slate-900 md:text-5xl lg:text-6xl ${fontPoppins.className}`}
            >
              Moldova Work Visa, Job Matching, and Settlement Support for
              Foreign Workers
            </h1>
            <p
              className={`mt-6 max-w-4xl text-base leading-8 text-slate-600 md:text-lg ${fontInter.className}`}
            >
              One of Europe&apos;s top immigration service providers, helping
              candidates understand Moldova job opportunities, work permit
              steps, pricing, and support before and after arrival.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-stone-50 px-4 py-12 md:py-16">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Overview"
            title="Overview of Jobs and Opportunities in Moldova"
            description="This guide summarises available roles in Moldova together with eligibility, important details, and estimated monthly earnings for foreign workers."
          />
        </div>
      </section>

      <section className="bg-white px-4 py-12 md:py-16">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Why Moldova"
            title="Why Choose a Moldova Work Visa?"
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

      <section className="bg-stone-50 px-4 py-12 md:py-16">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Work Benefits"
            title="Advantages of Working in Moldova"
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

      <section className="bg-white px-4 py-12 md:py-16">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Permit Types"
            title="Types of Work Permits Available in Moldova"
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

      <section className="bg-stone-50 px-4 py-12 md:py-16">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Job Role"
            title="Key Industries and Job Roles in Moldova"
            description="Secure employment in Moldova with step-by-step support and transparent pricing with no hidden costs."
          />
          <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
            <motion.div
              {...cardMotion}
              whileHover={{ y: -4 }}
              className="rounded-[32px] border border-amber-100 bg-[linear-gradient(135deg,#fffaf0_0%,#ffffff_100%)] p-6 shadow-sm md:p-8"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-500">
                <BriefcaseBusiness className="h-6 w-6" />
              </div>
              <h3 className={`text-2xl font-bold text-slate-900 ${fontPoppins.className}`}>
                Job Opportunity: Construction Labour (Unskilled)
              </h3>
              <BulletList items={constructionLabourDetails} className="mt-6" />
              <div className="mt-8 rounded-2xl bg-amber-50 p-4">
                <p className={`text-lg font-semibold text-amber-700 ${fontPoppins.className}`}>
                  Estimated net monthly salary: €600–€800
                </p>
              </div>
            </motion.div>

            <motion.div
              {...cardMotion}
              whileHover={{ y: -4 }}
              className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm md:p-8"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-500">
                <PackageCheck className="h-6 w-6" />
              </div>
              <h3 className={`text-2xl font-bold text-slate-900 ${fontPoppins.className}`}>
                Job Responsibilities
              </h3>
              <BulletList items={jobResponsibilities} className="mt-6" />
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
                Employment Terms and Conditions
              </h3>
              <BulletList items={employmentTerms} className="mt-6" />
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

            <motion.div
              {...cardMotion}
              whileHover={{ y: -4 }}
              className="rounded-[32px] border border-slate-200 bg-stone-50 p-6 shadow-sm md:p-8"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-500">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className={`text-2xl font-bold text-slate-900 ${fontPoppins.className}`}>
                Why Work With Us?
              </h3>
              <BulletList items={whyWorkWithUs} className="mt-6" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-stone-50 px-4 py-12 md:py-16">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Documents"
            title="Required Documents for Moldova Work Permit"
          />
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
                Required Documents
              </h3>
              <BulletList items={requiredDocuments} className="mt-6" />
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
                Video Requirement
              </h3>
              <BulletList items={videoRequirements} className="mt-6" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-12 md:py-16">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Processing"
            title="Work Permit and Visa Processing Timeline"
          />
          <div className="grid gap-6 xl:grid-cols-2">
            <motion.div
              {...cardMotion}
              whileHover={{ y: -4 }}
              className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm md:p-8"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-500">
                <Building2 className="h-6 w-6" />
              </div>
              <h3 className={`text-2xl font-bold text-slate-900 ${fontPoppins.className}`}>
                Work Permit Stage
              </h3>
              <BulletList items={workPermitTimeline} className="mt-6" />
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
                Visa Processing Stage (Type D - Long Stay)
              </h3>
              <BulletList items={visaTimeline} className="mt-6" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-stone-50 px-4 py-12 md:py-16">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Full Process"
            title="Moldova Work Permit and Visa Process"
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
              className="rounded-[32px] border border-amber-100 bg-[linear-gradient(135deg,#fffaf0_0%,#ffffff_100%)] p-6 shadow-sm md:p-8"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-500">
                <Banknote className="h-6 w-6" />
              </div>
              <h3 className={`text-2xl font-bold text-slate-900 ${fontPoppins.className}`}>
                Payment Structure for Process
              </h3>
              <BulletList items={paymentStructure} className="mt-6" />
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
              className="rounded-[32px] border border-slate-200 bg-stone-50 p-6 shadow-sm md:p-8"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-500">
                <Building2 className="h-6 w-6" />
              </div>
              <h3 className={`text-2xl font-bold text-slate-900 ${fontPoppins.className}`}>
                Company Achievements
              </h3>
              <BulletList items={companyAchievements} className="mt-6" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-stone-50 px-4 py-12 md:py-16">
        <div className="mx-auto max-w-5xl">
          <motion.div
            {...cardMotion}
            whileHover={{ y: -4 }}
            className="rounded-[32px] border border-amber-100 bg-[linear-gradient(135deg,#fffaf0_0%,#ffffff_100%)] p-8 text-center shadow-sm md:p-10"
          >
            <span className="inline-flex rounded-full bg-amber-100 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.18em] text-amber-700">
              Additional Information
            </span>
            <p
              className={`mt-6 text-lg leading-8 text-slate-700 md:text-xl ${fontInter.className}`}
            >
              This guide also covers common questions related to Moldova work
              visa interviews, helping applicants prepare with more confidence.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
