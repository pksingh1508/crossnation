import { NextRequest, NextResponse } from "next/server";
import { getAllPermitImages } from "@/lib/strapi";

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

    const allPermitImages = await getAllPermitImages(
      token,
      page,
      pageSize,
      "work-permits" // collection name
    );

    if (!allPermitImages || !allPermitImages.data) {
      return NextResponse.json(
        { error: "Permit images not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(allPermitImages);
  } catch (error) {
    console.error("Error in work permit API route:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch permit images",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
