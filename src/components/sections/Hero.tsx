"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  MessagesSquare,
  PlaneTakeoff,
  UserSearch,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "@/hooks/useTranslations";
import { fontPoppins } from "@/fonts";
import { cn } from "@/lib/utils";
import { getLocalizedPath } from "@/lib/locale-paths";
import { WordReveal } from "@/components/ui/word-reveal";
import { HeroLines } from "./HeroLines";

// The four ways in, each with its own page
const CHOICES: { label: string; path: string; icon: LucideIcon }[] = [
  { label: "btn1", path: "/recruiter", icon: UserSearch },
  { label: "btn2", path: "/jobseeker", icon: BriefcaseBusiness },
  { label: "btn3", path: "/migrate", icon: PlaneTakeoff },
  { label: "btn4", path: "/employer", icon: Building2 },
];

/** When a CSS entrance animation (animate-rise etc.) starts */
const delay = (ms: number) => ({ animationDelay: `${ms}ms` });

export function Hero() {
  const t = useTranslations("home");
  const locale = useLocale();
  const reduceMotion = useReducedMotion();

  // During the first 900px of scrolling the photo drifts down inside its frame, so it
  // moves slower than the page. The hero opens the page, so the page's scroll position
  // is the hero's. The photo is 12% taller than the frame, so its edges never show.
  const { scrollY } = useScroll();
  const photoY = useTransform(scrollY, (y) =>
    reduceMotion ? "0%" : `${Math.min(y / 900, 1) * 5}%`
  );

  return (
    <section
      className={cn(
        "relative isolate overflow-hidden bg-white",
        fontPoppins.className
      )}
    >
      <HeroLines />

      {/* From lg up it fills the first screen below the navbar (6.5rem, 7.5rem from xl) */}
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 pt-16 pb-16 sm:pb-20 lg:min-h-[calc(100svh-6.5rem)] lg:grid-cols-2 lg:gap-16 lg:py-12 xl:min-h-[calc(100svh-7.5rem)] xl:gap-24">
        <div>
          {/* The page's main heading; the sections below use h2 */}
          <h1 className="text-[2.5rem] leading-[1.1] font-semibold tracking-tight text-balance text-neutral-950 sm:text-5xl lg:text-6xl">
            <WordReveal
              text={t("title1")}
              delay={100}
              className="animate-word motion-reduce:animate-none"
            />
          </h1>

          <ul className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-2">
            {CHOICES.map(({ label, path, icon: Icon }, index) => (
              <li
                key={path}
                className="animate-rise motion-reduce:animate-none"
                style={delay(420 + index * 70)}
              >
                <Link
                  href={getLocalizedPath(locale, path)}
                  className="group relative flex h-full items-center gap-4 overflow-hidden rounded-2xl border border-neutral-200 bg-white p-3 pr-5 transition-[translate,scale,border-color,box-shadow] duration-500 ease-out-quint outline-none hover:-translate-y-0.5 hover:border-brand hover:shadow-[0_20px_40px_-24px_rgba(15,23,42,0.45)] focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 active:scale-[0.98]"
                >
                  {/* Yellow fill that sweeps in from the left */}
                  <span
                    aria-hidden
                    className="absolute inset-0 origin-left scale-x-0 bg-brand transition-transform duration-500 ease-out-quint group-hover:scale-x-100 group-focus-visible:scale-x-100"
                  />
                  <span className="relative grid size-11 shrink-0 place-items-center rounded-xl bg-brand-soft text-neutral-900 transition-colors duration-200 group-hover:bg-neutral-950 group-hover:text-brand group-focus-visible:bg-neutral-950 group-focus-visible:text-brand">
                    <Icon aria-hidden className="size-5" />
                  </span>
                  <span className="relative min-w-0 flex-1 text-base leading-snug font-semibold hyphens-auto text-neutral-900">
                    {t(label)}
                  </span>
                  <ArrowRight
                    aria-hidden
                    className="relative size-5 shrink-0 text-neutral-400 transition-[translate,color] duration-500 ease-out-quint group-hover:translate-x-1 group-hover:text-neutral-950 group-focus-visible:translate-x-1 group-focus-visible:text-neutral-950"
                  />
                </Link>
              </li>
            ))}
          </ul>

          <div
            className="mt-8 flex items-center gap-4 animate-rise motion-reduce:animate-none"
            style={delay(760)}
          >
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-neutral-950 text-brand">
              <MessagesSquare aria-hidden className="size-5" />
            </span>
            <p className="text-sm leading-relaxed text-neutral-600 sm:text-[15px]">
              {t("cta1")}
              <br />
              <Link
                href={getLocalizedPath(locale, "/contact")}
                className="group/cta rounded-sm font-semibold text-neutral-950 underline decoration-brand decoration-2 underline-offset-4 transition-[text-decoration-color] duration-300 outline-none hover:decoration-neutral-950 focus-visible:ring-2 focus-visible:ring-neutral-950"
              >
                {t("cta2")}
                <ArrowRight
                  aria-hidden
                  className="ml-1 inline size-4 align-[-0.2em] transition-transform duration-300 ease-out-quint group-hover/cta:translate-x-1"
                />
              </Link>
            </p>
          </div>
        </div>

        {/* The padding makes room for the yellow block, so it ends on the page's edge */}
        <div className="relative mx-auto w-full max-w-xl pr-3 pb-3 sm:pr-5 sm:pb-5 lg:max-w-none">
          {/* A yellow block behind the photo, echoing the logo */}
          <div
            aria-hidden
            className="absolute right-0 bottom-0 h-3/4 w-3/4 animate-rise rounded-[2rem] bg-brand motion-reduce:animate-none"
            style={delay(550)}
          />
          {/* The frame wipes open while the photo inside settles from a slight zoom. From lg
              up its height follows the window, so the hero fits on the first screen. */}
          <div
            className="relative aspect-[4/3] animate-reveal overflow-hidden rounded-[2rem] bg-neutral-100 motion-reduce:animate-none sm:aspect-[16/11] lg:aspect-auto lg:h-[min(40rem,calc(100svh-14rem))]"
            style={delay(150)}
          >
            <motion.div
              className="absolute inset-x-0 -inset-y-[6%]"
              style={{ y: photoY }}
            >
              <Image
                src="https://ik.imagekit.io/eucareerserwis/home/HomeLogo.webp"
                alt=""
                fill
                preload
                sizes="(min-width: 1280px) 576px, (min-width: 1024px) 45vw, (min-width: 640px) 576px, 100vw"
                className="animate-settle object-cover object-[48%_40%] motion-reduce:animate-none"
                style={delay(150)}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
