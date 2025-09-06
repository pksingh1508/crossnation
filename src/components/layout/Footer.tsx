"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NAVBAR_LINKS, FOOTER_SERVICES } from "@/constants/data";
import { colors } from "@/constants/color";
import { Phone, MapPin, Clock } from "lucide-react";
import Image from "next/image";

export function Footer() {
  const locale = useLocale();
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");

  return (
    <footer className="mt-auto bg-gray-50 text-gray-800 px-4 xl:px-28">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <Image
                src="/mylogo.jpeg"
                alt="Logo"
                width={160}
                height={48}
                className="h-16 w-52 object-cover"
              />
            </div>
            <p className="text-gray-600 leading-relaxed mb-6">
              {t("company.description")}
            </p>
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin
                className="w-4 h-4"
                style={{ color: colors.yellow.DEFAULT }}
              />
              <span className="text-sm">{t("company.location")}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col lg:items-center items-start">
            <h4 className="text-lg font-semibold text-gray-800 mb-6">
              {t("sections.navigation")}
            </h4>
            <ul className="space-y-3">
              {NAVBAR_LINKS.slice(0, 6).map((link) => (
                <li key={link.href}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="text-gray-600 hover:text-amber-500 transition-colors duration-200 text-sm font-medium"
                  >
                    {tNav(link.href.replace(/^\//, "") as any)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-start lg:items-center">
            <h4 className="text-lg font-semibold text-gray-800 mb-6">
              {t("sections.workHours")}
            </h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                  <Clock
                    className="w-4 h-4"
                    style={{ color: colors.yellow.DEFAULT }}
                  />
                </div>
                <div>
                  <p className="text-gray-800 font-medium text-sm">
                    {t("contact.businessHours")}
                  </p>
                  <p className="text-gray-500 text-xs">
                    {t("contact.businessHoursLabel")}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                  <Phone
                    className="w-4 h-4"
                    style={{ color: colors.yellow.DEFAULT }}
                  />
                </div>
                <div>
                  <p className="text-gray-800 font-medium text-sm">
                    +48 22 209 5497
                  </p>
                  <p className="text-gray-500 text-xs">{t("contact.callUs")}</p>
                </div>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mt-4">
                {t("contact.description")}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-300 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              {t("bottom.copyright", { year: new Date().getFullYear() })}
            </p>
            <div className="flex items-center gap-6">
              <Link
                href={`/${locale}/privacy-policy`}
                className="text-gray-500 hover:text-amber-500 text-sm transition-colors"
              >
                {t("bottom.privacyPolicy")}
              </Link>
              <Link
                href={`/${locale}/terms-and-conditions`}
                className="text-gray-500 hover:text-amber-500 text-sm transition-colors"
              >
                {t("bottom.termsOfService")}
              </Link>
              <Link
                href={`/${locale}/refund-policy`}
                className="text-gray-500 hover:text-amber-500 text-sm transition-colors"
              >
                {t("bottom.refundPolicy")}
              </Link>
              <Link
                href={`/${locale}/antiFraud-policy`}
                className="text-gray-500 hover:text-amber-500 text-sm transition-colors"
              >
                {t("bottom.antiFraudPolicy")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
