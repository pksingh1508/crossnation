/** When a CSS entrance animation (animate-rise etc.) starts, e.g. style={delay(300)} */
export const delay = (ms: number) => ({ animationDelay: `${ms}ms` });

/**
 * For a child of a block that uses useReveal: hidden until the block scrolls into view,
 * then rises into place. Visitors who prefer less motion just see it.
 */
export const RISE_ON_REVEAL =
  "reveal-waiting:opacity-0 reveal-shown:animate-rise motion-reduce:animate-none";
