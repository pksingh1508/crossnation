"use client";

import * as React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import { Phone, Mail, HelpCircle } from "lucide-react";

export function AnyQuestion() {
  const t = useTranslations("anyQuestion");

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
      scale: 0.95 
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
        ease: "easeOut" 
      }
    },
  };

  const contactOptions = [
    {
      icon: Phone,
      label: t("contactOptions.contact"),
      color: "from-blue-500 to-blue-600",
      hoverColor: "hover:from-blue-600 hover:to-blue-700",
    },
    {
      icon: Mail,
      label: t("contactOptions.email"),
      color: "from-green-500 to-green-600",
      hoverColor: "hover:from-green-600 hover:to-green-700",
    },
    {
      icon: HelpCircle,
      label: t("contactOptions.faq"),
      color: "from-yellow-500 to-yellow-600",
      hoverColor: "hover:from-yellow-600 hover:to-yellow-700",
    },
  ];

  return (
    <section className="w-full bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 py-20">
      <div className="container mx-auto max-w-7xl px-4">
        <motion.div
          className="grid lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Text Content */}
          <motion.div 
            className="space-y-8"
            variants={itemVariants}
          >
            <div className="space-y-6">
              <motion.h2 
                className="text-4xl lg:text-5xl font-bold font-playfair text-gray-900 dark:text-white leading-tight"
                variants={itemVariants}
              >
                {t("title")}
              </motion.h2>
              
              <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
              
              <motion.p 
                className="text-lg font-inter text-gray-600 dark:text-gray-300 leading-relaxed"
                variants={itemVariants}
              >
                {t("description")}
              </motion.p>
            </div>

            {/* Contact Options */}
            <motion.div 
              className="flex flex-wrap gap-4 pt-4"
              variants={itemVariants}
            >
              {contactOptions.map((option, index) => (
                <motion.button
                  key={option.label}
                  className={`group relative flex items-center gap-3 px-6 py-4 bg-gradient-to-r ${option.color} ${option.hoverColor} text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold font-poppins`}
                  variants={iconVariants}
                  initial="rest"
                  whileHover="hover"
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    variants={iconVariants}
                  >
                    <option.icon className="w-5 h-5" />
                  </motion.div>
                  <span className="text-sm font-medium">{option.label}</span>
                  
                  {/* Shine effect */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-500"></div>
                </motion.button>
              ))}
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div 
            className="relative"
            variants={itemVariants}
          >
            <motion.div
              className="relative rounded-2xl overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div className="aspect-[4/3] relative">
                <Image
                  src="/contact-1.webp"
                  alt="Customer service team"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              </div>
            </motion.div>

            {/* Floating elements */}
            <motion.div
              className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full shadow-lg flex items-center justify-center"
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <HelpCircle className="w-8 h-8 text-white" />
            </motion.div>

            <motion.div
              className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full shadow-lg flex items-center justify-center"
              initial={{ scale: 0, rotate: 180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.7, duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <Phone className="w-6 h-6 text-white" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}