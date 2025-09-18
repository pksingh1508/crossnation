"use client";
import React from "react";
import { CustomHero } from "../sections/CustomHero";
import { useTranslations } from "@/hooks/useTranslations";

export function HeroCustomSection() {
  const tWork = useTranslations("customHero");
  const tMigrate = useTranslations("customHeroMigrate");
  const tTraineeship = useTranslations("customHeroTraineeship");
  const tStudy = useTranslations("customHeroStudy");
  const tInvestor = useTranslations("customHeroInvestor");
  const tVisit = useTranslations("customHeroVisit");

  const workButtonsData = tWork.raw("buttons") as Array<{ text: string }>;
  const migrateButtonsData = tMigrate.raw("buttons") as Array<{ text: string }>;
  const traineeshipButtonsData = tTraineeship.raw("buttons") as Array<{
    text: string;
  }>;
  const studyButtonsData = tStudy.raw("buttons") as Array<{ text: string }>;
  const investorButtonsData = tInvestor.raw("buttons") as Array<{
    text: string;
  }>;
  const visitButtonsData = tVisit.raw("buttons") as Array<{ text: string }>;

  return (
    <>
      {/* Work Section */}
      <CustomHero
        heading={tWork("heading")}
        paragraph1={tWork("paragraph1")}
        paragraph2={tWork("paragraph2")}
        buttons={workButtonsData}
        imageSrc={"https://ik.imagekit.io/eucareerserwis/home/work.webp"}
        imageAlt={tWork("imageAlt")}
      />

      {/* Migrate Section */}
      <CustomHero
        heading={tMigrate("heading")}
        paragraph1={tMigrate("paragraph1")}
        paragraph2=""
        buttons={migrateButtonsData}
        imageSrc={tMigrate("imageSrc")}
        imageAlt={tMigrate("imageAlt")}
        isReversed={true}
      />

      {/* Traineeship Section */}
      <CustomHero
        heading={tTraineeship("heading")}
        paragraph1={tTraineeship("paragraph1")}
        paragraph2=""
        buttons={traineeshipButtonsData}
        imageSrc={
          "https://ik.imagekit.io/eucareerserwis/home/freepik__expand__51386.webp"
        }
        imageAlt={tTraineeship("imageAlt")}
      />

      {/* Study Section */}
      <CustomHero
        heading={tStudy("heading")}
        paragraph1={tStudy("paragraph1")}
        paragraph2=""
        buttons={studyButtonsData}
        imageSrc={
          "https://ik.imagekit.io/eucareerserwis/home/freepik__expand__33230.webp"
        }
        imageAlt={tStudy("imageAlt")}
        isReversed={true}
      />

      {/* Investor Section */}
      <CustomHero
        heading={tInvestor("heading")}
        paragraph1={tInvestor("paragraph1")}
        paragraph2=""
        buttons={investorButtonsData}
        imageSrc={"https://ik.imagekit.io/eucareerserwis/home/investor.webp"}
        imageAlt={tInvestor("imageAlt")}
      />

      {/* Visit Section */}
      <CustomHero
        heading={tVisit("heading")}
        paragraph1={tVisit("paragraph1")}
        paragraph2=""
        buttons={visitButtonsData}
        imageSrc={
          "https://ik.imagekit.io/eucareerserwis/home/freepik__expand__53435.webp"
        }
        imageAlt={tVisit("imageAlt")}
        isReversed={true}
      />
    </>
  );
}
