"use client";

import type { Page, TestimonialCard } from "@/lib/cms/types";
import { ListIndex } from "@/components/list/ListIndex";
import { FeaturedTestimonial, TestimonialQuote } from "./TestimonialQuote";

interface TestimonialIndexProps {
  /** The page of stories the address asks for; null when it couldn't be loaded */
  result: Page<TestimonialCard> | null;
  /** The search term in the address, already cleaned */
  query: string;
}

/**
 * The clients' success stories (pages, search: see ListIndex). The newest story of each
 * page is shown large; the others are cards in columns, where short and long stories fit
 * together without gaps. Search results are all cards.
 */
export function TestimonialIndex({ result, query }: TestimonialIndexProps) {
  return (
    <ListIndex namespace="successStory" result={result} query={query}>
      {(testimonials) => {
        const featured = query ? null : testimonials[0];
        const cards = featured ? testimonials.slice(1) : testimonials;

        return (
          <>
            {featured && (
              <div data-reveal="shown" className="mb-6">
                <FeaturedTestimonial testimonial={featured} />
              </div>
            )}
            {cards.length > 0 && (
              <ul className="gap-6 md:columns-2 lg:columns-3">
                {cards.map((testimonial) => (
                  <TestimonialQuote
                    key={testimonial.id}
                    testimonial={testimonial}
                  />
                ))}
              </ul>
            )}
          </>
        );
      }}
    </ListIndex>
  );
}
