
import { NextResponse } from "next/server";
import { siteConfig } from "@/constants/site";
import { fetchSlugs } from "@/lib/strapi";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

interface SitemapEntry {
  url: string;
  lastModified: string;
  changeFrequency: "daily" | "weekly" | "monthly";
  priority: number;
}

export async function GET() {
  try {
    const baseUrl = siteConfig.url;
    const entries: SitemapEntry[] = [];
    const token = process.env.STRAPI_ACCESS_TOKEN;

    const [blogSlugs, newsSlugs] = token
      ? await Promise.all([
          fetchSlugs(token, "blogs", siteConfig.defaultLanguage),
          fetchSlugs(token, "immigration-news", siteConfig.defaultLanguage),
        ])
      : [[], []];

    const now = new Date().toISOString();
    entries.push(
      {
        url: `${baseUrl}/en/blog`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.8,
      },
      {
        url: `${baseUrl}/en/immigration-news`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.8,
      }
    );

    blogSlugs.forEach((slug) => {
      const encodedSlug = encodeURIComponent(slug);
      entries.push({
        url: `${baseUrl}/en/blog/${encodedSlug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    });

    newsSlugs.forEach((slug) => {
      const encodedSlug = encodeURIComponent(slug);
      entries.push({
        url: `${baseUrl}/en/immigration-news/${encodedSlug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    });

    const xml = generateSitemapXML(entries);

    return new NextResponse(xml, {
      status: 200,
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control":
          "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Error generating blogs sitemap:", error);
    const baseUrl = siteConfig.url;
    const fallbackXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>
</urlset>`;

    return new NextResponse(fallbackXml, {
      status: 200,
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
      },
    });
  }
}

function generateSitemapXML(entries: SitemapEntry[]): string {
  const urlElements = entries
    .map(
      (entry) => `
  <url>
    <loc>${escapeXml(entry.url)}</loc>
    <lastmod>${entry.lastModified}</lastmod>
    <changefreq>${entry.changeFrequency}</changefreq>
    <priority>${entry.priority.toFixed(1)}</priority>
  </url>`
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urlElements}
</urlset>`;
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
