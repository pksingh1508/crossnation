"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";
import { WordReveal } from "@/components/ui/word-reveal";
import { delay, RISE_ON_REVEAL } from "@/lib/animation";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  /** A "see all" link, at the right on larger screens and under the title on phones */
  link?: { href: string; label: string };
}

/** A section's heading and its link, which appear when they scroll into view */
export function SectionHeader({ title, link }: SectionHeaderProps) {
  const [ref, reveal] = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      data-reveal={reveal}
      className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4"
    >
      {/* On small phones the size follows the screen width, so a long one-word heading
          ("Erfahrungsberichte") still fits on one line */}
      <h2 className="text-[min(2.25rem,9vw)] leading-[1.1] font-semibold tracking-tight text-neutral-950 sm:text-5xl">
        <WordReveal
          text={title}
          delay={100}
          className="reveal-waiting:translate-y-[125%] reveal-shown:animate-word motion-reduce:animate-none"
        />
      </h2>
      {link && (
        <Link
          href={link.href}
          className={cn(
            "group/more inline-flex items-center gap-1.5 rounded-sm font-semibold text-neutral-950 underline decoration-brand decoration-2 underline-offset-[6px] transition-[text-decoration-color] duration-300 outline-none hover:decoration-neutral-950 focus-visible:ring-2 focus-visible:ring-neutral-950",
            RISE_ON_REVEAL
          )}
          style={delay(300)}
        >
          {link.label}
          <ArrowRight
            aria-hidden
            className="size-4 transition-transform duration-300 ease-out-quint group-hover/more:translate-x-1"
          />
        </Link>
      )}
    </div>
  );
}
