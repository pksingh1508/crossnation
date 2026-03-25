"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, CheckCircle, X } from "lucide-react";
import { useTranslations } from "next-intl";
import BankDetails from "./BankDetails";

export function BookAppointment() {
  const t = useTranslations("bookAppointment");
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const meetings = [
    {
      name: t("meeting2"),
      duration: "30",
      price: "100",
      icon: <Clock className="w-6 h-6" />,
      popular: false,
    },
    {
      name: t("meeting1"),
      duration: "30",
      price: "100",
      icon: <Calendar className="w-6 h-6" />,
      popular: false,
    },
    {
      name: t("meeting3"),
      duration: "15",
      price: "80",
      icon: <CheckCircle className="w-6 h-6" />,
      popular: false,
    },
  ];

  const advisorySections = [
    {
      title: "Job Seeker Advisory",
      accentClass: "bg-amber-500",
      meetings,
      key: "job-seeker",
    },
    {
      title: "Recruitment Advisory",
      accentClass: "bg-amber-500",
      meetings,
      key: "recruitment",
    },
  ];

  const openBookingModal = () => setIsBookingModalOpen(true);
  const closeBookingModal = () => setIsBookingModalOpen(false);

  return (
    <div className="min-h-screen bg-stone-50 py-16 px-4">
      {isBookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 py-8">
          <div className="relative w-full max-w-xl rounded-[28px] border border-slate-200 bg-white p-6 shadow-2xl md:p-8">
            <button
              type="button"
              aria-label="Close booking modal"
              onClick={closeBookingModal}
              className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="pr-10">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500 text-white">
                <Calendar className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">
                Booking Information
              </h3>
              <p className="mt-4 text-base leading-7 text-slate-600">
                Hello, sir please use the below account detail for booking, we
                are working on the feature.
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-500">
                You can use the bank account details shown below on this page to
                complete the booking process for now.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={closeBookingModal}
                className="h-11 rounded-xl border-amber-500 px-6 text-sm font-semibold text-amber-500"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* First Section - Two Information Boxes */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Left Box (Top on mobile) */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
              <div className="flex items-center mb-6">
                <div className="w-11 h-11 bg-amber-500 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-[22px] font-bold text-gray-800 ml-4">
                  {t("heading1")}
                </h2>
              </div>
              <p className="text-gray-600 leading-relaxed text-base">
                {t("description1")}
              </p>
            </div>

            {/* Right Box (Bottom on mobile) */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
              <div className="flex items-center mb-6">
                <div className="w-11 h-11 bg-amber-500 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-[22px] font-bold text-gray-800 ml-4">
                  {t("heading2")}
                </h2>
              </div>
              <p className="text-gray-600 leading-relaxed text-base">
                {t("description2")}
              </p>
            </div>
          </div>
        </section>

        {/* Second Section - Meeting Booking Cards */}
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {advisorySections.map((section) => (
              <div
                key={section.key}
                className="rounded-[28px] border border-slate-200 bg-white p-6 md:p-8 shadow-sm"
              >
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="inline-flex h-2.5 w-2.5 rounded-full bg-amber-500"></span>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                      Advisory Services
                    </p>
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900">
                    {section.title}
                  </h3>
                  <div className="mt-4 h-1 w-16 rounded-full bg-amber-500"></div>
                </div>

                <div className="space-y-5">
                  {section.meetings.map((meeting, index) => (
                    <div
                      key={`${section.key}-${index}`}
                      className="rounded-3xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm"
                    >
                      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                        <div className="flex items-start gap-4">
                          <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-sm">
                            {meeting.icon}
                          </div>

                          <div className="space-y-3">
                            <h4 className="text-xl font-semibold leading-tight text-slate-900 md:text-2xl">
                              {meeting.name}
                            </h4>

                            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
                              <div className="inline-flex items-center gap-2 rounded-full bg-stone-100 px-3 py-1.5 font-medium">
                                <Clock className="h-4 w-4 text-amber-500" />
                                <span>
                                  {meeting.duration} {t("min")}
                                </span>
                              </div>
                              <div className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-base font-semibold text-slate-900">
                                €{meeting.price}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="md:flex-shrink-0">
                          <Button
                            variant="outline"
                            size="lg"
                            onClick={openBookingModal}
                            className="h-11 w-full rounded-xl border-2 border-amber-500 px-6 text-sm font-semibold tracking-wide text-amber-500 md:w-auto"
                          >
                            BOOK NOW
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
        <div id="bank-details">
          <BankDetails />
        </div>
      </div>
    </div>
  );
}
