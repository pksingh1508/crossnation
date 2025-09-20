"use client";

import { useTranslations } from "next-intl";
import { StepWork } from "@/components/work/StepWork";
import { GovernmentLinks } from "@/components/sections/GovernmentLinks";
import WorkInfo from "./WorkInfo";
import { RecentTestimonials } from "../sections/RecentTestimonials";
import { RecentBlog } from "../sections/RecentBlog";
import { NewsSection } from "../immigration_faq/NewsSection";

export function WorkContent() {
  const tPoland = useTranslations("works.steps.poland");
  const tStep1 = useTranslations("works.steps.step1");
  const tStep2 = useTranslations("works.steps.step2");
  const tStep3 = useTranslations("works.steps.step3");
  const tStep4 = useTranslations("works.steps.step4");
  const tStep5 = useTranslations("works.steps.step5");

  return (
    <>
      {/* Step - 0 */}
      <StepWork
        image="https://ik.imagekit.io/eucareerserwis/work/apply%20work%20permmit.webp"
        imageAlt={tPoland("imageAlt")}
        heading={tPoland("heading")}
        paragraph1={tPoland("paragraph1")}
        paragraph2={tPoland("paragraph2")}
        paragraph3={tPoland("paragraph3")}
        paragraph4={tPoland("paragraph4")}
      />
      {/* work info step */}
      <WorkInfo />

      {/* Step - 1 */}
      <StepWork
        image="https://ik.imagekit.io/eucareerserwis/employer/document%20prepare.webp"
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
        image="https://ik.imagekit.io/eucareerserwis/work/work%202.webp"
        imageAlt={tStep2("imageAlt")}
        heading={tStep2("heading")}
        paragraph1={tStep2("paragraph1")}
        paragraph2={tStep2("paragraph2")}
        paragraph3={tStep2("paragraph3")}
        paragraph4={tStep2("paragraph4")}
      />
      {/* Step - 3 */}
      <StepWork
        image="https://ik.imagekit.io/eucareerserwis/work/work%203.webp"
        imageAlt={tStep3("imageAlt")}
        heading={tStep3("heading")}
        paragraph1={tStep3("paragraph1")}
        paragraph2={tStep3("paragraph2")}
        paragraph3={tStep3("paragraph3")}
        paragraph4={tStep3("paragraph4")}
        isReversed={true}
      />
      {/* Step - 4 */}
      <StepWork
        image="https://ik.imagekit.io/eucareerserwis/work/work%204.webp"
        imageAlt={tStep4("imageAlt")}
        heading={tStep4("heading")}
        paragraph1={tStep4("paragraph1")}
        paragraph2={tStep4("paragraph2")}
        paragraph3={tStep4("paragraph3")}
        paragraph4={tStep4("paragraph4")}
      />
      {/* Step - 5 */}
      <StepWork
        image="https://ik.imagekit.io/eucareerserwis/work/work%205.webp"
        imageAlt={tStep5("imageAlt")}
        heading={tStep5("heading")}
        paragraph1={tStep5("paragraph1")}
        paragraph2={tStep5("paragraph2")}
        paragraph3={tStep5("paragraph3")}
        paragraph4={tStep5("paragraph4")}
        isReversed={true}
      />

      <RecentTestimonials />
      <RecentBlog />
      <NewsSection />
      {/* Government Links Section */}
      <GovernmentLinks />
    </>
  );
}
