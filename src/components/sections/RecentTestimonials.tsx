"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { ArrowRight, ArrowUpRight, Quote } from "lucide-react";
import { useTranslations } from "@/hooks/useTranslations";
import { useReveal } from "@/hooks/useReveal";
import { WordReveal } from "@/components/ui/word-reveal";
import { fontInter, fontPoppins } from "@/fonts";
import { delay, RISE_ON_REVEAL } from "@/lib/animation";
import { cn } from "@/lib/utils";
import { getLocalizedPath } from "@/lib/locale-paths";

// A client's own words (in English on every page, as he wrote them) and two documents
// that clients received. Each card leads to the full collection.
const TESTIMONIAL = {
  name: "Manoj",
  photo: "https://ik.imagekit.io/eucareerserwis/home/Manoj.webp",
  quote:
    "I’m very thankful to EU Career Serwis for their support throughout my journey. Their team was always responsive, professional, and ready to guide me whenever I had questions. The whole experience felt much easier with their assistance. I highly recommend EU Career Serwis to anyone looking for reliable and efficient support in their career endeavors.",
  /** A part of the quote that is set in yellow */
  highlight:
    "Their team was always responsive, professional, and ready to guide me whenever I had questions.",
};

// label: key in footer.successStory. paper: size and tilt of the document on its panel.
const PROOFS = [
  {
    label: "story2",
    path: "/work-permit",
    image: "https://ik.imagekit.io/eucareerserwis/home/workPermit.webp",
    width: 1414,
    height: 2000,
    paper: "w-[58%] -rotate-3",
    sizes: "(min-width: 1024px) 300px, (min-width: 768px) 30vw, 60vw",
  },
  {
    label: "story3",
    path: "/visa-stamp",
    image: "https://ik.imagekit.io/eucareerserwis/home/stampImg.webp",
    width: 1280,
    height: 975,
    paper: "w-[80%] rotate-2",
    sizes: "(min-width: 1024px) 400px, (min-width: 768px) 40vw, 80vw",
  },
];

/** Testimonials: a client's quote and two documents. Used on many pages. */
export function RecentTestimonials() {
  const t = useTranslations("testimonials");
  const locale = useLocale();
  const [headRef, headReveal] = useReveal<HTMLDivElement>();

  return (
    <section className={cn("bg-white py-20 sm:py-24", fontPoppins.className)}>
      <div className="mx-auto w-full max-w-7xl px-4">
        <div
          ref={headRef}
          data-reveal={headReveal}
          className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4"
        >
          {/* On small phones the size follows the screen width, so a long one-word heading
              ("Erfahrungsberichte") still fits on one line */}
          <h2 className="text-[min(2.25rem,9vw)] leading-[1.1] font-semibold tracking-tight text-neutral-950 sm:text-5xl">
            <WordReveal
              text={t("heading")}
              delay={100}
              className="reveal-waiting:translate-y-[125%] reveal-shown:animate-word motion-reduce:animate-none"
            />
          </h2>
          <Link
            href={getLocalizedPath(locale, "/testimonials")}
            className={cn(
              "group/more inline-flex items-center gap-1.5 rounded-sm font-semibold text-neutral-950 underline decoration-brand decoration-2 underline-offset-[6px] transition-[text-decoration-color] duration-300 outline-none hover:decoration-neutral-950 focus-visible:ring-2 focus-visible:ring-neutral-950",
              RISE_ON_REVEAL
            )}
            style={delay(300)}
          >
            {t("cta")}
            <ArrowRight
              aria-hidden
              className="size-4 transition-transform duration-300 ease-out-quint group-hover/more:translate-x-1"
            />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 sm:mt-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-6">
          <QuoteCard />
          {PROOFS.map((proof, index) => (
            <ProofCard key={proof.path} {...proof} start={150 + index * 120} />
          ))}
        </div>
      </div>
    </section>
  );
}

/** The quote on a dark card, next to the client's photo */
function QuoteCard() {
  const t = useTranslations("footer.successStory");
  const locale = useLocale();
  const [ref, reveal] = useReveal<HTMLElement>();
  const { name, photo, quote, highlight } = TESTIMONIAL;
  const [before, after] = quote.split(highlight);

  return (
    <figure
      ref={ref}
      data-reveal={reveal}
      className="group/quote relative grid overflow-hidden rounded-[2rem] bg-neutral-950 text-white sm:grid-cols-[2fr_3fr] md:col-span-2 lg:col-span-7 lg:row-span-2 reveal-waiting:[clip-path:inset(100%_0_0_0)] reveal-shown:animate-reveal motion-reduce:animate-none"
    >
      <div className="relative aspect-[4/5] overflow-hidden sm:aspect-auto">
        <Image
          src={photo}
          alt={name}
          fill
          sizes="(min-width: 1024px) 300px, (min-width: 640px) 40vw, 100vw"
          className="object-cover object-[50%_30%] transition-[scale] duration-700 ease-out-quint reveal-waiting:scale-[1.12] reveal-shown:animate-settle motion-reduce:animate-none motion-safe:group-hover/quote:scale-[1.04]"
        />
      </div>

      <div className="flex flex-col p-7 sm:p-10">
        <Quote
          aria-hidden
          className="size-10 fill-current stroke-none text-brand reveal-waiting:opacity-0 reveal-shown:animate-pop motion-reduce:animate-none"
          style={delay(450)}
        />
        <blockquote
          lang="en"
          className={cn(
            "mt-6 text-lg leading-relaxed text-white/70",
            fontInter.className,
            RISE_ON_REVEAL
          )}
          style={delay(550)}
        >
          <p>
            {after === undefined ? (
              quote
            ) : (
              <>
                {before}
                <span className="font-medium text-brand">{highlight}</span>
                {after}
              </>
            )}
          </p>
        </blockquote>

        <figcaption
          className={cn(
            "mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6",
            "max-sm:mt-8",
            RISE_ON_REVEAL
          )}
          style={delay(650)}
        >
          <span className="text-lg font-semibold">{name}</span>
          <Link
            href={getLocalizedPath(locale, "/success-stories")}
            className="group/cta inline-flex h-11 items-center gap-2 rounded-full bg-brand px-5 text-sm font-semibold text-neutral-950 transition-[translate,box-shadow] duration-300 ease-out-quint outline-none hover:shadow-[0_12px_28px_-12px_rgba(254,204,0,0.9)] focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 motion-safe:hover:-translate-y-0.5"
          >
            {t("story1")}
            <ArrowRight
              aria-hidden
              className="size-4 transition-transform duration-300 ease-out-quint group-hover/cta:translate-x-1"
            />
          </Link>
        </figcaption>
      </div>
    </figure>
  );
}

interface ProofCardProps {
  label: string;
  path: string;
  image: string;
  width: number;
  height: number;
  paper: string;
  sizes: string;
  /** When the card's entrance starts after it comes into view, in ms */
  start: number;
}

/**
 * A document lying tilted on a dotted panel. It slides up into view, and on hover it
 * straightens and lifts. The whole card links to the document gallery.
 */
function ProofCard({
  label,
  path,
  image,
  width,
  height,
  paper,
  sizes,
  start,
}: ProofCardProps) {
  const t = useTranslations("footer.successStory");
  const locale = useLocale();
  const [ref, reveal] = useReveal<HTMLAnchorElement>();

  return (
    <Link
      ref={ref}
      data-reveal={reveal}
      href={getLocalizedPath(locale, path)}
      className={cn(
        "group/proof flex flex-col overflow-hidden rounded-[2rem] bg-white ring-1 ring-black/5 transition-shadow duration-500 outline-none hover:shadow-[0_28px_56px_-32px_rgba(15,23,42,0.5)] focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 lg:col-span-5",
        RISE_ON_REVEAL
      )}
      style={delay(start)}
    >
      <div className="relative h-56 overflow-hidden bg-neutral-100 bg-[radial-gradient(circle,var(--color-neutral-300)_1px,transparent_1px)] bg-[length:18px_18px] sm:h-60 lg:h-auto lg:min-h-48 lg:flex-1">
        <div
          className={cn(
            "absolute inset-x-0 top-7 mx-auto transition-[rotate,translate,scale] duration-700 ease-out-quint reveal-waiting:translate-y-[75%] reveal-shown:animate-emerge motion-reduce:animate-none motion-safe:group-hover/proof:-translate-y-2 motion-safe:group-hover/proof:scale-[1.02] motion-safe:group-hover/proof:rotate-0",
            paper
          )}
          style={delay(start + 150)}
        >
          <Image
            src={image}
            alt=""
            width={width}
            height={height}
            sizes={sizes}
            className="h-auto w-full rounded-md shadow-[0_24px_40px_-20px_rgba(15,23,42,0.45)] ring-1 ring-black/5"
          />
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-black/5 px-6 py-5">
        <span className="text-lg font-semibold text-neutral-950">
          {t(label)}
        </span>
        <span className="grid size-10 shrink-0 place-items-center rounded-full border border-neutral-200 text-neutral-700 transition-colors duration-300 group-hover/proof:border-brand group-hover/proof:bg-brand group-hover/proof:text-neutral-950 group-focus-visible/proof:border-brand group-focus-visible/proof:bg-brand">
          <ArrowUpRight
            aria-hidden
            className="size-4 transition-transform duration-300 ease-out-quint group-hover/proof:translate-x-0.5 group-hover/proof:-translate-y-0.5"
          />
        </span>
      </div>
    </Link>
  );
}
