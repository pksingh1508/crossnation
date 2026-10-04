"use client";

import { useId } from "react";
import { Building2, Landmark, type LucideIcon } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";
import { fontInter } from "@/fonts";
import { delay, RISE_ON_REVEAL } from "@/lib/animation";
import { cn } from "@/lib/utils";
import { SectionIntro } from "./SectionIntro";
import type { Processing, ProcessingStage } from "./types";

/**
 * How long the work permit and the visa take: a card for each, with its usual time as a
 * span on a scale both cards share, so the two compare at a glance.
 */
export function ProcessingTimes({ processing }: { processing: Processing }) {
  const titleId = useId();
  const { permit, visa } = processing;
  // The scale ends at the next ten above the longest time
  const scale = Math.ceil(Math.max(permit.days[1], visa.days[1]) / 10) * 10;

  return (
    <section aria-labelledby={titleId} className="bg-white px-4 pb-6 sm:pb-10">
      <div className="mx-auto w-full max-w-7xl rounded-[2.5rem] bg-neutral-50 px-6 py-16 ring-1 ring-black/5 sm:px-12 sm:py-20 lg:px-16">
        <SectionIntro
          id={titleId}
          eyebrow="Processing guide"
          title={processing.title}
          description={processing.description}
        />
        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-2">
          <StageCard stage={permit} icon={Building2} scale={scale} start={0} />
          <StageCard stage={visa} icon={Landmark} scale={scale} start={120} />
        </div>
      </div>
    </section>
  );
}

interface StageCardProps {
  stage: ProcessingStage;
  icon: LucideIcon;
  /** The scale's end, in working days */
  scale: number;
  /** When its entrance starts after it comes into view, in ms */
  start: number;
}

function StageCard({ stage, icon: Icon, scale, start }: StageCardProps) {
  const [ref, reveal] = useReveal<HTMLElement>();
  const [from, to] = stage.days;

  return (
    <article
      ref={ref}
      data-reveal={reveal}
      className={cn(
        "flex flex-col rounded-[2rem] bg-white p-7 ring-1 ring-black/5 sm:p-9",
        RISE_ON_REVEAL
      )}
      style={delay(start)}
    >
      <div className="flex items-center gap-4">
        <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-neutral-100 text-neutral-800">
          <Icon aria-hidden className="size-5" />
        </span>
        <h3 className="text-xl leading-snug font-semibold text-balance text-neutral-950">
          {stage.title}
        </h3>
      </div>
      <p
        className={cn(
          "mt-5 leading-relaxed text-pretty text-neutral-600",
          fontInter.className
        )}
      >
        {stage.description}
      </p>

      {/* The usual time, as a span on the shared scale */}
      <div className="mt-8">
        <p className="flex items-baseline gap-2 text-neutral-950">
          <span className="text-4xl font-semibold tracking-tight tabular-nums sm:text-5xl">
            {from}–{to}
          </span>
          <span className={cn("text-neutral-500", fontInter.className)}>
            working days
          </span>
        </p>
        <div aria-hidden className="mt-4">
          <div className="relative h-2.5 rounded-full bg-neutral-100">
            <span
              className="absolute inset-y-0 origin-left rounded-full bg-brand reveal-waiting:scale-x-0 reveal-shown:animate-grow-x motion-reduce:animate-none"
              style={{
                left: `${(from / scale) * 100}%`,
                width: `${((to - from) / scale) * 100}%`,
                ...delay(start + 300),
              }}
            />
          </div>
          <div
            className={cn(
              "mt-2 flex justify-between text-xs text-neutral-400 tabular-nums",
              fontInter.className
            )}
          >
            <span>0</span>
            <span>{scale} days</span>
          </div>
        </div>
      </div>

      <ul
        className={cn(
          "mt-8 space-y-3 border-t border-neutral-100 pt-6 text-[15px] leading-relaxed text-neutral-600",
          fontInter.className
        )}
      >
        {stage.points.map((point) => (
          <li key={point} className="relative pl-5 text-pretty">
            <span
              aria-hidden
              className="absolute top-[0.5lh] left-0 size-1.5 -translate-y-1/2 rounded-full bg-brand ring-4 ring-brand/20"
            />
            {point}
          </li>
        ))}
      </ul>
    </article>
  );
}
