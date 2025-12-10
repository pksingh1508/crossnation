import createMiddleware from "next-intl/middleware";
import { siteConfig } from "@/constants/site";

export default createMiddleware({
  locales: siteConfig.supportedLanguages,
  defaultLocale: siteConfig.defaultLanguage,
  localePrefix: "always",
});

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
