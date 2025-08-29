import { cn } from "@/lib/utils";
import { JSX } from "react";

type As = keyof JSX.IntrinsicElements;

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: Extract<As, "h1" | "h2" | "h3" | "h4" | "h5" | "h6">;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
  weight?: "normal" | "medium" | "semibold" | "bold";
}

const sizeToClass: Record<NonNullable<HeadingProps["size"]>, string> = {
  xs: "text-[var(--text-sm)]",
  sm: "text-[var(--text-base)]",
  md: "text-[var(--text-lg)]",
  lg: "text-[var(--text-xl)]",
  xl: "text-[var(--text-2xl)]",
  "2xl": "text-[var(--text-3xl)]",
  "3xl": "text-[var(--text-4xl)]",
  "4xl": "text-[var(--text-5xl)]",
  "5xl": "text-6xl",
};

export function Heading({
  as = "h2",
  size = "xl",
  weight = "semibold",
  className,
  ...props
}: HeadingProps) {
  const Comp = as;
  return (
    <Comp
      className={cn(
        "tracking-tight",
        sizeToClass[size],
        weight === "normal"
          ? "font-normal"
          : weight === "medium"
            ? "font-medium"
            : weight === "semibold"
              ? "font-semibold"
              : "font-bold",
        className
      )}
      {...props}
    />
  );
}

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  as?: Extract<As, "p" | "span" | "small">;
  size?: "xs" | "sm" | "base" | "lg";
  muted?: boolean;
}

const textSizeToClass: Record<NonNullable<TextProps["size"]>, string> = {
  xs: "text-[var(--text-xs)]",
  sm: "text-[var(--text-sm)]",
  base: "text-[var(--text-base)]",
  lg: "text-[var(--text-lg)]",
};

export function Text({
  as = "p",
  size = "base",
  muted,
  className,
  ...props
}: TextProps) {
  const Comp = as as any;
  return (
    <Comp
      className={cn(
        textSizeToClass[size],
        muted && "text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}

export default { Heading, Text };
