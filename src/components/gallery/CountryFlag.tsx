import Flag from "react-country-flag";
import { FLAG_CDN } from "@/lib/flags";
import { cn } from "@/lib/utils";

interface CountryFlagProps {
  /** The region code, e.g. "PL" */
  code: string;
  /** Its width and height, e.g. "1.25rem" */
  size: string;
  className?: string;
}

/** A country's round flag. Its name is always beside it, so the flag itself is silent. */
export function CountryFlag({ code, size, className }: CountryFlagProps) {
  return (
    <Flag
      svg
      countryCode={code}
      cdnUrl={FLAG_CDN}
      alt=""
      loading="lazy"
      decoding="async"
      className={cn("shrink-0 rounded-full ring-1 ring-black/10", className)}
      style={{ width: size, height: size }}
    />
  );
}
