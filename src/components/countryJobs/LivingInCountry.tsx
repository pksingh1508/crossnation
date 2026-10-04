"use client";

import { useId } from "react";
import { BedDouble, Check, Coins, type LucideIcon } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";
import { fontInter } from "@/fonts";
import { delay, RISE_ON_REVEAL } from "@/lib/animation";
import { cn } from "@/lib/utils";
import { SectionIntro } from "./SectionIntro";
import { formatEuro } from "./standard";
import type { Living, TitledList } from "./types";

/**
 * Life there: what it offers, the housing, and what jobs pay, with example salaries as
 * spans on one scale.
 */
export function LivingInCountry({
  living,
  place,
}: {
  living: Living;
  place: string;
}) {
  const titleId = useId();
  const { life, accommodation, salary } = living;

  return (
    <section aria-labelledby={titleId} className="bg-white py-20 sm:py-24">
      <div className="mx-auto w-full max-w-7xl px-4">
        <SectionIntro
          id={titleId}
          eyebrow={`Living in ${place}`}
          title={life.title}
        />

        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-12">
          {/* Its title is the section's heading */}
          <Checklist
            list={life}
            className="lg:col-span-7"
            listClassName="sm:grid-cols-2"
          />
          <Checklist
            list={accommodation}
            icon={BedDouble}
            className="bg-neutral-50 lg:col-span-5"
            start={120}
          />
          <SalaryCard salary={salary} className="lg:col-span-12" />
        </div>
      </div>
    </section>
  );
}

/** A card of ticked items; with an icon, it shows its own title */
function Checklist({
  list,
  icon: Icon,
  className,
  listClassName,
  start = 0,
}: {
  list: TitledList;
  icon?: LucideIcon;
  className?: string;
  listClassName?: string;
  start?: number;
}) {
  const [ref, reveal] = useReveal<HTMLElement>();

  return (
    <article
      ref={ref}
      data-reveal={reveal}
      className={cn(
        "rounded-[2rem] p-7 ring-1 ring-black/10 sm:p-9",
        RISE_ON_REVEAL,
        className
      )}
      style={delay(start)}
    >
      {Icon && (
        <div className="mb-7 flex items-center gap-4">
          <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand text-neutral-950">
            <Icon aria-hidden className="size-5" />
          </span>
          <h3 className="text-xl font-semibold text-neutral-950">
            {list.title}
          </h3>
        </div>
      )}
      <ul
        className={cn(
          "grid grid-cols-1 gap-x-8 gap-y-4 leading-relaxed text-neutral-700",
          fontInter.className,
          listClassName
        )}
      >
        {list.items.map((item, index) => (
          <li
            key={item}
            className={cn("flex items-start gap-3", RISE_ON_REVEAL)}
            style={delay(start + 120 + index * 50)}
          >
            <span className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-brand-soft text-neutral-900">
              <Check aria-hidden strokeWidth={3} className="size-3" />
            </span>
            <span className="min-w-0 text-pretty">{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function SalaryCard({
  salary,
  className,
}: {
  salary: Living["salary"];
  className?: string;
}) {
  const [ref, reveal] = useReveal<HTMLElement>();
  const { examples } = salary;
  // The scale ends at the next 500 above the highest salary
  const scale =
    Math.ceil(Math.max(...examples.items.map((item) => item.max)) / 500) * 500;

  return (
    <article
      ref={ref}
      data-reveal={reveal}
      className={cn(
        "grid grid-cols-1 gap-10 rounded-[2rem] bg-neutral-950 p-7 text-white sm:p-10 lg:grid-cols-2 lg:gap-14",
        RISE_ON_REVEAL,
        className
      )}
    >
      <div>
        <div className="flex items-center gap-4">
          <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand text-neutral-950">
            <Coins aria-hidden className="size-5" />
          </span>
          <h3 className="text-xl font-semibold">{salary.title}</h3>
        </div>
        <ul
          className={cn(
            "mt-7 space-y-3.5 leading-relaxed text-white/75",
            fontInter.className
          )}
        >
          {salary.items.map((item, index) => (
            <li
              key={item}
              className={cn("relative pl-5 text-pretty", RISE_ON_REVEAL)}
              style={delay(120 + index * 50)}
            >
              <span
                aria-hidden
                className="absolute top-[0.5lh] left-0 size-1.5 -translate-y-1/2 rounded-full bg-brand"
              />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-3xl bg-white/[0.04] p-6 ring-1 ring-white/10 sm:p-8">
        <h4 className="text-xs font-semibold tracking-[0.18em] text-white/55 uppercase">
          {examples.title}
        </h4>
        <ul className="mt-6 space-y-6">
          {examples.items.map(({ role, min, max }, index) => (
            <li key={role}>
              <p className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <span className="font-medium">{role}</span>
                <span className="font-semibold text-brand tabular-nums">
                  {formatEuro(min)}–{formatEuro(max)}
                </span>
              </p>
              <div
                aria-hidden
                className="relative mt-2.5 h-2 rounded-full bg-white/10"
              >
                <span
                  className="absolute inset-y-0 origin-left rounded-full bg-brand reveal-waiting:scale-x-0 reveal-shown:animate-grow-x motion-reduce:animate-none"
                  style={{
                    left: `${(min / scale) * 100}%`,
                    width: `${((max - min) / scale) * 100}%`,
                    ...delay(350 + index * 150),
                  }}
                />
              </div>
            </li>
          ))}
        </ul>
        <div
          aria-hidden
          className={cn(
            "mt-3 flex justify-between text-xs text-white/40 tabular-nums",
            fontInter.className
          )}
        >
          <span>{formatEuro(0)}</span>
          <span>{formatEuro(scale)}</span>
        </div>
      </div>
    </article>
  );
}
