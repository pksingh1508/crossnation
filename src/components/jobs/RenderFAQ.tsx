"use client";

import { fontInter, fontPoppins } from "@/fonts";
import { JobFAQ } from "@/constants/JobsFAQ";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const uniqueJobFAQ = JobFAQ.filter(
  (faq, index, self) =>
    index === self.findIndex((item) => item.question === faq.question)
);

export default function RenderFAQ() {
  return (
    <section className="bg-white px-4 py-12 md:py-16">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-[32px] border border-slate-200 bg-stone-50 p-6 shadow-sm md:p-10">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full bg-amber-100 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.18em] text-amber-700">
              Jobs FAQ
            </span>
            <h2
              className={`mt-5 text-3xl font-bold text-slate-900 md:text-4xl ${fontPoppins.className}`}
            >
              Frequently Asked Questions About Jobs in Poland
            </h2>
            <p
              className={`mx-auto mt-4 max-w-2xl text-base leading-8 text-slate-600 ${fontInter.className}`}
            >
              Find answers to the most common questions about legal work,
              permits, salaries, contracts, accommodation, and daily life for
              foreign workers in Poland.
            </p>
            <div className="mx-auto mt-5 h-1 w-24 rounded-full bg-amber-500"></div>
          </div>

          <div className="mt-10">
            <Accordion type="single" collapsible className="w-full">
              {uniqueJobFAQ.map((faq, index) => (
                <AccordionItem
                  key={`${faq.question}-${index}`}
                  value={`job-faq-${index}`}
                  className="border border-slate-200 bg-white"
                >
                  <AccordionTrigger
                    className={`text-left text-base md:text-lg ${fontPoppins.className}`}
                  >
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent
                    className={`text-sm md:text-base ${fontInter.className}`}
                  >
                    {faq.answer}
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
