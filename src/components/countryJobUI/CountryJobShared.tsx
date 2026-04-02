"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, type LucideIcon } from "lucide-react";
import { fontInter, fontPoppins } from "@/fonts";

export const cardMotion = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 as const },
  transition: { duration: 0.4, ease: "easeOut" as const },
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

const cardToneClasses = {
  white: "border border-slate-200 bg-white",
  muted: "border border-slate-200 bg-stone-50",
  accent:
    "border border-amber-100 bg-[linear-gradient(135deg,#fffaf0_0%,#ffffff_100%)]",
};

type SectionTitleProps = {
  eyebrow: string;
  title: string;
  description?: string;
  dividerClassName?: string;
};

export function SectionTitle({
  eyebrow,
  title,
  description,
  dividerClassName = "bg-amber-500",
}: SectionTitleProps) {
  return (
    <motion.div
      {...cardMotion}
      className="mx-auto mb-10 max-w-4xl text-center md:mb-12"
    >
      <span className="inline-flex rounded-full bg-gray-100 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.18em] text-[#fac800]">
        {eyebrow}
      </span>
      <h2
        className={`mt-5 text-2xl font-bold leading-tight text-gray-700 md:text-2xl lg:text-3xl ${fontPoppins.className}`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mx-auto mt-4 max-w-3xl text-base leading-8 text-slate-600 md:text-lg ${fontInter.className}`}
        >
          {description}
        </p>
      )}
      <div
        className={`mx-auto mt-5 h-1 w-24 rounded-full ${dividerClassName}`}
      ></div>
    </motion.div>
  );
}

type BulletListProps = {
  items: string[];
  className?: string;
};

export function BulletList({ items, className = "" }: BulletListProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      {items.map((item) => (
        <div key={item} className="flex items-start gap-3">
          <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-[#fac800]" />
          <p
            className={`text-base leading-7 text-slate-600 ${fontInter.className}`}
          >
            {item}
          </p>
        </div>
      ))}
    </div>
  );
}

type FeatureCardGridProps = {
  items: string[];
  icons: LucideIcon[];
  columnsClassName: string;
  tone?: keyof typeof cardToneClasses;
  layout?: "side" | "stacked";
  className?: string;
  itemTextClassName?: string;
};

export function FeatureCardGrid({
  items,
  icons,
  columnsClassName,
  tone = "white",
  layout = "side",
  className,
  itemTextClassName,
}: FeatureCardGridProps) {
  const defaultTextClassName =
    layout === "side"
      ? `text-base leading-7 text-slate-700 ${fontInter.className}`
      : `text-base leading-7 text-slate-700 ${fontInter.className}`;

  return (
    <div className={joinClasses("grid gap-6", columnsClassName, className)}>
      {items.map((item, index) => {
        const Icon = icons[index];

        return (
          <motion.div
            key={item}
            {...cardMotion}
            whileHover={{ y: -4 }}
            className={joinClasses(
              "rounded-3xl p-6 shadow-sm",
              cardToneClasses[tone],
              layout === "side" && "flex items-start gap-4"
            )}
          >
            <div
              className={joinClasses(
                "inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-[#fac800]",
                layout === "side" && "flex-shrink-0",
                layout === "stacked" && "mb-5"
              )}
            >
              <Icon className="h-6 w-6" />
            </div>
            <p className={itemTextClassName ?? defaultTextClassName}>{item}</p>
          </motion.div>
        );
      })}
    </div>
  );
}

type InfoCardProps = {
  title: string;
  icon?: LucideIcon;
  items?: string[];
  children?: ReactNode;
  description?: string;
  tone?: keyof typeof cardToneClasses;
  className?: string;
  bulletListClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
};

export function InfoCard({
  title,
  icon: Icon,
  items,
  children,
  description,
  tone = "white",
  className,
  bulletListClassName = "mt-6",
  titleClassName,
  descriptionClassName,
}: InfoCardProps) {
  return (
    <motion.div
      {...cardMotion}
      whileHover={{ y: -4 }}
      className={joinClasses(
        "rounded-[32px] p-6 shadow-sm md:p-8",
        cardToneClasses[tone],
        className
      )}
    >
      {Icon && (
        <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-[#fac800]">
          <Icon className="h-6 w-6" />
        </div>
      )}
      <h3
        className={
          titleClassName ??
          `text-2xl font-bold text-gray-700 ${fontPoppins.className}`
        }
      >
        {title}
      </h3>
      {description && (
        <p
          className={
            descriptionClassName ??
            `mt-6 text-base leading-8 text-slate-600 ${fontInter.className}`
          }
        >
          {description}
        </p>
      )}
      {children}
      {items && <BulletList items={items} className={bulletListClassName} />}
    </motion.div>
  );
}

type StepListProps = {
  items: string[];
  className?: string;
  itemClassName?: string;
};

export function StepList({
  items,
  className,
  itemClassName = `text-base leading-8 text-slate-600 ${fontInter.className}`,
}: StepListProps) {
  return (
    <div className={joinClasses("space-y-4", className)}>
      {items.map((item) => (
        <motion.div
          key={item}
          {...cardMotion}
          whileHover={{ y: -2 }}
          className="flex items-start gap-3"
        >
          <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-[#fac800]" />
          <p className={itemClassName}>{item}</p>
        </motion.div>
      ))}
    </div>
  );
}

export function NumberStepList({
  items,
  className,
  itemClassName = `text-base leading-8 text-slate-600 ${fontInter.className}`,
}: StepListProps) {
  return (
    <div className={joinClasses("space-y-4", className)}>
      {items.map((item, index) => (
        <motion.div
          key={item}
          {...cardMotion}
          whileHover={{ y: -2 }}
          className="flex items-center gap-3 justify"
        >
          <span className="font-bold text-slate-600">{index + 1}.</span>
          <p className={itemClassName}>{item}</p>
        </motion.div>
      ))}
    </div>
  );
}

type SummaryCardProps = {
  eyebrow: string;
  summary: string;
  className?: string;
};

export function SummaryCard({ eyebrow, summary, className }: SummaryCardProps) {
  return (
    <motion.div
      {...cardMotion}
      whileHover={{ y: -4 }}
      className={joinClasses(
        "rounded-[32px] border border-amber-100 bg-[linear-gradient(135deg,#fffaf0_0%,#ffffff_100%)] p-8 text-center shadow-sm md:p-10",
        className
      )}
    >
      <span className="inline-flex rounded-full bg-gray-100 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.18em] text-[#fac800]">
        {eyebrow}
      </span>
      <p
        className={`mt-6 text-lg leading-8 text-slate-700 md:text-xl ${fontInter.className}`}
      >
        {summary}
      </p>
    </motion.div>
  );
}
