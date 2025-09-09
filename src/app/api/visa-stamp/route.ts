import { NextRequest, NextResponse } from "next/server";
import { getAllStampImages } from "@/lib/strapi";

export async function GET(request: NextRequest) {
  try {
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
      "visa-stamps" // collection name
    );

    if (
      !allStampImages ||
      !allStampImages.data
    ) {
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
