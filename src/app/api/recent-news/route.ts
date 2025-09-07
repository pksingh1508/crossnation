"use server";
import { fetchRecentNews } from "@/lib/strapi";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get("locale") || "en";
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "10");

    const token = process.env.STRAPI_ACCESS_TOKEN;
    if (!token) {
      return NextResponse.json(
        { error: "Strapi access token is not configured" },
        { status: 500 }
      );
    }

    const collection = "khabars";
    const response = await fetchRecentNews(
      token,
      page,
      pageSize,
      locale,
      collection
    );

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching immigration news:", error);
    return NextResponse.json(
      { error: "Failed to fetch immigration news" },
      { status: 500 }
    );
  }
}
