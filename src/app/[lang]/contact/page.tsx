import { Metadata } from "next";
import { ContactContainer } from "@/components/contact_us/ContactContainer";
import { LocationMap } from "@/components/contact_us/LocationMap";
import { GovernmentLinks } from "@/components/sections/GovernmentLinks";

export const metadata: Metadata = {
  title: "Contact Us | EU Career Serwis",
  description: "Get in touch with our team for personalized assistance",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <ContactContainer />
      <LocationMap />
      <GovernmentLinks />
    </div>
  );
}
