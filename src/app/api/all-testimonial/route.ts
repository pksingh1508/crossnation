import { NextRequest, NextResponse } from 'next/server';
import { getAllTestimonials } from '@/lib/strapi';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'en';
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '10');
    
    // Get the Strapi token from environment variables
    const token = process.env.STRAPI_ACCESS_TOKEN;
    
    if (!token) {
      console.error('STRAPI_ACCESS_TOKEN environment variable is not set');
      return NextResponse.json(
        { error: 'Strapi API token not configured' },
        { status: 500 }
      );
    }

    const testimonials = await getAllTestimonials(
      token,
      page,
      pageSize,
      locale,
      'testimonials' // collection name
    );

    return NextResponse.json(testimonials);
  } catch (error) {
    console.error('Error in all testimonials API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch testimonials', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
