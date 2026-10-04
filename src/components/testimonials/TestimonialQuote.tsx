"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Quote, User } from "lucide-react";
import type { TestimonialCard } from "@/lib/cms/types";
import { useReveal } from "@/hooks/useReveal";
import { WordReveal } from "@/components/ui/word-reveal";
import { fontInter } from "@/fonts";
import { delay, RISE_ON_REVEAL } from "@/lib/animation";
import { cn } from "@/lib/utils";

// The stories are in English on every page, as the clients wrote them. lang="en" has
// screen readers read them in English, and the browser hyphenate them as English.

/** Time between two words of a featured story, in ms */
const WORD_STAGGER = 14;

interface TestimonialProps {
  testimonial: TestimonialCard;
}

/**
 * A client's story in a list of columns: a yellow quote mark, their words, and their name.
 * It rises into view when it scrolls in, and the quote mark pops in. Cards side by side
 * come in one after another, from left to right.
 */
export function TestimonialQuote({ testimonial }: TestimonialProps) {
  const [ref, reveal] = useReveal<HTMLLIElement>();
  // The browser picks a card's column as it balances the columns, so the card measures
  // which column it is in to time its entrance
  const [column, setColumn] = useState(0);

  useEffect(() => {
    const card = ref.current;
    const list = card?.parentElement;
    if (!card || !list) return;
    const left =
      card.getBoundingClientRect().left - list.getBoundingClientRect().left;
    setColumn(Math.round(left / card.offsetWidth));
  }, [ref]);

  const start = column * 120;

  return (
    <li
      ref={ref}
      data-reveal={reveal}
      // Kept whole: a card never breaks across two columns
      className={cn("mb-6 break-inside-avoid", RISE_ON_REVEAL)}
      style={delay(start)}
    >
      <figure className="rounded-[2rem] bg-neutral-50 p-7 ring-1 ring-black/5 sm:p-8">
        <Quote
          aria-hidden
          className="size-8 fill-current stroke-none text-brand reveal-waiting:opacity-0 reveal-shown:animate-pop motion-reduce:animate-none"
          style={delay(start + 250)}
        />
        <blockquote
          lang="en"
          className={cn(
            "mt-5 leading-relaxed text-pretty whitespace-pre-line text-neutral-700 sm:text-lg",
            fontInter.className
          )}
        >
          <p>{testimonial.quote}</p>
        </blockquote>
        <figcaption className="mt-6 flex items-center gap-3 border-t border-black/5 pt-5">
          <Avatar testimonial={testimonial} />
          <span className="min-w-0 font-semibold wrap-break-word text-neutral-950">
            {testimonial.name}
          </span>
        </figcaption>
      </figure>
    </li>
  );
}

/**
 * The first story of a page, large on a dark card. The card wipes open, the quote mark
 * pops in and the words rise one after another, like a heading's. Put it in a shown reveal
 * block: it comes in whenever it appears, as the page opens and after a change of page.
 */
export function FeaturedTestimonial({ testimonial }: TestimonialProps) {
  // A story can have paragraphs; the words of each follow on from the one before
  const paragraphs: { text: string; start: number }[] = [];
  let words = 0;
  for (const text of (testimonial.quote ?? "").split(/\n+/)) {
    if (!text.trim()) continue;
    paragraphs.push({ text, start: 500 + words * WORD_STAGGER });
    words += text.trim().split(/\s+/).length;
  }

  return (
    <figure
      className="relative overflow-hidden rounded-[2rem] bg-neutral-950 px-7 py-10 text-white reveal-shown:animate-reveal motion-reduce:animate-none sm:px-12 sm:py-14 lg:px-16 lg:py-16"
      style={delay(150)}
    >
      {/* A large faint quote mark in the corner */}
      <Quote
        aria-hidden
        className="pointer-events-none absolute -top-12 -right-10 size-72 fill-current stroke-none text-white/5 sm:size-96"
      />

      <Quote
        aria-hidden
        className="relative size-10 fill-current stroke-none text-brand reveal-shown:animate-pop motion-reduce:animate-none sm:size-12"
        style={delay(400)}
      />
      <blockquote
        lang="en"
        className="relative mt-6 max-w-4xl space-y-4 text-[min(1.5rem,6.5vw)] leading-snug font-medium tracking-tight sm:mt-8 sm:text-3xl"
      >
        {paragraphs.map(({ text, start }, index) => (
          <p key={index}>
            <WordReveal
              text={text}
              delay={start}
              stagger={WORD_STAGGER}
              className="reveal-shown:animate-word motion-reduce:animate-none"
            />
          </p>
        ))}
      </blockquote>

      <figcaption
        className={cn(
          "relative mt-10 flex items-center gap-4 border-t border-white/10 pt-6 sm:mt-12",
          RISE_ON_REVEAL
        )}
        style={delay(700)}
      >
        <Avatar testimonial={testimonial} className="size-12 text-base" />
        <span className="min-w-0 text-lg font-semibold wrap-break-word">
          {testimonial.name}
        </span>
      </figcaption>
    </figure>
  );
}

/** "Aisha Bello" → "AB", "Kavindu" → "K": the first letters of the first and last names */
function initials(name: string) {
  const names = name.split(/\s+/).filter((word) => /^\p{L}/u.test(word));
  const ends = names.length > 1 ? [names[0], names[names.length - 1]] : names;
  return ends.map((word) => word.charAt(0).toUpperCase()).join("");
}

/** The client's photo, or else their initials on a yellow circle. Their name is beside it. */
function Avatar({
  testimonial,
  className,
}: TestimonialProps & { className?: string }) {
  if (testimonial.image_url) {
    return (
      <Image
        src={testimonial.image_url}
        alt=""
        width={48}
        height={48}
        className={cn("size-11 shrink-0 rounded-full object-cover", className)}
      />
    );
  }

  return (
    <span
      aria-hidden
      className={cn(
        "grid size-11 shrink-0 place-items-center rounded-full bg-brand text-sm font-semibold text-neutral-950",
        className
      )}
    >
      {initials(testimonial.name) || <User className="size-5" />}
    </span>
  );
}
