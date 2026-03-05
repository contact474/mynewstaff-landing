"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { translations, type Locale, type PartnersTranslations } from "@/lib/partners-i18n";

interface LocaleContextValue {
  locale: Locale;
  t: PartnersTranslations;
  setLocale: (l: Locale) => void;
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: "en",
  t: translations.en,
  setLocale: () => {},
});

export function usePartnerLocale() {
  return useContext(LocaleContext);
}

export function PartnersLocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const stored = localStorage.getItem("mns-partners-locale") as Locale | null;
    if (stored && translations[stored]) {
      setLocaleState(stored);
      return;
    }
    const browserLang = navigator.language || (navigator.languages && navigator.languages[0]) || "en";
    if (browserLang.startsWith("es")) {
      setLocaleState("es");
    }
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    localStorage.setItem("mns-partners-locale", l);
  };

  return (
    <LocaleContext.Provider value={{ locale, t: translations[locale], setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}
