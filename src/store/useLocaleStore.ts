import { create } from "zustand";

interface LocaleState {
  locale: string;
  setLocale: (newLocale: string) => void;
}

export const useLocaleStore = create<LocaleState>((set) => ({
  locale: "en", // default locale
  setLocale: (newLocale) => set({ locale: newLocale }),
}));
