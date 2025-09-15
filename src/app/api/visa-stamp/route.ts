import { NextRequest, NextResponse } from "next/server";
import { getAllStampImages } from "@/lib/strapi";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "20");
    // Get the Strapi token from environment variables
    const token = process.env.STRAPI_ACCESS_TOKEN;

    if (!token) {
      console.error("STRAPI_ACCESS_TOKEN environment variable is not set");
      return NextResponse.json(
        { error: "Strapi API token not configured" },
        { status: 500 }
      );
    }

    const allStampImages = await getAllStampImages(
      token,
      page,
      pageSize,
      "visa-stamps" // collection name
    );

    if (!allStampImages || !allStampImages.data) {
      return NextResponse.json(
        { error: "Stamp images not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(allStampImages);
  } catch (error) {
    console.error("Error in visa stamp API route:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch stamp images",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
