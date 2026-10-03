"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import type { Page, SuccessStoryCard } from "@/lib/cms/types";
import { SingleSuccessStory } from "./SingleSuccessStory";
import {
  Loader2,
  Users,
  ChevronLeft,
  ChevronRight,
  Search,
  Star,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaginationData {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

const PAGE_SIZE = 10;

interface AllSuccessStoriesProps {
  /** Page 1, rendered on the server with getSuccessStories(). Null when it could not be loaded. */
  initialPage: Page<SuccessStoryCard> | null;
}

export function AllSuccessStories({ initialPage }: AllSuccessStoriesProps) {
  const [currentSuccessStories, setCurrentSuccessStories] = useState<
    SuccessStoryCard[]
  >(initialPage?.items ?? []);
  const [pagination, setPagination] = useState<PaginationData>({
    page: initialPage?.page ?? 1,
    pageSize: initialPage?.pageSize ?? PAGE_SIZE,
    pageCount: initialPage?.pageCount ?? 1,
    total: initialPage?.total ?? 0,
  });

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(
    initialPage ? null : "Failed to fetch success stories"
  );
  const [searchTerm, setSearchTerm] = useState("");
  const t = useTranslations("successStory");
  const tP = useTranslations("pagination");

  // Every language shows the same stories, so the page only depends on the page number.
  // The server caches each page, so there is no cache here.
  const fetchSuccessStories = useCallback(async (page: number) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `/api/cms/success-stories?page=${page}&pageSize=${PAGE_SIZE}`
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch success stories: ${response.statusText}`
        );
      }

      const data: Page<SuccessStoryCard> = await response.json();

      setCurrentSuccessStories(data.items);
      setPagination({
        page: data.page,
        pageSize: data.pageSize,
        pageCount: data.pageCount,
        total: data.total,
      });
    } catch (err) {
      console.error("Error fetching success stories:", err);
      setError(
        err instanceof Error ? err.message : "Failed to fetch success stories"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const handlePageChange = (newPage: number) => {
    if (
      newPage >= 1 &&
      newPage <= pagination.pageCount &&
      newPage !== pagination.page
    ) {
      setPagination((prev) => ({ ...prev, page: newPage }));
      fetchSuccessStories(newPage);
      // Scroll to top when page changes
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Filter success stories based on search term
  const filteredSuccessStories = currentSuccessStories.filter((successItem) => {
    const name = successItem.name;
    const story = successItem.story ?? "";

    return (
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleRefresh = () => {
    fetchSuccessStories(pagination.page);
  };

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
      } else if (totalPages > 1) {
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
          {tP("previous")}
        </Button>

        <div className="flex items-center gap-1">
          {getVisiblePages().map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === "number" && handlePageChange(page)}
              disabled={page === "..."}
              className={`w-10 h-10 flex items-center justify-center rounded-lg font-medium transition-all ${
                page === pagination.page
                  ? "bg-purple-500 text-white shadow-lg"
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
          {tP("next")}
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    );
  };

  if (loading && pagination.page === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50/30">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center justify-center min-h-[400px]">
              <Loader2 className="w-12 h-12 animate-spin text-yellow-500 mb-4" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error && currentSuccessStories.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50/30">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Unable to load success stories
              </h3>
              <p className="text-gray-600 max-w-md mb-6">{error}</p>
              <Button onClick={() => handleRefresh()} variant="outline">
                Try Again
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50/30 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-400/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-400/3 to-purple-400/3 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-purple-200 rounded-full px-6 py-3 mb-6"
            >
              <Users className="w-5 h-5 text-yellow-600" />
              <span className="text-yellow-600 font-semibold text-sm uppercase tracking-wide">
                {t("title")}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4"
            >
              {t("heading")}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8"
            >
              {t("description")}
            </motion.p>

            {/* Search and Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <div className="relative max-w-md">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search success stories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm"
                />
              </div>
              <Button
                onClick={handleRefresh}
                variant="outline"
                size="lg"
                className="flex items-center gap-2"
                disabled={loading}
              >
                <Calendar className="w-4 h-4" />
                {loading ? "Refreshing..." : `${t("refresh")}`}
              </Button>
            </motion.div>
          </div>

          {/* Success Stories */}
          {!loading && filteredSuccessStories.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {searchTerm
                  ? "No success stories match your search"
                  : "No success stories available"}
              </h3>
              <p className="text-gray-600 max-w-md">
                {searchTerm
                  ? "Try adjusting your search terms."
                  : "Check back later for new success stories."}
              </p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="space-y-6"
            >
              {filteredSuccessStories.map((successStoryItem, index) => (
                <SingleSuccessStory
                  key={successStoryItem.id}
                  successStory={successStoryItem}
                  index={index}
                />
              ))}
            </motion.div>
          )}

          {/* Loading overlay for pagination */}
          {loading && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-8 h-8 animate-spin text-yellow-500" />
            </div>
          )}

          {/* Pagination */}
          <PaginationControls />
        </div>
      </div>
    </div>
  );
}
