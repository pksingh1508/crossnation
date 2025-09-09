"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { PermitItem, PermitResponse } from "@/lib/strapi";
import {
  Loader2,
  FileImage,
  ZoomIn,
  X,
  ChevronLeft,
  ChevronRight,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function AllPermitImage() {
  const [permitImages, setPermitImages] = useState<PermitItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  useEffect(() => {
    fetchPermitImages();
  }, []);

  const fetchPermitImages = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/work-permit");

      if (!response.ok) {
        throw new Error(
          `Failed to fetch permit images: ${response.statusText}`
        );
      }

      const data: PermitResponse = await response.json();
      setPermitImages(data.data || []);
    } catch (err) {
      console.error("Error fetching permit images:", err);
      setError(
        err instanceof Error ? err.message : "Failed to fetch permit images"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleCloseModal = () => {
    setSelectedImageIndex(null);
  };

  const handlePrevious = () => {
    if (selectedImageIndex !== null && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  const handleNext = () => {
    if (
      selectedImageIndex !== null &&
      selectedImageIndex < permitImages.length - 1
    ) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (selectedImageIndex !== null) {
      if (e.key === "Escape") {
        handleCloseModal();
      } else if (e.key === "ArrowLeft") {
        handlePrevious();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedImageIndex]);

  // Get full image URLs
  const getImageUrls = () => {
    return permitImages
      .map((item) => {
        const imageUrl =
          item.attributes?.permit_image?.data?.attributes?.url ||
          item.permit_image?.url ||
          "";

        return imageUrl.startsWith("http")
          ? imageUrl
          : `https://determined-unity-de531adc95.strapiapp.com${imageUrl}`;
      })
      .filter((url) => url !== "");
  };

  const imageUrls = getImageUrls();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50/30">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col items-center justify-center min-h-[400px]">
              <Loader2 className="w-12 h-12 animate-spin text-purple-500 mb-4" />
              <p className="text-gray-600 text-lg">Loading work permits...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50/30">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <FileImage className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Unable to load work permits
              </h3>
              <p className="text-gray-600 max-w-md mb-6">{error}</p>
              <Button onClick={fetchPermitImages} variant="outline">
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
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-purple-200 rounded-full px-6 py-3 mb-6"
            >
              <FileImage className="w-5 h-5 text-purple-600" />
              <span className="text-purple-700 font-semibold text-sm uppercase tracking-wide">
                Work Permits
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4"
            >
              Work Permit Gallery
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8"
            >
              Browse through our collection of successful work permit approvals
            </motion.p>
          </div>

          {/* Image Grid */}
          {imageUrls.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <FileImage className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No work permits available
              </h3>
              <p className="text-gray-600 max-w-md">
                Check back later for new work permit images.
              </p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {imageUrls.map((imageUrl, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                  onClick={() => handleImageClick(index)}
                >
                  {/* Image */}
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={imageUrl}
                      alt={`Work Permit ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    />

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                      <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={handleCloseModal}
          >
            {/* Close button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Navigation buttons */}
            {imageUrls.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevious();
                  }}
                  disabled={selectedImageIndex === 0}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  disabled={selectedImageIndex === imageUrls.length - 1}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              </>
            )}

            {/* Image counter */}
            {imageUrls.length > 1 && (
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full">
                <p className="text-white text-sm">
                  {selectedImageIndex + 1} / {imageUrls.length}
                </p>
              </div>
            )}

            {/* Modal image */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-full max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={imageUrls[selectedImageIndex]}
                alt={`Work Permit ${selectedImageIndex + 1}`}
                width={1200}
                height={1600}
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
