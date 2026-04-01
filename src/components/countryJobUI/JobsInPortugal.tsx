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
import CompanyOverview from "./CompanyOverview";
import {
  FeatureCardGrid,
  InfoCard,
  SectionTitle,
  StepList,
  SummaryCard,
  cardMotion,
} from "./CountryJobShared";

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
          <FeatureCardGrid
            items={visaReasons}
            icons={reasonIcons}
            columnsClassName="md:grid-cols-2 xl:grid-cols-5"
            layout="stacked"
          />
        </div>
      </section>

      <section className="bg-white px-4 py-5 md:py-10">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Advantages"
            title="Advantages of Working in Portugal"
          />
          <FeatureCardGrid
            items={advantages}
            icons={advantageIcons}
            columnsClassName="md:grid-cols-2 xl:grid-cols-3"
            tone="muted"
          />
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
            <InfoCard
              icon={BadgeCheck}
              title="Temporary Residence and Work Permit"
              items={permitDetails}
            />
            <InfoCard
              icon={Banknote}
              title="Salary Overview"
              items={[
                "Monthly earnings usually range from €870 to €1,200 depending on skills and the employer.",
              ]}
              tone="accent"
            />
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-5 md:py-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 xl:grid-cols-2">
            <InfoCard
              icon={BriefcaseBusiness}
              title="Job Example: Construction Worker"
              items={constructionWorkerDetails}
            />
            <InfoCard
              icon={FileCheck2}
              title="Visa and Work Permit Details"
              items={visaPermitDetails}
            />
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-5 md:py-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
            <InfoCard
              icon={Wallet}
              title="Achieve Your Goals with EU Career Serwis"
              items={pricingBreakdown}
              tone="accent"
              description="Explore career opportunities in Portugal with customized visa and work permit solutions. The pricing is transparent and there are no hidden costs."
            />
            <InfoCard
              icon={ShieldCheck}
              title="Why Consider EU Career Serwis?"
              items={whyChoose}
              tone="muted"
            />
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
            <InfoCard icon={Users} title="Eligibility" items={eligibility} />
            <InfoCard
              icon={FileText}
              title="Required Documents"
              items={requiredDocuments}
            />
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
            <StepList items={applicationProcess} />
          </motion.div>
        </div>
      </section>

      <section className="bg-white px-4 py-5 md:py-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 xl:grid-cols-3">
            <InfoCard
              icon={ClipboardList}
              title="After Work Permit Approval"
              items={afterPermitApproval}
            />
            <InfoCard
              icon={Plane}
              title="Final Stage"
              items={finalStage}
              tone="accent"
            />
            <InfoCard
              icon={Hotel}
              title="After Arrival Support"
              items={afterArrivalSupport}
            />
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-5 md:py-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 xl:grid-cols-2">
            <InfoCard
              icon={BadgeCheck}
              title="Important Notes"
              items={importantNotes}
            />
            <InfoCard
              icon={Sparkles}
              title="Life in Portugal"
              items={lifeInPortugal}
              tone="muted"
            />
            <InfoCard
              icon={Globe2}
              title="Additional Benefits"
              items={additionalBenefits}
            />
            <InfoCard
              icon={Banknote}
              title="Salary Structure"
              items={salaryStructure}
              tone="accent"
            />

            <InfoCard
              icon={Home}
              title="Accommodation Details"
              items={accommodationDetails}
            />

            <InfoCard
              icon={Building2}
              title="Company Overview"
              items={companyOverview}
            />
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-5 md:py-10">
        <div className="mx-auto max-w-5xl">
          <SummaryCard
            eyebrow="Conclusion"
            summary="Portugal offers strong job opportunities, affordable living, and a high quality of life, making it a practical option for foreign workers who want to build a career in Europe."
          />
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
