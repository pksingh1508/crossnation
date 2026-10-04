import "server-only";
import countries from "@/constants/countrycode.json";
import { countryName } from "@/lib/country-name";
import type { GalleryImage } from "./types";

/** A document in a gallery (a work permit, a visa stamp), ready to show */
export interface GalleryDocument {
  id: string;
  src: string;
  width: number;
  height: number;
  /**
   * Where it was issued, when the CMS says: the key that filters by it (?country=pl), the
   * region code for its flag (null for a name the list doesn't know), and its name in the
   * page's language
   */
  country: { key: string; code: string | null; name: string } | null;
}

// The CMS stores a country's English name; the phone list knows its region code.
// Its names read like "Poland (Polska)".
const REGION_CODES = new Map(
  countries.map(({ country, iso }) => [
    country.split(" (")[0].toLowerCase(),
    iso,
  ])
);

// Scans of A4 pages, for the rare image without its size
const A4 = { width: 1240, height: 1754 };

/**
 * The gallery's images as documents for the page in this language. Country names are
 * translated here, on the server, so the browser shows exactly the same text.
 */
export function toGalleryDocuments(
  images: GalleryImage[],
  locale: string
): GalleryDocument[] {
  return images.map((image) => {
    const name = image.country?.trim();
    const code = name ? (REGION_CODES.get(name.toLowerCase()) ?? null) : null;
    const { width, height } =
      image.image_width && image.image_height
        ? { width: image.image_width, height: image.image_height }
        : A4;

    return {
      id: image.id,
      src: image.image_url,
      width,
      height,
      country: name
        ? {
            key: (code ?? name).toLowerCase(),
            code,
            name: code ? countryName(locale, code) : name,
          }
        : null,
    };
  });
}
