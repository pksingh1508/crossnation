import type { Metadata } from "next";
import { BookAppointment } from "@/components/bookAppointment/BookAppointment";
import { siteConfig } from "@/constants/site";
import { generateMetadata as buildMetadata } from "@/lib/seo/metadata";
import { getLocalizedUrl } from "@/lib/locale-paths";

export const metadata: Metadata = buildMetadata({
  title: "Book Appointment",
  description:
    "Book a one-on-one consultation with EU Career Serwis, for job seekers and businesses: at our Warsaw office, online via Zoom or quickly via WhatsApp, with secure online payment.",
  keywords: [
    "book a consultation",
    "immigration consultation",
    "recruitment advisory",
    "eu career serwis appointment",
  ],
  canonical: getLocalizedUrl(siteConfig.defaultLanguage, "/book"),
});

export default function BookPage() {
  return <BookAppointment />;
}
