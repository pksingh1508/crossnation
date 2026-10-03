import { Fragment } from "react";
import { cn } from "@/lib/utils";

/**
 * Splits text into words. A lone "?" or "!" (French puts a space before them) stays with
 * the word before it, so it never ends up alone on the last line.
 */
function splitWords(text: string) {
  return text
    .split(/\s+/)
    .filter(Boolean)
    .reduce<string[]>((words, word) => {
      if (words.length > 0 && /^[?!:;]+$/.test(word)) {
        words[words.length - 1] += `\u00a0${word}`;
      } else {
        words.push(word);
      }
      return words;
    }, []);
}

interface WordRevealProps {
  text: string;
  /** The animation of each word, e.g. "animate-word" */
  className: string;
  /** When the first word starts, in ms */
  delay?: number;
  /** Time between two words, in ms */
  stagger?: number;
}

/**
 * Heading text whose words slide up one after another. Each word sits in a box that hides
 * it until it slides in. The box's padding leaves room for accents and descenders; its
 * negative margin keeps the line height unchanged.
 */
export function WordReveal({
  text,
  className,
  delay = 0,
  stagger = 70,
}: WordRevealProps) {
  return (
    <>
      {splitWords(text).map((word, index) => (
        <Fragment key={index}>
          {index > 0 && " "}
          <span className="-mt-[0.1em] -mb-[0.15em] inline-block overflow-hidden pt-[0.1em] pb-[0.15em] align-top">
            <span
              className={cn("inline-block", className)}
              style={{ animationDelay: `${delay + index * stagger}ms` }}
            >
              {word}
            </span>
          </span>
        </Fragment>
      ))}
    </>
  );
}
