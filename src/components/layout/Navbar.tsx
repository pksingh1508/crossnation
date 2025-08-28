"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Button } from "@/components/ui/button";
import { NAVBAR_LINKS } from "@/constants/data";
import { Globe } from "lucide-react";
import { colors } from "@/constants/color";

export function Navbar() {
  const t = useTranslations("common");
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="border-b bg-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4 md:gap-8">
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <Globe
              aria-hidden="true"
              size={24}
              style={{ color: colors.yellow.DEFAULT }}
            />
            <span
              className="text-xl font-bold"
              style={{ color: colors.black.light }}
            >
              CrossNation
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {NAVBAR_LINKS.map((item) => (
              <Link
                key={item.href}
                href={`/${locale}${item.href}`}
                className="text-gray-600 hover:text-gray-900"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <Button
            asChild
            variant="outline"
            className="hidden sm:inline-flex"
            style={{
              borderColor: colors.yellow.DEFAULT,
              color: colors.black.light,
            }}
          >
            <Link href={`/${locale}/book`}>{t("book")}</Link>
          </Button>
          <LanguageSwitcher />

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 md:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="container mx-auto px-4 py-3 flex flex-col gap-3">
            {NAVBAR_LINKS.map((item) => (
              <Link
                key={item.href}
                href={`/${locale}${item.href}`}
                className="text-gray-700 hover:text-gray-900"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Button
              asChild
              variant="outline"
              className="mt-2 w-full"
              style={{
                borderColor: colors.yellow.DEFAULT,
                color: colors.black.light,
              }}
            >
              <Link href={`/${locale}/book`} onClick={() => setIsOpen(false)}>
                {t("book")}
              </Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
