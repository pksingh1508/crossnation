import { useTranslations } from "next-intl";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Job Seeker Services | CountryNation",
  description: "Career guidance and job placement services for international opportunities",
};

export default function JobseekerPage() {
  const t = useTranslations("pages.jobseeker");

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100">
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
              <h3 className="text-xl font-semibold mb-4">{t("services.careerCounseling.title")}</h3>
              <p className="text-gray-600">{t("services.careerCounseling.description")}</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-4">{t("services.resumeBuilding.title")}</h3>
              <p className="text-gray-600">{t("services.resumeBuilding.description")}</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-4">{t("services.jobMatching.title")}</h3>
              <p className="text-gray-600">{t("services.jobMatching.description")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
