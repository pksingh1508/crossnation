"use client";

import { useRef } from "react";
import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Clock, Heart } from "lucide-react";
import { useTranslations } from "@/hooks/useTranslations";
import { WordReveal } from "@/components/ui/word-reveal";
import { RecentBlogList } from "@/components/sections/RecentBlogList";
import { ReadingProgress, ShareButtons } from "@/components/blogs/ArticleTools";
import { StructuredData } from "@/components/seo/StructuredData";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { siteConfig } from "@/constants/site";
import { fontInter, fontPoppins } from "@/fonts";
import { delay, RISE_ON_REVEAL } from "@/lib/animation";
import { cn } from "@/lib/utils";
import {
  generateArticleSchema,
  organizationSchema,
} from "@/lib/seo/structuredData";
import { getLocalizedPath, getLocalizedUrl } from "@/lib/locale-paths";
import type { BlogPost, BlogPostCard } from "@/lib/cms/types";

interface BlogArticleClientProps {
  post: BlogPost;
  latestPosts: BlogPostCard[];
  /** The publish date, formatted on the server so the browser renders the same text */
  publishedAt: string;
  readingMinutes: number;
}

/**
 * A blog post: its header and cover, then the text in a narrow column that's easy to
 * read, with its tags and ways to share it; the latest other posts follow. A yellow bar
 * at the top of the window shows how far the text has been read.
 */
export function BlogArticleClient({
  post,
  latestPosts,
  publishedAt,
  readingMinutes,
}: BlogArticleClientProps) {
  const t = useTranslations("blogsPage");
  const locale = useLocale();
  const bodyRef = useRef<HTMLDivElement>(null);
  const url = getLocalizedUrl(locale, `/blog/${post.slug}`);
  const morePosts = latestPosts.filter(({ id }) => id !== post.id).slice(0, 3);

  const articleSchema = generateArticleSchema(
    post.title,
    post.excerpt || post.title,
    post.published_at ?? post.created_at,
    post.updated_at,
    post.image_url ?? undefined,
    post.author_name ?? undefined
  );

  const structuredData = [organizationSchema, articleSchema];

  const breadcrumbItems = [
    { name: "Blog", href: getLocalizedPath(locale, "/blog") },
    {
      name: post.title,
      href: getLocalizedPath(locale, `/blog/${post.slug}`),
    },
  ];

  return (
    // fontPoppins.variable: the article's own headings use Poppins (see .cms-content)
    <div
      className={cn("bg-white", fontPoppins.className, fontPoppins.variable)}
    >
      <StructuredData data={structuredData} />
      <ReadingProgress target={bodyRef} />

      <div className="container mx-auto px-4 pt-6">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      <article>
        {/* The header and cover are on screen when the page opens, so shown from the start */}
        <header
          data-reveal="shown"
          className="mx-auto w-full max-w-3xl px-4 pt-10 sm:pt-14"
        >
          <p
            className={cn(
              "flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-neutral-500",
              fontInter.className,
              RISE_ON_REVEAL
            )}
          >
            {publishedAt && (
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays aria-hidden className="size-4" />
                <time dateTime={post.published_at ?? undefined}>
                  {publishedAt}
                </time>
              </span>
            )}
            <span className="inline-flex items-center gap-1.5">
              <Clock aria-hidden className="size-4" />
              {t("minRead", { minutes: readingMinutes })}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Heart aria-hidden className="size-4 fill-red-500 text-red-500" />
              <span className="sr-only">{t("totalLikes")}:</span>
              {post.likes_count.toLocaleString("en-US")}
            </span>
          </p>

          <h1 className="mt-5 text-[min(2.25rem,9vw)] leading-[1.1] font-semibold tracking-tight text-balance text-neutral-950 sm:text-5xl">
            <WordReveal
              text={post.title}
              delay={100}
              stagger={40}
              className="reveal-shown:animate-word motion-reduce:animate-none"
            />
          </h1>

          {post.excerpt && (
            <p
              className={cn(
                "mt-6 text-lg leading-relaxed text-neutral-600 sm:text-xl",
                fontInter.className,
                RISE_ON_REVEAL
              )}
              style={delay(400)}
            >
              {post.excerpt}
            </p>
          )}

          <div
            className={cn(
              "mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-neutral-200 py-4",
              RISE_ON_REVEAL
            )}
            style={delay(500)}
          >
            <p className="flex items-center gap-3 text-sm font-semibold text-neutral-950">
              <Image
                src="/EU-logo.jpeg"
                alt=""
                width={135}
                height={48}
                className="h-8 w-auto rounded-md"
              />
              {post.author_name ?? siteConfig.name}
            </p>
            <ShareButtons title={post.title} url={url} />
          </div>
        </header>

        {post.image_url && (
          <div
            data-reveal="shown"
            className="mx-auto mt-10 w-full max-w-5xl px-4 sm:mt-12"
          >
            {/* The frame wipes open while the picture settles from a slight zoom */}
            <div
              className="relative aspect-video overflow-hidden rounded-[2rem] bg-neutral-100 ring-1 ring-black/5 reveal-shown:animate-reveal motion-reduce:animate-none"
              style={delay(300)}
            >
              <Image
                src={post.image_url}
                alt={post.image_alt || post.title}
                fill
                preload
                sizes="(min-width: 1024px) 992px, 100vw"
                className="object-cover reveal-shown:animate-settle motion-reduce:animate-none"
                style={delay(300)}
              />
            </div>
          </div>
        )}

        <div
          ref={bodyRef}
          className="mx-auto w-full max-w-3xl px-4 pt-12 pb-20 sm:pt-16"
        >
          {/* The CMS cleaned this HTML against an allowlist when it was saved, so it is inserted as it is */}
          <div
            className={cn("cms-content", fontInter.className)}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {post.tags.length > 0 && (
            <ul
              aria-label={t("tags")}
              className={cn("mt-12 flex flex-wrap gap-2", fontInter.className)}
            >
              {post.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full bg-neutral-100 px-3 py-1.5 text-sm text-neutral-700"
                >
                  #{tag}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-neutral-200 pt-8">
            <Link
              href={getLocalizedPath(locale, "/blog")}
              className="group/back inline-flex items-center gap-2 rounded-sm font-semibold text-neutral-950 underline decoration-brand decoration-2 underline-offset-[6px] transition-[text-decoration-color] duration-300 outline-none hover:decoration-neutral-950 focus-visible:ring-2 focus-visible:ring-neutral-950"
            >
              <ArrowLeft
                aria-hidden
                className="size-4 transition-transform duration-300 ease-out-quint group-hover/back:-translate-x-1"
              />
              {t("backToBlog")}
            </Link>
            <ShareButtons title={post.title} url={url} />
          </div>
        </div>
      </article>

      {/* The latest other posts, with a link to the blog */}
      {morePosts.length > 0 && (
        <div className="border-t border-neutral-200">
          <RecentBlogList blogs={morePosts} />
        </div>
      )}
    </div>
  );
}
