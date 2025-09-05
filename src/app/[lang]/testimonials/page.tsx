import { CommonContact } from "@/components/sections/CommonContact";
import { AllTestimonials } from "@/components/testimonials/AllTestimonials";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Client Testimonials | EU Career Serwis",
  description:
    "Read what our clients say about their experience with EU Career Serwis. Real stories from people who achieved their dreams with our immigration and recruitment services.",
  keywords: [
    "testimonials",
    "client reviews",
    "immigration success stories",
    "EU Career Serwis reviews",
  ],
};

export default function TestimonialsPage() {
  return (
    <div>
      <CommonContact />
      <AllTestimonials />
    </div>
  );
}
