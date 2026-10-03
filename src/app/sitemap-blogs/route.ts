import { NextResponse } from "next/server";
import { siteConfig } from "@/constants/site";
import { getSitemapEntries } from "@/lib/cms/queries";
import { getLocalizedUrl } from "@/lib/locale-paths";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

export async function GET() {
  try {
    const sitemapEntries: any[] = [];

    // Every published post and article, with the date it last changed
    const { blog, news } = await getSitemapEntries();

    // Add main category pages
    sitemapEntries.push({
      url: getLocalizedUrl(siteConfig.defaultLanguage, "/blog"),
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.8,
    });

    sitemapEntries.push({
      url: getLocalizedUrl(siteConfig.defaultLanguage, "/immigration-news"),
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.8,
    });

    // Add individual blog URLs
    blog.forEach(({ slug, updated_at }) => {
      sitemapEntries.push({
        url: getLocalizedUrl(
          siteConfig.defaultLanguage,
          `/blog/${encodeURIComponent(slug)}`
        ),
        lastModified: new Date(updated_at).toISOString(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    });

    // Add individual news URLs
    news.forEach(({ slug, updated_at }) => {
      sitemapEntries.push({
        url: getLocalizedUrl(
          siteConfig.defaultLanguage,
          `/immigration-news/${encodeURIComponent(slug)}`
        ),
        lastModified: new Date(updated_at).toISOString(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    });

    // Generate XML
    const xml = generateSitemapXML(sitemapEntries);

    return new NextResponse(xml, {
      status: 200,
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control":
          "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("❌ Error generating blogs sitemap:", error);

    // Return a minimal valid sitemap on error
    const baseUrl = siteConfig.url;
    const errorXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>
</urlset>`;

    return new NextResponse(errorXml, {
      status: 200,
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
      },
    });
  }
}

function generateSitemapXML(entries: any[]): string {
  const urlElements = entries
    .map(
      (entry) => `
  <url>
    <loc>${escapeXml(entry.url)}</loc>
    <lastmod>${entry.lastModified}</lastmod>
    <changefreq>${entry.changeFrequency}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urlElements}
</urlset>`;
}

// Escape special XML characters
function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
