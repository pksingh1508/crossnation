"use client";

import { useEffect, useRef, useState } from "react";

/*
 * Faint white lines in the footer that show only around the mouse pointer, as if lit by
 * a torch: a world map grid with routes into Warsaw, where the company is.
 *
 * The lit circle (the "lens") is a masked element that follows the pointer, and inside
 * it the map moves the opposite way, so the map stays put. Both move with transforms
 * only, which the browser composites without repainting. Pointer devices only: touch
 * screens have no cursor to follow.
 */

// The map is drawn on a 1600 × 800 canvas (a world map is twice as wide as it is tall)
// and scaled to cover the footer.
const CX = 800;
const CY = 400;
const RX = 780;
const RY = 390;

/** Latitude and longitude to a point on the map (Mollweide projection) */
function project(lat: number, lon: number): [number, number] {
  const phi = (lat * Math.PI) / 180;
  let theta = phi;
  if (Math.abs(lat) < 90) {
    for (let i = 0; i < 25; i++) {
      const step =
        (2 * theta + Math.sin(2 * theta) - Math.PI * Math.sin(phi)) /
        (2 + 2 * Math.cos(2 * theta));
      theta -= step;
      if (Math.abs(step) < 1e-7) break;
    }
  }
  return [CX + RX * (lon / 180) * Math.cos(theta), CY - RY * Math.sin(theta)];
}

const round = (n: number) => Math.round(n * 10) / 10;

// Lines of latitude every 15°: straight, as wide as the map at that height
const PARALLELS = [-75, -60, -45, -30, -15, 0, 15, 30, 45, 60, 75].map(
  (lat) => {
    const [, y] = project(lat, 0);
    const halfWidth = project(lat, 180)[0] - CX;
    return `M${round(CX - halfWidth)} ${round(y)}H${round(CX + halfWidth)}`;
  }
);

// Lines of longitude every 15°: in this projection they are ellipses around the centre
const MERIDIANS = Array.from({ length: 11 }, (_, i) =>
  round((RX * (i + 1)) / 12)
);

const WARSAW = project(52.23, 21.01);

// Where many of the company's candidates come from
const ORIGINS = [
  project(28.61, 77.21), // New Delhi
  project(27.72, 85.32), // Kathmandu
  project(23.81, 90.41), // Dhaka
  project(14.6, 120.98), // Manila
  project(25.2, 55.27), // Dubai
  project(-1.29, 36.82), // Nairobi
  project(6.52, 3.38), // Lagos
];

/** An arc from a city up to Warsaw */
function route([x1, y1]: [number, number]) {
  const [x2, y2] = WARSAW;
  const lift = Math.hypot(x2 - x1, y2 - y1) * 0.35;
  return `M${round(x1)} ${round(y1)}Q${round((x1 + x2) / 2)} ${round(Math.min(y1, y2) - lift)} ${round(x2)} ${round(y2)}`;
}

/** Radius of the lit circle, in px */
const LENS = 260;

function WorldLines() {
  return (
    // vectorEffect keeps every line 1px wide however the map is scaled (it is not
    // inherited, so each line sets it)
    <svg
      viewBox="0 0 1600 800"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      className="size-full"
    >
      <g stroke="white" strokeOpacity={0.22}>
        <ellipse
          cx={CX}
          cy={CY}
          rx={RX}
          ry={RY}
          strokeOpacity={0.35}
          vectorEffect="non-scaling-stroke"
        />
        {MERIDIANS.map((rx) => (
          <ellipse
            key={rx}
            cx={CX}
            cy={CY}
            rx={rx}
            ry={RY}
            vectorEffect="non-scaling-stroke"
          />
        ))}
        <path
          d={`M${CX} ${CY - RY}V${CY + RY}`}
          vectorEffect="non-scaling-stroke"
        />
        {PARALLELS.map((d) => (
          <path key={d} d={d} vectorEffect="non-scaling-stroke" />
        ))}
      </g>
      <g
        stroke="white"
        strokeOpacity={0.5}
        strokeDasharray="2 5"
        strokeLinecap="round"
      >
        {ORIGINS.map((origin) => (
          <path
            key={origin.join()}
            d={route(origin)}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </g>
      {ORIGINS.map(([x, y]) => (
        <circle
          key={`${x}-${y}`}
          cx={x}
          cy={y}
          r={2.5}
          fill="white"
          fillOpacity={0.7}
        />
      ))}
      <circle
        cx={WARSAW[0]}
        cy={WARSAW[1]}
        r={10}
        fill="#fecc00"
        fillOpacity={0.25}
      />
      <circle cx={WARSAW[0]} cy={WARSAW[1]} r={4} fill="#fecc00" />
    </svg>
  );
}

export function FooterSpotlight() {
  const [enabled, setEnabled] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  // Only for a mouse or trackpad. Rendered after hydration, so phones never get it.
  useEffect(() => {
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      setEnabled(true);
    }
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const lens = lensRef.current;
    const map = mapRef.current;
    const footer = root?.parentElement;
    if (!enabled || !root || !lens || !map || !footer) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const pointer = { x: 0, y: 0 }; // last pointer position in the window
    const target = { x: 0, y: 0 }; // where the lens is heading, in the footer
    const current = { x: 0, y: 0 }; // where it is now
    let frame = 0;

    // The map gets the footer's size, so it lines up with the footer exactly
    const resize = new ResizeObserver(() => {
      map.style.width = `${footer.clientWidth}px`;
      map.style.height = `${footer.clientHeight}px`;
    });
    resize.observe(footer);

    const place = () => {
      lens.style.transform = `translate3d(${current.x - LENS}px, ${current.y - LENS}px, 0)`;
      map.style.transform = `translate3d(${LENS - current.x}px, ${LENS - current.y}px, 0)`;
    };
    // Glide towards the pointer, a little behind it, then stop the loop
    const tick = () => {
      current.x += (target.x - current.x) * 0.2;
      current.y += (target.y - current.y) * 0.2;
      place();
      frame =
        Math.abs(target.x - current.x) + Math.abs(target.y - current.y) > 0.3
          ? requestAnimationFrame(tick)
          : 0;
    };
    const aim = () => {
      const rect = footer.getBoundingClientRect();
      target.x = pointer.x - rect.left;
      target.y = pointer.y - rect.top;
      if (reduceMotion) {
        current.x = target.x;
        current.y = target.y;
        place();
      } else if (!frame) {
        frame = requestAnimationFrame(tick);
      }
    };

    const onEnter = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      const rect = footer.getBoundingClientRect();
      // Start where the pointer came in, instead of gliding over from the last spot
      current.x = target.x = pointer.x - rect.left;
      current.y = target.y = pointer.y - rect.top;
      place();
      root.dataset.active = "true";
      window.addEventListener("scroll", aim, { passive: true });
    };
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      aim();
    };
    const onLeave = () => {
      root.dataset.active = "false";
      window.removeEventListener("scroll", aim);
    };

    footer.addEventListener("pointerenter", onEnter);
    footer.addEventListener("pointermove", onMove, { passive: true });
    footer.addEventListener("pointerleave", onLeave);
    return () => {
      footer.removeEventListener("pointerenter", onEnter);
      footer.removeEventListener("pointermove", onMove);
      footer.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", aim);
      cancelAnimationFrame(frame);
      resize.disconnect();
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden opacity-0 transition-opacity duration-700 ease-out data-[active=true]:opacity-100"
    >
      {/* The lens: a soft circle with a faint warm glow, fading out to its edge */}
      <div
        ref={lensRef}
        className="absolute top-0 left-0 overflow-hidden rounded-full bg-[radial-gradient(closest-side,rgba(254,204,0,0.08),transparent)] will-change-transform [mask-image:radial-gradient(closest-side,#000_35%,transparent)]"
        style={{ width: LENS * 2, height: LENS * 2 }}
      >
        <div
          ref={mapRef}
          className="absolute top-0 left-0 will-change-transform"
        >
          <WorldLines />
        </div>
      </div>
    </div>
  );
}
