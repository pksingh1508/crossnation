import { useTranslations } from "next-intl";
import { Metadata } from "next";
import BookingWidget from "@/components/simplyBookMe/BookingWidget";
import { BookAppointment } from "@/components/bookAppointment/BookAppointment";

export const metadata: Metadata = {
  title: "Book Appointment | EU Career Serwis",
  description: "Schedule a consultation with our experts",
};

export default function BookPage() {
  return <BookAppointment />;
}
