"use server";
import { NextRequest, NextResponse } from "next/server";
import { fetchRecentTestimonials } from "@/lib/strapi";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get("locale") || "en";
    const pageSize = parseInt(searchParams.get("pageSize") || "3");

    // Get the Strapi token from environment variables
    const token = process.env.STRAPI_ACCESS_TOKEN;

    if (!token) {
      return NextResponse.json(
        { error: "Strapi API token not configured" },
        { status: 500 }
      );
    }

    const testimonials = await fetchRecentTestimonials(
      token,
      pageSize,
      locale,
      "testimonials" // collection name
    );

    return NextResponse.json(testimonials);
  } catch (error) {
    console.error("Error in testimonials API route:", error);
    return NextResponse.json(
      { error: "Failed to fetch testimonials" },
      { status: 500 }
    );
  }
}
