import { About } from "@/components/sections/About";
import { FAQ } from "@/components/sections/FAQ";
import { Hero } from "@/components/sections/Hero";
import { TestimonialsSection } from "@/components/sections/Testimonials";
import { HeroCustomSection } from "@/components/hero/HeroCustomSection";

interface PageProps {
  params: Promise<{ lang: string }>; // 👈 mark async
}

export default async function HomePage({ params }: PageProps) {
  const { lang } = await params; // 👈 await params

  return (
    <div>
      <Hero />
      <About />
      <FAQ />
      <HeroCustomSection />
      <TestimonialsSection />
    </div>
  );
}
