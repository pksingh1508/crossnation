import { CommonContact } from "@/components/sections/CommonContact";
import { AllTestimonials } from "@/components/testimonials/AllTestimonials";
import { getTestimonials } from "@/lib/cms/queries";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Client Testimonials",
  description:
    "Read what our clients say about their experience with EU Career Serwis. Real stories from people who achieved their dreams with our immigration and recruitment services.",
  keywords: [
    "testimonials",
    "client reviews",
    "immigration success stories",
    "EU Career Serwis reviews",
  ],
};

export default async function TestimonialsPage() {
  // Page 1 is rendered here; the list loads further pages in the browser
  const initialPage = await getTestimonials(1, 10).catch((error) => {
    console.error("Failed to load testimonials:", error);
    return null;
  });

  return (
    <div>
      <CommonContact />
      <AllTestimonials initialPage={initialPage} />
    </div>
  );
}
