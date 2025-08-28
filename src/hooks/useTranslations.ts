import {
  useTranslations as useNextIntlTranslations,
  useLocale as useNextIntlLocale,
} from "next-intl";

// Wrapper for translations (with optional namespace)
export function useTranslations(namespace?: string) {
  return useNextIntlTranslations(namespace);
}

// Wrapper for locale (reads from NextIntlClientProvider)
export function useLocale() {
  return useNextIntlLocale();
}
