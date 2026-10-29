import {
  getDict,
  getPath,
  type Dictionary,
  type Locale,
  type PageKey,
} from "../i18n";
import { getSorted } from "./content";

// Hidden Notion Mode payload (DESIGN.md §10, easter egg 1). A compact digest
// of the current page, built at build time from the same collections the page
// renders, so the toy never drifts from the real content. All strings come
// from the dictionaries; the lazy module renders them with textContent only.

export interface NotionItem {
  title: string;
  detail?: string;
  meta?: string;
  emoji?: string;
  href?: string;
}

export interface NotionBlock {
  heading?: string;
  blurb?: string;
  items: NotionItem[];
}

export interface NotionPayload {
  title: string;
  blurb?: string;
  blocks: NotionBlock[];
  ui: {
    modeTitle: string;
    closeLabel: string;
    searchPlaceholder: string;
    noResults: string;
    navLabel: string;
    consoleHint: string;
    pages: { label: string; href: string; current: boolean }[];
  };
}

// The fields the digest needs; pages already pass the full profile.
type NotionProfile = {
  name: string;
  title: string;
  location: string;
  greeting: string;
  bio: string;
};

export async function buildNotionPayload(
  locale: Locale,
  pageKey: PageKey,
  profile: NotionProfile,
): Promise<NotionPayload> {
  const dict = getDict(locale);
  return {
    title:
      dict.nav.find((item) => item.key === pageKey)?.label ??
      dict.meta[pageKey].title,
    blurb: blurbFor(pageKey, dict, profile),
    blocks: await blocksFor(locale, pageKey, dict, profile),
    ui: {
      modeTitle: dict.notion.modeTitle,
      closeLabel: dict.notion.closeLabel,
      searchPlaceholder: dict.notion.searchPlaceholder,
      noResults: dict.notion.noResults,
      navLabel: dict.notion.navLabel,
      consoleHint: dict.notion.consoleHint,
      pages: dict.nav.map((item) => ({
        label: item.label,
        href: getPath(locale, item.key),
        current: item.key === pageKey,
      })),
    },
  };
}

// Page-level intro line, mirroring what each page renders above its content.
function blurbFor(
  pageKey: PageKey,
  dict: Dictionary,
  profile: NotionProfile,
): string | undefined {
  switch (pageKey) {
    case "home":
      return profile.greeting;
    case "skills":
      return undefined; // each block carries its own intro instead
    case "projects":
      return dict.intros.projects;
    case "communities":
      return dict.intros.communities;
    case "resources":
      return dict.intros.materials;
  }
}

async function blocksFor(
  locale: Locale,
  pageKey: PageKey,
  dict: Dictionary,
  profile: NotionProfile,
): Promise<NotionBlock[]> {
  switch (pageKey) {
    case "home":
      // The hero is the "Sobre mí" section (DESIGN.md §5).
      return [
        {
          heading: profile.name,
          items: [
            {
              title: profile.title,
              detail: profile.bio,
              meta: profile.location,
            },
          ],
        },
      ];

    case "skills": {
      const [education, work, certifications] = await Promise.all([
        getSorted("education", locale),
        getSorted("work", locale),
        getSorted("certifications", locale),
      ]);
      return [
        {
          heading: dict.sections.education,
          blurb: dict.intros.education,
          items: education.map((entry) => ({
            title: entry.data.degree,
            detail: entry.data.institution,
            meta:
              entry.data.status === "in-progress"
                ? `${entry.data.location} · ${dict.educationStatus}`
                : entry.data.location,
          })),
        },
        {
          heading: dict.sections.work,
          blurb: dict.intros.work,
          items: work.map((entry) => ({
            title: entry.data.role,
            detail: entry.data.description,
            meta: [
              entry.data.company,
              entry.data.end
                ? `${entry.data.start} – ${entry.data.end}`
                : `${entry.data.start} – …`,
              entry.data.location,
            ].join(" · "),
          })),
        },
        {
          heading: dict.sections.certifications,
          blurb: dict.intros.certifications,
          items: certifications.map((entry) => ({
            title: entry.data.title,
            detail: entry.data.issuer,
            meta: entry.data.validity,
            href: entry.data.url,
          })),
        },
      ];
    }

    case "projects": {
      const projects = await getSorted("projects", locale);
      return [
        {
          items: projects.map((entry) => ({
            title: entry.data.title,
            detail: entry.data.description,
            meta: entry.data.tech.join(" · "),
            href: entry.data.url,
          })),
        },
      ];
    }

    case "communities": {
      const communities = await getSorted("communities", locale);
      return [
        {
          items: communities.map((entry) => ({
            emoji: entry.data.emoji,
            title: entry.data.name,
            detail: entry.data.description,
            meta: entry.data.role,
            href: entry.data.url,
          })),
        },
      ];
    }

    case "resources": {
      const materials = await getSorted("materials", locale);
      return [
        {
          items: materials.map((entry) => ({
            title: entry.data.title,
            detail: entry.data.description,
            meta: [
              dict.materialTypes[entry.data.type],
              new URL(entry.data.url).hostname.replace(/^www\./, ""),
              entry.data.inSpanish ? dict.inSpanish : null,
            ]
              .filter(Boolean)
              .join(" · "),
            href: entry.data.url,
          })),
        },
      ];
    }

    default:
      return [];
  }
}
