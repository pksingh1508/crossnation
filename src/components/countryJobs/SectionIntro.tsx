"use client";

import { useReveal } from "@/hooks/useReveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { WordReveal } from "@/components/ui/word-reveal";
import { fontInter } from "@/fonts";
import { delay, RISE_ON_REVEAL } from "@/lib/animation";
import { cn } from "@/lib/utils";

interface SectionIntroProps {
  eyebrow: string;
  title: string;
  description?: string;
  /** For the heading, e.g. for the section's aria-labelledby */
  id?: string;
  /** White text, for a dark panel */
  dark?: boolean;
  className?: string;
}

/**
 * A section's label, heading and short text. They appear when they scroll into view: the
 * label's line grows, the heading's words slide up, the text rises. The heading takes the
 * focus when a link scrolls to its section.
 */
export function SectionIntro({
  eyebrow,
  title,
  description,
  id,
  dark = false,
  className,
}: SectionIntroProps) {
  const [ref, reveal] = useReveal<HTMLDivElement>();

  return (
    <div ref={ref} data-reveal={reveal} className={className}>
      <Eyebrow className={cn(dark && "text-white/60")}>{eyebrow}</Eyebrow>
      {/* On small phones the size follows the screen width */}
      <h2
        id={id}
        tabIndex={-1}
        className={cn(
          "mt-5 text-[min(2rem,8.5vw)] leading-[1.1] font-semibold tracking-tight text-balance outline-none sm:text-4xl lg:text-[2.75rem]",
          dark ? "text-white" : "text-neutral-950"
        )}
      >
        <WordReveal
          text={title}
          delay={100}
          stagger={50}
          className="reveal-waiting:translate-y-[125%] reveal-shown:animate-word motion-reduce:animate-none"
        />
      </h2>
      {description && (
        <p
          className={cn(
            "mt-5 max-w-2xl text-lg leading-relaxed text-pretty",
            dark ? "text-white/65" : "text-neutral-600",
            fontInter.className,
            RISE_ON_REVEAL
          )}
          style={delay(300)}
        >
          {description}
        </p>
      )}
    </div>
  );
}
