"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { Check, Copy, CopyCheck, Info, Landmark } from "lucide-react";
import { useTranslations } from "@/hooks/useTranslations";
import { useReveal } from "@/hooks/useReveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { WordReveal } from "@/components/ui/word-reveal";
import { fontInter } from "@/fonts";
import { delay, RISE_ON_REVEAL } from "@/lib/animation";
import { countryName } from "@/lib/country-name";
import { cn } from "@/lib/utils";

// The company's account, for paying by bank transfer
const ACCOUNT = {
  owner: "EU CAREER SERWIS SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ",
  currency: "EUR",
  iban: "PL37109018830000000165497132",
  swift: "WBKPPLPP",
  bankName: "Santander Bank Polska S.A.",
  bankAddress: "al. Jana Pawła II 17, 00-854 Warsaw",
};

/** PL37 1090 1883 …: an IBAN in groups of four, as it is usually written */
const groupIban = (iban: string) => iban.replace(/(.{4})(?=.)/g, "$1 ");

/** Puts text on the clipboard; without the clipboard API, through a hidden text box */
async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const box = document.createElement("textarea");
    box.value = text;
    box.setAttribute("readonly", "");
    box.style.position = "fixed";
    box.style.opacity = "0";
    document.body.appendChild(box);
    box.select();
    const copied = document.execCommand("copy");
    box.remove();
    return copied;
  }
}

/**
 * Paying by bank transfer instead: the company's account on a dark card. Every detail
 * has a button that copies it (the IBAN without its spaces), and one copies them all at
 * once. A copy is confirmed on the button for two seconds, and read out to screen
 * readers.
 */
export function BankDetails() {
  const t = useTranslations("bookAppointment");
  const locale = useLocale();
  const titleId = useId();
  const [ref, reveal] = useReveal<HTMLElement>();
  /** The detail just copied, or "all" */
  const [copied, setCopied] = useState<string | null>(null);
  const timer = useRef<number>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  // The IBAN leads; the rest in the order a transfer form asks for them
  const details = [
    { key: "iban", value: ACCOUNT.iban, shown: groupIban(ACCOUNT.iban) },
    { key: "owner", value: ACCOUNT.owner },
    { key: "swift", value: ACCOUNT.swift },
    { key: "currency", value: ACCOUNT.currency },
    { key: "bankName", value: ACCOUNT.bankName },
    { key: "country", value: countryName(locale) },
    { key: "bankAddress", value: ACCOUNT.bankAddress },
  ];
  const [iban, ...rest] = details;
  const label = (key: string) => t(`fields.${key}`);

  const copy = async (key: string, text: string) => {
    if (!(await copyText(text))) return;
    setCopied(key);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(null), 2000);
  };

  const everything = details
    .map(({ key, value }) => `${label(key)}: ${value}`)
    .join("\n");

  return (
    <section
      ref={ref}
      id="bank-details"
      data-reveal={reveal}
      aria-labelledby={titleId}
      className="mx-auto grid w-full max-w-7xl scroll-mt-28 grid-cols-1 gap-10 px-4 pt-16 pb-20 sm:pt-20 sm:pb-24 lg:grid-cols-12 lg:gap-16"
    >
      <div className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
        <Eyebrow>{t("bankEyebrow")}</Eyebrow>
        <h2
          id={titleId}
          className="mt-5 text-[min(2rem,8.5vw)] leading-[1.1] font-semibold tracking-tight text-balance text-neutral-950 sm:text-4xl"
        >
          <WordReveal
            text={t("bankTitle")}
            delay={100}
            stagger={50}
            className="reveal-waiting:translate-y-[125%] reveal-shown:animate-word motion-reduce:animate-none"
          />
        </h2>
        <p
          className={cn(
            "mt-5 text-lg leading-relaxed text-pretty text-neutral-600",
            fontInter.className,
            RISE_ON_REVEAL
          )}
          style={delay(300)}
        >
          {t("bankText")}
        </p>
        <p
          className={cn(
            "mt-6 flex items-start gap-3 rounded-2xl bg-brand-soft/70 px-4 py-3.5 text-[15px] leading-relaxed text-neutral-800 ring-1 ring-brand/30 ring-inset",
            fontInter.className,
            RISE_ON_REVEAL
          )}
          style={delay(400)}
        >
          <Info aria-hidden className="mt-1 size-4 shrink-0 text-neutral-950" />
          {t("bankNote")}
        </p>
      </div>

      <div className="lg:col-span-7">
        {/* The card wipes open from the bottom */}
        <div
          className="relative isolate overflow-hidden rounded-[2rem] bg-neutral-950 p-6 text-white reveal-waiting:[clip-path:inset(100%_0_0_0)] reveal-shown:animate-reveal motion-reduce:animate-none sm:p-9"
          style={delay(150)}
        >
          {/* A soft yellow light from the top corner */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_100%_0%,rgb(254_204_0/0.14),transparent_55%)]"
          />

          <div
            className={cn("flex items-center gap-3", RISE_ON_REVEAL)}
            style={delay(400)}
          >
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand text-neutral-950">
              <Landmark aria-hidden className="size-5" />
            </span>
            <p className="font-semibold">{ACCOUNT.bankName}</p>
          </div>

          {/* The IBAN, large, on a line of its own below its label and button; the
              button copies it without the spaces */}
          <div
            className={cn("mt-8 border-b border-white/10 pb-8", RISE_ON_REVEAL)}
            style={delay(480)}
          >
            <div className="flex items-center justify-between gap-4">
              <p className="text-xs font-semibold tracking-[0.18em] text-white/50 uppercase">
                {label(iban.key)}
              </p>
              <CopyButton
                label={label(iban.key)}
                copied={copied === iban.key}
                onCopy={() => copy(iban.key, iban.value)}
                showText
              />
            </div>
            <p className="mt-3 font-mono text-xl leading-snug tracking-wide text-pretty sm:text-2xl">
              {iban.shown}
            </p>
          </div>

          <dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
            {rest.map(({ key, value }, index) => (
              <div
                key={key}
                className={cn(
                  "flex min-w-0 items-start justify-between gap-3",
                  // The long ones take the whole row
                  (key === "owner" || key === "bankAddress") && "sm:col-span-2",
                  RISE_ON_REVEAL
                )}
                style={delay(540 + index * 60)}
              >
                <div className="min-w-0">
                  <dt className="text-xs font-semibold tracking-[0.18em] text-white/50 uppercase">
                    {label(key)}
                  </dt>
                  <dd
                    className={cn(
                      "mt-1.5 leading-snug wrap-break-word text-white/90",
                      key === "swift"
                        ? "font-mono tracking-wide"
                        : fontInter.className
                    )}
                  >
                    {value}
                  </dd>
                </div>
                <CopyButton
                  label={label(key)}
                  copied={copied === key}
                  onCopy={() => copy(key, value)}
                />
              </div>
            ))}
          </dl>

          <div
            className={cn("mt-8 border-t border-white/10 pt-6", RISE_ON_REVEAL)}
            style={delay(980)}
          >
            <button
              type="button"
              onClick={() => copy("all", everything)}
              className={cn(
                "inline-flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition-[background-color,color,box-shadow] duration-300 outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 sm:w-auto",
                copied === "all"
                  ? "bg-brand text-neutral-950"
                  : "bg-white/10 text-white ring-1 ring-white/15 hover:bg-white/15"
              )}
            >
              {copied === "all" ? (
                <Check
                  aria-hidden
                  className="size-4 animate-pop motion-reduce:animate-none"
                />
              ) : (
                <CopyCheck aria-hidden className="size-4" />
              )}
              {copied === "all" ? t("copiedAll") : t("copyAll")}
            </button>
          </div>
        </div>

        {/* Says what was copied, for screen readers */}
        <p aria-live="polite" className="sr-only">
          {copied === "all"
            ? t("copiedAll")
            : copied
              ? t("copied", { field: label(copied) })
              : ""}
        </p>
      </div>
    </section>
  );
}

interface CopyButtonProps {
  /** The detail it copies, for its name: "Copy IBAN" */
  label: string;
  copied: boolean;
  onCopy: () => void;
  /** Says "Copy" beside the icon, not only to screen readers */
  showText?: boolean;
}

/** A round button that copies a detail; for two seconds after, it shows a yellow tick */
function CopyButton({
  label,
  copied,
  onCopy,
  showText = false,
}: CopyButtonProps) {
  const t = useTranslations("bookAppointment");
  return (
    <button
      type="button"
      onClick={onCopy}
      aria-label={t("copy", { field: label })}
      className={cn(
        "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full text-sm font-semibold transition-[background-color,color,box-shadow] duration-300 outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950",
        showText ? "min-h-11 px-5" : "size-10",
        copied
          ? "bg-brand text-neutral-950"
          : "text-white/70 ring-1 ring-white/15 hover:bg-white/10 hover:text-white"
      )}
    >
      {copied ? (
        <Check
          aria-hidden
          className="size-4 animate-pop motion-reduce:animate-none"
        />
      ) : (
        <Copy aria-hidden className="size-4" />
      )}
      {showText && (
        <span aria-hidden>{copied ? t("copiedShort") : t("copyShort")}</span>
      )}
    </button>
  );
}
