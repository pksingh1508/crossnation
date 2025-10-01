import React from "react";
import Image from "next/image";
import { fontPoppins } from "@/fonts";

export default function page() {
  const certificateData = [
    {
      id: 1,
      name: "VAT Certificate",
      image: "https://ik.imagekit.io/eucareerserwis/Certificates/notary.webp",
    },
  ];

  return (
    <div className=" bg-white py-8 px-4">
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
              {/* Full-size certificate image container */}
              <div className="relative w-full  bg-white overflow-hidden">
                <Image
                  src={certificate.image}
                  alt="Company Certificate"
                  width={600}
                  height={600}
                  className="w-fit h-fit object-contain border-4 border-yellow-500 rounded-2xl mx-auto"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
