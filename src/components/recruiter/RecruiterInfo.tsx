"use client";

import { useEffect, useRef } from "react";
import {
  BadgeCheck,
  Building2,
  Handshake,
  House,
  Stamp,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "@/hooks/useTranslations";
import { useReveal } from "@/hooks/useReveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { WordReveal } from "@/components/ui/word-reveal";
import { fontInter, fontPoppins } from "@/fonts";
import { delay, RISE_ON_REVEAL } from "@/lib/animation";
import { splitAtDash } from "@/lib/text";
import { cn } from "@/lib/utils";

// The six ways we support partners: their text is in the translations under
// recruiter.info.bullets.<key>
const BULLETS: { key: string; icon: LucideIcon }[] = [
  { key: "b1", icon: BadgeCheck },
  { key: "b2", icon: Stamp },
  { key: "b3", icon: Handshake },
  { key: "b4", icon: House },
  { key: "b5", icon: Building2 },
  { key: "b6", icon: TrendingUp },
];

interface SupportCardProps {
  icon: LucideIcon;
  text: string;
  /** Position in the grid; a row's cards come in one after another */
  index: number;
}

/**
 * One way we support partners. Its edge is a 1px gap in which a yellow glow shows,
 * centred on the mouse (see RecruiterInfo); without a mouse it stays a plain grey edge.
 */
function SupportCard({ icon: Icon, text, index }: SupportCardProps) {
  const [ref, reveal] = useReveal<HTMLLIElement>();
  const [title, body] = splitAtDash(text);

  return (
    <li
      ref={ref}
      data-reveal={reveal}
      data-card
      className={cn(
        "relative rounded-3xl bg-neutral-200/70 p-px [--x:-999px] [--y:-999px]",
        RISE_ON_REVEAL
      )}
      style={delay((index % 3) * 80)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(300px_circle_at_var(--x)_var(--y),#fecc00,#fecc00_15%,transparent_60%)] opacity-0 transition-opacity duration-500 group-hover/grid:opacity-100"
      />
      <div className="relative h-full overflow-hidden rounded-[calc(1.5rem_-_1px)] bg-white p-6 sm:p-7">
        {/* A faint warm light inside the card, under the same spot */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(360px_circle_at_var(--x)_var(--y),rgba(254,204,0,0.1),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover/grid:opacity-100"
        />
        <span className="relative grid size-11 place-items-center rounded-2xl bg-brand-soft text-neutral-900">
          <Icon aria-hidden className="size-5" />
        </span>
        {title && (
          <h3 className="relative mt-5 text-lg leading-snug font-semibold hyphens-auto wrap-break-word text-neutral-950">
            {title}
          </h3>
        )}
        <p
          className={cn(
            "relative mt-2 leading-relaxed wrap-break-word text-neutral-600",
            fontInter.className
          )}
        >
          {body}
        </p>
      </div>
    </li>
  );
}

/**
 * The recruiter page's introduction: its main heading, what we do for recruitment
 * agencies abroad, and the six ways we support them.
 */
export default function RecruiterInfo() {
  const t = useTranslations("recruiter.info");
  const tPage = useTranslations("pages.recruiter");
  const [headRef, headReveal] = useReveal<HTMLDivElement>();
  const gridRef = useRef<HTMLUListElement>(null);

  // With a mouse, the cards' glow follows it: each card gets the pointer's position
  // relative to itself, so the light spills over the edges of the neighbouring cards too
  useEffect(() => {
    const grid = gridRef.current;
    if (
      !grid ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      return;
    }
    let frame = 0;
    const onMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        for (const card of grid.querySelectorAll<HTMLElement>("[data-card]")) {
          const rect = card.getBoundingClientRect();
          card.style.setProperty("--x", `${event.clientX - rect.left}px`);
          card.style.setProperty("--y", `${event.clientY - rect.top}px`);
        }
      });
    };
    grid.addEventListener("pointermove", onMove);
    return () => {
      grid.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      className={cn("bg-neutral-50 py-20 sm:py-24", fontPoppins.className)}
    >
      <div className="mx-auto w-full max-w-7xl px-4">
        <div
          ref={headRef}
          data-reveal={headReveal}
          className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end lg:gap-16"
        >
          <div className="lg:col-span-7">
            <Eyebrow>{tPage("title")}</Eyebrow>
            {/* The recruiter page's main heading */}
            <h1 className="mt-5 text-[min(2.25rem,9vw)] leading-[1.1] font-semibold tracking-tight text-balance text-neutral-950 sm:text-5xl">
              <WordReveal
                text={t("heading")}
                delay={100}
                className="reveal-waiting:translate-y-[125%] reveal-shown:animate-word motion-reduce:animate-none"
              />
            </h1>
          </div>
          <p
            className={cn(
              "leading-relaxed text-neutral-600 sm:text-lg lg:col-span-5",
              fontInter.className,
              RISE_ON_REVEAL
            )}
            style={delay(300)}
          >
            {t("description")}
          </p>
        </div>

        <ul
          ref={gridRef}
          className="group/grid mt-12 grid grid-cols-1 gap-4 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3"
        >
          {BULLETS.map(({ key, icon }, index) => (
            <SupportCard
              key={key}
              icon={icon}
              text={t(`bullets.${key}`)}
              index={index}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
