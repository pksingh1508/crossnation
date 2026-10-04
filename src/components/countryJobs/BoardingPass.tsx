"use client";

import { useId } from "react";
import Flag from "react-country-flag";
import { Plane } from "lucide-react";
import { FLAG_CDN, FLAG_CDN_WIDE } from "@/lib/flags";
import { delay, RISE_ON_REVEAL } from "@/lib/animation";
import { cn } from "@/lib/utils";
import { formatEuro } from "./standard";
import type { CountryJobs, Fact } from "./types";

/** Height of the stub below the perforation; the notches are cut at its top */
const STUB = "6.75rem";

// Two half-circles bitten out of the ticket's sides at the perforation. Each gradient
// covers one half of the ticket, so both can be transparent in their own corner.
const NOTCHES = [
  `radial-gradient(circle 0.875rem at 0 calc(100% - ${STUB}), #0000 98%, #000) left / 51% 100% no-repeat`,
  `radial-gradient(circle 0.875rem at 100% calc(100% - ${STUB}), #0000 98%, #000) right / 51% 100% no-repeat`,
].join(", ");

// The barcode's bars and gaps, in turn, by width; it reads nothing
const BARS = [
  2, 1, 1, 3, 1, 2, 2, 1, 1, 1, 3, 2, 1, 1, 2, 3, 1, 1, 2, 1, 1, 2, 3, 1, 1, 2,
  1, 3, 1, 1, 2, 2, 1, 1, 3,
];
const BAR_X = BARS.map((_, index) =>
  BARS.slice(0, index).reduce((sum, width) => sum + width, 0)
);
const BARCODE_WIDTH = BAR_X.at(-1)! + BARS.at(-1)!;

/** A fact's value longer than this takes the pass's full width */
const LONG_VALUE = 30;

/**
 * How many of the two columns each fact takes. A long value takes both; a short one also
 * does when it would otherwise sit alone in its row, so the grid has no gaps.
 */
function columnSpans(facts: Fact[]) {
  const isLong = (fact?: Fact) => !fact || fact.value.length > LONG_VALUE;
  let column = 0;
  return facts.map((fact, index) => {
    if (isLong(fact) || (column === 0 && isLong(facts[index + 1]))) {
      column = 0;
      return 2;
    }
    column = 1 - column;
    return 1;
  });
}

interface BoardingPassProps {
  country: CountryJobs;
  /** When its entrance starts, in ms after the page appears */
  start: number;
}

/**
 * The jobs at a glance, as a boarding pass from the visitor's country to this one: the
 * terms of the jobs, and the total price on the stub. It rises in tilted, a plane flies
 * along the route, and it straightens under the pointer.
 */
export function BoardingPass({ country, start }: BoardingPassProps) {
  const { name, code, code3, facts, payments } = country;
  const titleId = useId();
  const total = payments.reduce((sum, payment) => sum + payment.amount, 0);
  const spans = columnSpans(facts);

  return (
    <div
      className={cn("relative isolate mx-auto w-full max-w-md", RISE_ON_REVEAL)}
      style={delay(start)}
    >
      {/* A soft glow in the flag's colours */}
      <Flag
        svg
        countryCode={code}
        cdnUrl={FLAG_CDN}
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-[12%] -z-10 rounded-full opacity-40 blur-3xl saturate-150"
        style={{ width: "76%", height: "76%" }}
      />

      {/* The shadow is a filter on this wrapper, so it follows the notches */}
      <div className="drop-shadow-[0_28px_36px_rgba(15,23,42,0.16)] transition-[rotate] duration-700 ease-out-quint motion-safe:rotate-[1.5deg] motion-safe:hover:rotate-0">
        <section
          aria-labelledby={titleId}
          className="overflow-hidden rounded-[1.75rem] bg-white"
          style={{ mask: NOTCHES, WebkitMask: NOTCHES }}
        >
          <h2 id={titleId} className="sr-only">
            {name} jobs at a glance
          </h2>

          <div className="flex items-center justify-between gap-4 bg-neutral-950 px-6 py-3.5 text-[11px] font-semibold tracking-[0.2em] uppercase sm:px-7">
            <span className="flex items-center gap-2 whitespace-nowrap text-white">
              <span aria-hidden className="size-1.5 rounded-full bg-brand" />
              EU Career Serwis
            </span>
            <span className="whitespace-nowrap text-white/55 max-[359px]:hidden">
              Work visa
            </span>
          </div>

          {/* From the visitor's country to this one */}
          <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-6 pt-6 sm:gap-4 sm:px-7">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.18em] text-neutral-500 uppercase">
                From
              </p>
              <p className="mt-1 text-[min(2rem,9vw)] leading-none font-semibold tracking-tight text-neutral-950 sm:text-4xl">
                YOU
              </p>
              <p className="mt-2 text-xs text-neutral-500">Your country</p>
            </div>

            <div
              aria-hidden
              className="relative h-9 [container-type:inline-size]"
            >
              <span
                className="absolute inset-x-0 top-1/2 border-t-2 border-dashed border-neutral-300 reveal-shown:animate-wipe motion-reduce:animate-none"
                style={delay(start + 350)}
              />
              <span
                className="absolute top-1/2 left-1/2 -mt-[1.125rem] -ml-[1.125rem] grid size-9 place-items-center rounded-full bg-brand text-neutral-950 shadow-[0_8px_18px_-8px_rgba(254,204,0,0.9)] ring-4 ring-white reveal-shown:animate-fly motion-reduce:animate-none"
                style={delay(start + 350)}
              >
                <Plane className="size-4 rotate-45" />
              </span>
            </div>

            <div className="text-right">
              <p className="text-[11px] font-semibold tracking-[0.18em] text-neutral-500 uppercase">
                To
              </p>
              <p className="mt-1 text-[min(2rem,9vw)] leading-none font-semibold tracking-tight text-neutral-950 sm:text-4xl">
                {code3}
              </p>
              <p className="mt-2 flex items-center justify-end gap-1.5 text-xs text-neutral-500">
                <Flag
                  svg
                  countryCode={code}
                  cdnUrl={FLAG_CDN_WIDE}
                  alt=""
                  className="rounded-[2px] ring-1 ring-black/10"
                  style={{ width: "1rem", height: "0.75rem" }}
                />
                {name}
              </p>
            </div>
          </div>

          {/* One column on the narrowest phones, two from 360px */}
          <dl className="grid grid-cols-1 gap-x-6 gap-y-5 px-6 pt-7 pb-8 min-[360px]:grid-cols-2 sm:px-7">
            {facts.map((fact, index) => (
              <div
                key={fact.label}
                className={cn(
                  "min-w-0",
                  spans[index] === 2 && "min-[360px]:col-span-2",
                  RISE_ON_REVEAL
                )}
                style={delay(start + 450 + index * 70)}
              >
                <dt className="text-[11px] font-semibold tracking-[0.18em] text-neutral-500 uppercase">
                  {fact.label}
                </dt>
                <dd className="mt-1 leading-snug font-semibold text-pretty text-neutral-950">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>

          {/* The stub, below a perforation between the notches */}
          <div
            className="relative flex items-center justify-between gap-6 px-6 sm:px-7"
            style={{ height: STUB }}
          >
            <span
              aria-hidden
              className="absolute inset-x-6 top-0 border-t-2 border-dashed border-neutral-200"
            />
            <div>
              <p className="text-[11px] font-semibold tracking-[0.18em] text-neutral-500 uppercase">
                Total cost
              </p>
              <p className="mt-1 text-3xl leading-none font-semibold tracking-tight text-neutral-950 tabular-nums">
                {formatEuro(total)}
              </p>
              <p className="mt-1.5 text-xs text-neutral-500">
                Paid in {payments.length} parts
              </p>
            </div>
            <svg
              aria-hidden
              viewBox={`0 0 ${BARCODE_WIDTH} 40`}
              preserveAspectRatio="none"
              className="h-12 w-24 shrink-0 text-neutral-900 sm:w-28"
              fill="currentColor"
            >
              {BARS.map((width, index) =>
                index % 2 === 0 ? (
                  <rect
                    key={index}
                    x={BAR_X[index]}
                    width={width}
                    height={40}
                  />
                ) : null
              )}
            </svg>
          </div>
        </section>
      </div>
    </div>
  );
}
