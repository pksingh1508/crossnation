"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { ChevronRight, Home } from "lucide-react";
import { StructuredData } from "./StructuredData";
import { generateBreadcrumbSchema } from "@/lib/seo/structuredData";
import { siteConfig } from "@/constants/site";

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  const locale = useLocale();

  // Add home as the first item
  const allItems = [{ name: "Home", href: `/${locale}` }, ...items];

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
      <nav
        aria-label="Breadcrumb"
        className={`flex items-center space-x-2 text-sm text-gray-600 max-w-7xl mx-auto ${className}`}
      >
        {allItems.map((item, index) => (
          <div key={item.href} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
            )}
            {index === 0 && <Home className="w-4 h-4 mr-2 text-gray-400" />}
            {index === allItems.length - 1 ? (
              <span className="font-medium text-gray-900" aria-current="page">
                {item.name}
              </span>
            ) : (
              <Link
                href={item.href}
                className="hover:text-yellow-600 transition-colors"
              >
                {item.name}
              </Link>
            )}
          </div>
        ))}
      </nav>
    </>
  );
}
