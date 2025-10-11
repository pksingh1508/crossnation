import { MetadataRoute } from "next";
import { siteConfig } from "@/constants/site";

export default async function blogsSitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;
  const sitemapEntries: MetadataRoute.Sitemap = [];
  try {
    for (const lang of siteConfig.supportedLanguages) {
      // --- Add main category pages ---
      sitemapEntries.push({
        url: `${baseUrl}/${lang}/blog`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      });
      sitemapEntries.push({
        url: `${baseUrl}/${lang}/immigration-news`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      });

      // --- Fetch the slug arrays ---
      const [blogsRes, newsRes] = await Promise.all([
        fetch(`${baseUrl}/api/fetchBlogsSlug?locale=${lang}`, {
          next: { revalidate: 3600 },
        }),
        fetch(`${baseUrl}/api/fetchNewsSlug?locale=${lang}`, {
          next: { revalidate: 3600 },
        }),
      ]);

      const blogSlugs: string[] = blogsRes.ok ? await blogsRes.json() : [];
      const newsSlugs: string[] = newsRes.ok ? await newsRes.json() : [];

      // --- Add individual blog URLs ---
      blogSlugs.forEach((slug) => {
        sitemapEntries.push({
          url: `${baseUrl}/${lang}/blog/${slug}`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.7,
        });
      });

      // --- Add individual news URLs ---
      newsSlugs.forEach((slug) => {
        sitemapEntries.push({
          url: `${baseUrl}/${lang}/immigration-news/${slug}`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.7,
        });
      });
    }

    return sitemapEntries;
  } catch (error) {
    console.error("Error generating blogs sitemap:", error);
    return [];
  }
}

// `// Fetch blog posts for sitemap (you can expand this to fetch from your CMS)
//     const blogEntries: MetadataRoute.Sitemap = [];

//     // For each supported language, add blog entries
//     siteConfig.supportedLanguages.forEach((lang) => {
//       // Add main blog page
//       blogEntries.push({
//         url: `${baseUrl}/${lang}/blog`,
//         lastModified: new Date(),
//         changeFrequency: "weekly",
//         priority: 0.8,
//       });

//       // You can add dynamic blog posts here when you have the CMS data
//       // Example structure for when you fetch from Strapi:
//       /*
//       const blogPosts = await fetchBlogPosts(lang)
//       blogPosts.forEach((post) => {
//         blogEntries.push({
//           url: `${baseUrl}/${lang}/blog/${post.slug}`,
//           lastModified: new Date(post.updatedAt),
//           changeFrequency: 'monthly',
//           priority: 0.7,
//         })
//       })
//       */
//     });

//     return blogEntries;`
