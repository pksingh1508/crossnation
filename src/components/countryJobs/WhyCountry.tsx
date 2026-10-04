"use client";

import { useId } from "react";
import { useReveal } from "@/hooks/useReveal";
import { fontInter } from "@/fonts";
import { delay, RISE_ON_REVEAL } from "@/lib/animation";
import { cn } from "@/lib/utils";
import { SectionIntro } from "./SectionIntro";
import type { CountryJobs, IconText, TitledList } from "./types";

/** Items this short sit two to a row */
const SHORT_ITEM = 40;

/**
 * Why work there, on a dark panel: two lists of reasons side by side, each item with a
 * yellow icon. The country's code stands huge and faint in a corner.
 */
export function WhyCountry({ country }: { country: CountryJobs }) {
  const titleId = useId();

  return (
    <section aria-labelledby={titleId} className="bg-white px-4 py-6 sm:py-10">
      <div className="relative isolate mx-auto w-full max-w-7xl overflow-hidden rounded-[2.5rem] bg-neutral-950 px-6 py-16 sm:px-12 sm:py-20 lg:px-16">
        <p
          aria-hidden
          className="pointer-events-none absolute -right-4 -bottom-[0.18em] -z-10 text-[min(14rem,40vw)] leading-none font-semibold tracking-tighter text-white/[0.04] select-none"
        >
          {country.code3}
        </p>

        <SectionIntro
          id={titleId}
          dark
          eyebrow={`Why ${country.place}`}
          title={`Why work in ${country.place}?`}
        />

        <div className="mt-14 grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-12">
          {country.why.map((list, index) => (
            <ReasonList key={list.title} list={list} start={index * 120} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ReasonList({
  list,
  start,
}: {
  list: TitledList<IconText>;
  /** When its entrance starts after it comes into view, in ms */
  start: number;
}) {
  const [ref, reveal] = useReveal<HTMLDivElement>();
  const short = list.items.every((item) => item.text.length <= SHORT_ITEM);

  return (
    <div ref={ref} data-reveal={reveal}>
      <h3
        className={cn(
          "text-xl leading-snug font-semibold text-balance text-white sm:text-2xl",
          RISE_ON_REVEAL
        )}
        style={delay(start)}
      >
        {list.title}
      </h3>
      {list.description && (
        <p
          className={cn(
            "mt-3 leading-relaxed text-pretty text-white/60",
            fontInter.className,
            RISE_ON_REVEAL
          )}
          style={delay(start + 80)}
        >
          {list.description}
        </p>
      )}
      {/* Short reasons sit two to a row; on phones each one's icon is above its text */}
      <ul
        className={cn("mt-7 grid gap-3", short ? "grid-cols-2" : "grid-cols-1")}
      >
        {list.items.map(({ text, icon: Icon }, index) => (
          <li
            key={text}
            className={cn(
              "group/reason flex gap-3.5 rounded-2xl bg-white/[0.04] p-3.5 pr-4 ring-1 ring-white/10 transition-[background-color,box-shadow] duration-300 hover:bg-white/[0.08] hover:ring-white/20",
              short
                ? "flex-col max-sm:items-start sm:flex-row sm:items-center"
                : "items-center",
              RISE_ON_REVEAL
            )}
            style={delay(start + 160 + index * 60)}
          >
            {/* The icon pops in just after its row */}
            <span
              className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand text-neutral-950 transition-transform duration-300 ease-out-quint reveal-shown:animate-pop motion-reduce:animate-none motion-safe:group-hover/reason:-rotate-6"
              style={delay(start + 300 + index * 60)}
            >
              <Icon aria-hidden className="size-[18px]" />
            </span>
            <span
              className={cn(
                "min-w-0 leading-snug text-pretty text-white/85",
                short ? "font-medium" : "text-[15px]",
                !short && fontInter.className
              )}
            >
              {text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
