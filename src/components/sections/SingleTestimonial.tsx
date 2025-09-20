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
    name: testimonial.attributes?.name || testimonial.name || "",
    what_they_say:
      testimonial.attributes?.what_they_say || testimonial.what_they_say || "",
    user_image:
      testimonial.attributes?.user_image?.data?.attributes?.url || // Strapi nested structure
      testimonial.user_image?.url || // Flat structure
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

  // Check if both name and what_they_say are empty
  const isImageOnly = data.name == "" && data.what_they_say == "";

  // Debug logging
  console.log(`Testimonial ${data.id}:`, {
    name: data.name,
    what_they_say: data.what_they_say,
    user_image: data.user_image,
    isImageOnly,
    originalData: testimonial,
  });

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ y: -8 }}
      className="h-full"
    >
      <Card
        className={`relative h-96 bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl group overflow-hidden ${
          isImageOnly ? "p-0" : "p-6 md:p-8"
        }`}
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-purple-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {isImageOnly ? (
          /* Full-size image when name and what_they_say are empty */
          <div>
            <div className="relative w-full h-96">
              {" "}
              {/* Ensure fixed height */}
              {data.user_image ? (
                <Image
                  src={
                    data.user_image.startsWith("http")
                      ? data.user_image
                      : `https://determined-unity-de531adc95.strapiapp.com${data.user_image}`
                  }
                  alt="Testimonial image"
                  fill
                  className="rounded-2xl object-contain lg:object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center rounded-2xl">
                  <span className="text-white font-semibold text-2xl">?</span>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Original layout when name or what_they_say exist */
          <div className="flex flex-col h-full">
            {/* Client info */}
            <Link href={`${locale}/testimonials`}>
              <div className="relative flex flex-col items-center gap-4">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-32 h-32 rounded-sm overflow-hidden ring-4 ring-white shadow-md">
                    {data.user_image ? (
                      <Image
                        src={
                          data.user_image.startsWith("http")
                            ? data.user_image
                            : `https://determined-unity-de531adc95.strapiapp.com${data.user_image}`
                        }
                        alt={`${data.name} - testimonial`}
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
                  <h4 className="font-bold text-gray-900 text-lg truncate text-center">
                    {data.name}
                  </h4>
                </div>
              </div>
            </Link>

            {/* Testimonial content */}
            <div className="relative flex-1 flex items-start mt-4">
              <blockquote className="text-gray-700 text-sm leading-relaxed font-medium">
                "{data.what_they_say.split(" ").slice(0, 25).join(" ")}..."
              </blockquote>
            </div>
          </div>
        )}

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
