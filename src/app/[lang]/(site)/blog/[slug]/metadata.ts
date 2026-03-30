import type { Metadata } from "next";
import { siteConfig } from "@/constants/site";
import { getSingleBlogPost } from "@/lib/strapi";
import { generateMetadata as buildMetadata } from "@/lib/seo/metadata";

interface RouteParams {
  params: Promise<{ slug?: string; lang?: string }>;
}

const FALLBACK_DESCRIPTION =
  "Read immigration insights, legal updates, and recruitment tips from EU Career Serwis.";

function normalizeText(content?: string, fallback: string = FALLBACK_DESCRIPTION) {
  if (!content) {
    return fallback;
  }
  const stripped = content
    .replace(/<[^>]+>/g, "")
    .replace(/[`*_>#]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return stripped.length > 40 ? stripped : fallback;
}

function extractMediaUrl(media: unknown): string | undefined {
  if (!media) {
    return undefined;
  }

  if (typeof media === "string") {
    return media;
  }

  if (typeof media === "object") {
    const withUrl = media as { url?: string };
    if (typeof withUrl.url === "string") {
      return withUrl.url;
    }

    const withData = media as {
      data?: { attributes?: { url?: string } };
    };
    if (typeof withData.data?.attributes?.url === "string") {
      return withData.data.attributes.url;
    }
  }

  return undefined;
}

export async function generateMetadata({
  params,
}: RouteParams): Promise<Metadata> {
  const resolvedParams = await params;
  const { slug = "" } = resolvedParams || {};
  const canonical = `${siteConfig.url}/${siteConfig.defaultLanguage}/blog/${slug}`;

  const token = process.env.STRAPI_ACCESS_TOKEN;
  if (!slug || !token) {
    return buildMetadata({
      title: "Immigration Blog Article",
      description: FALLBACK_DESCRIPTION,
      canonical,
    });
  }

  try {
    const response = await getSingleBlogPost(
      token,
      slug,
      siteConfig.defaultLanguage,
      "blogs"
    );
    const entry = response?.data?.[0];
    const attributes = entry?.attributes ?? entry;

    const title = attributes?.title || "Immigration Blog Article";
    const description = normalizeText(
      attributes?.short_desc || attributes?.contents,
      FALLBACK_DESCRIPTION
    );
    const ogImage =
      extractMediaUrl(attributes?.blog_image) || siteConfig.ogImage;

    const keywords = [
      attributes?.category,
      "immigration blog",
      "EU Career Serwis",
    ].filter(Boolean) as string[];

    return buildMetadata({
      title,
      description,
      image: ogImage,
      keywords,
      canonical,
    });
  } catch (error) {
    console.error("Failed to generate blog metadata:", error);
    return buildMetadata({
      title: "Immigration Blog Article",
      description: FALLBACK_DESCRIPTION,
      canonical,
    });
  }
}
