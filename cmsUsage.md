# Using the CMS content on a website

This guide is for any website that shows the content managed in this CMS: blog posts, news, success stories,
testimonials, visa stamps and work permits. It covers how to connect, what each table holds, how to query it, and
how to render it and keep it fresh.

The examples use Next.js (App Router, 15.5 or newer) with TypeScript. [§5.4](#54-with-plain-http-any-language) shows
the plain HTTP API, which works from any language. Every query and example here was run against the live database
on 2026-10-03.

## Contents

1. [How it works](#1-how-it-works)
2. [What you need](#2-what-you-need)
3. [Rules](#3-rules)
4. [The tables](#4-the-tables)
5. [Reading the data](#5-reading-the-data)
6. [Showing the data](#6-showing-the-data)
7. [Keeping the website up to date](#7-keeping-the-website-up-to-date)
8. [Moving a website off the old Strapi API](#8-moving-a-website-off-the-old-strapi-api)
9. [Checklist](#9-checklist)
10. [Troubleshooting](#10-troubleshooting)

## 1. How it works

```text
CMS (admin app) ──saves──────────▶ Supabase: the eu_ tables  ◀──reads (publishable key)── your website
CMS (admin app) ──uploads────────▶ Cloudflare R2: https://media.eucareerserwis.pl  ◀──images── visitors
CMS (admin app) ──"content changed" (optional)──▶ your website: POST /api/revalidate
```

- **The website reads Supabase directly.** It never calls the CMS app, so the website keeps working when the CMS is
  offline.
- **Visitors only ever get published content.** Row Level Security in the database returns only items with the status
  `published` whose publish date has passed. Drafts, scheduled items and the admin list (`eu_admins`) stay hidden,
  whatever a query asks for.
- **A website can't change anything.** Every write is refused with `42501 permission denied`.
- **Images are plain URLs** on `https://media.eucareerserwis.pl`.
- **Any number of websites** can read the same content.

## 2. What you need

| Value | Where to find it | Secret? |
| --- | --- | --- |
| Project URL | `https://yjcepgcqaxmcsowruayi.supabase.co` | No |
| Publishable key | `sb_publishable_…`: Supabase dashboard → Project Settings → API Keys. It is the same key as `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` in this CMS's `.env.local`. | No. It is made for browser code; the database rules protect the data. |
| Media URL | `https://media.eucareerserwis.pl` | No |
| Refresh secret (optional, [§7](#7-keeping-the-website-up-to-date)) | A random string you create, e.g. with `openssl rand -base64 32` | **Yes** |

```bash
# .env.local of the website (add the same values in its hosting settings, e.g. Vercel)
CMS_SUPABASE_URL=https://yjcepgcqaxmcsowruayi.supabase.co
CMS_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
CMS_REVALIDATE_SECRET=...   # optional, see section 7
```

- **The `CMS_` prefix** keeps these apart from a Supabase project the website may already use for its own data.
- **Without `NEXT_PUBLIC_`,** Next.js keeps the values on the server, which is where every read in this guide happens.
  Use `NEXT_PUBLIC_` names only to query from the browser ([§5.3](#53-from-the-browser)).
- **Never give a website** the secret key (`sb_secret_…`), the legacy `service_role` key or the database password.
  They bypass the database rules: drafts would leak, and the website could change or delete content.

## 3. Rules

- **Read only, with the publishable key.**
- **Add `.eq("status", "published")` to every query.** The database applies it anyway. Writing it makes the intent
  visible, and the query uses the index.
- **Select only the columns you show.** `content` is large: leave it out of lists.
- **Sort by `published_at`, newest first,** unless a page needs another order.
- **Read on the server when you can** (Server Components, route handlers, build scripts). The content is then in the
  HTML that search engines read, and you can cache it.
- **Cache, but not forever.** Content changes whenever an editor saves ([§7](#7-keeping-the-website-up-to-date)).
- **Select columns by name.** New columns may be added at any time. A renamed or removed column would come with a CMS
  migration and an update to this guide.

## 4. The tables

| Content | Table | Page on eucareerserwis.pl | Own page (slug) |
| --- | --- | --- | --- |
| Blog posts | `eu_blog` | `/blog/<slug>` | yes |
| News | `eu_news` | `/immigration-news/<slug>` | yes |
| Success stories | `eu_success_stories` | `/success-stories` | no |
| Testimonials | `eu_testimonials` | `/testimonials` | no |
| Visa stamps | `eu_visa_stamps` | `/visa-stamp` | no |
| Work permits | `eu_work_permits` | `/work-permit` | no |

The CMS links to these paths (`websitePath` in [`src/config/collections.ts`](src/config/collections.ts)). Another
website can use any paths it likes.

### 4.1 Columns in every table

| Column | Type | Notes |
| --- | --- | --- |
| `id` | uuid (string) | Never changes. Use it as the React `key`. |
| `status` | `"draft"` or `"published"` | Visitors only ever get `published`. |
| `published_at` | timestamp (ISO string, UTC) | The date to show and sort by. Set when an item is first published; editors can change it. A future date schedules the item: it stays hidden until then. |
| `created_at`, `updated_at` | timestamp | `updated_at` changes on every save. Use it for `lastModified` in a sitemap. |
| `image_url` | text | Full URL on `https://media.eucareerserwis.pl`. Null when the item has no image (never for visa stamps and work permits). |
| `image_alt` | text, ≤ 200 | Can be null: fall back to the title or name. |
| `image_width`, `image_height` | integer (px) | Always set when `image_url` is. |
| `legacy_id` | text | The old Strapi id of imported items. Not needed on a website. |

### 4.2 Columns per table

**`eu_blog`**

| Column | Type | Notes |
| --- | --- | --- |
| `title` | text, 1–200 | |
| `slug` | text, ≤ 120 | Unique. Lower case `a-z`, `0-9` and single hyphens. |
| `excerpt` | text, ≤ 300 | Plain-text summary for cards and meta descriptions. |
| `content` | HTML | The article ([§6.2](#62-rich-text-html)). |
| `author_name` | text, ≤ 100 | Optional. |
| `tags` | text[] | 0–15 tags of up to 50 characters, with the capitals they were typed with. |
| `likes_count`, `comments_count` | integer ≥ 0 | Numbers typed in the CMS. No like or comment system is behind them. |
| `seo_title` (≤ 200), `seo_description` (≤ 320), `seo_keywords` (≤ 500, comma-separated) | text | Optional. Fall back to `title` and `excerpt`. |

**`eu_news`**: like `eu_blog`, but without `author_name`, `likes_count`, `comments_count` and `seo_keywords`. It adds:

| Column | Type | Notes |
| --- | --- | --- |
| `views_count` | integer ≥ 0 | A number typed in the CMS. |

**`eu_success_stories`**

| Column | Type | Notes |
| --- | --- | --- |
| `name` | text, 1–100 | e.g. "Rakesh - India". |
| `story` | text, ≤ 3,000 | Plain text; can contain line breaks. |
| `video_url` | text, ≤ 500 | Optional `http(s)` link, e.g. YouTube. |

**`eu_testimonials`**

| Column | Type | Notes |
| --- | --- | --- |
| `name` | text, 1–100 | |
| `quote` | text, ≤ 1,000 | Plain text; can contain line breaks. |
| `views_count` | integer ≥ 0 | A number typed in the CMS. |

**`eu_visa_stamps`** and **`eu_work_permits`**

| Column | Type | Notes |
| --- | --- | --- |
| `country` | text, ≤ 60 | Optional English country name, e.g. "Poland". |
| `caption` | text, ≤ 200 | Optional text to show with the image. |

### 4.3 What a published item always has

The CMS refuses to publish an item without these fields, so a website can rely on them:

| Table | Always filled when published |
| --- | --- |
| `eu_blog`, `eu_news` | `title`, `slug`, `excerpt`, `content` and the image (`image_url`, `image_width`, `image_height`) |
| `eu_success_stories` | `name`, `story` |
| `eu_testimonials` | `name`, `quote` |
| `eu_visa_stamps`, `eu_work_permits` | the image |

The generated types still mark most of them as nullable, so keep a fallback in code.

### 4.4 The content today

Published items on 2026-10-03 (the CMS home page shows the current numbers):

| Table | Published | Notes |
| --- | --- | --- |
| `eu_blog` | 35 | 3 posts have no tags. |
| `eu_news` | 7 | No SEO fields filled in yet. |
| `eu_success_stories` | 3 | No photos or videos yet. |
| `eu_testimonials` | 20 | No photos yet. |
| `eu_visa_stamps` | 9 | No country or caption yet. |
| `eu_work_permits` | 46 | Poland 31, Serbia 10, Slovakia 5. |

Plan for the empty cases: for example, an initials avatar when a testimonial has no photo, and no video player when
`video_url` is null.

### 4.5 TypeScript types

Copy [`src/lib/supabase/database.types.ts`](src/lib/supabase/database.types.ts) into the website, for example as
`src/lib/cms/database.types.ts`, or generate it:

```bash
npx supabase login   # once, with an account that has access to the project
npx supabase gen types typescript --project-id yjcepgcqaxmcsowruayi --schema public > src/lib/cms/database.types.ts
```

Copy or generate it again whenever the CMS adds a column. One type per row:

```ts
import type { Tables } from "./database.types"

export type BlogPost = Tables<"eu_blog">
export type NewsArticle = Tables<"eu_news">
export type SuccessStory = Tables<"eu_success_stories">
export type Testimonial = Tables<"eu_testimonials">
export type VisaStamp = Tables<"eu_visa_stamps">
export type WorkPermit = Tables<"eu_work_permits">
```

## 5. Reading the data

### 5.1 The client

```bash
pnpm add @supabase/supabase-js
pnpm add server-only   # optional in Next.js: a build error if this code is ever imported in the browser
```

```ts
// src/lib/cms/client.ts
import "server-only"
import { createClient } from "@supabase/supabase-js"
import type { Database } from "./database.types"

/** Tag on every CMS read, so new content can be shown at once (section 7). */
export const CMS_CACHE_TAG = "cms"

const url = process.env.CMS_SUPABASE_URL
const key = process.env.CMS_SUPABASE_PUBLISHABLE_KEY
if (!url || !key) throw new Error("Set CMS_SUPABASE_URL and CMS_SUPABASE_PUBLISHABLE_KEY")

export const cms = createClient<Database>(url, key, {
  // A visitor that never logs in
  auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  // Next.js only: keep each answer for 5 minutes and tag it. Remove this option in other frameworks.
  global: {
    fetch: (input, init) => fetch(input, { ...init, next: { revalidate: 300, tags: [CMS_CACHE_TAG] } }),
  },
})
```

Outside Next.js, remove the `global.fetch` option and the `server-only` import. supabase-js works the same in Node.js,
Bun, Deno, Cloudflare Workers and browsers.

### 5.2 Ready-made queries

Copy this file as it is, then use only the functions you need. Lists return
`{ items, page, pageSize, total, pageCount }`; single items return the row or `null`.

```ts
// src/lib/cms/queries.ts
import "server-only"
import type { PostgrestError } from "@supabase/supabase-js"
import { cache } from "react"
import { cms } from "./client"

// The database only ever returns published items whose publish date has passed. The status filter
// below makes that visible in the code and uses the index.

export type Page<T> = { items: T[]; page: number; pageSize: number; total: number; pageCount: number }

type ListResult<T> = { data: T[] | null; count: number | null; error: PostgrestError | null }

/** One page of a list. A page past the end comes back empty (Supabase answers it with 416 / PGRST103). */
async function paged<T>(
  page: number,
  pageSize: number,
  query: (from: number, to: number) => PromiseLike<ListResult<T>>,
): Promise<Page<T>> {
  const size = Math.min(Math.max(Math.trunc(pageSize) || 10, 1), 50)
  const current = Math.max(Math.trunc(page) || 1, 1)
  const from = (current - 1) * size
  const { data, count, error } = await query(from, from + size - 1)
  if (error && error.code !== "PGRST103") throw error
  const total = count ?? 0
  return { items: data ?? [], page: current, pageSize: size, total, pageCount: Math.ceil(total / size) }
}

/** Old links can have capitals, spaces or %20 (e.g. /immigration-news/Schengen-Visa); slugs are lower case. */
export function canonicalSlug(slug: string) {
  let value = slug
  try {
    value = decodeURIComponent(slug)
  } catch {
    // not URL-encoded: keep it as it is
  }
  return value.trim().toLowerCase()
}

// Blog

const BLOG_CARD =
  "id, title, slug, excerpt, image_url, image_alt, image_width, image_height, author_name, tags, likes_count, comments_count, published_at"

/** Newest first. getBlogPosts(1, 3) gives the three latest posts. */
export function getBlogPosts(page = 1, pageSize = 9) {
  return paged(page, pageSize, (from, to) =>
    cms
      .from("eu_blog")
      .select(BLOG_CARD, { count: "exact" })
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .range(from, to),
  )
}

/** Posts with one tag. Tags keep the capitals they were typed with, and the match is exact. */
export function getBlogPostsWithTag(tag: string, page = 1, pageSize = 9) {
  return paged(page, pageSize, (from, to) =>
    cms
      .from("eu_blog")
      .select(BLOG_CARD, { count: "exact" })
      .eq("status", "published")
      .contains("tags", [tag])
      .order("published_at", { ascending: false })
      .range(from, to),
  )
}

/** Search in titles and short descriptions, ignoring case. */
export function searchBlogPosts(text: string, page = 1, pageSize = 9) {
  const term = text.replace(/[%_*,()"\\]/g, " ").trim() // characters that mean something in a filter
  return paged(page, pageSize, (from, to) =>
    cms
      .from("eu_blog")
      .select(BLOG_CARD, { count: "exact" })
      .eq("status", "published")
      .or(`title.ilike."%${term}%",excerpt.ilike."%${term}%"`)
      .order("published_at", { ascending: false })
      .range(from, to),
  )
}

/** One post, or null (unknown slug, or not published). cache() lets generateMetadata and the page share it. */
export const getBlogPost = cache(async (slug: string) => {
  const { data, error } = await cms.from("eu_blog").select("*").eq("status", "published").eq("slug", slug).maybeSingle()
  if (error) throw error
  return data
})

// News

const NEWS_CARD =
  "id, title, slug, excerpt, image_url, image_alt, image_width, image_height, tags, views_count, published_at"

export function getNewsArticles(page = 1, pageSize = 9) {
  return paged(page, pageSize, (from, to) =>
    cms
      .from("eu_news")
      .select(NEWS_CARD, { count: "exact" })
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .range(from, to),
  )
}

export const getNewsArticle = cache(async (slug: string) => {
  const { data, error } = await cms.from("eu_news").select("*").eq("status", "published").eq("slug", slug).maybeSingle()
  if (error) throw error
  return data
})

// Success stories and testimonials (no pages of their own, so no slug)

export function getSuccessStories(page = 1, pageSize = 12) {
  return paged(page, pageSize, (from, to) =>
    cms
      .from("eu_success_stories")
      .select("id, name, story, image_url, image_alt, image_width, image_height, video_url, published_at", {
        count: "exact",
      })
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .range(from, to),
  )
}

export function getTestimonials(page = 1, pageSize = 12) {
  return paged(page, pageSize, (from, to) =>
    cms
      .from("eu_testimonials")
      .select("id, name, quote, image_url, image_alt, image_width, image_height, views_count, published_at", {
        count: "exact",
      })
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .range(from, to),
  )
}

// Image galleries

const GALLERY = "id, image_url, image_alt, image_width, image_height, country, caption, published_at"

/** Newest first, optionally for one country ("Poland", "Serbia", …). */
export function getWorkPermits(page = 1, pageSize = 20, country?: string) {
  return paged(page, pageSize, (from, to) => {
    let query = cms.from("eu_work_permits").select(GALLERY, { count: "exact" }).eq("status", "published")
    if (country) query = query.eq("country", country)
    return query.order("published_at", { ascending: false }).range(from, to)
  })
}

export function getVisaStamps(page = 1, pageSize = 20, country?: string) {
  return paged(page, pageSize, (from, to) => {
    let query = cms.from("eu_visa_stamps").select(GALLERY, { count: "exact" }).eq("status", "published")
    if (country) query = query.eq("country", country)
    return query.order("published_at", { ascending: false }).range(from, to)
  })
}

/** Countries with at least one published work permit, e.g. for filter buttons. */
export async function getWorkPermitCountries() {
  const { data, error } = await cms
    .from("eu_work_permits")
    .select("country")
    .eq("status", "published")
    .not("country", "is", null)
  if (error) throw error
  return [...new Set(data.map((row) => row.country ?? ""))].filter(Boolean).sort()
}

// Sitemap

/** Every published post and article, with the date it last changed. */
export async function getSitemapEntries() {
  const [blog, news] = await Promise.all([
    cms.from("eu_blog").select("slug, updated_at").eq("status", "published"),
    cms.from("eu_news").select("slug, updated_at").eq("status", "published"),
  ])
  if (blog.error) throw blog.error
  if (news.error) throw news.error
  return { blog: blog.data, news: news.data }
}
```

| Function | Returns |
| --- | --- |
| `getBlogPosts(page, pageSize)` | A page of posts, newest first. `getBlogPosts(1, 3)` gives the three latest. |
| `getBlogPostsWithTag(tag, page, pageSize)` | Posts with exactly that tag. |
| `searchBlogPosts(text, page, pageSize)` | Posts whose title or excerpt contains the text, ignoring case. |
| `getBlogPost(slug)` | One post with its `content`, or `null`. |
| `getNewsArticles(…)`, `getNewsArticle(slug)` | The same for news. |
| `getSuccessStories(…)`, `getTestimonials(…)` | Pages of stories and testimonials. |
| `getWorkPermits(page, pageSize, country?)`, `getVisaStamps(…)` | Gallery pages, optionally for one country. |
| `getWorkPermitCountries()` | `["Poland", "Serbia", "Slovakia"]` today. |
| `getSitemapEntries()` | `{ blog, news }`: every slug with its `updated_at`. |
| `canonicalSlug(slug)` | The lower-case slug for an old link ([§6.5](#65-old-links)). |

### 5.3 From the browser

The publishable key may be used in browser code, and Supabase accepts requests from any origin. Create the client
with `NEXT_PUBLIC_CMS_SUPABASE_URL` and `NEXT_PUBLIC_CMS_SUPABASE_PUBLISHABLE_KEY`, without `server-only` and the
`global.fetch` option.

Content loaded in the browser isn't in the HTML that search engines read, and the server doesn't cache it. Use it
only for extras such as "load more" buttons or filters. Alternatively, add a route handler to your own site that calls
the server-side functions above.

### 5.4 With plain HTTP (any language)

Supabase also serves the tables through its REST API (PostgREST). Send the publishable key in the `apikey` header:

```bash
curl 'https://yjcepgcqaxmcsowruayi.supabase.co/rest/v1/eu_blog?select=title,slug,excerpt,image_url,published_at&status=eq.published&order=published_at.desc&limit=9&offset=0' \
  -H 'apikey: sb_publishable_...' \
  -H 'Prefer: count=exact'
```

| To… | Use |
| --- | --- |
| choose columns | `select=title,slug,excerpt` |
| filter | `status=eq.published`, `slug=eq.my-post`, `country=eq.Poland` |
| match a tag | `tags=cs.{"Poland work permit"}`, URL-encoded: `tags=cs.%7B%22Poland%20work%20permit%22%7D` |
| search, ignoring case | `title=ilike.*poland*`, or in two columns: `or=(title.ilike.*poland*,excerpt.ilike.*poland*)` |
| sort | `order=published_at.desc` |
| page | `limit=9&offset=18` (page 3 of 9 per page) |
| get the total | Header `Prefer: count=exact`. The total follows the `/` in the response header `Content-Range: 0-8/35`, and the status is then `206`, which is a success. |
| get one object instead of an array | Header `Accept: application/vnd.pgrst.object+json`. The answer is `406` when no row matches. |

Responses are JSON arrays of rows with the columns from [§4](#4-the-tables).

### 5.5 Errors and edge cases

- **"Not found" is not an error.** An unknown slug, a draft and a scheduled item look the same: `maybeSingle()`
  returns `null`. Show the 404 page.
- **A page past the end:** Supabase answers `416` with the code `PGRST103`. `paged()` turns that into an empty page.
- **At most 1,000 rows come back per request.** Page through anything that could grow beyond that.
- **Network errors throw.** In Next.js the nearest `error.tsx` then shows. For a small section, such as "latest posts"
  on the home page, consider catching the error and hiding the section instead.

## 6. Showing the data

### 6.1 Images

Allow the media domain in `next.config.ts`:

```ts
const nextConfig: NextConfig = {
  images: { remotePatterns: [new URL("https://media.eucareerserwis.pl/**")] },
}
```

Before Next.js 15.3, write the pattern as `{ protocol: "https", hostname: "media.eucareerserwis.pl", pathname: "/**" }`.

```tsx
{post.image_url && (
  <Image
    src={post.image_url}
    alt={post.image_alt ?? post.title}
    width={post.image_width ?? 1600}
    height={post.image_height ?? 900}
    sizes="(max-width: 768px) 100vw, 768px"
  />
)}
```

- **Files never change.** A new upload gets a new URL, and the media domain sends
  `Cache-Control: public, max-age=31536000, immutable`.
- **Sizes and formats:** main images are at most 2,000 px wide, images inside articles 1,600 px. New uploads are
  WebP or JPEG (GIFs stay GIFs). Files from the old Strapi CMS (`/uploads/…`) can also be PNG.
- **Without `next/image`,** use `<img src={…} width={…} height={…} alt={…} loading="lazy">`. The width and height stop
  the layout from jumping while the image loads.
- **Social previews:** `image_url` is a full URL, so it can go straight into Open Graph tags.

### 6.2 Rich text (HTML)

`content` in `eu_blog` and `eu_news` is **HTML, not Markdown**. The CMS cleaned it against an allowlist when it was
saved ([`src/lib/sanitize.ts`](src/lib/sanitize.ts)), so you can insert it as it is:

```tsx
{/* biome-ignore lint/security/noDangerouslySetInnerHtml: the CMS cleaned this HTML when it was saved */}
<div className="cms-content" dangerouslySetInnerHTML={{ __html: post.content }} />
```

Linters flag `dangerouslySetInnerHTML` (Biome: `lint/security/noDangerouslySetInnerHtml`; ESLint: `react/no-danger`).
Here it is intended, so add an ignore comment with the reason, as above.

| It can contain | |
| --- | --- |
| Tags | `p`, `br`, `h2`, `h3`, `h4`, `strong`, `em`, `u`, `s`, `blockquote`, `ul`, `ol`, `li`, `hr`, `a`, `img` |
| Attributes | `a`: `href`, `target="_blank"`, `rel` · `img`: `src`, `alt`, `title`, `width`, `height` · `ol`: `start` |
| Never | `h1`, scripts, styles, classes, ids, iframes, tables, code blocks |

- **Headings start at `h2`,** because the page's `h1` is the title.
- **Links that open a new tab** already have `rel="noopener noreferrer nofollow"`.
- **Images inside articles** always come from the media domain. None of today's articles has one yet.
- **If anything other than the CMS writes to these tables,** clean the HTML again on the website, for example with
  `sanitize-html` and the same allowlist.
- **Don't use a Markdown renderer** (the old Strapi content was Markdown, and the CMS converted it to HTML), and don't
  put `white-space: pre-line` on HTML: it adds blank lines.

Style it with Tailwind's typography plugin (`className="prose"`, and `@plugin "@tailwindcss/typography";` in the CSS
with Tailwind 4) or with plain CSS, for example:

```css
.cms-content { line-height: 1.75; }
.cms-content > * + * { margin-top: 1.25em; }
.cms-content h2 { font-size: 1.5em; font-weight: 700; margin-top: 2em; }
.cms-content h3 { font-size: 1.25em; font-weight: 600; margin-top: 1.75em; }
.cms-content h4 { font-size: 1.1em; font-weight: 600; margin-top: 1.5em; }
.cms-content ul { list-style: disc; padding-left: 1.5em; }
.cms-content ol { list-style: decimal; padding-left: 1.5em; }
.cms-content li + li { margin-top: 0.4em; }
.cms-content a { color: #8a6400; text-decoration: underline; }
.cms-content blockquote { border-left: 4px solid #ffcc00; padding-left: 1em; font-style: italic; }
.cms-content hr { border: 0; border-top: 1px solid #e5e5e5; margin: 2.5em 0; }
.cms-content img { max-width: 100%; height: auto; border-radius: 12px; }
```

Today's articles use `h2`, `h3` and `h4` headings, lists, bold text, line breaks, dividers and a few links.

### 6.3 Plain text, tags, dates, numbers and videos

- **`excerpt`, `story`, `quote`, `caption`** are plain text. Render them as text (React escapes it), never as HTML.
  `story` and `quote` can contain line breaks: add `white-space: pre-line` (Tailwind: `whitespace-pre-line`).
- **`tags`** is an array of strings. A tag page can use `getBlogPostsWithTag(tag)`. The match is exact and
  case-sensitive.
- **Dates** are ISO strings in UTC. Show `published_at` in the website's time zone with `formatDate()` below.
- **`likes_count`, `comments_count`, `views_count`** are numbers typed in the CMS; show them with `toLocaleString()`.
  A website can't increase them, because writes are refused. Live counting would need a small database function
  (on the CMS backlog).
- **`video_url`** can be any http(s) link. For YouTube, embed `https://www.youtube-nocookie.com/embed/<id>` using
  `youTubeId()` below, and show other links as a normal link.

```ts
// src/lib/cms/format.ts
/** "31 May 2026" */
export function formatDate(iso: string | null) {
  if (!iso) return ""
  return new Intl.DateTimeFormat("en-GB", { dateStyle: "long", timeZone: "Europe/Warsaw" }).format(new Date(iso))
}

/** Minutes to read an HTML article, at about 220 words a minute. */
export function readingMinutes(html: string) {
  const words = html
    .replace(/<[^>]+>/g, " ")
    .split(/\s+/)
    .filter(Boolean).length
  return Math.max(1, Math.round(words / 220))
}

/** The video id of a YouTube link, or null for other links. */
export function youTubeId(url: string) {
  return url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{11})/)?.[1] ?? null
}
```

### 6.4 Example pages (Next.js)

`PageProps` is generated by Next.js 15.5 and newer. On older versions, type the props yourself, e.g.
`{ params: Promise<{ slug: string }> }`.

```tsx
// app/blog/page.tsx: the list, 9 posts per page (/blog?page=2 …)
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { formatDate } from "@/lib/cms/format"
import { getBlogPosts } from "@/lib/cms/queries"

export default async function BlogPage({ searchParams }: PageProps<"/blog">) {
  const { page } = await searchParams
  const { items, page: current, pageCount } = await getBlogPosts(Number(page) || 1, 9)
  if (current > 1 && items.length === 0) notFound()

  return (
    <main>
      <h1>Blog</h1>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((post) => (
          <li key={post.id}>
            <Link href={`/blog/${post.slug}`}>
              {post.image_url && (
                <Image
                  src={post.image_url}
                  alt={post.image_alt ?? post.title}
                  width={post.image_width ?? 1600}
                  height={post.image_height ?? 900}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              )}
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
              <time dateTime={post.published_at ?? undefined}>{formatDate(post.published_at)}</time>
            </Link>
          </li>
        ))}
      </ul>
      <nav aria-label="Pages">
        {current > 1 && <Link href={`/blog?page=${current - 1}`}>Newer posts</Link>}
        {current < pageCount && <Link href={`/blog?page=${current + 1}`}>Older posts</Link>}
      </nav>
    </main>
  )
}
```

```tsx
// app/blog/[slug]/page.tsx: one post, with its SEO data
import type { Metadata } from "next"
import Image from "next/image"
import { notFound, permanentRedirect } from "next/navigation"
import { formatDate, readingMinutes } from "@/lib/cms/format"
import { canonicalSlug, getBlogPost } from "@/lib/cms/queries"

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const post = await getBlogPost(canonicalSlug((await params).slug))
  if (!post) return {}
  return {
    title: post.seo_title ?? post.title,
    description: post.seo_description ?? post.excerpt ?? undefined,
    keywords: post.seo_keywords ?? undefined,
    alternates: { canonical: `/blog/${post.slug}` }, // needs metadataBase in the root layout
    openGraph: {
      type: "article",
      title: post.seo_title ?? post.title,
      publishedTime: post.published_at ?? undefined,
      images: post.image_url ? [{ url: post.image_url, alt: post.image_alt ?? post.title }] : undefined,
    },
  }
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params
  const clean = canonicalSlug(slug)
  if (clean !== slug) permanentRedirect(`/blog/${clean}`)

  const post = await getBlogPost(clean)
  if (!post) notFound()

  return (
    <article>
      <h1>{post.title}</h1>
      <p>
        <time dateTime={post.published_at ?? undefined}>{formatDate(post.published_at)}</time> ·{" "}
        {readingMinutes(post.content)} min read · {post.likes_count} likes
      </p>
      {post.image_url && (
        <Image
          src={post.image_url}
          alt={post.image_alt ?? post.title}
          width={post.image_width ?? 1600}
          height={post.image_height ?? 900}
          sizes="(max-width: 768px) 100vw, 768px"
          loading="eager"
        />
      )}
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: the CMS cleaned this HTML when it was saved */}
      <div className="cms-content" dangerouslySetInnerHTML={{ __html: post.content }} />
      {post.tags.length > 0 && (
        <ul>
          {post.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      )}
    </article>
  )
}
```

- **News** works the same way, with `getNewsArticles` and `getNewsArticle` on `/immigration-news`.
- **Testimonials, success stories and the two galleries** are list pages without a page per item.
- **Rendering:** with the client from [§5.1](#51-the-client), pages read from Next.js's data cache, so they are fast
  even when rendered on every request. To render each post once and keep the result, add
  `export async function generateStaticParams() { return [] }` and `export const revalidate = 300` to
  `[slug]/page.tsx`. This doesn't apply with Cache Components ([§7.3](#73-with-cache-components)).
- **In Next.js 16, `priority` on `next/image` is deprecated.** Use `loading="eager"` for the main image, as above.

### 6.5 Old links

Three addresses changed when the content moved out of Strapi, because slugs are now lower case and have no spaces:

| Old | New |
| --- | --- |
| `/immigration-news/Schengen-Visa` | `/immigration-news/schengen-visa` |
| `/blog/%20gulf-to-europe-migration-2026-work-permit-uae-saudi-qatar` | `/blog/gulf-to-europe-migration-2026-work-permit-uae-saudi-qatar` |
| `/blog/%20fastest-work-permit-poland-europe-2026-eu-career-serwis` | `/blog/fastest-work-permit-poland-europe-2026-eu-career-serwis` |

The post page above handles them: `canonicalSlug()` decodes, trims and lower-cases the slug, and `permanentRedirect()`
sends a 308 redirect to the new address. Do the same on the news page.

### 6.6 Sitemap

```ts
// app/sitemap.ts
import type { MetadataRoute } from "next"
import { getSitemapEntries } from "@/lib/cms/queries"

const SITE = "https://www.example.com"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { blog, news } = await getSitemapEntries()
  return [
    { url: SITE, lastModified: new Date() },
    ...blog.map((post) => ({ url: `${SITE}/blog/${post.slug}`, lastModified: post.updated_at })),
    ...news.map((item) => ({ url: `${SITE}/immigration-news/${item.slug}`, lastModified: item.updated_at })),
  ]
}
```

## 7. Keeping the website up to date

Editors expect a change to show soon after they save. Choose one:

| Setup | New content shows |
| --- | --- |
| **A. Time-based:** the client in [§5.1](#51-the-client) keeps each answer for 5 minutes. | within 5 minutes |
| **B. A, plus a refresh call from the CMS (recommended):** [§7.1](#71-the-refresh-call-from-the-cms). | within seconds; A is the safety net |
| **C. Other frameworks:** cache in the framework's own way, or query on every request (fine for small sites). | depends on the setup |

### 7.1 The refresh call from the CMS

After a change to published content, the CMS sends this request ([`src/lib/website.ts`](src/lib/website.ts)):

```http
POST <WEBSITE_REVALIDATE_URL>
Authorization: Bearer <WEBSITE_REVALIDATE_SECRET>
Content-Type: application/json

{ "collection": "blog", "slug": "fastest-work-permit-poland-europe-2026-eu-career-serwis" }
```

- **`collection`** is `blog`, `news`, `success-stories`, `testimonials`, `visa-stamps` or `work-permits`. **`slug`** is
  `null` for the types without one.
- **When it is sent:** after saving an item that is or was published, after publishing or unpublishing from a list,
  and after deleting a published item.
- **It is not sent** when a scheduled item's date arrives. The time-based refresh shows the item within 5 minutes of
  that moment.
- **One attempt** with a 5-second timeout and no retry. Failures only appear in the CMS logs.
- **The CMS calls one URL.** If several websites use the content, the others rely on the time-based refresh, unless
  `pingWebsite()` is changed to call a list of URLs.

The website's side (Next.js 16):

```ts
// app/api/revalidate/route.ts
import { revalidateTag } from "next/cache"
import { CMS_CACHE_TAG } from "@/lib/cms/client"

/** Called by the CMS after published content changes: { "collection": "blog", "slug": "…" }. */
export async function POST(request: Request) {
  const secret = process.env.CMS_REVALIDATE_SECRET
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return Response.json({ revalidated: false }, { status: 401 })
  }
  // Content changes are rare, so refresh all CMS data rather than working out which pages show the item
  revalidateTag(CMS_CACHE_TAG, { expire: 0 })
  return Response.json({ revalidated: true })
}
```

- **In Next.js 14 and 15,** write `revalidateTag(CMS_CACHE_TAG)`, with one argument.
- **If the website has a middleware or proxy** (for example for languages), make sure it leaves `/api/revalidate`
  alone.

### 7.2 Turning the refresh call on

1. Put the secret in the website's environment as `CMS_REVALIDATE_SECRET`, and deploy the website.
2. In the CMS's environment (its `.env.local` and its hosting settings), set the following, then redeploy the CMS:

   ```bash
   WEBSITE_REVALIDATE_URL=https://www.example.com/api/revalidate
   WEBSITE_REVALIDATE_SECRET=<the same value as CMS_REVALIDATE_SECRET on the website>
   ```

3. Test it:

   ```bash
   curl -i -X POST https://www.example.com/api/revalidate \
     -H "Authorization: Bearer <secret>" -H "Content-Type: application/json" \
     -d '{"collection":"blog","slug":null}'
   # 200 {"revalidated":true}. Without the Authorization header: 401.
   ```

### 7.3 With Cache Components

If the website sets `cacheComponents: true` in `next.config.ts`, remove the `global.fetch` option from the client
and cache each query function instead:

```ts
import { cacheLife, cacheTag } from "next/cache"

export async function getBlogPosts(page = 1, pageSize = 9) {
  "use cache"
  cacheTag(CMS_CACHE_TAG)
  cacheLife("minutes") // refreshed in the background about once a minute, at most an hour old
  return paged(page, pageSize, (from, to) => /* the same query as in section 5.2 */)
}
```

The route in [§7.1](#71-the-refresh-call-from-the-cms) stays the same. With Cache Components, `generateStaticParams`
must return at least one entry.

## 8. Moving a website off the old Strapi API

The websites used to read this content from Strapi at `https://api.eucareerserwis.pl`, which no longer exists. Where
each Strapi field went:

| Strapi (`/api/…`) | Table | Fields |
| --- | --- | --- |
| `blogs` | `eu_blog` | `title`, `slug`, `author_name`, `likes_count`, `comments_count`: same names · `short_desc` → `excerpt` · `contents` (Markdown) → `content` (HTML) · `blog_image.url` → `image_url` (plus `image_alt`, `image_width`, `image_height`) · `tags` ("a, b") → `tags` (array) · `meta_title`, `meta_description`, `meta_keyword` → `seo_title`, `seo_description`, `seo_keywords` · `category` (always "blog") → removed |
| `khabars` | `eu_news` | `title`, `slug` · `short_desc` → `excerpt` · `contents` (plain text) → `content` (HTML paragraphs) · `news_image.url` → `image_url` (plus alt, width, height) · `views` → `views_count` · `tags` → `tags` (array) · `category` (always "news") → removed |
| `success-stories` | `eu_success_stories` | `name`, `story` · `success_image` (never used) → `image_url` · new: `video_url` |
| `testimonials` | `eu_testimonials` | `name` · `what_they_say` → `quote` · `view_count` → `views_count` · `user_image` (never used) → `image_url` · `slug` and `role` (never used) → removed |
| `visa-stamps` | `eu_visa_stamps` | `stamp_image.url` → `image_url` (plus alt, width, height) · new: `country`, `caption` |
| `work-permits` | `eu_work_permits` | `permit_image.url` → `image_url` (plus alt, width, height) · new: `country`, `caption` |

Also:

- **Rows are flat.** There is no `data[].attributes` and no `populate`; choose the columns with `select`.
- **`id` is a uuid string,** not a number.
- **Show and sort by `published_at`** (Strapi code often used `updatedAt`). For imported items, it is the date the
  item was first created in Strapi.
- **There are no locales.** All content is in English and there is no `locale` column, so every language version of a
  site shows the same items.
- **Image URLs are complete.** Don't put the old CMS address in front of them.
- **Paging:** `.range(from, to)` with `{ count: "exact" }` replaces `pagination[page]` and `pagination[pageSize]`; the
  total is `count`.
- **Three old links changed** ([§6.5](#65-old-links)).
- **Remove** the Strapi client code, `STRAPI_ACCESS_TOKEN`, `NEXT_PUBLIC_CMS_URL`, the image patterns for
  `api.eucareerserwis.pl` and `*.strapiapp.com`, and Markdown packages (`react-markdown`, `remark-*`, `rehype-*`,
  `highlight.js`) if nothing else uses them.

## 9. Checklist

- [ ] `CMS_SUPABASE_URL` and `CMS_SUPABASE_PUBLISHABLE_KEY` are set locally and on the host (production and preview).
- [ ] The website project contains no secret key, `service_role` key or database password.
- [ ] `media.eucareerserwis.pl` is allowed for images.
- [ ] The lists show the same numbers as the CMS home page ([§4.4](#44-the-content-today)).
- [ ] An article shows its headings and lists formatted, its cover image and its SEO title.
- [ ] The article text is in the page source (rendered on the server).
- [ ] An unknown slug shows the 404 page, not an error.
- [ ] `/immigration-news/Schengen-Visa` redirects to `/immigration-news/schengen-visa`.
- [ ] A test draft published in the CMS shows on the website (within seconds with [§7.1](#71-the-refresh-call-from-the-cms),
      otherwise within 5 minutes), and disappears again when unpublished.

## 10. Troubleshooting

| Problem | Cause and fix |
| --- | --- |
| `401`, "No API key found in request" | The key is missing. Check the environment variable names, and restart the dev server after changing `.env.local`. |
| `401` or `403` with the code `42501`, "permission denied" | A write, or a table visitors can't read (`eu_admins`). Websites can only read the six content tables. |
| An item is in the CMS but not on the website | It is a draft, its publish date is in the future, or the cache hasn't refreshed yet ([§7](#7-keeping-the-website-up-to-date)). |
| `406` with the code `PGRST116` | `.single()` found no row. Use `.maybeSingle()` and show the 404 page. |
| `416` with the code `PGRST103` | A page past the end. `paged()` handles it. |
| "hostname … is not configured under images" | Add the media domain to `remotePatterns` ([§6.1](#61-images)). |
| An article shows `<p>` and `<h2>` as text | The HTML is rendered as text. Use `dangerouslySetInnerHTML` ([§6.2](#62-rich-text-html)). |
| Extra blank lines, or stray `#` and `*` in articles | A Markdown renderer or `white-space: pre-line` is applied to the HTML. Remove it. |
| Old content after an edit | Caching. Wait 5 minutes or set up [§7.1](#71-the-refresh-call-from-the-cms). In development, delete `.next/cache` or call the refresh route. |
