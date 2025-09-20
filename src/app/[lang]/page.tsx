import { About } from "@/components/sections/About";
import { Hero } from "@/components/sections/Hero";
import { RecentTestimonials } from "@/components/sections/RecentTestimonials";
import { HeroCustomSection } from "@/components/hero/HeroCustomSection";
import { NewsSection } from "@/components/immigration_faq/NewsSection";
import { RecentBlog } from "@/components/sections/RecentBlog";
import { GovernmentLinks } from "@/components/sections/GovernmentLinks";

export default async function HomePage() {
  return (
    <div>
      <Hero />
      <About />
      <HeroCustomSection />
      <RecentTestimonials />
      <RecentBlog />
      <NewsSection />
      <GovernmentLinks />
    </div>
  );
}
