"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NAVBAR_LINKS,
  FOOTER_SERVICES,
  FOOTER_COUNTRIES,
} from "@/constants/data";
import { colors } from "@/constants/color";
import { Phone, ArrowUpRight } from "lucide-react";

export function Footer() {
  const locale = useLocale();

  return (
    <footer
      className="mt-auto"
      style={{ backgroundColor: colors.black.softer, color: colors.white }}
    >
      {/* Newsletter bar */}
      <div
        className="w-full"
        style={{
          background:
            "linear-gradient(90deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.08) 100%)",
        }}
      >
        <div className="container mx-auto px-4 py-6 grid gap-4 md:grid-cols-[1fr_auto] items-center">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold">Our Newsletters</h3>
            <p className="text-sm" style={{ color: colors.gray.DEFAULT }}>
              Get the latest updates, tips, and resources.
            </p>
          </div>
          <form className="flex w-full max-w-xl items-center gap-2">
            <Input
              type="email"
              placeholder="Email"
              className="flex-1 bg-transparent border"
              style={{ borderColor: colors.gray.light, color: colors.white }}
            />
            <Button
              type="submit"
              style={{
                backgroundColor: colors.yellow.DEFAULT,
                color: colors.black.light,
                borderColor: colors.yellow.DEFAULT,
              }}
              className="font-medium"
              variant="outline"
            >
              Submit Button
            </Button>
          </form>
        </div>
      </div>

      {/* Main footer content */}
      <div className="container mx-auto px-4 py-12 relative">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div
                className="h-8 w-8 rounded-md flex items-center justify-center text-sm font-bold"
                style={{
                  backgroundColor: colors.yellow.DEFAULT,
                  color: colors.black.light,
                }}
                aria-hidden
              >
                CN
              </div>
              <span className="text-xl font-semibold">CrossNation</span>
            </div>
            <p className="text-sm" style={{ color: colors.gray.DEFAULT }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
              tellus, luctus nec ullamcorper mattis.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="mb-4 text-base font-semibold">Navigation</h4>
            <ul className="space-y-2 text-sm">
              {NAVBAR_LINKS.map((n) => (
                <li key={n.href}>
                  <Link
                    href={`/${locale}${n.href}`}
                    className="hover:underline underline-offset-4"
                    style={{ color: colors.gray.DEFAULT }}
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Link (Services) */}
          <div>
            <h4 className="mb-4 text-base font-semibold">Quick Link</h4>
            <ul className="space-y-2 text-sm">
              {FOOTER_SERVICES.map((s) => (
                <li key={s.value}>
                  <span style={{ color: colors.gray.DEFAULT }}>{s.label}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Work Hours / Countries */}
          <div className="space-y-4">
            <div>
              <h4 className="mb-2 text-base font-semibold">Work Hours</h4>
              <p className="text-sm" style={{ color: colors.gray.DEFAULT }}>
                7 AM - 5 PM, Mon - Sat
              </p>
              <p
                className="mt-2 text-sm"
                style={{ color: colors.gray.DEFAULT }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                className="px-4"
                style={{
                  backgroundColor: "rgba(255,255,255,0.06)",
                  color: colors.white,
                }}
              >
                <Phone className="mr-2 h-4 w-4" /> Call Us
              </Button>
            </div>
          </div>
        </div>

        {/* Floating CTA bottom-left */}
        <div className="mt-10">
          <div
            className="inline-flex items-center gap-3 rounded-3xl px-6 py-5"
            style={{
              backgroundColor: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(6px)",
            }}
          >
            <span
              className="inline-flex h-8 w-12 items-center justify-center rounded-md text-black"
              style={{ backgroundColor: colors.white }}
            >
              <span className="h-2 w-2 rounded-sm bg-black mr-1" />
              <span className="h-2 w-2 rounded-sm bg-black mr-1" />
              <span className="h-2 w-2 rounded-sm bg-black" />
            </span>
            <ArrowUpRight className="h-5 w-5" />
            <span className="text-xl font-semibold">Visit site</span>
          </div>
        </div>

        <div
          className="mt-12 border-t pt-6 text-center text-sm"
          style={{
            borderColor: "rgba(255,255,255,0.1)",
            color: colors.gray.DEFAULT,
          }}
        >
          © {new Date().getFullYear()} CrossNation. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
