"use client";

import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Transition,
} from "framer-motion";
import { ChevronDown, ListOrdered } from "lucide-react";
import { useTranslations } from "@/hooks/useTranslations";
import { useLenis } from "@/utils/lenis";
import { fontInter } from "@/fonts";
import { cn } from "@/lib/utils";
import type { PolicySection } from "./policies";

/** Where a section's top lands when scrolled to: below the sticky navbar (scroll-mt-28) */
const SCROLL_OFFSET = 112;

/** A section is being read once its top has passed this line, in px from the window's top */
const READING_LINE = 160;

// The yellow marker glides to the section being read, as the page numbers' marker does
const MARKER_SPRING: Transition = {
  type: "spring",
  stiffness: 420,
  damping: 36,
  mass: 0.8,
};

/** The section being read: the last one whose top has passed the reading line */
export function useActiveSection(sections: PolicySection[]) {
  const [active, setActive] = useState<string | undefined>(sections[0]?.id);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      let current: string | undefined = sections[0]?.id;
      for (const { id } of sections) {
        const top = document.getElementById(id)?.getBoundingClientRect().top;
        if (top === undefined || top > READING_LINE) break;
        current = id;
      }
      // At the end of the page the last section counts, even if it is too short to reach the line
      const { scrollHeight } = document.documentElement;
      if (window.scrollY + window.innerHeight >= scrollHeight - 2) {
        current = sections.at(-1)?.id;
      }
      setActive(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [sections]);

  return active;
}

/**
 * Scrolls smoothly to a section and keeps it in the address (#section-3), so the link can
 * be shared. The focus moves to its heading, for the keyboard and screen readers.
 */
export function useGoToSection() {
  const lenis = useLenis();
  const reduceMotion = useReducedMotion();

  return (id: string) => {
    const section = document.getElementById(id);
    if (!section) return;
    window.history.replaceState(null, "", `#${id}`);
    if (lenis) {
      // From where the window really is, in case a native scroll got ahead of Lenis
      lenis.scrollTo(window.scrollY, { immediate: true });
      lenis.scrollTo(section, {
        offset: -SCROLL_OFFSET,
        immediate: Boolean(reduceMotion),
      });
    } else {
      section.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    }
    section.querySelector<HTMLElement>("h2")?.focus({ preventScroll: true });
  };
}

interface ContentsProps {
  sections: PolicySection[];
  active?: string;
  onGo: (id: string) => void;
  className?: string;
  style?: CSSProperties;
}

/**
 * The sections, beside the text on larger screens. It stays in view while the page
 * scrolls, and scrolls by itself when it is taller than the window, keeping the section
 * being read in view.
 */
export function PolicyContents({
  sections,
  active,
  onGo,
  className,
  style,
}: ContentsProps) {
  const t = useTranslations("policy");
  const nav = useRef<HTMLElement>(null);

  useEffect(() => {
    const list = nav.current;
    const link = list?.querySelector(`[href="#${active}"]`);
    if (!list || !link) return;
    const box = list.getBoundingClientRect();
    const item = link.getBoundingClientRect();
    if (item.top < box.top + 48 || item.bottom > box.bottom - 48) {
      list.scrollBy({
        top: item.top - box.top - box.height / 2,
        behavior: "smooth",
      });
    }
  }, [active]);

  return (
    <nav
      ref={nav}
      aria-label={t("contents")}
      // Wheel over the list scrolls the list
      data-lenis-prevent
      className={cn(
        "sticky top-28 max-h-[calc(100dvh-9rem)] overflow-y-auto overscroll-contain pr-2 [scrollbar-width:thin]",
        className
      )}
      style={style}
    >
      <p className="text-xs font-semibold tracking-[0.2em] text-neutral-500 uppercase">
        {t("contents")}
      </p>
      <ContentsList
        sections={sections}
        active={active}
        onGo={onGo}
        marker="policy-contents-marker"
        className="mt-4"
      />
    </nav>
  );
}

/**
 * The sections on phones and tablets: a button that opens the list. Choosing a section
 * closes the list first, then scrolls, so the page doesn't shift under the scroll.
 */
export function PolicyContentsMenu({
  sections,
  active,
  onGo,
  className,
  style,
}: ContentsProps) {
  const t = useTranslations("policy");
  const [open, setOpen] = useState(false);
  const chosen = useRef<string | null>(null);
  const listId = useId();

  return (
    <nav
      aria-label={t("contents")}
      className={cn(
        "rounded-2xl border border-neutral-200 bg-neutral-50/80",
        className
      )}
      style={style}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between gap-4 rounded-2xl px-5 py-4 text-left font-semibold text-neutral-950 outline-none focus-visible:ring-2 focus-visible:ring-neutral-950"
      >
        <span className="flex items-center gap-3">
          <ListOrdered aria-hidden className="size-5 text-neutral-500" />
          {t("contents")}
        </span>
        <span className="flex items-center gap-2 text-sm font-medium text-neutral-500 tabular-nums">
          {sections.length}
          <ChevronDown
            aria-hidden
            className={cn(
              "size-4 transition-transform duration-300 ease-out-quint",
              open && "rotate-180"
            )}
          />
        </span>
      </button>

      <AnimatePresence
        initial={false}
        onExitComplete={() => {
          if (chosen.current) onGo(chosen.current);
          chosen.current = null;
        }}
      >
        {open && (
          <motion.div
            key="list"
            id={listId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <ContentsList
              sections={sections}
              active={active}
              onGo={(id) => {
                chosen.current = id;
                setOpen(false);
              }}
              marker="policy-menu-marker"
              className="mx-5 mb-5"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

interface ContentsListProps extends ContentsProps {
  /** The marker's layoutId, one per list */
  marker: string;
}

/** Numbered links to the sections; a yellow line marks the one being read */
function ContentsList({
  sections,
  active,
  onGo,
  marker,
  className,
}: ContentsListProps) {
  return (
    <ol
      className={cn(
        "border-l border-neutral-200 text-sm",
        fontInter.className,
        className
      )}
    >
      {sections.map(({ id, number, title }) => {
        const current = id === active;
        return (
          <li key={id} className="relative">
            {current && (
              <motion.span
                layoutId={marker}
                transition={MARKER_SPRING}
                aria-hidden
                className="absolute inset-y-1.5 -left-px w-0.5 rounded-full bg-brand"
              />
            )}
            <a
              href={`#${id}`}
              aria-current={current ? "location" : undefined}
              onClick={(event) => {
                event.preventDefault();
                onGo(id);
              }}
              className={cn(
                "flex gap-3 rounded-r-lg py-2 pr-2 pl-4 leading-snug transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-neutral-950",
                current
                  ? "font-medium text-neutral-950"
                  : "text-neutral-500 hover:text-neutral-950"
              )}
            >
              <span
                className={cn(
                  "w-5 shrink-0 tabular-nums transition-colors duration-200",
                  current ? "text-neutral-950" : "text-neutral-400"
                )}
              >
                {String(number).padStart(2, "0")}
              </span>
              <span className="min-w-0 hyphens-auto wrap-break-word">
                {title}
              </span>
            </a>
          </li>
        );
      })}
    </ol>
  );
}
