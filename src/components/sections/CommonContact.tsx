"use client";

import Image from "next/image";
import { useId } from "react";
import { useTranslations } from "next-intl";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { MessagesSquare, Send, ShieldCheck } from "lucide-react";
import { WordReveal } from "@/components/ui/word-reveal";
import { fontInter, fontPoppins } from "@/fonts";
import { delay } from "@/lib/animation";
import { cn } from "@/lib/utils";
import { MyForm } from "./MyForm";

// A collage of faces. It sits in the middle of a wider image with white bars at the sides,
// so ImageKit cuts out that 800px square; then the photo can fill a frame of any shape.
const PHOTO =
  "https://ik.imagekit.io/eucareerserwis/home/peoples.webp?tr=cm-extract,x-240,y-0,w-800,h-800";

// Under the form; the third promise, the quick answer, is on the photo
const ASSURANCES = [
  { key: "consultation", icon: MessagesSquare },
  { key: "secure", icon: ShieldCheck },
];

const WORD = "animate-word motion-reduce:animate-none";
const RISE = "animate-rise motion-reduce:animate-none";

/** When the heading's first word starts, in ms. WordReveal starts a word every 70ms. */
const HEADING_START = 550;

/**
 * The top of the work, employer, migrate, jobs, recruiter, jobseeker and testimonials
 * pages: an invitation on a photo, next to the enquiry form. It is on screen when the page
 * opens, so it animates in with plain CSS from the first paint.
 */
export function CommonContact() {
  const t = useTranslations("pages.commonContact");
  const titleId = useId();
  const reduceMotion = useReducedMotion();

  // During the first 900px of scrolling the photo drifts down inside its frame, as in the
  // home hero. The photo is 12% taller than the frame, so its edges never show.
  const { scrollY } = useScroll();
  const photoY = useTransform(scrollY, (y) =>
    reduceMotion ? "0%" : `${Math.min(y / 900, 1) * 5}%`
  );

  // The yellow part of the heading follows on from its last white word
  const heading = t("heading");
  const accentStart = HEADING_START + heading.split(/\s+/).length * 70;

  return (
    <section className={cn("bg-white", fontPoppins.className)}>
      {/* grid-cols-1: on phones the column keeps to the screen's width, even where a word
          or a menu's text is wider */}
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 px-4 pt-6 pb-16 sm:pb-20 lg:grid-cols-2 lg:gap-8 lg:pt-8 lg:pb-24">
        {/* The frame wipes open while the photo inside settles from a slight zoom. From lg
            up it is as tall as the form, but never taller than the window has room for, so
            the heading shows on the first screen. Next to a taller form it stays in view
            below the navbar while the form scrolls past. */}
        <div
          className="relative isolate flex min-h-[26rem] animate-reveal flex-col justify-between gap-8 overflow-hidden rounded-[2rem] bg-neutral-900 p-6 motion-reduce:animate-none sm:min-h-[30rem] sm:p-8 lg:sticky lg:top-24 lg:max-h-[max(30rem,calc(100svh-14rem))] xl:top-28 xl:p-10"
          style={delay(100)}
        >
          <motion.div
            className="absolute inset-x-0 -inset-y-[6%] -z-10"
            style={{ y: photoY }}
          >
            <Image
              src={PHOTO}
              alt=""
              fill
              preload
              sizes="(min-width: 1280px) 608px, (min-width: 1024px) 50vw, 100vw"
              className="animate-settle object-cover motion-reduce:animate-none"
              style={delay(100)}
            />
          </motion.div>
          {/* Darkens the lower part, so the heading stays readable on the busy collage. The
              extra stops ease it out, so it has no visible edge. */}
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(10_10_10/0.92),rgb(10_10_10/0.7)_25%,rgb(10_10_10/0.35)_50%,rgb(10_10_10/0.1)_70%,transparent_85%)]"
          />

          {/* A live dot with the promise of a quick answer. The negative margins tuck it
              into the corner; it stays in the flow, so a long heading can't run into it. */}
          <p
            className={cn(
              "-mt-1 -ml-1 inline-flex items-center gap-2.5 self-start rounded-full bg-white/90 py-2 pr-4 pl-3 text-xs font-medium text-neutral-900 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.5)] backdrop-blur-md sm:-mt-2 sm:-ml-2 sm:text-sm xl:-mt-4 xl:-ml-4",
              RISE
            )}
            style={delay(1300)}
          >
            <span aria-hidden className="relative flex size-2.5 shrink-0">
              <span className="absolute inset-0 animate-ping-soft rounded-full bg-emerald-400 motion-reduce:hidden" />
              <span className="relative size-2.5 rounded-full bg-emerald-500" />
            </span>
            {t("features.quickResponse")}
          </p>

          {/* On small phones the size follows the screen width */}
          <h2 className="max-w-xl text-[min(1.75rem,8vw)] leading-[1.15] font-semibold tracking-tight text-balance text-white sm:text-4xl xl:text-5xl">
            <WordReveal text={heading} delay={HEADING_START} className={WORD} />{" "}
            <span className="text-brand">
              <WordReveal
                text={t("headingAccent")}
                delay={accentStart}
                className={WORD}
              />
            </span>
          </h2>
        </div>

        <div
          className={cn(
            "rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-[0_30px_60px_-30px_rgba(15,23,42,0.25)] sm:p-8",
            RISE
          )}
          style={delay(250)}
        >
          {/* On the narrowest phones the icon sits above the text, so the text keeps the
              full width */}
          <div className="flex flex-col items-start gap-4 min-[360px]:flex-row">
            <span
              aria-hidden
              className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand text-neutral-950 shadow-[0_14px_28px_-12px_rgba(254,204,0,0.9)]"
            >
              <Send className="size-5" />
            </span>
            <p
              id={titleId}
              className="text-lg leading-snug font-semibold text-neutral-950 sm:text-xl"
            >
              {t("formInstruction")}
            </p>
          </div>

          <MyForm labelledBy={titleId} className="mt-7" />

          <ul
            className={cn(
              "mt-5 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-neutral-500 sm:text-[13px]",
              fontInter.className,
              RISE
            )}
            style={delay(820)}
          >
            {ASSURANCES.map(({ key, icon: Icon }) => (
              <li key={key} className="flex items-center gap-1.5">
                <Icon
                  aria-hidden
                  className="size-3.5 shrink-0 text-neutral-400"
                />
                {t(`features.${key}`)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
