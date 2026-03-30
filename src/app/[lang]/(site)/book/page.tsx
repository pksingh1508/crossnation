import { Metadata } from "next";
import { BookAppointment } from "@/components/bookAppointment/BookAppointment";

export const metadata: Metadata = {
  title: "Book Appointment",
  description: "Schedule a consultation with our experts",
};

export default function BookPage() {
  return <BookAppointment />;
}
