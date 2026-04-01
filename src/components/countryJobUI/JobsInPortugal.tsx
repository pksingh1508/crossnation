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

const visaReasons = [
  "More than 100,000 jobs are open in industries such as construction, farming, tourism, and hospitality.",
  "Typical yearly earnings range from €14,000 to €18,000 depending on the role and experience.",
  "Standard working hours are usually around 40 hours per week.",
  "Workers can access Portugal's public healthcare system and social security programs.",
  "Cities such as Lisbon, Porto, and Coimbra offer affordable living, strong culture, and a relaxed Mediterranean lifestyle.",
];

const advantages = [
  "Rising demand for international workers because of labour shortages in several sectors.",
  "Simpler visa procedures when an employer supports the application.",
  "Lower living costs than many Western European countries.",
  "Opportunities in construction, agriculture, tourism, hospitality, logistics, and healthcare for both skilled and unskilled workers.",
  "Possibility to apply for residency and bring family members.",
  "A pathway to permanent residency or citizenship after 5 years.",
];

const visaCategories = [
  {
    type: "D1 Visa",
    description:
      "For applicants who already have a confirmed job offer from a Portuguese employer.",
  },
  {
    type: "D2 Visa",
    description:
      "For entrepreneurs or freelancers who want to start a business or work independently.",
  },
  {
    type: "Seasonal Work Permit",
    description: "For short-term jobs in areas like agriculture and tourism.",
  },
  {
    type: "Highly Qualified Activity Visa",
    description:
      "For professionals in fields such as IT, healthcare, and research.",
  },
  {
    type: "Job Seeker Visa",
    description:
      "Lets applicants stay in Portugal for 120 days to look for work, with a possible extension.",
  },
];

const permitDetails = [
  "Combines permission to stay and work legally in Portugal.",
  "Usually issued for up to 2 years and can be renewed.",
  "Provides access to healthcare, education, and social benefits.",
  "Can lead to permanent residency and citizenship over time.",
];

const constructionWorkerDetails = [
  "Open to male applicants only.",
  "Minimum age requirement is 18 years.",
  "Work includes physically demanding tasks such as general labour, masonry, scaffolding, and plastering.",
];

const visaPermitDetails = [
  "Visa type: 90-day entry visa followed by a 1-year residence permit under the D1 category.",
  "Renewal: Can be extended without leaving Portugal.",
  "Legal status: Full authorisation to work with proper documentation.",
  "Some employers may offer shared housing and overtime opportunities.",
];

const pricingBreakdown = [
  "Initial payment: €1200 for eligibility assessment, document preparation, and job matching.",
  "After work permit approval: €1500 once the permit is approved.",
  "After visa approval: €1500 before travel arrangements.",
];

const whyChoose = [
  "Clear and affordable pricing with no hidden fees.",
  "End-to-end support from documentation through settlement assistance.",
  "Experienced professionals guiding each step.",
  "Safe document delivery through DHL.",
];

const eligibility = [
  "Applicants from most countries can apply.",
  "Candidates from Somalia, Iraq, Iran, Cuba, Libya, and Syria aged 18 to 45 are not eligible.",
];

const requiredDocuments = [
  "Passport copy of the first page.",
  "Updated CV.",
  "Educational and professional certificates.",
];

const applicationProcess = [
  "Sign the agreement to begin the process.",
  "Complete eligibility verification.",
  "Submit documents.",
  "Pay the initial fee of €1200.",
  "Receive a free eligibility assessment.",
  "Get a dedicated consultant.",
  "Start job matching with a verified employer.",
  "Submit the work permit application.",
  "Receive regular application updates.",
];

const afterPermitApproval = [
  "Pay the second installment of €1500.",
  "Receive documents through DHL.",
  "Book the visa appointment independently.",
  "Submit the visa application.",
  "Prepare with mock interview sessions.",
  "Receive support if the visa is rejected.",
];

const finalStage = [
  "Pay the final amount of €1500.",
  "Follow the pre-departure checklist.",
  "Receive financial guidance.",
  "Arrange travel independently.",
];

const afterArrivalSupport = [
  "Airport assistance.",
  "One-night free accommodation.",
  "City orientation.",
  "Welcome support services.",
  "Help finding long-term housing.",
  "SIM card assistance.",
  "Bank account setup.",
  "Tax ID (NIF) registration.",
  "Cultural guidance.",
  "Optional language training.",
  "Relocation support.",
  "Start your job.",
];

const importantNotes = [
  "Candidates must book their own visa appointment at the Portuguese embassy.",
  "Embassy fees, insurance, and courier charges are not included.",
];

const lifeInPortugal = [
  "Earn in euros while living with a reasonable cost of living.",
  "Access quality education and vocational training.",
  "Benefit from modern healthcare facilities.",
  "Enjoy a peaceful and comfortable lifestyle.",
];

const additionalBenefits = [
  "Bring family members through reunification programs.",
  "Freedom to live and work across Portugal.",
  "Travel more easily within Schengen countries.",
];

const salaryStructure = [
  "Standard 40 hours/week: €1,100–€1,300 per month and €13,200–€15,600 annually.",
  "Reduced 36 hours/week: €990–€1,170 per month and €11,880–€14,040 annually.",
];

const accommodationDetails = [
  "Shared rooms with 2 to 4 people.",
  "Furnished accommodation with shared kitchen and bathroom.",
  "Not available for families or pets.",
];

const companyOverview = [
  "More than 500 successful applicants.",
  "More than 4 million people assisted.",
  "Operating since 2009.",
  "Headquarters in Warsaw, Poland.",
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
  BadgeCheck,
  HeartPulse,
  Sparkles,
];

const advantageIcons = [
  TrendingUp,
  ShieldCheck,
  Wallet,
  Building2,
  Users,
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

export default function JobsInPortugal() {
  return (
    <div className="bg-white">
      <section className="px-4 pb-5 pt-5 md:pb-9 md:pt-9">
        <TopTitleBar name="Portugal" />
      </section>
      <section className="bg-white px-4 py-5 md:py-10">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Why Portugal"
            title="Why Consider a Portugal Work Visa?"
            description="Portugal offers broad job demand, a practical cost of living, and a straightforward path for foreign workers who want stable legal employment in Europe."
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
            title="Advantages of Working in Portugal"
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
            eyebrow="Visa Categories"
            title="Portugal Work Visa Categories"
            description="Portugal's economy keeps growing across construction, agriculture, tourism, hospitality, logistics, and healthcare, creating opportunities for both skilled and unskilled foreign workers."
          />
          <WorkPermit permitTypes={visaCategories} />
        </div>
      </section>

      <section className="bg-white px-4 py-5 md:py-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
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
                Temporary Residence and Work Permit
              </h3>
              <BulletList items={permitDetails} className="mt-6" />
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
                Salary Overview
              </h3>
              <BulletList
                items={[
                  "Monthly earnings usually range from €870 to €1,200 depending on skills and the employer.",
                ]}
                className="mt-6"
              />
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
                <BriefcaseBusiness className="h-6 w-6" />
              </div>
              <h3
                className={`text-2xl font-bold text-gray-700 ${fontPoppins.className}`}
              >
                Job Example: Construction Worker
              </h3>
              <BulletList items={constructionWorkerDetails} className="mt-6" />
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
                Visa and Work Permit Details
              </h3>
              <BulletList items={visaPermitDetails} className="mt-6" />
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
              className="rounded-[32px] border border-amber-100 bg-[linear-gradient(135deg,#fffaf0_0%,#ffffff_100%)] p-6 shadow-sm md:p-8"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-[#fac800]">
                <Wallet className="h-6 w-6" />
              </div>
              <h3
                className={`text-2xl font-bold text-gray-700 ${fontPoppins.className}`}
              >
                Achieve Your Goals with EU Career Serwis
              </h3>
              <p
                className={`mt-6 text-base leading-8 text-slate-600 ${fontInter.className}`}
              >
                Explore career opportunities in Portugal with customized visa
                and work permit solutions. The pricing is transparent and there
                are no hidden costs.
              </p>
              <BulletList items={pricingBreakdown} className="mt-6" />
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
            eyebrow="Requirements"
            title="Key Requirements for a Portugal Work Permit"
            description="All documents should be valid, clearly scanned, and translated when required."
          />
          <div className="grid gap-6 xl:grid-cols-2">
            <motion.div
              {...cardMotion}
              whileHover={{ y: -4 }}
              className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm md:p-8"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-[#fac800]">
                <Users className="h-6 w-6" />
              </div>
              <h3
                className={`text-2xl font-bold text-gray-700 ${fontPoppins.className}`}
              >
                Eligibility
              </h3>
              <BulletList items={eligibility} className="mt-6" />
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
                Required Documents
              </h3>
              <BulletList items={requiredDocuments} className="mt-6" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-5 md:py-10">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Application Process"
            title="Step-by-Step Application Process"
          />
          <motion.div
            {...cardMotion}
            className="mx-auto max-w-5xl rounded-[32px] border border-slate-200 bg-stone-50 p-6 shadow-sm md:p-8"
          >
            <div className="space-y-4">
              {applicationProcess.map((step) => (
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
          <div className="grid gap-6 xl:grid-cols-3">
            <motion.div
              {...cardMotion}
              whileHover={{ y: -4 }}
              className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm md:p-8"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-[#fac800]">
                <ClipboardList className="h-6 w-6" />
              </div>
              <h3
                className={`text-2xl font-bold text-gray-700 ${fontPoppins.className}`}
              >
                After Work Permit Approval
              </h3>
              <BulletList items={afterPermitApproval} className="mt-6" />
            </motion.div>

            <motion.div
              {...cardMotion}
              whileHover={{ y: -4 }}
              className="rounded-[32px] border border-amber-100 bg-[linear-gradient(135deg,#fffaf0_0%,#ffffff_100%)] p-6 shadow-sm md:p-8"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-[#fac800]">
                <Plane className="h-6 w-6" />
              </div>
              <h3
                className={`text-2xl font-bold text-gray-700 ${fontPoppins.className}`}
              >
                Final Stage
              </h3>
              <BulletList items={finalStage} className="mt-6" />
            </motion.div>

            <motion.div
              {...cardMotion}
              whileHover={{ y: -4 }}
              className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm md:p-8"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-[#fac800]">
                <Hotel className="h-6 w-6" />
              </div>
              <h3
                className={`text-2xl font-bold text-gray-700 ${fontPoppins.className}`}
              >
                After Arrival Support
              </h3>
              <BulletList items={afterArrivalSupport} className="mt-6" />
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
                <BadgeCheck className="h-6 w-6" />
              </div>
              <h3
                className={`text-2xl font-bold text-gray-700 ${fontPoppins.className}`}
              >
                Important Notes
              </h3>
              <BulletList items={importantNotes} className="mt-6" />
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
                Life in Portugal
              </h3>
              <BulletList items={lifeInPortugal} className="mt-6" />
            </motion.div>

            <motion.div
              {...cardMotion}
              whileHover={{ y: -4 }}
              className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm md:p-8"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-[#fac800]">
                <Globe2 className="h-6 w-6" />
              </div>
              <h3
                className={`text-2xl font-bold text-gray-700 ${fontPoppins.className}`}
              >
                Additional Benefits
              </h3>
              <BulletList items={additionalBenefits} className="mt-6" />
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
              className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm md:p-8"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-[#fac800]">
                <Building2 className="h-6 w-6" />
              </div>
              <h3
                className={`text-2xl font-bold text-gray-700 ${fontPoppins.className}`}
              >
                Company Overview
              </h3>
              <BulletList items={companyOverview} className="mt-6" />
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
              Conclusion
            </span>
            <p
              className={`mt-6 text-lg leading-8 text-slate-700 md:text-xl ${fontInter.className}`}
            >
              Portugal offers strong job opportunities, affordable living, and a
              high quality of life, making it a practical option for foreign
              workers who want to build a career in Europe.
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
