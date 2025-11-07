# SEO issues

1. **HTML `lang` attribute stuck on English**
   - **Where**: `src/app/layout.tsx:72` hardcodes `<html lang={siteConfig.defaultLanguage}>`.
   - **Impact**: Every localized route (`/pl`, `/es`, etc.) ships HTML tagged as English, so Google cannot associate the page with the intended language; this weakens hreflang signals and contributes to the "Duplicate without user-selected canonical" warning in Search Console.
   - **Action**: Read the locale from the `[lang]` segment (via `params`/context) and pass it down to `<html lang>`.

2. **Root `<head>` overrides Next metadata and references a missing favicon**
   - **Where**: `src/app/layout.tsx:13-33` defines metadata, but lines `74-80` inject a manual `<title>`, `<meta>` and `<link rel="icon" href="./favicon.ico">`.
   - **Impact**: Next.js now renders two `<title>` tags, so child page metadata cannot replace the root title reliably. The favicon URL 404s because `public/favicon.ico` is absent, hurting brand cues in the SERP snippet.
   - **Action**: Rely on the Next metadata API only (remove the manual `<title>`/`<meta>` tags), and either add `public/favicon.ico` or point the icon link at an existing asset such as `/logoImage.jpeg`.

3. **Structured data uses nonexistent media, so Google falls back to the bare domain name**
   - **Where**: `src/lib/seo/structuredData.ts:7-36` and `103-121` output `logo: ${siteConfig.url}/logo.png` for the Organization/WebSite schemas, while `src/lib/seo/metadata.ts:82` defaults every open-graph image to `/og-image.jpg`.
   - **Impact**: Neither `logo.png` nor `og-image.jpg` exists in `public/`, so Google sees invalid structured data for the site logo and preview image. That explains the first screenshot where the result header shows `eucareerserwis.pl` instead of "EU Career Serwis".
   - **Action**: Add the referenced files or update the schema/OG helpers to point at the real assets (for example `/logoImage.jpeg`).

4. **Localized metadata strings contain mojibake**
   - **Where**: `src/constants/site.ts:28-41` stores strings like `"EspaA?ol"` and `"Principal ConsultorA-a..."` because of encoding issues.
   - **Impact**: All non-English meta descriptions assembled through `siteConfig.localizedDescriptions` render with corrupted characters, which looks spammy and reduces click-through rate.
   - **Action**: Re-enter those translations as UTF-8 (`"Espanol"`, `"Consultoria..."`, etc.).

5. **Metadata helpers never append the brand or honor `noIndex`, and some pages still say "CountryNation"**
   - **Where**: `src/lib/seo/metadata.ts:13-34` and `70-145` ignore `noIndex` and keep `fullTitle = title`. Pages such as `src/app/[lang]/book/page.tsx:6-9`, `recruiter/page.tsx:10-14`, `jobseeker/page.tsx:9-13`, `contact/page.tsx:6-9`, `refund-policy/page.tsx:5-8`, `antiFraud-policy/page.tsx:5-8` still use the legacy "CountryNation" name.
   - **Impact**: The SERP title never includes the brand unless every call site does it manually, and you cannot mark thin/duplicate locales as `noindex`. The mixed naming is another reason Google keeps defaulting to the bare domain in the sitelinks (screenshot #1).
   - **Action**: Update `generateMetadata`/`generateLocalizedMetadata` to append `| EU Career Serwis` and wire `noIndex` into the `robots` block, then fix the hard-coded page strings.

6. **Multiple `[lang]` routes ship without any metadata/canonical/hreflang**
   - **Where**: `src/app/[lang]/success-stories/page.tsx:1-5`, `work-permit/page.tsx:1-5`, `visa-stamp/page.tsx:1-5`, `company-certificate/page.tsx:1-126`, and `src/app/[lang]/(privacy)/terms-conditions/page.tsx:1-5` export only components.
   - **Impact**: These pages inherit the root canonical (`https://eucareerserwis.pl`), so Google sees many different URLs claiming to be the homepage, which matches the "Duplicate without user-selected canonical (177 pages)" error in Search Console.
   - **Action**: Give every route a `generateMetadata` call (ideally via `generateLocalizedMetadata`) so each locale exposes its own canonical plus hreflang alternates.

7. **Blog and news article pages are pure client-side shells**
   - **Where**: `src/app/[lang]/blog/[slug]/page.tsx:1-5` and `immigration-news/[slug]/page.tsx:1-5` declare `"use client"` and call `useEffect` to load content, while lines `155-184` / `151-180` return only a spinner when `loading` is true.
   - **Impact**: The server response contains almost no article text or metadata, so Googlebot receives an empty shell and flags the URLs as "Soft 404" / "Discovered - currently not indexed" (screenshot #2).
   - **Action**: Move the fetches to the server (for example in `generateMetadata`/`Page` via `fetch`) so the article body and metadata are rendered on the initial HTML, and add per-article metadata/canonicals.

8. **Work-permit and visa-stamp galleries also render only a spinner server-side**
   - **Where**: `src/app/[lang]/work-permit/page.tsx:1-5` renders `<AllPermitImage />`, whose implementation in `src/components/work_permit/AllPermitImage.tsx:1-5` and `260-284` returns only a loader until the client fetch completes. The same pattern exists for visa stamps (`src/app/[lang]/visa-stamp/page.tsx:1-5` + `src/components/visaStamp/AllVisaStampImage.tsx:1-5` and `273-297`).
   - **Impact**: Google crawlers see another empty page, which aligns with the "Soft 404" and "Not found" buckets in Search Console.
   - **Action**: Fetch these Strapi collections on the server (or pre-render static data) so there is meaningful HTML before hydration, and add metadata for both pages.

9. **Breadcrumb structured data points at the wrong domain**
   - **Where**: `src/components/seo/Breadcrumbs.tsx:25-31` builds each breadcrumb URL with `process.env.NEXT_PUBLIC_SITE_URL || "https://eucareerserwis.com"`.
   - **Impact**: Unless the env var is set everywhere, the structured data claims the content lives on `.com` while canonicals point to `.pl`, creating another duplicate/ambiguous signal for Google.
   - **Action**: Source the base URL from `siteConfig.url` so breadcrumbs always match the canonical domain.

10. **Blog sitemap is English-only and the slug fetcher drops localized slugs**
    - **Where**: `src/app/sitemap-blogs/route.ts:37-75` hardcodes `/en/...` URLs only, and `src/lib/strapi.ts:429-444` maps `item.slug`, which is `undefined` for regular Strapi responses (`attributes.slug`), so many entries never make it into the sitemap.
    - **Impact**: Non-English blog/news pages never appear in any sitemap and English entries can point at deleted slugs, which explains the "Not found (404)" and "Discovered - currently not indexed" rows in Search Console.
    - **Action**: Emit URLs for every `siteConfig.supportedLanguages` value and read slugs from `item.attributes?.slug` so the sitemap stays aligned with Strapi.
