"use client";

import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const t = useTranslations("common");

  return (
    <nav className="border-b bg-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <h1 className="text-xl font-bold">{t("welcome")}</h1>
          <div className="hidden md:flex space-x-6">
            <a href="#" className="text-gray-600 hover:text-gray-900">
              {t("home")}
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              {t("about")}
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              {t("services")}
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              {t("contact")}
            </a>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="outline">{t("book")}</Button>
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  );
}
