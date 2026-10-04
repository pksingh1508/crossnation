"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { ArrowLeft, FileQuestion } from "lucide-react";
import { useTranslations } from "@/hooks/useTranslations";
import { fontInter, fontPoppins } from "@/fonts";
import { delay } from "@/lib/animation";
import { cn } from "@/lib/utils";
import { getLocalizedPath } from "@/lib/locale-paths";

const RISE = "animate-rise motion-reduce:animate-none";

// Shown (with a 404 status) for a slug that is unknown or not published
export default function BlogArticleNotFound() {
  const t = useTranslations("blogsPage");
  const locale = useLocale();

  return (
    <section
      className={cn(
        "flex min-h-[70vh] items-center justify-center bg-white px-4 py-20",
        fontPoppins.className
      )}
    >
      <div className="max-w-md text-center">
        <span
          className={cn(
            "mx-auto grid size-14 place-items-center rounded-2xl bg-brand text-neutral-950 shadow-[0_14px_28px_-12px_rgba(254,204,0,0.9)]",
            RISE
          )}
        >
          <FileQuestion aria-hidden className="size-6" />
        </span>
        <h1
          className={cn(
            "mt-6 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl",
            RISE
          )}
          style={delay(100)}
        >
          {t("notFoundTitle")}
        </h1>
        <p
          className={cn("mt-3 text-neutral-600", fontInter.className, RISE)}
          style={delay(200)}
        >
          {t("notFoundText")}
        </p>
        <Link
          href={getLocalizedPath(locale, "/blog")}
          className={cn(
            "group/back mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-neutral-950 px-6 text-[15px] font-semibold text-white transition-colors duration-300 outline-none hover:bg-brand hover:text-neutral-950 focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2",
            RISE
          )}
          style={delay(300)}
        >
          <ArrowLeft
            aria-hidden
            className="size-4 transition-transform duration-300 ease-out-quint group-hover/back:-translate-x-1"
          />
          {t("backToBlog")}
        </Link>
      </div>
    </section>
  );
}
