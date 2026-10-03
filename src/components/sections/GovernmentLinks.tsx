"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "@/hooks/useTranslations";
import { useReveal } from "@/hooks/useReveal";
import { WordReveal } from "@/components/ui/word-reveal";
import { fontInter, fontPoppins } from "@/fonts";
import { delay, RISE_ON_REVEAL } from "@/lib/animation";
import { cn } from "@/lib/utils";

// Official websites, each shown with its logo and the domain it opens.
// width and height: the logo file's size in pixels. size: the height it is shown at,
// chosen per logo so they look balanced (a solid block reads heavier than a wordmark).
const LINKS = [
  {
    name: "Ministry of Foreign Affairs of the Republic of Poland",
    logo: "/960px-Ministerstwo_Spraw_Zagranicznych_logo_2022.png",
    size: "h-12",
    width: 960,
    height: 324,
    url: "https://www.gov.pl/web/dyplomacja",
    domain: "gov.pl",
  },
  {
    name: "Chancellery of the Prime Minister of Poland",
    logo: "/Logo-kprm.png",
    size: "h-14",
    width: 130,
    height: 67,
    url: "https://www.gov.pl/web/premier",
    domain: "gov.pl",
  },
  {
    name: "National Bank of Poland",
    logo: "/Narodowy_Bank_Polski_logo_and_wordmark.png",
    size: "h-10",
    width: 2249,
    height: 473,
    url: "https://nbp.pl/",
    domain: "nbp.pl",
  },
  {
    name: "European Union",
    logo: "/europeanUnion.png",
    size: "h-12",
    width: 180,
    height: 180,
    url: "https://european-union.europa.eu/index_en",
    domain: "europa.eu",
  },
  {
    name: "Statistics Poland",
    logo: "/static.png",
    size: "h-10",
    width: 607,
    height: 150,
    url: "https://stat.gov.pl/en/",
    domain: "stat.gov.pl",
  },
  {
    name: "Santander Bank Polska",
    logo: "/govlink.png",
    size: "h-9",
    width: 759,
    height: 284,
    url: "https://www.santander.pl/klient-indywidualny",
    domain: "santander.pl",
  },
];

/** Logos of official institutions, each linking to its website. Used on several pages. */
export function GovernmentLinks() {
  const t = useTranslations("governmentLinks");
  const [ref, reveal] = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      data-reveal={reveal}
      className={cn("bg-neutral-50 py-16 sm:py-20", fontPoppins.className)}
    >
      <div className="mx-auto w-full max-w-7xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl leading-tight font-semibold tracking-tight text-balance text-neutral-950 sm:text-3xl">
            <WordReveal
              text={t("title")}
              delay={100}
              stagger={45}
              className="reveal-waiting:translate-y-[125%] reveal-shown:animate-word motion-reduce:animate-none"
            />
          </h2>
          <p
            className={cn(
              "mt-3 text-neutral-500",
              fontInter.className,
              RISE_ON_REVEAL
            )}
            style={delay(250)}
          >
            {t("description")}
          </p>
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
          {LINKS.map((link, index) => (
            <li
              key={link.url}
              className={RISE_ON_REVEAL}
              style={delay(300 + index * 60)}
            >
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group/logo flex h-full flex-col items-center justify-between gap-4 rounded-2xl bg-white px-4 pt-6 pb-4 ring-1 ring-black/5 transition-[translate,box-shadow] duration-300 ease-out-quint outline-none hover:shadow-[0_20px_40px_-24px_rgba(15,23,42,0.45)] focus-visible:ring-2 focus-visible:ring-neutral-950 motion-safe:hover:-translate-y-1"
              >
                <span className="flex h-14 w-full items-center justify-center">
                  <Image
                    src={link.logo}
                    alt={link.name}
                    width={link.width}
                    height={link.height}
                    sizes="180px"
                    className={cn(
                      "w-auto max-w-full object-contain",
                      link.size
                    )}
                  />
                </span>
                <span
                  className={cn(
                    "inline-flex items-center gap-1 text-xs font-medium text-neutral-500 transition-colors duration-300 group-hover/logo:text-neutral-950",
                    fontInter.className
                  )}
                >
                  {link.domain}
                  <ArrowUpRight
                    aria-hidden
                    className="size-3.5 transition-transform duration-300 ease-out-quint group-hover/logo:translate-x-0.5 group-hover/logo:-translate-y-0.5"
                  />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
