"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { ChevronRight, House } from "lucide-react";
import { StructuredData } from "./StructuredData";
import { generateBreadcrumbSchema } from "@/lib/seo/structuredData";
import { siteConfig } from "@/constants/site";
import { fontPoppins } from "@/fonts";
import { delay } from "@/lib/animation";
import { cn } from "@/lib/utils";
import { getLocalizedPath } from "@/lib/locale-paths";

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

/**
 * The trail from the home page to this one, for visitors and, as structured data, for
 * search engines. On one line: a long last item (an article's title) is cut short.
 */
export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  const locale = useLocale();

  // Add home as the first item
  const allItems = [
    { name: "Home", href: getLocalizedPath(locale, "/") },
    ...items,
  ];

  // Generate structured data for breadcrumbs
  const breadcrumbSchema = generateBreadcrumbSchema(
    allItems.map((item) => ({
      name: item.name,
      url: `${process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url}${item.href}`,
    }))
  );

  return (
    <>
      <StructuredData data={breadcrumbSchema} />
      {/* 78rem: as wide as the content of the sections below, max-w-7xl less their
          padding */}
      <nav
        aria-label="Breadcrumb"
        className={cn(
          "mx-auto max-w-[78rem]",
          fontPoppins.className,
          className
        )}
      >
        <ol className="flex items-center gap-2 text-sm text-neutral-500">
          {allItems.map((item, index) => {
            const isCurrent = index === allItems.length - 1;
            return (
              <li
                key={item.href}
                className={cn(
                  "flex animate-rise items-center gap-2 motion-reduce:animate-none",
                  isCurrent ? "min-w-0" : "shrink-0"
                )}
                style={delay(index * 80)}
              >
                {index > 0 && (
                  <ChevronRight
                    aria-hidden
                    className="size-3.5 shrink-0 text-neutral-300"
                  />
                )}
                {isCurrent ? (
                  <span
                    aria-current="page"
                    className="truncate font-medium text-neutral-950"
                  >
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="group/crumb inline-flex items-center gap-1.5 rounded-sm whitespace-nowrap transition-colors duration-200 outline-none hover:text-neutral-950 focus-visible:ring-2 focus-visible:ring-neutral-950"
                  >
                    {index === 0 && (
                      <House
                        aria-hidden
                        className="size-4 transition-transform duration-300 ease-out-quint group-hover/crumb:-translate-y-px"
                      />
                    )}
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
