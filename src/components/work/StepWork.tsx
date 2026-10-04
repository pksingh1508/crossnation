"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { SplitSection } from "@/components/sections/SplitSection";
import { fontInter } from "@/fonts";
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

/**
 * Paragraphs beside a yellow line that fills as they are read. The first paragraph is a
 * little larger, as a lead.
 */
function ReadingText({ paragraphs }: { paragraphs: string[] }) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [lead, ...rest] = paragraphs;

  // The line fills from when the text's top is three quarters down the screen until its
  // end is halfway up
  const { scrollYProgress: read } = useScroll({
    target: bodyRef,
    offset: ["start 0.75", "end 0.5"],
  });
  const lineScale = useTransform(read, (p) => (reduceMotion ? 1 : p));

  return (
    // A word too long for a phone's line (German has some) wraps, hyphenated there
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
          className={cn("leading-relaxed text-neutral-600", RISE_ON_REVEAL)}
          style={delay(350 + i * 100)}
        >
          {paragraph}
        </p>
      ))}
    </div>
  );
}

/**
 * A topic on the work, employer and recruiter pages: a photo next to a heading and up to
 * four paragraphs.
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
  const paragraphs = [paragraph1, paragraph2, paragraph3, paragraph4].filter(
    Boolean
  );

  return (
    <SplitSection
      image={image}
      imageAlt={imageAlt}
      heading={heading}
      isReversed={isReversed}
    >
      <ReadingText paragraphs={paragraphs} />
    </SplitSection>
  );
}
