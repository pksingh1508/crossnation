"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarCheck,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { useTranslations } from "@/hooks/useTranslations";
import { useReveal } from "@/hooks/useReveal";
import { siteConfig } from "@/constants/site";
import { NAVBAR_LINKS } from "@/constants/data";
import { fontInter, fontPoppins } from "@/fonts";
import { delay, RISE_ON_REVEAL } from "@/lib/animation";
import { countryName } from "@/lib/country-name";
import { cn } from "@/lib/utils";
import { getLocalizedPath } from "@/lib/locale-paths";
import { EMAIL_LINK, PHONE_LINK, SOCIAL_LINKS } from "./header-links";

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

/** A link in the footer's dark colours */
const LINK =
  "rounded-sm text-[15px] text-neutral-400 [overflow-wrap:anywhere] hyphens-auto transition-colors duration-200 outline-none hover:text-white focus-visible:ring-2 focus-visible:ring-brand/70";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const locale = useLocale();
  const localized = (path: string) => getLocalizedPath(locale, path);

  return (
    <footer
      className={cn(
        "mt-auto bg-neutral-950 text-neutral-400",
        fontPoppins.className
      )}
    >
      <div className="mx-auto w-full max-w-7xl px-4">
        <CallToAction />

        <div className="grid gap-12 py-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
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

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:col-span-8">
            <LinkGroup title={t("heading.solution")}>
              {NAVBAR_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={localized(link.href)} className={LINK}>
                    {tNav(link.href.slice(1))}
                  </Link>
                </li>
              ))}
            </LinkGroup>

            <div className="space-y-10">
              <LinkGroup title={t("heading.update")}>
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
              <LinkGroup title={t("heading.story")}>
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

            <LinkGroup title={t("heading.links")}>
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

            <LinkGroup title={t("heading.condition")}>
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

        {/* Copyright, and the company's Polish registration numbers */}
        <div
          className={cn(
            "flex flex-col gap-3 border-t border-white/10 py-8 text-sm text-neutral-500 md:flex-row md:items-center md:justify-between",
            fontInter.className
          )}
        >
          <p>{t("bottom.copyright", { year: new Date().getFullYear() })}</p>
          <p className="flex flex-wrap gap-x-5 gap-y-1">
            <span>{t("info.NIP")}</span>
            <span>{t("info.KRS")}</span>
            <span>{t("info.REGON")}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

/** The closing invitation: free counselling, with the booking and contact links */
function CallToAction() {
  const tHome = useTranslations("home");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const [ref, reveal] = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      data-reveal={reveal}
      className="flex flex-col gap-8 border-b border-white/10 py-16 sm:py-20 lg:flex-row lg:items-end lg:justify-between"
    >
      <p
        className={cn(
          "max-w-3xl text-3xl leading-tight font-semibold tracking-tight text-balance text-white sm:text-4xl lg:text-5xl",
          RISE_ON_REVEAL
        )}
      >
        {tHome("cta1")}, <span className="text-brand">{tHome("cta2")}</span>
      </p>
      <div
        className={cn("flex shrink-0 flex-wrap gap-3", RISE_ON_REVEAL)}
        style={delay(200)}
      >
        <Link
          href={getLocalizedPath(locale, "/book")}
          className="group/book inline-flex h-12 items-center gap-2 rounded-full bg-brand px-6 font-semibold text-neutral-950 transition-[translate,box-shadow] duration-300 ease-out-quint outline-none hover:shadow-[0_14px_32px_-12px_rgba(254,204,0,0.8)] focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 motion-safe:hover:-translate-y-0.5"
        >
          <CalendarCheck aria-hidden className="size-4" />
          {tCommon("book")}
        </Link>
        <Link
          href={getLocalizedPath(locale, "/contact")}
          className="group/contact inline-flex h-12 items-center gap-2 rounded-full px-6 font-semibold text-white ring-1 ring-white/25 transition-[background-color,box-shadow] duration-300 outline-none hover:bg-white/10 hover:ring-white/40 focus-visible:ring-2 focus-visible:ring-brand"
        >
          {tCommon("contact")}
          <ArrowRight
            aria-hidden
            className="size-4 transition-transform duration-300 ease-out-quint group-hover/contact:translate-x-1"
          />
        </Link>
      </div>
    </div>
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
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
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
