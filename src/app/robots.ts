import { MetadataRoute } from "next";
import { siteConfig } from "@/constants/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/_next/", "/private/", "/search"],
      },
      {
        userAgent: ["Googlebot", "Bingbot"],
        allow: "/",
        disallow: ["/api/", "/admin/", "/private/"],
      },
    ],
    sitemap: [
      `${siteConfig.url}/sitemap.xml`,
      `${siteConfig.url}/sitemap-blogs.xml`,
    ],
  };
}
