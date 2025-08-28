// Tailwind-aligned breakpoints for a consistent responsive system
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1536, // Tailwind 2xl
} as const;

export type BreakpointKey = keyof typeof BREAKPOINTS;

export const breakpointQuery = (key: BreakpointKey): string =>
  `(min-width: ${BREAKPOINTS[key]}px)`;
