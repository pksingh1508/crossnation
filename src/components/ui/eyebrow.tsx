import type { ReactNode } from "react";
import { delay, RISE_ON_REVEAL } from "@/lib/animation";
import { cn } from "@/lib/utils";

interface EyebrowProps {
  children: ReactNode;
  className?: string;
}

/**
 * A short label above a section's heading, after a yellow line that grows in. Put it in
 * a block that uses useReveal; it rises into view with the block. When a long label wraps
 * (German has some), the line stays beside its first line.
 */
export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <p
      className={cn(
        "flex items-start gap-3 text-sm font-semibold tracking-[0.2em] text-neutral-500 uppercase",
        RISE_ON_REVEAL,
        className
      )}
    >
      <span
        aria-hidden
        className="mt-[calc(0.5lh_-_1px)] h-0.5 w-8 shrink-0 origin-left rounded-full bg-brand reveal-waiting:scale-x-0 reveal-shown:animate-grow-x motion-reduce:animate-none"
        style={delay(250)}
      />
      {children}
    </p>
  );
}
