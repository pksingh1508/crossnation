"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { getLocalizedPath, stripLocalePrefix } from "@/lib/locale-paths";
import { useLocaleStore } from "@/store/useLocaleStore";
import language from "@/constants/language.json";

interface LanguageSwitcherProps {
  /** "dark" for the black top bar, "light" for white backgrounds. */
  variant?: "dark" | "light";
  className?: string;
}

export function LanguageSwitcher({
  variant = "light",
  className,
}: LanguageSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { setLocale } = useLocaleStore();
  const current = language.find((lang) => lang.isoCode === locale);

  const handleLanguageChange = (newLocale: string) => {
    // set the locale in global state management
    setLocale(newLocale);
    const pathWithoutLocale = stripLocalePrefix(pathname);

    router.push(getLocalizedPath(newLocale, pathWithoutLocale));
  };

  return (
    <SelectPrimitive.Root value={locale} onValueChange={handleLanguageChange}>
      <SelectPrimitive.Trigger
        aria-label="Change language"
        className={cn(
          "group inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-full px-3 text-[13px] font-medium whitespace-nowrap outline-none transition-colors duration-200 focus-visible:ring-2",
          variant === "dark"
            ? "text-neutral-300 hover:bg-white/10 hover:text-white focus-visible:ring-brand/70 data-[state=open]:bg-white/10 data-[state=open]:text-white"
            : "border border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300 hover:text-neutral-950 focus-visible:ring-neutral-900/20 data-[state=open]:border-neutral-300 data-[state=open]:text-neutral-950",
          className
        )}
      >
        <Globe
          aria-hidden
          className={cn(
            "size-3.5",
            variant === "dark" ? "text-brand" : "text-neutral-500"
          )}
        />
        <SelectPrimitive.Value>
          <span className="max-sm:hidden">{current?.name ?? locale}</span>
          <span className="sm:hidden">{locale.toUpperCase()}</span>
        </SelectPrimitive.Value>
        <SelectPrimitive.Icon asChild>
          <ChevronDown
            aria-hidden
            className="size-3.5 opacity-70 transition-transform duration-300 group-data-[state=open]:rotate-180"
          />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        {/* z-[70] keeps the list above the header and the open mobile menu */}
        <SelectPrimitive.Content
          position="popper"
          align="end"
          sideOffset={8}
          className="z-[70] min-w-44 origin-(--radix-select-content-transform-origin) overflow-hidden rounded-xl border border-neutral-200 bg-white p-1 text-neutral-700 shadow-xl shadow-neutral-900/10 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
        >
          <SelectPrimitive.Viewport>
            {language.map((lang) => (
              <SelectPrimitive.Item
                key={lang.isoCode}
                value={lang.isoCode}
                className="relative flex cursor-pointer items-center gap-3 rounded-lg py-2 pr-3 pl-8 text-sm outline-none select-none transition-colors data-[highlighted]:bg-neutral-100 data-[highlighted]:text-neutral-950 data-[state=checked]:font-semibold data-[state=checked]:text-neutral-950"
              >
                <SelectPrimitive.ItemIndicator className="absolute left-2.5 inline-flex">
                  <Check aria-hidden className="size-3.5 text-amber-500" />
                </SelectPrimitive.ItemIndicator>
                <SelectPrimitive.ItemText>{lang.name}</SelectPrimitive.ItemText>
                <span
                  aria-hidden
                  className="ml-auto text-[11px] font-medium tracking-wider text-neutral-400 uppercase"
                >
                  {lang.isoCode}
                </span>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}
