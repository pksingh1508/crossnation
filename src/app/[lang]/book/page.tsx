import { useTranslations } from "next-intl";
import { Metadata } from "next";
import BookingWidget from "@/components/simplyBookMe/BookingWidget";

export const metadata: Metadata = {
  title: "Book Appointment | CountryNation",
  description: "Schedule a consultation with our experts",
};

export default function BookPage() {
  // const t = useTranslations("pages.book");

  // return <BookingWidget />;
  return <div>Booking Widget</div>;
}
