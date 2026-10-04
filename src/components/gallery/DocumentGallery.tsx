"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type Ref,
} from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  AnimatePresence,
  motion,
  MotionConfig,
  type Transition,
} from "framer-motion";
import { ArrowDown, Expand, ImageOff, RotateCw } from "lucide-react";
import type { GalleryDocument } from "@/lib/cms/gallery";
import { useTranslations } from "@/hooks/useTranslations";
import { useColumn } from "@/hooks/useColumn";
import { useReveal } from "@/hooks/useReveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { WordReveal } from "@/components/ui/word-reveal";
import { Notice } from "@/components/list/Notice";
import { fontInter, fontPoppins } from "@/fonts";
import { delay, RISE_ON_REVEAL } from "@/lib/animation";
import { cn } from "@/lib/utils";
import { CountryFlag } from "./CountryFlag";
import { GalleryViewer } from "./GalleryViewer";

/** How many documents show at first, and how many more each "Show more" adds */
const BATCH = 16;

/**
 * A page's width in the grid (two, three or four columns, the content at most 1248px
 * wide), so the browser picks a file of the right size
 */
const THUMB_SIZES =
  "(min-width: 1280px) 220px, (min-width: 1024px) 17vw, (min-width: 640px) 23vw, 34vw";

// The yellow marker glides to the chosen country, as the page numbers' marker does
const MARKER_SPRING: Transition = {
  type: "spring",
  stiffness: 420,
  damping: 36,
  mass: 0.8,
};

// A card that arrives (after "Show more", or a change of country) rises in, one after
// another; a card that leaves fades away while the others glide to their new places
const CARD_LAYOUT: Transition = { type: "spring", stiffness: 260, damping: 30 };
const EASE_OUT_QUINT = [0.22, 1, 0.36, 1] as const;

type CountryOption = NonNullable<GalleryDocument["country"]> & {
  count: number;
};

interface DocumentGalleryProps {
  /** The page's translations: title, heading, description, count and document */
  namespace: "workPermit" | "visaStamp";
  /** The gallery, newest first; null when it couldn't be loaded */
  documents: GalleryDocument[] | null;
  /** The country in the address (?country=pl): only its documents are shown */
  country?: string;
}

/**
 * Documents clients received (work permits, visa stamps), each lying on a dotted desk;
 * one opens large in a viewer. When they come from several countries, they can be
 * filtered by country, and the address keeps the choice. The newest show first; more come
 * a batch at a time.
 */
export function DocumentGallery({
  namespace,
  documents,
  country: requested,
}: DocumentGalleryProps) {
  const t = useTranslations(namespace);
  const tGallery = useTranslations("gallery");
  const router = useRouter();

  // The countries, those with the most documents first
  const countries = useMemo(() => {
    const byKey = new Map<string, CountryOption>();
    for (const { country } of documents ?? []) {
      if (!country) continue;
      const option = byKey.get(country.key);
      if (option) option.count += 1;
      else byKey.set(country.key, { ...country, count: 1 });
    }
    return [...byKey.values()].sort((a, b) => b.count - a.count);
  }, [documents]);

  const [country, setCountry] = useState(
    () =>
      countries.find(({ key }) => key === requested?.toLowerCase())?.key ?? null
  );
  const [shown, setShown] = useState(BATCH);
  // The document open in the viewer: its place among those the filter shows
  const [viewing, setViewing] = useState<number | null>(null);
  const papers = useRef(new Map<string, HTMLElement>());
  const buttons = useRef(new Map<string, HTMLButtonElement>());
  const openedFrom = useRef<string | null>(null);
  const focusAfterShowing = useRef<string | null>(null);

  const all = documents ?? [];
  const filtered = country
    ? all.filter((document) => document.country?.key === country)
    : all;
  const visible = filtered.slice(0, shown);
  const viewedId = viewing === null ? null : filtered[viewing]?.id;
  // Work permits are upright pages; visa stamps are photos across a passport's page
  const landscape =
    all.filter(({ width, height }) => width > height).length > all.length / 2;

  const label = (document: GalleryDocument) =>
    document.country
      ? `${t("document")} – ${document.country.name}`
      : t("document");

  // After "Show more", the first new document takes the focus, so the keyboard goes on from there
  useEffect(() => {
    if (!focusAfterShowing.current) return;
    buttons.current
      .get(focusAfterShowing.current)
      ?.focus({ preventScroll: true });
    focusAfterShowing.current = null;
  }, [shown]);

  const filterBy = (key: string | null) => {
    if (key === country) return;
    setCountry(key);
    setShown(BATCH);
    // The address keeps the choice, for sharing and reloading, without asking the server
    const url = new URL(window.location.href);
    if (key) url.searchParams.set("country", key);
    else url.searchParams.delete("country");
    window.history.replaceState(null, "", url);
  };

  const showMore = () => {
    focusAfterShowing.current = filtered[visible.length]?.id ?? null;
    setShown((count) => count + BATCH);
  };

  const open = (index: number) => {
    openedFrom.current = filtered[index].id;
    setViewing(index);
  };

  // The focus goes back to the document last viewed if it is on screen, else to the one
  // that opened the viewer
  const close = () => {
    const last = viewedId ? buttons.current.get(viewedId) : undefined;
    const box = last?.getBoundingClientRect();
    const onScreen = box && box.bottom > 0 && box.top < window.innerHeight;
    const target = onScreen
      ? last
      : buttons.current.get(openedFrom.current ?? "");
    setViewing(null);
    target?.focus({ preventScroll: true });
  };

  return (
    <MotionConfig reducedMotion="user">
      <section className={cn("bg-white pb-20 sm:pb-24", fontPoppins.className)}>
        <div className="mx-auto w-full max-w-7xl px-4">
          {/* On screen when the page opens, so shown from the start */}
          <div
            data-reveal="shown"
            className="grid grid-cols-1 gap-8 pt-8 lg:grid-cols-12 lg:items-end lg:gap-16 lg:pt-10"
          >
            <div className="lg:col-span-7">
              <Eyebrow>{t("title")}</Eyebrow>
              {/* The page's main heading */}
              <h1 className="mt-5 text-[min(2.75rem,11vw)] leading-[1.05] font-semibold tracking-tight text-balance text-neutral-950 sm:text-6xl">
                <WordReveal
                  text={t("heading")}
                  delay={100}
                  className="reveal-shown:animate-word motion-reduce:animate-none"
                />
              </h1>
            </div>
            <div className="lg:col-span-5">
              <p
                className={cn(
                  "leading-relaxed text-neutral-600 sm:text-lg",
                  fontInter.className,
                  RISE_ON_REVEAL
                )}
                style={delay(350)}
              >
                {t("description")}
              </p>
              {countries.length > 1 && (
                <CountryFilter
                  countries={countries}
                  total={all.length}
                  current={country}
                  onChange={filterBy}
                  className={cn("mt-6", RISE_ON_REVEAL)}
                  style={delay(450)}
                />
              )}
            </div>
          </div>

          <div className="mt-14 sm:mt-16">
            {documents === null ? (
              <Notice
                icon={RotateCw}
                text={tGallery("loadError")}
                action={{
                  label: tGallery("retry"),
                  onClick: () => router.refresh(),
                }}
              />
            ) : all.length === 0 ? (
              <Notice icon={ImageOff} text={tGallery("empty")} />
            ) : (
              <>
                <p
                  aria-live="polite"
                  className={cn(
                    "mb-8 border-b border-neutral-200 pb-4 text-sm text-neutral-500",
                    fontInter.className
                  )}
                >
                  {t("count", { count: filtered.length })}
                </p>

                <ul className="relative grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-4">
                  <AnimatePresence mode="popLayout" initial={false}>
                    {visible.map((document, index) => (
                      <DocumentCard
                        key={document.id}
                        document={document}
                        label={label(document)}
                        landscape={landscape}
                        order={index % BATCH}
                        // The first row is on the first screen
                        eager={index < 4}
                        viewing={document.id === viewedId}
                        onOpen={() => open(index)}
                        paperRef={(paper) => {
                          if (paper) papers.current.set(document.id, paper);
                          return () => {
                            papers.current.delete(document.id);
                          };
                        }}
                        buttonRef={(button) => {
                          if (button) buttons.current.set(document.id, button);
                          return () => {
                            buttons.current.delete(document.id);
                          };
                        }}
                      />
                    ))}
                  </AnimatePresence>
                </ul>

                {visible.length < filtered.length && (
                  <ShowMore
                    shown={visible.length}
                    total={filtered.length}
                    onClick={showMore}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </section>

      {viewing !== null && (
        <GalleryViewer
          documents={filtered}
          index={viewing}
          title={t("document")}
          label={label}
          thumbSizes={THUMB_SIZES}
          thumbnailOf={(id) => papers.current.get(id) ?? null}
          onIndexChange={setViewing}
          onClose={close}
        />
      )}
    </MotionConfig>
  );
}

interface CountryFilterProps {
  countries: CountryOption[];
  /** The number of documents from every country */
  total: number;
  /** The chosen country's key; null for all of them */
  current: string | null;
  onChange: (key: string | null) => void;
  className?: string;
  style?: CSSProperties;
}

/** One button per country, with its flag and number of documents, and one for all */
function CountryFilter({
  countries,
  total,
  current,
  onChange,
  className,
  style,
}: CountryFilterProps) {
  const t = useTranslations("gallery");
  const options = [
    { key: null, code: null, name: t("all"), count: total },
    ...countries,
  ];

  return (
    <div
      role="group"
      aria-label={t("filterLabel")}
      className={cn("flex flex-wrap gap-2", className)}
      style={style}
    >
      {options.map(({ key, code, name, count }) => {
        const active = key === current;
        return (
          <button
            key={key ?? "all"}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(key)}
            className={cn(
              "relative inline-flex h-10 items-center rounded-full border pr-2 text-sm font-medium transition-[border-color,color] duration-300 outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2",
              code ? "pl-1.5" : "pl-4",
              active
                ? "border-transparent text-neutral-950"
                : "border-neutral-200 text-neutral-700 hover:border-neutral-950 hover:text-neutral-950"
            )}
          >
            {active && (
              <motion.span
                layoutId="gallery-country-marker"
                transition={MARKER_SPRING}
                className="absolute -inset-px rounded-full bg-brand shadow-[0_8px_20px_-10px_rgba(254,204,0,0.95)]"
              />
            )}
            <span className="relative flex items-center gap-2">
              {code && <CountryFlag code={code} size="1.75rem" />}
              {name}
              <span
                className={cn(
                  "min-w-7 rounded-full px-1.5 py-0.5 text-center text-xs tabular-nums transition-colors duration-300",
                  active
                    ? "bg-neutral-950/10 text-neutral-950"
                    : "bg-neutral-100 text-neutral-500"
                )}
              >
                {count}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

interface DocumentCardProps {
  document: GalleryDocument;
  /** Its name for screen readers: the kind of document and its country */
  label: string;
  /** The desk is wider than tall, for galleries of landscape pictures */
  landscape: boolean;
  /** Its place among the cards that arrive together, to come in one after another */
  order: number;
  /** Load its picture at once, rather than as it nears the screen */
  eager: boolean;
  /** Open in the viewer: its page leaves the desk while it is shown large */
  viewing: boolean;
  onOpen: () => void;
  paperRef: Ref<HTMLSpanElement>;
  buttonRef: Ref<HTMLButtonElement>;
  /** AnimatePresence measures the card through this when it leaves */
  ref?: Ref<HTMLLIElement>;
}

/**
 * A document lying on a dotted desk, with its country below. A blank page with lines of
 * text holds its place until the scan has loaded, then the scan fades in. On hover the
 * page lifts. A click opens it large.
 */
function DocumentCard({
  document,
  label,
  landscape,
  order,
  eager,
  viewing,
  onOpen,
  paperRef,
  buttonRef,
  ref,
}: DocumentCardProps) {
  const [revealRef, reveal] = useReveal<HTMLLIElement>();
  const column = useColumn(revealRef);
  const image = useRef<HTMLImageElement>(null);
  // null: not known yet. The page from the server shows each picture as it comes.
  const [loaded, setLoaded] = useState<boolean | null>(null);

  useEffect(() => {
    if (image.current && !image.current.complete) setLoaded(false);
  }, []);

  const setRefs = useCallback(
    (card: HTMLLIElement | null) => {
      revealRef.current = card;
      if (typeof ref === "function") ref(card);
      else if (ref) ref.current = card;
    },
    [revealRef, ref]
  );

  const ratio = document.width / document.height;

  return (
    <motion.li
      ref={setRefs}
      data-reveal={reveal}
      layout="position"
      initial={{ opacity: 0, y: 24 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.6,
          ease: EASE_OUT_QUINT,
          delay: Math.min(order, 8) * 0.04,
        },
      }}
      exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.2 } }}
      transition={{ layout: CARD_LAYOUT }}
    >
      {/* Cards side by side come into view from left to right */}
      <div className={RISE_ON_REVEAL} style={delay(column * 90)}>
        <button
          ref={buttonRef}
          type="button"
          onClick={onOpen}
          aria-label={label}
          aria-haspopup="dialog"
          className="group/doc relative block w-full overflow-hidden rounded-[1.75rem] bg-neutral-100 bg-[radial-gradient(circle,var(--color-neutral-300)_1px,transparent_1px)] bg-[length:18px_18px] ring-1 ring-black/5 transition-shadow duration-500 ease-out-quint outline-none hover:shadow-[0_24px_48px_-28px_rgba(15,23,42,0.45)] focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
        >
          {/* The page lies in the middle of the desk, as large as fits */}
          <span
            className={cn(
              "flex items-center justify-center [container-type:size]",
              landscape ? "aspect-[4/3] p-[9%]" : "aspect-[4/5] p-[11%]"
            )}
          >
            <span
              ref={paperRef}
              className={cn(
                "relative overflow-hidden rounded-[3px] bg-white shadow-[0_18px_30px_-16px_rgba(15,23,42,0.45)] ring-1 ring-black/5 transition-[translate,scale,box-shadow] duration-500 ease-out-quint group-hover/doc:shadow-[0_28px_40px_-18px_rgba(15,23,42,0.5)] motion-safe:group-hover/doc:-translate-y-1.5 motion-safe:group-hover/doc:scale-[1.03]",
                viewing && "invisible"
              )}
              style={{
                width: `min(100cqw, ${(ratio * 100).toFixed(2)}cqh)`,
                aspectRatio: `${document.width} / ${document.height}`,
              }}
            >
              <BlankPage loaded={loaded === true} />
              <Image
                ref={image}
                src={document.src}
                alt=""
                fill
                sizes={THUMB_SIZES}
                loading={eager ? "eager" : "lazy"}
                onLoad={() => setLoaded(true)}
                className={cn(
                  "object-cover transition-[opacity,scale] duration-700 ease-out-quint",
                  loaded === false && "scale-[1.04] opacity-0"
                )}
              />
            </span>
          </span>

          {/* Says it opens large */}
          <span
            aria-hidden
            className="absolute top-3 right-3 grid size-9 scale-75 place-items-center rounded-full bg-white text-neutral-900 opacity-0 shadow-sm ring-1 ring-black/5 transition-[opacity,scale] duration-300 ease-out-quint group-hover/doc:scale-100 group-hover/doc:opacity-100 group-focus-visible/doc:scale-100 group-focus-visible/doc:opacity-100"
          >
            <Expand className="size-4" />
          </span>
        </button>

        {document.country && (
          <p
            className={cn(
              "mt-3 flex items-center gap-2 px-1 text-sm font-medium text-neutral-700",
              fontInter.className
            )}
          >
            {document.country.code && (
              <CountryFlag code={document.country.code} size="1.125rem" />
            )}
            <span className="min-w-0 truncate">{document.country.name}</span>
          </p>
        )}
      </div>
    </motion.li>
  );
}

/**
 * A blank page with a heading and lines of text, a soft light sweeping across it, until
 * the scan has loaded. Then it fades away under the scan.
 */
function BlankPage({ loaded }: { loaded: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "absolute inset-0 transition-opacity duration-700",
        loaded && "opacity-0"
      )}
    >
      <span className="absolute inset-[12%] flex flex-col gap-[6%]">
        <span className="h-[6%] w-2/5 rounded-full bg-neutral-200" />
        <span className="mt-[4%] h-[3%] w-full rounded-full bg-neutral-100" />
        <span className="h-[3%] w-11/12 rounded-full bg-neutral-100" />
        <span className="h-[3%] w-4/5 rounded-full bg-neutral-100" />
        <span className="mt-[4%] h-[3%] w-full rounded-full bg-neutral-100" />
        <span className="h-[3%] w-3/4 rounded-full bg-neutral-100" />
        <span className="h-[3%] w-5/6 rounded-full bg-neutral-100" />
      </span>
      {!loaded && (
        <span className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/80 to-transparent motion-reduce:animate-none" />
      )}
    </span>
  );
}

interface ShowMoreProps {
  shown: number;
  total: number;
  onClick: () => void;
}

/** How many are shown, as words and as a bar, and a button for the next batch */
function ShowMore({ shown, total, onClick }: ShowMoreProps) {
  const t = useTranslations("gallery");

  return (
    <div
      className={cn(
        "mt-16 flex flex-col items-center gap-5 sm:mt-20",
        fontInter.className
      )}
    >
      <div className="flex w-56 flex-col items-center gap-2.5">
        <p className="text-sm text-neutral-500 tabular-nums">
          {t("showing", { shown, total })}
        </p>
        <span
          aria-hidden
          className="h-1 w-full overflow-hidden rounded-full bg-neutral-200"
        >
          <span
            className="block h-full origin-left rounded-full bg-brand transition-[scale] duration-700 ease-out-quint"
            style={{ scale: `${shown / total} 1` }}
          />
        </span>
      </div>
      <button
        type="button"
        onClick={onClick}
        className={cn(
          "group/more inline-flex h-12 items-center gap-2 rounded-full bg-neutral-950 px-6 text-sm font-semibold text-white transition-[background-color,color,box-shadow] duration-300 outline-none hover:bg-brand hover:text-neutral-950 hover:shadow-[0_12px_28px_-12px_rgba(254,204,0,0.9)] focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2",
          fontPoppins.className
        )}
      >
        {t("showMore", { count: Math.min(BATCH, total - shown) })}
        <ArrowDown
          aria-hidden
          className="size-4 transition-transform duration-300 ease-out-quint group-hover/more:translate-y-0.5"
        />
      </button>
    </div>
  );
}
