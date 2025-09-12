"use client";
import React from "react";
import RecruiterInfo from "./RecruiterInfo";
import { StepWork } from "../work/StepWork";
import { useTranslations } from "next-intl";

export function RecruiterContent() {
  const tStep1 = useTranslations("recruiter.step1");
  const tStep2 = useTranslations("recruiter.step2");
  const tStep3 = useTranslations("recruiter.step3");
  const tStep4 = useTranslations("recruiter.step4");
  const tStep5 = useTranslations("recruiter.step5");
  const tStep6 = useTranslations("recruiter.step6");
  const tStep7 = useTranslations("recruiter.step7");
  const tStep8 = useTranslations("recruiter.step8");
  return (
    <div>
      <RecruiterInfo />
      {/* Step 1 */}
      <StepWork
        image="https://ik.imagekit.io/eucareerserwis/Recruiter/partnering%20Recruiter.webp"
        imageAlt={tStep1("imageAlt")}
        heading={tStep1("heading")}
        paragraph1={tStep1("paragraph1")}
        paragraph2={tStep1("paragraph2")}
        paragraph3={tStep1("paragraph3")}
        paragraph4={tStep1("paragraph4")}
      />
      {/* Step 2 */}
      <StepWork
        image="https://ik.imagekit.io/eucareerserwis/Recruiter/B2B2C.webp"
        imageAlt={tStep2("imageAlt")}
        heading={tStep2("heading")}
        paragraph1={tStep2("paragraph1")}
        paragraph2={tStep2("paragraph2")}
        paragraph3={tStep2("paragraph3")}
        paragraph4={tStep2("paragraph4")}
        isReversed={true}
      />
      {/* Step 3 */}
      <StepWork
        image="https://ik.imagekit.io/eucareerserwis/Recruiter/Recruitment%20ally.webp"
        imageAlt={tStep3("imageAlt")}
        heading={tStep3("heading")}
        paragraph1={tStep3("paragraph1")}
        paragraph2={tStep3("paragraph2")}
        paragraph3={tStep3("paragraph3")}
        paragraph4={tStep3("paragraph4")}
      />
      {/* Step 4 */}
      <StepWork
        image="https://ik.imagekit.io/eucareerserwis/Recruiter/Value%20and%20partner.webp"
        imageAlt={tStep4("imageAlt")}
        heading={tStep4("heading")}
        paragraph1={tStep4("paragraph1")}
        paragraph2={tStep4("paragraph2")}
        paragraph3={tStep4("paragraph3")}
        paragraph4={tStep4("paragraph4")}
        isReversed={true}
      />
      {/* Step 5 */}
      <StepWork
        image="https://ik.imagekit.io/eucareerserwis/Recruiter/Compilance%20legal,%20permt.webp"
        imageAlt={tStep5("imageAlt")}
        heading={tStep5("heading")}
        paragraph1={tStep5("paragraph1")}
        paragraph2={tStep5("paragraph2")}
        paragraph3={tStep5("paragraph3")}
        paragraph4={tStep5("paragraph4")}
      />
      {/* Step 6 */}
      <StepWork
        image="https://ik.imagekit.io/eucareerserwis/Recruiter/Certified%20recruitment.webp"
        imageAlt={tStep6("imageAlt")}
        heading={tStep6("heading")}
        paragraph1={tStep6("paragraph1")}
        paragraph2={tStep6("paragraph2")}
        paragraph3={tStep6("paragraph3")}
        paragraph4={tStep6("paragraph4")}
        isReversed={true}
      />
      {/* Step 7 */}
      <StepWork
        image="https://ik.imagekit.io/eucareerserwis/Recruiter/expand%20your%20reach.webp"
        imageAlt={tStep7("imageAlt")}
        heading={tStep7("heading")}
        paragraph1={tStep7("paragraph1")}
        paragraph2={tStep7("paragraph2")}
        paragraph3={tStep7("paragraph3")}
        paragraph4={tStep7("paragraph4")}
      />
      {/* Step 8 */}
      <StepWork
        image="https://ik.imagekit.io/eucareerserwis/Recruiter/Ethical%20recruitment%20process.webp"
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
