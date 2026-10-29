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

export function getLocaleFromPathname(pathname: string): Locale {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "es";
}

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
