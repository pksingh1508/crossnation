"use client";
import React from "react";
import JobseekerInfo from "./JobseekerInfo";
import { StepWorkBulletPoint } from "../sections/StepWorkBulletPoint";
import { useTranslations } from "next-intl";

export function JobseekerContent() {
  const tStep1 = useTranslations("jobseeker.step1");
  const tStep2 = useTranslations("jobseeker.step2");
  const tStep3 = useTranslations("jobseeker.step3");
  const tStep4 = useTranslations("jobseeker.step4");
  const tStep5 = useTranslations("jobseeker.step5");
  const tStep6 = useTranslations("jobseeker.step6");
  const tStep7 = useTranslations("jobseeker.step7");
  return (
    <div>
      <JobseekerInfo />
      {/* step 1 */}
      <StepWorkBulletPoint
        image="https://ik.imagekit.io/eucareerserwis/JobSeeker/Why%20job%20seeker.webp"
        imageAlt={tStep1("heading")}
        heading={tStep1("heading")}
        bullet1={tStep1("bullet1")}
        bullet2={tStep1("bullet2")}
        bullet3={tStep1("bullet3")}
        bullet4={tStep1("bullet4")}
        bullet5={tStep1("bullet5")}
        bullet6={tStep1("bullet6")}
        bullet7={tStep1("bullet7")}
      />
      {/* step 2 */}
      <StepWorkBulletPoint
        image="https://ik.imagekit.io/eucareerserwis/JobSeeker/How%20we%20support.webp"
        imageAlt={tStep2("heading")}
        heading={tStep2("heading")}
        bullet1={tStep2("bullet1")}
        bullet2={tStep2("bullet2")}
        bullet3={tStep2("bullet3")}
        bullet4={tStep2("bullet4")}
        bullet5={tStep2("bullet5")}
        bullet6={tStep2("bullet6")}
        bullet7={tStep2("bullet7")}
        isReversed={true}
      />
      {/* step 3 */}
      <StepWorkBulletPoint
        image="https://ik.imagekit.io/eucareerserwis/JobSeeker/Who%20can%20apply.webp"
        imageAlt={tStep3("heading")}
        heading={tStep3("heading")}
        bullet1={tStep3("bullet1")}
        bullet2={tStep3("bullet2")}
        bullet3={tStep3("bullet3")}
        bullet4={tStep3("bullet4")}
        bullet5={tStep3("bullet5")}
        bullet6={tStep3("bullet6")}
        bullet7={tStep3("bullet7")}
      />
      {/* step 4 */}
      <StepWorkBulletPoint
        image="https://ik.imagekit.io/eucareerserwis/JobSeeker/hiring%20journey.webp"
        imageAlt={tStep4("heading")}
        heading={tStep4("heading")}
        bullet1={tStep4("bullet1")}
        bullet2={tStep4("bullet2")}
        bullet3={tStep4("bullet3")}
        bullet4={tStep4("bullet4")}
        bullet5={tStep4("bullet5")}
        bullet6={tStep4("bullet6")}
        bullet7={tStep4("bullet7")}
        isReversed={true}
      />
      {/* step 5 */}
      <StepWorkBulletPoint
        image="https://ik.imagekit.io/eucareerserwis/JobSeeker/Licence%20and%20registered%20company.webp"
        imageAlt={tStep5("heading")}
        heading={tStep5("heading")}
        bullet1={tStep5("bullet1")}
        bullet2={tStep5("bullet2")}
        bullet3={tStep5("bullet3")}
        bullet4={tStep5("bullet4")}
        bullet5={tStep5("bullet5")}
        bullet6={tStep5("bullet6")}
        bullet7={tStep5("bullet7")}
      />
      {/* step 6 */}
      <StepWorkBulletPoint
        image="https://ik.imagekit.io/eucareerserwis/JobSeeker/Seamless%20application.webp"
        imageAlt={tStep6("heading")}
        heading={tStep6("heading")}
        bullet1={tStep6("bullet1")}
        bullet2={tStep6("bullet2")}
        bullet3={tStep6("bullet3")}
        bullet4={tStep6("bullet4")}
        bullet5={tStep6("bullet5")}
        bullet6={tStep6("bullet6")}
        bullet7={tStep6("bullet7")}
        isReversed={true}
      />
      {/* step 7 */}
      <StepWorkBulletPoint
        image="https://ik.imagekit.io/eucareerserwis/JobSeeker/Grow%20your%20career.webp"
        imageAlt={tStep7("heading")}
        heading={tStep7("heading")}
        bullet1={tStep7("bullet1")}
        bullet2={tStep7("bullet2")}
        bullet3={tStep7("bullet3")}
        bullet4={tStep7("bullet4")}
        bullet5={tStep7("bullet5")}
        bullet6={tStep7("bullet6")}
        bullet7={tStep7("bullet7")}
      />
    </div>
  );
}
