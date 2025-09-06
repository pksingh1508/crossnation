import { BlogsSection } from "@/components/blogs/BlogsSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | EU Career Serwis",
  description: "Discover insights, tips, and stories about immigration, career development, and life abroad. Read our latest blog posts for expert advice and guidance.",
  keywords: ["blog", "immigration tips", "career advice", "life abroad", "EU Career Serwis", "immigration stories"],
};

export default function BlogPage() {
  return <BlogsSection />;
}
