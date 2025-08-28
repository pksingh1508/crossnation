"use client";

import { useTranslations } from "@/hooks/useTranslations";
import { 
  Accordion, 
  AccordionItem, 
  AccordionTrigger, 
  AccordionContent 
} from "@/components/ui/accordion";

export function FAQ() {
  const t = useTranslations("faq");

  const faqKeys = ["services", "countries", "duration", "visa", "fees"] as const;

  return (
    <section className="relative py-16 md:py-24 lg:py-32 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 overflow-hidden">
      {/* Background Pattern - Same as Hero */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-amber-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-orange-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-300 rounded-full blur-3xl"></div>
      </div>

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
                Still have questions?
              </h3>
              <p className="text-gray-600 mb-6 text-sm md:text-base">
                Our expert consultants are here to help you with personalized guidance.
              </p>
              <button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-6 md:px-8 py-3 md:py-4 text-sm md:text-base font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                Contact Our Experts
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
