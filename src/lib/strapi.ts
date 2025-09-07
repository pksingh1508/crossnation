import axios from "axios";

export interface NewsItem {
  id: number;
  attributes?: {
    title: string;
    publishedAt?: string;
    updatedAt?: string;
    views: number;
    slug: string;
    short_desc?: string;
    contents?: string;
    tags?: string;
    category?: string;
    news_image?: {
      data?: {
        attributes?: {
          url: string;
        };
      };
    };
  };
  // Alternative structure in case Strapi returns flat data
  title?: string;
  publishedAt?: string;
  updatedAt?: string;
  views?: number;
  slug?: string;
  short_desc?: string;
  contents?: string;
  tags?: string;
  category?: string;
  news_image?: {
    url: string;
  };
}

export interface BlogItem {
  id: number;
  attributes?: {
    title: string;
    updatedAt: string;
    likes_count: number;
    slug: string;
    short_desc?: string;
    contents?: string;
    comments_count?: number;
    tags?: string;
    category?: string;
    blog_image?: {
      data?: {
        attributes?: {
          url: string;
        };
      };
    };
  };
  // Alternative structure in case Strapi returns flat data
  title?: string;
  updatedAt?: string;
  likes_count?: number;
  slug?: string;
  short_desc?: string;
  contents?: string;
  comments_count?: number;
  tags?: string;
  category?: string;
  blog_image?: {
    url: string;
  };
}

export interface TestimonialItem {
  id: number;
  attributes?: {
    name: string;
    what_they_say: string;
    slug: string;
    role: string;
    view_count?: number;
    updatedAt: string;
    user_image?: {
      data?: {
        attributes?: {
          url: string;
        };
      };
    };
  };
  // Alternative structure in case Strapi returns flat data
  name?: string;
  what_they_say?: string;
  slug?: string;
  view_count?: number;
  role?: string;
  updatedAt?: string;
  user_image?: {
    url: string;
  };
}

export interface StrapiResponse {
  data: NewsItem[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface BlogResponse {
  data: BlogItem[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface TestimonialResponse {
  data: TestimonialItem[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

const DEFAULT_LOCALE = "en";

export async function fetchImmigrationNews(
  token: string,
  page: number = 1,
  pageSize: number = 10,
  locale: string = "en",
  collection: string
): Promise<StrapiResponse> {
  try {
    const BASE_URL = `https://determined-unity-de531adc95.strapiapp.com/api/${collection}`;
    const fetchFromLocale = async (loc: string) => {
      const response = await axios.get(BASE_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        params: {
          locale: loc,
          "pagination[page]": page,
          "pagination[pageSize]": pageSize,
          "fields[0]": "title",
          "fields[1]": "publishedAt",
          "fields[2]": "views",
          "fields[3]": "slug",
          "fields[4]": "short_desc",
          "sort[0]": "publishedAt:desc",
        },
      });

      return response.data as StrapiResponse;
    };

    // 1. Try the requested locale
    const data = await fetchFromLocale(locale);

    // 2. If no results, try fallback locale
    // if (data.data.length === 0 && locale !== DEFAULT_LOCALE) {
    //   return await fetchFromLocale(DEFAULT_LOCALE);
    // }

    return data;
  } catch (error) {
    console.error("Error fetching immigration news:", error);
    throw new Error("Failed to fetch immigration news");
  }
}

export async function fetchRecentBlogs(
  token: string,
  pageSize: number = 3,
  locale: string = "en",
  collection: string
): Promise<BlogResponse> {
  try {
    const BASE_URL = `https://determined-unity-de531adc95.strapiapp.com/api/${collection}`;

    const response = await axios.get(BASE_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      params: {
        locale: locale,
        "pagination[pageSize]": pageSize,
        "fields[0]": "slug",
        "fields[1]": "title",
        "fields[2]": "updatedAt",
        "fields[3]": "likes_count",
        "fields[4]": "short_desc",
        "populate[blog_image][fields][0]": "url",
        "sort[0]": "updatedAt:desc",
      },
    });

    return response.data as BlogResponse;
  } catch (error) {
    console.error("Error fetching recent blogs:", error);
    throw new Error("Failed to fetch recent blogs");
  }
}

export async function fetchRecentTestimonials(
  token: string,
  pageSize: number = 3,
  locale: string = "en",
  collection: string
): Promise<TestimonialResponse> {
  try {
    const BASE_URL = `https://determined-unity-de531adc95.strapiapp.com/api/${collection}`;

    const response = await axios.get(BASE_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      params: {
        locale: locale,
        "pagination[pageSize]": pageSize,
        "fields[0]": "slug",
        "fields[1]": "name",
        "fields[2]": "what_they_say",
        "fields[5]": "updatedAt",
        "populate[user_image][fields][0]": "url",
        "sort[0]": "updatedAt:desc",
      },
    });

    return response.data as TestimonialResponse;
  } catch (error) {
    console.error("Error fetching recent testimonials:", error);
    throw new Error("Failed to fetch recent testimonials");
  }
}

export async function getAllTestimonials(
  token: string,
  page: number = 1,
  pageSize: number = 10,
  locale: string = "en",
  collection: string
): Promise<TestimonialResponse> {
  try {
    const BASE_URL = `https://determined-unity-de531adc95.strapiapp.com/api/${collection}`;

    const response = await axios.get(BASE_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      params: {
        locale: locale,
        "pagination[page]": page,
        "pagination[pageSize]": pageSize,
        "fields[0]": "slug",
        "fields[1]": "name",
        "fields[2]": "what_they_say",
        "fields[3]": "view_count",
        "fields[5]": "updatedAt",
        "populate[user_image][fields][0]": "url",
        "sort[0]": "updatedAt:desc",
      },
    });

    return response.data as TestimonialResponse;
  } catch (error) {
    console.error("Error fetching all testimonials:", error);
    throw new Error("Failed to fetch all testimonials");
  }
}

export async function fetchPaginatedImmigrationNews(
  token: string,
  page: number = 1,
  pageSize: number = 10,
  locale: string = "en",
  collection: string
): Promise<StrapiResponse> {
  try {
    const BASE_URL = `https://determined-unity-de531adc95.strapiapp.com/api/${collection}`;

    const response = await axios.get(BASE_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      params: {
        locale: locale,
        "pagination[page]": page,
        "pagination[pageSize]": pageSize,
        "fields[0]": "title",
        "fields[1]": "short_desc",
        "fields[2]": "updatedAt",
        "fields[3]": "views",
        "fields[4]": "slug",
        "populate[news_image][fields][0]": "url",
      },
    });

    return response.data as StrapiResponse;
  } catch (error) {
    console.error("Error fetching paginated immigration news:", error);
    throw new Error("Failed to fetch paginated immigration news");
  }
}

export async function fetchRecentNews(
  token: string,
  page: number = 1,
  pageSize: number = 10,
  locale: string = "en",
  collection: string
): Promise<StrapiResponse> {
  try {
    const BASE_URL = `https://determined-unity-de531adc95.strapiapp.com/api/${collection}`;

    const response = await axios.get(BASE_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      params: {
        locale: locale,
        "pagination[page]": page,
        "pagination[pageSize]": pageSize,
        "fields[0]": "title",
        "fields[1]": "updatedAt",
        "fields[2]": "views",
        "fields[3]": "slug",
        "populate[news_image][fields][0]": "url",
        "sort[0]": "updatedAt:desc",
      },
    });

    return response.data as StrapiResponse;
  } catch (error) {
    console.error("Error fetching paginated immigration news:", error);
    throw new Error("Failed to fetch paginated immigration news");
  }
}

export async function getSingleNews(
  token: string,
  slug: string,
  locale: string = "en",
  collection: string
): Promise<StrapiResponse> {
  try {
    const BASE_URL = `https://determined-unity-de531adc95.strapiapp.com/api/${collection}`;

    const response = await axios.get(BASE_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      params: {
        locale: locale,
        "filters[slug][$eq]": slug,
        "fields[0]": "title",
        "fields[1]": "contents",
        "fields[2]": "updatedAt",
        "fields[3]": "views",
        "fields[4]": "slug",
        "fields[5]": "tags",
        "fields[6]": "category",
        "populate[news_image][fields][0]": "url",
      },
    });

    return response.data as StrapiResponse;
  } catch (error) {
    console.error("Error fetching single news:", error);
    throw new Error("Failed to fetch single news");
  }
}

export async function getPaginatedBlog(
  token: string,
  page: number = 1,
  pageSize: number = 10,
  locale: string = "en",
  collection: string
): Promise<BlogResponse> {
  try {
    const BASE_URL = `https://determined-unity-de531adc95.strapiapp.com/api/${collection}`;

    const response = await axios.get(BASE_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      params: {
        locale: locale,
        "pagination[page]": page,
        "pagination[pageSize]": pageSize,
        "fields[0]": "title",
        "fields[1]": "short_desc",
        "fields[2]": "updatedAt",
        "fields[3]": "likes_count",
        "fields[4]": "slug",
        "populate[blog_image][fields][0]": "url",
      },
    });

    return response.data as BlogResponse;
  } catch (error) {
    console.error("Error fetching paginated blogs:", error);
    throw new Error("Failed to fetch paginated blogs");
  }
}

export async function getSingleBlogPost(
  token: string,
  slug: string,
  locale: string = "en",
  collection: string
): Promise<BlogResponse> {
  try {
    const BASE_URL = `https://determined-unity-de531adc95.strapiapp.com/api/${collection}`;

    const response = await axios.get(BASE_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      params: {
        locale: locale,
        "filters[slug][$eq]": slug,
        "fields[0]": "title",
        "fields[1]": "contents",
        "fields[2]": "updatedAt",
        "fields[3]": "comments_count",
        "fields[4]": "likes_count",
        "fields[5]": "tags",
        "fields[6]": "category",
        "populate[blog_image][fields][0]": "url",
      },
    });

    return response.data as BlogResponse;
  } catch (error) {
    console.error("Error fetching single blog post:", error);
    throw new Error("Failed to fetch single blog post");
  }
}
