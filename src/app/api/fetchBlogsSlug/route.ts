"use server";
import { fetchSlugs } from "@/lib/strapi";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get("locale") || "en";

    const token = process.env.STRAPI_ACCESS_TOKEN;
    if (!token) {
      return NextResponse.json(
        { error: "Strapi access token is not configured" },
        { status: 500 }
      );
    }

    const response = await fetchSlugs(token, "blogs", locale);

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch blog slugs" },
      { status: 500 }
    );
  }
}
