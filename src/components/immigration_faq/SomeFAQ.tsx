"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "@/hooks/useTranslations";
import { useReveal } from "@/hooks/useReveal";
import { WordReveal } from "@/components/ui/word-reveal";
import { fontInter } from "@/fonts";
import { delay, RISE_ON_REVEAL } from "@/lib/animation";
import { cn } from "@/lib/utils";
import { getLocalizedPath } from "@/lib/locale-paths";

// Keys in faq.questions, in the order they are shown
const QUESTIONS = [
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

/**
 * Ten common questions on a soft grey panel, one answer open at a time. The answers are
 * always in the page's HTML (so search engines read them); a closed one has no height
 * and is inert, so it can't be reached by keyboard or screen reader.
 */
export function SomeFAQ() {
  const t = useTranslations("faq");
  const tHeading = useTranslations("someFAQ");
  const locale = useLocale();
  const id = useId();
  const [open, setOpen] = useState<string | null>(null);
  const [ref, reveal] = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      data-reveal={reveal}
      aria-labelledby={`${id}heading`}
      className={cn(
        "rounded-[2rem] bg-neutral-50 p-6 ring-1 ring-black/5 sm:p-10",
        RISE_ON_REVEAL
      )}
    >
      <p className="flex items-start gap-3 text-xs font-semibold tracking-[0.2em] text-neutral-500 uppercase">
        <span
          aria-hidden
          className="mt-[7px] h-0.5 w-8 shrink-0 origin-left rounded-full bg-brand reveal-waiting:scale-x-0 reveal-shown:animate-grow-x motion-reduce:animate-none"
          style={delay(300)}
        />
        {t("title")}
      </p>
      <h2
        id={`${id}heading`}
        className="mt-4 text-2xl leading-tight font-semibold tracking-tight text-balance text-neutral-950 sm:text-3xl"
      >
        <WordReveal
          text={tHeading("heading")}
          delay={150}
          stagger={45}
          className="reveal-waiting:translate-y-[125%] reveal-shown:animate-word motion-reduce:animate-none"
        />
      </h2>

      <ul className="mt-6 divide-y divide-neutral-200 border-y border-neutral-200">
        {QUESTIONS.map((key) => {
          const isOpen = open === key;
          const answerId = `${id}${key}`;
          return (
            <li key={key}>
              <h3>
                {/* The side padding (undone by the negative margin) gives the focus ring room */}
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => setOpen(isOpen ? null : key)}
                  className="group/question -mx-3 flex w-[calc(100%+1.5rem)] cursor-pointer items-center justify-between gap-6 rounded-xl px-3 py-5 text-left font-semibold text-neutral-800 transition-colors duration-200 outline-none hover:text-neutral-950 focus-visible:ring-2 focus-visible:ring-neutral-950 aria-expanded:text-neutral-950"
                >
                  {/* Long words (German) may break, so they never widen the panel */}
                  <span className="min-w-0 hyphens-auto wrap-anywhere">
                    {t(`questions.${key}.question`)}
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
                  <p
                    className={cn(
                      "pr-12 pb-6 text-[15px] leading-relaxed text-neutral-600 hyphens-auto wrap-anywhere transition-[opacity,translate] duration-500 ease-out-quint",
                      fontInter.className,
                      isOpen ? "opacity-100" : "-translate-y-2 opacity-0"
                    )}
                  >
                    {t(`questions.${key}.answer`)}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <p className="font-semibold text-neutral-950">{t("cta1")}</p>
        <Link
          href={getLocalizedPath(locale, "/contact")}
          className="group/cta inline-flex min-h-11 items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-neutral-950 transition-[translate,box-shadow] duration-300 ease-out-quint outline-none hover:shadow-[0_12px_28px_-12px_rgba(254,204,0,0.9)] focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-50 motion-safe:hover:-translate-y-0.5"
        >
          {t("cta3")}
          <ArrowRight
            aria-hidden
            className="size-4 transition-transform duration-300 ease-out-quint group-hover/cta:translate-x-1"
          />
        </Link>
      </div>
    </section>
  );
}
