import type { Metadata } from "next";
import { siteConfig } from "@/constants/site";
import { getBlogPost } from "@/lib/cms/queries";
import { canonicalSlug } from "@/lib/cms/slug";
import { generateMetadata as buildMetadata } from "@/lib/seo/metadata";
import { getLocalizedUrl } from "@/lib/locale-paths";

interface RouteParams {
  params: Promise<{ slug?: string; lang?: string }>;
}

const FALLBACK_TITLE = "Immigration Blog Article";
const FALLBACK_DESCRIPTION =
  "Read immigration insights, legal updates, and recruitment tips from EU Career Serwis.";

/** "a, b, c" → ["a", "b", "c"] */
function splitKeywords(keywords: string | null) {
  return (keywords ?? "")
    .split(",")
    .map((keyword) => keyword.trim())
    .filter(Boolean);
}

export async function generateMetadata({
  params,
}: RouteParams): Promise<Metadata> {
  const { slug = "" } = await params;
  const clean = canonicalSlug(slug);
  // Every language shows the same post, so the English address is the canonical one
  const canonical = getLocalizedUrl(
    siteConfig.defaultLanguage,
    `/blog/${clean}`
  );
  const fallback = () =>
    buildMetadata({
      title: FALLBACK_TITLE,
      description: FALLBACK_DESCRIPTION,
      canonical,
    });

  if (!clean) {
    return fallback();
  }

  try {
    const post = await getBlogPost(clean);
    if (!post) {
      return fallback();
    }

    const keywords = splitKeywords(post.seo_keywords);
    const metadata = buildMetadata({
      title: post.seo_title || post.title,
      description: post.seo_description || post.excerpt || FALLBACK_DESCRIPTION,
      image: post.image_url || siteConfig.ogImage,
      keywords: keywords.length > 0 ? keywords : post.tags,
      canonical,
    });

    return {
      ...metadata,
      openGraph: {
        ...metadata.openGraph,
        type: "article",
        publishedTime: post.published_at ?? undefined,
        modifiedTime: post.updated_at,
      },
    };
  } catch (error) {
    console.error("Failed to generate blog metadata:", error);
    return fallback();
  }
}
