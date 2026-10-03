"use client";

import type { Ref } from "react";
import { Mail, Phone } from "lucide-react";
import { fontInter } from "@/fonts";
import { cn } from "@/lib/utils";
import { EMAIL_LINK, PHONE_LINK, SOCIAL_LINKS } from "./header-links";
import { LanguageSwitcher } from "./LanguageSwitcher";

/** The thin black bar above the navbar. It scrolls away; only the navbar below it sticks. */
export function TopBar({ ref }: { ref?: Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      className={cn("bg-neutral-950 text-neutral-300", fontInter.className)}
    >
      <div className="mx-auto flex h-10 w-full max-w-7xl items-center justify-between gap-4 px-4 text-[13px]">
        <ul className="flex min-w-0 items-center gap-6">
          <li>
            <a
              href={PHONE_LINK.href}
              className="group inline-flex items-center gap-2 rounded-sm whitespace-nowrap transition-colors duration-200 outline-none hover:text-white focus-visible:ring-2 focus-visible:ring-brand/70"
            >
              <Phone
                aria-hidden
                className="size-3.5 text-brand transition-transform duration-300 motion-safe:group-hover:-rotate-12"
              />
              {PHONE_LINK.label}
            </a>
          </li>
          <li className="max-md:hidden">
            <a
              href={EMAIL_LINK.href}
              className="group inline-flex items-center gap-2 rounded-sm whitespace-nowrap transition-colors duration-200 outline-none hover:text-white focus-visible:ring-2 focus-visible:ring-brand/70"
            >
              <Mail
                aria-hidden
                className="size-3.5 text-brand transition-transform duration-300 motion-safe:group-hover:-translate-y-px"
              />
              {EMAIL_LINK.label}
            </a>
          </li>
        </ul>

        <div className="flex items-center">
          <ul className="flex items-center max-sm:hidden">
            {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid size-8 place-items-center rounded-full text-neutral-400 transition-[color,background-color,translate] duration-200 outline-none hover:bg-white/10 hover:text-brand focus-visible:ring-2 focus-visible:ring-brand/70 motion-safe:hover:-translate-y-0.5"
                >
                  <Icon className="size-3.5" />
                </a>
              </li>
            ))}
          </ul>
          <span
            aria-hidden
            className="mx-3 h-4 w-px bg-white/15 max-sm:hidden"
          />
          <LanguageSwitcher variant="dark" />
        </div>
      </div>
    </div>
  );
}
