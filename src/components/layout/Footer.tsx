"use client";

import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("common");

  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Service Website</h3>
            <p className="text-gray-300">
              Professional services tailored to your needs.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  {t("home")}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  {t("about")}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  {t("services")}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  {t("contact")}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-gray-300">contact@yourcompany.com</p>
            <p className="text-gray-300">+1 (555) 123-4567</p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2024 Service Website. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
