import createMiddleware from "next-intl/middleware";
import { siteConfig } from "@/constants/site";

export default createMiddleware({
  locales: siteConfig.supportedLanguages,
  defaultLocale: siteConfig.defaultLanguage,
  localePrefix: "as-needed",
  localeDetection: false,
});

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
