"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { ArrowUp, ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { useTranslations } from "@/hooks/useTranslations";
import { useReveal } from "@/hooks/useReveal";
import { useLenis } from "@/utils/lenis";
import { siteConfig } from "@/constants/site";
import { NAVBAR_LINKS } from "@/constants/data";
import { fontInter, fontPoppins } from "@/fonts";
import { delay, RISE_ON_REVEAL } from "@/lib/animation";
import { countryName } from "@/lib/country-name";
import { cn } from "@/lib/utils";
import { getLocalizedPath } from "@/lib/locale-paths";
import { EMAIL_LINK, PHONE_LINK, SOCIAL_LINKS } from "./header-links";
import { FooterSpotlight } from "./FooterSpotlight";

const { address } = siteConfig.contact;
const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${address.street}, ${address.zipCode} ${address.city}, ${address.country}`
)}`;

// Official websites for migrants; labels in footer.governmentLinks
const GOVERNMENT_LINKS = [
  { label: "link1", href: "https://gov.pl" },
  { label: "link2", href: "https://migri.fi" },
  { label: "link3", href: "https://bamf.de" },
  { label: "link4", href: "https://europa.eu" },
  { label: "link5", href: "https://stat.gov.pl/en/" },
];

/** A link in the footer's dark colours. It slides a little to the right on hover. */
const LINK =
  "inline-block rounded-sm text-[15px] text-neutral-400 [overflow-wrap:anywhere] hyphens-auto transition-[color,translate] duration-300 ease-out-quint outline-none hover:text-white focus-visible:ring-2 focus-visible:ring-brand/70 motion-safe:hover:translate-x-1";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const locale = useLocale();
  const localized = (path: string) => getLocalizedPath(locale, path);
  const [ref, reveal] = useReveal<HTMLDivElement>();

  return (
    <footer
      className={cn(
        "relative isolate mt-auto overflow-hidden bg-neutral-950 text-neutral-400",
        fontPoppins.className
      )}
    >
      <FooterSpotlight />

      <div
        ref={ref}
        data-reveal={reveal}
        className="relative mx-auto w-full max-w-7xl px-4"
      >
        <div className="grid gap-14 pt-20 pb-16 sm:pt-24 lg:grid-cols-12 lg:gap-8">
          <div className={cn("lg:col-span-4", RISE_ON_REVEAL)}>
            <Link
              href={localized("/")}
              className="inline-block rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-brand/70"
            >
              <Image
                src="/EU-logo.jpeg"
                alt={siteConfig.name}
                width={135}
                height={48}
                className="h-12 w-auto rounded-lg"
              />
            </Link>
            <p
              className={cn(
                "mt-6 max-w-sm leading-relaxed text-neutral-400",
                fontInter.className
              )}
            >
              {t("company.description")}
            </p>

            <ul className={cn("mt-8 space-y-4", fontInter.className)}>
              <ContactRow icon={MapPin} href={MAPS_LINK} external>
                {address.street}
                <br />
                {address.zipCode} {address.city}, {countryName(locale)}
              </ContactRow>
              <ContactRow icon={Phone} href={PHONE_LINK.href}>
                {PHONE_LINK.label}
              </ContactRow>
              <ContactRow icon={Mail} href={EMAIL_LINK.href}>
                {EMAIL_LINK.label}
              </ContactRow>
            </ul>

            <ul className="mt-8 flex gap-2">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="grid size-10 place-items-center rounded-full text-neutral-300 ring-1 ring-white/15 transition-[background-color,color,box-shadow,translate] duration-300 ease-out-quint outline-none hover:bg-brand hover:text-neutral-950 hover:ring-brand focus-visible:ring-2 focus-visible:ring-brand motion-safe:hover:-translate-y-0.5"
                  >
                    <Icon className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-4 lg:col-span-8">
            <LinkGroup title={t("heading.solution")} start={80}>
              {NAVBAR_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={localized(link.href)} className={LINK}>
                    {tNav(link.href.slice(1))}
                  </Link>
                </li>
              ))}
            </LinkGroup>

            <div className="space-y-12">
              <LinkGroup title={t("heading.update")} start={160}>
                {[
                  { href: "/blog", label: t("updates.blog") },
                  { href: "/immigration-news", label: t("updates.news") },
                ].map((link) => (
                  <li key={link.href}>
                    <Link href={localized(link.href)} className={LINK}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </LinkGroup>
              <LinkGroup title={t("heading.story")} start={200}>
                {[
                  { href: "/success-stories", label: t("successStory.story1") },
                  { href: "/work-permit", label: t("successStory.story2") },
                  { href: "/visa-stamp", label: t("successStory.story3") },
                ].map((link) => (
                  <li key={link.href}>
                    <Link href={localized(link.href)} className={LINK}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </LinkGroup>
            </div>

            <LinkGroup title={t("heading.links")} start={240}>
              {GOVERNMENT_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(LINK, "group/ext")}
                  >
                    <WithTrailingIcon text={t(`governmentLinks.${link.label}`)}>
                      <ArrowUpRight
                        aria-hidden
                        className="ml-1 inline size-3.5 align-[-0.1em] opacity-60 transition-[translate,opacity] duration-300 ease-out-quint group-hover/ext:translate-x-0.5 group-hover/ext:-translate-y-0.5 group-hover/ext:opacity-100"
                      />
                    </WithTrailingIcon>
                  </a>
                </li>
              ))}
            </LinkGroup>

            <LinkGroup title={t("heading.condition")} start={320}>
              {[
                { href: "/privacy-policy", label: t("bottom.privacyPolicy") },
                { href: "/refund-policy", label: t("bottom.refundPolicy") },
                {
                  href: "/terms-conditions",
                  label: t("bottom.termsOfService"),
                },
                {
                  href: "/antiFraud-policy",
                  label: t("bottom.antiFraudPolicy"),
                },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={localized(link.href)} className={LINK}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </LinkGroup>
          </div>
        </div>

        {/* Copyright, the company's Polish registration numbers, and a way back up */}
        <div
          className={cn(
            "flex flex-col gap-4 border-t border-white/10 py-8 text-sm text-neutral-500 xl:flex-row xl:items-center xl:justify-between",
            fontInter.className
          )}
        >
          <p>{t("bottom.copyright", { year: new Date().getFullYear() })}</p>
          <p className="flex flex-wrap gap-x-5 gap-y-1">
            <span>{t("info.NIP")}</span>
            <span>{t("info.KRS")}</span>
            <span>{t("info.REGON")}</span>
          </p>
          <BackToTop label={t("bottom.backToTop")} />
        </div>
      </div>

      <Wordmark />
    </footer>
  );
}

/**
 * The company name, huge and faint, sitting on the page's bottom edge. Its letters rise
 * into place one after another when it comes into view.
 */
function Wordmark() {
  // It ends the page, so it reveals as soon as it starts to show
  const [ref, reveal] = useReveal<HTMLDivElement>({ atEdge: true });

  return (
    <div
      ref={ref}
      data-reveal={reveal}
      aria-hidden
      className="relative mx-auto w-full max-w-7xl overflow-hidden px-4 select-none"
    >
      <p className="-mb-[0.04em] text-center text-[min(calc(12.3vw-4px),9.6rem)] leading-[0.82] font-semibold tracking-tight whitespace-nowrap">
        {[...siteConfig.name].map((letter, index) => (
          <span
            key={index}
            className="inline-block bg-gradient-to-b from-white/[0.16] to-white/[0.02] bg-clip-text pt-[0.06em] text-transparent reveal-waiting:translate-y-[125%] reveal-shown:animate-word motion-reduce:animate-none"
            style={delay(100 + index * 35)}
          >
            {letter === " " ? "\u00a0" : letter}
          </span>
        ))}
      </p>
    </div>
  );
}

/** Scrolls smoothly back to the top of the page */
function BackToTop({ label }: { label: string }) {
  const lenis = useLenis();

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (lenis) {
      lenis.scrollTo(0, { duration: reduceMotion ? 0 : 1.6 });
    } else {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    }
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className="group/top inline-flex cursor-pointer items-center gap-3 self-start rounded-full font-medium whitespace-nowrap text-neutral-300 transition-colors duration-300 outline-none hover:text-white focus-visible:ring-2 focus-visible:ring-brand/70 xl:self-auto"
    >
      {label}
      <span className="grid size-9 place-items-center rounded-full ring-1 ring-white/15 transition-[background-color,box-shadow,color] duration-300 group-hover/top:bg-brand group-hover/top:text-neutral-950 group-hover/top:ring-brand">
        <ArrowUp
          aria-hidden
          className="size-4 transition-transform duration-300 ease-out-quint group-hover/top:-translate-y-0.5"
        />
      </span>
    </button>
  );
}

/** Text with an icon after it that never wraps onto a line of its own */
function WithTrailingIcon({
  text,
  children,
}: {
  text: string;
  children: ReactNode;
}) {
  const at = text.lastIndexOf(" ") + 1;
  return (
    <>
      {text.slice(0, at)}
      <span className="whitespace-nowrap">
        {text.slice(at)}
        {children}
      </span>
    </>
  );
}

function LinkGroup({
  title,
  start,
  children,
}: {
  title: string;
  /** When it rises into view, in ms after the footer appears */
  start: number;
  children: ReactNode;
}) {
  return (
    <div className={RISE_ON_REVEAL} style={delay(start)}>
      <h2 className="text-sm font-semibold text-white">{title}</h2>
      <ul className={cn("mt-5 space-y-3", fontInter.className)}>{children}</ul>
    </div>
  );
}

function ContactRow({
  icon: Icon,
  href,
  external = false,
  children,
}: {
  icon: typeof Phone;
  href: string;
  external?: boolean;
  children: ReactNode;
}) {
  return (
    <li>
      <a
        href={href}
        {...(external && { target: "_blank", rel: "noopener noreferrer" })}
        className="group/row flex items-start gap-3 rounded-sm text-neutral-300 transition-colors duration-200 outline-none hover:text-white focus-visible:ring-2 focus-visible:ring-brand/70"
      >
        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white/5 text-brand ring-1 ring-white/10 transition-colors duration-200 group-hover/row:bg-brand group-hover/row:text-neutral-950">
          <Icon aria-hidden className="size-3.5" />
        </span>
        <span className="pt-1 leading-relaxed">{children}</span>
      </a>
    </li>
  );
}
