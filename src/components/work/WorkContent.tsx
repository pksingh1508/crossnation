"use client";

import { useTranslations } from "next-intl";
import { StepWork } from "@/components/work/StepWork";
import { GovernmentLinks } from "@/components/sections/GovernmentLinks";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Inspiration } from "@/components/sections/Inspiration";

export function WorkContent() {
  const tPoland = useTranslations("works.steps.poland");
  const tStep1 = useTranslations("works.steps.step1");
  const tStep2 = useTranslations("works.steps.step2");
  const tStep3 = useTranslations("works.steps.step3");

  return (
    <>
      {/* Step - 0 */}
      <StepWork
        image="/work-in-poland.webp"
        imageAlt={tPoland("imageAlt")}
        heading={tPoland("heading")}
        paragraph1={tPoland("paragraph1")}
        paragraph2={tPoland("paragraph2")}
        paragraph3={tPoland("paragraph3")}
        paragraph4={tPoland("paragraph4")}
      />
      {/* Step - 1 */}
      <StepWork
        image="/poland-work-permit-1.webp"
        imageAlt={tStep1("imageAlt")}
        heading={tStep1("heading")}
        paragraph1={tStep1("paragraph1")}
        paragraph2={tStep1("paragraph2")}
        paragraph3={tStep1("paragraph3")}
        paragraph4={tStep1("paragraph4")}
        isReversed={true}
      />
      {/* Step - 2 */}
      <StepWork
        image="/poland-employer-2.webp"
        imageAlt={tStep2("imageAlt")}
        heading={tStep2("heading")}
        paragraph1={tStep2("paragraph1")}
        paragraph2={tStep2("paragraph2")}
        paragraph3={tStep2("paragraph3")}
        paragraph4={tStep2("paragraph4")}
      />
      {/* Step - 3 */}
      <StepWork
        image="/poland-work-3.webp"
        imageAlt={tStep3("imageAlt")}
        heading={tStep3("heading")}
        paragraph1={tStep3("paragraph1")}
        paragraph2={tStep3("paragraph2")}
        paragraph3={tStep3("paragraph3")}
        paragraph4={tStep3("paragraph4")}
        isReversed={true}
      />

      {/* Inspiration Section */}
      <Inspiration />

      {/* Why Choose Us Section */}
      <WhyChooseUs />

      {/* Government Links Section */}
      <GovernmentLinks />
    </>
  );
}
