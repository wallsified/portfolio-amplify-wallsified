import { en } from "./en";
import type { Dictionary, PageKey } from "./es";
import { es } from "./es";

export type { Dictionary, PageKey };

export type Locale = "es" | "en";
export const defaultLocale: Locale = "es";

const dictionaries: Record<Locale, Dictionary> = { es, en };

export function getDict(locale: Locale): Dictionary {
  return dictionaries[locale];
}

// Locale from a pathname: everything under /en/ is English, the rest is Spanish.
export function getLocaleFromPathname(pathname: string): Locale {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "es";
}

// Canonical path of each page per locale
const paths: Record<Locale, Record<PageKey, string>> = {
  es: {
    home: "/",
    skills: "/experiencia",
    projects: "/proyectos",
    communities: "/comunidades",
    resources: "/materiales",
  },
  en: {
    home: "/en",
    skills: "/en/skills",
    projects: "/en/projects",
    communities: "/en/communities",
    resources: "/en/resources",
  },
};

export function getPath(locale: Locale, key: PageKey): string {
  return paths[locale][key];
}

export function getPageKey(locale: Locale, pathname: string): PageKey | null {
  const clean =
    pathname.length > 1 && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;
  const entry = Object.entries(paths[locale]).find(
    ([, path]) => path === clean,
  );
  return (entry?.[0] as PageKey | undefined) ?? null;
}

// Path of the current page in the other language (for the language switch and hreflang).
export function getTwinPath(pathname: string): string {
  const locale = getLocaleFromPathname(pathname);
  const key = getPageKey(locale, pathname);
  if (!key) return paths[locale].home;
  const other: Locale = locale === "es" ? "en" : "es";
  return paths[other][key];
}
