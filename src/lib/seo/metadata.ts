import { Metadata } from "next";
import { siteConfig } from "@/constants/site";

const toAbsoluteUrl = (path?: string) => {
  if (!path) {
    return `${siteConfig.url}${siteConfig.ogImage}`;
  }
  if (/^https?:\/\//i.test(path)) {
    return path;
  }
  return `${siteConfig.url}${path.startsWith("/") ? "" : "/"}${path}`;
};

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  noIndex?: boolean;
  canonical?: string;
}

export function generateMetadata({
  title,
  description,
  keywords = [],
  image = "/logoImage.jpeg",
  noIndex = false,
  canonical = "https://eucareerserwis.pl",
}: SEOConfig): Metadata {
  const fullTitle = title;
  const metadataBase = new URL(siteConfig.url);
  const ogImageUrl = toAbsoluteUrl(image);
  const shouldIndex = !noIndex;

  return {
    title: fullTitle,
    description,
    keywords: keywords.join(", "),
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase,
    icons: {
      icon: siteConfig.ogImage,
      shortcut: siteConfig.ogImage,
      apple: siteConfig.ogImage,
    },
    alternates: {
      canonical: canonical || undefined,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonical || siteConfig.url,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} - ${title}`,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImageUrl],
      creator: "@eucareerserwis",
    },
    robots: {
      index: shouldIndex,
      follow: shouldIndex,
      googleBot: {
        index: shouldIndex,
        follow: shouldIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export function generateLocalizedMetadata({
  title,
  description,
  keywords = [],
  image = siteConfig.ogImage,
  noIndex = false,
  locale = "en",
  pathname = "",
}: SEOConfig & { locale?: string; pathname?: string }): Metadata {
  const fullTitle = title;
  const metadataBase = new URL(siteConfig.url);
  const canonicalUrl = `${siteConfig.url}/${locale}${pathname}`;
  const ogImageUrl = toAbsoluteUrl(image);
  const shouldIndex = !noIndex;

  // Use localized description if available, fallback to provided description
  const localizedDescription =
    siteConfig.localizedDescriptions[
      locale as keyof typeof siteConfig.localizedDescriptions
    ] || description;

  // Generate alternate language URLs
  const alternateLanguages: Record<string, string> = {};
  siteConfig.supportedLanguages.forEach((lang) => {
    alternateLanguages[lang] = `${siteConfig.url}/${lang}${pathname}`;
  });

  // Map locale to proper OpenGraph locale format
  const ogLocaleMap: Record<string, string> = {
    en: "en_US",
    es: "es_ES",
    pl: "pl_PL",
    fr: "fr_FR",
    it: "it_IT",
    de: "de_DE",
  };

  return {
    title: fullTitle,
    description: localizedDescription,
    keywords: keywords.join(", "),
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase,
    icons: {
      icon: siteConfig.ogImage,
      shortcut: siteConfig.ogImage,
      apple: siteConfig.ogImage,
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        ...alternateLanguages,
        "x-default": `${siteConfig.url}/en${pathname}`,
      },
    },
    openGraph: {
      title: fullTitle,
      description: localizedDescription,
      url: canonicalUrl,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} - ${title}`,
        },
      ],
      locale: ogLocaleMap[locale] || "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: localizedDescription,
      images: [ogImageUrl],
      creator: "@eucareerserwis",
    },
    robots: {
      index: shouldIndex,
      follow: shouldIndex,
      googleBot: {
        index: shouldIndex,
        follow: shouldIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

// Function to get localized keywords
export function getLocalizedKeywords(
  locale: string,
  type: "primary" | "work" | "migrate" = "primary"
): string[] {
  const langKeywords =
    localizedKeywords[locale as keyof typeof localizedKeywords];
  if (langKeywords && langKeywords[type]) {
    return langKeywords[type];
  }
  // Fallback to English keywords
  return localizedKeywords.en[type] || seoKeywords.primary;
}

// SEO Keywords Database
export const seoKeywords = {
  primary: [
    "immigration services europe",
    "work visa poland",
    "european work permits",
    "immigration consultant poland",
    "eu career services",
  ],
  secondary: [
    "poland work opportunities",
    "european recruitment agency",
    "immigration news europe",
    "work permit application poland",
    "eu migration services",
  ],
  longTail: [
    "how to get work visa for poland",
    "best immigration consultant in warsaw",
    "poland work permit processing time",
    "european job opportunities for foreigners",
    "immigration lawyer poland cost",
  ],
  blog: [
    "immigration policy changes 2024",
    "poland visa requirements",
    "european work visa news",
    "immigration success stories",
    "work permit approval process",
  ],
  locations: [
    "warsaw immigration services",
    "krakow work permits",
    "gdansk recruitment agency",
    "wroclaw immigration consultant",
    "poznan work opportunities",
  ],
};

// Language-specific keywords
export const localizedKeywords = {
  en: {
    primary: [
      "immigration services europe",
      "work visa poland",
      "european work permits",
      "immigration consultant poland",
      "eu career services",
    ],
    work: [
      "work opportunities europe",
      "poland work visa",
      "european employment",
      "work permit assistance",
      "legal work opportunities",
    ],
    migrate: [
      "migration services europe",
      "european relocation",
      "immigration assistance",
      "settlement services",
      "migrate to poland",
    ],
  },
  es: {
    primary: [
      "servicios de inmigración europa",
      "visa de trabajo polonia",
      "permisos de trabajo europeos",
      "consultor de inmigración polonia",
      "servicios de carrera eu",
    ],
    work: [
      "oportunidades de trabajo europa",
      "visa de trabajo polonia",
      "empleo europeo",
      "asistencia permiso de trabajo",
      "oportunidades de trabajo legales",
    ],
    migrate: [
      "servicios de migración europa",
      "reubicación europea",
      "asistencia de inmigración",
      "servicios de asentamiento",
      "migrar a polonia",
    ],
  },
  pl: {
    primary: [
      "usługi imigracyjne europa",
      "wiza pracownicza polska",
      "pozwolenia na pracę europejskie",
      "konsultant imigracyjny polska",
      "usługi kariery eu",
    ],
    work: [
      "możliwości pracy europa",
      "wiza pracownicza polska",
      "zatrudnienie europejskie",
      "pomoc pozwolenie na pracę",
      "legalne możliwości pracy",
    ],
    migrate: [
      "usługi migracyjne europa",
      "przeprowadzka europejska",
      "pomoc imigracyjna",
      "usługi osiedlenia",
      "migracja do polski",
    ],
  },
  fr: {
    primary: [
      "services d'immigration europe",
      "visa de travail pologne",
      "permis de travail européens",
      "consultant en immigration pologne",
      "services de carrière eu",
    ],
    work: [
      "opportunités de travail europe",
      "visa de travail pologne",
      "emploi européen",
      "assistance permis de travail",
      "opportunités de travail légales",
    ],
    migrate: [
      "services de migration europe",
      "relocalisation européenne",
      "assistance immigration",
      "services d'installation",
      "migrer vers la pologne",
    ],
  },
  it: {
    primary: [
      "servizi di immigrazione europa",
      "visto di lavoro polonia",
      "permessi di lavoro europei",
      "consulente immigrazione polonia",
      "servizi carriera eu",
    ],
    work: [
      "opportunità di lavoro europa",
      "visto di lavoro polonia",
      "impiego europeo",
      "assistenza permesso di lavoro",
      "opportunità di lavoro legali",
    ],
    migrate: [
      "servizi di migrazione europa",
      "trasferimento europeo",
      "assistenza immigrazione",
      "servizi di insediamento",
      "migrare in polonia",
    ],
  },
  de: {
    primary: [
      "einwanderungsdienste europa",
      "arbeitsvisum polen",
      "europäische arbeitserlaubnisse",
      "einwanderungsberater polen",
      "eu karrieredienste",
    ],
    work: [
      "arbeitsmöglichkeiten europa",
      "arbeitsvisum polen",
      "europäische beschäftigung",
      "arbeitserlaubnis hilfe",
      "legale arbeitsmöglichkeiten",
    ],
    migrate: [
      "migrationsdienste europa",
      "europäische umsiedlung",
      "einwanderungshilfe",
      "ansiedlungsdienste",
      "nach polen migrieren",
    ],
  },
};

// Function to get localized page config
export function getLocalizedPageConfig(page: string, locale: string = "en") {
  const baseConfigs = {
    home: {
      title:
        "International Employment Company For Europe Work Visa and Work Permit",
      description:
        "EU Career Serwis provides expert immigration services, work permits, and career guidance across Europe. Licensed consultancy in Poland with proven success.",
      keywords: getLocalizedKeywords(locale, "primary"),
    },
    work: {
      title:
        "Work Opportunities in Europe - Legal Work Permits & Visa Assistance",
      description:
        "Secure legal work opportunities across Europe with EU Career Serwis. Expert assistance with work permits, visa applications, and job placement in Poland and EU countries.",
      keywords: getLocalizedKeywords(locale, "work"),
    },
    migrate: {
      title: "Migration Services Europe - Complete Relocation Assistance",
      description:
        "Migrate to Europe with complete professional support from EU Career Serwis. Expert guidance for relocation, settlement, and integration across European countries.",
      keywords: getLocalizedKeywords(locale, "migrate"),
    },
    employer: {
      title:
        "Employer Services - International Recruitment & Workforce Solutions",
      description:
        "International recruitment solutions for European employers. EU Career Serwis provides skilled workforce, compliance support, and staffing solutions across Europe.",
      keywords: [
        "international recruitment",
        "european staffing",
        "workforce solutions",
        "employer services",
        "recruitment agency poland",
      ],
    },
    recruiter: {
      title: "Recruiter Services - Professional Talent Acquisition Support",
      description:
        "Professional recruitment services and talent acquisition support for global markets. Partner with EU Career Serwis for ethical and compliant recruitment solutions.",
      keywords: [
        "recruitment services",
        "talent acquisition",
        "recruitment partners",
        "global recruitment",
        "recruitment consultancy",
      ],
    },
    jobseeker: {
      title:
        "Job Seeker Services - Career Guidance & International Opportunities",
      description:
        "Career guidance and job placement services for international opportunities. EU Career Serwis helps job seekers find legal employment across Europe.",
      keywords: [
        "job seeker services",
        "career guidance",
        "international jobs",
        "job placement",
        "career opportunities europe",
      ],
    },
    blog: {
      title: "Immigration Blog - Expert Insights & Career Guidance",
      description:
        "Discover expert insights, tips, and stories about immigration, career development, and life abroad. Read our latest blog posts for professional guidance.",
      keywords: [
        "immigration blog",
        "career advice",
        "immigration tips",
        "life abroad",
        "immigration stories",
      ],
    },
    news: {
      title: "Immigration News - Latest Updates & Policy Changes",
      description:
        "Stay informed with the latest immigration news, policy changes, and important updates from around the world. Expert analysis and insights.",
      keywords: [
        "immigration news",
        "visa updates",
        "policy changes",
        "immigration updates",
        "visa news",
      ],
    },
  };

  return baseConfigs[page as keyof typeof baseConfigs] || baseConfigs.home;
}

// Page-specific SEO configurations (kept for backward compatibility)
export const pageConfigs = {
  home: {
    title:
      "International Employment Company For Europe Work Visa and Work Permit",
    description:
      "EU Career Serwis provides expert immigration services, work permits, and career guidance across Europe. Licensed consultancy in Poland with proven success.",
    keywords: [...seoKeywords.primary, ...seoKeywords.secondary.slice(0, 3)],
  },
  work: {
    title:
      "Work Opportunities in Europe - Legal Work Permits & Visa Assistance",
    description:
      "Secure legal work opportunities across Europe with EU Career Serwis. Expert assistance with work permits, visa applications, and job placement in Poland and EU countries.",
    keywords: [
      "work opportunities europe",
      "poland work visa",
      "european employment",
      "work permit assistance",
      "legal work opportunities",
    ],
  },
  migrate: {
    title: "Migration Services Europe - Complete Relocation Assistance",
    description:
      "Migrate to Europe with complete professional support from EU Career Serwis. Expert guidance for relocation, settlement, and integration across European countries.",
    keywords: [
      "migration services europe",
      "european relocation",
      "immigration assistance",
      "settlement services",
      "migrate to poland",
    ],
  },
  employer: {
    title:
      "Employer Services - International Recruitment & Workforce Solutions",
    description:
      "International recruitment solutions for European employers. EU Career Serwis provides skilled workforce, compliance support, and staffing solutions across Europe.",
    keywords: [
      "international recruitment",
      "european staffing",
      "workforce solutions",
      "employer services",
      "recruitment agency poland",
    ],
  },
  recruiter: {
    title: "Recruiter Services - Professional Talent Acquisition Support",
    description:
      "Professional recruitment services and talent acquisition support for global markets. Partner with EU Career Serwis for ethical and compliant recruitment solutions.",
    keywords: [
      "recruitment services",
      "talent acquisition",
      "recruitment partners",
      "global recruitment",
      "recruitment consultancy",
    ],
  },
  jobseeker: {
    title:
      "Job Seeker Services - Career Guidance & International Opportunities",
    description:
      "Career guidance and job placement services for international opportunities. EU Career Serwis helps job seekers find legal employment across Europe.",
    keywords: [
      "job seeker services",
      "career guidance",
      "international jobs",
      "job placement",
      "career opportunities europe",
    ],
  },
  blog: {
    title: "Immigration Blog - Expert Insights & Career Guidance",
    description:
      "Discover expert insights, tips, and stories about immigration, career development, and life abroad. Read our latest blog posts for professional guidance.",
    keywords: [
      "immigration blog",
      "career advice",
      "immigration tips",
      "life abroad",
      "immigration stories",
    ],
  },
  news: {
    title: "Immigration News - Latest Updates & Policy Changes",
    description:
      "Stay informed with the latest immigration news, policy changes, and important updates from around the world. Expert analysis and insights.",
    keywords: [
      "immigration news",
      "visa updates",
      "policy changes",
      "immigration updates",
      "visa news",
    ],
  },
};
