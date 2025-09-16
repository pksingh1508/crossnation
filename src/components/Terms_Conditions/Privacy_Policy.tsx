"use client";
import { useTranslations } from "next-intl";

export default function Privacy_Policy() {
  const t = useTranslations("term&Conditions");

  // Predefined structure based on actual JSON data
  const headingsStructure = [
    { key: "heading1", pointCount: 5 },
    { key: "heading2", pointCount: 2 },
    { key: "heading3", pointCount: 3 },
    { key: "heading4", pointCount: 3 },
    { key: "heading5", pointCount: 3 },
    { key: "heading6", pointCount: 2 },
    { key: "heading7", pointCount: 3 },
    { key: "heading8", pointCount: 4 },
    { key: "heading9", pointCount: 5 },
    { key: "heading10", pointCount: 5 },
    { key: "heading11", pointCount: 3 },
    { key: "heading12", pointCount: 3 },
    { key: "heading13", pointCount: 3 },
    { key: "heading14", pointCount: 2 },
    { key: "heading15", pointCount: 3 },
    { key: "heading16", pointCount: 5 },
    { key: "heading17", pointCount: 3 },
    { key: "heading18", pointCount: 5 },
    { key: "heading19", pointCount: 4 },
    { key: "heading20", pointCount: 3 },
  ];

  // Generate headings with predefined structure
  const headings = headingsStructure.map(({ key, pointCount }) => {
    const title = t(`${key}.title`);
    const points = Array.from({ length: pointCount }, (_, i) =>
      t(`${key}.point${i + 1}`)
    );

    return {
      key,
      title,
      points,
    };
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Main Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            {t("mainHeading")}
          </h1>
          <div className="w-28 h-2 bg-gradient-to-r from-yellow-500 to-yellow-600 mx-auto rounded-full"></div>
        </div>

        {/* Content Sections */}
        <div className="space-y-8">
          {headings.map((heading, index) => (
            <div
              key={heading.key}
              className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              {/* Section Number & Title */}
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-yellow-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {index + 1}
                    </span>
                  </div>
                </div>
                <div className="flex-grow">
                  <h2 className="text-2xl font-bold text-gray-800 leading-tight">
                    {heading.title}
                  </h2>
                </div>
              </div>

              {/* Points List */}
              {heading.points.length > 0 && (
                <div className="ml-14">
                  <ul className="space-y-4">
                    {heading.points.map((point, pointIndex) => (
                      <li
                        key={pointIndex}
                        className="flex items-start gap-3 text-gray-700 leading-relaxed"
                      >
                        <div className="flex-shrink-0 mt-2">
                          <div className="w-2 h-2 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full"></div>
                        </div>
                        <span className="text-base">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
