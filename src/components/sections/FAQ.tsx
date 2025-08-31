"use client";

import { useTranslations } from "@/hooks/useTranslations";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { useLocale } from "next-intl";
import Link from "next/link";

export function FAQ() {
  const t = useTranslations("faq");
  const locale = useLocale();

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
    <section className="relative py-16 md:py-24 lg:py-32  overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 md:mb-6">
              {t("title")}
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              {t("subtitle")}
            </p>
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
                  <AccordionTrigger className="text-left text-base md:text-lg">
                    {t(`questions.${key}.question`)}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm md:text-base">
                    {t(`questions.${key}.answer`)}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Contact CTA */}
          <div className="text-center mt-12 md:mt-16">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg border border-white/20 max-w-2xl mx-auto">
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 md:mb-4">
                {t("cta1")}
              </h3>
              <p className="text-gray-600 mb-6 text-sm md:text-base">
                {t("cta2")}
              </p>
              <button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-6 md:px-8 py-3 md:py-4 text-sm md:text-base font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <Link href={`/${locale}/contact`}>{t("cta3")}</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
