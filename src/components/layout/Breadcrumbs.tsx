"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { getLocalizedPath, stripLocalePrefix } from "@/lib/locale-paths";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

function toTitleCase(segment: string): string {
  return segment.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export function Breadcrumbs() {
  const locale = useLocale();
  const pathname = usePathname();
  const strippedPath = stripLocalePrefix(pathname);
  const pathSegments = strippedPath.split("/").filter(Boolean);

  const items = [
    {
      href: getLocalizedPath(locale, "/"),
      label: "Home",
    },
    ...pathSegments.map((segment, index) => {
      const href = getLocalizedPath(
        locale,
        `/${pathSegments.slice(0, index + 1).join("/")}`
      );
      return {
        href,
        label: toTitleCase(segment),
      };
    }),
  ];

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <BreadcrumbItem key={item.href}>
              {isLast ? (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={item.href}>{item.label}</Link>
                </BreadcrumbLink>
              )}
              {!isLast && <BreadcrumbSeparator />}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default Breadcrumbs;
