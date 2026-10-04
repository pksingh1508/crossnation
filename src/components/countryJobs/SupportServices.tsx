"use client";

import { useId } from "react";
import {
  Check,
  PlaneLanding,
  PlaneTakeoff,
  type LucideIcon,
} from "lucide-react";
import { useReveal } from "@/hooks/useReveal";
import { fontInter } from "@/fonts";
import { delay, RISE_ON_REVEAL } from "@/lib/animation";
import { cn } from "@/lib/utils";
import { SectionIntro } from "./SectionIntro";
import type { CountryJobs, TitledList } from "./types";

type Services = NonNullable<CountryJobs["services"]>;

/** Our help before the move and after it, side by side */
export function SupportServices({ services }: { services: Services }) {
  const titleId = useId();

  return (
    <section aria-labelledby={titleId} className="bg-white py-20 sm:py-24">
      <div className="mx-auto w-full max-w-7xl px-4">
        <SectionIntro
          id={titleId}
          eyebrow="Support services"
          title={services.title}
          description={services.description}
        />
        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-2">
          <ServiceCard
            list={services.before}
            icon={PlaneTakeoff}
            stage="Before you travel"
            start={0}
          />
          <ServiceCard
            list={services.after}
            icon={PlaneLanding}
            stage="After you arrive"
            start={120}
          />
        </div>
      </div>
    </section>
  );
}

interface ServiceCardProps {
  list: TitledList;
  icon: LucideIcon;
  /** A short label above the title */
  stage: string;
  /** When its entrance starts after it comes into view, in ms */
  start: number;
}

function ServiceCard({ list, icon: Icon, stage, start }: ServiceCardProps) {
  const [ref, reveal] = useReveal<HTMLElement>();

  return (
    <article
      ref={ref}
      data-reveal={reveal}
      className={cn(
        "rounded-[2rem] bg-white p-7 ring-1 ring-black/10 sm:p-9",
        RISE_ON_REVEAL
      )}
      style={delay(start)}
    >
      <div className="flex items-center gap-4">
        <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand text-neutral-950 shadow-[0_14px_28px_-12px_rgba(254,204,0,0.9)]">
          <Icon aria-hidden className="size-5" />
        </span>
        <div className="min-w-0">
          <p className="text-xs font-semibold tracking-[0.18em] text-neutral-500 uppercase">
            {stage}
          </p>
          <h3 className="mt-1 text-xl leading-snug font-semibold text-balance text-neutral-950">
            {list.title}
          </h3>
        </div>
      </div>
      <ul
        className={cn(
          "mt-8 space-y-3.5 leading-snug text-neutral-700",
          fontInter.className
        )}
      >
        {list.items.map((item, index) => (
          <li
            key={item}
            className={cn("flex items-start gap-3", RISE_ON_REVEAL)}
            style={delay(start + 150 + index * 45)}
          >
            <span className="mt-px grid size-5 shrink-0 place-items-center rounded-full bg-brand-soft text-neutral-900">
              <Check aria-hidden strokeWidth={3} className="size-3" />
            </span>
            <span className="min-w-0 text-pretty">{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
