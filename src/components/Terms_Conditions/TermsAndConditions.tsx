"use client";
import { useTranslations } from "next-intl";

export default function TermsAndConditions() {
  const t = useTranslations("termsAndConditions");

  // Predefined structure based on actual JSON data
  const headingsStructure = [
    { key: "heading1", paragraphCount: 5, hasSubParagraph: false },
    { key: "heading2", paragraphCount: 6, hasSubParagraph: false },
    {
      key: "heading3",
      paragraphCount: 3,
      hasSubParagraph: true,
      subParagraphCount: 4,
    },
    {
      key: "heading4",
      paragraphCount: 4,
      hasSubParagraph: true,
      subParagraphCount: 2,
    },
    { key: "heading5", paragraphCount: 8, hasSubParagraph: false },
    { key: "heading6", paragraphCount: 4, hasSubParagraph: false },
    {
      key: "heading7",
      paragraphCount: 4,
      hasSubParagraph: true,
      subParagraphCount: 2,
    },
    {
      key: "heading8",
      paragraphCount: 4,
      hasSubParagraph: true,
      subParagraphCount: 3,
    },
    {
      key: "heading9",
      paragraphCount: 3,
      hasSubParagraph: true,
      subParagraphCount: 3,
    },
    {
      key: "heading10",
      paragraphCount: 2,
      hasSubParagraph: true,
      subParagraphCount: 3,
    },
    {
      key: "heading11",
      paragraphCount: 2,
      hasSubParagraph: true,
      subParagraphCount: 5,
    },
    {
      key: "heading12",
      paragraphCount: 3,
      hasSubParagraph: true,
      subParagraphCount: 2,
    },
    {
      key: "heading13",
      paragraphCount: 4,
      hasSubParagraph: true,
      subParagraphCount: 3,
    },
  ];

  // Generate headings with predefined structure
  const headings = headingsStructure.map(
    ({ key, paragraphCount, hasSubParagraph, subParagraphCount = 0 }) => {
      const title = t(`${key}.title`);
      const paragraphs = Array.from({ length: paragraphCount }, (_, i) =>
        t(`${key}.paragraph${i + 1}`)
      );

      let subParagraphs = null;
      if (hasSubParagraph && subParagraphCount > 0) {
        try {
          subParagraphs = Array.from({ length: subParagraphCount }, (_, i) =>
            t(`${key}.subParagraphs.subParagraph${i + 1}`)
          );
        } catch (error) {
          subParagraphs = null;
        }
      }

      return {
        key,
        title,
        paragraphs,
        subParagraphs,
      };
    }
  );

  return (
    <div className="min-h-screen bg-white">
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
                  {heading.paragraphs.map((paragraph, paragraphIndex) => (
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

                {/* SubParagraphs Section */}
                {heading.subParagraphs && heading.subParagraphs.length > 0 && (
                  <div className="mt-6 bg-yellow-50 rounded-lg p-6 border-l-4 border-yellow-500">
                    <div className="space-y-3">
                      {heading.subParagraphs.map((subParagraph, subIndex) => (
                        <div key={subIndex} className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-2">
                            <div className="w-1.5 h-1.5 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full"></div>
                          </div>
                          <span className="text-gray-700 leading-relaxed text-base">
                            {subParagraph}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
