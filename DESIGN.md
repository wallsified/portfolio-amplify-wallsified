---
name: Daniel Paredes Portfolio — Navy Teal on Warm Paper
description: Dark developer portfolio, five routes, bilingual (ES/EN). Brittany Chiang's rigid resume structure and navy/teal palette, softened with Notion's editorial serif, warm cream headings and pastel washes. One hidden terminal easter egg.
status: draft (DESIGN.md spec is alpha; validate tokens with the official CLI before relying on them)
colors:
  surface-primary: "#0A192F"
  surface-secondary: "#112240"
  surface-elevated: "#1D2D50"
  surface-terminal: "#020C1B"
  line: "#233554"
  text-heading: "#F7F6F3"
  text-primary: "#CCD6F6"
  text-secondary: "#8892B0"
  accent: "#64FFDA"
  accent-wash: "rgba(100,255,218,0.10)"
  wash-peach: "rgba(250,235,221,0.12)"
  wash-sage: "rgba(219,237,219,0.12)"
  wash-sky: "rgba(211,229,239,0.12)"
typography:
  display: { family: "Fraunces", fallback: "Georgia, serif", weight: 500 }
  body: { family: "Inter", fallback: "system-ui, sans-serif", weight: 400 }
  mono:
    {
      family: "JetBrains Mono",
      fallback: "ui-monospace, Menlo, monospace",
      weight: 400,
    }
rounded: { sm: 4px, md: 8px, lg: 12px }
spacing: { base: 8px, scale: [8, 16, 24, 32, 48, 64, 96, 128] }
motion:
  { fast: 150ms, base: 250ms, easing: "cubic-bezier(0.645, 0.045, 0.355, 1)" }
---

# Daniel Paredes Portfolio — DESIGN.md

**Provenance:** structure derived from the _Brittany Chiang_ DESIGN.md (avaliable at `agent_docs/references/Brittany-Chiang-DESIGN.md`), warmth derived from the _Notion_ DESIGN.md (available at `agent_docs/references/Notion-DESIGN.md`). These are design _principles_ to borrow, not assets: never copy either site's text, images, logos or illustrations.
**Subject:** Daniel Paredes (@wallsified), "Computólogo / Desarrollador", Ciudad de México. All real copy lives in `agent_docs/spanish_content.md`; never invent biography, employers, dates or metrics.

## 1. Visual Theme & Atmosphere

A well-dressed resume that feels like a notebook you keep at night. The skeleton is strict and sober (Brittany): fixed page order, narrow reading column, numbered pages, one teal accent on a deep navy canvas. The warmth comes from three Notion borrowings only: a **serif display face**, **warm cream headings** instead of cold blue-white, and **pastel washes** behind the few emoji. Calm, confident, human; the voice is first person, plain and generous (the site's mission is making technical knowledge accessible).

Spend the boldness in two places and keep everything else quiet: the **hero typography** (large serif name) and the **hidden terminal** (section 10). No gradients, no illustrations, no decorative motion.

Dark only in v1 (`color-scheme: dark`). Do not add a light theme unless asked; if added later, teal `#64FFDA` fails on cream and needs a darker variant.

## 2. Color Palette & Roles

| Token                   | Hex                                                                   | Role                                                                   |
| ----------------------- | --------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| surface-primary         | #0A192F                                                               | Page canvas (navy)                                                     |
| surface-secondary       | #112240                                                               | Cards, mobile sheet, tab panels                                        |
| surface-elevated        | #1D2D50                                                               | Card hover, active tab                                                 |
| surface-terminal        | #020C1B                                                               | Terminal window only                                                   |
| line                    | #233554                                                               | Page-title rules, dividers, card borders                               |
| text-heading            | #F7F6F3                                                               | H1–H3 (Notion cream; the warmth lives here)                            |
| text-primary            | #CCD6F6                                                               | Body text, titles in lists                                             |
| text-secondary          | #8892B0                                                               | Supporting copy, metadata (≈5.7:1 on canvas, AA)                       |
| accent                  | #64FFDA                                                               | The only accent: numbers, links, borders, focus, active states (≈14:1) |
| accent-wash             | rgba(100,255,218,.10)                                                 | Button hover fill, image tint, selection                               |
| wash-peach / sage / sky | rgba(250,235,221,.12) / rgba(219,237,219,.12) / rgba(211,229,239,.12) | Circles behind emoji badges and terminal title-bar dots only           |

Rule: **one accent**. Pastels are washes, never text, borders or buttons. Cream is for headings only; body stays blue-gray.

## 3. Typography Rules

- **Display / headings:** Fraunces (free, variable; Lyon Display is commercial, do not use). Weight 500, self-hosted, subset, `font-display: swap`.
- **Body:** Inter 400, self-hosted. **Mono:** JetBrains Mono (SF Mono cannot be self-hosted on the web) for page numbers, nav, buttons, tags, dates, language switch and terminal.
- Line length ≤ 62ch. Serif headings get slightly more leading than sans.

| Level           | Font           | Size                   | Line-height | Weight | Tracking |
| --------------- | -------------- | ---------------------- | ----------- | ------ | -------- |
| H1 (name)       | Fraunces       | clamp(44px, 8vw, 80px) | 1.05        | 500    | -0.02em  |
| H2 (page title) | Fraunces       | clamp(28px, 4vw, 40px) | 1.15        | 500    | -0.015em |
| H3              | Fraunces       | 22–26px                | 1.25        | 500    | -0.01em  |
| Body            | Inter          | 17–18px                | 1.6         | 400    | -0.005em |
| Small           | Inter          | 15px                   | 1.55        | 400    | 0        |
| Mono            | JetBrains Mono | 12–14px                | 1.5         | 400    | 0        |

No ALL CAPS labels, no tracked-out eyebrows. Mono labels stay lowercase or sentence case.

## 4. Component Stylings

- **Page title:** mono accent number (`01.`) + Fraunces H2 + a 1px `line` rule filling the remaining width. Numbers mirror the fixed nav order and appear only here and in the nav.
- **Primary button:** 48px high, 4px radius, 0/28px padding, JetBrains Mono 14px, transparent fill, 1px accent border, accent text. Hover: `accent-wash` fill. Never a solid-filled CTA.
- **Top nav:** floating bar (12px margin from the top edge, `surface-primary` at 70% with backdrop blur, 1px `line` border, 8px radius, 64px tall), always blurred; hides on scroll-down and returns on scroll-up. Five links, mono 13px: `01. Sobre mí · 02. Experiencia · 03. Proyectos · 04. Comunidades · 05. Materiales`. The current page is accent with `aria-current="page"`. Right side: language switch only — the CV lives in the side rail (≥1080px), the footer links (<1080px) and the mobile sheet, never as a nav button.
- **Language switch:** two mono buttons `ES | EN`, active one in accent, inactive in text-secondary, 44px minimum touch area. See section 10.
- **Side rails (≥1080px only):** left, vertical `@wallsified` rotated so it reads bottom-to-top, with a 90px `line` rule below; right, vertical icons (GitHub, LinkedIn, AWS Builder Center, CV) with the same rule. Bottom-anchored.
- **Education / Certification row:** full-width list row, 1px `line` divider. Title (text-primary) with issuer or institution below (text-secondary); right side mono dates (`2024 – 2027`, `en curso`) and, for certifications, an external "verify" icon link. Not cards: these are records, not highlights.
- **Work tabs (Experiencia laboral):** tab list on the left (mono 13px, 2px left border `line`, active border accent + `surface-elevated` fill) with the company name; panel on the right: role as H3, company in accent, mono dates, location in text-secondary, one short description. Two entries today. On mobile the tabs become a horizontally scrolling row with a bottom border.
- **Featured project row:** Projects use **project cards**: `surface-secondary`, 8px radius, 28px padding, github icon in accent, title, 3-line description, tech list; hover translateY(-4px).
- **Community card:** `surface-secondary`, 1px `line`, 8px radius, 32px padding. Top-left a 48px circle in a pastel wash holding **one** emoji (32px); H3 below; full description; mono 12px accent label naming the role (founder, lead, staff). Whole card is one link. Hover: translateY(-4px) and border to accent at 40%.
- **Material row:** full-width list row, 1px `line` divider. Left: mono type tag (`guide`, `talk`, `templates`). Center: title (text-primary) and one-line description. Right: mono host or year, then an external-link arrow. Hover: title turns accent. Every row is a real link; external links use `rel="noopener"`.
- **Emoji policy:** only in Community badges, the hero greeting and the terminal. Never in nav, H2s, rows or buttons. Max one per card.
- **Focus ring:** 2px accent outline, 3px offset, on every interactive element.

## 5. Layout Principles

- Container 1000px max, centered; reading column ≤ 62ch. Page padding 100px vertical on desktop, 64px on mobile. 8px spacing base. Whitespace is generous and editorial; each page is a chapter.
- **Five routes, fixed order.** Spanish keeps the current URLs so existing links and search rankings survive; English lives under `/en/`.

| #   | ES (default, no prefix) | EN                | Content                                         |
| --- | ----------------------- | ----------------- | ----------------------------------------------- |
| 01  | `/`                     | `/en/`            | Hero that is also Sobre mí / About              |
| 02  | `/experiencia`          | `/en/skills`      | Educación, Experiencia laboral, Certificaciones |
| 03  | `/proyectos`            | `/en/projects`    | Projects (2 featured + cards)                   |
| 04  | `/comunidades`          | `/en/communities` | Community cards                                 |
| 05  | `/materiales`           | `/en/resources`   | Material rows                                   |

- Do not reorder, merge or add pages. On Experiencia, the three blocks are separated by H3 titles without numbers.
- **Hero (on `/`):** the hero **is** the "Sobre mí" section — no separate block below it. Left column (60%): mono accent greeting, H1 name (cream, serif), tagline in text-secondary (serif), mono location line, the short paragraph (≤ 3 lines) with community names linking to their cards on `/comunidades`, and one outline CTA ("Ver proyectos" / "See projects"). Right column (40%): the existing avatar with 15% accent tint, 4px radius, tint fades on hover. Lines appear one after another over 600ms total, once on load.
- **Footer contact band:** compact — it closes the page, it is not a hero. Serif H3, one sentence, outline `mailto:` button, modest vertical padding. Below 1080px the © line also carries the social + CV links (≥1080px the side rails already show them; never both).

## 6. Depth & Elevation

- L0 page `#0A192F`. L1 card `#112240` + 1px `line`.
- L2 hover: translateY(-4px) + `0 20px 30px -15px rgba(2,12,27,0.7)`.
- L3 terminal window: `surface-terminal`, 1px `rgba(100,255,218,.20)` border, `0 30px 60px -20px rgba(2,12,27,0.9)`. The only deep shadow on the site.
- No glows, no gradients, no glassmorphism except the nav blur.

## 7. Do's and Don'ts

**Do**

- Keep teal `#64FFDA` as the single accent and the fixed page order.
- Use cream `#F7F6F3` for headings and Fraunces for H1–H3; Inter for reading.
- Use the pastel washes only behind emoji and terminal dots.
- Use **one** orchestrated page-load moment on the home hero (lines appear in sequence, ≤ 600ms total). Everything else is motion that answers an action (hover, tab change, terminal open).
- Respect `prefers-reduced-motion`: remove translate and sequencing, keep opacity fades ≤ 150ms.
- Render each block once. Never ship separate mobile and desktop copies of the same content.

**Don't**

- Don't add a second accent color, gradients or illustrations.
- Don't animate every section on scroll or put hover lift on non-interactive elements.
- Don't use solid CTAs, ALL CAPS labels, emoji in headings, or more than one emoji per card.
- Don't use pure white or pure black; don't use serif for body text.
- Don't hide content or navigation behind the terminal; it is a toy, not a menu.

## 8. Responsive Behavior

- Breakpoints: 480, 768, 1080px. Design mobile-first; the 1000px container only applies ≥ 1080px.
- Touch targets ≥ 48px (language switch and tabs ≥ 44px).
- < 1080px: side rails hidden (socials move to the footer and the mobile sheet). < 768px: all two-column blocks stack, featured rows become image-then-card, community and project grids go to one column; H1 clamps down to 44px.
- Mobile nav: top bar shows monogram, `ES | EN`, and a menu button. The menu opens a sheet from the right (`surface-secondary`, full height, stacked mono links with numbering kept, outline "CV" button at the bottom). The language switch stays in the top bar, never buried in the sheet.
- Respect safe-area insets for the sheet and the terminal on phones.

## 9. Agent Prompt Guide

**Hero**

> Background `#0A192F`, container 1000px, left aligned. Greeting JetBrains Mono 16px `#64FFDA`: "¡Hola! Yo soy" / "Hi, I'm". H1 Fraunces 500, `clamp(44px, 8vw, 80px)`, color `#F7F6F3`, tracking -0.02em, "Daniel Paredes". Tagline Fraunces 500 `clamp(28px, 5vw, 56px)` color `#8892B0`, "Computólogo / Desarrollador". Location mono 14px `#8892B0`. Paragraph Inter 18px `#8892B0`, max-width 540px, text from `agent_docs/spanish_content.md`. CTA: 48px, 4px radius, transparent, 1px `#64FFDA` border, mono 14px teal text, hover fill `rgba(100,255,218,.10)`. Lines appear one after another over 600ms total, once on load.

**Page title**

> Flex row, gap 16px: mono 20px `#64FFDA` "02." then Fraunces H2 `clamp(28px,4vw,40px)` `#F7F6F3` "Experiencia" / "Experience", then a 1px `#233554` line flexing to the right edge (hidden below 480px).

**Community card**

> `#112240` fill, 1px `#233554` border, 8px radius, 32px padding, whole card is an `<a>`. 48px circle `rgba(219,237,219,.12)` with one 32px emoji. H3 Fraunces 24px `#F7F6F3`. Description Inter 15px `#8892B0`, 2 lines. Label mono 12px `#64FFDA`. Hover: translateY(-4px), border `rgba(100,255,218,.4)`.

**Material row**

> Grid `auto 1fr auto`, 20px vertical padding, bottom border 1px `#233554`. Left mono 12px `#64FFDA` type tag. Center title Inter 17px `#CCD6F6` plus 15px `#8892B0` description. Right mono 12px `#8892B0` host and an external-link icon. Hover: title `#64FFDA`. The whole row is an `<a rel="noopener">`.

**Certification row**

> Same grid as Material row. Title Inter 17px `#CCD6F6`, issuer Inter 15px `#8892B0` below. Right: mono 12px `#8892B0` "2024 – 2027" and an external "verify" icon link when a credential URL exists.

**Language switch**

> Two buttons "ES" and "EN", JetBrains Mono 13px, separated by a 1px `#233554` bar. Active: `#64FFDA`, `aria-current="true"`. Inactive: `#8892B0`, hover `#CCD6F6`. Each is a link to the equivalent page in the other language, with `lang` and an accessible name ("Español", "English").

**Terminal**

> Build exactly as specified in section 10.

## 10. Interaction: Language Switch & Hidden Terminal

**Language switch**

- Languages: Spanish (default, root URLs) and English (`/en/…`). `<html lang>` per page, `hreflang` alternates (`es`, `en`, `x-default`) and a self-referencing canonical, so both are indexable. The switch always links to the translated equivalent of the current page, never to the home.
- On a first visit, a client script may suggest the other language from `Accept-Language` with a small dismissible hint; it never redirects automatically. The choice is remembered (wrapped in try/catch; works with storage empty).
- Page names: ES `Sobre mí · Experiencia · Proyectos · Comunidades · Materiales`; EN `About · Experience · Projects · Communities · Resources`.

**Hidden terminal (the easter egg)**

- **Trigger:** The `t` key on desktop. Count with a passive listener; never `preventDefault`, never count clicks on links, buttons, inputs or text, so navigation and selection stay untouched. Visible hint as a terminal icon with the social icons; a single `console.log` in devtools may hint at it. Available on every page through the shared layout.
- **Load:** the terminal is a lazy-loaded module fetched on first trigger, so it adds nothing to initial load, LCP or INP.
- **Window:** `surface-terminal`, 8px radius, JetBrains Mono 14px, `min(560px, 92vw)` × 320px, bottom-right on desktop and a bottom sheet on mobile. Title bar with three 10px dots in peach, sage and sky washes and the title `visitor@wallsified:~`. Prompt `$` in accent. Non-modal `role="dialog"` with an accessible name: the page behind stays scrollable and usable. `Esc` or the ✕ closes it and returns focus to where it was. On mobile, an on-screen input opens the keyboard and a row of tappable command chips offers `help`, `about`, `projects`.
- **Commands** (output in the current page language, plain text only, set via `textContent`, never `innerHTML`; data comes from the same content as the pages, never duplicated):
  `help` · `whoami` · `about` · `projects` · `communities` · `materials` · `contact` · `goto <page>` (navigates to that page in the current language) · `lang es|en` · `coffee` (small ASCII mug ☕) · `sudo hire-me` (playful reply, then scrolls to the footer contact band) · `clear` · `exit`. Unknown command: say what failed and suggest `help`.
- Nothing is persisted or sent anywhere. With reduced motion, the window appears without animation and output prints at once instead of typing out. A page navigation closes the terminal.

## 11. Quality Floor

- Contrast AA everywhere; visible focus; a "skip to content" link; semantic landmarks and one H1 per page.
- Tabs follow the ARIA tabs pattern (arrow keys, `aria-selected`).
- Self-hosted subset fonts with fallbacks; the avatar and any image served in AVIF/WebP with explicit dimensions to avoid layout shift; no JavaScript is required to read the content.
