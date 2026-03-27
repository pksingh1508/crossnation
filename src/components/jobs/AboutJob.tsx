"use client";

import { fontInter, fontPoppins } from "@/fonts";

const jobSectors = [
  "Construction jobs in Poland",
  "IT jobs in Poland",
  "Healthcare jobs in Poland",
  "Factory and warehouse jobs",
  "Transport and logistics jobs",
];

const supportItems = [
  "Poland work visa process",
  "Work permit application guidance",
  "Document preparation",
  "Embassy appointment booking",
  "Relocation assistance to Poland",
];

const keyFeatures = [
  "Verified employers offering legal jobs in Poland with work permits",
  "End-to-end Poland visa and relocation support",
  "Secure application system with privacy protection",
  "Multilingual support for global job seekers",
  "Trusted by candidates from Asia, Africa, and the Middle East",
  "Transparent process following Polish immigration laws",
];

export default function AboutJob() {
  return (
    <section className="bg-white px-4 py-12 md:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="md:p-10 lg:p-12">
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex rounded-full bg-amber-100 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.18em] text-amber-700">
              Poland Jobs Portal
            </span>
            <h1
              className={`mt-5 text-3xl font-bold leading-tight text-slate-900 md:text-4xl lg:text-5xl ${fontPoppins.className}`}
            >
              Jobs in Poland with Work Permit | EU Career Serwis
            </h1>
            <div className="mx-auto mt-5 h-1 w-24 rounded-full bg-amber-500"></div>
          </div>

          <div className="mx-auto mt-10 max-w-5xl space-y-6">
            <p
              className={`text-base leading-8 text-slate-600 md:text-lg ${fontInter.className}`}
            >
              eucareerserwis.pl is a trusted job portal for jobs in Poland for
              foreigners. We help international candidates find legal jobs in
              Poland with work permit support and visa assistance. Our platform
              connects you with verified employers, making your journey to
              working in Poland simple, safe, and secure.
            </p>

            <p
              className={`text-base leading-8 text-slate-600 md:text-lg ${fontInter.className}`}
            >
              If you are looking for Poland work permit jobs, visa sponsorship
              jobs in Poland, or job opportunities in Europe, eucareerserwis.pl
              provides a complete solution for skilled, semi-skilled, and
              professional workers.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <h2
                className={`text-2xl font-bold text-slate-900 md:text-3xl ${fontPoppins.className}`}
              >
                Why Choose eucareerserwis.pl for Jobs in Poland?
              </h2>
              <p
                className={`mt-5 text-base leading-8 text-slate-600 ${fontInter.className}`}
              >
                Unlike general job websites, eucareerserwis.pl focuses only on
                verified jobs in Poland with legal work permits. This helps you
                avoid scams, fake job offers, and illegal agents while applying
                with confidence.
              </p>
              <p
                className={`mt-5 text-base leading-8 text-slate-600 ${fontInter.className}`}
              >
                You can confidently apply for jobs in sectors like:
              </p>

              <div className="mt-6 space-y-3">
                {jobSectors.map((sector) => (
                  <div key={sector} className="flex items-start gap-3">
                    <span className="mt-2 inline-flex h-2.5 w-2.5 flex-shrink-0 rounded-full bg-amber-500"></span>
                    <span
                      className={`text-base leading-7 text-slate-700 ${fontInter.className}`}
                    >
                      {sector}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <h2
                className={`text-2xl font-bold text-slate-900 md:text-3xl ${fontPoppins.className}`}
              >
                Poland Job Portal with Full Visa Support
              </h2>
              <p
                className={`mt-5 text-base leading-8 text-slate-600 ${fontInter.className}`}
              >
                Our platform is designed to make your job search easy and
                efficient. With advanced job filters, secure document uploads,
                and real-time application tracking, you can quickly find the
                right job in Poland.
              </p>
              <p
                className={`mt-5 text-base leading-8 text-slate-600 ${fontInter.className}`}
              >
                We also provide complete support for:
              </p>

              <div className="mt-6 space-y-4">
                {supportItems.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="mt-2 inline-flex h-2.5 w-2.5 flex-shrink-0 rounded-full bg-amber-500"></span>
                    <span
                      className={`text-base leading-7 text-slate-700 ${fontInter.className}`}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <h2
              className={`text-2xl font-bold text-slate-900 md:text-3xl ${fontPoppins.className}`}
            >
              Key Features of eucareerserwis.pl
            </h2>
            <div className="mt-8 space-y-4">
              {keyFeatures.map((feature) => (
                <div key={feature} className="flex items-start gap-3">
                  <span className="mt-2 inline-flex h-2.5 w-2.5 flex-shrink-0 rounded-full bg-amber-500"></span>
                  <p
                    className={`text-base leading-7 text-slate-700 ${fontInter.className}`}
                  >
                    {feature}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
