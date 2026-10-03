"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion, type Variants } from "framer-motion";
import { CalendarCheck, ChevronRight, Mail, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { getLocalizedPath } from "@/lib/locale-paths";
import { EMAIL_LINK, PHONE_LINK, SOCIAL_LINKS } from "./header-links";
import { LanguageSwitcher } from "./LanguageSwitcher";
import type { NavItem } from "./Navbar";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

// The panel unrolls from under the navbar, then its rows fade in one after another.
// The open state's negative bottom inset leaves room for the panel's shadow.
const panelVariants: Variants = {
  closed: { clipPath: "inset(0% 0% 100% 0%)" },
  open: {
    opacity: 1,
    clipPath: "inset(0% 0% -20% 0%)",
    transition: {
      duration: 0.45,
      ease: EASE_OUT,
      staggerChildren: 0.04,
      delayChildren: 0.06,
    },
  },
  exit: {
    opacity: 0,
    clipPath: "inset(0% 0% 100% 0%)",
    transition: { duration: 0.25, ease: [0.4, 0, 1, 1] },
  },
};

const rowVariants: Variants = {
  closed: { opacity: 0, y: -10 },
  open: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE_OUT } },
};

interface MobileMenuProps {
  id: string;
  items: NavItem[];
  isActive: (path: string) => boolean;
  /** CSS max-height, so a long menu scrolls inside the panel. */
  maxHeight: string;
  onNavigate: () => void;
}

/** The menu below the xl breakpoint. Rendered by Navbar inside the sticky header. */
export function MobileMenu({
  id,
  items,
  isActive,
  maxHeight,
  onNavigate,
}: MobileMenuProps) {
  const t = useTranslations("common");
  const locale = useLocale();

  return (
    <motion.div
      id={id}
      variants={panelVariants}
      initial="closed"
      animate="open"
      exit="exit"
      className="absolute inset-x-0 top-full border-t border-neutral-200/70 bg-white shadow-[0_24px_40px_-24px_rgba(15,23,42,0.35)] xl:hidden"
    >
      {/* data-lenis-prevent: the page is locked while the menu is open, but this panel may scroll */}
      <div
        data-lenis-prevent
        className="overflow-y-auto overscroll-contain"
        style={{ maxHeight }}
      >
        <nav
          aria-label="Main"
          className="mx-auto w-full max-w-7xl px-4 pt-3 pb-6"
        >
          <ul className="grid gap-1 md:grid-cols-2 md:gap-x-3">
            {items.map((item) => {
              const active = isActive(item.path);
              return (
                <motion.li key={item.path} variants={rowVariants}>
                  <Link
                    href={getLocalizedPath(locale, item.path)}
                    onClick={onNavigate}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "group flex items-center gap-3 rounded-xl px-3 py-3 text-[15px] font-medium transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/20",
                      active
                        ? "bg-brand-soft text-neutral-950"
                        : "text-neutral-700 hover:bg-neutral-50 hover:text-neutral-950"
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "h-5 w-1 rounded-full transition-colors duration-200",
                        active
                          ? "bg-brand"
                          : "bg-transparent group-hover:bg-neutral-300"
                      )}
                    />
                    <span className="flex-1">{item.label}</span>
                    <ChevronRight
                      aria-hidden
                      className="size-4 text-neutral-400 transition-transform duration-200 motion-safe:group-hover:translate-x-0.5"
                    />
                  </Link>
                </motion.li>
              );
            })}
          </ul>

          {/* From md up these two buttons are in the navbar itself */}
          <motion.div
            variants={rowVariants}
            className="mt-4 grid gap-2 sm:grid-cols-2 md:hidden"
          >
            <Link
              href={getLocalizedPath(locale, "/book")}
              onClick={onNavigate}
              aria-current={isActive("/book") ? "page" : undefined}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand px-5 text-[15px] font-semibold text-neutral-950 shadow-[0_10px_24px_-12px_rgba(254,204,0,0.9)] transition-transform duration-200 outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/40 active:scale-[0.98]"
            >
              <CalendarCheck aria-hidden className="size-4" />
              {t("book")}
            </Link>
            <Link
              href={getLocalizedPath(locale, "/contact")}
              onClick={onNavigate}
              aria-current={isActive("/contact") ? "page" : undefined}
              className="inline-flex h-12 items-center justify-center rounded-full border border-neutral-200 px-5 text-[15px] font-medium text-neutral-800 transition-[background-color,scale] duration-200 outline-none hover:bg-neutral-50 focus-visible:ring-2 focus-visible:ring-neutral-900/20 active:scale-[0.98]"
            >
              {t("contact")}
            </Link>
          </motion.div>

          <motion.div
            variants={rowVariants}
            className="mt-5 border-t border-neutral-100 pt-5"
          >
            <div className="flex flex-col gap-3 text-sm text-neutral-700 sm:flex-row sm:gap-8">
              {[
                { ...PHONE_LINK, icon: Phone },
                { ...EMAIL_LINK, icon: Mail },
              ].map(({ href, label, icon: Icon }) => (
                <a
                  key={href}
                  href={href}
                  className="group inline-flex items-center gap-3 rounded-full transition-colors duration-200 outline-none hover:text-neutral-950 focus-visible:ring-2 focus-visible:ring-neutral-900/20"
                >
                  <span className="grid size-8 place-items-center rounded-full bg-neutral-100 text-neutral-700 transition-colors duration-200 group-hover:bg-brand group-hover:text-neutral-950">
                    <Icon aria-hidden className="size-3.5" />
                  </span>
                  {label}
                </a>
              ))}
            </div>

            <div className="mt-5 flex items-center justify-between gap-4">
              <ul className="flex items-center gap-2">
                {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="grid size-9 place-items-center rounded-full border border-neutral-200 text-neutral-500 transition-colors duration-200 outline-none hover:border-brand hover:bg-brand hover:text-neutral-950 focus-visible:ring-2 focus-visible:ring-neutral-900/20"
                    >
                      <Icon className="size-4" />
                    </a>
                  </li>
                ))}
              </ul>
              <LanguageSwitcher />
            </div>
          </motion.div>
        </nav>
      </div>
    </motion.div>
  );
}
