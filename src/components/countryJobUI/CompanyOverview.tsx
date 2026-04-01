"use client";

import { fontInter, fontPoppins } from "@/fonts";
import { CompanyOverview as companyOverviewData } from "@/constants/companyOverview";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function CompanyOverview() {
  return (
    <section className="bg-white px-4 py-5 md:py-9">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-[32px] border border-amber-100 bg-[linear-gradient(135deg,#fffaf0_0%,#ffffff_100%)] p-6 shadow-sm md:p-10">
          <div className="mx-auto max-w-3xl text-center">
            <h2
              className={`text-2xl font-bold text-gray-700 md:text-3xl ${fontPoppins.className}`}
            >
              Company Overview
            </h2>
            <div className="mx-auto mt-5 h-1 w-24 rounded-full bg-amber-500"></div>
          </div>

          <div className="mt-10">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem
                value="company-overview"
                className="overflow-hidden rounded-3xl border border-slate-200 bg-white"
              >
                <AccordionTrigger
                  className={`px-6 text-left text-base md:text-lg ${fontPoppins.className}`}
                >
                  See all Company Overview
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="space-y-8">
                    {companyOverviewData.map((item, index) => (
                      <div
                        key={`${item.question}-${index}`}
                        className="border-b border-slate-100 pb-6 last:border-b-0 last:pb-0"
                      >
                        <h3
                          className={`text-lg font-semibold text-gray-700 ${fontPoppins.className}`}
                        >
                          {item.question}
                        </h3>

                        {item.isList ? (
                          <ul
                            className={`mt-4 space-y-3 text-base leading-7 text-slate-600 ${fontInter.className}`}
                          >
                            {item.answer.map((answer) => (
                              <li
                                key={answer}
                                className="flex items-start gap-3"
                              >
                                <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-amber-500"></span>
                                <span>{answer}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <div className="mt-4 space-y-3">
                            {item.answer.map((answer) => (
                              <p
                                key={answer}
                                className={`text-base leading-7 text-slate-600 ${fontInter.className}`}
                              >
                                {answer}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
