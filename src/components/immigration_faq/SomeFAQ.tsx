"use client";

import { useTranslations } from "@/hooks/useTranslations";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { fontInter } from "@/fonts";

export function SomeFAQ() {
  const t = useTranslations("faq");
  const t2 = useTranslations("someFAQ");

  const faqKeys = [
    "choose",
    "trust",
    "realJobs",
    "documents",
    "industries",
    "startWork",
    "support",
    "employers",
    "difference",
    "clients",
  ] as const;

  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6">
            <h2
              className={`text-xl font-bold text-gray-800 mb-4 md:mb-6 ${fontInter.className}`}
            >
              {t2("heading")}
            </h2>
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-0">
            <Accordion type="single" className="w-full space-y-3">
              {faqKeys.map((key, index) => (
                <AccordionItem
                  key={key}
                  value={key}
                  className="border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <AccordionTrigger
                    className={`text-left text-base cursor-pointer ${fontInter.className}`}
                  >
                    {t(`questions.${key}.question`)}
                  </AccordionTrigger>
                  <AccordionContent
                    className={`text-sm ${fontInter.className}`}
                  >
                    {t(`questions.${key}.answer`)}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
