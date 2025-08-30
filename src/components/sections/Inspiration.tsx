"use client";

import * as React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

interface InspirationStory {
  id: number;
  image: string;
  name: string;
  story: string;
}

export function Inspiration() {
  const inspirationStories: InspirationStory[] = [
    {
      id: 1,
      image: "/insp-1.webp",
      name: "Giri Raj Pandey",
      story:
        "EU Career Serwis guided me professionally throughout my work visa process for Slovakia. They helped with documentation, embassy procedures, and every formal step. As an Asian applicant, I felt supported and confident. I highly recommend their services for work permits and visa assistance.",
    },
    {
      id: 2,
      image: "/insp-2.webp",
      name: "Rolando Mocoy Becher",
      story:
        "Thanks to EU Career Serwis, my work permit journey was smooth and well-organized. From paperwork to embassy coordination, their expert team handled everything with care. Their knowledge and support truly make a difference for international candidates like me.",
    },
    {
      id: 3,
      image: "/insp-3.webp",
      name: "Tamer Moustafa Awad Eldaly",
      story:
        "The team at EU Career Serwis helped me secure my Polish work visa. They provided full assistance with all required documents, cover letters, and embassy instructions. I trusted their process, and it worked perfectly. Highly professional and reliable.",
    },
    {
      id: 4,
      image: "/insp-4.webp",
      name: "Vaibhav Sharma",
      story:
        "I received complete guidance from EU Career Serwis for my work permit application in Europe. From document preparation to career consultation and embassy submissions, their support was structured and genuine. They are a great partner for anyone planning a legal work pathway to Europe.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
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

  const imageVariants: Variants = {
    rest: { scale: 1, y: 0 },
    hover: {
      scale: 1.05,
      y: -8,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <div className="w-full bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold font-playfair text-gray-900 dark:text-white mb-6 tracking-tight">
            Looking for inspiration
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto mb-6"></div>
          <p className="text-xl font-inter text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
            Global clients share how EU Career Serwis helped them secure work
            permits, visas, and career support across Europe. Real stories. Real
            results.
          </p>
        </motion.div>

        {/* Stories Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {inspirationStories.map((story, index) => (
            <motion.div
              key={story.id}
              variants={cardVariants}
              whileHover="hover"
              initial="rest"
              className="group relative"
            >
              {/* Card Container */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-visible h-full flex flex-col relative pt-8">
                {/* Image - Extending outside top */}
                <motion.div
                  className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10"
                  variants={imageVariants}
                >
                  <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-xl">
                    <Image
                      src={story.image}
                      alt={story.name}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>
                </motion.div>

                {/* Content */}
                <div className="p-8 pt-12 flex flex-col flex-grow text-center">
                  {/* Name */}
                  <motion.h3
                    className="text-xl font-bold font-poppins text-gray-900 dark:text-white mb-4 group-hover:text-yellow-600 transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    {story.name}
                  </motion.h3>

                  {/* Story */}
                  <motion.p
                    className="text-sm font-inter text-gray-600 dark:text-gray-300 leading-relaxed flex-grow italic"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    "{story.story}"
                  </motion.p>
                </div>

                {/* Decorative gradient border on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400 to-yellow-600 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
