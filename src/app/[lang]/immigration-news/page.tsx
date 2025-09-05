import { ImmigrationNewsSection } from "@/components/immigration_news/ImmigrationNewsSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Immigration News | EU Career Serwis",
  description: "Stay updated with the latest immigration news, policy changes, and important updates from around the world. Get expert insights on visa requirements, work permits, and migration opportunities.",
  keywords: ["immigration news", "visa updates", "policy changes", "work permits", "migration news", "EU Career Serwis"],
};

export default function ImmigrationNewsPage() {
  return <ImmigrationNewsSection />;
}
