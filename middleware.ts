import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { siteConfig } from "@/constants/site";
import { canonicalSlug } from "@/lib/cms/slug";

const intlMiddleware = createMiddleware({
  locales: siteConfig.supportedLanguages,
  defaultLocale: siteConfig.defaultLanguage,
  localePrefix: "as-needed",
  localeDetection: false,
});

// A blog post or news article, with or without a language prefix, e.g. /pl/blog/<slug>
const ARTICLE_PATH = new RegExp(
  `^(/(?:${siteConfig.supportedLanguages.join("|")}))?/(blog|immigration-news)/([^/]+)$`
);

export default function middleware(request: NextRequest) {
  // Old links can have capitals or spaces (e.g. /immigration-news/Schengen-Visa), but slugs are
  // lower case. Redirecting here, before the page starts streaming, sends a real 308 status.
  const match = request.nextUrl.pathname.match(ARTICLE_PATH);
  if (match) {
    const [, prefix = "", section, slug] = match;
    const target = encodeURIComponent(canonicalSlug(slug));
    if (target && target !== slug) {
      const url = request.nextUrl.clone();
      url.pathname = `${prefix}/${section}/${target}`;
      return NextResponse.redirect(url, 308);
    }
  }

  return intlMiddleware(request);
}

export const config = {
  // sitemap-blogs is a route handler without a language: rewriting it to /en/sitemap-blogs would 404
  matcher: ["/((?!api|_next|sitemap-blogs|.*\\..*).*)"],
};
