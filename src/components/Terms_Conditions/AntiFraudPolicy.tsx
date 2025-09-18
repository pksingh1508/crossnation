"use client";
import { useTranslations } from "next-intl";

export default function AntiFraudPolicy() {
  const t = useTranslations("antiFraudPolicy");

  // Predefined structure based on actual JSON data
  const headingsStructure = [
    { key: "heading1", paragraphCount: 2, hasSubParagraph: false },
    { key: "heading2", paragraphCount: 2, hasSubParagraph: true },
    { key: "heading3", paragraphCount: 3, hasSubParagraph: false },
    { key: "heading4", paragraphCount: 2, hasSubParagraph: true },
    { key: "heading5", paragraphCount: 2, hasSubParagraph: true },
    { key: "heading6", paragraphCount: 2, hasSubParagraph: true },
    { key: "heading7", paragraphCount: 3, hasSubParagraph: false },
    { key: "heading8", paragraphCount: 2, hasSubParagraph: true },
    { key: "heading9", paragraphCount: 3, hasSubParagraph: false },
    { key: "heading10", paragraphCount: 3, hasSubParagraph: false },
    { key: "heading11", paragraphCount: 3, hasSubParagraph: false },
  ];

  // Generate headings with predefined structure
  const headings = headingsStructure.map(
    ({ key, paragraphCount, hasSubParagraph }) => {
      const title = t(`${key}.title`);
      const paragraphs = Array.from({ length: paragraphCount }, (_, i) =>
        t(`${key}.paragraph${i + 1}`)
      );

      let subParagraph = null;
      if (hasSubParagraph) {
        try {
          subParagraph = {
            subTitle: t(`${key}.paragraph3.subTitle`),
            subPara1: t(`${key}.paragraph3.subPara1`),
            subPara2: t(`${key}.paragraph3.subPara2`),
          };
        } catch (error) {
          subParagraph = null;
        }
      }

      return {
        key,
        title,
        paragraphs,
        subParagraph,
      };
    }
  );

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
              {/* Section Title */}
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center">
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

              {/* Main Paragraphs */}
              <div className="ml-14">
                <ul className="space-y-4">
                  {heading.paragraphs
                    .slice(
                      0,
                      heading.subParagraph ? 2 : heading.paragraphs.length
                    )
                    .map((paragraph, paragraphIndex) => (
                      <li
                        key={paragraphIndex}
                        className="flex items-start gap-3 text-gray-700 leading-relaxed"
                      >
                        <div className="flex-shrink-0 mt-2">
                          <div className="w-2 h-2 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full"></div>
                        </div>
                        <span className="text-base">{paragraph}</span>
                      </li>
                    ))}
                </ul>

                {/* SubParagraph Section */}
                {heading.subParagraph && (
                  <div className="mt-6 bg-yellow-50 rounded-lg p-6 border-l-4 border-yellow-500">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      {heading.subParagraph.subTitle}
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-2">
                          <div className="w-2 h-2 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full"></div>
                        </div>
                        <p className="text-gray-700 leading-relaxed text-base">
                          {heading.subParagraph.subPara1}
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-2">
                          <div className="w-2 h-2 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full"></div>
                        </div>
                        <p className="text-gray-700 leading-relaxed text-base">
                          {heading.subParagraph.subPara2}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Remaining paragraphs after subParagraph */}
                {heading.subParagraph && heading.paragraphs.length > 2 && (
                  <ul className="space-y-4 mt-4">
                    {heading.paragraphs
                      .slice(2)
                      .map((paragraph, paragraphIndex) => (
                        <li
                          key={paragraphIndex + 2}
                          className="flex items-start gap-3 text-gray-700 leading-relaxed"
                        >
                          <div className="flex-shrink-0 mt-2">
                            <div className="w-2 h-2 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full"></div>
                          </div>
                          <span className="text-base">{paragraph}</span>
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
