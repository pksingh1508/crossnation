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
              priority
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
                className={`h-12 text-base font-semibold border-2 border-yellow-500 hover:border-gray-700 bg-[#fecc00] hover:bg-[#fecc00] hover:border-2 cursor-pointer shadow-amber-200 shadow-md text-gray-700 transition-all ${fontPoppins.className}`}
              >
                {t("btn1")}
              </RippleButton>
              <RippleButton
                variant="brandOutline"
                size="lg"
                onClick={() => router.push(`/${locale}/jobseeker`)}
                className={`h-12 text-base font-semibold border-2 border-yellow-500 hover:border-gray-700 bg-[#fecc00] hover:bg-[#fecc00] hover:border-2 cursor-pointer shadow-amber-200 shadow-md text-gray-700 transition-all ${fontPoppins.className}`}
              >
                {t("btn2")}
              </RippleButton>

              <RippleButton
                variant="brandOutline"
                size="lg"
                onClick={() => router.push(`/${locale}/migrate`)}
                className={`h-12 text-base font-semibold border-2 border-yellow-500 hover:border-gray-700 bg-[#fecc00] hover:bg-[#fecc00] hover:border-2 cursor-pointer shadow-amber-200 shadow-md text-gray-700 transition-all ${fontPoppins.className}`}
              >
                {t("btn3")}
              </RippleButton>
              <RippleButton
                variant="brandOutline"
                size="lg"
                onClick={() => router.push(`/${locale}/employer`)}
                className={`h-12 text-base font-semibold border-2 border-yellow-500 hover:border-gray-700 bg-[#fecc00] hover:bg-[#fecc00] hover:border-2 cursor-pointer shadow-amber-200 shadow-md text-gray-700 transition-all ${fontPoppins.className}`}
              >
                {t("btn4")}
              </RippleButton>
            </div>

            {/* Counselling Section */}
            <div className="flex items-center gap-3 mt-6">
              <div>
                <Image
                  src="/icons.png"
                  alt="Counselling Icon"
                  width={45}
                  height={45}
                  className="text-yellow-500"
                />
              </div>

              <div>
                <p
                  className={`text-gray-800 text-base font-medium ${fontPoppins.className}`}
                >
                  {t("cta1")}
                </p>
                <button
                  className={`text-yellow-500 text-base font-semibold hover:underline ${fontPoppins.className}`}
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
