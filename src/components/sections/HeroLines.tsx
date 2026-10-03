import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

/*
 * Decorative line art behind the home hero, like routes on a map: a dotted yellow route
 * and, on large screens, two fine arcs around the content. After the heading appears the
 * lines draw themselves in; then the route's end points pulse softly and every 7 seconds
 * a dot travels the route.
 *
 * Plain SVG and CSS, no JavaScript. Each layout is drawn at its real size (1 unit = 1px)
 * so the lines stay sharp.
 * len: a path's length (getTotalLength(), rounded up), which the draw-in animates.
 * Measure it again after changing the path.
 */

interface Path {
  d: string;
  len: number;
}

interface Layout {
  /** Prefix for the SVG ids; must be unique on the page */
  id: string;
  width: number;
  height: number;
  arcs: Path[];
  route: Path;
  /** Where the route starts and ends */
  from: [number, number];
  to: [number, number];
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
  className:
    "top-1/2 left-1/2 hidden -translate-1/2 [mask-image:radial-gradient(ellipse_at_center,black_65%,transparent_100%)] lg:block",
};

// Below lg only the route, arching through the 64px band above the heading (pt-16 in
// Hero), so it never runs behind the heading, whatever its language.
const MOBILE: Layout = {
  id: "hero-lines-sm",
  width: 390,
  height: 72,
  arcs: [],
  route: { d: "M190 28C250 4 330 4 362 44", len: 185 },
  from: [190, 28],
  to: [362, 44],
  className: "top-0 right-0 lg:hidden",
};

/** The arcs start drawing once the heading is on its way */
const DRAW_START = 700;
/** The route draws after the arcs; its yellow end point appears as it arrives */
const ROUTE_START = DRAW_START + 300;
const ROUTE_END = ROUTE_START + 1800;

const delay = (ms: number): CSSProperties => ({ animationDelay: `${ms}ms` });
const length = (len: number) => ({ "--len": len }) as CSSProperties;

function LineArt({ layout }: { layout: Layout }) {
  const { id, width, height, arcs, route, from, to, className } = layout;
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
          key={d}
          d={d}
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

      {/* End points, each with a soft pulse: a dark start and a yellow destination */}
      {[
        { at: from, fill: "fill-neutral-900", start: ROUTE_START },
        { at: to, fill: "fill-brand", start: ROUTE_END },
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

      {/* Every 7 seconds a dot with a yellow halo travels the route (an SVG animation) */}
      <g opacity={0} className="motion-reduce:hidden">
        <circle r={7} className="fill-amber-400/30" />
        <circle r={3} className="fill-neutral-900" />
        <animateMotion
          dur="7s"
          begin={`${ROUTE_END + 400}ms`}
          repeatCount="indefinite"
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

export function HeroLines() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <LineArt layout={DESKTOP} />
      <LineArt layout={MOBILE} />
    </div>
  );
}
