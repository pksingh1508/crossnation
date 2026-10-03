import { siteConfig } from "@/constants/site";

/** Poland: the company's country, as an ISO region code */
const COMPANY_COUNTRY = "PL";

/**
 * A country's name in the visitor's language, e.g. "PL" gives Polska, Polen, Pologne.
 * Falls back to the English name from the site settings for the company's country.
 */
export function countryName(locale: string, code = COMPANY_COUNTRY) {
  try {
    return new Intl.DisplayNames([locale], { type: "region" }).of(code) ?? code;
  } catch {
    return code === COMPANY_COUNTRY ? siteConfig.contact.address.country : code;
  }
}
