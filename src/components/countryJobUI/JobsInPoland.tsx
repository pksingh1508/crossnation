"use client";

import { motion } from "framer-motion";
import { fontInter, fontPoppins } from "@/fonts";
import {
  BadgeCheck,
  Banknote,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
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

const permitTypes = [
  {
    type: "Type A",
    description:
      "For work with a Polish company under an official employment agreement.",
  },
  {
    type: "Type B",
    description:
      "For foreign nationals working in management roles within a Polish company for a period longer than six months.",
  },
  {
    type: "Type C",
    description:
      "For work at a Polish branch of a company that is based outside the country.",
  },
  {
    type: "Type D",
    description:
      "For work in Poland while providing services on behalf of a company based in another country.",
  },
  {
    type: "Type S",
    description:
      "For temporary work in sectors like farming, gardening, or tourism during peak seasons.",
  },
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

const cardMotion = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 as const },
  transition: { duration: 0.4, ease: "easeOut" as const },
};

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

export default function JobsInPoland() {
  return (
    <div className="bg-white">
      <section className="px-4 pb-10 pt-12 md:pb-16 md:pt-16">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="overflow-hidden rounded-[32px] border border-amber-100 bg-[linear-gradient(135deg,#fffaf0_0%,#fff7ed_45%,#f8fafc_100%)] p-8 shadow-sm md:p-12"
          >
            <span className="inline-flex rounded-full bg-amber-100 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.18em] text-amber-700">
              Jobs in Poland
            </span>
            <h1
              className={`mt-5 max-w-5xl text-2xl font-bold leading-tight text-gray-700 md:text-2xl lg:text-3xl ${fontPoppins.className}`}
            >
              Work Permit, Visa Support, Job Opportunities, and Settlement
              Guidance for Foreign Workers in Poland
            </h1>
            <p
              className={`mt-6 max-w-4xl text-base leading-8 text-slate-600 md:text-lg ${fontInter.className}`}
            >
              A simple guide for job seekers who want to work in Poland legally,
              understand the work permit process, and get support both before
              and after arrival.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-stone-50 px-4 py-12 md:py-16">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Employment Benefits"
            title="Advantages of Employment in Poland"
            description="Poland continues to attract international workers because it combines practical career opportunities with a stable and affordable lifestyle."
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {advantages.map((item, index) => {
              const Icon = advantageIcons[index];
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
                    className={`pt-2 text-lg font-semibold leading-7 text-gray-700 ${fontPoppins.className}`}
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
            eyebrow="Why Apply"
            title="Why Apply for a Poland Work Visa?"
            description="For many international workers, Poland offers a strong balance of hiring demand, legal employment pathways, and long-term growth potential."
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {visaReasons.map((item, index) => {
              const Icon = visaIcons[index];
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
                    className={`pt-2 text-lg font-semibold leading-7 text-gray-700 ${fontPoppins.className}`}
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
            title="Types of Work Permits in Poland for Non-EU Citizens"
          />
          <div className="space-y-6">
            {permitTypes.map((permit) => (
              <motion.div
                key={permit.type}
                {...cardMotion}
                whileHover={{ y: -3 }}
                className="border-b border-slate-200 pb-6 md:grid md:grid-cols-[140px_1fr] md:items-start md:gap-4"
              >
                <div className="inline-flex w-fit items-center gap-3 text-amber-500">
                  <span
                    className={`text-xl font-bold ${fontPoppins.className}`}
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
            eyebrow="Open Roles"
            title="Top Unskilled Job Opportunities Now Open in Poland"
          />
          <motion.div
            {...cardMotion}
            className="rounded-[32px] border border-amber-100 bg-[linear-gradient(135deg,#fffaf0_0%,#ffffff_100%)] p-6 shadow-sm md:p-8"
          >
            <div className="flex flex-wrap gap-3">
              {unskilledJobs.map((job) => (
                <div
                  key={job}
                  className={`rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-medium text-slate-700 md:text-base ${fontInter.className}`}
                >
                  {job}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-stone-50 px-4 py-12 md:py-16">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Support Services"
            title="Pre-Arrival and Post-Arrival Services"
            description="EU Career Serwis supports workers throughout the full journey, from documentation and travel planning to settlement and workplace support in Poland."
          />
          <div className="grid gap-6 xl:grid-cols-2">
            {[
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
            ].map((section) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={section.title}
                  {...cardMotion}
                  whileHover={{ y: -4 }}
                  className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm md:p-8"
                >
                  <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-500">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3
                    className={`text-2xl font-bold text-gray-700 ${fontPoppins.className}`}
                  >
                    {section.title}
                  </h3>
                  <div className="mt-6 space-y-4">
                    {section.items.map((item) => (
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
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-12 md:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
            <motion.div
              {...cardMotion}
              whileHover={{ y: -4 }}
              className="rounded-[32px] border border-slate-200 bg-stone-50 p-6 shadow-sm md:p-8"
            >
              <SectionTitle
                eyebrow="Why Choose Us"
                title="Why Choose EU Career Serwis?"
              />
              <div className="-mt-2 space-y-4">
                {whyChoose.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <ShieldCheck className="mt-1 h-5 w-5 flex-shrink-0 text-amber-500" />
                    <p
                      className={`text-base leading-7 text-slate-700 ${fontInter.className}`}
                    >
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              {...cardMotion}
              whileHover={{ y: -4 }}
              className="rounded-[32px] border border-amber-100 bg-[linear-gradient(135deg,#fffaf0_0%,#ffffff_100%)] p-6 shadow-sm md:p-8"
            >
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-500">
                <FileText className="h-6 w-6" />
              </div>
              <h3
                className={`text-2xl font-bold text-gray-700 ${fontPoppins.className}`}
              >
                Documents Required for a Poland Work Permit
              </h3>
              <div className="mt-6 space-y-4">
                {requiredDocuments.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-amber-500" />
                    <p
                      className={`text-base leading-7 text-slate-700 ${fontInter.className}`}
                    >
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-stone-50 px-4 py-12 md:py-16">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Processing Guide"
            title="Poland Work Permit & Visa: Information and Processing Time"
            description="Before applying for a Poland work permit and visa, it’s important to understand how the process works and how long each step may take. This overview helps you plan clearly and avoid unnecessary delays."
          />

          <div className="grid gap-6 xl:grid-cols-2">
            <motion.div
              {...cardMotion}
              whileHover={{ y: -4 }}
              className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm md:p-8"
            >
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-500">
                <Building2 className="h-6 w-6" />
              </div>
              <h3
                className={`text-2xl font-bold text-gray-700 ${fontPoppins.className}`}
              >
                Poland Work Permit Processing
              </h3>
              <p
                className={`mt-4 text-base leading-8 text-slate-600 ${fontInter.className}`}
              >
                Work permit applications in Poland are handled by the
                Voivodeship Office (Urząd Wojewódzki) based on the employer’s
                location.
              </p>
              <div className="mt-6 rounded-2xl bg-amber-50 p-4">
                <p
                  className={`text-xl font-semibold text-amber-700 ${fontPoppins.className}`}
                >
                  92 to 120 working days
                </p>
              </div>
              <div className="mt-6 space-y-4">
                {[
                  "The exact timeline can vary depending on the number of applications being processed and the internal workflow of the office.",
                  "In some cases, approvals may be issued faster, but during peak periods or high-demand seasons, delays may occur.",
                ].map((item) => (
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
            </motion.div>

            <motion.div
              {...cardMotion}
              whileHover={{ y: -4 }}
              className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm md:p-8"
            >
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-500">
                <Users className="h-6 w-6" />
              </div>
              <h3
                className={`text-2xl font-bold text-gray-700 ${fontPoppins.className}`}
              >
                Poland Work Visa Processing
              </h3>
              <p
                className={`mt-4 text-base leading-8 text-slate-600 ${fontInter.className}`}
              >
                After the work permit is approved, the next step is to schedule
                an appointment at the Polish Embassy or a VFS center in your
                country. The visa timeline starts only after document submission
                at the appointment.
              </p>
              <div className="mt-6 rounded-2xl bg-amber-50 p-4">
                <p
                  className={`text-xl font-semibold text-amber-700 ${fontPoppins.className}`}
                >
                  15 to 25 working days
                </p>
              </div>
              <div className="mt-6 space-y-4">
                {[
                  "Processing times can vary depending on document verification, biometric submissions, and embassy workload.",
                  "Submitting complete and accurate documents helps avoid unnecessary delays.",
                ].map((item) => (
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
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
