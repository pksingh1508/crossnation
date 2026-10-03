"use client";

import { useEffect, useRef, useState } from "react";

/**
 * "static": no animation, just show the content (before JavaScript runs, when the block is
 * already on screen, or for visitors who prefer less motion).
 * "waiting": still below the screen. "shown": scrolled into view, so animate.
 */
export type RevealState = "static" | "waiting" | "shown";

/**
 * Plays a block's entrance animations once, when it scrolls into view. Put the ref and
 * data-reveal={state} on the block; its children style both moments with the
 * reveal-waiting: and reveal-shown: variants from globals.css.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [state, setState] = useState<RevealState>("static");

  useEffect(() => {
    const element = ref.current;
    if (
      !element ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      element.getBoundingClientRect().top < window.innerHeight
    ) {
      return;
    }

    // Below the screen, so nobody sees it hide. It reveals once its top is 15% into view.
    setState("waiting");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setState("shown");
        observer.disconnect();
      },
      { rootMargin: "0px 0px -15% 0px" }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return [ref, state] as const;
}
