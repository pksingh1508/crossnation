"use client";

import { Check } from "lucide-react";
import { SplitSection } from "@/components/sections/SplitSection";
import { fontInter } from "@/fonts";
import { delay, RISE_ON_REVEAL } from "@/lib/animation";
import { splitAtDash } from "@/lib/text";
import { cn } from "@/lib/utils";

interface StepWorkBulletPointProps {
  image: string;
  imageAlt?: string;
  heading: string;
  /** "Title – text", or just a title; empty bullets are left out */
  bullet1: string;
  bullet2: string;
  bullet3: string;
  bullet4: string;
  bullet5: string;
  bullet6: string;
  bullet7: string;
  /** Photo on the right on large screens */
  isReversed?: boolean;
}

/**
 * A topic on the jobseeker page: a photo next to a heading and a checklist. Each item is a
 * bold title and its text; where the translation has only the title, just that.
 */
export function StepWorkBulletPoint({
  image,
  imageAlt = "Step illustration",
  heading,
  bullet1,
  bullet2,
  bullet3,
  bullet4,
  bullet5,
  bullet6,
  bullet7,
  isReversed = false,
}: StepWorkBulletPointProps) {
  const bullets = [
    bullet1,
    bullet2,
    bullet3,
    bullet4,
    bullet5,
    bullet6,
    bullet7,
  ].filter(Boolean);

  return (
    <SplitSection
      image={image}
      imageAlt={imageAlt}
      heading={heading}
      isReversed={isReversed}
    >
      {/* A word too long for a phone's line (German has some) wraps, hyphenated there */}
      <ul
        className={cn(
          "mt-8 grid grid-cols-1 gap-5 wrap-break-word max-sm:hyphens-auto",
          fontInter.className
        )}
      >
        {bullets.map((bullet, i) => {
          const [title, text] = splitAtDash(bullet);
          return (
            <li
              key={i}
              className={cn("flex gap-4", RISE_ON_REVEAL)}
              style={delay(250 + i * 70)}
            >
              {/* The tick pops in just after its row */}
              <span
                aria-hidden
                className="mt-px grid size-7 shrink-0 place-items-center rounded-full bg-brand-soft text-neutral-900 reveal-shown:animate-pop motion-reduce:animate-none"
                style={delay(400 + i * 70)}
              >
                <Check className="size-4" strokeWidth={2.5} />
              </span>
              <div className="min-w-0">
                <p className="leading-snug font-semibold text-neutral-950 sm:text-lg">
                  {title ?? text}
                </p>
                {title && (
                  <p className="mt-1 leading-relaxed text-neutral-600">
                    {text}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </SplitSection>
  );
}
