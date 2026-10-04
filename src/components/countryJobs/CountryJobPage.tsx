"use client";

import { useState } from "react";
import { MotionConfig } from "framer-motion";
import { useGoToSection } from "@/hooks/useGoToSection";
import { RecentTestimonials } from "@/components/sections/RecentTestimonials";
import { fontPoppins } from "@/fonts";
import { cn } from "@/lib/utils";
import { ApplicationSteps } from "./ApplicationSteps";
import { ApplySection } from "./ApplySection";
import { CompanyFAQ } from "./CompanyFAQ";
import { COUNTRY_JOBS, type CountrySlug } from "./countries";
import { JobsHero } from "./JobsHero";
import { LandingFooter } from "./LandingFooter";
import { HEADER_HEIGHT, LandingHeader } from "./LandingHeader";
import { LivingInCountry } from "./LivingInCountry";
import { OpenRoles } from "./OpenRoles";
import { Pricing } from "./Pricing";
import { ProcessingTimes } from "./ProcessingTimes";
import { SupportServices } from "./SupportServices";
import { WhyCountry } from "./WhyCountry";

/**
 * A country's jobs page: a landing page of its own, without the site's navigation. It
 * answers a candidate's questions in turn (which jobs, why there, how, how long, how
 * much, who we are) and every "Apply" leads to the form at the end. A job chosen from the
 * list goes with the enquiry.
 */
export function CountryJobPage({ country: slug }: { country: CountrySlug }) {
  const country = COUNTRY_JOBS[slug];
  const [role, setRole] = useState<string>();
  const goTo = useGoToSection(HEADER_HEIGHT + 16);

  /** Scrolls to the form; with a job, for that job */
  const apply = (job?: string) => {
    if (job) setRole(job);
    goTo("apply");
  };

  return (
    <MotionConfig reducedMotion="user">
      <div
        className={cn(
          "flex min-h-svh flex-col bg-white",
          fontPoppins.className
        )}
      >
        <LandingHeader country={country} onApply={() => apply()} />

        <main className="flex-1">
          <JobsHero country={country} onApply={() => apply()} />
          <OpenRoles country={country} onApply={apply} />
          <WhyCountry country={country} />
          <ApplicationSteps country={country} onApply={() => apply()} />
          {country.processing && (
            <ProcessingTimes processing={country.processing} />
          )}
          <Pricing country={country} onApply={() => apply()} />
          {country.services && <SupportServices services={country.services} />}
          {country.living && (
            <LivingInCountry living={country.living} place={country.place} />
          )}
          <CompanyFAQ />
          <RecentTestimonials />
          <ApplySection
            country={country}
            role={role}
            onClearRole={() => setRole(undefined)}
          />
        </main>

        <LandingFooter />
      </div>
    </MotionConfig>
  );
}
