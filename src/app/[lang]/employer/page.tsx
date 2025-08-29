import { useTranslations } from "next-intl";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Employer Services | CountryNation",
  description: "International recruitment and employer support services",
};

export default function EmployerPage() {
  const t = useTranslations("pages.employer");

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100">
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
              <h3 className="text-xl font-semibold mb-4">{t("services.recruitment.title")}</h3>
              <p className="text-gray-600">{t("services.recruitment.description")}</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-4">{t("services.compliance.title")}</h3>
              <p className="text-gray-600">{t("services.compliance.description")}</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-4">{t("services.onboarding.title")}</h3>
              <p className="text-gray-600">{t("services.onboarding.description")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
