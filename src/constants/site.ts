export const siteConfig = {
  name: "Cross-Nation",
  description: "Professional services tailored to your needs",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ogImage: "/og-image.jpg",
  links: {
    twitter: "https://twitter.com/yourcompany",
    github: "https://github.com/yourcompany",
  },
  contact: {
    email: "contact@yourcompany.com",
    phone: "+1 (555) 123-4567",
  },
  supportedLanguages: ["en", "es"] as const,
  defaultLanguage: "en" as const,
};

export type SiteConfig = typeof siteConfig;
