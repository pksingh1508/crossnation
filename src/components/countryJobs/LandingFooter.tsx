"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, type LucideIcon } from "lucide-react";
import { useTranslations } from "@/hooks/useTranslations";
import { useReveal } from "@/hooks/useReveal";
import {
  EMAIL_LINK,
  MAPS_LINK,
  OFFICE_STREET,
  SOCIAL_LINKS,
} from "@/components/layout/header-links";
import { siteConfig } from "@/constants/site";
import { fontInter } from "@/fonts";
import { delay, RISE_ON_REVEAL } from "@/lib/animation";
import { cn } from "@/lib/utils";

const { address } = siteConfig.contact;

// Keys in footer.bottom
const POLICIES = [
  { href: "/privacy-policy", label: "privacyPolicy" },
  { href: "/refund-policy", label: "refundPolicy" },
  { href: "/terms-conditions", label: "termsOfService" },
  { href: "/antiFraud-policy", label: "antiFraudPolicy" },
];

/** A link in the footer's dark colours; it slides a little to the right on hover */
const LINK =
  "inline-block rounded-sm text-[15px] text-neutral-400 transition-[color,translate] duration-300 ease-out-quint outline-none hover:text-white focus-visible:ring-2 focus-visible:ring-brand/70 motion-safe:hover:translate-x-1";

/**
 * The end of the page: who we are, how to reach us, and our policies, with the company's
 * registration numbers. A shorter version of the site's footer, for a page without its
 * navigation.
 */
export function LandingFooter() {
  const t = useTranslations("footer");
  // It ends the page, so it reveals as soon as it starts to show
  const [ref, reveal] = useReveal<HTMLDivElement>({ atEdge: true });

  return (
    <footer className="bg-neutral-950 text-neutral-400">
      <div
        ref={ref}
        data-reveal={reveal}
        className="mx-auto w-full max-w-7xl px-4"
      >
        <div className="grid gap-12 pt-16 pb-14 sm:pt-20 lg:grid-cols-12 lg:gap-8">
          <div className={cn("lg:col-span-5", RISE_ON_REVEAL)}>
            <Link
              href="/"
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
                "mt-6 max-w-xs leading-relaxed",
                fontInter.className
              )}
            >
              International recruitment agency in Europe.
            </p>
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

          <div
            className={cn("lg:col-span-4", RISE_ON_REVEAL)}
            style={delay(100)}
          >
            <h2 className="text-sm font-semibold text-white">Contact</h2>
            <ul className={cn("mt-5 space-y-4", fontInter.className)}>
              <ContactRow icon={Mail} href={EMAIL_LINK.href}>
                {EMAIL_LINK.label}
              </ContactRow>
              <ContactRow icon={MapPin} href={MAPS_LINK} external>
                {OFFICE_STREET}, {address.zipCode} {address.city}
              </ContactRow>
            </ul>
          </div>

          <div
            className={cn("lg:col-span-3", RISE_ON_REVEAL)}
            style={delay(200)}
          >
            <h2 className="text-sm font-semibold text-white">
              {t("heading.condition")}
            </h2>
            <ul className={cn("mt-5 space-y-3", fontInter.className)}>
              {POLICIES.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className={LINK}>
                    {t(`bottom.${label}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className={cn(
            "flex flex-col gap-3 border-t border-white/10 py-8 text-sm text-neutral-500 lg:flex-row lg:items-center lg:justify-between",
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

function ContactRow({
  icon: Icon,
  href,
  external = false,
  children,
}: {
  icon: LucideIcon;
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
