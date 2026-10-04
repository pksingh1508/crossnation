"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

/*
 * Decorative line art for the home hero, like routes on a map: a dotted yellow route from
 * a dark start, and fine grey arcs. After the heading appears the lines draw themselves
 * in; then the start pulses softly and every 7 seconds something travels the route.
 *
 * From lg up the lines sit behind the whole hero (HeroLines): a dot travels the route to
 * a yellow destination. Below lg, where the photo stands above the heading, the route
 * crosses the band between them (HeroRouteBand), drawn to the band's width: it climbs
 * into the photo's yellow block, and a little plane flies it and lands behind the block.
 *
 * Plain SVG and CSS animations. Each drawing is at its real size (1 unit = 1px), so the
 * lines stay sharp.
 * len: a path's length (getTotalLength(), rounded up), which the draw-in animates; measure
 * it again after changing the path. A path without it is measured by the browser
 * (pathLength 1), as the band's are, since they change with its width.
 */

interface Path {
  d: string;
  len?: number;
}

interface Layout {
  /** Prefix for the SVG ids; must be unique on the page */
  id: string;
  width: number;
  height: number;
  arcs: Path[];
  route: Path;
  /** Where the route starts */
  from: [number, number];
  /** Its yellow destination, where it ends in view */
  to?: [number, number];
  /** What travels the route */
  traveller: "dot" | "plane";
  /** Position, breakpoint and edge fade */
  className: string;
}

// From lg up, centred on the hero like the content. Drawn on the 1440px wide layout:
// heading and cards x 96-672 (heading from y 188), photo x 768-1324 and y 60-700.
const DESKTOP: Layout = {
  id: "hero-lines-lg",
  width: 1440,
  height: 780,
  arcs: [
    // Above the heading and along the top of the photo
    { d: "M-10 220C150 60 520 20 900 22S1380 64 1450 210", len: 1572 },
    // Under the counselling line and the photo
    { d: "M-10 470C230 760 900 810 1450 610", len: 1543 },
  ],
  // From the bottom left, up the gap between the cards and the photo
  route: {
    d: "M300 690C540 690 700 540 712 340C718 240 722 160 726 110",
    len: 833,
  },
  from: [300, 690],
  to: [726, 110],
  traveller: "dot",
  className:
    "top-1/2 left-1/2 -translate-1/2 [mask-image:radial-gradient(ellipse_at_center,black_65%,transparent_100%)]",
};

/** The band between the photo and the heading below lg, in px */
const BAND_HEIGHT = 80;

/** Below lg the photo and the text share a column: at most 36rem (max-w-xl), with the
 * page's 1rem side padding (px-4) */
const COLUMN = { max: 576, padding: 16 };

/**
 * The band's drawing at a given width; y 0 is the bottom of the photo's yellow block.
 * The route sets off above the heading's first word, dips, then climbs to the right into
 * the yellow block, ending out of sight behind it (the photo is painted over the band).
 * The route keeps to the content's column; the grey arc runs the band's whole width,
 * falling the other way from behind the photo's left corner and crossing the route.
 */
function bandLayout(width: number): Layout {
  const h = BAND_HEIGHT;
  const column = Math.min(width - 2 * COLUMN.padding, COLUMN.max);
  const left = (width - column) / 2;
  // "x y" at fractions of the column's width (or the band's) and the band's height
  const inColumn = (x: number, y: number) =>
    `${Math.round(left + column * x)} ${Math.round(h * y)}`;
  const inBand = (x: number, y: number) =>
    `${Math.round(width * x)} ${Math.round(h * y)}`;
  const from: [number, number] = [
    Math.round(left + column * 0.04),
    Math.round(h * 0.6),
  ];

  return {
    id: "hero-lines-band",
    width,
    height: h,
    arcs: [
      {
        d: `M${inBand(-0.03, -0.45)}C${inBand(0.3, 0.88)} ${inBand(0.62, 0.95)} ${inBand(1.03, 0.62)}`,
      },
    ],
    route: {
      d: `M${from.join(" ")}C${inColumn(0.33, 1.08)} ${inColumn(0.66, 0.42)} ${inColumn(0.86, -0.5)}`,
    },
    from,
    traveller: "plane",
    className: "top-0 left-0 overflow-visible",
  };
}

/** The arcs start drawing once the heading is on its way */
const DRAW_START = 700;
/** The route draws after the arcs; its yellow end point appears as it arrives */
const ROUTE_START = DRAW_START + 300;
const ROUTE_END = ROUTE_START + 1800;

const delay = (ms: number): CSSProperties => ({ animationDelay: `${ms}ms` });
const length = (len = 1) => ({ "--len": len }) as CSSProperties;

// lucide's plane, turned to fly along +x and centred on 0 0, so it follows the route
const PLANE =
  "M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z";

function LineArt({ layout }: { layout: Layout }) {
  const { id, width, height, arcs, route, from, to, traveller, className } =
    layout;
  const routeId = `${id}-route`;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      className={cn("absolute", className)}
    >
      {arcs.map(({ d, len }, index) => (
        <path
          key={index}
          d={d}
          pathLength={len ? undefined : 1}
          stroke="currentColor"
          className="animate-draw text-neutral-300 [stroke-dasharray:var(--len)] motion-reduce:animate-none"
          style={{ ...length(len), ...delay(DRAW_START + index * 150) }}
        />
      ))}

      {/* The dotted route, uncovered along its length by a mask that draws in */}
      <defs>
        <mask id={`${routeId}-reveal`} maskUnits="userSpaceOnUse">
          <path
            d={route.d}
            pathLength={route.len ? undefined : 1}
            stroke="white"
            strokeWidth={8}
            className="animate-draw [stroke-dasharray:var(--len)] motion-reduce:animate-none"
            style={{ ...length(route.len), ...delay(ROUTE_START) }}
          />
        </mask>
      </defs>
      <path
        id={routeId}
        d={route.d}
        mask={`url(#${routeId}-reveal)`}
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeDasharray="0.1 9"
        className="text-amber-400"
      />

      {/* The end points, each with a soft pulse: a dark start and a yellow destination */}
      {[
        { at: from, fill: "fill-neutral-900", start: ROUTE_START },
        ...(to ? [{ at: to, fill: "fill-brand", start: ROUTE_END }] : []),
      ].map(({ at: [cx, cy], fill, start }) => (
        <g
          key={fill}
          className="origin-center animate-pop [transform-box:fill-box] motion-reduce:animate-none"
          style={delay(start)}
        >
          <circle
            cx={cx}
            cy={cy}
            r={4}
            className="origin-center animate-ping-soft fill-amber-400/40 [transform-box:fill-box] motion-reduce:hidden"
            style={delay(start + 600)}
          />
          <circle
            cx={cx}
            cy={cy}
            r={4}
            strokeWidth={2}
            className={cn(fill, "stroke-white")}
          />
        </g>
      ))}

      {/* Every 7 seconds a dot with a yellow halo, or a plane, travels the route (an SVG
          animation). The plane turns with the route. */}
      <g opacity={0} className="motion-reduce:hidden">
        {traveller === "dot" ? (
          <>
            <circle r={7} className="fill-amber-400/30" />
            <circle r={3} className="fill-neutral-900" />
          </>
        ) : (
          <>
            <circle r={11} className="fill-amber-400/25" />
            <path
              d={PLANE}
              transform="scale(0.62) rotate(45) translate(-12 -12)"
              className="fill-neutral-900"
            />
          </>
        )}
        <animateMotion
          dur="7s"
          begin={`${ROUTE_END + 400}ms`}
          repeatCount="indefinite"
          rotate={traveller === "plane" ? "auto" : undefined}
          keyPoints="0;1;1"
          keyTimes="0;0.55;1"
          calcMode="spline"
          keySplines="0.45 0 0.2 1;0 0 1 1"
        >
          <mpath href={`#${routeId}`} />
        </animateMotion>
        <animate
          attributeName="opacity"
          values="0;1;1;0;0"
          keyTimes="0;0.06;0.49;0.55;1"
          dur="7s"
          begin={`${ROUTE_END + 400}ms`}
          repeatCount="indefinite"
        />
      </g>
    </svg>
  );
}

/** From lg up: the lines behind the whole hero */
export function HeroLines() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 hidden overflow-hidden lg:block"
    >
      <LineArt layout={DESKTOP} />
    </div>
  );
}

/**
 * Below lg: the band between the photo and the heading, with the route drawn to its
 * width. It spans the screen, past the content's side margins. Before its width is
 * known it stays empty; the drawing starts later than the heading anyway.
 */
export function HeroRouteBand({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const band = ref.current;
    if (!band) return;
    const observer = new ResizeObserver(([entry]) =>
      setWidth(Math.round(entry.contentRect.width))
    );
    observer.observe(band);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn("pointer-events-none relative", className)}
      style={{ height: BAND_HEIGHT }}
    >
      {width > 0 && <LineArt layout={bandLayout(width)} />}
    </div>
  );
}
