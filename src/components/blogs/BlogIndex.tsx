"use client";

import {
  useEffect,
  useOptimistic,
  useRef,
  useState,
  useTransition,
  type CSSProperties,
  type FormEvent,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { LoaderCircle, RotateCw, Search, SearchX, X } from "lucide-react";
import type { BlogPostCard, Page } from "@/lib/cms/types";
import { useTranslations } from "@/hooks/useTranslations";
import { useLenis } from "@/utils/lenis";
import { Eyebrow } from "@/components/ui/eyebrow";
import { WordReveal } from "@/components/ui/word-reveal";
import { fontInter, fontPoppins } from "@/fonts";
import { delay, RISE_ON_REVEAL } from "@/lib/animation";
import { cn } from "@/lib/utils";
import { BlogCard, WIDE_AT_MD } from "./BlogCard";
import { FeaturedPost } from "./FeaturedPost";
import { Pagination } from "./Pagination";

/** How long typing must pause before the search runs, in ms */
const SEARCH_DELAY = 350;

interface BlogIndexProps {
  /** The page of posts the address asks for; null when it couldn't be loaded */
  result: Page<BlogPostCard> | null;
  /** The search term in the address, already cleaned */
  query: string;
}

/**
 * The blog's list. The page number and the search term live in the address (?page=2&q=…),
 * and the server renders that page, so the back button, shared links and search engines
 * all work. Here, changing page or searching navigates smoothly: the list dims while the
 * next one loads, then fades in.
 */
export function BlogIndex({ result, query }: BlogIndexProps) {
  const t = useTranslations("blogsPage");
  const tPages = useTranslations("pagination");
  const router = useRouter();
  const pathname = usePathname();
  const lenis = useLenis();
  const listRef = useRef<HTMLDivElement>(null);
  const [isPending, startTransition] = useTransition();
  // Once the visitor has changed page or searched, a new list fades in as a whole
  const [changed, setChanged] = useState(false);

  const page = result?.page ?? 1;
  const pageCount = result?.pageCount ?? 0;
  const total = result?.total ?? 0;
  const posts = result?.items ?? [];
  // The chosen page is marked at once, before it has loaded
  const [markedPage, markPage] = useOptimistic(page);

  const href = (to: number, q = query) => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (to > 1) params.set("page", String(to));
    const search = params.toString();
    return search ? `${pathname}?${search}` : pathname;
  };

  const goToPage = (to: number) => {
    setChanged(true);
    // Back to the top of the list while the page loads. The target is measured from where
    // the window really is, and Lenis is told that first, in case a native scroll (keyboard
    // focus, find in page) got ahead of it.
    const list = listRef.current;
    if (list) {
      const top = list.getBoundingClientRect().top + window.scrollY - 140;
      if (lenis) {
        lenis.scrollTo(window.scrollY, { immediate: true });
        lenis.scrollTo(top);
      } else {
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
    startTransition(() => {
      markPage(to);
      router.push(href(to), { scroll: false });
    });
  };

  // A new search starts on page 1, and replaces the address rather than adding to history
  const search = (term: string) => {
    if (term === query) return;
    setChanged(true);
    startTransition(() => router.replace(href(1, term), { scroll: false }));
  };

  // The newest post of each page is shown large; search results are all cards
  const featured = !query && posts.length > 0 ? posts[0] : null;
  const cards = featured ? posts.slice(1) : posts;

  return (
    <section className={cn("bg-white pb-20 sm:pb-24", fontPoppins.className)}>
      <div className="mx-auto w-full max-w-7xl px-4">
        {/* On screen when the page opens, so shown from the start */}
        <div
          data-reveal="shown"
          className="grid grid-cols-1 gap-8 pt-8 lg:grid-cols-12 lg:items-end lg:gap-16 lg:pt-10"
        >
          <div className="lg:col-span-7">
            <Eyebrow>{t("title")}</Eyebrow>
            {/* The blog's main heading */}
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
            <SearchBox
              query={query}
              pending={isPending}
              onSearch={search}
              className={cn("mt-6", RISE_ON_REVEAL)}
              style={delay(450)}
            />
          </div>
        </div>

        <div ref={listRef} className="mt-14 sm:mt-16">
          {result && total > 0 && (
            <div
              className={cn(
                "mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-neutral-200 pb-4 text-sm text-neutral-500",
                fontInter.className
              )}
            >
              <p aria-live="polite">
                {t("postCount", { count: total })}
                {pageCount > 1 && (
                  <span className="text-neutral-400">
                    {" · "}
                    {tPages("pageOf", { page, count: pageCount })}
                  </span>
                )}
              </p>
              {query && (
                <ClearSearch
                  label={t("clearSearch")}
                  onClear={() => search("")}
                />
              )}
            </div>
          )}

          {/* The list dims while the next one loads; a new one fades in as a whole */}
          <div
            key={`${page}|${query}`}
            aria-busy={isPending}
            className={cn(
              "transition-opacity duration-300",
              isPending && "opacity-40",
              changed && "animate-rise motion-reduce:animate-none"
            )}
          >
            {!result ? (
              <Notice
                icon={RotateCw}
                text={t("loadError")}
                action={{
                  label: t("retry"),
                  onClick: () => startTransition(() => router.refresh()),
                }}
              />
            ) : posts.length === 0 ? (
              query ? (
                <Notice
                  icon={SearchX}
                  text={t("noResults", { query })}
                  action={{
                    label: t("clearSearch"),
                    onClick: () => search(""),
                  }}
                />
              ) : (
                <Notice icon={Search} text={t("noPosts")} />
              )
            ) : (
              <>
                {featured && (
                  <div data-reveal="shown" className="mb-16 sm:mb-20">
                    <FeaturedPost blog={featured} />
                  </div>
                )}
                {cards.length > 0 && (
                  <ul className="grid grid-cols-1 gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
                    {cards.map((blog, index) => (
                      <BlogCard
                        key={blog.id}
                        blog={blog}
                        // Each row's cards come in one after another
                        start={(index % 3) * 100}
                        // With an odd number of cards, the last spans both columns
                        {...(index === cards.length - 1 &&
                        cards.length % 2 === 1
                          ? WIDE_AT_MD
                          : {})}
                      />
                    ))}
                  </ul>
                )}
              </>
            )}
          </div>

          <Pagination
            page={markedPage}
            pageCount={pageCount}
            href={href}
            onNavigate={goToPage}
          />
        </div>
      </div>
    </section>
  );
}

interface SearchBoxProps {
  query: string;
  pending: boolean;
  onSearch: (term: string) => void;
  className?: string;
  style?: CSSProperties;
}

/**
 * Searches as you type, once typing pauses; Enter searches at once. While the results
 * load, the magnifier turns into a spinner.
 */
function SearchBox({
  query,
  pending,
  onSearch,
  className,
  style,
}: SearchBoxProps) {
  const t = useTranslations("blogsPage");
  const [value, setValue] = useState(query);
  // The last term sent; a different term in the address came from elsewhere (back button)
  const sent = useRef(query);

  useEffect(() => {
    if (query !== sent.current) {
      sent.current = query;
      setValue(query);
    }
  }, [query]);

  const send = (term: string) => {
    sent.current = term;
    onSearch(term);
  };

  useEffect(() => {
    const term = value.trim();
    if (term === sent.current) return;
    const timer = setTimeout(() => send(term), SEARCH_DELAY);
    return () => clearTimeout(timer);
    // Only what's typed restarts the timer; send is a new function on every render
  }, [value]);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    send(value.trim());
  };

  const Icon = pending ? LoaderCircle : Search;

  return (
    <form
      role="search"
      onSubmit={submit}
      className={cn("relative", className)}
      style={style}
    >
      <Icon
        aria-hidden
        className={cn(
          "pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-neutral-400",
          pending && "animate-spin"
        )}
      />
      <input
        type="search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder={t("searchPlaceholder")}
        aria-label={t("searchPlaceholder")}
        maxLength={100}
        className={cn(
          "h-12 w-full rounded-full border border-neutral-200 bg-neutral-50 pr-12 pl-12 text-base text-neutral-950 transition-[border-color,background-color,box-shadow] duration-200 outline-none placeholder:text-neutral-400 hover:border-neutral-300 focus:border-neutral-950 focus:bg-white focus:ring-4 focus:ring-brand/30 md:text-sm [&::-webkit-search-cancel-button]:appearance-none",
          fontInter.className
        )}
      />
      {value && (
        <button
          type="button"
          onClick={() => {
            setValue("");
            send("");
          }}
          aria-label={t("clearSearch")}
          className="absolute top-1/2 right-2 grid size-8 -translate-y-1/2 place-items-center rounded-full text-neutral-500 transition-colors duration-200 outline-none hover:bg-neutral-200 hover:text-neutral-950 focus-visible:ring-2 focus-visible:ring-neutral-950"
        >
          <X aria-hidden className="size-4" />
        </button>
      )}
    </form>
  );
}

function ClearSearch({
  label,
  onClear,
}: {
  label: string;
  onClear: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClear}
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-medium text-neutral-700 transition-colors duration-200 outline-none hover:bg-neutral-100 hover:text-neutral-950 focus-visible:ring-2 focus-visible:ring-neutral-950"
    >
      <X aria-hidden className="size-3.5" />
      {label}
    </button>
  );
}

interface NoticeProps {
  icon: typeof Search;
  text: string;
  action?: { label: string; onClick: () => void };
}

/** In place of the list: nothing found, or an error, with what to do next */
function Notice({ icon: Icon, text, action }: NoticeProps) {
  return (
    <div className="flex flex-col items-center rounded-[2rem] border border-dashed border-neutral-200 px-6 py-16 text-center">
      <span className="grid size-12 place-items-center rounded-2xl bg-brand-soft text-neutral-900">
        <Icon aria-hidden className="size-5" />
      </span>
      <p className="mt-5 max-w-md text-lg font-semibold text-neutral-950">
        {text}
      </p>
      {action && (
        <button
          type="button"
          onClick={action.onClick}
          className="mt-6 inline-flex h-11 items-center rounded-full bg-neutral-950 px-5 text-sm font-semibold text-white transition-colors duration-300 outline-none hover:bg-brand hover:text-neutral-950 focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
