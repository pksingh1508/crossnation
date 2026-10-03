"use client";

import Image from "next/image";
import { useLocale } from "next-intl";
import { MapPin } from "lucide-react";
import { useTranslations } from "@/hooks/useTranslations";
import { useReveal } from "@/hooks/useReveal";
import { WordReveal } from "@/components/ui/word-reveal";
import { siteConfig } from "@/constants/site";
import { fontInter, fontPoppins } from "@/fonts";
import { cn } from "@/lib/utils";

/** When an entrance animation starts, counted from the moment its block comes into view */
const delay = (ms: number) => ({ animationDelay: `${ms}ms` });

/** Hidden until its block scrolls into view, then rises into place */
const RISE =
  "reveal-waiting:opacity-0 reveal-shown:animate-rise motion-reduce:animate-none";

/** "Poland" in the visitor's language (Polska, Polen, Pologne ...) */
function polandIn(locale: string) {
  try {
    return new Intl.DisplayNames([locale], { type: "region" }).of("PL");
  } catch {
    return "Poland";
  }
}

export function About() {
  const t = useTranslations("about");
  const locale = useLocale();
  // Text and photo reveal separately: on phones the photo comes into view later
  const [textRef, textReveal] = useReveal<HTMLDivElement>();
  const [photoRef, photoReveal] = useReveal<HTMLDivElement>();

  return (
    <section
      className={cn("bg-white py-20 sm:py-24 lg:py-28", fontPoppins.className)}
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 px-4 lg:grid-cols-[5fr_6fr] lg:gap-16 xl:gap-24">
        {/* The text comes first, so on phones it is read before the photo */}
        <div ref={textRef} data-reveal={textReveal}>
          <p
            className={cn(
              "flex items-start gap-3 text-xs font-semibold tracking-[0.2em] text-neutral-500 uppercase",
              RISE
            )}
          >
            {/* mt-[7px] centres the dash on the first line of text, in case the label wraps */}
            <span
              aria-hidden
              className="mt-[7px] h-0.5 w-8 shrink-0 origin-left rounded-full bg-brand reveal-waiting:scale-x-0 reveal-shown:animate-grow-x motion-reduce:animate-none"
              style={delay(250)}
            />
            {t("smallTitle")}
          </p>

          <h2 className="mt-5 text-3xl leading-[1.15] font-semibold tracking-tight text-balance text-neutral-950 sm:text-4xl xl:text-[2.75rem]">
            <WordReveal
              text={t("title")}
              delay={100}
              stagger={45}
              className="reveal-waiting:translate-y-[125%] reveal-shown:animate-word motion-reduce:animate-none"
            />
          </h2>

          <div className={cn("mt-7 space-y-6", fontInter.className)}>
            <p
              className={cn("text-lg leading-relaxed text-neutral-700", RISE)}
              style={delay(400)}
            >
              {t("description.paragraph1")}
            </p>
            {/* The legal guidance and the mission, set apart with a yellow rule */}
            <p
              className={cn(
                "border-l-2 border-brand pl-5 text-base leading-relaxed text-neutral-600",
                RISE
              )}
              style={delay(520)}
            >
              {t("description.paragraph2")}
            </p>
          </div>
        </div>

        {/* The padding makes room for the outline, so it ends on the page's edge */}
        <div
          ref={photoRef}
          data-reveal={photoReveal}
          className="relative mx-auto w-full max-w-lg pb-4 pl-4 sm:pb-5 sm:pl-5 lg:order-first lg:mx-0 lg:max-w-none"
        >
          {/* A yellow outline behind the photo, a line echo of the hero's yellow block */}
          <div
            aria-hidden
            className={cn(
              "absolute top-4 right-4 bottom-0 left-0 rounded-[2rem] border-2 border-brand sm:top-5 sm:right-5",
              RISE
            )}
            style={delay(450)}
          />

          {/* The frame wipes open while the photo inside settles from a slight zoom */}
          <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-neutral-100 sm:aspect-[4/5] reveal-waiting:[clip-path:inset(100%_0_0_0)] reveal-shown:animate-reveal motion-reduce:animate-none">
            <Image
              src="https://ik.imagekit.io/eucareerserwis/home/about.webp"
              alt={t("imageAlt")}
              fill
              sizes="(min-width: 640px) 512px, 100vw"
              className="object-cover object-[50%_30%] reveal-waiting:scale-[1.12] reveal-shown:animate-settle motion-reduce:animate-none"
            />
          </div>

          {/* Where the company is based */}
          <div
            className={cn(
              "absolute right-3 bottom-10 flex items-center gap-3 rounded-2xl bg-white/95 p-2.5 pr-5 shadow-[0_20px_40px_-20px_rgba(15,23,42,0.4)] ring-1 ring-black/5 backdrop-blur-sm sm:bottom-14 lg:-right-10",
              RISE
            )}
            style={delay(700)}
          >
            <Image
              src="/brandLogo.webp"
              alt=""
              width={44}
              height={44}
              className="size-11 rounded-xl"
            />
            <div>
              <p className="text-sm font-semibold text-neutral-950">
                {siteConfig.name}
              </p>
              <p className="mt-0.5 flex items-center gap-1 text-xs text-neutral-500">
                <MapPin aria-hidden className="size-3.5 text-amber-500" />
                {siteConfig.contact.address.city}, {polandIn(locale)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
