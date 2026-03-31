import { siteConfig } from "@/constants/site";

export function isDefaultLocale(locale: string) {
  return locale === siteConfig.defaultLanguage;
}

export function normalizePathname(pathname: string = "/") {
  if (!pathname) {
    return "/";
  }

  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const trimmed = normalized.replace(/\/+$/, "");

  return trimmed || "/";
}

export function stripLocalePrefix(pathname: string = "/") {
  const normalized = normalizePathname(pathname);
  const segments = normalized.split("/").filter(Boolean);
  const [maybeLocale, ...rest] = segments;

  if (
    maybeLocale &&
    siteConfig.supportedLanguages.includes(
      maybeLocale as (typeof siteConfig.supportedLanguages)[number]
    )
  ) {
    return rest.length > 0 ? `/${rest.join("/")}` : "/";
  }

  return normalized;
}

export function getLocalizedPath(locale: string, pathname: string = "/") {
  const normalized = normalizePathname(pathname);

  if (isDefaultLocale(locale)) {
    return normalized;
  }

  return normalized === "/" ? `/${locale}` : `/${locale}${normalized}`;
}

export function getLocalizedUrl(locale: string, pathname: string = "/") {
  return `${siteConfig.url}${getLocalizedPath(locale, pathname)}`;
}
