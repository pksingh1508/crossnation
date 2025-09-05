import { NextRequest, NextResponse } from 'next/server';
import { getSingleNews } from '@/lib/strapi';

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

    const newsArticle = await getSingleNews(
      token,
      slug,
      locale,
      'khabars' // collection name
    );

    if (!newsArticle || !newsArticle.data || newsArticle.data.length === 0) {
      return NextResponse.json(
        { error: 'News article not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(newsArticle.data[0]);
  } catch (error) {
    console.error('Error in single news API route:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch news article', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}
