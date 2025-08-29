import { About } from "@/components/sections/About";
import { FAQ } from "@/components/sections/FAQ";
import { Hero } from "@/components/sections/Hero";
import { Migrate } from "@/components/sections/Migrate";
import { TestimonialsSection } from "@/components/sections/Testimonials";

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
      <Migrate />
      <TestimonialsSection />
    </div>
  );
}
