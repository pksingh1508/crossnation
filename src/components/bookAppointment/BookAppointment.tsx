"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { useLocale } from "next-intl";
import { MotionConfig, motion, type Transition } from "framer-motion";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Clock3,
  Euro,
  Handshake,
  MapPin,
  ShieldCheck,
  Video,
} from "lucide-react";
import { useTranslations } from "@/hooks/useTranslations";
import { useReveal } from "@/hooks/useReveal";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Eyebrow } from "@/components/ui/eyebrow";
import { WordReveal } from "@/components/ui/word-reveal";
import {
  MAPS_LINK,
  OFFICE_STREET,
  WhatsAppLogo,
} from "@/components/layout/header-links";
import { siteConfig } from "@/constants/site";
import { fontInter, fontPoppins } from "@/fonts";
import { delay, RISE_ON_REVEAL } from "@/lib/animation";
import { cn } from "@/lib/utils";
import { getLocalizedPath } from "@/lib/locale-paths";
import { BankDetails } from "./BankDetails";

// Stripe's payment page for each price
const STRIPE_LINKS = {
  100: "https://buy.stripe.com/3cIcN4fMbcEb6q993p5Rm02",
  80: "https://buy.stripe.com/eVqdR8fMbdIf4i1enJ5Rm03",
} as const;

// The ways to meet, the same for job seekers and for businesses. name: key in
// bookAppointment.
const MEETINGS = [
  { name: "meeting2", minutes: 30, price: 100, icon: Handshake, office: true },
  { name: "meeting1", minutes: 30, price: 100, icon: Video, office: false },
  {
    name: "meeting3",
    minutes: 15,
    price: 80,
    icon: WhatsAppLogo,
    office: false,
  },
] as const;

// Who the advice is for, a tab each; keys in bookAppointment
const AUDIENCES = [
  {
    tab: "audience1",
    heading: "heading1",
    text: "description1",
    icon: BriefcaseBusiness,
  },
  {
    tab: "audience2",
    heading: "heading2",
    text: "description2",
    icon: Building2,
  },
];

// The yellow pill glides between the tabs, as the navbar's does between links
const PILL_SPRING: Transition = {
  type: "spring",
  stiffness: 420,
  damping: 36,
  mass: 0.8,
};

const WORD =
  "reveal-waiting:translate-y-[125%] reveal-shown:animate-word motion-reduce:animate-none";

/** €100 in English, 100 € in Polish and German */
function useEuro() {
  const locale = useLocale();
  const format = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  });
  return (amount: number) => format.format(amount);
}

/**
 * The booking page: who the advice is for, the three ways to meet with their prices and
 * a link to pay for each on Stripe, and the bank account for paying by transfer instead.
 */
export function BookAppointment() {
  const locale = useLocale();

  return (
    <MotionConfig reducedMotion="user">
      {/* In the page's language, so long words (German has many) are hyphenated by its rules */}
      <div lang={locale} className={cn("bg-white", fontPoppins.className)}>
        <div className="container mx-auto px-4 pt-6">
          <Breadcrumbs
            items={[
              {
                name: "Book Appointment",
                href: getLocalizedPath(locale, "/book"),
              },
            ]}
          />
        </div>
        <Header />
        <Booking />
        <BankDetails />
      </div>
    </MotionConfig>
  );
}

/** The title, what the consultations are, and their terms at a glance */
function Header() {
  const t = useTranslations("bookAppointment");
  const euro = useEuro();
  const longest = Math.max(...MEETINGS.map((meeting) => meeting.minutes));
  const shortest = Math.min(...MEETINGS.map((meeting) => meeting.minutes));
  const cheapest = Math.min(...MEETINGS.map((meeting) => meeting.price));

  const facts = [
    {
      icon: Clock3,
      text: `${shortest}–${t("minutes", { count: longest })}`,
    },
    { icon: Euro, text: t("from", { price: euro(cheapest) }) },
    { icon: ShieldCheck, text: t("secure") },
  ];

  return (
    // On screen when the page opens, so shown from the start
    <header
      data-reveal="shown"
      className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 px-4 pt-8 lg:grid-cols-12 lg:items-end lg:gap-16 lg:pt-10"
    >
      <div className="lg:col-span-7">
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <h1 className="mt-5 text-[min(2.75rem,11vw)] leading-[1.05] font-semibold tracking-tight text-balance text-neutral-950 sm:text-6xl">
          <WordReveal
            text={t("title")}
            delay={100}
            className="reveal-shown:animate-word motion-reduce:animate-none"
          />
        </h1>
      </div>
      <div className="lg:col-span-5">
        <p
          className={cn(
            "text-lg leading-relaxed text-pretty text-neutral-600",
            fontInter.className,
            RISE_ON_REVEAL
          )}
          style={delay(350)}
        >
          {t("lead")}
        </p>
        <ul
          className={cn(
            "mt-6 flex flex-wrap gap-2 text-sm font-medium text-neutral-800",
            fontInter.className
          )}
        >
          {facts.map(({ icon: Icon, text }, index) => (
            <li
              key={text}
              className={cn(
                "inline-flex items-center gap-2 rounded-full bg-neutral-100 py-1.5 pr-3.5 pl-2.5",
                RISE_ON_REVEAL
              )}
              style={delay(450 + index * 70)}
            >
              <Icon aria-hidden className="size-4 text-neutral-500" />
              {text}
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

/**
 * Who the advice is for, chosen with two tabs, then the three ways to meet. The ways
 * and prices are the same for both, so they are shown once, below the tabs.
 */
function Booking() {
  const t = useTranslations("bookAppointment");
  const id = useId();
  const optionsId = useId();
  const [active, setActive] = useState(0);
  // After the first change of tab, the new description rises in on its own
  const [switched, setSwitched] = useState(false);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const [ref, reveal] = useReveal<HTMLDivElement>();

  const choose = (index: number) => {
    setActive(index);
    setSwitched(true);
  };

  // Arrow keys, Home and End move between the tabs, as in the WAI-ARIA tabs pattern
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const last = AUDIENCES.length - 1;
    const next = {
      ArrowRight: active === last ? 0 : active + 1,
      ArrowLeft: active === 0 ? last : active - 1,
      Home: 0,
      End: last,
    }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    choose(next);
    tabs.current[next]?.focus();
  };

  return (
    <div className="px-4 pt-14 pb-6 sm:pt-16">
      <div
        ref={ref}
        data-reveal={reveal}
        id="consultations"
        className="mx-auto w-full max-w-7xl scroll-mt-28 rounded-[2.5rem] bg-neutral-50 p-5 ring-1 ring-black/5 sm:p-10 lg:p-12"
      >
        {/* The tabs: a yellow pill slides to the chosen one */}
        <div
          role="tablist"
          aria-label={t("eyebrow")}
          onKeyDown={onKeyDown}
          className={cn(
            "grid grid-cols-[auto_auto] gap-1 rounded-full bg-white p-1.5 ring-1 ring-black/5 sm:inline-grid",
            RISE_ON_REVEAL
          )}
        >
          {AUDIENCES.map(({ tab, icon: Icon }, index) => {
            const selected = active === index;
            return (
              <button
                key={tab}
                ref={(node) => {
                  tabs.current[index] = node;
                }}
                type="button"
                role="tab"
                id={`${id}tab${index}`}
                aria-selected={selected}
                aria-controls={`${id}panel${index}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => choose(index)}
                className={cn(
                  "relative flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 sm:px-5 sm:text-[15px]",
                  selected
                    ? "text-neutral-950"
                    : "text-neutral-500 hover:text-neutral-950"
                )}
              >
                {selected && (
                  <motion.span
                    layoutId={`${id}pill`}
                    aria-hidden
                    transition={PILL_SPRING}
                    className="absolute inset-0 rounded-full bg-brand shadow-[0_8px_20px_-10px_rgba(254,204,0,0.95)]"
                  />
                )}
                <Icon
                  aria-hidden
                  className="relative size-4 shrink-0 max-sm:hidden"
                />
                <span className="relative text-center leading-tight text-balance hyphens-auto">
                  {t(tab)}
                </span>
              </button>
            );
          })}
        </div>

        {/* Both descriptions are in the page; the other one is hidden */}
        {AUDIENCES.map(({ heading, text, icon: Icon }, index) => (
          <div
            key={heading}
            role="tabpanel"
            id={`${id}panel${index}`}
            aria-labelledby={`${id}tab${index}`}
            hidden={active !== index}
            className={cn(
              "mt-8 grid gap-5 sm:mt-10 sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-7",
              switched
                ? "animate-rise motion-reduce:animate-none"
                : RISE_ON_REVEAL
            )}
            style={switched ? undefined : delay(120)}
          >
            <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-neutral-950 text-brand shadow-[0_18px_36px_-18px_rgba(15,23,42,0.6)]">
              <Icon aria-hidden className="size-6" />
            </span>
            <div className="min-w-0">
              <h2 className="max-w-3xl text-2xl leading-snug font-semibold text-balance hyphens-auto text-neutral-950 sm:text-3xl">
                {t(heading)}
              </h2>
              <p
                className={cn(
                  "mt-4 max-w-3xl text-lg leading-relaxed text-pretty text-neutral-600",
                  fontInter.className
                )}
              >
                {t(text)}
              </p>
            </div>
          </div>
        ))}

        <section aria-labelledby={optionsId} className="mt-12 sm:mt-14">
          <h2
            id={optionsId}
            className="text-xl font-semibold text-neutral-950 sm:text-2xl"
          >
            <WordReveal
              text={t("optionsTitle")}
              delay={200}
              stagger={45}
              className={WORD}
            />
          </h2>
          <ul className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
            {MEETINGS.map((meeting, index) => (
              <MeetingCard
                key={meeting.name}
                {...meeting}
                start={300 + index * 110}
              />
            ))}
          </ul>
          <p
            className={cn(
              "mt-6 flex items-center justify-center gap-2 text-sm text-neutral-500",
              fontInter.className,
              RISE_ON_REVEAL
            )}
            style={delay(650)}
          >
            <ShieldCheck aria-hidden className="size-4 shrink-0" />
            {t("secure")}
          </p>
        </section>
      </div>
    </div>
  );
}

interface MeetingCardProps {
  name: string;
  minutes: number;
  price: keyof typeof STRIPE_LINKS;
  icon: typeof Video | typeof WhatsAppLogo;
  /** At our office: its address shows, linked to the map */
  office: boolean;
  /** When it rises in after the panel comes into view, in ms */
  start: number;
}

/**
 * A way to meet: how long it is and what it costs, and a link to pay for it on Stripe.
 * On hover the card lifts, its icon turns yellow and the arrow slides on.
 */
function MeetingCard({
  name,
  minutes,
  price,
  icon: Icon,
  office,
  start,
}: MeetingCardProps) {
  const t = useTranslations("bookAppointment");
  const euro = useEuro();

  return (
    <li
      className={cn(
        "group/meeting flex flex-col rounded-[2rem] bg-white p-6 ring-1 ring-black/5 transition-[translate,box-shadow] duration-500 ease-out-quint hover:shadow-[0_28px_56px_-30px_rgba(15,23,42,0.45)] motion-safe:hover:-translate-y-1 sm:p-7",
        RISE_ON_REVEAL
      )}
      style={delay(start)}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-soft text-neutral-900 transition-[background-color,rotate] duration-300 ease-out-quint group-hover/meeting:bg-brand motion-safe:group-hover/meeting:-rotate-6">
          <Icon aria-hidden className="size-5" />
        </span>
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1.5 text-sm font-medium whitespace-nowrap text-neutral-700",
            fontInter.className
          )}
        >
          <Clock3 aria-hidden className="size-4 text-neutral-500" />
          {t("minutes", { count: minutes })}
        </span>
      </div>

      <h3 className="mt-6 text-lg leading-snug font-semibold text-balance hyphens-auto text-neutral-950 sm:text-xl">
        {t(name)}
      </h3>
      {office && (
        <a
          href={MAPS_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "mt-2 inline-flex items-start gap-1.5 self-start rounded-sm text-sm leading-snug text-neutral-500 transition-colors duration-200 outline-none hover:text-neutral-950 focus-visible:ring-2 focus-visible:ring-neutral-950",
            fontInter.className
          )}
        >
          <MapPin aria-hidden className="mt-px size-4 shrink-0" />
          {OFFICE_STREET}, {siteConfig.contact.address.city}
        </a>
      )}

      <p className="mt-auto pt-8 text-4xl font-semibold tracking-tight text-neutral-950 tabular-nums">
        {euro(price)}
      </p>
      <a
        href={STRIPE_LINKS[price]}
        className="group/cta relative mt-5 inline-flex min-h-12 items-center justify-center gap-2 overflow-hidden rounded-full bg-brand px-6 py-3 text-[15px] font-semibold text-neutral-950 shadow-[0_10px_24px_-12px_rgba(254,204,0,0.95)] transition-[translate,box-shadow] duration-300 ease-out-quint outline-none hover:shadow-[0_16px_32px_-14px_rgba(254,204,0,1)] focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 motion-safe:hover:-translate-y-0.5"
      >
        {/* A light sheen sweeps across on hover, as on the navbar's booking button */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-white/70 to-transparent group-hover/cta:translate-x-[400%] group-hover/cta:transition-transform group-hover/cta:duration-700 group-hover/cta:ease-out motion-reduce:hidden"
        />
        <span className="relative">{t("bookNow")}</span>
        <ArrowRight
          aria-hidden
          className="relative size-4 transition-transform duration-300 ease-out-quint group-hover/cta:translate-x-1"
        />
      </a>
    </li>
  );
}
