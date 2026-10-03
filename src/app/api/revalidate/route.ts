import { revalidateTag } from "next/cache";
import { CMS_CACHE_TAG } from "@/lib/cms/client";

/**
 * Called by the CMS after published content changes: { "collection": "blog", "slug": "…" }.
 * Without this call, new content still shows within 5 minutes (see src/lib/cms/client.ts).
 */
export async function POST(request: Request) {
  const secret = process.env.CMS_REVALIDATE_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return Response.json({ revalidated: false }, { status: 401 });
  }
  // Content changes are rare, so refresh all CMS data rather than working out which pages show the item
  revalidateTag(CMS_CACHE_TAG, { expire: 0 });
  return Response.json({ revalidated: true });
}
