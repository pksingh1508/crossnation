"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NAVBAR_LINKS,
  FOOTER_SERVICES,
  FOOTER_COUNTRIES,
} from "@/constants/data";
import { colors } from "@/constants/color";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export function Footer() {
  const locale = useLocale();

  return (
    <footer className="mt-auto bg-gray-50 text-gray-800">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-gray-100 to-gray-200">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Our Newsletters
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Get the latest updates, tips, and resources.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Email"
                className="flex-1 bg-white border-gray-300 text-gray-800 placeholder:text-gray-500 focus:border-amber-500 focus:ring-amber-500/20 px-6 py-3"
              />
              <Button
                type="submit"
                className="bg-amber-500 text-white hover:bg-amber-600 font-semibold px-8 py-3 transition-all duration-300"
                style={{ backgroundColor: colors.yellow.DEFAULT, color: colors.black.light }}
              >
                Submit Button
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: colors.yellow.DEFAULT }}>
                <span className="font-bold text-lg" style={{ color: colors.black.light }}>CN</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">CountryNation</h3>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Global Services</p>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed mb-6">
              Your trusted partner for global opportunities in education, migration, and investment. We help you achieve your international dreams with expert guidance and personalized support.
            </p>
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-4 h-4" style={{ color: colors.yellow.DEFAULT }} />
              <span className="text-sm">Serving clients worldwide</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-6">Navigation</h4>
            <ul className="space-y-3">
              {NAVBAR_LINKS.slice(0, 6).map((link) => (
                <li key={link.href}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="text-gray-600 hover:text-amber-500 transition-colors duration-200 text-sm font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-6">Quick Link</h4>
            <ul className="space-y-3">
              {FOOTER_SERVICES.map((service) => (
                <li key={service.value}>
                  <span className="text-gray-600 text-sm font-medium">
                    {service.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-6">Work Hours</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                  <Clock className="w-4 h-4" style={{ color: colors.yellow.DEFAULT }} />
                </div>
                <div>
                  <p className="text-gray-800 font-medium text-sm">7 AM - 5 PM, Mon - Sat</p>
                  <p className="text-gray-500 text-xs">Business Hours</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                  <Phone className="w-4 h-4" style={{ color: colors.yellow.DEFAULT }} />
                </div>
                <div>
                  <p className="text-gray-800 font-medium text-sm">+48 22 209 5497</p>
                  <p className="text-gray-500 text-xs">Call Us</p>
                </div>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-300 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} CountryNation. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="text-gray-500 hover:text-amber-500 text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-500 hover:text-amber-500 text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-500 hover:text-amber-500 text-sm transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
