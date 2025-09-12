"use client";
import React from "react";
import EmployerInfo from "./EmployerInfo";
import { useTranslations } from "next-intl";
import { StepWork } from "../work/StepWork";

export function EmployerContent() {
  const tStep1 = useTranslations("employer.step1");
  const tStep2 = useTranslations("employer.step2");
  const tStep3 = useTranslations("employer.step3");
  const tStep4 = useTranslations("employer.step4");
  const tStep5 = useTranslations("employer.step5");
  const tStep6 = useTranslations("employer.step6");
  const tStep7 = useTranslations("employer.step7");
  const tStep8 = useTranslations("employer.step8");

  return (
    <div>
      <EmployerInfo />
      {/* step 1 */}
      <StepWork
        image="https://ik.imagekit.io/eucareerserwis/employer/polish%20employer.webp"
        imageAlt={tStep1("imageAlt")}
        heading={tStep1("heading")}
        paragraph1={tStep1("paragraph1")}
        paragraph2={tStep1("paragraph2")}
        paragraph3={tStep1("paragraph3")}
        paragraph4={tStep1("paragraph4")}
      />
      {/* step 2 */}
      <StepWork
        image="https://ik.imagekit.io/eucareerserwis/employer/recruitment%20standsrd.webp"
        imageAlt={tStep2("imageAlt")}
        heading={tStep2("heading")}
        paragraph1={tStep2("paragraph1")}
        paragraph2={tStep2("paragraph2")}
        paragraph3={tStep2("paragraph3")}
        paragraph4={tStep2("paragraph4")}
        isReversed={true}
      />
      {/* step 3 */}
      <StepWork
        image="https://ik.imagekit.io/eucareerserwis/employer/workforce%20category%20available.webp"
        imageAlt={tStep3("imageAlt")}
        heading={tStep3("heading")}
        paragraph1={tStep3("paragraph1")}
        paragraph2={tStep3("paragraph2")}
        paragraph3={tStep3("paragraph3")}
        paragraph4={tStep3("paragraph4")}
      />
      {/* step 4 */}
      <StepWork
        image="https://ik.imagekit.io/eucareerserwis/employer/make%20an%20impact.webp"
        imageAlt={tStep4("imageAlt")}
        heading={tStep4("heading")}
        paragraph1={tStep4("paragraph1")}
        paragraph2={tStep4("paragraph2")}
        paragraph3={tStep4("paragraph3")}
        paragraph4={tStep4("paragraph4")}
        isReversed={true}
      />
      {/* step 5 */}
      <StepWork
        image="https://ik.imagekit.io/eucareerserwis/employer/hiring%20journey.webp"
        imageAlt={tStep5("imageAlt")}
        heading={tStep5("heading")}
        paragraph1={tStep5("paragraph1")}
        paragraph2={tStep5("paragraph2")}
        paragraph3={tStep5("paragraph3")}
        paragraph4={tStep5("paragraph4")}
      />
      {/* step 6 */}
      <StepWork
        image="https://ik.imagekit.io/eucareerserwis/employer/across%20region.webp"
        imageAlt={tStep6("imageAlt")}
        heading={tStep6("heading")}
        paragraph1={tStep6("paragraph1")}
        paragraph2={tStep6("paragraph2")}
        paragraph3={tStep6("paragraph3")}
        paragraph4={tStep6("paragraph4")}
        isReversed={true}
      />
      {/* step 7 */}
      <StepWork
        image="https://ik.imagekit.io/eucareerserwis/employer/partnership.webp"
        imageAlt={tStep7("imageAlt")}
        heading={tStep7("heading")}
        paragraph1={tStep7("paragraph1")}
        paragraph2={tStep7("paragraph2")}
        paragraph3={tStep7("paragraph3")}
        paragraph4={tStep7("paragraph4")}
      />
      {/* step 8 */}
      <StepWork
        image="https://ik.imagekit.io/eucareerserwis/employer/whyeu.webp"
        imageAlt={tStep8("imageAlt")}
        heading={tStep8("heading")}
        paragraph1={tStep8("paragraph1")}
        paragraph2={tStep8("paragraph2")}
        paragraph3={tStep8("paragraph3")}
        paragraph4={tStep8("paragraph4")}
        isReversed={true}
      />
    </div>
  );
}
