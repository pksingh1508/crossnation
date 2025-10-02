"use client";

import * as React from "react";
import { motion, Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  MapPin,
  Phone,
  MessageCircle,
  Mail,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";
import { ContactForm } from "./ContactForm";

export function ContactContainer() {
  const t = useTranslations("pages.contact");
  const tF = useTranslations("pages.contact.follow");

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const iconVariants: Variants = {
    rest: { scale: 1, rotate: 0 },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const contactItems = [
    {
      icon: MapPin,
      title: t("info.address.title"),
      content: [
        t("info.address.street"),
        t("info.address.zipCode"),
        t("info.address.city"),
      ],
      color: "from-yellow-500 to-yellow-500",
    },
    {
      icon: Phone,
      title: t("info.callUs.title"),
      content: [t("info.callUs.phone")],
      color: "from-yellow-500 to-yellow-500",
      link: `tel:${t("info.callUs.phone")}`,
    },
    {
      icon: MessageCircle,
      title: t("info.whatsapp.title"),
      content: [t("info.whatsapp.number")],
      color: "from-yellow-500 to-yellow-500",
      link: `https://wa.me/${t("info.whatsapp.number")}`,
    },
    {
      icon: Mail,
      title: t("info.email.title"),
      content: [t("info.email.address")],
      color: "from-yellow-500 to-yellow-500",
      link: `mailto:${t("info.email.address")}`,
    },
  ];

  const socialLinks = [
    {
      icon: Facebook,
      href: "https://www.facebook.com/eucareerserwis/",
      color: "hover:bg-yellow-300 hover:text-black",
    },
    {
      icon: Twitter,
      href: "https://x.com/eucareerserwis",
      color: "hover:bg-yellow-300 hover:text-black",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/company/eu-career-serwis",
      color: "hover:bg-yellow-300 hover:text-black",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/eucareerserwis/",
      color: "hover:bg-yellow-300 hover:text-black",
    },
  ];

  return (
    <section className="w-full bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 py-10">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h1 className="text-4xl lg:text-5xl font-bold font-playfair text-gray-900 dark:text-white mb-2 tracking-tight">
            {t("title")}
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto mb-6"></div>
          <p className="text-lg font-inter text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t("description")}
          </p>
        </motion.div>
        <div className="container mx-auto max-w-7xl px-4">
          {/* Main Container with 3-column grid layout */}
          <div className="relative bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl p-2 sm:p-8 lg:p-12">
            {/* Large Screen Layout - 3 Columns Grid */}
            <motion.div
              className="hidden lg:grid lg:grid-cols-[250px_1fr_250px] gap-12 items-start"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {/* Left Column - Social Media Links */}
              <motion.div className="space-y-6" variants={itemVariants}>
                <div className="space-y-4">
                  <motion.h3
                    className="text-lg font-bold font-playfair text-gray-900 dark:text-white"
                    variants={itemVariants}
                  >
                    {tF("title")}
                  </motion.h3>
                  <div className="w-8 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"></div>
                </div>

                <motion.div
                  className="flex flex-col gap-3"
                  variants={itemVariants}
                >
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      className={`flex items-center gap-2 p-3 rounded-lg bg-white dark:bg-gray-700 text-yellow-500 dark:text-gray-400 ${social.color} transition-all duration-300 hover:shadow-md group`}
                      variants={iconVariants}
                      initial="rest"
                      target="_blank"
                      whileTap={{ scale: 0.95 }}
                    >
                      <social.icon className="w-4 h-4 flex-shrink-0" />
                      <span className="text-sm font-medium group-hover:translate-x-1 transition-transform">
                        {social.icon === Facebook
                          ? "Facebook"
                          : social.icon === Twitter
                            ? "Twitter"
                            : social.icon === Linkedin
                              ? "LinkedIn"
                              : "Instagram"}
                      </span>
                    </motion.a>
                  ))}
                </motion.div>
              </motion.div>

              {/* Middle Column - Contact Form with elevated appearance */}
              <motion.div
                className="relative"
                variants={itemVariants}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {/* Yellow Background Layer */}
                <div className="absolute -inset-3 rounded-xl bg-yellow-500 z-0" />

                {/* Main White Box */}
                <div className="relative z-10 bg-white dark:bg-gray-800 rounded-xl p-6 ">
                  <ContactForm />
                </div>
              </motion.div>

              {/* Right Column - Contact Information */}
              <motion.div className="space-y-6" variants={itemVariants}>
                <div className="space-y-4">
                  <motion.h2
                    className="text-2xl font-bold font-playfair text-gray-900 dark:text-white"
                    variants={itemVariants}
                  >
                    {t("info.title")}
                  </motion.h2>
                  <div className="w-12 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"></div>
                </div>

                {/* Contact Items */}
                <motion.div className="space-y-3" variants={itemVariants}>
                  {contactItems.map((item, index) => (
                    <motion.div
                      key={item.title}
                      className="group flex items-start gap-3 p-3 rounded-xl hover:bg-white/70 dark:hover:bg-gray-700/50 transition-all duration-300"
                      variants={itemVariants}
                      whileHover={{ x: 3 }}
                    >
                      <motion.div
                        className={`p-2.5 rounded-full bg-gradient-to-r ${item.color} shadow-md flex-shrink-0`}
                        variants={iconVariants}
                        initial="rest"
                        whileHover="hover"
                      >
                        <item.icon className="w-4 h-4 text-white" />
                      </motion.div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold font-poppins text-gray-900 dark:text-white mb-1">
                          {item.title}
                        </h3>
                        <div className="space-y-0.5">
                          {item.content.map((line, lineIndex) => (
                            <p
                              key={lineIndex}
                              className="text-xs text-gray-600 dark:text-gray-300 font-inter break-words"
                            >
                              {item.link ? (
                                <a
                                  href={item.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="hover:text-yellow-600 transition-colors duration-200 hover:underline"
                                >
                                  {line}
                                </a>
                              ) : (
                                line
                              )}
                            </p>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Mobile/Tablet Layout - Vertical Stack */}
            <motion.div
              className="lg:hidden space-y-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {/* 1. Contact Form First */}
              <motion.div
                className="bg-white dark:bg-gray-700 rounded-2xl shadow-[0_10px_30px_rgba(251,191,36,0.2)] border border-yellow-200/20 dark:border-yellow-600/10 p-6"
                variants={itemVariants}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <ContactForm />
              </motion.div>

              {/* 2. Contact Information */}
              <motion.div className="space-y-6" variants={itemVariants}>
                <div className="space-y-4">
                  <motion.h2
                    className="text-2xl md:text-3xl font-bold font-playfair text-gray-900 dark:text-white"
                    variants={itemVariants}
                  >
                    {t("info.title")}
                  </motion.h2>
                  <div className="w-16 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"></div>
                </div>

                {/* Contact Items */}
                <motion.div className="space-y-4" variants={itemVariants}>
                  {contactItems.map((item, index) => (
                    <motion.div
                      key={item.title}
                      className="group flex items-start gap-4 p-4 rounded-xl hover:bg-white/50 dark:hover:bg-gray-700/50 transition-all duration-300"
                      variants={itemVariants}
                      whileHover={{ x: 5 }}
                    >
                      <motion.div
                        className={`p-3 rounded-full bg-gradient-to-r ${item.color} shadow-lg flex-shrink-0`}
                        variants={iconVariants}
                        initial="rest"
                        whileHover="hover"
                      >
                        <item.icon className="w-6 h-6 text-white" />
                      </motion.div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold font-poppins text-gray-900 dark:text-white mb-2">
                          {item.title}
                        </h3>
                        <div className="space-y-1">
                          {item.content.map((line, lineIndex) => (
                            <p
                              key={lineIndex}
                              className="text-gray-600 dark:text-gray-300 font-inter break-words"
                            >
                              {item.link ? (
                                <a
                                  href={item.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="hover:text-yellow-600 transition-colors duration-200 hover:underline"
                                >
                                  {line}
                                </a>
                              ) : (
                                line
                              )}
                            </p>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* 3. Social Media Links */}
              <motion.div className="space-y-4" variants={itemVariants}>
                <motion.h3
                  className="text-xl font-bold font-playfair text-gray-900 dark:text-white"
                  variants={itemVariants}
                >
                  Follow Us
                </motion.h3>
                <div className="w-12 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"></div>

                <motion.div
                  className="flex flex-wrap gap-4"
                  variants={itemVariants}
                >
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      className={`flex items-center gap-2 p-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 ${social.color} transition-all duration-300 hover:shadow-lg`}
                      variants={iconVariants}
                      initial="rest"
                      whileHover="hover"
                      whileTap={{ scale: 0.95 }}
                    >
                      <social.icon className="w-5 h-5" />
                      <span className="font-medium text-sm">
                        {social.icon === Facebook
                          ? "Facebook"
                          : social.icon === Twitter
                            ? "Twitter"
                            : social.icon === Linkedin
                              ? "LinkedIn"
                              : "Instagram"}
                      </span>
                    </motion.a>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
