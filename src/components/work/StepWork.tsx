"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useReveal } from "@/hooks/useReveal";
import { WordReveal } from "@/components/ui/word-reveal";
import { fontInter, fontPoppins } from "@/fonts";
import { delay, RISE_ON_REVEAL } from "@/lib/animation";
import { cn } from "@/lib/utils";

interface StepWorkProps {
  image: string;
  imageAlt?: string;
  heading: string;
  /** Empty paragraphs are left out */
  paragraph1: string;
  paragraph2: string;
  paragraph3: string;
  paragraph4: string;
  /** Photo on the right on large screens */
  isReversed?: boolean;
}

// The work page's steps are headed "Step 1: Apply for Work Permit" in every language
// ("Krok 1:", "Étape 1 :" ...). The part up to the number becomes a label above the title.
const STEP = /^(.+?\d+)\s*:\s*(.+)$/;

/**
 * A topic on the work, employer and recruiter pages: a photo next to a heading and up to
 * four paragraphs. Text and photo reveal on scroll. From lg up the photo stays in view
 * while the longer text scrolls past, and a yellow line beside the text fills as it is
 * read.
 */
export function StepWork({
  image,
  imageAlt = "Step illustration",
  heading,
  paragraph1,
  paragraph2,
  paragraph3,
  paragraph4,
  isReversed = false,
}: StepWorkProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const [textRef, textReveal] = useReveal<HTMLDivElement>();
  const [photoRef, photoReveal] = useReveal<HTMLDivElement>();
  const reduceMotion = useReducedMotion();

  const match = heading.match(STEP);
  const step = match?.[1];
  const title = match?.[2] ?? heading;
  const [lead, ...rest] = [
    paragraph1,
    paragraph2,
    paragraph3,
    paragraph4,
  ].filter(Boolean);

  // While the section passes the screen, the photo drifts down inside its frame. The
  // photo is 12% taller than the frame, so its edges never show.
  const { scrollYProgress: passing } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const photoY = useTransform(passing, (p) =>
    reduceMotion ? "0%" : `${(p - 0.5) * 10}%`
  );

  // The line fills from when the text's top is three quarters down the screen until its
  // end is halfway up
  const { scrollYProgress: read } = useScroll({
    target: bodyRef,
    offset: ["start 0.75", "end 0.5"],
  });
  const lineScale = useTransform(read, (p) => (reduceMotion ? 1 : p));

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

          {/* A word too long for a phone's line (German has some) wraps, hyphenated
              there */}
          <div
            ref={bodyRef}
            className={cn(
              "relative mt-8 space-y-5 pl-6 wrap-break-word max-sm:hyphens-auto sm:pl-8",
              fontInter.className
            )}
          >
            {/* The reading line: a grey track and its yellow fill */}
            <span
              aria-hidden
              className="absolute inset-y-1 left-0 w-0.5 rounded-full bg-neutral-100"
            />
            <motion.span
              aria-hidden
              className="absolute inset-y-1 left-0 w-0.5 origin-top rounded-full bg-brand"
              style={{ scaleY: lineScale }}
            />

            {lead && (
              <p
                className={cn(
                  "leading-relaxed text-neutral-700 sm:text-lg",
                  RISE_ON_REVEAL
                )}
                style={delay(250)}
              >
                {lead}
              </p>
            )}
            {rest.map((paragraph, i) => (
              <p
                key={i}
                className={cn(
                  "leading-relaxed text-neutral-600",
                  RISE_ON_REVEAL
                )}
                style={delay(350 + i * 100)}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
