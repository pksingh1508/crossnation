"use client";

import React from "react";
import { motion } from "framer-motion";
import { RippleButton } from "@/components/ui/ripple-button";
import { Calendar, Clock, CheckCircle } from "lucide-react";
import { useTranslations } from "next-intl";

export function BookAppointment() {
  const t = useTranslations("bookAppointment");

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
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

  const meetings = [
    {
      name: t("meeting2"),
      duration: "30",
      price: "100",
      icon: <Clock className="w-6 h-6" />,
      popular: false,
    },
    {
      name: t("meeting1"),
      duration: "30",
      price: "100",
      icon: <Calendar className="w-6 h-6" />,
      popular: false,
    },
    {
      name: t("meeting3"),
      duration: "15",
      price: "80",
      icon: <CheckCircle className="w-6 h-6" />,
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-16 px-4">
      <motion.div
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* First Section - Two Information Boxes */}
        <motion.section className="mb-20" variants={itemVariants}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Left Box (Top on mobile) */}
            <motion.div
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 ml-4">
                  {t("heading1")}
                </h2>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg">
                {t("description1")}
              </p>
            </motion.div>

            {/* Right Box (Bottom on mobile) */}
            <motion.div
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 ml-4">
                  {t("heading2")}
                </h2>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg">
                {t("description2")}
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Second Section - Meeting Booking Cards */}
        <motion.section variants={itemVariants}>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Choose Your Meeting
            </h2>
            <p className="text-xl text-gray-600">
              Select the perfect consultation package for your needs
            </p>
          </div>

          {/* Meeting Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {meetings.map((meeting, index) => (
              <motion.div
                key={index}
                className={`relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 ${
                  meeting.popular
                    ? "border-yellow-400 ring-4 ring-yellow-100"
                    : "border-gray-200 hover:border-yellow-500"
                }`}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                {meeting.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center">
                  {/* Icon */}
                  <div
                    className={`w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center ${
                      meeting.popular
                        ? "bg-gradient-to-br from-yellow-400 to-amber-500"
                        : "bg-gradient-to-br from-yellow-500 to-yellow-600"
                    }`}
                  >
                    <div className="text-white">{meeting.icon}</div>
                  </div>

                  {/* Meeting Name */}
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    {meeting.name}
                  </h3>

                  {/* Duration */}
                  <div className="flex items-center justify-center mb-6">
                    <Clock className="w-5 h-5 text-gray-500 mr-2" />
                    <span className="text-gray-600 font-medium">
                      {meeting.duration} {t("min")}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="mb-8">
                    <span className="text-4xl font-bold text-gray-800">
                      €{meeting.price}
                    </span>
                  </div>

                  {/* Book Button */}
                  <RippleButton
                    variant={meeting.popular ? "brand" : "brandOutline"}
                    size="lg"
                    className={`w-full h-14 text-lg font-semibold rounded-xl transition-all duration-300 ${
                      meeting.popular
                        ? "bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-black shadow-lg"
                        : "border-2 border-yellow-500 hover:bg-yellow-500 hover:text-gray-700"
                    }`}
                  >
                    BOOK NOW
                  </RippleButton>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
}
