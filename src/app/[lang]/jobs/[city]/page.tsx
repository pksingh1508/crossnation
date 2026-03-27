import { Cities } from "@/constants/JobCities";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { fontInter, fontPoppins } from "@/fonts";
import RenderJobs from "@/components/jobs/RenderJobs";
import RenderFAQ from "@/components/jobs/RenderFAQ";
import { RecentTestimonials } from "@/components/sections/RecentTestimonials";

interface CityJobsPageProps {
  params: Promise<{ lang: string; city: string }>;
}

export default async function CityJobsPage({ params }: CityJobsPageProps) {
  const { lang, city } = await params;

  const cityData = Cities.find((item) => item.href === `/${city}`);
  const cityName = cityData?.cityName ?? city;
  const breadcrumbItems = [
    { name: "Jobs", href: `/${lang}/jobs` },
    { name: cityName, href: `/${lang}/jobs/${city}` },
  ];

  return (
    <div className="bg-white px-4">
      <div className="container mx-auto px-4 py-4">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      {/* <div className="mx-auto max-w-6xl px-4">
        <div className="rounded-2xl md:p-5">
          <div className="rounded-2xl bg-[linear-gradient(90deg,#fbbf24_0%,#fbbf24_19%,#9ca3af_29%,#374151_60%,#374151_80%)] px-5 py-4 text-center md:px-8 md:py-5">
            <h2
              className={`text-xl font-bold leading-tight md:text-2xl lg:text-3xl ${fontPoppins.className}`}
            >
              <span className="text-black">EU Career Serwis -</span>{" "}
              <span className="text-amber-500">
                International Recruitment agency in Poland
              </span>
            </h2>
          </div>
        </div>
        <div className="mt-5 h-px w-full bg-slate-200"></div>
      </div> */}

      <div className="mx-auto max-w-6xl px-4">
        <div className="rounded-2xl md:p-5">
          <div
            className="rounded-2xl px-5 py-4 text-center md:px-8 md:py-5"
            style={{
              background:
                "linear-gradient(90deg, rgba(251,191,36,0.9) 0%, rgba(251,191,36,0.7) 25%, rgba(31,41,55,0.7) 41%, rgba(31,41,55,0.9) 100%)",
            }}
          >
            <h2
              className="text-xl font-bold leading-tight md:text-2xl lg:text-3xl"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              <span style={{ color: "#000" }}>EU Career Serwis -</span>{" "}
              <span style={{ color: "#f59e0b" }}>
                International Recruitment agency in Poland
              </span>
            </h2>
          </div>
        </div>
        <div
          className="mt-5 h-px w-full"
          style={{ backgroundColor: "#e2e8f0" }}
        ></div>
      </div>

      <div className="mx-auto max-w-6xl">
        <section className="p-8">
          <div className="max-w-4xl">
            <span className="inline-flex rounded-full bg-amber-100 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.18em] text-amber-700">
              City Guide
            </span>
            <h1
              className={`mt-5 text-2xl font-bold leading-tight text-slate-900 md:text-3xl ${fontPoppins.className}`}
            >
              {cityName} - Complete Guide for International Workers
            </h1>
            <div className="mt-5 h-1 w-24 rounded-full bg-amber-500"></div>
          </div>

          <div className="mt-10 space-y-6">
            <p
              className={`text-base leading-8 text-slate-600 md:text-lg ${fontInter.className}`}
            >
              {cityName} is one of the fastest-growing cities in eastern Poland
              and is becoming a popular place for international workers. It is
              known for its peaceful way of life, low living costs, historic
              charm, and growing industries. {cityName} gives good job
              opportunities to both blue-collar and white-collar workers.
            </p>

            <p
              className={`text-base leading-8 text-slate-600 md:text-lg ${fontInter.className}`}
            >
              The city has growing factories, logistics centres, food processing
              companies, universities, BPO/SSC centres, and service businesses.
              Because of this, thousands of foreign workers come to {cityName}{" "}
              every year.
            </p>
          </div>

          <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <h2
              className={`text-2xl font-bold text-slate-900 ${fontPoppins.className}`}
            >
              Why Foreign Workers Choose {cityName}
            </h2>

            <div className="mt-6 space-y-4">
              {[
                "Trusted employers who provide legal work permit invitations",
                "Cheaper housing than bigger cities",
                "Regular job opportunities in many industries",
                "A clean and safe place to live",
                "People from different cultures",
                "Good transport links",
                "TRC and PR options for people who want to settle long-term",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="mt-2 inline-flex h-2.5 w-2.5 flex-shrink-0 rounded-full bg-amber-500"></span>
                  <p
                    className={`text-base leading-7 text-slate-700 ${fontInter.className}`}
                  >
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <div>
          <RenderJobs
            whiteCollarTitle={`White Collar Jobs in ${cityName}`}
            blueCollarTitle={`Blue Collar Jobs in ${cityName}`}
          />
        </div>
        <div>
          <RenderFAQ />
        </div>
        <div>
          <RecentTestimonials />
        </div>
      </div>
    </div>
  );
}
