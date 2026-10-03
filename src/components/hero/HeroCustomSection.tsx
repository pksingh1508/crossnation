"use client";

import {
  Award,
  BriefcaseBusiness,
  GraduationCap,
  Luggage,
  PlaneTakeoff,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "@/hooks/useTranslations";
import { CustomHero, type Country } from "../sections/CustomHero";

// The services on the home page, in order. The texts and countries are in the messages,
// under the section's key; the photos alternate sides.
const SECTIONS: { key: string; icon: LucideIcon; image: string }[] = [
  {
    key: "customHero",
    icon: BriefcaseBusiness,
    image: "https://ik.imagekit.io/eucareerserwis/home/work.webp",
  },
  {
    key: "customHeroMigrate",
    icon: PlaneTakeoff,
    image:
      "https://ik.imagekit.io/eucareerserwis/euprimeserwis/home/migrate.webp",
  },
  {
    key: "customHeroTraineeship",
    icon: Award,
    image:
      "https://ik.imagekit.io/eucareerserwis/home/freepik__expand__51386.webp",
  },
  {
    key: "customHeroStudy",
    icon: GraduationCap,
    image:
      "https://ik.imagekit.io/eucareerserwis/home/freepik__expand__33230.webp",
  },
  {
    key: "customHeroInvestor",
    icon: TrendingUp,
    image: "https://ik.imagekit.io/eucareerserwis/home/investor.webp",
  },
  {
    key: "customHeroVisit",
    icon: Luggage,
    image:
      "https://ik.imagekit.io/eucareerserwis/home/freepik__expand__53435.webp",
  },
];

export function HeroCustomSection() {
  const t = useTranslations();

  return (
    <>
      {SECTIONS.map(({ key, icon, image }, index) => (
        <CustomHero
          key={key}
          index={index + 1}
          icon={icon}
          heading={t(`${key}.heading`)}
          paragraphs={[`${key}.paragraph1`, `${key}.paragraph2`]
            .filter((paragraph) => t.has(paragraph))
            .map((paragraph) => t(paragraph))}
          countries={t.raw(`${key}.buttons`) as Country[]}
          imageSrc={image}
          imageAlt={t(`${key}.imageAlt`)}
          isReversed={index % 2 === 1}
        />
      ))}
    </>
  );
}
