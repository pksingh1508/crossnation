import { getRequestConfig } from "next-intl/server";
import { siteConfig } from "@/constants/site";

export default getRequestConfig(async ({ locale }) => {
  // Fallback: use default language if locale is missing
  const finalLocale =
    locale && siteConfig.supportedLanguages.includes(locale as any)
      ? locale
      : siteConfig.defaultLanguage;

  return {
    locale: finalLocale,
    messages: (await import(`../../messages/${finalLocale}.json`)).default,
  };
});
