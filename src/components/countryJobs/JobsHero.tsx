"use client";

import { ArrowRight, Phone } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { WordReveal } from "@/components/ui/word-reveal";
import {
  PHONE_LINK,
  WhatsAppLogo,
  whatsAppLink,
} from "@/components/layout/header-links";
import { fontInter } from "@/fonts";
import { delay, RISE_ON_REVEAL } from "@/lib/animation";
import { cn } from "@/lib/utils";
import { BoardingPass } from "./BoardingPass";
import type { CountryJobs } from "./types";

const WORD = "reveal-shown:animate-word motion-reduce:animate-none";

/** The page's main button: yellow, with a glow and a sliding arrow */
export const PRIMARY_BUTTON =
  "group/cta inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-[15px] font-semibold text-neutral-950 shadow-[0_10px_24px_-12px_rgba(254,204,0,0.95)] transition-[translate,box-shadow] duration-300 ease-out-quint outline-none hover:shadow-[0_16px_32px_-14px_rgba(254,204,0,1)] focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 motion-safe:hover:-translate-y-0.5";

/** The arrow inside PRIMARY_BUTTON */
export const BUTTON_ARROW =
  "size-4 transition-transform duration-300 ease-out-quint group-hover/cta:translate-x-1";

interface JobsHeroProps {
  country: CountryJobs;
  /** Scrolls to the application form */
  onApply: () => void;
}

/**
 * The top of the page: the country's name with a marker stroke under it, the ways to
 * apply, and the jobs at a glance on a boarding pass. It is on screen when the page opens,
 * so it plays its entrance with the first paint.
 */
export function JobsHero({ country, onApply }: JobsHeroProps) {
  const { name, place } = country;
  // "the" in "Jobs in the Czech Republic" stays out of the marker stroke
  const lead = `Jobs in ${place.slice(0, place.length - name.length)}`.trim();
  const nameStart = 100 + lead.split(" ").length * 70;

  return (
    <section
      data-reveal="shown"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden"
    >
      {/* A faint dotted field behind the pass */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle,var(--color-neutral-300)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_70%_60%_at_75%_45%,black,transparent)] bg-[length:22px_22px]"
      />

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-14 px-4 pt-10 pb-20 sm:pt-14 lg:grid-cols-12 lg:gap-10 lg:pt-16 lg:pb-28">
        <div className="lg:col-span-7">
          <Eyebrow>Europe’s premier immigration company</Eyebrow>

          <h1
            id="hero-title"
            className="mt-6 text-[min(3.25rem,12.5vw)] leading-[1.02] font-semibold tracking-tight text-neutral-950 sm:text-6xl xl:text-7xl"
          >
            <WordReveal text={lead} delay={100} className={WORD} />{" "}
            <span
              className="box-decoration-clone bg-[linear-gradient(var(--color-brand),var(--color-brand))] bg-[length:100%_0.3em] bg-[position:0_88%] bg-no-repeat reveal-shown:animate-mark motion-reduce:animate-none"
              style={delay(nameStart + 250)}
            >
              <WordReveal text={name} delay={nameStart} className={WORD} />
            </span>
          </h1>

          <p
            className={cn(
              "mt-7 max-w-xl text-lg leading-relaxed text-pretty text-neutral-600 sm:text-xl",
              fontInter.className,
              RISE_ON_REVEAL
            )}
            style={delay(500)}
          >
            Your EU career starts here. See the open jobs, what they pay, and
            how we handle your work permit and visa, step by step.
          </p>

          {/* On phones each button takes the full width */}
          <div
            className={cn("mt-9 flex flex-wrap gap-3", RISE_ON_REVEAL)}
            style={delay(620)}
          >
            <a
              href="#apply"
              onClick={(event) => {
                event.preventDefault();
                onApply();
              }}
              className={cn(PRIMARY_BUTTON, "max-sm:w-full")}
            >
              Apply now
              <ArrowRight aria-hidden className={BUTTON_ARROW} />
            </a>
            <a
              href={whatsAppLink(`Hello, I am interested in jobs in ${place}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full px-6 py-3 text-[15px] max-sm:w-full font-semibold text-neutral-950 ring-1 ring-neutral-300 transition-[background-color,box-shadow,translate] duration-300 ease-out-quint outline-none hover:bg-neutral-50 hover:ring-neutral-950 focus-visible:ring-2 focus-visible:ring-neutral-950 motion-safe:hover:-translate-y-0.5"
            >
              <WhatsAppLogo className="size-[18px] text-[#25d366]" />
              Chat on WhatsApp
            </a>
          </div>

          <p
            className={cn(
              "mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-neutral-500",
              fontInter.className,
              RISE_ON_REVEAL
            )}
            style={delay(720)}
          >
            <Phone aria-hidden className="size-4 text-neutral-400" />
            Prefer to talk? Call us on
            <a
              href={PHONE_LINK.href}
              className="rounded-sm font-medium whitespace-nowrap text-neutral-950 underline decoration-brand decoration-2 underline-offset-4 transition-[text-decoration-color] duration-300 outline-none hover:decoration-neutral-950 focus-visible:ring-2 focus-visible:ring-neutral-950"
            >
              {PHONE_LINK.label}
            </a>
          </p>
        </div>

        <div className="lg:col-span-5">
          <BoardingPass country={country} start={350} />
        </div>
      </div>
    </section>
  );
}
