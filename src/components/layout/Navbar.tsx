"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  type Transition,
} from "framer-motion";
import { CalendarCheck, House } from "lucide-react";
import { NAVBAR_LINKS } from "@/constants/data";
import { fontPoppins } from "@/fonts";
import { cn } from "@/lib/utils";
import { getLocalizedPath, stripLocalePrefix } from "@/lib/locale-paths";
import { useLenis } from "@/utils/lenis";
import { MobileMenu } from "./MobileMenu";
import { TopBar } from "./TopBar";

export interface NavItem {
  /** Path without the language prefix, e.g. "/work". */
  path: string;
  label: string;
}

// The hover and active highlights glide from link to link on this spring
const PILL_SPRING: Transition = {
  type: "spring",
  stiffness: 420,
  damping: 36,
  mass: 0.8,
};

// Tailwind's xl breakpoint, where the full link list replaces the menu button
const DESKTOP_QUERY = "(min-width: 80rem)";

export function Navbar() {
  const tCommon = useTranslations("common");
  const tNav = useTranslations("nav");
  const locale = useLocale();
  const pathname = stripLocalePrefix(usePathname());
  const lenis = useLenis();
  const menuId = useId();
  const topBarRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const [isStuck, setIsStuck] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [menuTop, setMenuTop] = useState(0);
  // Position of the grey highlight behind the link under the mouse or keyboard focus
  const [hoverPill, setHoverPill] = useState<{
    x: number;
    width: number;
  } | null>(null);
  const [menuPathname, setMenuPathname] = useState(pathname);

  // Close the menu when the page changes some other way, e.g. the browser's back button
  if (menuPathname !== pathname) {
    setMenuPathname(pathname);
    setIsOpen(false);
  }

  const isActive = (path: string) =>
    path === "/"
      ? pathname === "/"
      : pathname === path || pathname.startsWith(`${path}/`);
  const localized = (path: string) => getLocalizedPath(locale, path);

  const navItems: NavItem[] = [
    { path: "/", label: tCommon("home") },
    ...NAVBAR_LINKS.map((link) => ({
      path: link.href,
      label: tNav(link.href.slice(1)),
    })),
  ];

  // The bar sticks once the top bar has scrolled out of view; then it turns to frosted glass.
  // The -1px margin: a stuck top bar ends exactly at the window's top edge, which still
  // counts as intersecting without it.
  useEffect(() => {
    const topBar = topBarRef.current;
    if (!topBar) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsStuck(!entry.isIntersecting),
      { rootMargin: "-1px 0px 0px 0px" }
    );
    observer.observe(topBar);
    return () => observer.disconnect();
  }, []);

  // While the menu is open: lock page scrolling, close on Escape, and on resizing to desktop
  useEffect(() => {
    if (!isOpen) return;
    lenis?.stop();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      // Escape in the language list only closes that list
      if ((event.target as Element | null)?.closest?.('[role="listbox"]'))
        return;
      setIsOpen(false);
      toggleRef.current?.focus();
    };
    const onResize = () => {
      if (window.matchMedia(DESKTOP_QUERY).matches) setIsOpen(false);
      else setMenuTop(headerRef.current?.getBoundingClientRect().bottom ?? 0);
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      lenis?.start();
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [isOpen, lenis]);

  const toggleMenu = () => {
    if (!isOpen) {
      setMenuTop(headerRef.current?.getBoundingClientRect().bottom ?? 0);
    }
    setIsOpen(!isOpen);
  };
  const closeMenu = () => setIsOpen(false);

  return (
    <MotionConfig reducedMotion="user">
      {/* Sticks at minus the top bar's height (-top-10 = its h-10): the top bar scrolls
          away and the bar below it stays at the top of the window */}
      <header
        ref={headerRef}
        className={cn("sticky -top-10 z-50", fontPoppins.className)}
      >
        <TopBar ref={topBarRef} />

        {/* Solid white at the top of the page, frosted glass once stuck */}
        <div
          className={cn(
            "h-16 border-b transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ease-out xl:h-20",
            isStuck && !isOpen
              ? "border-neutral-200/60 bg-white/90 shadow-[0_12px_32px_-18px_rgba(15,23,42,0.3)] backdrop-blur-xl backdrop-saturate-150"
              : "border-neutral-200/80 bg-white"
          )}
        >
          {/* From xl up a three-column grid keeps the links centred on the page */}
          <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between gap-6 px-4 xl:grid xl:grid-cols-[1fr_auto_1fr]">
            <Link
              href={localized("/")}
              className="group shrink-0 justify-self-start rounded-md outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/30 focus-visible:ring-offset-2"
            >
              <Image
                src="/EU-logo.jpeg"
                alt="EU Career Serwis"
                width={135}
                height={48}
                loading="eager"
                className="h-10 w-auto rounded-md transition-transform duration-300 ease-out motion-safe:group-hover:scale-[1.03] sm:h-11 xl:h-12"
              />
            </Link>

            <nav aria-label="Main" className="hidden xl:block">
              <ul
                className="relative flex items-center gap-1"
                onMouseLeave={() => setHoverPill(null)}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget)) {
                    setHoverPill(null);
                  }
                }}
              >
                {/* One grey highlight for the whole list: it fades in on the first link,
                  glides from link to link and fades out when the mouse leaves */}
                <AnimatePresence>
                  {hoverPill && (
                    <motion.span
                      aria-hidden
                      className="absolute top-0 left-0 h-10 rounded-full bg-neutral-100"
                      initial={{ opacity: 0, ...hoverPill }}
                      animate={{ opacity: 1, ...hoverPill }}
                      exit={{ opacity: 0 }}
                      transition={{
                        ...PILL_SPRING,
                        opacity: { duration: 0.2, ease: "easeOut" },
                      }}
                    />
                  )}
                </AnimatePresence>

                {navItems.map((item) => {
                  const active = isActive(item.path);
                  const isHome = item.path === "/";
                  const showHoverPill = (link: HTMLElement) =>
                    setHoverPill({
                      x: link.offsetLeft,
                      width: link.offsetWidth,
                    });
                  return (
                    <li key={item.path}>
                      <Link
                        href={localized(item.path)}
                        aria-current={active ? "page" : undefined}
                        aria-label={isHome ? item.label : undefined}
                        onMouseEnter={(event) =>
                          showHoverPill(event.currentTarget)
                        }
                        onFocus={(event) => showHoverPill(event.currentTarget)}
                        className={cn(
                          "relative flex h-10 items-center rounded-full px-4 text-[15px] font-medium whitespace-nowrap transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/25",
                          active
                            ? "text-neutral-950"
                            : "text-neutral-600 hover:text-neutral-950"
                        )}
                      >
                        {/* The yellow marker slides to the new page's link on navigation */}
                        {active && (
                          <motion.span
                            layoutId="navbar-active"
                            aria-hidden
                            className="absolute inset-0 rounded-full bg-brand shadow-[0_6px_16px_-6px_rgba(254,204,0,0.9)]"
                            transition={PILL_SPRING}
                          />
                        )}
                        <span className="relative">
                          {isHome ? (
                            <House aria-hidden className="size-[18px]" />
                          ) : (
                            item.label
                          )}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex items-center gap-2 justify-self-end">
              <Link
                href={localized("/contact")}
                aria-current={isActive("/contact") ? "page" : undefined}
                className="inline-flex h-10 items-center rounded-full px-4 text-sm font-medium whitespace-nowrap text-neutral-700 transition-colors duration-200 outline-none hover:bg-neutral-100 hover:text-neutral-950 focus-visible:ring-2 focus-visible:ring-neutral-900/25 aria-[current=page]:bg-neutral-100 aria-[current=page]:text-neutral-950 max-md:hidden"
              >
                {tCommon("contact")}
              </Link>

              {/* Below sm only the icon shows; the label stays readable for screen readers */}
              <Link
                href={localized("/book")}
                aria-current={isActive("/book") ? "page" : undefined}
                className="group relative inline-flex h-10 items-center gap-2 overflow-hidden rounded-full bg-brand px-3 text-sm font-semibold whitespace-nowrap text-neutral-950 shadow-[0_8px_20px_-10px_rgba(254,204,0,0.95)] transition-[translate,box-shadow] duration-300 ease-out outline-none hover:shadow-[0_14px_28px_-12px_rgba(254,204,0,1)] motion-safe:hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-neutral-900/40 focus-visible:ring-offset-2 active:translate-y-0 sm:px-5"
              >
                {/* A light sheen sweeps across on hover */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-white/70 to-transparent group-hover:translate-x-[400%] group-hover:transition-transform group-hover:duration-700 group-hover:ease-out motion-reduce:hidden"
                />
                <CalendarCheck aria-hidden className="relative size-4" />
                <span className="relative max-sm:sr-only">
                  {tCommon("book")}
                </span>
              </Link>

              <button
                ref={toggleRef}
                type="button"
                aria-controls={menuId}
                aria-expanded={isOpen}
                aria-label={isOpen ? "Close menu" : "Open menu"}
                onClick={toggleMenu}
                className="grid size-10 place-items-center rounded-full text-neutral-900 transition-colors duration-200 outline-none hover:bg-neutral-100 focus-visible:ring-2 focus-visible:ring-neutral-900/25 xl:hidden"
              >
                {/* Three lines that turn into a cross */}
                <span aria-hidden className="relative block h-3.5 w-5">
                  <span
                    className={cn(
                      "absolute top-0 left-0 h-0.5 w-5 rounded-full bg-current transition-transform duration-300 ease-out-quint motion-reduce:transition-none",
                      isOpen && "translate-y-1.5 rotate-45"
                    )}
                  />
                  <span
                    className={cn(
                      "absolute top-1.5 left-0 h-0.5 w-5 rounded-full bg-current transition-[scale,opacity] duration-300 ease-out-quint motion-reduce:transition-none",
                      isOpen && "scale-x-0 opacity-0"
                    )}
                  />
                  <span
                    className={cn(
                      "absolute top-3 left-0 h-0.5 w-5 rounded-full bg-current transition-transform duration-300 ease-out-quint motion-reduce:transition-none",
                      isOpen && "-translate-y-1.5 -rotate-45"
                    )}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <MobileMenu
              id={menuId}
              items={navItems}
              isActive={isActive}
              maxHeight={`calc(100dvh - ${menuTop}px)`}
              onNavigate={closeMenu}
            />
          )}
        </AnimatePresence>
      </header>

      {/* Dims the page under the open menu; a click on it closes the menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            aria-hidden
            className="fixed inset-0 z-40 bg-neutral-950/40 backdrop-blur-[2px] xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={closeMenu}
          />
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}
