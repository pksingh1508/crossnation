"use client";

import Image from "next/image";
import Link from "next/link";
import { fontInter, fontPoppins } from "@/fonts";
import { Cities } from "@/constants/JobCities";
import { MapPin } from "lucide-react";
import { useLocale } from "next-intl";

export default function RenderCities() {
  const locale = useLocale();

  return (
    <section className="bg-white px-4 py-12 md:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col items-center text-center">
          <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-500">
            <MapPin className="h-7 w-7" />
          </div>
          <h2
            className={`text-3xl font-bold text-slate-900 md:text-4xl ${fontPoppins.className}`}
          >
            Job's in Poland Top City
          </h2>
          <p
            className={`mx-auto mt-4 max-w-3xl text-base leading-8 text-slate-600 ${fontInter.className}`}
          >
            Explore job opportunities across major Polish cities with verified
            employers, legal support, and trusted relocation guidance.
          </p>
          <div className="mt-5 h-1 w-24 rounded-full bg-amber-500"></div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {Cities.map((city) => (
            <Link
              key={city.href}
              href={`/${locale}/jobs${city.href}`}
              className="group relative overflow-hidden rounded-[28px] border border-amber-100 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.08)] transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="absolute inset-x-0 top-0 h-2 origin-left scale-x-0 bg-amber-400 opacity-0 transition-all duration-300 group-hover:scale-x-100 group-hover:opacity-100"></div>

              <div className="p-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-amber-100 bg-amber-50">
                    <Image
                      src={city.cityFlag}
                      alt={`${city.cityName} flag`}
                      width={56}
                      height={56}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3
                      className={`text-xl font-semibold leading-snug text-slate-900 ${fontPoppins.className}`}
                    >
                      {city.cityName}
                    </h3>
                  </div>
                </div>

                <div className="mt-5 border-t border-slate-100 pt-5">
                  <p
                    className={`text-sm leading-7 text-slate-600 ${fontInter.className}`}
                  >
                    {city.description}
                  </p>
                </div>

                <div className="mt-5 border-t border-slate-100 pt-5">
                  <span
                    className={`inline-flex items-center gap-2 text-sm font-semibold text-amber-500 ${fontPoppins.className}`}
                  >
                    Explore Jobs
                    <MapPin className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
