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
import toast from "react-hot-toast";

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
              src="/home_compressed.jpg"
              alt="Home"
              width={500}
              height={400}
              unoptimized
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
            <div className="grid grid-cols-2 gap-2 md:gap-6 px-3 lg:px-0 w-full lg:w-2/3">
              <RippleButton
                variant="brandOutline"
                size="lg"
                onClick={() => router.push(`/${locale}/recruiter`)}
                className="h-12 text-base font-semibold font-montserrat border-2 hover:bg-yellow-400 hover:text-black hover:border-yellow-400 cursor-pointer"
              >
                {t("btn1")}
              </RippleButton>
              <RippleButton
                variant="brandOutline"
                size="lg"
                onClick={() => router.push(`/${locale}/jobseeker`)}
                className="h-12 text-base font-semibold font-montserrat border-2 hover:bg-yellow-400 hover:text-black hover:border-yellow-400 cursor-pointer"
              >
                {t("btn2")}
              </RippleButton>

              <RippleButton
                variant="brandOutline"
                size="lg"
                onClick={() => router.push(`/${locale}/migrate`)}
                className="h-12 text-base font-semibold font-montserrat border-2 hover:bg-yellow-400 hover:text-black hover:border-yellow-400 cursor-pointer"
              >
                {t("btn3")}
              </RippleButton>
              <RippleButton
                variant="brandOutline"
                size="lg"
                onClick={() => router.push(`/${locale}/employer`)}
                className="h-12 text-base font-semibold font-montserrat border-2 hover:bg-yellow-400 hover:text-black hover:border-yellow-400 cursor-pointer"
              >
                {t("btn4")}
              </RippleButton>
            </div>

            {/* Counselling Section */}
            <div className="flex items-center gap-3 mt-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7 text-amber-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 10h.01M12 14h.01M16 10h.01M21 16v-2a4 4 0 00-3-3.87V9a7 7 0 10-14 0v1.13A4 4 0 001 14v2m20 0a2 2 0 01-2 2H5a2 2 0 01-2-2"
                />
              </svg>
              <div>
                <p
                  className={`text-gray-800 text-base font-medium ${fontInter.className}`}
                >
                  {t("cta1")}
                </p>
                <button
                  className={`text-red-600 text-base font-semibold hover:underline ${fontInter.className}`}
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
