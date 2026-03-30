import { Metadata } from "next";
import { CommonContact } from "@/components/sections/CommonContact";
import { WorkContent } from "@/components/work/WorkContent";
import { StructuredData } from "@/components/seo/StructuredData";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FAQSection } from "@/components/seo/FAQSection";
import {
  generateLocalizedMetadata,
  getLocalizedPageConfig,
} from "@/lib/seo/metadata";
import { serviceSchemas, organizationSchema } from "@/lib/seo/structuredData";

interface WorkPageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({
  params,
}: WorkPageProps): Promise<Metadata> {
  const { lang } = await params;

  const pageConfig = getLocalizedPageConfig("work", lang);

  return generateLocalizedMetadata({
    ...pageConfig,
    locale: lang,
    pathname: "/work",
  });
}

export default async function WorkPage({ params }: WorkPageProps) {
  const { lang } = await params;

  const structuredData = [organizationSchema, serviceSchemas.work];

  const breadcrumbItems = [
    { name: "Work Opportunities", href: `/${lang}/work` },
  ];

  // Work-related FAQs for better SEO
  const workFAQs = [
    {
      question: "How long does it take to get a work permit for Poland?",
      answer:
        "The work permit processing time in Poland typically takes 2-6 weeks, depending on the type of permit and completeness of documentation. EU Career Serwis helps expedite the process by ensuring all documents are properly prepared and submitted.",
    },
    {
      question: "What documents do I need for a Poland work visa?",
      answer:
        "You'll need a valid passport, approved work permit, employment contract, proof of accommodation, health insurance, and other supporting documents. Our team provides a complete checklist and assists with document preparation.",
    },
    {
      question: "Can I bring my family with a Poland work visa?",
      answer:
        "Yes, you can apply for family reunification once you have a valid work permit and residence card in Poland. Your spouse and children can join you through the family visa process.",
    },
    {
      question: "What types of jobs are available for foreigners in Poland?",
      answer:
        "Poland offers opportunities in logistics, construction, manufacturing, hospitality, agriculture, and IT sectors. Both skilled and non-skilled positions are available for international workers.",
    },
    {
      question: "Do I need to speak Polish to work in Poland?",
      answer:
        "While Polish language skills are helpful, many international companies operate in English. Basic communication skills are often sufficient, and you can learn Polish while working.",
    },
  ];

  return (
    <div className="min-h-screen">
      <StructuredData data={structuredData} />
      <div className="container mx-auto px-4 py-2">
        <Breadcrumbs items={breadcrumbItems} />
      </div>
      <CommonContact />
      <WorkContent />
      <FAQSection
        title="Work Opportunities in Poland - Frequently Asked Questions"
        faqs={workFAQs}
        className="bg-gray-50"
      />
    </div>
  );
}
