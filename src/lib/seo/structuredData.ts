import { siteConfig } from "@/constants/site";

// Organization Schema
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "EU Career Serwis",
  alternateName: "EU Career Service",
  url: siteConfig.url,
  logo: `${siteConfig.url}/logo.png`,
  description: siteConfig.description,
  foundingDate: "2020",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+48-22-268-3497",
    contactType: "customer service",
    availableLanguage: [
      "English",
      "Polish",
      "German",
      "French",
      "Italian",
      "Spanish",
    ],
    areaServed: "Europe",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Ul Ludwika Idzikowskiego 16, 4th Floor",
    addressLocality: "Warszawa",
    postalCode: "00-710",
    addressRegion: "Mazowieckie",
    addressCountry: "PL",
  },
  sameAs: [
    "https://www.facebook.com/eucareerserwis/",
    "https://x.com/eucareerserwis",
    "https://instagram.com/eucareerserwis",
    "https://www.linkedin.com/company/eu-career-serwis",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "150",
    bestRating: "5",
    worstRating: "1",
  },
};

// Service Schema Generator
export function generateServiceSchema(
  serviceName: string,
  description: string,
  serviceType: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: serviceName,
    description: description,
    serviceType: serviceType,
    provider: {
      "@type": "Organization",
      name: "EU Career Serwis",
      url: siteConfig.url,
    },
    areaServed: [
      {
        "@type": "Country",
        name: "Poland",
      },
      {
        "@type": "Place",
        name: "Europe",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Immigration Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: serviceName,
          },
        },
      ],
    },
  };
}

// Article Schema for Blog Posts
export function generateArticleSchema(
  title: string,
  description: string,
  publishedDate: string,
  modifiedDate: string,
  imageUrl?: string,
  authorName: string = "EU Career Serwis Team"
) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    image: imageUrl
      ? `${siteConfig.url}${imageUrl}`
      : `${siteConfig.url}/og-image.jpg`,
    datePublished: publishedDate,
    dateModified: modifiedDate,
    author: {
      "@type": "Organization",
      name: authorName,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: "EU Career Serwis",
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": siteConfig.url,
    },
  };
}

// FAQ Schema Generator
export function generateFAQSchema(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

// Breadcrumb Schema Generator
export function generateBreadcrumbSchema(
  breadcrumbs: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((breadcrumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: breadcrumb.name,
      item: breadcrumb.url,
    })),
  };
}

// Local Business Schema
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "EU Career Serwis",
  image: `${siteConfig.url}/logo.png`,
  "@id": siteConfig.url,
  url: siteConfig.url,
  telephone: "+48-22-268-3497",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Ul Ludwika Idzikowskiego 16, 4th Floor",
    addressLocality: "Warszawa",
    postalCode: "00-710",
    addressCountry: "PL",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 52.2297,
    longitude: 21.0122,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
  sameAs: [
    "https://www.facebook.com/eucareerserwis/",
    "https://x.com/eucareerserwis",
    "https://instagram.com/eucareerserwis",
    "https://www.linkedin.com/company/eu-career-serwis",
  ],
};

// Website Schema
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "EU Career Serwis",
  url: siteConfig.url,
  description: siteConfig.description,
  publisher: {
    "@type": "Organization",
    name: "EU Career Serwis",
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

// Service-specific schemas
export const serviceSchemas = {
  work: generateServiceSchema(
    "Work Permit and Visa Services",
    "Professional assistance with work permits, visa applications, and legal employment opportunities across Europe",
    "Immigration Consultation"
  ),
  migrate: generateServiceSchema(
    "Migration and Relocation Services",
    "Complete migration assistance including relocation support, settlement services, and integration guidance for European countries",
    "Migration Consultation"
  ),
  employer: generateServiceSchema(
    "Employer Recruitment Services",
    "International recruitment solutions, workforce staffing, and compliance support for European employers",
    "Recruitment Services"
  ),
  recruiter: generateServiceSchema(
    "Recruitment Partnership Services",
    "Professional recruitment partnerships and talent acquisition support for global recruitment agencies",
    "Business Consultation"
  ),
  jobseeker: generateServiceSchema(
    "Job Seeker Career Services",
    "Career guidance, job placement assistance, and professional development support for international job seekers",
    "Career Consultation"
  ),
};

// Review Schema Generator
export function generateReviewSchema(
  reviewerName: string,
  reviewText: string,
  rating: number,
  datePublished: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    author: {
      "@type": "Person",
      name: reviewerName,
    },
    reviewBody: reviewText,
    reviewRating: {
      "@type": "Rating",
      ratingValue: rating,
      bestRating: 5,
      worstRating: 1,
    },
    datePublished: datePublished,
    itemReviewed: {
      "@type": "Organization",
      name: "EU Career Serwis",
    },
  };
}

// Event Schema Generator (for webinars, consultations)
export function generateEventSchema(
  eventName: string,
  description: string,
  startDate: string,
  endDate: string,
  location: string = "Online"
) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: eventName,
    description: description,
    startDate: startDate,
    endDate: endDate,
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "VirtualLocation",
      url: siteConfig.url,
    },
    organizer: {
      "@type": "Organization",
      name: "EU Career Serwis",
      url: siteConfig.url,
    },
  };
}
