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
    es: "Español",
    pl: "Polski",
    fr: "Français",
    it: "Italiano",
    de: "Deutsch",
  } as const,
  // SEO-optimized descriptions for each language
  localizedDescriptions: {
    en: "Europe's Premier Immigration and Recruitment Consultancy. Expert work permits, visa assistance, and career guidance across Europe.",
    es: "Principal Consultoría de Inmigración y Reclutamiento de Europa. Permisos de trabajo expertos, asistencia de visa y orientación profesional en toda Europa.",
    pl: "Wiodąca Europejska Firma Konsultingowa ds. Imigracji i Rekrutacji. Ekspertowe pozwolenia na pracę, pomoc wizowa i doradztwo zawodowe w całej Europie.",
    fr: "Premier Cabinet de Conseil en Immigration et Recrutement d'Europe. Permis de travail experts, assistance visa et orientation de carrière à travers l'Europe.",
    it: "Prima Società di Consulenza per Immigrazione e Reclutamento d'Europa. Permessi di lavoro esperti, assistenza visti e orientamento professionale in tutta Europa.",
    de: "Europas führende Beratung für Einwanderung und Rekrutierung. Experten-Arbeitserlaubnisse, Visa-Unterstützung und Karriereberatung in ganz Europa.",
  } as const,
};

export type SiteConfig = typeof siteConfig;
