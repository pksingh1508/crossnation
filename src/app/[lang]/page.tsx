import { About } from "@/components/sections/About";
import { Hero } from "@/components/sections/Hero";
import { TestimonialsSection } from "@/components/sections/Testimonials";
import { RecentTestimonials } from "@/components/sections/RecentTestimonials";
import { HeroCustomSection } from "@/components/hero/HeroCustomSection";
import { NewsSection } from "@/components/immigration_faq/NewsSection";
import { RecentBlog } from "@/components/sections/RecentBlog";

interface PageProps {
  params: Promise<{ lang: string }>; // 👈 mark async
}

export default async function HomePage({ params }: PageProps) {
  const { lang } = await params; // 👈 await params

  return (
    <div>
      <Hero />
      <About />
      <NewsSection />
      <RecentBlog />
      <RecentTestimonials />
      <HeroCustomSection />
      <TestimonialsSection />
    </div>
  );
}
