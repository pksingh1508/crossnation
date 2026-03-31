import { MetadataRoute } from "next";
import { siteConfig } from "@/constants/site";
import { getLocalizedUrl } from "@/lib/locale-paths";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const currentDate = new Date();

  const staticPages = [
    "",
    "/work",
    "/migrate",
    "/employer",
    "/recruiter",
    "/jobseeker",
    "/blog",
    "/immigration-news",
    "/success-stories",
    "/work-permit",
    "/visa-stamp",
    "/testimonials",
    "/company-certificate",
    "/contact",
    "/book",
    "/privacy-policy",
    "/terms-conditions",
    "/refund-policy",
    "/antiFraud-policy",
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  staticPages.forEach((page) => {
    sitemapEntries.push({
      url: getLocalizedUrl(siteConfig.defaultLanguage, page || "/"),
      lastModified: currentDate,
      changeFrequency:
        page === ""
          ? "daily"
          : page.includes("blog") || page.includes("news")
            ? "weekly"
            : page.includes("success") || page.includes("testimonials")
              ? "monthly"
              : "weekly",
      priority:
        page === ""
          ? 1.0
          : page === "/work" || page === "/migrate" || page === "/employer"
            ? 0.9
            : page === "/blog" || page === "/immigration-news"
              ? 0.8
              : page === "/contact" || page === "/book"
                ? 0.7
                : 0.6,
    });
  });

  return sitemapEntries;
}
