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
  FileCheck2,
  FileText,
  Globe2,
  HeartPulse,
  Home,
  Hospital,
  Languages,
  Plane,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Timer,
  UserRoundCheck,
  Wallet,
} from "lucide-react";
import TopTitleBar from "./TopTitleBar";
import CountryFooter from "./countryFooter";
import { RecentTestimonials } from "../sections/RecentTestimonials";
import WorkPermit from "./WorkPermit";
import CompanyOverview from "./CompanyOverview";

const visaReasons = [
  "Germany offers more than 200,000 vacancies in healthcare, including roles for nurses, doctors, physiotherapists, and caregivers.",
  "Annual salaries usually range from €45,000 to €55,000, depending on recognised qualifications and experience.",
  "Standard working hours are normally around 38 to 40 hours per week.",
  "Workers receive access to Germany's healthcare system, pension plans, and social security support.",
  "The country offers a strong quality of life, with affordable smaller cities and major career hubs like Berlin, Hamburg, and Munich.",
  "Strict labour regulations help protect fair wages, stable jobs, and regulated working hours.",
];

const healthcareBenefits = [
  "High demand for healthcare workers across hospitals, clinics, and care homes.",
  "Competitive monthly salaries from €3,500 to €4,500 gross.",
  "Secure jobs with legal protections, fixed working hours, and paid leave.",
  "Full social benefits including health insurance, pension contributions, and worker protections.",
  "A pathway to permanent residency after long-term employment.",
];

const visaTypes = [
  {
    type: "EU Blue Card",
    description:
      "For highly qualified professionals earning at least €39,682 per year in shortage occupations.",
  },
  {
    type: "Skilled Worker Visa",
    description:
      "For qualified healthcare professionals whose credentials are officially recognised.",
  },
  {
    type: "General Employment Visa",
    description:
      "For non-EU candidates who already have a job offer and approved qualifications.",
  },
  {
    type: "Job Seeker Visa",
    description:
      "Allows professionals to stay in Germany for up to 6 months while searching for work.",
  },
  {
    type: "Temporary Residence Permit",
    description:
      "Usually valid for up to 4 years and can include family reunification and a route to permanent residency.",
  },
];

const healthcareJobs = [
  {
    role: "Registered Nurse",
    responsibilities:
      "Patient care, giving medication, monitoring health conditions, and supporting doctors.",
    salary: "€2,500 – €3,500 per month",
  },
  {
    role: "Physiotherapist",
    responsibilities:
      "Creating rehabilitation plans and helping patients recover movement and mobility.",
    salary: "€2,800 – €3,800 per month",
  },
  {
    role: "Occupational Therapist (Ergotherapist)",
    responsibilities:
      "Helping patients regain independence in everyday activities.",
    salary: "€2,800 – €3,800 per month",
  },
  {
    role: "Midwife",
    responsibilities:
      "Supporting patients during pregnancy, childbirth, and postnatal care.",
    salary: "€2,800 – €3,800 per month",
  },
  {
    role: "Medical / Laboratory Technician",
    responsibilities:
      "Running tests, analysing samples, and supporting diagnosis work.",
    salary: "€2,800 – €3,800 per month",
  },
  {
    role: "Radiology Technician",
    responsibilities: "Using imaging equipment such as X-rays and MRI systems.",
    salary: "€2,800 – €3,800 per month",
  },
  {
    role: "Care Assistant",
    responsibilities:
      "Helping patients with daily tasks and supporting medical teams.",
    salary: "€2,800 – €3,800 per month",
  },
  {
    role: "Doctor / Physician",
    responsibilities:
      "Diagnosing illness, prescribing treatment, and managing patient care.",
    salary: "€4,500 – €7,000 per month",
  },
];

const eligibilityRequirements = [
  "German language proficiency at B1 to B2 level with Goethe, TELC, or OSD certification.",
  "A relevant healthcare degree or diploma.",
  "At least one year of professional experience, especially for doctors and specialists.",
  "A valid passport and complete documentation.",
];

const employerBenefits = [
  "Flight tickets may be covered by the employer.",
  "Help with housing arrangements.",
  "Full health insurance and social security coverage.",
  "Paid annual leave and training support.",
  "Family reunification options for spouse and children.",
];

const pricingStructure = [
  "Initial payment: €1600 for eligibility check, document preparation, and job matching.",
  "Second payment: €2000 after work permit approval.",
  "Final payment: €1000 after visa issuance and before travel.",
];

const whyChoose = [
  "Transparent and affordable pricing with no hidden costs.",
  "Complete end-to-end support through the full process.",
  "An experienced team guiding applicants step by step.",
  "Secure document delivery through courier services.",
];

const healthcareDocuments = [
  "Passport valid for at least 6 months beyond the travel date.",
  "Recent certified birth certificate.",
  "Degree or diploma in a relevant healthcare field.",
  "Academic transcripts.",
  "German language certificate at B1 level, valid within 2 years.",
  "Police clearance certificate issued within 6 months.",
  "Medical fitness certificate issued within 3 months.",
  "Signed and dated CV in tabular format.",
  "Recent biometric passport-size photo.",
  "Power of attorney allowing the employer to process documents.",
];

const supportingDocuments = [
  "Professional licence or registration.",
  "Work experience certificates or reference letters.",
  "Vaccination records such as Hepatitis B or COVID-19.",
  "Certified translations for documents not in English or German.",
];

const doctorRequirements = [
  "Medical degree with full academic records.",
  "Licence to practise medicine in the home country.",
  "Certificate of Good Standing from the Medical Council.",
  "German language certificate at B2 level.",
  "Internship or hospital experience records.",
  "Recommendation letters.",
  "Marriage or name change certificate if applicable.",
];

const importantNotes = [
  "All documents must be submitted as certified copies.",
  "Documents not in English or German must be translated into German.",
];

const processSteps = [
  "Profile evaluation based on qualifications and job preferences.",
  "Signing the service agreement and starting the process with the €1600 payment.",
  "Collection and verification of required documents.",
  "Matching with a suitable healthcare employer.",
  "Issuance of the job offer and coordination with the employer.",
  "Submission of the work permit application to German authorities.",
  "Regular updates on application progress.",
  "Payment of €2000 after work permit approval.",
  "Dispatch of documents through courier service.",
  "Help with booking the visa appointment.",
  "Preparation of visa documents.",
  "Interview training and mock sessions.",
  "Support in case of visa rejection.",
];

const finalSteps = [
  "Final payment of €1000 before travel.",
  "Pre-departure checklist and travel guidance.",
  "Flight coordination with the employer.",
  "Airport pickup and arrival support.",
  "One-day accommodation on arrival.",
  "Help obtaining a local SIM card.",
  "Support for opening a bank account.",
  "Help with tax ID (Steuernummer) registration.",
  "Assistance with finding long-term housing.",
  "Cultural orientation and integration guidance.",
  "German language training available: B1 for €100 and B2 for €200.",
  "Full relocation and settlement support.",
  "Start working in your healthcare role.",
];

const accommodationDetails = [
  "Shared housing with 2 to 4 occupants per room.",
  "Fully furnished with shared kitchen and bathroom facilities.",
  "Accommodation is subject to availability.",
  "Not suitable for families, partners, or pets.",
];

const paymentSummary = [
  "€1600 – Initial processing and job matching",
  "€2000 – After work permit approval",
  "€1000 – After visa approval before travel",
];

const cardMotion = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 as const },
  transition: { duration: 0.4, ease: "easeOut" as const },
};

const visaIcons = [Hospital, Banknote, Timer, HeartPulse, Globe2, ShieldCheck];

const benefitIcons = [Stethoscope, Wallet, BadgeCheck, ShieldCheck, Sparkles];

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

export default function JobsInGermany() {
  return (
    <div className="bg-white">
      <section className="px-4 pb-5 pt-5 md:pb-9 md:pt-9">
        <TopTitleBar name="Germany" />
      </section>
      <section className="bg-white px-4 py-5 md:py-10">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Why Germany"
            title="Why Choose a Germany Work Visa?"
            description="Germany remains one of the strongest destinations in Europe for healthcare professionals because it offers real demand, clear legal pathways, and long-term career stability."
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {visaReasons.map((item, index) => {
              const Icon = visaIcons[index];
              return (
                <motion.div
                  key={item}
                  {...cardMotion}
                  whileHover={{ y: -4 }}
                  className="flex items-start gap-4 rounded-3xl border border-amber-100 bg-white p-6 shadow-sm"
                >
                  <div className="inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gray-100 text-[#fac800]">
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
            eyebrow="Healthcare Benefits"
            title="Key Benefits of Healthcare Jobs in Germany"
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
            {healthcareBenefits.map((item, index) => {
              const Icon = benefitIcons[index];
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
            eyebrow="Visa Types"
            title="Types of Healthcare Work Visas in Germany"
          />
          <WorkPermit permitTypes={visaTypes} />
        </div>
      </section>

      <section className="bg-white px-4 py-5 md:py-10">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Job Opportunities"
            title="Healthcare Job Opportunities in Germany"
            description="Final salaries can vary based on experience, region, employer, and whether your qualifications have been fully recognised."
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {healthcareJobs.map((job) => (
              <motion.div
                key={job.role}
                {...cardMotion}
                whileHover={{ y: -4 }}
                className="rounded-[28px] border border-amber-100 bg-[linear-gradient(180deg,#fffaf0_0%,#ffffff_100%)] p-6 shadow-sm"
              >
                <div className="inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gray-100 text-[#fac800]">
                  <BriefcaseBusiness className="h-6 w-6" />
                </div>
                <h3
                  className={`text-xl font-bold text-gray-700 ${fontPoppins.className}`}
                >
                  {job.role}
                </h3>
                <p
                  className={`mt-4 text-sm leading-7 text-slate-600 md:text-base ${fontInter.className}`}
                >
                  <span className="font-semibold text-slate-800">
                    Responsibilities:
                  </span>{" "}
                  {job.responsibilities}
                </p>
                <div className="mt-5 rounded-2xl bg-amber-50 px-4 py-3">
                  <p
                    className={`text-base font-semibold text-[#fac800] ${fontPoppins.className}`}
                  >
                    Salary: {job.salary}
                  </p>
                </div>
              </motion.div>
            ))}
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
                <Languages className="h-6 w-6" />
              </div>
              <h3
                className={`text-2xl font-bold text-gray-700 ${fontPoppins.className}`}
              >
                General Eligibility Requirements
              </h3>
              <BulletList items={eligibilityRequirements} className="mt-6" />
            </motion.div>

            <motion.div
              {...cardMotion}
              whileHover={{ y: -4 }}
              className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm md:p-8"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-[#fac800]">
                <UserRoundCheck className="h-6 w-6" />
              </div>
              <h3
                className={`text-2xl font-bold text-gray-700 ${fontPoppins.className}`}
              >
                Benefits Provided by Employers
              </h3>
              <BulletList items={employerBenefits} className="mt-6" />
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
              className="rounded-[32px] border border-amber-100 bg-[linear-gradient(135deg,#fffaf0_0%,#ffffff_100%)] p-6 shadow-sm md:p-8"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-[#fac800]">
                <Wallet className="h-6 w-6" />
              </div>
              <h3
                className={`text-2xl font-bold text-gray-700 ${fontPoppins.className}`}
              >
                Pricing Structure
              </h3>
              <BulletList items={pricingStructure} className="mt-6" />
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
                Why Consider EU Career Serwis?
              </h3>
              <BulletList items={whyChoose} className="mt-6" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-5 md:py-10">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Required Documents"
            title="Required Documents for a Germany Work Permit"
          />
          <div className="grid gap-6 xl:grid-cols-2">
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
                For Healthcare Professionals
              </h3>
              <BulletList items={healthcareDocuments} className="mt-6" />
            </motion.div>

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
                Additional Supporting Documents
              </h3>
              <BulletList items={supportingDocuments} className="mt-6" />
            </motion.div>

            <motion.div
              {...cardMotion}
              whileHover={{ y: -4 }}
              className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm md:p-8"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-[#fac800]">
                <Stethoscope className="h-6 w-6" />
              </div>
              <h3
                className={`text-2xl font-bold text-gray-700 ${fontPoppins.className}`}
              >
                Additional Requirements for Doctors
              </h3>
              <BulletList items={doctorRequirements} className="mt-6" />
            </motion.div>

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
                Important Notes
              </h3>
              <BulletList items={importantNotes} className="mt-6" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-5 md:py-10">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Application Process"
            title="Germany Healthcare Work Permit Process"
          />
          <motion.div
            {...cardMotion}
            className="mx-auto max-w-5xl rounded-[32px] border border-slate-200 bg-stone-50 p-6 shadow-sm md:p-8"
          >
            <div className="space-y-4">
              {processSteps.map((step) => (
                <motion.div
                  key={step}
                  {...cardMotion}
                  whileHover={{ y: -2 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-[#fac800]" />
                  <p
                    className={`text-base leading-8 text-slate-600 ${fontInter.className}`}
                  >
                    {step}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-white px-4 py-5 md:py-10">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="After Approval"
            title="Final Steps After Visa Approval"
          />
          <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
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
                Final Steps After Visa Approval
              </h3>
              <BulletList items={finalSteps} className="mt-6" />
            </motion.div>

            <div className="grid gap-6">
              <motion.div
                {...cardMotion}
                whileHover={{ y: -4 }}
                className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm md:p-8"
              >
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-[#fac800]">
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
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-[#fac800]">
                  <Banknote className="h-6 w-6" />
                </div>
                <h3
                  className={`text-2xl font-bold text-gray-700 ${fontPoppins.className}`}
                >
                  Payment Summary
                </h3>
                <BulletList items={paymentSummary} className="mt-6" />
              </motion.div>
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
