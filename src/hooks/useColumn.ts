"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * Which column of a grid, or of CSS columns, an item is in (0 for the first), measured
 * once it is laid out. Items side by side use it to come in one after another, from left
 * to right, whatever the number of columns at the screen's width.
 */
export function useColumn(ref: RefObject<HTMLElement | null>) {
  const [column, setColumn] = useState(0);

  useEffect(() => {
    const item = ref.current;
    const list = item?.parentElement;
    if (!item || !list || !item.offsetWidth) return;
    const left =
      item.getBoundingClientRect().left - list.getBoundingClientRect().left;
    setColumn(Math.round(left / item.offsetWidth));
  }, [ref]);

  return column;
}
