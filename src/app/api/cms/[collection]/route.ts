import { NextRequest, NextResponse } from "next/server";
import {
  getBlogPosts,
  getNewsArticles,
  getSuccessStories,
  getTestimonials,
  getVisaStamps,
  getWorkPermits,
} from "@/lib/cms/queries";

// Further pages of the CMS lists, for pagination and "load more" in the browser. The first
// page of each list is rendered on the server; the queries cache every answer.
const lists = new Map<
  string,
  (page: number, pageSize?: number) => Promise<unknown>
>([
  ["blog", getBlogPosts],
  ["news", getNewsArticles],
  ["success-stories", getSuccessStories],
  ["testimonials", getTestimonials],
  ["work-permits", getWorkPermits],
  ["visa-stamps", getVisaStamps],
]);

/** GET /api/cms/blog?page=2&pageSize=10 → { items, page, pageSize, total, pageCount } */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ collection: string }> }
) {
  const { collection } = await params;
  const list = lists.get(collection);
  if (!list) {
    return NextResponse.json({ error: "Unknown collection" }, { status: 404 });
  }

  const { searchParams } = request.nextUrl;
  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || undefined;

  try {
    return NextResponse.json(await list(page, pageSize));
  } catch (error) {
    console.error(`Failed to load CMS ${collection}:`, error);
    return NextResponse.json(
      { error: "Failed to load content" },
      { status: 500 }
    );
  }
}
