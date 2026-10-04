import type { SVGProps } from "react";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { siteConfig } from "@/constants/site";

// Contact and social links shown in the top bar, the mobile menu, the footer and the
// contact page. The values come from siteConfig, so a changed phone number or profile
// only needs updating there.

const { phone, email, whatsapp, address } = siteConfig.contact;

export const PHONE_LINK = {
  label: phone,
  href: `tel:${phone.replace(/\s+/g, "")}`,
};

/** A chat with us on WhatsApp, optionally with a first message typed in for the visitor */
export function whatsAppLink(message?: string) {
  const number = whatsapp.replace(/\D/g, "");
  return `https://wa.me/${number}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
}

/** The WhatsApp number as it is read: +48 787 277 555 */
export const WHATSAPP_LABEL = whatsapp.replace(
  /^(\+\d{2})(\d{3})(\d{3})(\d{3})$/,
  "$1 $2 $3 $4"
);

export const EMAIL_LINK = {
  label: email,
  href: `mailto:${email}`,
};

/** The office's street; its house number stays on the same line as the street's name */
export const OFFICE_STREET = address.street.replace(/\s(?=\d)/g, "\u00a0");

/** The office on Google Maps */
export const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${address.street}, ${address.zipCode} ${address.city}, ${address.country}`
)}`;

/**
 * The X (Twitter) logo; lucide only has the old bird. The wider viewBox adds padding, so at
 * the same size it looks as big as the outline icons next to it.
 */
export function XLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="-2 -2 28 28" fill="currentColor" aria-hidden {...props}>
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  );
}

/** The WhatsApp logo, which lucide doesn't have */
export function WhatsAppLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

export const SOCIAL_LINKS = [
  { label: "Facebook", href: siteConfig.links.facebook, icon: Facebook },
  { label: "Instagram", href: siteConfig.links.instagram, icon: Instagram },
  { label: "X", href: siteConfig.links.twitter, icon: XLogo },
  { label: "LinkedIn", href: siteConfig.links.linkedin, icon: Linkedin },
];
