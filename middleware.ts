import createMiddleware from "next-intl/middleware";
import { siteConfig } from "@/constants/site";

export default createMiddleware({
  // All supported locales
  locales: siteConfig.supportedLanguages,

  // Default locale when none matches
  defaultLocale: siteConfig.defaultLanguage,

  // Always include locale prefix for consistency
  localePrefix: "always",
});

export const config = {
  // Dynamically match all supported locales instead of hardcoding
  matcher: ["/", `/(?:${siteConfig.supportedLanguages.join("|")})/:path*`],
};
