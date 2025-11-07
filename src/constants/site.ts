export const siteConfig = {
  name: "EU Career Serwis",
  description: "Europe's Premier Immigration and Recruitment Consultancy",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://eucareerserwis.pl",
  ogImage: "/logoImage.jpeg",
  links: {
    twitter: "https://x.com/eucareerserwis",
    github: "https://github.com/eucareerserwis",
    facebook: "https://www.facebook.com/eucareerserwis/",
    instagram: "https://instagram.com/eucareerserwis",
    linkedin: "https://www.linkedin.com/company/eu-career-serwis",
  },
  contact: {
    email: "office@eucareerserwis.pl",
    phone: "+48 787 277 550",
    whatsapp: "+48787277555",
    address: {
      street: "Mennica Legacy Tower, Prosta 20",
      city: "Warszawa",
      zipCode: "00-850",
      country: "Poland",
    },
  },
  supportedLanguages: ["en", "es", "pl", "fr", "it", "de"] as const,
  defaultLanguage: "en" as const,
  languageNames: {
    en: "English",
    es: "Espanol",
    pl: "Polski",
    fr: "Francais",
    it: "Italiano",
    de: "Deutsch",
  } as const,
  // SEO-optimized descriptions for each language
  localizedDescriptions: {
    en: "Europe's Premier Immigration and Recruitment Consultancy. Expert work permits, visa assistance, and career guidance across Europe.",
    es: "Europe's Premier Immigration and Recruitment Consultancy. Expert work permits, visa assistance, and career guidance across Europe.",
    pl: "Europe's Premier Immigration and Recruitment Consultancy. Expert work permits, visa assistance, and career guidance across Europe.",
    fr: "Europe's Premier Immigration and Recruitment Consultancy. Expert work permits, visa assistance, and career guidance across Europe.",
    it: "Europe's Premier Immigration and Recruitment Consultancy. Expert work permits, visa assistance, and career guidance across Europe.",
    de: "Europe's Premier Immigration and Recruitment Consultancy. Expert work permits, visa assistance, and career guidance across Europe.",
  } as const,
};

export type SiteConfig = typeof siteConfig;
