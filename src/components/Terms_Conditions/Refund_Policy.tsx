"use client";

import React from "react";
import { useTranslations } from "@/hooks/useTranslations";
import { motion } from "framer-motion";

export function Refund_Policy() {
  const t = useTranslations("refundPolicy");

  // Predefined structure based on actual JSON data (lines 994-1123)
  const headingsStructure = [
    {
      key: "heading1",
      pointCount: 3,
    },
    { key: "heading2", pointCount: 4 },
    {
      key: "heading3",
      pointCount: 2,
    },
    {
      key: "heading4",
      pointCount: 2,
    },
    { key: "heading5", pointCount: 4 },
    { key: "heading6", pointCount: 2 },
    {
      key: "heading7",
      pointCount: 2,
    },
    {
      key: "heading8",
      pointCount: 3,
    },
    { key: "heading9", pointCount: 2 },
    {
      key: "heading10",
      pointCount: 2,
    },
    { key: "heading11", pointCount: 2 },
    { key: "heading12", pointCount: 2 },
    {
      key: "heading13",
      pointCount: 2,
    },
    {
      key: "heading14",
      pointCount: 5,
    },
    { key: "heading15", pointCount: 3 },
    { key: "heading16", pointCount: 3 },
    {
      key: "heading17",
      pointCount: 3,
    },
    { key: "heading18", pointCount: 1 },
    {
      key: "heading19",
      pointCount: 3,
    },
    { key: "heading20", pointCount: 2 },
    { key: "heading21", pointCount: 2 },
    {
      key: "heading22",
      pointCount: 1,
    },
    {
      key: "heading23",
      pointCount: 3,
    },
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-red-50">
      <motion.div
        className="container mx-auto px-4 py-12 max-w-5xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main Header */}
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            {t("mainHeading")}
          </h1>
          <div className="w-32 h-2 bg-gradient-to-r from-yellow-500 to-yellow-600 mx-auto rounded-full mb-6"></div>
        </motion.div>

        {/* Content Sections */}
        <div className="space-y-6">
          {headings.map((heading, index) => {
            // Determine card color based on content type
            let cardColor = "border-gray-200";

            return (
              <motion.div
                key={heading.key}
                className={`bg-white rounded-xl shadow-lg p-8 border-2 ${cardColor} hover:shadow-xl transition-all duration-300`}
                variants={itemVariants}
                whileHover={{ scale: 1.01, y: -2 }}
              >
                {/* Section Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                        <span className="text-gray-700 font-bold text-lg">
                          {index + 1}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-800 leading-tight">
                      {heading.title}
                    </h2>
                  </div>
                </div>

                {/* Points List */}
                <div className="ml-20">
                  <ul className="space-y-3">
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
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
