"use client";

import { useId } from "react";
import { useLocale } from "next-intl";
import {
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
  Send,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "@/hooks/useTranslations";
import { MyForm } from "@/components/sections/MyForm";
import { Eyebrow } from "@/components/ui/eyebrow";
import { WordReveal } from "@/components/ui/word-reveal";
import {
  EMAIL_LINK,
  MAPS_LINK,
  OFFICE_STREET,
  PHONE_LINK,
  SOCIAL_LINKS,
} from "@/components/layout/header-links";
import { siteConfig } from "@/constants/site";
import { fontInter, fontPoppins } from "@/fonts";
import { delay, RISE_ON_REVEAL } from "@/lib/animation";
import { countryName } from "@/lib/country-name";
import { cn } from "@/lib/utils";

const { address } = siteConfig.contact;

interface MethodProps {
  icon: LucideIcon;
  label: string;
  href: string;
  /** Opens in a new tab */
  external?: boolean;
  lines: string[];
  /** When it comes in, in ms */
  start: number;
}

/** One way to reach us, as a card that links to it: a map, a call or an email */
function Method({
  icon: Icon,
  label,
  href,
  external,
  lines,
  start,
}: MethodProps) {
  return (
    <li className={RISE_ON_REVEAL} style={delay(start)}>
      <a
        href={href}
        {...(external && { target: "_blank", rel: "noopener noreferrer" })}
        className="group/method flex items-center gap-3 rounded-2xl border border-neutral-200 bg-white p-4 transition-[translate,border-color,box-shadow] duration-300 ease-out-quint outline-none hover:border-brand hover:shadow-[0_16px_32px_-20px_rgba(15,23,42,0.4)] focus-visible:ring-2 focus-visible:ring-neutral-950 motion-safe:hover:-translate-y-0.5 sm:gap-4"
      >
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-soft text-neutral-900 transition-colors duration-300 group-hover/method:bg-brand sm:size-11">
          <Icon aria-hidden className="size-5" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-xs font-semibold tracking-[0.15em] text-neutral-500 uppercase">
            {label}
          </span>
          {lines.map((line) => (
            <span
              key={line}
              className={cn(
                "mt-0.5 block font-medium wrap-break-word text-neutral-950",
                fontInter.className
              )}
            >
              {/* An email address may break after its "@", and only there */}
              {line.includes("@") ? (
                <>
                  {line.split("@")[0]}@<wbr />
                  {line.split("@")[1]}
                </>
              ) : (
                line
              )}
            </span>
          ))}
        </span>
        {/* The whole card is the link; on phones the arrow is left out for room */}
        <ArrowUpRight
          aria-hidden
          className="size-5 shrink-0 text-neutral-300 max-sm:hidden transition-[translate,color] duration-300 ease-out-quint group-hover/method:translate-x-0.5 group-hover/method:-translate-y-0.5 group-hover/method:text-neutral-950"
        />
      </a>
    </li>
  );
}

/**
 * The top of the contact page: the ways to reach us beside the message form. On large
 * screens the left column stays in view while the longer form scrolls past.
 */
export function ContactContainer() {
  const t = useTranslations("pages.contact");
  const tCommon = useTranslations("pages.commonContact");
  const locale = useLocale();
  const formTitleId = useId();

  const methods = [
    {
      icon: MapPin,
      label: t("info.address.title"),
      href: MAPS_LINK,
      external: true,
      lines: [
        OFFICE_STREET,
        `${address.zipCode} ${address.city}, ${countryName(locale)}`,
      ],
    },
    {
      icon: Phone,
      label: t("info.callUs.title"),
      href: PHONE_LINK.href,
      lines: [PHONE_LINK.label],
    },
    {
      icon: Mail,
      label: t("info.email.title"),
      href: EMAIL_LINK.href,
      lines: [EMAIL_LINK.label],
    },
  ];

  return (
    <section className={cn("bg-white", fontPoppins.className)}>
      {/* On screen when the page opens, so shown from the start: its entrance
          animations play with the first paint */}
      <div
        data-reveal="shown"
        className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-4 pt-12 pb-20 sm:pt-16 sm:pb-24 lg:grid-cols-12 lg:gap-16 lg:pt-20 xl:gap-20"
      >
        <div className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
          <Eyebrow>{siteConfig.name}</Eyebrow>
          {/* The contact page's main heading */}
          <h1 className="mt-5 text-[min(2.75rem,11vw)] leading-[1.05] font-semibold tracking-tight text-balance text-neutral-950 sm:text-6xl lg:text-5xl xl:text-6xl">
            <WordReveal
              text={t("title")}
              delay={100}
              className="reveal-shown:animate-word motion-reduce:animate-none"
            />
          </h1>
          <p
            className={cn(
              "mt-5 max-w-md leading-relaxed text-neutral-600 sm:text-lg",
              fontInter.className,
              RISE_ON_REVEAL
            )}
            style={delay(350)}
          >
            {t("description")}
          </p>

          <h2
            className={cn(
              "mt-10 text-lg font-semibold text-neutral-950",
              RISE_ON_REVEAL
            )}
            style={delay(450)}
          >
            {t("info.title")}
          </h2>
          <ul className="mt-4 grid grid-cols-1 gap-3">
            {methods.map((method, index) => (
              <Method key={method.href} {...method} start={520 + index * 80} />
            ))}
          </ul>

          <div
            className={cn(
              "mt-10 flex flex-wrap items-center gap-x-4 gap-y-3",
              RISE_ON_REVEAL
            )}
            style={delay(800)}
          >
            <h2 className="text-sm font-semibold text-neutral-950">
              {t("follow.title")}
            </h2>
            <span aria-hidden className="h-px flex-1 bg-neutral-200" />
            <ul className="flex items-center gap-2">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="grid size-10 place-items-center rounded-full border border-neutral-200 text-neutral-600 transition-[translate,background-color,border-color,color] duration-300 ease-out-quint outline-none hover:border-brand hover:bg-brand hover:text-neutral-950 focus-visible:ring-2 focus-visible:ring-neutral-950 motion-safe:hover:-translate-y-0.5"
                  >
                    <Icon className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* The form's card, with a yellow block behind it that echoes the logo */}
        <div className="relative lg:col-span-7">
          <div
            aria-hidden
            className={cn(
              "absolute -right-3 -bottom-3 h-2/3 w-2/3 rounded-[2rem] bg-brand sm:-right-4 sm:-bottom-4",
              RISE_ON_REVEAL
            )}
            style={delay(500)}
          />
          <div
            className={cn(
              "relative rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-[0_30px_60px_-30px_rgba(15,23,42,0.25)] sm:p-8 lg:p-10",
              RISE_ON_REVEAL
            )}
            style={delay(250)}
          >
            <div className="flex flex-col items-start gap-4 min-[360px]:flex-row">
              <span
                aria-hidden
                className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand text-neutral-950 shadow-[0_14px_28px_-12px_rgba(254,204,0,0.9)]"
              >
                <Send className="size-5" />
              </span>
              <div>
                <h2
                  id={formTitleId}
                  className="text-xl leading-snug font-semibold text-neutral-950 sm:text-2xl"
                >
                  {t("form.title")}
                </h2>
                <p
                  className={cn(
                    "mt-1 leading-relaxed text-neutral-600",
                    fontInter.className
                  )}
                >
                  {tCommon("formInstruction")}
                </p>
              </div>
            </div>

            <MyForm withMessage labelledBy={formTitleId} className="mt-8" />
          </div>
        </div>
      </div>
    </section>
  );
}
