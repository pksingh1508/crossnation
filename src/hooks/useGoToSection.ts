"use client";

import { useReducedMotion } from "framer-motion";
import { useLenis } from "@/utils/lenis";

/**
 * Scrolls smoothly to a section and keeps it in the address (#section-3), so the link can
 * be shared. The section's top lands `offset` px below the window's top, clear of a sticky
 * header. The focus moves to its heading, for the keyboard and screen readers; the
 * heading needs tabIndex={-1}.
 */
export function useGoToSection(offset: number) {
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
        offset: -offset,
        immediate: Boolean(reduceMotion),
      });
    } else {
      section.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    }
    section.querySelector<HTMLElement>("h2")?.focus({ preventScroll: true });
  };
}
