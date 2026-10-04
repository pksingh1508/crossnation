"use client";

import {
  ConciergeBell,
  Factory,
  HardHat,
  HeartHandshake,
  SprayCan,
  Sprout,
  Truck,
  Warehouse,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "@/hooks/useTranslations";
import { useReveal } from "@/hooks/useReveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { WordReveal } from "@/components/ui/word-reveal";
import { fontInter, fontPoppins } from "@/fonts";
import { delay, RISE_ON_REVEAL } from "@/lib/animation";
import { cn } from "@/lib/utils";

// The fields the roles are grouped in. Each field's name and roles are in the translations,
// under works.info.roleGroups.<id>. Ordered from most roles to fewest, so the cards side
// by side in a row are about as long as each other, in four columns and in two.
const GROUPS: { id: string; icon: LucideIcon }[] = [
  { id: "production", icon: Factory },
  { id: "agriculture", icon: Sprout },
  { id: "warehouse", icon: Warehouse },
  { id: "construction", icon: HardHat },
  { id: "hospitality", icon: ConciergeBell },
  { id: "transport", icon: Truck },
  { id: "cleaning", icon: SprayCan },
  { id: "care", icon: HeartHandshake },
];

interface RoleGroupProps {
  icon: LucideIcon;
  name: string;
  roles: string[];
  /** Position in the grid; a row's cards come in one after another */
  index: number;
}

/** One field and its roles. It rises into view when it scrolls in. */
function RoleGroup({ icon: Icon, name, roles, index }: RoleGroupProps) {
  const [ref, reveal] = useReveal<HTMLLIElement>();

  return (
    <li
      ref={ref}
      data-reveal={reveal}
      className={RISE_ON_REVEAL}
      style={delay((index % 4) * 80)}
    >
      <div className="h-full rounded-3xl bg-white p-6 ring-1 ring-black/5">
        <span className="grid size-11 place-items-center rounded-2xl bg-brand-soft text-neutral-900">
          <Icon aria-hidden className="size-5" />
        </span>
        {/* wrap-break-word: a word too long for the card (German has some) wraps */}
        <h3 className="mt-5 text-lg leading-snug font-semibold wrap-break-word text-neutral-950">
          {name}
        </h3>
        <ul
          className={cn(
            "mt-3 space-y-2 text-sm leading-snug text-neutral-600",
            fontInter.className
          )}
        >
          {roles.map((role) => (
            <li key={role} className="flex gap-2.5">
              <span
                aria-hidden
                className="mt-[0.4em] size-1.5 shrink-0 rounded-full bg-brand"
              />
              <span className="min-w-0 wrap-break-word">{role}</span>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

/**
 * The work page's overview: the page's main heading, what the company offers, and the
 * roles on offer, grouped by field.
 */
export default function WorkInfo() {
  const t = useTranslations("works.info");
  const [headerRef, headerReveal] = useReveal<HTMLDivElement>();

  const groups = GROUPS.map(({ id, icon }) => ({
    id,
    icon,
    name: t(`roleGroups.${id}.name`),
    roles: t.raw(`roleGroups.${id}.roles`) as string[],
  }));
  const total = groups.reduce((sum, group) => sum + group.roles.length, 0);

  return (
    <section
      className={cn("bg-neutral-50 py-20 sm:py-24", fontPoppins.className)}
    >
      <div className="mx-auto w-full max-w-7xl px-4">
        <div ref={headerRef} data-reveal={headerReveal}>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end lg:gap-16">
            <div className="lg:col-span-7">
              <Eyebrow>{t("heading")}</Eyebrow>
              {/* The work page's main heading */}
              <h1 className="mt-5 text-[min(2.25rem,9vw)] leading-[1.1] font-semibold tracking-tight text-balance text-neutral-950 sm:text-5xl">
                <WordReveal
                  text={t("title")}
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
              {t("paragraph")}
            </p>
          </div>

          {/* How many roles there are, counted from the lists below */}
          <h2
            className={cn(
              "mt-14 flex items-center gap-3 border-t border-neutral-200 pt-10 text-xl font-semibold text-neutral-950 sm:mt-16",
              RISE_ON_REVEAL
            )}
            style={delay(400)}
          >
            {t("rolesHeading")}
            <span className="rounded-full bg-neutral-950 px-2.5 py-0.5 text-xs font-semibold text-brand tabular-nums">
              {total}
            </span>
          </h2>
        </div>

        <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {groups.map(({ id, ...group }, index) => (
            <RoleGroup key={id} {...group} index={index} />
          ))}
        </ul>
      </div>
    </section>
  );
}
