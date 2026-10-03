import type { Metadata } from "next";
import { siteConfig } from "@/constants/site";
import { getNewsArticle } from "@/lib/cms/queries";
import { canonicalSlug } from "@/lib/cms/slug";
import { generateMetadata as buildMetadata } from "@/lib/seo/metadata";
import { getLocalizedUrl } from "@/lib/locale-paths";

interface RouteParams {
  params: Promise<{ slug?: string; lang?: string }>;
}

const FALLBACK_TITLE = "Immigration News Article";
const FALLBACK_DESCRIPTION =
  "Stay updated with EU Career Serwis immigration news, policy changes, and recruitment developments across Europe.";

export async function generateMetadata({
  params,
}: RouteParams): Promise<Metadata> {
  const { slug = "" } = await params;
  const clean = canonicalSlug(slug);
  // Every language shows the same article, so the English address is the canonical one
  const canonical = getLocalizedUrl(
    siteConfig.defaultLanguage,
    `/immigration-news/${clean}`
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
    const news = await getNewsArticle(clean);
    if (!news) {
      return fallback();
    }

    const metadata = buildMetadata({
      title: news.seo_title || news.title,
      description: news.seo_description || news.excerpt || FALLBACK_DESCRIPTION,
      image: news.image_url || siteConfig.ogImage,
      keywords:
        news.tags.length > 0
          ? news.tags
          : ["immigration news", "EU Career Serwis"],
      canonical,
    });

    return {
      ...metadata,
      openGraph: {
        ...metadata.openGraph,
        type: "article",
        publishedTime: news.published_at ?? undefined,
        modifiedTime: news.updated_at,
      },
    };
  } catch (error) {
    console.error("Failed to generate news metadata:", error);
    return fallback();
  }
}
