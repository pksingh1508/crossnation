"use client";

import { useTranslations } from "@/hooks/useTranslations";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { fontPoppins, fontMontserrat, fontInter } from "@/fonts";
import { RippleButton } from "@/components/ui/ripple-button";
import { useRouter } from "next/navigation";

export function Hero() {
  const t = useTranslations("home");
  const locale = useLocale();
  const router = useRouter();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.12 },
    },
  };

  return (
    <motion.section
      variants={container}
      initial="hidden"
      animate="show"
      className="relative min-h-screen md:min-h-[80vh] flex items-center justify-center overflow-hidden"
    >
      <div className="container mx-auto px-2 relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col pt-8 md:pt-0 md:flex-row items-center justify-between">
          {/* Main Content */}

          <motion.div className="w-[95%] md:w-3xl rounded-md overflow-hidden">
            <Image
              src="https://ik.imagekit.io/eucareerserwis/home/HomeLogo.webp"
              alt="Home"
              width={500}
              height={400}
              className="w-[95vw] md:w-[38vw] h-[70vh] object-cover rounded-md"
            />
          </motion.div>

          {/* CTA Button */}
          <div className="w-full md:w-3xl pt-7 md:pt-0 flex items-center justify-center flex-col space-y-8">
            {/* Heading */}
            <div className="text-center">
              <h2
                className={`text-2xl font-extrabold text-gray-700 ${fontPoppins.className}`}
              >
                {t("title1")}
              </h2>
            </div>

            {/* First Row Buttons */}
            <div className="grid grid-cols-2 gap-2 md:gap-3 px-3 lg:px-0 w-full lg:w-2/3">
              <RippleButton
                variant="brandOutline"
                size="lg"
                onClick={() => router.push(`/${locale}/recruiter`)}
                className="h-12 text-base font-semibold font-montserrat border-2 border-yellow-500 hover:border-gray-700 bg-[#fecc00] hover:bg-[#fecc00] hover:border-2 cursor-pointer shadow-amber-200 shadow-md text-gray-700 transition-all"
              >
                {t("btn1")}
              </RippleButton>
              <RippleButton
                variant="brandOutline"
                size="lg"
                onClick={() => router.push(`/${locale}/jobseeker`)}
                className="h-12 text-base font-semibold font-montserrat border-2 border-yellow-500 hover:border-gray-700 bg-[#fecc00] hover:bg-[#fecc00] hover:border-2 cursor-pointer shadow-amber-200 shadow-md text-gray-700 transition-all"
              >
                {t("btn2")}
              </RippleButton>

              <RippleButton
                variant="brandOutline"
                size="lg"
                onClick={() => router.push(`/${locale}/migrate`)}
                className="h-12 text-base font-semibold font-montserrat border-2 border-yellow-500 hover:border-gray-700 bg-[#fecc00] hover:bg-[#fecc00] hover:border-2 cursor-pointer shadow-amber-200 shadow-md text-gray-700 transition-all"
              >
                {t("btn3")}
              </RippleButton>
              <RippleButton
                variant="brandOutline"
                size="lg"
                onClick={() => router.push(`/${locale}/employer`)}
                className="h-12 text-base font-semibold font-montserrat border-2 border-yellow-500 hover:border-gray-700 bg-[#fecc00] hover:bg-[#fecc00] hover:border-2 cursor-pointer shadow-amber-200 shadow-md text-gray-700 transition-all"
              >
                {t("btn4")}
              </RippleButton>
            </div>

            {/* Counselling Section */}
            <div className="flex items-center gap-3 mt-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-9 h-9 text-yellow-500 border-2 border-yellow-500 rounded-full p-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                {/* Left person */}
                <circle cx="7" cy="7" r="3" />
                <path d="M4 20v-1a4 4 0 014-4h2a4 4 0 014 4v1" />

                {/* Right person */}
                <circle cx="17" cy="7" r="3" />
                <path d="M14 20v-1a4 4 0 014-4h2a4 4 0 014 4v1" />
              </svg>

              <div>
                <p
                  className={`text-gray-800 text-base font-medium ${fontInter.className}`}
                >
                  {t("cta1")}
                </p>
                <button
                  className={`text-yellow-500 text-base font-semibold hover:underline ${fontInter.className}`}
                >
                  <Link href={`/${locale}/contact`}>{t("cta2")}</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
