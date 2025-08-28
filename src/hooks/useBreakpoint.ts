"use client";

import * as React from "react";
import {
  BREAKPOINTS,
  breakpointQuery,
  BreakpointKey,
} from "@/constants/breakpoints";

export function useBreakpoint(target?: BreakpointKey) {
  const [matches, setMatches] = React.useState<Record<BreakpointKey, boolean>>({
    sm: false,
    md: false,
    lg: false,
    xl: false,
    xxl: false,
  });

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const mqls = (Object.keys(BREAKPOINTS) as BreakpointKey[]).map((key) => ({
      key,
      mql: window.matchMedia(breakpointQuery(key)),
    }));

    const update = () => {
      setMatches(
        Object.fromEntries(
          mqls.map(({ key, mql }) => [key, mql.matches])
        ) as Record<BreakpointKey, boolean>
      );
    };

    mqls.forEach(({ mql }) => mql.addEventListener("change", update));
    update();

    return () => {
      mqls.forEach(({ mql }) => mql.removeEventListener("change", update));
    };
  }, []);

  if (target) {
    return matches[target];
  }
  return matches;
}

export default useBreakpoint;
