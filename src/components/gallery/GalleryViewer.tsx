"use client";

import {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ComponentProps,
  type KeyboardEvent,
  type MouseEvent,
  type Ref,
} from "react";
import { createPortal } from "react-dom";
import Image, { getImageProps } from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type PanInfo,
  type Transition,
  type Variants,
} from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  LoaderCircle,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import type { GalleryDocument } from "@/lib/cms/gallery";
import { useTranslations } from "@/hooks/useTranslations";
import { useLenis } from "@/utils/lenis";
import { fontPoppins } from "@/fonts";
import { cn } from "@/lib/utils";
import { CountryFlag } from "./CountryFlag";

/** The site's ease-out-quint, for the animations started from here */
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

/** How much a click magnifies the page */
const ZOOM = 2.5;

// To the next document: the page slides a little way out as the next one slides in
const SLIDE: Variants = {
  enter: (direction: number) => ({ x: `${direction * 25}%`, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: `${direction * -25}%`, opacity: 0 }),
};
const SLIDE_TRANSITION: Transition = {
  x: { type: "spring", stiffness: 300, damping: 34 },
  opacity: { duration: 0.25 },
};

/** The transform that lays a box at `from` exactly over `to`, from its top left corner */
function cover(to: DOMRect, from: DOMRect) {
  return `translate(${to.left - from.left}px, ${to.top - from.top}px) scale(${to.width / from.width}, ${to.height / from.height})`;
}

/** The sharp picture is as wide as the scan, as it can be zoomed into */
const sharpSizes = (item: GalleryDocument) => `${item.width}px`;

interface GalleryViewerProps {
  /** The documents to step through: those the gallery's filter shows */
  documents: GalleryDocument[];
  /** The one shown */
  index: number;
  /** The kind of document, the viewer's name for screen readers */
  title: string;
  /** A document's description, its picture's alt text */
  label: (item: GalleryDocument) => string;
  /** The grid's sizes for a picture, so its file there shows at once, from the cache */
  thumbSizes: string;
  /** A document's page in the grid, to grow out of and to go back into */
  thumbnailOf: (id: string) => HTMLElement | null;
  onIndexChange: (index: number) => void;
  /** Called once the closing animation has finished */
  onClose: () => void;
}

/**
 * A document shown large over the page. It grows out of its place in the grid and goes
 * back into it when closed. The arrows (buttons, keys, or a swipe) step through the
 * documents. A click zooms in where it points, and moving the pointer looks around the
 * page, to read it. The file already shown in the grid appears at once, and the sharp
 * one fades in over it when it has loaded; the next and previous ones load in advance.
 */
export function GalleryViewer({
  documents,
  index,
  title,
  label,
  thumbSizes,
  thumbnailOf,
  onIndexChange,
  onClose,
}: GalleryViewerProps) {
  const t = useTranslations("gallery");
  const lenis = useLenis();
  const reduceMotion = useReducedMotion();
  const titleId = useId();
  const statusId = useId();
  const dialog = useRef<HTMLDivElement>(null);
  const frames = useRef(new Map<string, HTMLDivElement>());
  const [direction, setDirection] = useState(1);
  const [zoomed, setZoomed] = useState(false);
  const [closing, setClosing] = useState(false);
  const item = documents[index];
  const last = documents.length - 1;

  // While it is open the page behind stays still. Where a scroll bar takes room, the
  // body keeps that room as padding, so nothing shifts sideways when the bar hides.
  useEffect(() => {
    const root = document.documentElement;
    const { body } = document;
    const scrollbar = window.innerWidth - root.clientWidth;
    const saved = {
      overflow: root.style.overflow,
      paddingRight: body.style.paddingRight,
    };
    root.style.overflow = "hidden";
    if (scrollbar > 0) {
      const padding = parseFloat(getComputedStyle(body).paddingRight) || 0;
      body.style.paddingRight = `${padding + scrollbar}px`;
    }
    lenis?.stop();
    dialog.current?.focus({ preventScroll: true });
    return () => {
      root.style.overflow = saved.overflow;
      body.style.paddingRight = saved.paddingRight;
      lenis?.start();
    };
  }, [lenis]);

  // Opening: the page grows out of its place in the grid, before the first paint
  useLayoutEffect(() => {
    const frame = frames.current.get(item.id);
    if (!frame || reduceMotion) return;
    const from = thumbnailOf(item.id)?.getBoundingClientRect();
    const animation = from?.width
      ? frame.animate(
          [
            { transform: cover(from, frame.getBoundingClientRect()) },
            { transform: "none" },
          ],
          { duration: 650, easing: EASE }
        )
      : frame.animate(
          [
            { opacity: 0, transform: "scale(0.94)" },
            { opacity: 1, transform: "none" },
          ],
          { duration: 400, easing: EASE }
        );
    // Development runs effects twice: the second run must measure an untouched frame
    return () => animation.cancel();
    // Only as the viewer opens
  }, []);

  // The next and previous documents load in advance, both files
  useEffect(() => {
    for (const neighbour of [documents[index + 1], documents[index - 1]]) {
      if (!neighbour) continue;
      for (const sizes of [thumbSizes, sharpSizes(neighbour)]) {
        const { props } = getImageProps({
          src: neighbour.src,
          alt: "",
          width: neighbour.width,
          height: neighbour.height,
          sizes,
        });
        const image = new window.Image();
        image.sizes = props.sizes ?? "";
        image.srcset = props.srcSet ?? "";
        image.src = props.src;
      }
    }
  }, [documents, index, thumbSizes]);

  const go = (step: number) => {
    const next = index + step;
    if (closing || step === 0 || next < 0 || next > last) return;
    setDirection(Math.sign(step));
    setZoomed(false);
    onIndexChange(next);
  };

  // Closing: the page goes back into its place in the grid if that is on screen (and has
  // come into view), or else fades away
  const close = () => {
    if (closing) return;
    setClosing(true);
    setZoomed(false);
    const frame = frames.current.get(item.id);
    if (!frame || reduceMotion) {
      onClose();
      return;
    }
    const thumbnail = thumbnailOf(item.id);
    const to = thumbnail?.getBoundingClientRect();
    const revealed =
      thumbnail?.closest<HTMLElement>("[data-reveal]")?.dataset.reveal !==
      "waiting";
    frame.getAnimations().forEach((animation) => animation.cancel());
    const from = frame.getBoundingClientRect();
    const animation =
      to?.width && to.bottom > 0 && to.top < window.innerHeight && revealed
        ? frame.animate(
            [{ transform: "none" }, { transform: cover(to, from) }],
            { duration: 480, easing: EASE, fill: "forwards" }
          )
        : frame.animate(
            [{ opacity: 1 }, { opacity: 0, transform: "scale(0.94)" }],
            { duration: 260, easing: "ease-out", fill: "forwards" }
          );
    animation.finished.then(onClose, onClose);
  };

  // Tab goes round the viewer's buttons, never to the page behind
  const keepFocusInside = (event: KeyboardEvent) => {
    const buttons = [
      ...(dialog.current?.querySelectorAll<HTMLElement>(
        "button:not(:disabled)"
      ) ?? []),
    ];
    const first = buttons[0];
    const lastButton = buttons[buttons.length - 1];
    if (!first || !lastButton) return;
    const active = document.activeElement;
    if (event.shiftKey && (active === first || active === dialog.current)) {
      event.preventDefault();
      lastButton.focus();
    } else if (!event.shiftKey && active === lastButton) {
      event.preventDefault();
      first.focus();
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case "Escape":
        close();
        break;
      case "ArrowLeft":
        go(-1);
        break;
      case "ArrowRight":
        go(1);
        break;
      case "Home":
        go(-index);
        break;
      case "End":
        go(last - index);
        break;
      case "Tab":
        keepFocusInside(event);
        return;
      // Nothing scrolls behind the viewer; a focused button still takes Space
      case " ":
        if (event.target !== dialog.current) return;
        break;
      case "PageUp":
      case "PageDown":
      case "ArrowUp":
      case "ArrowDown":
        break;
      default:
        return;
    }
    event.preventDefault();
  };

  return createPortal(
    <div
      ref={dialog}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={statusId}
      tabIndex={-1}
      onKeyDown={onKeyDown}
      data-closing={closing || undefined}
      className={cn(
        "group/viewer fixed inset-0 z-[100] text-white outline-none",
        fontPoppins.className
      )}
    >
      <div
        aria-hidden
        onClick={close}
        className="absolute inset-0 bg-neutral-950/90 backdrop-blur-sm transition-opacity duration-300 ease-out group-data-closing/viewer:opacity-0 starting:opacity-0"
      />

      {/* The stage: a page as large as fits between the bars */}
      <div className="pointer-events-none absolute inset-x-3 top-[4.5rem] bottom-[6.25rem] [container-type:size] sm:inset-x-24 sm:top-20 sm:bottom-10">
        <AnimatePresence initial={false} custom={direction}>
          <ViewerSlide
            key={item.id}
            item={item}
            alt={label(item)}
            thumbSizes={thumbSizes}
            direction={direction}
            zoomed={zoomed}
            onZoom={() => setZoomed((value) => !value)}
            onSwipe={go}
            frameRef={(frame) => {
              if (frame) frames.current.set(item.id, frame);
              return () => {
                frames.current.delete(item.id);
              };
            }}
          />
        </AnimatePresence>
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between gap-3 p-3 transition-opacity duration-300 group-data-closing/viewer:opacity-0 starting:opacity-0 sm:p-5">
        <h2 id={titleId} className="sr-only">
          {title}
        </h2>
        <p
          id={statusId}
          aria-live="polite"
          className="pointer-events-auto flex min-w-0 items-center gap-2.5 rounded-full bg-white/10 py-1 pr-4 pl-1 text-sm backdrop-blur-md"
        >
          <span
            aria-hidden
            className="shrink-0 rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-neutral-950 tabular-nums"
          >
            {index + 1} / {documents.length}
          </span>
          <span className="sr-only">
            {t("position", { index: index + 1, count: documents.length })}
          </span>
          {item.country && (
            <span className="flex min-w-0 items-center gap-2">
              {item.country.code && (
                <CountryFlag
                  code={item.country.code}
                  size="1.25rem"
                  className="ring-white/20"
                />
              )}
              <span className="truncate">{item.country.name}</span>
            </span>
          )}
        </p>
        <div className="pointer-events-auto flex shrink-0 items-center gap-2">
          <ViewerButton
            label={zoomed ? t("zoomOut") : t("zoomIn")}
            onClick={() => setZoomed((value) => !value)}
          >
            {zoomed ? <ZoomOut aria-hidden /> : <ZoomIn aria-hidden />}
          </ViewerButton>
          <ViewerButton label={t("close")} onClick={close}>
            <X aria-hidden />
          </ViewerButton>
        </div>
      </div>

      {/* Below the page on phones, at its sides on larger screens */}
      {documents.length > 1 && (
        <div className="pointer-events-none absolute inset-0 transition-opacity duration-300 group-data-closing/viewer:opacity-0 starting:opacity-0">
          <ViewerButton
            label={t("previous")}
            disabled={index === 0}
            onClick={() => go(-1)}
            className="absolute bottom-6 left-1/2 -translate-x-[calc(100%+0.5rem)] sm:top-1/2 sm:bottom-auto sm:left-6 sm:translate-x-0 sm:-translate-y-1/2"
          >
            <ArrowLeft aria-hidden />
          </ViewerButton>
          <ViewerButton
            label={t("next")}
            disabled={index === last}
            onClick={() => go(1)}
            className="absolute bottom-6 left-1/2 translate-x-2 sm:top-1/2 sm:right-6 sm:bottom-auto sm:left-auto sm:translate-x-0 sm:-translate-y-1/2"
          >
            <ArrowRight aria-hidden />
          </ViewerButton>
        </div>
      )}
    </div>,
    document.body
  );
}

interface ViewerSlideProps {
  item: GalleryDocument;
  alt: string;
  thumbSizes: string;
  /** 1 when stepping forward, -1 back: where the slide comes in from */
  direction: number;
  zoomed: boolean;
  onZoom: () => void;
  onSwipe: (step: number) => void;
  /** The framed page, which grows out of the grid and goes back into it */
  frameRef: Ref<HTMLDivElement>;
}

/** One document on the stage: swiped sideways to step, clicked to zoom */
function ViewerSlide({
  item,
  alt,
  thumbSizes,
  direction,
  zoomed,
  onZoom,
  onSwipe,
  frameRef,
}: ViewerSlideProps) {
  const lens = useRef<HTMLDivElement>(null);
  const pressedAt = useRef<{ x: number; y: number } | null>(null);
  const [preview, setPreview] = useState(false);
  const [sharp, setSharp] = useState(false);

  // Zooming aims at the pointer, and moving it while zoomed looks around the page
  const aim = (event: MouseEvent<HTMLDivElement>) => {
    const box = event.currentTarget.getBoundingClientRect();
    const percent = (value: number) => Math.min(100, Math.max(0, value * 100));
    lens.current?.style.setProperty(
      "transform-origin",
      `${percent((event.clientX - box.left) / box.width)}% ${percent((event.clientY - box.top) / box.height)}%`
    );
  };

  const onDragEnd = (_: unknown, { offset, velocity }: PanInfo) => {
    if (offset.x < -80 || velocity.x < -500) onSwipe(1);
    else if (offset.x > 80 || velocity.x > 500) onSwipe(-1);
  };

  return (
    <motion.div
      custom={direction}
      variants={SLIDE}
      initial="enter"
      animate="center"
      exit="exit"
      transition={SLIDE_TRANSITION}
      className="absolute inset-0 flex items-center justify-center"
    >
      <motion.div
        drag={zoomed ? false : "x"}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.55}
        onDragEnd={onDragEnd}
        className="pointer-events-auto relative"
        style={{
          width: `min(100cqw, ${((item.width / item.height) * 100).toFixed(2)}cqh)`,
          aspectRatio: `${item.width} / ${item.height}`,
        }}
      >
        <div
          ref={frameRef}
          className="size-full origin-top-left overflow-hidden rounded-xl bg-white shadow-[0_40px_90px_-30px_rgba(0,0,0,0.7)]"
        >
          <div
            onPointerDown={(event) => {
              pressedAt.current = { x: event.clientX, y: event.clientY };
            }}
            onPointerMove={(event) => {
              if (zoomed) aim(event);
            }}
            onClick={(event) => {
              const start = pressedAt.current;
              // The end of a swipe isn't a click
              if (
                start &&
                Math.hypot(event.clientX - start.x, event.clientY - start.y) > 8
              ) {
                return;
              }
              if (!zoomed) aim(event);
              onZoom();
            }}
            className={cn(
              "relative size-full",
              zoomed ? "cursor-zoom-out touch-none" : "cursor-zoom-in"
            )}
          >
            <div
              ref={lens}
              // Closing, the page unzooms at once, to fly back whole
              className="relative size-full transition-transform duration-500 ease-out-quint group-data-closing/viewer:transition-none motion-reduce:transition-none"
              style={{ transform: zoomed ? `scale(${ZOOM})` : "none" }}
            >
              {/* The grid's file, already loaded. A drag is a swipe, so the pictures can't be dragged away. */}
              <Image
                src={item.src}
                alt=""
                fill
                sizes={thumbSizes}
                loading="eager"
                draggable={false}
                onLoad={() => setPreview(true)}
                className="object-cover"
              />
              <Image
                src={item.src}
                alt={alt}
                fill
                sizes={sharpSizes(item)}
                loading="eager"
                draggable={false}
                onLoad={() => setSharp(true)}
                className={cn(
                  "object-cover transition-opacity duration-500",
                  !sharp && "opacity-0"
                )}
              />
            </div>
            {!preview && !sharp && (
              <LoaderCircle
                aria-hidden
                className="absolute inset-0 m-auto size-7 animate-spin text-neutral-300"
              />
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

interface ViewerButtonProps extends ComponentProps<"button"> {
  /** Its name, also shown as a tooltip */
  label: string;
}

/** A round, see-through button over the dark backdrop */
function ViewerButton({
  label,
  className,
  children,
  ...props
}: ViewerButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={cn(
        "pointer-events-auto grid size-11 place-items-center rounded-full bg-white/10 text-white backdrop-blur-md transition-[background-color,color,opacity] duration-300 outline-none hover:bg-white hover:text-neutral-950 focus-visible:ring-2 focus-visible:ring-brand disabled:pointer-events-none disabled:opacity-30 sm:size-12 [&_svg]:size-5",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
