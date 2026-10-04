"use client";

import { useId, useState, type ReactNode } from "react";
import { ChevronDown, Mail, Phone } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";
import {
  EMAIL_LINK,
  PHONE_LINK,
  WHATSAPP_LABEL,
  WhatsAppLogo,
  whatsAppLink,
} from "@/components/layout/header-links";
import { CompanyOverview } from "@/constants/companyOverview";
import { fontInter } from "@/fonts";
import { delay, RISE_ON_REVEAL } from "@/lib/animation";
import { linkify, TEXT_LINK } from "@/lib/linkify";
import { cn } from "@/lib/utils";
import { SectionIntro } from "./SectionIntro";

/** Questions shown before "Show all" */
const FIRST = 6;

/** An answer's line, with its contact details as links; WhatsApp opens a chat */
function answerLine(text: string): ReactNode {
  const whatsapp = text.match(/^WhatsApp:\s*\+?\d+$/);
  if (!whatsapp) return linkify(text);
  return (
    <>
      WhatsApp:{" "}
      <a
        href={whatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        className={TEXT_LINK}
      >
        {WHATSAPP_LABEL}
      </a>
    </>
  );
}

/**
 * The company, in questions and answers: one answer open at a time. The first few show;
 * the rest open below them on request. Every answer is in the page's HTML, so search
 * engines read them all; a closed one has no height and is inert. Beside them, on larger
 * screens, the ways to reach us stay in view.
 */
export function CompanyFAQ() {
  const titleId = useId();
  const id = useId();
  const [open, setOpen] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [ref, reveal] = useReveal<HTMLDivElement>();
  const [listRef, listReveal] = useReveal<HTMLDivElement>();

  return (
    <section aria-labelledby={titleId} className="bg-white py-20 sm:py-24">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-start gap-12 px-4 lg:grid-cols-12 lg:gap-10">
        <div className="lg:sticky lg:top-28 lg:col-span-5">
          <SectionIntro
            id={titleId}
            eyebrow="Company overview"
            title="Get to know EU Career Serwis"
            description="Who we are, how we work and how to reach us: the questions candidates ask us most."
          />
          <div ref={ref} data-reveal={reveal}>
            <ul className={cn("mt-8 space-y-2", fontInter.className)}>
              {[
                { icon: Phone, href: PHONE_LINK.href, label: PHONE_LINK.label },
                {
                  icon: WhatsAppLogo,
                  href: whatsAppLink(),
                  label: `WhatsApp ${WHATSAPP_LABEL}`,
                  external: true,
                },
                { icon: Mail, href: EMAIL_LINK.href, label: EMAIL_LINK.label },
              ].map(({ icon: Icon, href, label, external }, index) => (
                <li
                  key={href}
                  className={RISE_ON_REVEAL}
                  style={delay(350 + index * 70)}
                >
                  <a
                    href={href}
                    {...(external && {
                      target: "_blank",
                      rel: "noopener noreferrer",
                    })}
                    className="group/contact inline-flex items-center gap-3 rounded-full py-1 pr-3 font-medium text-neutral-800 transition-colors duration-200 outline-none hover:text-neutral-950 focus-visible:ring-2 focus-visible:ring-neutral-950"
                  >
                    <span className="grid size-9 place-items-center rounded-full bg-neutral-100 text-neutral-700 transition-colors duration-300 group-hover/contact:bg-brand group-hover/contact:text-neutral-950">
                      <Icon aria-hidden className="size-4" />
                    </span>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div ref={listRef} data-reveal={listReveal} className="lg:col-span-7">
          <ul className="divide-y divide-neutral-200 border-y border-neutral-200">
            {CompanyOverview.map(({ question, answer, isList }, index) => {
              const isOpen = open === index;
              const answerId = `${id}answer${index}`;
              const isExtra = index >= FIRST;
              return (
                <li
                  key={question}
                  hidden={isExtra && !showAll}
                  // The first questions rise in with the list; the rest when they are shown
                  className={
                    isExtra
                      ? "animate-rise motion-reduce:animate-none"
                      : RISE_ON_REVEAL
                  }
                  style={delay(
                    isExtra ? (index - FIRST) * 40 : 80 + index * 60
                  )}
                >
                  <h3>
                    {/* The side padding (undone by the negative margin) gives the focus ring room */}
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={answerId}
                      onClick={() => setOpen(isOpen ? null : index)}
                      className="group/question -mx-3 flex w-[calc(100%+1.5rem)] cursor-pointer items-center justify-between gap-6 rounded-xl px-3 py-5 text-left font-semibold text-neutral-800 transition-colors duration-200 outline-none hover:text-neutral-950 focus-visible:ring-2 focus-visible:ring-neutral-950 aria-expanded:text-neutral-950"
                    >
                      <span className="min-w-0 text-pretty hyphens-auto wrap-break-word">
                        {question}
                      </span>
                      {/* A plus whose upright bar turns flat, making a minus */}
                      <span
                        aria-hidden
                        className="relative grid size-8 shrink-0 place-items-center rounded-full bg-white ring-1 ring-neutral-300 transition-[background-color,box-shadow] duration-300 group-hover/question:ring-neutral-950 group-aria-expanded/question:bg-brand group-aria-expanded/question:ring-brand"
                      >
                        <span className="absolute h-0.5 w-3 rounded-full bg-current" />
                        <span className="absolute h-3 w-0.5 rounded-full bg-current transition-transform duration-500 ease-out-quint group-aria-expanded/question:rotate-90" />
                      </span>
                    </button>
                  </h3>
                  {/* Grid rows from 0fr to 1fr animate the height to fit the answer */}
                  <div
                    id={answerId}
                    inert={!isOpen}
                    className={cn(
                      "grid transition-[grid-template-rows] duration-500 ease-out-quint",
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    )}
                  >
                    <div className="overflow-hidden">
                      <div
                        className={cn(
                          "pr-12 pb-6 text-[15px] leading-relaxed text-neutral-600 transition-[opacity,translate] duration-500 ease-out-quint",
                          fontInter.className,
                          isOpen ? "opacity-100" : "-translate-y-2 opacity-0"
                        )}
                      >
                        {isList ? (
                          <ul className="space-y-2">
                            {answer.map((line) => (
                              <li key={line} className="relative pl-5">
                                <span
                                  aria-hidden
                                  className="absolute top-[0.5lh] left-0 size-1.5 -translate-y-1/2 rounded-full bg-brand"
                                />
                                {answerLine(line)}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          answer.map((line) => (
                            <p key={line} className="mt-2 first:mt-0">
                              {answerLine(line)}
                            </p>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <button
            type="button"
            aria-expanded={showAll}
            onClick={() => setShowAll(!showAll)}
            className={cn(
              "group/more mt-6 inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-sm font-semibold text-neutral-950 ring-1 ring-neutral-300 transition-[background-color,box-shadow] duration-300 outline-none hover:bg-neutral-50 hover:ring-neutral-950 focus-visible:ring-2 focus-visible:ring-neutral-950",
              RISE_ON_REVEAL
            )}
            style={delay(500)}
          >
            {showAll
              ? "Show fewer questions"
              : `Show all ${CompanyOverview.length} questions`}
            <ChevronDown
              aria-hidden
              className={cn(
                "size-4 transition-transform duration-300 ease-out-quint",
                showAll && "rotate-180"
              )}
            />
          </button>
        </div>
      </div>
    </section>
  );
}
