"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "@/hooks/useTranslations";
import { useReveal } from "@/hooks/useReveal";
import { WordReveal } from "@/components/ui/word-reveal";
import { fontInter, fontPoppins } from "@/fonts";
import { delay, RISE_ON_REVEAL } from "@/lib/animation";
import { cn } from "@/lib/utils";
import { getLocalizedPath } from "@/lib/locale-paths";

const PARAGRAPHS = [
  "paragraph1",
  "paragraph2",
  "paragraph3",
  "paragraph4",
  "paragraph5",
];

/**
 * "First sentence. The rest." gives ["First sentence.", "The rest."]. The paragraphs open
 * with a sentence that sums them up, which is set darker as a lead-in.
 */
function splitLead(text: string): [string, string] {
  const match = text.match(/^(.+?[.!?])\s+(.+)$/);
  return match ? [match[1], match[2]] : [text, ""];
}

interface PointProps {
  index: number;
  text: string;
  /** Being read: the one crossing the middle of the screen */
  active: boolean;
}

/** One numbered point. It rises into view when it scrolls in. */
function Point({ index, text, active }: PointProps) {
  const [ref, reveal] = useReveal<HTMLLIElement>();
  const [lead, rest] = splitLead(text);

  return (
    <li
      ref={ref}
      data-reveal={reveal}
      data-index={index}
      className={cn(
        "flex gap-5 border-t border-neutral-200 py-8 first:border-t-0 first:pt-0 last:pb-0 sm:gap-6",
        RISE_ON_REVEAL
      )}
    >
      {/* The number lights up yellow while its point is being read */}
      <span
        aria-hidden
        className={cn(
          "grid size-10 shrink-0 place-items-center rounded-full border text-sm font-semibold tabular-nums transition-[background-color,border-color,color,box-shadow] duration-500 ease-out-quint",
          active
            ? "border-brand bg-brand text-neutral-950 shadow-[0_8px_20px_-8px_rgba(254,204,0,0.9)]"
            : "border-neutral-200 bg-white text-neutral-400"
        )}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <p
        className={cn(
          "min-w-0 leading-relaxed wrap-break-word text-neutral-600 sm:text-lg",
          fontInter.className
        )}
      >
        <span className="font-medium text-neutral-950">{lead}</span>
        {rest && ` ${rest}`}
      </p>
    </li>
  );
}

/**
 * The employer page's introduction: its main heading and a link to book a meeting, which
 * stay in view on large screens while the five points beside them scroll past.
 */
export default function EmployerInfo() {
  const t = useTranslations("employer.info");
  const tPage = useTranslations("pages.employer");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const [headRef, headReveal] = useReveal<HTMLDivElement>();
  const listRef = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);

  const points = PARAGRAPHS.map((key) => t(key)).filter(Boolean);

  // The point crossing a thin band across the middle of the screen is the one being read
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(Number((entry.target as HTMLElement).dataset.index));
          }
        }
      },
      { rootMargin: "-45% 0px -54% 0px" }
    );
    for (const item of list.children) observer.observe(item);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={cn("bg-white py-20 sm:py-24", fontPoppins.className)}>
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-4 lg:grid-cols-12 lg:gap-16 xl:gap-24">
        <div
          ref={headRef}
          data-reveal={headReveal}
          className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start"
        >
          <p
            className={cn(
              "flex items-center gap-3 text-sm font-semibold tracking-[0.2em] text-neutral-500 uppercase",
              RISE_ON_REVEAL
            )}
          >
            <span
              aria-hidden
              className="h-0.5 w-8 shrink-0 origin-left rounded-full bg-brand reveal-waiting:scale-x-0 reveal-shown:animate-grow-x motion-reduce:animate-none"
              style={delay(250)}
            />
            {tPage("title")}
          </p>
          {/* The employer page's main heading */}
          <h1 className="mt-5 text-[min(2.25rem,9vw)] leading-[1.1] font-semibold tracking-tight text-balance text-neutral-950 sm:text-5xl lg:text-[2.75rem] xl:text-5xl">
            <WordReveal
              text={t("heading")}
              delay={100}
              className="reveal-waiting:translate-y-[125%] reveal-shown:animate-word motion-reduce:animate-none"
            />
          </h1>
          <Link
            href={getLocalizedPath(locale, "/book")}
            className={cn(
              "group mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-neutral-950 pr-5 pl-6 text-[15px] font-semibold text-white transition-[background-color,color,translate,box-shadow] duration-300 ease-out outline-none hover:bg-brand hover:text-neutral-950 hover:shadow-[0_14px_28px_-12px_rgba(254,204,0,0.9)] focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 active:translate-y-0 motion-safe:hover:-translate-y-0.5",
              RISE_ON_REVEAL
            )}
            style={delay(450)}
          >
            {tCommon("book")}
            <ArrowRight
              aria-hidden
              className="size-4 transition-transform duration-300 ease-out-quint group-hover:translate-x-1"
            />
          </Link>
        </div>

        <ol ref={listRef} className="lg:col-span-7">
          {points.map((text, index) => (
            <Point
              key={index}
              index={index}
              text={text}
              active={index === active}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}
