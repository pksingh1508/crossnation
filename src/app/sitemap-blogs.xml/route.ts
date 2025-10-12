import { NextResponse } from "next/server";
import { siteConfig } from "@/constants/site";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

export async function GET() {
  try {
    const baseUrl = "https://eucareerserwis.pl";
    const sitemapEntries: any[] = [];

    // Fetch all slugs
    const [blogsRes, newsRes] = await Promise.all([
      fetch(`${baseUrl}/api/fetchBlogsSlug`, {
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      fetch(`${baseUrl}/api/fetchNewsSlug`, {
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    ]);

    if (!blogsRes.ok) {
      console.error(`Blog API failed: ${blogsRes.status}`);
    }
    if (!newsRes.ok) {
      console.error(`News API failed: ${newsRes.status}`);
    }

    const blogSlugs: string[] = blogsRes.ok ? await blogsRes.json() : [];
    const newsSlugs: string[] = newsRes.ok ? await newsRes.json() : [];

    console.log(
      `✅ Fetched ${blogSlugs.length} blogs and ${newsSlugs.length} news articles`
    );

    for (const lang of siteConfig.supportedLanguages) {
      // Add main category pages
      sitemapEntries.push({
        url: `${baseUrl}/${lang}/blog`,
        lastModified: new Date().toISOString(),
        changeFrequency: "weekly",
        priority: 0.8,
      });

      sitemapEntries.push({
        url: `${baseUrl}/${lang}/immigration-news`,
        lastModified: new Date().toISOString(),
        changeFrequency: "weekly",
        priority: 0.8,
      });

      // Add individual blog URLs
      blogSlugs.forEach((slug) => {
        if (slug && typeof slug === "string") {
          // URL encode the slug to handle spaces and special characters
          const encodedSlug = encodeURIComponent(slug);
          sitemapEntries.push({
            url: `${baseUrl}/${lang}/blog/${encodedSlug}`,
            lastModified: new Date().toISOString(),
            changeFrequency: "monthly",
            priority: 0.7,
          });
        }
      });

      // Add individual news URLs
      newsSlugs.forEach((slug) => {
        if (slug && typeof slug === "string") {
          const encodedSlug = encodeURIComponent(slug);
          sitemapEntries.push({
            url: `${baseUrl}/${lang}/immigration-news/${encodedSlug}`,
            lastModified: new Date().toISOString(),
            changeFrequency: "monthly",
            priority: 0.7,
          });
        }
      });
    }

    console.log(`✅ Generated ${sitemapEntries.length} sitemap entries`);

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
    const baseUrl = "https://eucareerserwis.pl";
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
