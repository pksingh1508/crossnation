import TestimonialsPage from "@/app/[lang]/(site)/testimonials/page";
import { siteConfig } from "@/constants/site";

export { metadata } from "@/app/[lang]/(site)/testimonials/page";

interface DefaultTestimonialsPageProps {
  searchParams: Promise<{ page?: string | string[]; q?: string | string[] }>;
}

export default function DefaultTestimonialsPage({
  searchParams,
}: DefaultTestimonialsPageProps) {
  return (
    <TestimonialsPage
      params={Promise.resolve({ lang: siteConfig.defaultLanguage })}
      searchParams={searchParams}
    />
  );
}
