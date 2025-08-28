import createMiddleware from "next-intl/middleware";
import { siteConfig } from "@/constants/site";

export default createMiddleware({
  // All supported locales
  locales: siteConfig.supportedLanguages,

  // Default locale when none matches
  defaultLocale: siteConfig.defaultLanguage,

  // Only add locale in URL when not default
  localePrefix: "as-needed",
});

export const config = {
  // Dynamically match all supported locales instead of hardcoding
  matcher: ["/", `/(?:${siteConfig.supportedLanguages.join("|")})/:path*`],
};
