import { getCollection, type CollectionEntry } from "astro:content";
import type { Locale } from "../i18n";

// Collection names per type and locale (see src/content.config.ts).
const collections = {
  profile: { es: "profileEs", en: "profileEn" },
  projects: { es: "projectsEs", en: "projectsEn" },
  education: { es: "educationEs", en: "educationEn" },
  work: { es: "workEs", en: "workEn" },
  certifications: { es: "certificationsEs", en: "certificationsEn" },
  communities: { es: "communitiesEs", en: "communitiesEn" },
  materials: { es: "materialsEs", en: "materialsEn" },
} as const;

type ContentType = keyof typeof collections;
type EntryOf<T extends ContentType> = CollectionEntry<(typeof collections)[T]["es"] | (typeof collections)[T]["en"]>;

// Fetch every entry of a collection for a locale, sorted by the `order` field
// (JSON array order is not guaranteed by the file loader).
export async function getSorted<T extends ContentType>(type: T, locale: Locale): Promise<EntryOf<T>[]> {
  const name = collections[type][locale];
  // The lookup is correct at runtime; TS cannot correlate `type` with `name`.
  const entries = (await getCollection(name)) as EntryOf<T>[];
  return [...entries].sort((a, b) => orderOf(a) - orderOf(b));
}

// Single-entry collections (profile).
export async function getSingle<T extends ContentType>(type: T, locale: Locale): Promise<EntryOf<T>> {
  const name = collections[type][locale];
  const [entry] = (await getCollection(name)) as EntryOf<T>[];
  if (!entry) throw new Error(`Missing single-entry collection "${type}" for locale "${locale}"`);
  return entry;
}

function orderOf(entry: { data: object }): number {
  const data = entry.data as { order?: number };
  return data.order ?? 0;
}
