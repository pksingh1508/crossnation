"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Button } from "@/components/ui/button";
import { NAVBAR_LINKS } from "@/constants/data";
import {
  Globe,
  Phone,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import { colors } from "@/constants/color";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { fontInter, fontMontserrat, fontPoppins, fontRoboto } from "@/fonts";

export function Navbar() {
  const tCommon = useTranslations("common");
  const tNav = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Helper function to check if a link is active
  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === `/${locale}` || pathname === `/${locale}/`;
    }
    return (
      pathname === `/${locale}${href}` ||
      pathname.startsWith(`/${locale}${href}/`)
    );
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`bg-white sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "shadow-lg backdrop-blur-sm bg-white/95" : ""
      }`}
    >
      {/* Top bar */}
      <div className="container mx-auto px-4 flex items-center justify-between text-sm">
        <div className="max-w-7xl w-full flex items-center justify-between m-auto">
          <div className="flex items-center gap-2 md:gap-6 text-gray-400">
            <a
              href="tel:+48222095497"
              className={`inline-flex items-center gap-2 hover:text-gray-600 transition-colors hover:bg-[var(--hover-bg)] px-2.5 py-2.5 ${fontRoboto.className}`}
              style={{ ["--hover-bg" as any]: colors.yellow.dark }}
            >
              <Phone className="md:h-4 md:w-4 h-2 w-2" /> +48 22 209 5497
            </a>
            <a
              href="tel:+48726635666"
              className={`inline-flex items-center gap-2 hover:text-gray-600 transition-colors hover:bg-[var(--hover-bg)] px-2.5 py-2.5 ${fontRoboto.className}`}
              style={{ ["--hover-bg" as any]: colors.yellow.dark }}
            >
              <Phone className="md:h-4 md:w-4 h-2 w-2" /> +48 72 635 666
            </a>
          </div>
          {/* Top-bar right: large screens (2xl+) show full actions; below that only language */}
          <div className="hidden 2xl:flex items-center gap-2 text-gray-400">
            <div className="flex items-center pr-2">
              <a
                href="https://www.facebook.com/eucareerserwis/"
                aria-label="Facebook"
                target="_blank"
                className="hover:text-gray-600 transition-colors hover:bg-[var(--hover-bg)] px-2.5 py-3"
                style={{ ["--hover-bg" as any]: colors.yellow.dark }}
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://www.instagram.com/eucareerserwis"
                aria-label="Instagram"
                target="_blank"
                className="hover:text-gray-600 transition-colors hover:bg-[var(--hover-bg)] px-2.5 py-3"
                style={{ ["--hover-bg" as any]: colors.yellow.dark }}
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://x.com/eucareerserwis"
                aria-label="Twitter"
                target="_blank"
                className="hover:text-gray-600 transition-colors hover:bg-[var(--hover-bg)] px-2.5 py-3"
                style={{ ["--hover-bg" as any]: colors.yellow.dark }}
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="https://www.linkedin.com/company/eu-career-serwis"
                aria-label="Linkedin"
                target="_blank"
                className="hover:text-gray-600 transition-colors hover:bg-[var(--hover-bg)] px-2.5 py-3"
                style={{ ["--hover-bg" as any]: colors.yellow.dark }}
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
            <Button
              asChild
              variant="outline"
              className={`hidden sm:inline-flex hover:bg-[var(--hover-bg)] hover:text-black border-[var(--hover-bg)] ${fontPoppins.className} ${isActive("/book") ? "bg-yellow-500 text-black" : ""}`}
              style={{
                ["--hover-bg" as any]: colors.yellow.DEFAULT,
              }}
            >
              <Link href={`/${locale}/book`}>{tCommon("book")}</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className={`hidden sm:inline-flex hover:bg-[var(--hover-bg)] hover:text-black border-[var(--hover-bg)] ${fontPoppins.className}`}
              style={{
                ["--hover-bg" as any]: colors.yellow.dark,
                ["--active-bg" as any]: colors.yellow.DEFAULT,
              }}
            >
              <Link
                href={`/${locale}/contact`}
                className={`${isActive("/contact") ? "bg-yellow-500 text-black" : ""}`}
              >
                {tCommon("contact")}
              </Link>
            </Button>
            <LanguageSwitcher />
          </div>
          {/* Small to xl: only language on the right */}
          <div className="flex 2xl:hidden items-center gap-2">
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-b">
        <div className="max-w-7xl w-full mx-auto flex items-center justify-between">
          <div className="container mx-auto px-4  grid grid-cols-2 items-center">
            {/* Logo */}
            <Link href={`/${locale}`} className="flex items-center gap-3">
              <motion.div whileHover={{ scale: 1.01 }}>
                <Image
                  src="/EU-logo.jpeg"
                  alt="CountryNation Logo"
                  width={160}
                  height={48}
                  className="h-16 w-52 object-cover"
                />
              </motion.div>
            </Link>

            {/* Links (right) - show from xl and up */}
            <div className="hidden xl:flex items-center justify-end gap-2">
              <Link
                href={`/${locale}/`}
                className={`hover:bg-[var(--hover-bg)] px-4 py-2 rounded-md transition-colors hover:translate-y-[-2px] ${
                  isActive("/") ? "bg-[var(--active-bg)]" : ""
                }`}
                style={{
                  ["--hover-bg" as any]: colors.yellow.dark,
                  ["--active-bg" as any]: colors.yellow.DEFAULT,
                }}
              >
                <Image src="/homeIcon.png" alt="Home" width={16} height={16} />
              </Link>
              {NAVBAR_LINKS.map((item) => {
                const key = item.href.replace(/^\//, "");
                return (
                  <motion.div key={item.href} whileHover={{ y: -2 }}>
                    <Link
                      href={`/${locale}${item.href}`}
                      className={`text-gray-700 transition-colors rounded-md px-4 py-2 hover:bg-[var(--hover-bg)] hover:text-black hover:shadow-lg ${fontPoppins.className} font-medium ${
                        isActive(item.href)
                          ? "bg-[var(--active-bg)] text-black shadow-lg"
                          : ""
                      }`}
                      style={{
                        ["--hover-bg" as any]: colors.yellow.dark,
                        ["--active-bg" as any]: colors.yellow.DEFAULT,
                      }}
                    >
                      {tNav(key as any)}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Toggle + actions for < xl */}
            <div className="flex lg:hidden items-center justify-end">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
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
            {/* From lg to < xl: show Book button left of toggle */}
            <div className="hidden lg:flex xl:hidden items-center justify-end gap-2">
              <Button
                asChild
                size="sm"
                variant="brandOutline"
                className={`w-full hover:bg-[var(--hover-bg)] hover:text-black border-[var(--hover-bg)] ${fontMontserrat.className} ${isActive("/book") ? "bg-yellow-500 text-black" : ""}`}
                style={{
                  ["--hover-bg" as any]: colors.yellow.DEFAULT,
                }}
              >
                <Link href={`/${locale}/book`}>{tCommon("book")}</Link>
              </Button>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-300"
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
          {/* No bottom actions on xl; actions remain in the top bar */}
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="xl:hidden border-t bg-white"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
              <Link
                href={`/${locale}/`}
                className={`hover:bg-[var(--hover-bg)] px-4 py-2 rounded-md transition-colors hover:translate-y-[-2px] ${
                  isActive("/") ? "bg-[var(--active-bg)]" : ""
                }`}
                style={{
                  ["--hover-bg" as any]: colors.yellow.dark,
                  ["--active-bg" as any]: colors.yellow.DEFAULT,
                }}
                onClick={() => setIsOpen(false)}
              >
                <Image src="/homeIcon.png" alt="Home" width={16} height={16} />
              </Link>
              {NAVBAR_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={`/${locale}${item.href}`}
                  className={`text-gray-700 rounded-md px-3 py-2 hover:bg-[var(--hover-bg)] hover:text-black ${fontPoppins.className} font-medium ${
                    isActive(item.href)
                      ? "bg-[var(--active-bg)] text-black"
                      : ""
                  }`}
                  style={{
                    ["--hover-bg" as any]: colors.yellow.DEFAULT,
                    ["--active-bg" as any]: colors.yellow.DEFAULT,
                  }}
                  onClick={() => setIsOpen(false)}
                >
                  {tNav(item.href.replace(/^\//, "") as any)}
                </Link>
              ))}
              {/* Buttons visible in drawer only for < lg */}
              <div className="mt-2 grid gap-2 lg:hidden">
                <Button
                  asChild
                  variant="brandOutline"
                  className={`w-full hover:bg-[var(--hover-bg)] hover:text-black border-[var(--hover-bg)] ${fontMontserrat.className} ${isActive("/book") ? "bg-yellow-500 text-black" : ""}`}
                  style={{
                    ["--hover-bg" as any]: colors.yellow.DEFAULT,
                  }}
                >
                  <Link
                    href={`/${locale}/book`}
                    onClick={() => setIsOpen(false)}
                  >
                    {tCommon("book")}
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className={`w-full hover:bg-[var(--hover-bg)] hover:text-black border-[var(--hover-bg)] ${fontMontserrat.className} ${isActive("/contact") ? "bg-yellow-500 text-black" : ""}`}
                  style={{
                    ["--hover-bg" as any]: colors.yellow.DEFAULT,
                  }}
                >
                  <Link
                    href={`/${locale}/contact`}
                    onClick={() => setIsOpen(false)}
                  >
                    {tCommon("contact")}
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
