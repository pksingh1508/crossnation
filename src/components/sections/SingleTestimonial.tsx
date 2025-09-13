"use client";

import { TestimonialItem } from "@/lib/strapi";
import Image from "next/image";
import { motion, easeInOut } from "framer-motion";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { RippleButton } from "../ui/ripple-button";
import { useRouter } from "next/navigation";

interface SingleTestimonialProps {
  testimonial: TestimonialItem;
  index?: number;
  locale: string;
}

export function SingleTestimonial({
  testimonial,
  index = 0,
  locale,
}: SingleTestimonialProps) {
  // Extract data with fallback handling for both Strapi attribute structure and flat structure
  const data = {
    id: testimonial.id,
    name: testimonial.attributes?.name || testimonial.name || "Anonymous",
    what_they_say:
      testimonial.attributes?.what_they_say || testimonial.what_they_say || "",
    role: testimonial.attributes?.role || testimonial.role || "Client",
    slug: testimonial.attributes?.slug || testimonial.slug || "",
    view_count:
      testimonial.attributes?.view_count || testimonial.view_count || 0,
    updatedAt: testimonial.attributes?.updatedAt || testimonial.updatedAt || "",
    user_image:
      testimonial.attributes?.user_image?.data?.attributes?.url ||
      testimonial.user_image?.url ||
      null,
  };
  const router = useRouter();

  const btnName =
    index === 0 ? "Success Story" : index === 1 ? "Work Permit" : "Visa Stamp";
  const url =
    index === 0
      ? "/success-stories"
      : index === 1
        ? "/work-permit"
        : "/visa-stamp";

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const cardTransition = {
    duration: 0.6,
    delay: index * 0.1,
    ease: easeInOut,
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      transition={cardTransition}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ y: -8 }}
      className="h-full"
    >
      <Card className="relative h-fit p-6 md:p-8 bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl group overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-purple-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Client info */}
        <Link href={`${locale}/testimonials`}>
          <div className="relative flex flex-col items-center gap-4 mt-auto ">
            {/* Avatar */}
            <div className="relative">
              <div className="w-44 h-44 rounded-sm overflow-hidden ring-4 ring-white shadow-md">
                {data.user_image ? (
                  <Image
                    src={
                      data.user_image.startsWith("http")
                        ? data.user_image
                        : `https://determined-unity-de531adc95.strapiapp.com${data.user_image}`
                    }
                    alt={`${data.name} - testimonial`}
                    // width={56}
                    // height={56}
                    fill
                    className="w-full h-full rounded-md object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">
                      {data.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
              {/* Online indicator */}
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full" />
            </div>

            {/* Client details */}
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-gray-900 text-lg truncate">
                {data.name}
              </h4>
            </div>
          </div>
        </Link>

        {/* Testimonial content */}
        <div className="relative mb-8">
          <blockquote className="text-gray-700 text-md leading-relaxed font-medium">
            "{data.what_they_say.split(" ").slice(0, 30).join(" ")}"
          </blockquote>
        </div>

        {/* Hover effect overlay */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-amber-400/20 to-orange-400/20 rounded-full transform translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-500 opacity-0 group-hover:opacity-100" />
      </Card>
      <div className="mx-auto flex justify-center mt-6">
        <RippleButton
          variant="brandOutline"
          size="lg"
          onClick={() => {
            router.push(`${locale}${url}`);
          }}
          className="h-12 text-base font-semibold font-montserrat border-2 border-[#fecc00] text-yellow-500 hover:bg-yellow-400 hover:text-black hover:border-yellow-400 cursor-pointer"
        >
          {btnName}
        </RippleButton>
      </div>
    </motion.div>
  );
}
