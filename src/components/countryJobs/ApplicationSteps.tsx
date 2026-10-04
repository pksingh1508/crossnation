"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";
import { fontInter } from "@/fonts";
import { delay, RISE_ON_REVEAL } from "@/lib/animation";
import { cn } from "@/lib/utils";
import { BUTTON_ARROW, PRIMARY_BUTTON } from "./JobsHero";
import { SectionIntro } from "./SectionIntro";
import type { CountryJobs } from "./types";

/** How many steps the filling line has reached, at a progress from 0 to 1 */
const countReached = (marks: number[], progress: number) =>
  progress > 0 ? marks.filter((mark) => mark <= progress + 0.001).length : 0;

interface ApplicationStepsProps {
  country: CountryJobs;
  /** Scrolls to the application form */
  onApply: () => void;
}

/**
 * The application, step by step, as a timeline. While it scrolls past, a yellow line fills
 * down it and each step's number lights up as the line reaches it. On larger screens the
 * heading stays in view beside the steps.
 */
export function ApplicationSteps({ country, onApply }: ApplicationStepsProps) {
  const { steps } = country;
  const titleId = useId();
  const [ref, reveal] = useReveal<HTMLDivElement>();

  return (
    <section
      id="process"
      aria-labelledby={titleId}
      className="scroll-mt-20 bg-white py-20 sm:py-24"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-start gap-12 px-4 lg:grid-cols-12 lg:gap-10">
        <div className="lg:sticky lg:top-28 lg:col-span-5">
          <SectionIntro
            id={titleId}
            eyebrow="Application process"
            title={steps.title}
            description={`${steps.items.length} steps, and we guide you through every one of them.`}
          />
          <div ref={ref} data-reveal={reveal}>
            <a
              href="#apply"
              onClick={(event) => {
                event.preventDefault();
                onApply();
              }}
              className={cn(PRIMARY_BUTTON, "mt-8", RISE_ON_REVEAL)}
              style={delay(400)}
            >
              Apply now
              <ArrowRight aria-hidden className={BUTTON_ARROW} />
            </a>
          </div>
        </div>

        <Timeline
          steps={steps.items}
          className="lg:col-span-6 lg:col-start-7"
        />
      </div>
    </section>
  );
}

function Timeline({
  steps,
  className,
}: {
  steps: string[];
  className?: string;
}) {
  const listRef = useRef<HTMLOListElement>(null);
  const reduceMotion = useReducedMotion();
  const [ref, reveal] = useReveal<HTMLDivElement>();
  // The filling line runs from the first number's centre to the last one's
  const [line, setLine] = useState<{ top: number; height: number }>();
  // Where each number sits along the line, from 0 to 1
  const [marks, setMarks] = useState<number[]>([]);
  const [reached, setReached] = useState(0);

  // It fills from when the list's top is 70% down the window until its end is 55% down
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 0.7", "end 0.55"],
  });
  const fill = useTransform(scrollYProgress, (p) => (reduceMotion ? 1 : p));

  useMotionValueEvent(fill, "change", (progress) =>
    setReached(countReached(marks, progress))
  );

  // The numbers move when the text wraps differently, so they are measured on resize
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const measure = () => {
      const top = list.getBoundingClientRect().top;
      const centres = [
        ...list.querySelectorAll<HTMLElement>("[data-step-number]"),
      ].map((number) => {
        const box = number.getBoundingClientRect();
        return box.top - top + box.height / 2;
      });
      const first = centres[0] ?? 0;
      const height = (centres.at(-1) ?? 0) - first;
      setLine({ top: first, height });
      setMarks(
        centres.map((centre) => (height ? (centre - first) / height : 0))
      );
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    return () => observer.disconnect();
  }, []);

  // Once measured (and with reduced motion, filled), the steps show their state at once
  useEffect(() => {
    setReached(countReached(marks, fill.get()));
  }, [marks, fill]);

  return (
    <div ref={ref} data-reveal={reveal} className={className}>
      {/* isolate: the grey tracks sit behind the yellow line, inside the list */}
      <ol ref={listRef} className="relative isolate">
        {line && (
          <motion.span
            aria-hidden
            className="absolute left-[21px] w-0.5 origin-top rounded-full bg-brand"
            style={{ top: line.top, height: line.height, scaleY: fill }}
          />
        )}
        {steps.map((step, index) => {
          const isReached = index < reached;
          return (
            <li
              key={step}
              className={cn(
                "relative flex gap-5 pb-9 last:pb-0 sm:gap-6",
                RISE_ON_REVEAL
              )}
              style={delay(80 + Math.min(index, 8) * 60)}
            >
              {/* The grey track between this number and the next */}
              {index < steps.length - 1 && (
                <span
                  aria-hidden
                  className="absolute top-11 bottom-0 left-[21px] -z-10 w-0.5 bg-neutral-200"
                />
              )}
              <span
                data-step-number
                data-reached={isReached || undefined}
                className="grid size-11 shrink-0 place-items-center rounded-full bg-white text-sm font-semibold text-neutral-500 tabular-nums ring-1 ring-neutral-300 transition-[background-color,color,box-shadow,scale] duration-500 ease-out-quint ring-inset data-reached:bg-brand data-reached:text-neutral-950 data-reached:shadow-[0_0_0_6px_rgba(254,204,0,0.22)] data-reached:ring-brand"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <p
                className={cn(
                  "min-w-0 pt-2.5 text-lg leading-snug text-pretty transition-colors duration-500",
                  isReached ? "text-neutral-950" : "text-neutral-500",
                  fontInter.className
                )}
              >
                {step}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
