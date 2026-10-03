import type { SVGProps } from "react";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { siteConfig } from "@/constants/site";

// Contact and social links shown in the top bar and the mobile menu. The values come
// from siteConfig, so a changed phone number or profile only needs updating there.

const { phone, email } = siteConfig.contact;

export const PHONE_LINK = {
  label: phone,
  href: `tel:${phone.replace(/\s+/g, "")}`,
};

export const EMAIL_LINK = {
  label: email,
  href: `mailto:${email}`,
};

/**
 * The X (Twitter) logo; lucide only has the old bird. The wider viewBox adds padding, so at
 * the same size it looks as big as the outline icons next to it.
 */
function XLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="-2 -2 28 28" fill="currentColor" aria-hidden {...props}>
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  );
}

export const SOCIAL_LINKS = [
  { label: "Facebook", href: siteConfig.links.facebook, icon: Facebook },
  { label: "Instagram", href: siteConfig.links.instagram, icon: Instagram },
  { label: "X", href: siteConfig.links.twitter, icon: XLogo },
  { label: "LinkedIn", href: siteConfig.links.linkedin, icon: Linkedin },
];
