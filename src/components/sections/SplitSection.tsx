"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useReveal } from "@/hooks/useReveal";
import { WordReveal } from "@/components/ui/word-reveal";
import { fontPoppins } from "@/fonts";
import { delay, RISE_ON_REVEAL } from "@/lib/animation";
import { cn } from "@/lib/utils";

interface SplitSectionProps {
  image: string;
  imageAlt: string;
  heading: string;
  /** Photo on the right on large screens */
  isReversed?: boolean;
  /**
   * The text under the heading. It is inside the text's reveal block, so it can use the
   * reveal-waiting: and reveal-shown: variants; start its animations from about 250ms.
   */
  children: ReactNode;
}

// The work page's steps are headed "Step 1: Apply for Work Permit" in every language
// ("Krok 1:", "Étape 1 :" ...). The part up to the number becomes a label above the title.
const STEP = /^(.+?\d+)\s*:\s*(.+)$/;

/**
 * A photo next to a heading and its text: the topics of the work, employer, recruiter and
 * jobseeker pages. Text and photo reveal on scroll. From lg up the photo stays in view
 * while longer text scrolls past.
 */
export function SplitSection({
  image,
  imageAlt,
  heading,
  isReversed = false,
  children,
}: SplitSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [textRef, textReveal] = useReveal<HTMLDivElement>();
  const [photoRef, photoReveal] = useReveal<HTMLDivElement>();
  const reduceMotion = useReducedMotion();

  const match = heading.match(STEP);
  const step = match?.[1];
  const title = match?.[2] ?? heading;

  // While the section passes the screen, the photo drifts down inside its frame. The
  // photo is 12% taller than the frame, so its edges never show.
  const { scrollYProgress: passing } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const photoY = useTransform(passing, (p) =>
    reduceMotion ? "0%" : `${(p - 0.5) * 10}%`
  );

  return (
    <section
      ref={sectionRef}
      className={cn("bg-white py-12 sm:py-14 lg:py-16", fontPoppins.className)}
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-start gap-10 px-4 lg:grid-cols-2 lg:gap-16 xl:gap-24">
        <div
          ref={photoRef}
          data-reveal={photoReveal}
          className={cn(
            "mx-auto w-full max-w-xl lg:sticky lg:top-28 lg:max-w-none",
            isReversed && "lg:order-last"
          )}
        >
          {/* The frame wipes open while the photo inside settles from a slight zoom */}
          <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-neutral-100 reveal-waiting:[clip-path:inset(100%_0_0_0)] reveal-shown:animate-reveal motion-reduce:animate-none">
            <motion.div
              className="absolute inset-x-0 -inset-y-[6%]"
              style={{ y: photoY }}
            >
              <Image
                src={image}
                alt={imageAlt}
                fill
                sizes="(min-width: 1280px) 576px, (min-width: 1024px) 45vw, (min-width: 640px) 576px, 100vw"
                className="object-cover reveal-waiting:scale-[1.12] reveal-shown:animate-settle motion-reduce:animate-none"
              />
            </motion.div>
            {/* A faint edge, so photos with a white background don't melt into the page */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-black/5 ring-inset"
            />
          </div>
        </div>

        <div
          ref={textRef}
          data-reveal={textReveal}
          className="mx-auto w-full max-w-xl lg:mx-0"
        >
          <h2 className="text-[min(2.25rem,9vw)] leading-[1.1] font-semibold tracking-tight text-neutral-950 sm:text-5xl">
            {step && (
              <span
                className={cn(
                  "mb-5 flex items-center gap-3 text-sm leading-none font-semibold tracking-[0.2em] text-neutral-400 uppercase",
                  RISE_ON_REVEAL
                )}
              >
                <span
                  aria-hidden
                  className="h-0.5 w-8 shrink-0 origin-left rounded-full bg-brand reveal-waiting:scale-x-0 reveal-shown:animate-grow-x motion-reduce:animate-none"
                  style={delay(250)}
                />
                {step}
              </span>
            )}
            <WordReveal
              text={title}
              delay={100}
              className="reveal-waiting:translate-y-[125%] reveal-shown:animate-word motion-reduce:animate-none"
            />
          </h2>

          {children}
        </div>
      </div>
    </section>
  );
}
