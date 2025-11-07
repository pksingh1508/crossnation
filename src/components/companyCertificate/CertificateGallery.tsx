"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { fontPoppins } from "@/fonts";

export function CertificateGallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedImage]);

  const certificateData = [
    {
      id: 1,
      name: "VAT Certificate",
      image:
        "https://ik.imagekit.io/eucareerserwis/Certificates/notary_certificate.webp",
    },
  ];

  return (
    <>
      <div className="bg-white py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center mb-10 gap-2">
            <h1
              className={`text-3xl font-bold text-center text-gray-800 ${fontPoppins.className}`}
            >
              Company Certificates
            </h1>
            <div className="w-34 h-2 bg-yellow-500 rounded-2xl items-center" />
          </div>
          <div className="space-y-8">
            {certificateData.map((certificate) => (
              <div key={certificate.id} className="w-full">
                <div className="relative w-full max-w-md mx-auto bg-white overflow-hidden group">
                  <div className="relative">
                    <Image
                      src={certificate.image}
                      alt="Company Certificate"
                      width={400}
                      height={400}
                      className="w-full h-auto object-contain border-4 border-yellow-500 rounded-2xl"
                    />
                    <button
                      onClick={() => setSelectedImage(certificate.image)}
                      className="absolute hidden md:flex top-4 right-4 bg-yellow-500 hover:bg-yellow-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 opacity-90 hover:opacity-100 hover:scale-110"
                      aria-label="Zoom certificate"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-gray-100 bg-opacity-90 z-50"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="fixed top-4 right-4 bg-yellow-500 hover:bg-gray-200 text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 z-10"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="min-h-screen flex items-center justify-center p-4">
            <div className="relative max-w-fit w-full border-2 border-yellow-500 rounded-lg bg-white p-4 shadow-lg">
              <Image
                src={selectedImage}
                alt="Company Certificate - Full Size"
                width={1200}
                height={800}
                className="w-full h-[90vh]"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
