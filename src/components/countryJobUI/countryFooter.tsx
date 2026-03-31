import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter, Phone } from "lucide-react";
import { fontInter, fontPoppins } from "@/fonts";

const socialLinks = [
  {
    href: "https://www.facebook.com/eucareerserwis/",
    icon: Facebook,
    label: "Facebook",
  },
  {
    href: "https://x.com/eucareerserwis",
    icon: Twitter,
    label: "Twitter",
  },
  {
    href: "https://instagram.com/eucareerserwis",
    icon: Instagram,
    label: "Instagram",
  },
  {
    href: "https://www.linkedin.com/company/eu-career-serwis",
    icon: Linkedin,
    label: "LinkedIn",
  },
];

const phoneNumbers = ["+48 787 277 550"];

export default function CountryFooter() {
  return (
    <footer className="border-t border-amber-100 bg-white px-4 py-10 md:py-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 rounded-[28px] border border-amber-100 bg-[linear-gradient(135deg,#fffaf0_0%,#fff7ed_45%,#f8fafc_100%)] p-8 shadow-sm md:flex-row md:items-center md:justify-between md:p-10">
        <div className="max-w-xl">
          <Image
            src="/EU-logo.jpeg"
            alt="EU Career Serwis logo"
            width={180}
            height={64}
            className="h-20 w-fit rounded-lg object-cover"
          />
          <p
            className={`mt-4 text-base leading-7 text-slate-600 ${fontInter.className}`}
          >
            International Recruitment agency in Europe.
          </p>
        </div>

        <div className="flex flex-col gap-8 md:items-end">
          <div className="flex flex-wrap gap-3">
            {socialLinks.map(({ href, icon: Icon, label }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-amber-200 bg-white text-amber-500 transition-colors duration-200 hover:bg-amber-50"
              >
                <Icon className="h-5 w-5" />
              </Link>
            ))}
          </div>

          <div className="space-y-3">
            <h3
              className={`text-sm font-semibold uppercase tracking-[0.18em] text-gray-700 ${fontPoppins.className}`}
            >
              Contact
            </h3>
            <div className="space-y-2">
              {phoneNumbers.map((phone) => (
                <a
                  key={phone}
                  href={`tel:${phone.replace(/\s+/g, "")}`}
                  className={`flex items-center gap-3 text-base text-slate-600 transition-colors duration-200 hover:text-amber-500 ${fontInter.className}`}
                >
                  <Phone className="h-4 w-4 text-amber-500" />
                  <span>{phone}</span>
                </a>
              ))}
            </div>
          </div>

          <p
            className={`text-sm text-slate-500 md:text-right ${fontInter.className}`}
          >
            © 2026 EU Career Serwis. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
