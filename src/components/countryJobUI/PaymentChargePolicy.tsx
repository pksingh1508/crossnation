"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { fontInter, fontPoppins } from "@/fonts";
import { cardMotion } from "./CountryJobShared";

type PaymentInstallment = {
  title: string;
  description: string;
};

type PaymentChargePolicyProps = {
  title: string;
  currencyLabel: string;
  totalCharge: string;
  installments: PaymentInstallment[];
  note: string;
  documentsTitle: string;
  requiredDocuments: string[];
};

export default function PaymentChargePolicy({
  title,
  currencyLabel,
  totalCharge,
  installments,
  note,
  documentsTitle,
  requiredDocuments,
}: PaymentChargePolicyProps) {
  return (
    <motion.div
      {...cardMotion}
      whileHover={{ y: -4 }}
      className="rounded-[32px] border border-amber-100 bg-[linear-gradient(135deg,#fffaf0_0%,#ffffff_100%)] p-6 shadow-sm md:p-8"
    >
      <div className="mb-8 rounded-3xl border border-amber-200 bg-amber-50 p-5 md:p-6">
        <h3
          className={`text-xl font-bold text-gray-700 md:text-2xl ${fontPoppins.className}`}
        >
          {title}
        </h3>
        <p
          className={`mt-2 text-base font-semibold text-amber-500 ${fontInter.className}`}
        >
          {currencyLabel}
        </p>
        <p
          className={`mt-4 text-lg font-semibold text-gray-700 ${fontPoppins.className}`}
        >
          {totalCharge}
        </p>

        <div className="mt-5 space-y-4">
          {installments.map((installment, index) => (
            <div
              key={installment.title}
              className={index < installments.length - 1 ? "border-b border-amber-200 pb-4" : ""}
            >
              <p
                className={`text-base font-semibold text-gray-700 ${fontPoppins.className}`}
              >
                {installment.title}
              </p>
              <p
                className={`mt-2 text-base leading-7 text-slate-700 ${fontInter.className}`}
              >
                {installment.description}
              </p>
            </div>
          ))}
        </div>

        <p
          className={`mt-5 rounded-2xl bg-white px-4 py-3 text-sm leading-7 text-slate-700 md:text-base ${fontInter.className}`}
        >
          <span className="font-semibold text-gray-700">Note:</span> {note}
        </p>
      </div>

      <h3 className={`text-2xl font-bold text-gray-700 ${fontPoppins.className}`}>
        {documentsTitle}
      </h3>
      <div className="mt-6 space-y-4">
        {requiredDocuments.map((item) => (
          <div key={item} className="flex items-start gap-3">
            <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-[#fac800]" />
            <p className={`text-base leading-7 text-slate-700 ${fontInter.className}`}>
              {item}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
