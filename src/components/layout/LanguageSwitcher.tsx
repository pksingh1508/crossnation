"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { siteConfig } from "@/constants/site";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLocaleStore } from "@/store/useLocaleStore";
import language from "@/constants/language.json";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("common");
  const { setLocale } = useLocaleStore();

  const handleLanguageChange = (newLocale: string) => {
    // set the locale in global state management
    setLocale(newLocale);
    // Remove the current locale from the pathname
    const pathWithoutLocale = pathname.replace(`/${locale}`, "") || "/";

    // Always include the locale prefix for consistency
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  return (
    <Select value={locale} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-[100px]">
        <SelectValue>
          {language.find((lang) => lang.isoCode === locale)?.name ||
            t("language")}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {language.map((lang) => (
          <SelectItem key={lang.name} value={lang.isoCode}>
            <span>{lang.name}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
