"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { motion, type Transition } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTranslations } from "@/hooks/useTranslations";
import { fontPoppins } from "@/fonts";
import { cn } from "@/lib/utils";

// The yellow marker glides to the chosen page on this spring, as the navbar's pill does
const MARKER_SPRING: Transition = {
  type: "spring",
  stiffness: 420,
  damping: 36,
  mass: 0.8,
};

/**
 * The page numbers to show: the first, the last, and the current one with its
 * neighbours. A gap of one page shows that page; a longer one shows as "gap".
 */
export function pageItems(page: number, count: number): (number | "gap")[] {
  const shown = [...new Set([1, page - 1, page, page + 1, count])]
    .filter((p) => p >= 1 && p <= count)
    .sort((a, b) => a - b);
  const items: (number | "gap")[] = [];
  shown.forEach((p, i) => {
    const previous = shown[i - 1];
    if (previous !== undefined && p - previous > 1) {
      items.push(p - previous === 2 ? p - 1 : "gap");
    }
    items.push(p);
  });
  return items;
}

interface PaginationProps {
  /** The page to mark as current; it can run ahead of the loaded page */
  page: number;
  pageCount: number;
  /** The address of a page */
  href: (page: number) => string;
  /** Called instead of a plain navigation, for a smooth change of page */
  onNavigate: (page: number) => void;
}

/**
 * Previous and next, and the page numbers between them. They are real links, so they work
 * without JavaScript, can open in a new tab, and are followed by search engines; a plain
 * click hands over to onNavigate. Below 400px only "Page 2 of 4" shows between the arrows.
 */
export function Pagination({
  page,
  pageCount,
  href,
  onNavigate,
}: PaginationProps) {
  const t = useTranslations("pagination");
  if (pageCount <= 1) return null;

  const link = (
    to: number,
    children: ReactNode,
    className: string,
    label?: string
  ) => (
    <Link
      href={href(to)}
      scroll={false}
      aria-label={label}
      aria-current={to === page ? "page" : undefined}
      onNavigate={(event) => {
        event.preventDefault();
        onNavigate(to);
      }}
      className={className}
    >
      {children}
    </Link>
  );

  const step = (to: number, direction: "previous" | "next") => {
    const Icon = direction === "previous" ? ArrowLeft : ArrowRight;
    const content = (
      <>
        <Icon
          aria-hidden
          className={cn(
            "size-4 transition-transform duration-300 ease-out-quint",
            direction === "previous"
              ? "order-first group-hover/step:-translate-x-0.5"
              : "order-last group-hover/step:translate-x-0.5"
          )}
        />
        <span className="max-sm:sr-only">{t(direction)}</span>
      </>
    );
    const className =
      "group/step inline-flex h-11 items-center gap-2 rounded-full border border-neutral-200 px-4 text-sm font-medium text-neutral-800 transition-[border-color,background-color,color] duration-300 outline-none";

    // At either end the step is shown, faded, but isn't a link
    if (to < 1 || to > pageCount) {
      return (
        <span aria-disabled className={cn(className, "opacity-40")}>
          {content}
        </span>
      );
    }
    return link(
      to,
      content,
      cn(
        className,
        "hover:border-neutral-950 hover:text-neutral-950 focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
      )
    );
  };

  return (
    <nav
      aria-label={t("label")}
      className={cn(
        "mt-16 flex items-center justify-between gap-3 border-t border-neutral-200 pt-8 sm:mt-20",
        fontPoppins.className
      )}
    >
      {step(page - 1, "previous")}

      <ol className="flex items-center gap-1 max-[399px]:hidden">
        {pageItems(page, pageCount).map((item, index) =>
          item === "gap" ? (
            <li
              key={`gap-${index}`}
              aria-hidden
              className="grid size-10 place-items-center text-neutral-400"
            >
              …
            </li>
          ) : (
            <li key={item}>
              {link(
                item,
                <>
                  {item === page && (
                    <motion.span
                      layoutId="article-page-marker"
                      transition={MARKER_SPRING}
                      className="absolute inset-0 rounded-full bg-brand shadow-[0_8px_20px_-10px_rgba(254,204,0,0.95)]"
                    />
                  )}
                  <span className="relative">{item}</span>
                </>,
                cn(
                  "relative grid size-10 place-items-center rounded-full text-sm font-semibold tabular-nums transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-neutral-950",
                  item === page
                    ? "text-neutral-950"
                    : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950"
                ),
                t("pageOf", { page: item, count: pageCount })
              )}
            </li>
          )
        )}
      </ol>
      <p className="text-sm text-neutral-600 tabular-nums min-[400px]:hidden">
        {t("pageOf", { page, count: pageCount })}
      </p>

      {step(page + 1, "next")}
    </nav>
  );
}
