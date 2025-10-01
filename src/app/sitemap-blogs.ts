import { MetadataRoute } from "next";
import { siteConfig } from "@/constants/site";

export default async function blogsSitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;

  try {
    // Fetch blog posts for sitemap (you can expand this to fetch from your CMS)
    const blogEntries: MetadataRoute.Sitemap = [];

    // For each supported language, add blog entries
    siteConfig.supportedLanguages.forEach((lang) => {
      // Add main blog page
      blogEntries.push({
        url: `${baseUrl}/${lang}/blog`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      });

      // You can add dynamic blog posts here when you have the CMS data
      // Example structure for when you fetch from Strapi:
      /*
      const blogPosts = await fetchBlogPosts(lang)
      blogPosts.forEach((post) => {
        blogEntries.push({
          url: `${baseUrl}/${lang}/blog/${post.slug}`,
          lastModified: new Date(post.updatedAt),
          changeFrequency: 'monthly',
          priority: 0.7,
        })
      })
      */
    });

    return blogEntries;
  } catch (error) {
    console.error("Error generating blogs sitemap:", error);
    return [];
  }
}
