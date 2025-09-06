import { NextRequest, NextResponse } from 'next/server';
import { getSingleBlogPost } from '@/lib/strapi';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'en';
    const slug = searchParams.get('slug');
    
    if (!slug) {
      return NextResponse.json(
        { error: 'Slug parameter is required' },
        { status: 400 }
      );
    }
    
    // Get the Strapi token from environment variables
    const token = process.env.STRAPI_ACCESS_TOKEN;
    
    if (!token) {
      console.error('STRAPI_ACCESS_TOKEN environment variable is not set');
      return NextResponse.json(
        { error: 'Strapi API token not configured' },
        { status: 500 }
      );
    }

    const blogPost = await getSingleBlogPost(
      token,
      slug,
      locale,
      'blogs' // collection name
    );

    if (!blogPost || !blogPost.data || blogPost.data.length === 0) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(blogPost.data[0]);
  } catch (error) {
    console.error('Error in single blog API route:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch blog post', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}
