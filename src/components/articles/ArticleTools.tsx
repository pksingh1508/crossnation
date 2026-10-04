"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { Check, Facebook, Link2, Linkedin, Share2 } from "lucide-react";
import { useTranslations } from "@/hooks/useTranslations";
import { XLogo } from "@/components/layout/header-links";
import { cn } from "@/lib/utils";
import { COLLECTIONS, type Collection } from "./collections";

/**
 * A thin yellow bar across the top of the window that fills as the article is read: from
 * when its text reaches the navbar until its end reaches the bottom of the window.
 */
export function ReadingProgress({
  target,
}: {
  target: RefObject<HTMLElement | null>;
}) {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start 120px", "end end"],
  });
  // Eased, so it glides rather than jumps with each turn of the wheel
  const eased = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-brand"
      style={{ scaleX: reduceMotion ? scrollYProgress : eased }}
    />
  );
}

const ROUND =
  "relative grid size-10 place-items-center rounded-full border border-neutral-200 text-neutral-600 transition-[translate,background-color,border-color,color] duration-300 ease-out-quint outline-none hover:border-brand hover:bg-brand hover:text-neutral-950 focus-visible:ring-2 focus-visible:ring-neutral-950 motion-safe:hover:-translate-y-0.5";

interface ShareButtonsProps {
  collection: Collection;
  title: string;
  /** The article's address */
  url: string;
  className?: string;
}

/**
 * Share on Facebook, X or LinkedIn, or copy the link. Where the browser can share (most
 * phones), a share button opens its own menu too.
 */
export function ShareButtons({
  collection,
  title,
  url,
  className,
}: ShareButtonsProps) {
  const t = useTranslations(COLLECTIONS[collection].namespace);
  const [canShare, setCanShare] = useState(false);
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Known only in the browser, so checked after the first render
  useEffect(() => {
    setCanShare(typeof navigator.share === "function");
    return () => clearTimeout(timer.current);
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // No clipboard access (an old browser or an insecure page): nothing to show
    }
  };

  const share = async () => {
    try {
      await navigator.share({ title, url });
    } catch {
      // Closed without sharing
    }
  };

  const links = [
    {
      label: "Facebook",
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    },
    {
      label: "X",
      icon: XLogo,
      href: `https://x.com/intent/post?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    },
    {
      label: "LinkedIn",
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
  ];

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {canShare && (
        <button
          type="button"
          onClick={share}
          className="inline-flex h-10 items-center gap-2 rounded-full bg-neutral-950 px-4 text-sm font-semibold text-white transition-colors duration-300 outline-none hover:bg-brand hover:text-neutral-950 focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
        >
          <Share2 aria-hidden className="size-4" />
          {t("share")}
        </button>
      )}
      {links.map(({ label, icon: Icon, href }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${t("share")}: ${label}`}
          className={ROUND}
        >
          <Icon aria-hidden className="size-4" />
        </a>
      ))}
      <button
        type="button"
        onClick={copy}
        aria-label={t("copyLink")}
        className={ROUND}
      >
        {/* The link icon turns into a tick, and a note says the link was copied */}
        <Link2
          aria-hidden
          className={cn(
            "size-4 transition-[opacity,scale] duration-300 ease-out-quint",
            copied && "scale-50 opacity-0"
          )}
        />
        <Check
          aria-hidden
          className={cn(
            "absolute size-4 transition-[opacity,scale] duration-300 ease-out-quint",
            copied ? "scale-100 opacity-100" : "scale-50 opacity-0"
          )}
        />
        <span
          role="status"
          className={cn(
            "pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded-full bg-neutral-950 px-3 py-1 text-xs font-medium whitespace-nowrap text-white transition-[opacity,translate] duration-300 ease-out-quint",
            copied ? "opacity-100" : "translate-y-1 opacity-0"
          )}
        >
          {copied ? t("linkCopied") : ""}
        </span>
      </button>
    </div>
  );
}
