import { MetadataRoute } from "next";
import { siteConfig } from "@/constants/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const currentDate = new Date();

  // Static pages for each language
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

  // Generate URLs for all supported languages
  const sitemapEntries: MetadataRoute.Sitemap = [];

  siteConfig.supportedLanguages.forEach((lang) => {
    staticPages.forEach((page) => {
      sitemapEntries.push({
        url: `${baseUrl}/${lang}${page}`,
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
  });

  // This make Google aware of blog sitemap
  sitemapEntries.push({
    url: `${baseUrl}/sitemap-blogs.xml`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.8,
  });

  return sitemapEntries;
}
