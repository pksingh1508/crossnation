"use client";

import { useLocale } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "@/hooks/useTranslations";
import { useReveal } from "@/hooks/useReveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { MAPS_LINK, OFFICE_STREET } from "@/components/layout/header-links";
import { siteConfig } from "@/constants/site";
import { fontInter, fontPoppins } from "@/fonts";
import { delay, RISE_ON_REVEAL } from "@/lib/animation";
import { countryName } from "@/lib/country-name";
import { cn } from "@/lib/utils";

const { address } = siteConfig.contact;

/**
 * The office on a map. The map is grey until the mouse is on it, so it sits quietly in
 * the page; nothing covers it, so Google's own controls and credits stay visible.
 */
export function LocationMap() {
  const t = useTranslations("pages.contact.info.address");
  const locale = useLocale();
  const [ref, reveal] = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      data-reveal={reveal}
      className={cn("bg-white pb-20 sm:pb-24", fontPoppins.className)}
    >
      <div className="mx-auto w-full max-w-7xl px-4">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <div>
            <Eyebrow>{t("title")}</Eyebrow>
            <h2 className="mt-4 text-2xl leading-tight font-semibold tracking-tight text-neutral-950 sm:text-3xl">
              <span className={cn("block", RISE_ON_REVEAL)} style={delay(100)}>
                {OFFICE_STREET}
              </span>
              <span
                className={cn(
                  "block text-neutral-500",
                  fontInter.className,
                  "mt-1 text-base font-normal tracking-normal sm:text-lg",
                  RISE_ON_REVEAL
                )}
                style={delay(180)}
              >
                {address.zipCode} {address.city}, {countryName(locale)}
              </span>
            </h2>
          </div>
          <a
            href={MAPS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "group/maps inline-flex items-center gap-1.5 rounded-sm font-semibold text-neutral-950 underline decoration-brand decoration-2 underline-offset-[6px] transition-[text-decoration-color] duration-300 outline-none hover:decoration-neutral-950 focus-visible:ring-2 focus-visible:ring-neutral-950",
              RISE_ON_REVEAL
            )}
            style={delay(260)}
          >
            Google Maps
            <ArrowUpRight
              aria-hidden
              className="size-4 transition-transform duration-300 ease-out-quint group-hover/maps:translate-x-0.5 group-hover/maps:-translate-y-0.5"
            />
          </a>
        </div>

        {/* The frame wipes open from the bottom as it scrolls into view */}
        <div className="relative mt-8 h-[24rem] overflow-hidden rounded-[2rem] bg-neutral-100 ring-1 ring-black/5 reveal-waiting:[clip-path:inset(100%_0_0_0)] reveal-shown:animate-reveal motion-reduce:animate-none sm:h-[28rem] lg:h-[32rem]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2379.926033697807!2d20.9923064!3d52.233202399999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecd9bd5501479%3A0xfe6ebbe174616cb0!2sMennica%20Legacy%20Tower!5e1!3m2!1sen!2sin!4v1759570646360!5m2!1sen!2sin"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Office Location - Mennica Legacy Tower, Prosta 18, Warsaw, Poland"
            className="absolute inset-0 size-full border-0 grayscale transition-[filter] duration-700 ease-out hover:grayscale-0 focus:grayscale-0"
          />
        </div>
      </div>
    </section>
  );
}
