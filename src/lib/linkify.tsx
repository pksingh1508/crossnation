import type { ReactNode } from "react";

// An email address, a phone number (+48 22 208 5497) or a web address
const CONTACT =
  /([\w.+-]+@[\w-]+(?:\.[\w-]+)+)|(\+\d[\d ]{6,}\d)|((?:https?:\/\/)?www\.[\w-]+(?:\.[\w-]+)+)/g;

/** The site's link: dark text with a yellow underline that darkens on hover */
export const TEXT_LINK =
  "font-medium wrap-break-word text-neutral-950 underline decoration-brand decoration-2 underline-offset-4 transition-[text-decoration-color] duration-300 hover:decoration-neutral-950";

/** The text with its email addresses, phone numbers and web addresses as links */
export function linkify(text: string): ReactNode {
  const parts: ReactNode[] = [];
  let end = 0;
  for (const match of text.matchAll(CONTACT)) {
    const [found, email, phone] = match;
    const start = match.index;
    parts.push(text.slice(end, start));
    parts.push(
      <a
        key={start}
        href={
          email
            ? `mailto:${email}`
            : phone
              ? `tel:${phone.replace(/\s+/g, "")}`
              : `https://${found.replace(/^https?:\/\//, "")}`
        }
        className={TEXT_LINK}
      >
        {found}
      </a>
    );
    end = start + found.length;
  }
  if (!end) return text;
  parts.push(text.slice(end));
  return parts;
}
