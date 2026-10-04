"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Flag from "react-country-flag";
import { AnimatePresence, motion } from "framer-motion";
import { Phone } from "lucide-react";
import {
  PHONE_LINK,
  WhatsAppLogo,
  whatsAppLink,
} from "@/components/layout/header-links";
import { FLAG_CDN } from "@/lib/flags";
import { cn } from "@/lib/utils";
import { PRIMARY_BUTTON } from "./JobsHero";
import type { CountryJobs } from "./types";

/** The header's height: a section scrolled to lands this far below the window's top */
export const HEADER_HEIGHT = 64;

interface LandingHeaderProps {
  country: CountryJobs;
  /** Scrolls to the application form */
  onApply: () => void;
}

/**
 * A slim bar that stays at the top: the logo and the ways to get in touch, with the button
 * that leads to the form always in reach. It turns to frosted glass once the page scrolls,
 * and names the country once the page's title has scrolled away.
 */
export function LandingHeader({ country, onApply }: LandingHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [pastTitle, setPastTitle] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 4);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    const title = document.getElementById("hero-title");
    if (!title) return;
    const observer = new IntersectionObserver(
      ([entry]) =>
        setPastTitle(
          !entry.isIntersecting && entry.boundingClientRect.top < HEADER_HEIGHT
        ),
      { rootMargin: `-${HEADER_HEIGHT}px 0px 0px 0px` }
    );
    observer.observe(title);
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ease-out",
        scrolled
          ? "border-neutral-200/60 bg-white/85 shadow-[0_12px_32px_-18px_rgba(15,23,42,0.3)] backdrop-blur-xl backdrop-saturate-150"
          : "border-transparent bg-white"
      )}
      style={{ height: HEADER_HEIGHT }}
    >
      <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between gap-3 px-4">
        <div className="flex min-w-0 items-center gap-3">
          <Link
            href="/"
            className="group shrink-0 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/30 focus-visible:ring-offset-2"
          >
            <Image
              src="/EU-logo.jpeg"
              alt="EU Career Serwis"
              width={135}
              height={48}
              loading="eager"
              className="h-9 w-auto rounded-md transition-transform duration-300 ease-out motion-safe:group-hover:scale-[1.03] min-[360px]:h-10"
            />
          </Link>

          <AnimatePresence>
            {pastTitle && (
              <motion.p
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="flex min-w-0 items-center gap-2 border-l border-neutral-200 pl-3 text-sm font-semibold text-neutral-950 max-md:hidden"
              >
                <Flag
                  svg
                  countryCode={country.code}
                  cdnUrl={FLAG_CDN}
                  alt=""
                  className="shrink-0 rounded-full ring-1 ring-black/10"
                  style={{ width: "1.125rem", height: "1.125rem" }}
                />
                <span className="truncate">Jobs in {country.place}</span>
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href={PHONE_LINK.href}
            className="group/phone inline-flex h-10 items-center gap-2 rounded-full px-3 text-sm font-medium whitespace-nowrap text-neutral-700 transition-colors duration-200 outline-none hover:bg-neutral-100 hover:text-neutral-950 focus-visible:ring-2 focus-visible:ring-neutral-900/25 max-lg:hidden"
          >
            <Phone
              aria-hidden
              className="size-4 transition-transform duration-300 motion-safe:group-hover/phone:-rotate-12"
            />
            {PHONE_LINK.label}
          </a>
          <a
            href={whatsAppLink(
              `Hello, I am interested in jobs in ${country.place}.`
            )}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="grid size-10 place-items-center rounded-full text-[#25d366] ring-1 ring-neutral-200 transition-[background-color,box-shadow,translate] duration-300 ease-out-quint outline-none hover:bg-neutral-50 hover:ring-neutral-300 focus-visible:ring-2 focus-visible:ring-neutral-950 motion-safe:hover:-translate-y-0.5 max-[359px]:hidden"
          >
            <WhatsAppLogo className="size-[18px]" />
          </a>
          <a
            href="#apply"
            onClick={(event) => {
              event.preventDefault();
              onApply();
            }}
            className={cn(PRIMARY_BUTTON, "min-h-10 px-5 py-2 text-sm")}
          >
            Apply now
          </a>
        </div>
      </div>
    </header>
  );
}
