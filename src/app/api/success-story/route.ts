import { NextRequest, NextResponse } from "next/server";
import { getAllSuccessStories } from "@/lib/strapi";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get("locale") || "en";
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "10");

    // Get the Strapi token from environment variables
    const token = process.env.STRAPI_ACCESS_TOKEN;

    if (!token) {
      console.error("STRAPI_ACCESS_TOKEN environment variable is not set");
      return NextResponse.json(
        { error: "Strapi API token not configured" },
        { status: 500 }
      );
    }

    const allSuccessStory = await getAllSuccessStories(
      token,
      page,
      pageSize,
      locale,
      "success-stories" // collection name
    );

    if (!allSuccessStory || !allSuccessStory.data) {
      return NextResponse.json(
        { error: "Success stories not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(allSuccessStory);
  } catch (error) {
    console.error("Error in success story API route:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch success stories",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
