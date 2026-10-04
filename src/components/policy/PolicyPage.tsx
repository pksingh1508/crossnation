"use client";

import { useId, useMemo, useRef } from "react";
import Link from "next/link";
import { useLocale, useMessages, type AbstractIntlMessages } from "next-intl";
import { MotionConfig } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Clock,
  Link2,
  MessageCircleQuestion,
} from "lucide-react";
import { useTranslations } from "@/hooks/useTranslations";
import { useReveal } from "@/hooks/useReveal";
import { useGoToSection } from "@/hooks/useGoToSection";
import { Eyebrow } from "@/components/ui/eyebrow";
import { WordReveal } from "@/components/ui/word-reveal";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ReadingProgress } from "@/components/articles/ArticleTools";
import { fontInter, fontPoppins } from "@/fonts";
import { delay, RISE_ON_REVEAL } from "@/lib/animation";
import { linkify } from "@/lib/linkify";
import { cn } from "@/lib/utils";
import { getLocalizedPath } from "@/lib/locale-paths";
import {
  PolicyContents,
  PolicyContentsMenu,
  SCROLL_OFFSET,
  useActiveSection,
} from "./PolicyContents";
import {
  POLICIES,
  readPolicy,
  type PolicyKey,
  type PolicyNote,
  type PolicyPoint,
  type PolicySection,
} from "./policies";

/** Words read in a minute, for the reading time */
const WORDS_PER_MINUTE = 200;

/**
 * A legal page: privacy, refunds, terms, anti-fraud. Its title is the name of the link
 * that leads to it, with the document's own title below. Beside the text, a list of the
 * sections marks the one being read; on phones it opens from a button. Every section can
 * be linked to (#section-3). A yellow bar at the top of the window shows how far the text
 * has been read. The other legal pages follow at the end.
 */
export function PolicyPage({ policy }: { policy: PolicyKey }) {
  const { path, namespace, label, breadcrumb, icon: Icon } = POLICIES[policy];
  const t = useTranslations("policy");
  const tPages = useTranslations("footer.bottom");
  const locale = useLocale();
  const messages = useMessages();
  const policyDocument = useMemo(
    () => readPolicy(messages[namespace] as AbstractIntlMessages),
    [messages, namespace]
  );
  const { sections } = policyDocument;
  const active = useActiveSection(sections);
  const goTo = useGoToSection(SCROLL_OFFSET);
  const text = useRef<HTMLDivElement>(null);
  const minutes = Math.max(
    1,
    Math.round(policyDocument.words / WORDS_PER_MINUTE)
  );

  return (
    <MotionConfig reducedMotion="user">
      {/* In the page's language, so long words (German has many) are hyphenated by its rules */}
      <div lang={locale} className={cn("bg-white", fontPoppins.className)}>
        <ReadingProgress target={text} />

        <div className="container mx-auto px-4 pt-6">
          <Breadcrumbs
            items={[{ name: breadcrumb, href: getLocalizedPath(locale, path) }]}
          />
        </div>

        {/* On screen when the page opens, so shown from the start */}
        <header
          data-reveal="shown"
          className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 px-4 pt-8 lg:grid-cols-12 lg:items-end lg:gap-16 lg:pt-10"
        >
          <div className="lg:col-span-7">
            <Eyebrow>{t("eyebrow")}</Eyebrow>
            <h1 className="mt-5 text-[min(2.75rem,11vw)] leading-[1.05] font-semibold tracking-tight text-balance text-neutral-950 sm:text-6xl">
              <WordReveal
                text={tPages(label)}
                delay={100}
                className="reveal-shown:animate-word motion-reduce:animate-none"
              />
            </h1>
          </div>
          <div className="lg:col-span-5">
            <p
              className={cn(
                "text-lg leading-relaxed text-neutral-600",
                fontInter.className,
                RISE_ON_REVEAL
              )}
              style={delay(350)}
            >
              {policyDocument.title}
            </p>
            <p
              className={cn(
                "mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-neutral-500",
                fontInter.className,
                RISE_ON_REVEAL
              )}
              style={delay(450)}
            >
              <span className="inline-flex items-center gap-2">
                <Icon aria-hidden className="size-4" />
                {t("sections", { count: sections.length })}
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock aria-hidden className="size-4" />
                {t("readingTime", { minutes })}
              </span>
            </p>
          </div>
        </header>

        <div className="mx-auto mt-12 grid w-full max-w-7xl grid-cols-1 px-4 pb-20 sm:mt-16 sm:pb-24 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-x-16 xl:grid-cols-[18rem_minmax(0,1fr)]">
          <aside data-reveal="shown" className="hidden lg:block">
            <PolicyContents
              sections={sections}
              active={active}
              onGo={goTo}
              className={RISE_ON_REVEAL}
              style={delay(550)}
            />
          </aside>

          <div className="min-w-0">
            <div data-reveal="shown" className="lg:hidden">
              <PolicyContentsMenu
                sections={sections}
                active={active}
                onGo={goTo}
                className={cn("mb-10", RISE_ON_REVEAL)}
                style={delay(550)}
              />
            </div>

            <div ref={text} className="max-w-3xl">
              {sections.map((section) => (
                <PolicySectionView
                  key={section.id}
                  section={section}
                  onGo={goTo}
                />
              ))}
            </div>

            <PolicyEnd
              others={(Object.keys(POLICIES) as PolicyKey[]).filter(
                (key) => key !== policy
              )}
            />
          </div>
        </div>
      </div>
    </MotionConfig>
  );
}

interface PolicySectionViewProps {
  section: PolicySection;
  onGo: (id: string) => void;
}

/**
 * A numbered section: its points, each with the points it introduces in a box below it,
 * and its notes highlighted in yellow. It rises into view as it scrolls in. A link beside
 * the heading, shown on hover, leads to it.
 */
function PolicySectionView({ section, onGo }: PolicySectionViewProps) {
  const t = useTranslations("policy");
  const [ref, reveal] = useReveal<HTMLElement>();
  const { id, number, title, content } = section;

  // Points in a row form one list; a note stands on its own
  const groups: (PolicyPoint[] | PolicyNote)[] = [];
  for (const block of content) {
    const last = groups.at(-1);
    if (block.kind === "note") groups.push(block);
    else if (Array.isArray(last)) last.push(block);
    else groups.push([block]);
  }

  return (
    <section
      ref={ref}
      id={id}
      data-reveal={reveal}
      aria-labelledby={`${id}-title`}
      className="scroll-mt-28 border-t border-neutral-200 py-10 first:border-t-0 first:pt-0 sm:py-12"
    >
      <div className={RISE_ON_REVEAL}>
        <div className="group/title flex items-start gap-3">
          <h2
            id={`${id}-title`}
            // The contents move the focus here
            tabIndex={-1}
            className="flex min-w-0 flex-1 items-start gap-4 text-xl leading-snug font-semibold text-neutral-950 outline-none sm:text-2xl"
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-brand-soft text-sm font-semibold tabular-nums ring-1 ring-brand/50 ring-inset sm:size-10">
              {number}
            </span>
            <span className="min-w-0 self-center hyphens-auto wrap-break-word">
              {title}
            </span>
          </h2>
          <a
            href={`#${id}`}
            aria-label={t("linkToSection")}
            onClick={(event) => {
              event.preventDefault();
              onGo(id);
            }}
            className="mt-1 grid size-8 shrink-0 place-items-center rounded-lg text-neutral-400 opacity-0 transition-[opacity,background-color,color] duration-200 outline-none group-hover/title:opacity-100 hover:bg-neutral-100 hover:text-neutral-950 focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-neutral-950 max-lg:hidden"
          >
            <Link2 aria-hidden className="size-4" />
          </a>
        </div>

        <div
          className={cn(
            "mt-5 space-y-5 leading-relaxed hyphens-auto wrap-break-word text-neutral-700 sm:pl-14",
            fontInter.className
          )}
        >
          {groups.map((group, index) =>
            Array.isArray(group) ? (
              <ul key={index} className="space-y-3">
                {group.map((point, pointIndex) => (
                  <li
                    key={pointIndex}
                    className={cn("relative text-pretty", point.text && "pl-6")}
                  >
                    {point.text && (
                      <span
                        aria-hidden
                        className="absolute top-[0.5lh] left-0.5 size-1.5 -translate-y-1/2 rounded-full bg-brand ring-4 ring-brand/20"
                      />
                    )}
                    {linkify(point.text)}
                    {point.items.length > 0 && (
                      <SubPoints
                        items={point.items}
                        className="mt-3 rounded-xl bg-neutral-50 px-4 py-3 ring-1 ring-black/5"
                      />
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <div
                key={index}
                className="rounded-2xl border-l-4 border-brand bg-brand-soft/60 px-5 py-4 sm:px-6 sm:py-5"
              >
                <h3 className="font-semibold text-neutral-950">
                  {group.title}
                </h3>
                <SubPoints items={group.items} className="mt-2" />
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}

/** Points that belong to another point or to a note, marked with dashes */
function SubPoints({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  return (
    <ul className={cn("space-y-2", className)}>
      {items.map((item, index) => (
        <li key={index} className="relative pl-5 text-pretty">
          <span
            aria-hidden
            className="absolute top-[0.5lh] left-0 h-px w-2.5 bg-neutral-400"
          />
          {linkify(item)}
        </li>
      ))}
    </ul>
  );
}

/** After the text: who to ask, and the other legal pages */
function PolicyEnd({ others }: { others: PolicyKey[] }) {
  const t = useTranslations("policy");
  const tPages = useTranslations("footer.bottom");
  const locale = useLocale();
  const [ref, reveal] = useReveal<HTMLDivElement>({ atEdge: true });
  const othersId = useId();

  return (
    <div
      ref={ref}
      data-reveal={reveal}
      className="mt-6 max-w-3xl space-y-12 border-t border-neutral-200 pt-12"
    >
      <div
        className={cn(
          "flex flex-col gap-6 rounded-[2rem] bg-neutral-950 p-7 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8",
          RISE_ON_REVEAL
        )}
      >
        <div className="flex items-start gap-4">
          <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-brand text-neutral-950">
            <MessageCircleQuestion aria-hidden className="size-5" />
          </span>
          <div>
            <p className="text-lg font-semibold">{t("questions")}</p>
            <p
              className={cn(
                "mt-1 text-sm leading-relaxed text-white/70",
                fontInter.className
              )}
            >
              {t("questionsText")}
            </p>
          </div>
        </div>
        <Link
          href={getLocalizedPath(locale, "/contact")}
          className="group/cta inline-flex h-11 shrink-0 items-center gap-2 self-start rounded-full bg-brand px-5 text-sm font-semibold text-neutral-950 transition-[translate,box-shadow] duration-300 ease-out-quint outline-none hover:shadow-[0_12px_28px_-12px_rgba(254,204,0,0.9)] focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 motion-safe:hover:-translate-y-0.5 sm:self-center"
        >
          {t("contactUs")}
          <ArrowRight
            aria-hidden
            className="size-4 transition-transform duration-300 ease-out-quint group-hover/cta:translate-x-1"
          />
        </Link>
      </div>

      <nav
        aria-labelledby={othersId}
        className={RISE_ON_REVEAL}
        style={delay(120)}
      >
        <h2
          id={othersId}
          className="text-sm font-semibold tracking-[0.2em] text-neutral-500 uppercase"
        >
          {t("otherPolicies")}
        </h2>
        <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {others.map((key) => {
            const { path, label, icon: Icon } = POLICIES[key];
            return (
              <li key={key}>
                <Link
                  href={getLocalizedPath(locale, path)}
                  className="group/policy flex h-full items-center gap-3 rounded-2xl border border-neutral-200 p-4 transition-[border-color,box-shadow,translate] duration-300 ease-out-quint outline-none hover:border-neutral-950 hover:shadow-[0_16px_32px_-24px_rgba(15,23,42,0.5)] focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 motion-safe:hover:-translate-y-0.5"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-neutral-100 text-neutral-700 transition-colors duration-300 group-hover/policy:bg-brand group-hover/policy:text-neutral-950">
                    <Icon aria-hidden className="size-5" />
                  </span>
                  <span className="min-w-0 flex-1 font-semibold hyphens-auto wrap-break-word text-neutral-950">
                    {tPages(label)}
                  </span>
                  <ArrowUpRight
                    aria-hidden
                    className="size-4 shrink-0 text-neutral-400 transition-[translate,color] duration-300 ease-out-quint group-hover/policy:translate-x-0.5 group-hover/policy:-translate-y-0.5 group-hover/policy:text-neutral-950"
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
