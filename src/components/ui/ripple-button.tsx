"use client";

// A button with a tasteful ripple effect that respects reduced motion.
//  new component: RippleButton
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./button";
import { colors } from "@/constants/color";

type Ripple = { id: number; x: number; y: number; size: number };

export interface RippleButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  ripple?: boolean;
  rippleDurationMs?: number;
  rippleClassName?: string;
}

export const RippleButton = React.forwardRef<
  HTMLButtonElement,
  RippleButtonProps
>(
  (
    {
      className,
      variant,
      size,
      ripple = true,
      rippleDurationMs = 600,
      rippleClassName,
      onClick,
      ...props
    },
    ref
  ) => {
    const [ripples, setRipples] = React.useState<Ripple[]>([]);
    const containerRef = React.useRef<HTMLButtonElement | null>(null);
    const idRef = React.useRef(0);

    React.useEffect(() => {
      if (!ripples.length) return;
      const t = setTimeout(
        () => {
          setRipples((prev) => prev.slice(1));
        },
        Math.max(200, rippleDurationMs / 2)
      );
      return () => clearTimeout(t);
    }, [ripples, rippleDurationMs]);

    function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
      if (ripple && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        idRef.current += 1;
        setRipples((prev) => [...prev, { id: idRef.current, x, y, size }]);
      }
      onClick?.(e);
    }

    // inject CSS vars for brand variants to match base Button behavior
    const brandVars =
      variant === "brand" || variant === "brandOutline"
        ? `[--brand-bg:${colors?.yellow?.DEFAULT}] [--brand-fg:${colors?.black?.light}]`
        : undefined;

    const brandClasses =
      variant === "brand"
        ? "bg-[var(--brand-bg)] hover:brightness-95"
        : variant === "brandOutline"
          ? "border-[var(--brand-bg)] hover:bg-[var(--brand-bg)] hover:text-[var(--brand-fg)]/90"
          : undefined;

    return (
      <button
        ref={(node) => {
          containerRef.current = node;
          if (typeof ref === "function") ref(node as HTMLButtonElement);
          else if (ref)
            (ref as React.MutableRefObject<HTMLButtonElement | null>).current =
              node;
        }}
        data-slot="button"
        onClick={handleClick}
        className={cn(
          brandVars,
          brandClasses,
          buttonVariants({ variant, size }),
          // extra interaction affordances
          "relative overflow-hidden transition-transform hover:-translate-y-0.5 active:translate-y-0 motion-reduce:transform-none",
          className
        )}
        {...props}
      >
        {props.children}
        <span
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
        >
          {ripples.map((r) => (
            <span
              key={r.id}
              className={cn(
                "absolute rounded-full bg-current/25 opacity-70",
                "animate-ping motion-reduce:animate-none",
                rippleClassName
              )}
              style={{
                left: r.x,
                top: r.y,
                width: r.size,
                height: r.size,
              }}
              role="presentation"
            />
          ))}
        </span>
      </button>
    );
  }
);
RippleButton.displayName = "RippleButton";
