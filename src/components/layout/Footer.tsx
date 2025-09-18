"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";
import Image from "next/image";

export function Footer() {
  const locale = useLocale();
  const t = useTranslations("footer");
  const tgl = useTranslations("footer.governmentLinks");
  const tupdate = useTranslations("footer.updates");
  const tinfo = useTranslations("footer.info");
  const tsuccess = useTranslations("footer.successStory");
  const theading = useTranslations("footer.heading");
  const tNav = useTranslations("nav");

  const solutionLinks = [
    { href: "/work", label: tNav("work") },
    { href: "/migrate", label: tNav("migrate") },
    { href: "/employer", label: tNav("employer") },
    { href: "/recruiter", label: tNav("recruiter") },
    { href: "/jobseeker", label: tNav("jobseeker") },
  ];

  const governmentLinks = [
    { href: "https://gov.pl", label: tgl("link1") },
    { href: "https://migri.fi", label: tgl("link2") },
    { href: "https://bamf.de", label: tgl("link3") },
    { href: "https://europa.eu", label: tgl("link4") },
    { href: "https://stat.gov.pl/en/", label: tgl("link5") },
  ];

  const updatedLinks = [
    { href: "/blog", label: tupdate("blog") },
    { href: "/immigration-news", label: tupdate("news") },
  ];

  const companyInfoLinks = [
    { href: "#1", label: tinfo("NIP") },
    { href: "#2", label: tinfo("KRS") },
    { href: "#3", label: tinfo("REGON") },
  ];

  const successStoryLinks = [
    { href: "/success-stories", label: tsuccess("story1") },
    { href: "/work-permit", label: tsuccess("story2") },
    { href: "/visa-stamp", label: tsuccess("story3") },
  ];

  const socialLinks = [
    {
      href: "https://www.facebook.com/eucareerserwis/",
      icon: Facebook,
      label: "Facebook",
    },
    { href: "https://x.com/eucareerserwis", icon: Twitter, label: "Twitter" },
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

  const termsLinks = [
    { href: "/privacy-policy", label: t("bottom.privacyPolicy") },
    { href: "/refund-policy", label: t("bottom.refundPolicy") },
    { href: "/terms-conditions", label: t("bottom.termsOfService") },
    { href: "/antiFraud-policy", label: t("bottom.antiFraudPolicy") },
  ];

  return (
    <footer className="mt-auto bg-gray-100 text-gray-800 border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="container mx-auto px-8 lg:px-16 py-8">
        <div className="max-w-7xl mx-auto p-0 lg:pl-4">
          {/* First Row - 4 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Column 1: Logo and Description */}
            <div className="">
              <div className="mb-8">
                <Image
                  src="/mylogo.jpeg"
                  alt="Logo"
                  width={180}
                  height={54}
                  className="h-16 w-auto object-contain"
                />
              </div>
              <p className="text-gray-600 leading-relaxed text-sm pr-4">
                {t("company.description")}
              </p>
            </div>

            {/* Column 2: Our Solution */}
            <div className="">
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {theading("solution")}
                </h4>
                <div className="h-1 w-16 bg-yellow-400 rounded-full"></div>
              </div>
              <ul className="space-y-3">
                {solutionLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={`/${locale}${link.href}`}
                      className="text-gray-600 hover:text-yellow-500 transition-colors duration-200 text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Government Links */}
            <div className="">
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {theading("links")}
                </h4>
                <div className="h-1 w-16 bg-yellow-400 rounded-full"></div>
              </div>
              <ul className="space-y-3">
                {governmentLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-yellow-500 transition-colors duration-200 text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Updated */}
            <div className="">
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {theading("update")}
                </h4>
                <div className="h-1 w-16 bg-yellow-400 rounded-full"></div>
              </div>
              <ul className="space-y-3">
                {updatedLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={`/${locale}${link.href}`}
                      className="text-gray-600 hover:text-yellow-500 transition-colors duration-200 text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Second Row - 4 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Column 1: Company Info */}
            <div className="">
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {theading("info")}
                </h4>
                <div className="h-1 w-16 bg-yellow-400 rounded-full"></div>
              </div>
              <ul className="space-y-3">
                {companyInfoLinks.map((link, index) => (
                  <li key={index}>
                    <p className="text-gray-600 hover:text-yellow-500 transition-colors duration-200 text-sm">
                      {link.label}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Our Success Story */}
            <div className="">
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {theading("story")}
                </h4>
                <div className="h-1 w-16 bg-yellow-400 rounded-full"></div>
              </div>
              <ul className="space-y-3">
                {successStoryLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={`/${locale}${link.href}`}
                      className="text-gray-600 hover:text-yellow-500 transition-colors duration-200 text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Our Social Media */}
            <div className="">
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {theading("media")}
                </h4>
                <div className="h-1 w-16 bg-yellow-400 rounded-full"></div>
              </div>
              <div className="flex flex-col space-y-3">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <Link
                      key={social.href}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-gray-600 hover:text-yellow-500 transition-colors duration-200 group"
                      title={social.label}
                    >
                      <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center group-hover:bg-yellow-500 group-hover:text-white transition-all duration-200">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <span className="text-sm">{social.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Column 4: Terms & Conditions */}
            <div className="">
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {theading("condition")}
                </h4>
                <div className="h-1 w-16 bg-yellow-400 rounded-full"></div>
              </div>
              <ul className="space-y-3">
                {termsLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={`/${locale}${link.href}`}
                      className="text-gray-600 hover:text-yellow-500 transition-colors duration-200 text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Copyright Section */}
          <div className="border-t border-gray-200 pt-8 mt-12">
            <div className="text-center">
              <p className="text-gray-500 text-sm">
                {t("bottom.copyright", { year: new Date().getFullYear() })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
