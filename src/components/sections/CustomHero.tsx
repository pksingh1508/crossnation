"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import Flag from "react-country-flag";
import { MapPin, type LucideIcon } from "lucide-react";
import { useTranslations } from "@/hooks/useTranslations";
import { useReveal } from "@/hooks/useReveal";
import { WordReveal } from "@/components/ui/word-reveal";
import { fontInter, fontPoppins } from "@/fonts";
import { delay, RISE_ON_REVEAL } from "@/lib/animation";
import { cn } from "@/lib/utils";
import { getLocalizedPath } from "@/lib/locale-paths";

export interface Country {
  text: string;
  /** ISO country code, e.g. "PL". Without it the country gets a pin instead of a flag. */
  code?: string;
}

interface CustomHeroProps {
  /** Position on the page, shown as 01, 02 ... */
  index: number;
  icon: LucideIcon;
  heading: string;
  paragraphs: string[];
  countries: Country[];
  imageSrc: string;
  imageAlt: string;
  /** Photo on the left on large screens */
  isReversed?: boolean;
}

// The square flags of flag-icons, the set the contact form uses. Pinned to a version, so
// the files never change and browsers can cache them for good.
const FLAG_CDN =
  "https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.5.0/flags/1x1/";

/**
 * One service on the home page: text and countries next to a photo. The countries link to
 * the contact page. Text and photo reveal on scroll, each when it comes into view.
 */
export function CustomHero({
  index,
  icon: Icon,
  heading,
  paragraphs,
  countries,
  imageSrc,
  imageAlt,
  isReversed = false,
}: CustomHeroProps) {
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const [textRef, textReveal] = useReveal<HTMLDivElement>();
  const [photoRef, photoReveal] = useReveal<HTMLDivElement>();
  const contactHref = getLocalizedPath(locale, "/contact");
  const [lead, ...rest] = paragraphs;

  return (
    <section
      className={cn("bg-white py-12 sm:py-14 lg:py-16", fontPoppins.className)}
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 lg:grid-cols-2 lg:gap-16 xl:gap-24">
        <div ref={textRef} data-reveal={textReveal} className="max-w-xl">
          <p
            className={cn(
              "flex items-center gap-3 text-sm font-semibold tracking-[0.2em] text-neutral-400 tabular-nums",
              RISE_ON_REVEAL
            )}
          >
            <span
              aria-hidden
              className="h-0.5 w-8 shrink-0 origin-left rounded-full bg-brand reveal-waiting:scale-x-0 reveal-shown:animate-grow-x motion-reduce:animate-none"
              style={delay(250)}
            />
            {String(index).padStart(2, "0")}
          </p>

          <h2 className="mt-4 text-4xl leading-[1.1] font-semibold tracking-tight text-neutral-950 sm:text-5xl">
            <WordReveal
              text={heading}
              delay={100}
              className="reveal-waiting:translate-y-[125%] reveal-shown:animate-word motion-reduce:animate-none"
            />
          </h2>

          <div className={cn("mt-6 space-y-4", fontInter.className)}>
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

          <ul className="mt-8 flex flex-wrap gap-2.5">
            {countries.map(({ text, code }, i) => (
              <li
                key={`${code ?? ""}-${text}`}
                className={RISE_ON_REVEAL}
                style={delay(450 + i * 40)}
              >
                <Link
                  href={contactHref}
                  className="group/chip inline-flex h-11 items-center gap-2.5 rounded-full border border-neutral-200 bg-white pr-4 pl-1.5 text-sm font-medium text-neutral-800 transition-[translate,background-color,border-color,color,box-shadow] duration-300 ease-out-quint outline-none hover:border-brand hover:bg-brand hover:text-neutral-950 hover:shadow-[0_10px_20px_-12px_rgba(254,204,0,0.9)] focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 active:translate-y-0 motion-safe:hover:-translate-y-0.5"
                >
                  {code ? (
                    <Flag
                      svg
                      countryCode={code}
                      cdnUrl={FLAG_CDN}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="rounded-full ring-1 ring-black/10"
                      style={{ width: "2rem", height: "2rem" }}
                    />
                  ) : (
                    <span className="grid size-8 place-items-center rounded-full bg-neutral-100">
                      <MapPin aria-hidden className="size-4 text-neutral-500" />
                    </span>
                  )}
                  {text}
                  {/* Every country leads to the contact page; say so to screen readers */}
                  <span className="sr-only"> – {tCommon("contact")}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div
          ref={photoRef}
          data-reveal={photoReveal}
          className={cn(
            "relative mx-auto w-full max-w-xl lg:max-w-none",
            isReversed && "lg:order-first"
          )}
        >
          {/* The frame wipes open while the photo inside settles from a slight zoom; on
              hover the photo zooms in a little */}
          <div className="group/photo relative aspect-square overflow-hidden rounded-[2rem] bg-neutral-100 reveal-waiting:[clip-path:inset(100%_0_0_0)] reveal-shown:animate-reveal motion-reduce:animate-none">
            <div className="absolute inset-0 transition-[scale] duration-700 ease-out-quint motion-safe:group-hover/photo:scale-[1.04]">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                sizes="(min-width: 1280px) 576px, (min-width: 1024px) 45vw, (min-width: 640px) 576px, 100vw"
                className="object-cover reveal-waiting:scale-[1.12] reveal-shown:animate-settle motion-reduce:animate-none"
              />
            </div>
            {/* A faint edge, so photos with a white background don't melt into the page */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-black/5 ring-inset"
            />
          </div>

          {/* The service's icon in a yellow tile, on the photo's edge that faces the text */}
          <div
            aria-hidden
            className={cn(
              "absolute -top-6 left-6 grid size-14 place-items-center rounded-2xl bg-brand text-neutral-950 shadow-[0_14px_28px_-12px_rgba(254,204,0,0.9)] ring-4 ring-white reveal-waiting:opacity-0 reveal-shown:animate-pop motion-reduce:animate-none lg:top-10",
              isReversed ? "lg:-right-7 lg:left-auto" : "lg:-left-7"
            )}
            style={delay(550)}
          >
            <Icon className="size-6" />
          </div>
        </div>
      </div>
    </section>
  );
}
