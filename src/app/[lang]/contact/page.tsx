import { useTranslations } from "next-intl";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | CountryNation",
  description: "Get in touch with our team for personalized assistance",
};

export default function ContactPage() {
  const t = useTranslations("pages.contact");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 text-center">
            {t("title")}
          </h1>
          <p className="text-lg text-gray-600 mb-12 text-center max-w-2xl mx-auto">
            {t("description")}
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <h2 className="text-2xl font-semibold mb-6">{t("form.title")}</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("form.name")}
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder={t("form.namePlaceholder")}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("form.email")}
                  </label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder={t("form.emailPlaceholder")}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("form.message")}
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder={t("form.messagePlaceholder")}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-amber-500 text-white py-2 px-4 rounded-md hover:bg-amber-600 transition-colors"
                >
                  {t("form.submit")}
                </button>
              </form>
            </div>
            
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <h2 className="text-2xl font-semibold mb-6">{t("info.title")}</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-800">{t("info.phone")}</h3>
                  <p className="text-gray-600">+48 22 209 5497</p>
                  <p className="text-gray-600">+48 72 635 666</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">{t("info.email")}</h3>
                  <p className="text-gray-600">contact@countrynation.com</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">{t("info.hours")}</h3>
                  <p className="text-gray-600">{t("info.hoursText")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
