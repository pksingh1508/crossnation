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
  PackageCheck,
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
import CompanyOverview from "./CompanyOverview";

const permitTypes = [
  {
    type: "Type A Work Permit",
    description:
      "Issued for foreign nationals employed by Lithuanian companies under regular contracts.",
  },
  {
    type: "EU Blue Card",
    description:
      "For highly skilled professionals such as engineers, IT specialists, and healthcare workers.",
  },
  {
    type: "Seasonal Employment Permit",
    description:
      "For short-term work in sectors like agriculture, tourism, and food production.",
  },
  {
    type: "Intra-Company Transfer Permit",
    description:
      "For employees transferred to a Lithuanian branch of an international company.",
  },
  {
    type: "Driver Work Permit",
    description:
      "A common option for CE-category truck drivers who want a long-term residence path.",
  },
];

const residenceBenefits = [
  "More than 90,000 vacancies are available in logistics, construction, manufacturing, and transport.",
  "Average yearly earnings usually range from €14,000 to €17,000.",
  "The standard work schedule is around 40 hours per week.",
  "Employees get access to European healthcare systems and social security support.",
  "Lithuania offers a safe and affordable lifestyle in cities such as Vilnius, Kaunas, and Klaipeda.",
  "The growing economy creates demand for both skilled and unskilled workers.",
  "Foreign workers are especially needed in trucking, warehousing, farming, and hospitality.",
  "Employment is legally protected through work contracts, with access to long-term Temporary Residence Cards.",
  "Workers may qualify for family reunification and mobility within the EU.",
  "Government and private institutions both support integration and employment readiness.",
  "As part of the Schengen Zone, Lithuania allows visa-free movement across 27 European countries.",
  "The permit combines both residency and employment rights.",
  "It is usually issued for 1 to 2 years and can be renewed or later converted to permanent residency.",
  "A valid job contract and employer sponsorship are required.",
];

const truckDriverEligibility = [
  "Open to male applicants only.",
  "Age requirement: 21 to 48 years.",
  "Must hold a CE driving licence and Code 95 certification.",
  "At least 1 year of driving experience is preferred.",
  "The job includes routes across the European Union.",
  "Accommodation is provided by the employer.",
  "Training support is included.",
];

const truckDriverSalary = [
  "Weekly advance: €150.",
  "Experienced drivers earn from €85 per day.",
  "Beginners usually earn around €60 per day during the first two months, with increases based on performance.",
  "Final salary depends on skill level, experience, and job responsibilities.",
];

const trainingCosts = [
  "Driving lessons: €70 per session.",
  "Short Code 95 course: €600 for drivers who already hold a CE licence.",
  "Long Code 95 course: €800 for licences issued after 10 September 2009.",
  "Internship duration: 1 to 2 weeks after training.",
];

const meatPlantInfo = [
  "Work includes processing meat products such as sausages and packaged items.",
  "Pay starts from €4.4 per hour after tax.",
  "Average monthly salary is around €730 based on 168 hours.",
  "An official employment contract is provided.",
  "Free housing is included.",
  "Work location: Utena, Lithuania.",
];

const workingSchedule = [
  "Shifts are usually around 11 hours long.",
  "Different schedules are available, including rotating day and night shifts with off days.",
];

const meatPlantResponsibilities = [
  "Meat cutting and separation from bones.",
  "Removing fat, skin, and small bones.",
  "Slaughterhouse duties.",
  "Packaging roles, which can also suit female workers.",
];

const accommodationDetails = [
  "Housing is provided free of cost by the employer.",
  "Workers stay in shared houses or apartments.",
  "Rooms usually have 2 to 3 occupants.",
  "Facilities include Wi-Fi, kitchen appliances, and basic living essentials.",
  "Married couples may stay together, usually with two couples per room.",
  "Housing is close to the workplace.",
  "Work uniforms and protective clothing are provided.",
  "Workplace temperature is usually between +2°C and +10°C depending on the task.",
];

const jobRequirements = [
  "Relevant qualification certificate such as butcher or machine operator.",
  "At least 1 year of work experience within the last 3 years.",
  "Police clearance certificate.",
  "Medical fitness certificate for food industry work.",
  "All documents must be translated into English or Lithuanian and properly certified.",
];

const pricingStructure = [
  "Initial payment: €1,200 for document processing and employer matching.",
  "Second payment: €1,500 after approval of the invitation or mediation letter.",
  "Final payment: €1,200 after TRC approval and before departure.",
];

const whyChoose = [
  "Clear and transparent pricing with no hidden charges.",
  "Complete support for visa and TRC procedures.",
  "Secure document delivery through DHL.",
  "Professional guidance at every stage.",
];

const requiredDocuments = [
  "Valid passport with a clear scanned copy of the bio page.",
  "Driving licence with front and back copies.",
  "Police clearance certificate, apostilled and valid within 6 months.",
  "Proof of driving experience for at least 1 year, issued by the employer with an official stamp.",
];

const processingTime = [
  "Invitation or Mediation Letter: up to 60 days, around 2 months.",
  "Temporary Residence Card (TRC): 30 to 90 days after biometric submission.",
];

const processSteps = [
  "Sign the agreement to start the application process.",
  "Eligibility is assessed based on qualifications and job requirements.",
  "Submit all required documents.",
  "Make the initial payment of €1,200.",
  "Employer matching is completed.",
  "The application is submitted to the Migration Department.",
  "Regular updates are shared on the application status.",
  "Second payment of €1,500 is made after approval of the work permit or invitation.",
  "Documents are sent by courier if needed.",
  "Support is provided for booking the visa appointment.",
  "Help is given for document review and mock interview preparation.",
  "Support is available for reapplication or appeal in case of visa rejection.",
];

const finalSteps = [
  "Final payment of €1,200 is made before travel after TRC approval.",
  "A pre-departure checklist and guidance are provided.",
  "Airport pickup and arrival support are arranged in Lithuania.",
  "Temporary accommodation and housing support are provided.",
  "Help is given with SIM card, bank account, and tax registration.",
  "Assistance is provided at the Migration Department for final TRC completion.",
  "Cultural orientation and settlement guidance are included.",
  "Legal employment begins with full relocation support.",
];

const cardMotion = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 as const },
  transition: { duration: 0.4, ease: "easeOut" as const },
};

const benefitIcons = [
  TrendingUp,
  Banknote,
  Clock3,
  HeartPulse,
  Home,
  BriefcaseBusiness,
  Truck,
  ShieldCheck,
  Users,
  Building2,
  Globe2,
  BadgeCheck,
  Sparkles,
  FileCheck2,
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

export default function JobsInLithuania() {
  return (
    <div className="bg-white">
      <section className="px-4 pb-5 pt-5 md:pb-9 md:pt-9">
        <TopTitleBar name="Lithuania" />
      </section>
      <section className="bg-white px-4 py-5 md:py-10">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Permit Types"
            title="Types of Work Permits in Lithuania"
          />
          <WorkPermit permitTypes={permitTypes} />
        </div>
      </section>

      <section className="bg-white px-4 py-5 md:py-10">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Residence and Work"
            title="Temporary Residence and Work Authorization"
            description="This permit lets workers live and work legally in Lithuania at the same time, with a route toward longer-term residence."
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {residenceBenefits.map((item, index) => {
              const Icon = benefitIcons[index];
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
            eyebrow="High-Demand Occupations"
            title="International Freight Truck Driver (Category CE)"
          />
          <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
            <motion.div
              {...cardMotion}
              whileHover={{ y: -4 }}
              className="rounded-[32px] border border-amber-100 bg-[linear-gradient(135deg,#fffaf0_0%,#ffffff_100%)] p-6 shadow-sm md:p-8"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-[#fac800]">
                <Truck className="h-6 w-6" />
              </div>
              <h3
                className={`text-2xl font-bold text-gray-700 ${fontPoppins.className}`}
              >
                Eligibility and Requirements
              </h3>
              <BulletList items={truckDriverEligibility} className="mt-6" />
            </motion.div>

            <div className="grid gap-6">
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
                  Salary and Payment Structure
                </h3>
                <BulletList items={truckDriverSalary} className="mt-6" />
              </motion.div>

              <motion.div
                {...cardMotion}
                whileHover={{ y: -4 }}
                className="rounded-[32px] border border-slate-200 bg-stone-50 p-6 shadow-sm md:p-8"
              >
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-[#fac800]">
                  <BadgeCheck className="h-6 w-6" />
                </div>
                <h3
                  className={`text-2xl font-bold text-gray-700 ${fontPoppins.className}`}
                >
                  Training Costs if Required
                </h3>
                <BulletList items={trainingCosts} className="mt-6" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-5 md:py-10">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Factory Role"
            title="Meat Processing Plant Worker in Utena, Lithuania"
          />
          <div className="grid gap-6 xl:grid-cols-3">
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
                Basic Job Information
              </h3>
              <BulletList items={meatPlantInfo} className="mt-6" />
            </motion.div>

            <motion.div
              {...cardMotion}
              whileHover={{ y: -4 }}
              className="rounded-[32px] border border-slate-200 bg-stone-50 p-6 shadow-sm md:p-8"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-[#fac800]">
                <Clock3 className="h-6 w-6" />
              </div>
              <h3
                className={`text-2xl font-bold text-gray-700 ${fontPoppins.className}`}
              >
                Working Schedule
              </h3>
              <BulletList items={workingSchedule} className="mt-6" />
            </motion.div>

            <motion.div
              {...cardMotion}
              whileHover={{ y: -4 }}
              className="rounded-[32px] border border-amber-100 bg-[linear-gradient(135deg,#fffaf0_0%,#ffffff_100%)] p-6 shadow-sm md:p-8"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-[#fac800]">
                <PackageCheck className="h-6 w-6" />
              </div>
              <h3
                className={`text-2xl font-bold text-gray-700 ${fontPoppins.className}`}
              >
                Job Responsibilities
              </h3>
              <BulletList items={meatPlantResponsibilities} className="mt-6" />
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
                <FileCheck2 className="h-6 w-6" />
              </div>
              <h3
                className={`text-2xl font-bold text-gray-700 ${fontPoppins.className}`}
              >
                Job Requirements
              </h3>
              <BulletList items={jobRequirements} className="mt-6" />
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
              className="rounded-[32px] border border-amber-100 bg-[linear-gradient(135deg,#fffaf0_0%,#ffffff_100%)] p-6 shadow-sm md:p-8"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-[#fac800]">
                <Wallet className="h-6 w-6" />
              </div>
              <h3
                className={`text-2xl font-bold text-gray-700 ${fontPoppins.className}`}
              >
                Transparent Pricing Structure
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
                Required Documents for Lithuania Work Permit
              </h3>
              <BulletList items={requiredDocuments} className="mt-6" />
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
                <Clock3 className="h-6 w-6" />
              </div>
              <h3
                className={`text-2xl font-bold text-gray-700 ${fontPoppins.className}`}
              >
                Processing Time
              </h3>
              <BulletList items={processingTime} className="mt-6" />
            </motion.div>

            <motion.div
              {...cardMotion}
              whileHover={{ y: -4 }}
              className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm md:p-8"
            >
              <SectionTitle
                eyebrow="Process"
                title="Lithuania Work Permit and TRC Process"
              />
              <div className="-mt-2 space-y-4">
                {processSteps.map((step) => (
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
        <div className="mx-auto max-w-5xl">
          <motion.div
            {...cardMotion}
            whileHover={{ y: -4 }}
            className="rounded-[32px] border border-amber-100 bg-[linear-gradient(135deg,#fffaf0_0%,#ffffff_100%)] p-8 shadow-sm md:p-10"
          >
            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-[#fac800]">
              <Plane className="h-6 w-6" />
            </div>
            <h3
              className={`text-3xl font-bold text-gray-700 ${fontPoppins.className}`}
            >
              Final Steps After Approval
            </h3>
            <BulletList items={finalSteps} className="mt-6" />
          </motion.div>
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
