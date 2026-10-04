"use client";

import { useId } from "react";
import { ArrowRight, Check, Plane, ShieldCheck } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";
import { fontInter } from "@/fonts";
import { delay, RISE_ON_REVEAL } from "@/lib/animation";
import { cn } from "@/lib/utils";
import { BUTTON_ARROW, PRIMARY_BUTTON } from "./JobsHero";
import { SectionIntro } from "./SectionIntro";
import { formatEuro } from "./standard";
import type { CountryJobs } from "./types";

// Each part of the price has its colour, in the bar and beside it in the list
const PART_COLOURS = ["bg-brand", "bg-neutral-950", "bg-neutral-400"];

interface PricingProps {
  country: CountryJobs;
  /** Scrolls to the application form */
  onApply: () => void;
}

/**
 * The price: the total, a bar split into the parts, and when each part is paid. Beside
 * it, why to choose us. The bar's parts grow in one after another.
 */
export function Pricing({ country, onApply }: PricingProps) {
  const { payments, paymentNote, whyUs } = country;
  const titleId = useId();
  const total = payments.reduce((sum, payment) => sum + payment.amount, 0);
  const [ref, reveal] = useReveal<HTMLDivElement>();
  const [whyRef, whyReveal] = useReveal<HTMLDivElement>();

  return (
    <section
      id="pricing"
      aria-labelledby={titleId}
      className="scroll-mt-20 bg-white py-20 sm:py-24"
    >
      <div className="mx-auto w-full max-w-7xl px-4">
        <SectionIntro
          id={titleId}
          eyebrow="Our pricing"
          title={`One clear price, paid in ${payments.length} parts`}
          description="All payments are in euros. Each part is due at a set point of your application, so you always know what comes next."
        />

        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-12">
          <div
            ref={ref}
            data-reveal={reveal}
            className={cn(
              "rounded-[2rem] bg-white p-7 ring-1 ring-black/10 sm:p-10 lg:col-span-7",
              RISE_ON_REVEAL
            )}
          >
            <p className="text-sm font-semibold tracking-[0.18em] text-neutral-500 uppercase">
              Total charge
            </p>
            <p className="mt-2 text-6xl font-semibold tracking-tight text-neutral-950 tabular-nums sm:text-7xl">
              {formatEuro(total)}
            </p>

            {/* The parts, in proportion */}
            <div aria-hidden className="mt-8 flex h-3 gap-1">
              {payments.map((payment, index) => (
                <span
                  key={index}
                  className={cn(
                    "h-full origin-left rounded-full reveal-waiting:scale-x-0 reveal-shown:animate-grow-x motion-reduce:animate-none",
                    PART_COLOURS[index % PART_COLOURS.length]
                  )}
                  style={{
                    flexGrow: payment.amount,
                    ...delay(250 + index * 180),
                  }}
                />
              ))}
            </div>

            <ol className="mt-8 divide-y divide-neutral-100">
              {payments.map((payment, index) => (
                <li
                  key={index}
                  className={cn(
                    "grid grid-cols-[auto_minmax(0,1fr)_auto] items-baseline gap-x-4 py-5 first:pt-0 last:pb-0",
                    RISE_ON_REVEAL
                  )}
                  style={delay(300 + index * 100)}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "size-2.5 translate-y-[-0.1em] rounded-full",
                      PART_COLOURS[index % PART_COLOURS.length]
                    )}
                  />
                  <span className="min-w-0">
                    <span className="block text-xs font-semibold tracking-[0.18em] text-neutral-500 uppercase">
                      Part {index + 1}
                    </span>
                    <span className="mt-1 block font-semibold text-pretty text-neutral-950">
                      {payment.when}
                    </span>
                  </span>
                  <span className="text-xl font-semibold text-neutral-950 tabular-nums">
                    {formatEuro(payment.amount)}
                  </span>
                  {payment.description && (
                    <span
                      className={cn(
                        "col-start-2 col-end-4 mt-2 text-[15px] leading-relaxed text-pretty text-neutral-600",
                        fontInter.className
                      )}
                    >
                      {payment.description}
                    </span>
                  )}
                </li>
              ))}
            </ol>

            {paymentNote && (
              <p
                className={cn(
                  "mt-8 flex items-start gap-3 rounded-2xl bg-brand-soft/70 px-5 py-4 leading-relaxed text-neutral-800 ring-1 ring-brand/30 ring-inset",
                  fontInter.className,
                  RISE_ON_REVEAL
                )}
                style={delay(300 + payments.length * 100)}
              >
                <Plane
                  aria-hidden
                  className="mt-1 size-4 shrink-0 text-neutral-950"
                />
                <span>
                  <strong className="font-semibold text-neutral-950">
                    Flight included.
                  </strong>{" "}
                  {paymentNote}
                </span>
              </p>
            )}
          </div>

          <div
            ref={whyRef}
            data-reveal={whyReveal}
            className={cn(
              "flex flex-col rounded-[2rem] bg-neutral-950 p-7 text-white sm:p-10 lg:col-span-5",
              RISE_ON_REVEAL
            )}
            style={delay(120)}
          >
            <span className="grid size-12 place-items-center rounded-2xl bg-brand text-neutral-950">
              <ShieldCheck aria-hidden className="size-5" />
            </span>
            <h3 className="mt-6 text-2xl font-semibold text-balance">
              Why choose EU Career Serwis?
            </h3>
            <ul className={cn("mt-7 space-y-4", fontInter.className)}>
              {whyUs.map((reason, index) => (
                <li
                  key={reason}
                  className={cn(
                    "flex items-start gap-3 leading-snug text-white/80",
                    RISE_ON_REVEAL
                  )}
                  style={delay(220 + index * 50)}
                >
                  <Check
                    aria-hidden
                    strokeWidth={2.5}
                    className="mt-[0.15em] size-4 shrink-0 text-brand"
                  />
                  <span className="text-pretty">{reason}</span>
                </li>
              ))}
            </ul>
            {/* At the card's foot, however long the price beside it */}
            <div className="mt-auto pt-10">
              <a
                href="#apply"
                onClick={(event) => {
                  event.preventDefault();
                  onApply();
                }}
                className={cn(
                  PRIMARY_BUTTON,
                  "w-full focus-visible:ring-brand focus-visible:ring-offset-neutral-950"
                )}
              >
                Start your application
                <ArrowRight aria-hidden className={BUTTON_ARROW} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
