"use client";

import {
  FileCheck2,
  PlaneLanding,
  Search,
  ShieldCheck,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "@/hooks/useTranslations";
import { useReveal } from "@/hooks/useReveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { WordReveal } from "@/components/ui/word-reveal";
import { fontInter, fontPoppins } from "@/fonts";
import { delay, RISE_ON_REVEAL } from "@/lib/animation";
import { cn } from "@/lib/utils";

// The five sentences of jobseeker.info, shown as the stages of a candidate's journey
const STAGES: { key: string; icon: LucideIcon }[] = [
  { key: "paragraph1", icon: Search }, // finding a legal job
  { key: "paragraph2", icon: FileCheck2 }, // permits, visa and documents
  { key: "paragraph3", icon: PlaneLanding }, // travel, arrival and registration
  { key: "paragraph4", icon: ShieldCheck }, // a placement within the law
  { key: "paragraph5", icon: TrendingUp }, // building a career
];

/** Time between two stages coming in, in ms */
const STAGE_GAP = 300;

/**
 * The jobseeker page's introduction: its main heading and the candidate's journey with
 * us, from finding a job to building a career. The stages come in one after another,
 * each line drawing on to the next stage: across the page from lg up, down it below.
 */
export default function JobseekerInfo() {
  const t = useTranslations("jobseeker.info");
  const tPage = useTranslations("pages.jobseeker");
  const [headRef, headReveal] = useReveal<HTMLDivElement>();
  const [pathRef, pathReveal] = useReveal<HTMLOListElement>();

  return (
    <section
      className={cn("bg-neutral-50 py-20 sm:py-24", fontPoppins.className)}
    >
      <div className="mx-auto w-full max-w-7xl px-4">
        <div
          ref={headRef}
          data-reveal={headReveal}
          className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end lg:gap-16"
        >
          <div className="lg:col-span-7">
            <Eyebrow>{tPage("title")}</Eyebrow>
            {/* The jobseeker page's main heading */}
            <h1 className="mt-5 text-[min(2.25rem,9vw)] leading-[1.1] font-semibold tracking-tight text-balance text-neutral-950 sm:text-5xl">
              <WordReveal
                text={t("heading")}
                delay={100}
                className="reveal-waiting:translate-y-[125%] reveal-shown:animate-word motion-reduce:animate-none"
              />
            </h1>
          </div>
          <p
            className={cn(
              "leading-relaxed text-neutral-600 sm:text-lg lg:col-span-5",
              fontInter.className,
              RISE_ON_REVEAL
            )}
            style={delay(300)}
          >
            {t("title")}
          </p>
        </div>

        <ol
          ref={pathRef}
          data-reveal={pathReveal}
          className="mt-14 grid grid-cols-1 gap-8 sm:mt-16 lg:grid-cols-5 lg:gap-6"
        >
          {STAGES.map(({ key, icon: Icon }, index) => (
            <li key={key} className="relative flex gap-5 lg:flex-col">
              {/* The line on to the next stage. It leaves 8px around the icons: down
                  from below this icon, or across from its right edge on large screens. */}
              {index < STAGES.length - 1 && (
                <span
                  aria-hidden
                  className="absolute top-14 -bottom-6 left-6 w-0.5 -translate-x-1/2 origin-top rounded-full bg-brand reveal-waiting:scale-y-0 reveal-shown:animate-grow-y motion-reduce:animate-none lg:top-6 lg:-right-4 lg:bottom-auto lg:left-14 lg:h-0.5 lg:w-auto lg:translate-x-0 lg:-translate-y-1/2 lg:origin-left lg:reveal-waiting:scale-x-0 lg:reveal-waiting:scale-y-100 lg:reveal-shown:animate-grow-x"
                  style={delay(index * STAGE_GAP + 350)}
                />
              )}
              <span
                className="relative grid size-12 shrink-0 place-items-center rounded-full bg-white text-neutral-900 ring-1 ring-neutral-200 reveal-waiting:opacity-0 reveal-shown:animate-pop motion-reduce:animate-none"
                style={delay(index * STAGE_GAP + 150)}
              >
                <Icon aria-hidden className="size-5" />
              </span>
              <div
                className={cn("min-w-0 pt-1 lg:pt-0", RISE_ON_REVEAL)}
                style={delay(index * STAGE_GAP + 250)}
              >
                <p
                  aria-hidden
                  className="text-xs font-semibold tracking-[0.2em] text-neutral-400 tabular-nums"
                >
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p
                  className={cn(
                    "mt-2 leading-relaxed wrap-break-word text-neutral-700",
                    fontInter.className
                  )}
                >
                  {t(key)}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
