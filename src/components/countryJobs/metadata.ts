import type { Metadata } from "next";
import { siteConfig } from "@/constants/site";
import { generateMetadata as buildMetadata } from "@/lib/seo/metadata";
import { getLocalizedUrl } from "@/lib/locale-paths";
import { COUNTRY_JOBS, type CountrySlug } from "./countries";

/**
 * A country page's title and description. The page is in English at every address, so
 * its canonical address is the English one.
 */
export function countryJobsMetadata(slug: CountrySlug): Metadata {
  const { name, place } = COUNTRY_JOBS[slug];
  const country = name.toLowerCase();

  return buildMetadata({
    title: `Jobs in ${place}: Work Permit & Visa`,
    description: `Open jobs in ${place} for international workers: salary, eligibility, pricing and every step of the work permit and visa process, with support from EU Career Serwis.`,
    keywords: [
      `jobs in ${country}`,
      `${country} work permit`,
      `${country} work visa`,
      `work in ${country}`,
    ],
    canonical: getLocalizedUrl(siteConfig.defaultLanguage, `/jobs-in-${slug}`),
  });
}
