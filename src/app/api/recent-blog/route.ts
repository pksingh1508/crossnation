"use server";
import { fetchRecentBlogs } from "@/lib/strapi";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const pageSize = parseInt(searchParams.get("pageSize") || "3");
    const locale = searchParams.get("locale") || "en";

    const token = process.env.STRAPI_ACCESS_TOKEN;
    if (!token) {
      return NextResponse.json(
        { error: "Strapi access token is not configured" },
        { status: 500 }
      );
    }

    const response = await fetchRecentBlogs(token, pageSize, locale, "blogs");

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching recent blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch recent blogs" },
      { status: 500 }
    );
  }
}
