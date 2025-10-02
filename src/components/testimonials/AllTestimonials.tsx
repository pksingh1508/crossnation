"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { TestimonialItem, TestimonialResponse } from "@/lib/strapi";
import { SingleOneTestimonial } from "@/components/testimonials/SingleOneTestimonial";
import {
  Loader2,
  Users,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Star,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaginationData {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export function AllTestimonials() {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [pagination, setPagination] = useState<PaginationData>({
    page: 1,
    pageSize: 10,
    pageCount: 1,
    total: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const locale = useLocale();
  const testimonialRef = useRef<HTMLDivElement>(null);

  const fetchTestimonials = async (page: number = 1) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `/api/all-testimonial?locale=${locale}&page=${page}&pageSize=10`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch testimonials: ${response.statusText}`);
      }

      const data: TestimonialResponse = await response.json();
      setTestimonials(data.data || []);

      if (data.meta?.pagination) {
        setPagination(data.meta.pagination);
      }
    } catch (err) {
      console.error("Error fetching testimonials:", err);
      setError(
        err instanceof Error ? err.message : "Failed to fetch testimonials"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials(1);
  }, [locale]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.pageCount) {
      fetchTestimonials(newPage);
      // Scroll to top when page changes
      window.scrollTo({
        top: testimonialRef.current?.offsetTop,
        behavior: "smooth",
      });
    }
  };

  // Filter testimonials based on search term
  const filteredTestimonials = testimonials.filter((testimonial) => {
    const name = testimonial.attributes?.name || testimonial.name || "";
    const what_they_say =
      testimonial.attributes?.what_they_say || testimonial.what_they_say || "";
    const role = testimonial.attributes?.role || testimonial.role || "";
    const view_count = (
      testimonial.attributes?.view_count ||
      testimonial.view_count ||
      0
    ).toString();

    return (
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      what_they_say.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      view_count.includes(searchTerm)
    );
  });
  // Pagination component
  const PaginationControls = () => {
    const getVisiblePages = () => {
      const totalPages = pagination.pageCount;
      const currentPage = pagination.page;
      const delta = 2;
      const range = [];
      const rangeWithDots = [];

      for (
        let i = Math.max(2, currentPage - delta);
        i <= Math.min(totalPages - 1, currentPage + delta);
        i++
      ) {
        range.push(i);
      }

      if (currentPage - delta > 2) {
        rangeWithDots.push(1, "...");
      } else {
        rangeWithDots.push(1);
      }

      rangeWithDots.push(...range);

      if (currentPage + delta < totalPages - 1) {
        rangeWithDots.push("...", totalPages);
      } else {
        rangeWithDots.push(totalPages);
      }

      return rangeWithDots;
    };

    if (pagination.pageCount <= 1) return null;

    return (
      <div className="flex items-center justify-center gap-2 mt-12">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(pagination.page - 1)}
          disabled={pagination.page <= 1}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>

        <div className="flex items-center gap-1">
          {getVisiblePages().map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === "number" && handlePageChange(page)}
              disabled={page === "..."}
              className={`w-10 h-10 flex items-center justify-center rounded-lg font-medium transition-all ${
                page === pagination.page
                  ? "bg-amber-500 text-white shadow-lg"
                  : page === "..."
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(pagination.page + 1)}
          disabled={pagination.page >= pagination.pageCount}
          className="flex items-center gap-2"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    );
  };

  if (loading && pagination.page === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center justify-center min-h-[400px]">
              <Loader2 className="w-12 h-12 animate-spin text-amber-500 mb-4" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <MessageCircle className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Unable to load testimonials
              </h3>
              <p className="text-gray-600 max-w-md mb-6">{error}</p>
              <Button onClick={() => fetchTestimonials(1)} variant="outline">
                Try Again
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={testimonialRef}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-400/3 to-pink-400/3 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-amber-200 rounded-full px-6 py-3 mb-6"
            >
              <Star className="w-5 h-5 text-amber-600" />
              <span className="text-amber-600 font-semibold text-sm uppercase tracking-wide">
                Success Stories
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4"
            >
              What Our Clients Say
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8"
            >
              Real stories from real people who achieved their dreams with our
              support
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center justify-center gap-8 mb-8"
            >
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-amber-600 mb-1">
                  {pagination.total}
                </div>
                <div className="text-sm text-gray-500 font-medium">
                  Total Reviews
                </div>
              </div>
              <div className="w-px h-12 bg-gray-300" />
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-amber-600 mb-1">
                  4.9
                </div>
                <div className="text-sm text-gray-500 font-medium">
                  Average Rating
                </div>
              </div>
              <div className="w-px h-12 bg-gray-300" />
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-amber-600 mb-1">
                  99%
                </div>
                <div className="text-sm text-gray-500 font-medium">
                  Satisfaction Rate
                </div>
              </div>
            </motion.div>

            {/* Search */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="max-w-md mx-auto relative"
            >
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search testimonials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent shadow-sm"
              />
            </motion.div>
          </div>

          {/* Testimonials Grid */}
          {!loading && filteredTestimonials.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {searchTerm
                  ? "No testimonials match your search"
                  : "No testimonials available"}
              </h3>
              <p className="text-gray-600 max-w-md">
                {searchTerm
                  ? "Try adjusting your search terms."
                  : "Check back later for client testimonials."}
              </p>
            </div>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="space-y-6"
              >
                {filteredTestimonials.map((testimonial, index) => (
                  <SingleOneTestimonial
                    key={testimonial.id}
                    testimonial={testimonial}
                    index={index}
                  />
                ))}
              </motion.div>

              {/* Loading overlay for pagination */}
              {loading && (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
                </div>
              )}

              {/* Pagination */}
              <PaginationControls />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
