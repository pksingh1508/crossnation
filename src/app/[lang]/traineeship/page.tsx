import { useTranslations } from "next-intl";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Traineeship Programs | CountryNation",
  description: "International traineeship and internship opportunities",
};

export default function TraineeshipPage() {
  const t = useTranslations("pages.traineeship");

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100">
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
              <h3 className="text-xl font-semibold mb-4">{t("services.internships.title")}</h3>
              <p className="text-gray-600">{t("services.internships.description")}</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-4">{t("services.skillDevelopment.title")}</h3>
              <p className="text-gray-600">{t("services.skillDevelopment.description")}</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-4">{t("services.mentorship.title")}</h3>
              <p className="text-gray-600">{t("services.mentorship.description")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
