import { useTranslations } from "next-intl";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Investment Services | CountryNation",
  description: "International investment opportunities and guidance",
};

export default function InvestPage() {
  const t = useTranslations("pages.invest");

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-violet-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 text-center">
            {t("title")}
          </h1>
          <p className="text-lg text-gray-600 mb-12 text-center max-w-2xl mx-auto">
            {t("description")}
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-4">{t("services.realEstate.title")}</h3>
              <p className="text-gray-600">{t("services.realEstate.description")}</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-4">{t("services.business.title")}</h3>
              <p className="text-gray-600">{t("services.business.description")}</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-4">{t("services.portfolio.title")}</h3>
              <p className="text-gray-600">{t("services.portfolio.description")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
