# DESIGN.md — AWS Builder Center (builder.aws.com)

---

## 0. READ FIRST — This is a restructure, not a reskin

**Directive for the agent.** This file describes an interface _architecture_, not only a theme. When applying it:

1. **Discard the current page structure** (header, sections order, containers) and **rebuild the markup/components** following the blueprints below.
2. **Then** apply the tokens (colors, type, spacing) from Sections 2–9.
3. Changing only colors, fonts or spacing on the existing layout is a **failed** application.

**Acceptance checklist (all must be true)**

- [ ] A sticky top navigation bar with logo, grouped menu (some items with dropdowns), search/utility icons and a right-aligned action area.
- [ ] A full-width **hero** whose headline is a _code-style statement in a monospace font_ (the real site uses `if building: start_here()`), with one sentence of copy and one primary button.
- [ ] A **Spotlight** strip: horizontal, scroll-snap carousel of image cards (16:9 cover + title).
- [ ] An **Explore** area with a `Trending | Latest` segmented toggle and **modular blocks**, each with a heading and a `View all →` link.
- [ ] **Promo cards** (icon/illustration + short text + one button) between content blocks.
- [ ] A **topic chip cloud** (`#tag` chips) with a `View all` link.
- [ ] A **right rail** (trending topics, promo) beside the main column on desktop; stacked on mobile.
- [ ] A multi-link **footer** with a second row of legal links.
- [ ] Inner pages use **breadcrumbs + tabs** (+ sidebar on detail pages).
- [ ] Light/dark theme and language switcher are present in the chrome.

> **Source confidence.** Block _order_ and content types below were read from the live home page. The two-column split (main column + right rail) is **inferred** from the site's sidebar-style promo assets and the order of blocks; confirm visually if pixel-faithfulness matters.

### 0.1 Home page blueprint (desktop ≥ 1025px)

```
┌─────────────────────────────────────────────────────────────────────────┐
│ [logo]  Home  Learn▾  Build▾  Connect▾  Community▾  Wishlist   🔍 + ⚙ [Sign in] │ sticky nav
├─────────────────────────────────────────────────────────────────────────┤
│ HERO (full width, Gray 850)                                             │
│   `if building: start_here()`     ← monospace H1, syntax-colored tokens │
│   One-sentence value proposition                                        │
│   [ Join now ]                    ← Amber primary button                │
├─────────────────────────────────────────────────────────────────────────┤
│ SPOTLIGHT                                                               │
│ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ → (7 cards, scroll-snap)   │
│ │ 16:9 │ │ 16:9 │ │ 16:9 │ │ 16:9 │ │ 16:9 │                            │
│ │ image│ │ image│ │ image│ │ image│ │ image│                            │
│ └──────┘ └──────┘ └──────┘ └──────┘ └──────┘                            │
│  title    title    title    title    title                              │
├─────────────────────────────────────────────────────────────────────────┤
│ EXPLORE                                    [ Trending | Latest ]        │
│ ┌───────────────────────────────────────┐ ┌───────────────────────────┐ │
│ │ Spaces                    View all →  │ │ Trending topics           │ │
│ │ [card] [card] [card]                  │ │ #agentic-ai #ai #bedrock  │ │
│ │───────────────────────────────────────│ │ #aws-lambda #serverless … │ │
│ │ Hackathons                View all →  │ │ View all →                │ │
│ │ [card] [card]                         │ │───────────────────────────│ │
│ │───────────────────────────────────────│ │ [icon]  Wishlist          │ │
│ │ PROMO BANNER: Workshops w/ free       │ │ Have an idea to share?    │ │
│ │ sandbox · short text · [Find a        │ │ [ Learn more ]            │ │
│ │ workshop]                             │ └───────────────────────────┘ │
│ └───────────────────────────────────────┘                               │
├─────────────────────────────────────────────────────────────────────────┤
│ FOOTER row 1: Start · FAQs · Support · Student Rewards · Mobile · Terms │
│ FOOTER row 2: Accessibility · Privacy · Site Terms · Cookie prefs · ©   │
└─────────────────────────────────────────────────────────────────────────┘
```

**Behavior notes**

- Nav: dropdown groups open on hover/focus (desktop) and become an accordion drawer on mobile. "New" pills sit beside recently launched items.
- Spotlight: each card is one big link (image + title). Snap to card; show partial next card to signal scroll.
- Explore toggle changes the ordering of every block at once (popular vs. recent) without a page reload.
- Every module = `H2 + View all link` header, then a row/grid of cards. Modules are separated by `1px` rules and ~48px of space.

### 0.2 Detail page blueprint (hackathon / event / space / article)

```
┌───────────────────────────────────────────────────────────────┐
│ top nav (same)                                                 │
│ Breadcrumbs:  Builder Center › Build › Hackathons › Name       │
├───────────────────────────────────────────────────────────────┤
│ HEADER BLOCK                                                   │
│ [cover image 16:9]  [status chip]  H1 Title                    │
│ dates · format · participants        [ + Join ] [ Share ] [⋮]  │
├───────────────────────────────────────────────────────────────┤
│ TABS:  About | Your project | Projects | Discussion | Rules …  │
├──────────────────────────────────────┬────────────────────────┤
│ MAIN (active tab content)            │ SIDEBAR                │
│  prose / cards / list                │  Awards                │
│                                      │  Judges                │
│                                      │  Sponsors              │
│                                      │  Tags (#chips)         │
└──────────────────────────────────────┴────────────────────────┘
```

### 0.3 Catalog page blueprint (workshops / events / topics)

```
Breadcrumbs
H1 + one-line description
Tabs: Discover | Your items | Invites and requests
[ 🔍 Search… ] [Filter▾] [Filter▾] [Filter▾]        Sort by: Newest ▾
┌────────┐ ┌────────┐ ┌────────┐      (grid of cards, 3–4 cols)
│  card  │ │  card  │ │  card  │
└────────┘ └────────┘ └────────┘
                 « 1 2 3 »  pagination
```

### 0.4 Mobile (≤ 640px)

- Nav → logo + hamburger (drawer with accordion groups) + avatar/sign-in.
- Hero text left-aligned, button full width; headline wraps but stays monospace.
- Spotlight stays a horizontal swipe carousel; Explore modules become single-column; right-rail promos and trending chips move **below** the modules.
- Tabs become horizontally scrollable; sidebars stack under main content.
- Footer links wrap into 2 columns.

---

## 1. Visual Theme & Atmosphere

- **Concept:** the palette is _inspired by syntax highlighting_. A near-black editor background with vivid, saturated "token" colors (magenta, mint, purple, blue, amber), all curated from the AWS color palette. The site should feel like a well-themed code editor that happens to be a community hub.
- **Signature motif:** the home hero headline is a line of code in monospace (`if building: start_here()`). Code-as-brand is the visual hook; reuse it for hero/section titles and labels.
- **Personality:** practical, technical, welcoming. Community-first (profiles, badges, QR cards) rather than marketing-first.
- **Themes:** supports **light and dark mode** (separate logo and badge assets per mode). Dark (Gray 850) is the brand-native canvas; light uses White as the canvas. Both are first-class.
- **Density:** medium-high. Lists, tabs, filters and cards are the primary building blocks; hero imagery is secondary to content.
- **Tone of copy:** direct, second-person, action verbs ("Start here. Go anywhere.", "Claim your alias", "Request free sandbox environment").

## 2. Color Palette & Roles

### Official brand colors

| Name            | HEX       | RGB           | CMYK           | Pantone | Syntax-highlight analogy           |
| --------------- | --------- | ------------- | -------------- | ------- | ---------------------------------- |
| **Gray 850**    | `#161D26` | 22, 29, 38    | 82, 71, 58, 71 | 4280C   | Editor background                  |
| **White**       | `#FFFFFF` | 255, 255, 255 | 0, 0, 0, 0     | —       | Light canvas / text on dark        |
| **Magenta 400** | `#FF57E9` | 255, 87, 233  | 16, 71, 0, 0   | 238C    | Keywords                           |
| **Mint 400**    | `#00E582` | 0, 229, 130   | 64, 0, 72, 0   | 7479C   | Strings                            |
| **Purple 500**  | `#AD5CFF` | 173, 92, 255  | 52, 70, 0, 0   | 265C    | Functions / constants              |
| **Blue 400**    | `#42B4FF` | 66, 180, 255  | 59, 16, 0, 0   | 285C    | Types / links                      |
| **Amber 400**   | `#FF9900` | 255, 153, 0   | 0, 47, 100, 0  | 2013C   | Classic AWS orange; primary accent |

### Suggested semantic roles (mapping is my interpretation)

| Token                           | Value      | Role                                         |
| ------------------------------- | ---------- | -------------------------------------------- |
| `--bg-dark`                     | `#161D26`  | Dark-mode page background, nav, footer       |
| `--bg-light`                    | `#FFFFFF`  | Light-mode page background                   |
| `--text-on-dark`                | `#FFFFFF`  | Primary text on dark                         |
| `--text-on-light`               | `#161D26`  | Primary text on light                        |
| `--accent`                      | `#FF9900`  | Primary CTA, "New" markers, key highlights   |
| `--link-dark`                   | `#42B4FF`  | Links, selected tab indicator (on dark)      |
| `--success`                     | `#00E582`  | "Live", "Available", verified, success       |
| `--info-alt`                    | `#AD5CFF`  | Secondary highlight, badges, categories      |
| `--highlight`                   | `#FF57E9`  | Rare emphasis, achievements, playful moments |
| `--surface-dark` `(derived)`    | ~`#1E2733` | Cards / elevated surfaces on dark            |
| `--border-dark` `(derived)`     | ~`#2D3745` | Dividers and card borders on dark            |
| `--text-muted-dark` `(derived)` | ~`#A6B0BD` | Secondary text on dark                       |
| `--surface-light` `(derived)`   | ~`#F5F7FA` | Cards / subtle fills on light                |
| `--border-light` `(derived)`    | ~`#D9DEE5` | Dividers on light                            |

**Rules**

- **Dark is the hero.** Accent colors are saturated and designed to pop against Gray 850; use them as small, deliberate "tokens" (chips, underlines, icons, highlights), not large fills.
- **Contrast on light backgrounds:** Amber, Mint, Blue and Magenta do **not** reach 4.5:1 as text on White. On light mode use them as fills/borders/icons with Gray 850 text on top, never as body or small text. On dark backgrounds all five pass comfortably.
- One dominant accent per view (Amber by default); other hues act as category/status colors.
- Status is never conveyed by color alone: pair with an icon or label ("Ended" badge, check-circle for a voted answer).
- Text/background contrast must be **≥ 4.5:1** (the site's own content guideline, WCAG 2.2).
- Optional: syntax-highlighted code blocks should reuse the palette (Magenta keywords, Mint strings, Purple functions, Blue types, Amber numbers/constants) on Gray 850.

## 3. Typography `(approx.)`

- **Observed in the brand guidelines:** a **monospace** face for titles and labels (e.g. the "Colors" heading, hex/RGB captions) reinforcing the code-editor concept, paired with a clean humanist sans for running text.
- **Sans (UI + body):** Amazon Ember, falling back to `"Helvetica Neue", Roboto, Arial, sans-serif`.
- **Mono (display labels, code):** Amazon Ember Mono / a similar monospace, falling back to `Monaco, Menlo, Consolas, monospace`.
- **Hierarchy:** strict `H1 → H2 → H3`, never skipped (required for authored content on the site).

| Level         | Size       | Weight | Use                                                  |
| ------------- | ---------- | ------ | ---------------------------------------------------- |
| H1            | 32–40px    | 700    | Page title (one per page)                            |
| H2            | 24–28px    | 700    | Section title                                        |
| H3            | 18–20px    | 600    | Card / sub-section title                             |
| Body          | 16px / 1.6 | 400    | Articles, descriptions                               |
| Small         | 14px       | 400    | Metadata, timestamps, helper text                    |
| Caption / tag | 12–13px    | 500    | Hashtag chips, badges (good place for the mono face) |

- Prefer short paragraphs and bullet lists; "plain language, digestible chunks".
- Long-form article width: ~720–760px.

## 4. Component Stylings

**Top navigation**

- Persistent bar: logo (light/dark variant) · primary menu · search · `+` Create menu · Settings · Sign in / profile dropdown.
- Primary menu with dropdown groups: **Learn** (Students, Topics) · **Build** (Capabilities, Hackathons, Toolbox, Workshops) · **Connect** (Events, Spaces) · **Community** (Heroes, Community Builders, User Groups, Student Builder Groups) · **Wishlist**.
- Small **"New"** pill (Amber) next to freshly launched sections.
- `+` opens a create menu: article, poll, wish, event, space.

**Breadcrumbs**

- Below the nav on inner pages (`Builder Center › Learn › Topics › #tag`).

**Buttons**

- Primary: solid Amber with Gray 850 text. Secondary: outlined (white/Blue border on dark). Tertiary: text link in Blue.
- Radius ~8px (pill reserved for tags/badges). Clear 2px focus ring, offset 2px.

**Cards (articles, events, hackathons, workshops, spaces)**

- Cover image 16:9 (recommended 1200×675, ≤ 2 MB, jpg/png/webp; avoid text inside images), title (1–2 lines), one-line description, tag chips, author avatar + name + relative timestamp, reaction/comment counts.
- Flat with 1px border; subtle border-color or lift on hover.

**Tag chips / topics**

- Hashtag style: `#agentic-ai`, `#serverless`, `#amazon-s3`, in mono. Max 5 per item. Each links to a topic page. Tint chips with palette hues (Blue/Purple/Mint/Magenta) at low opacity backgrounds with the full-strength hue as text on dark.

**Tabs**

- Heavily used on detail pages. Hackathon: _About · Your project · Projects · Discussion · Participants · Rules · Winners_. Events: _Discover · Your events · Invites and requests_.
- Selected tab: bold label + 2–3px underline (Blue or Amber).

**Filters & sorting**

- Search field + multi-select dropdown filters (location type, country, tags, complexity, language, category, duration).
- Sort control with sensible default (Newest, Upcoming).

**Badges & status labels**

- Complexity: `100 Beginner · 200 Intermediate · 300 Advanced · 400 Expert` (could map to Mint → Blue → Purple → Magenta).
- Wish status: `Not Started · Ready · Live` (Live = Mint). Poll: `Ended`. Space: verified checkmark. Hackathon: `Team leader`.
- Achievement badges: grouped as _earned / in progress / not started_.

**Polls**

- 2–5 options, horizontal result bars with count + percentage, check-circle on the user's choice, live "Ended" state without reload.

**Profile**

- Avatar, display name, alias (`/community/@alias`), headline, about, links, **QR-code card**, badges, activity stream.

**Forms**

- Live character counters (title ≤ 255, description ≤ 512), draggable list items, "Preview → Publish" flow, autosave message ("Draft saved…").

**Translate control**

- Inline **Translate** button on user-generated content; interface language set in Settings (16 languages).

**Footer**

- Dark band (Gray 850): Start · FAQs · Support · Student Rewards · Mobile · AWS Builder Terms.

## 5. Layout & Spacing `(approx.)`

- **Grid:** 12-column, max content width ≈ 1280px, centered; article pages narrow to a single reading column.
- **Spacing scale (4px base):** 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64.
- **Pattern A — Feed:** primary column of cards + right rail (trending topics, follow suggestions).
- **Pattern B — Detail:** header block (image, status, title, meta, actions) → tab bar → main content + **sidebar** (awards, judges, sponsors, tags).
- **Pattern C — Catalog:** search + filter row → results grid/list → pagination (with condensed-view toggle for dense tables).
- Generous vertical rhythm between sections (32–48px); tight inside cards (8–12px).
- Brand-guideline slides use lots of white space, small mono captions and a flat grid of equal-sized swatches: keep that restraint.

## 6. Depth & Elevation

- Mostly **flat**: separation via 1px borders and background tint steps, not shadows.
- Elevation only for transient layers: dropdowns, modals, toasts/flash bars.
- Modals: dim scrim + centered panel with a clear primary/secondary action pair.

## 7. Iconography & Imagery

- Simple line icons: three-dot overflow (⋮), pencil (edit), `+` (create), bell (notify), check-circle, QR code, share, translate.
- Cover images and avatars are user content; reserve space and use neutral placeholders to avoid layout shift.
- Alt text for every meaningful image.

## 8. Responsive Behavior

- Support current Edge, Firefox, Chrome and Safari (latest 3 versions).
- Breakpoints (approx.): `≤ 640` mobile · `641–1024` tablet · `≥ 1025` desktop.
- Nav collapses into a hamburger drawer on mobile; right rails and sidebars stack below main content; tab bars scroll horizontally.
- Tables/matrices offer a condensed mode (icons only) and scroll inside their own container.
- Touch targets ≥ 44×44px.

## 9. Accessibility & i18n

- Target **WCAG 2.2 AA**: contrast ≥ 4.5:1, logical heading order, alt text, visible focus, keyboard-operable menus/tabs/modals.
- **16 languages** (incl. Arabic → support **RTL**). Language defaults to the browser setting, overridable in Settings.
- Never hard-code label widths: translations can be 30–40% longer.
- Dates/times show the timezone explicitly; streaks and deadlines are UTC-based.

## 10. Do's and Don'ts

**Do**

- Use Gray 850 as the canvas and let the five accent hues act like syntax tokens.
- Keep Amber as the single primary accent per view.
- Use tabs + filters to manage density instead of long single pages.
- Pair color with text/icon for every status.
- Offer Preview before Publish for user-created content.
- Use mono for tags, metadata and labels to reinforce the code-editor feel.

**Don't**

- Use Amber/Mint/Blue/Magenta as text on a white background.
- Fill large areas with saturated accents or stack several accents in one component.
- Skip heading levels or put text inside cover images.
- Rely on hover-only affordances.
- Add heavy shadows, gradients or animation that compete with content.

## 11. Agent Prompt Guide

**Quick palette:** bg `#161D26` · text `#FFFFFF` · Magenta `#FF57E9` · Mint `#00E582` · Purple `#AD5CFF` · Blue `#42B4FF` · Amber `#FF9900`.

**CSS variables starter**

```css
:root {
  --gray-850: #161d26;
  --white: #ffffff;
  --magenta-400: #ff57e9;
  --mint-400: #00e582;
  --purple-500: #ad5cff;
  --blue-400: #42b4ff;
  --amber-400: #ff9900;
}
```

**Prompt starters**

- _"Build a dark card grid in the style of AWS Builder Center: Gray 850 background, flat 1px-border cards, 16:9 cover, mono hashtag chips tinted with the palette hues, Amber primary button."_
- _"Create a detail page with header, tab bar (About · Projects · Discussion · Rules) and right sidebar, following DESIGN.md. Blue underline for the active tab."_
- _"Style code blocks like the brand's syntax-highlighting inspiration: Gray 850 background, Magenta keywords, Mint strings, Purple functions, Blue types."_
- _"Add a language switcher and an RTL-safe layout, no fixed-width labels."_

---

## 12. Applying this to the personal portfolio (optional section)

Goal: the portfolio should **look structured like Builder Center**, not just share its colors. Map each Builder Center pattern to a portfolio section:

| Builder Center pattern                              | Portfolio equivalent                                                                                                                     |
| --------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Sticky top nav with grouped menu                    | Nav: **Sobre mí · Experiencia · Proyectos · Comunidades · Materiales** + language switcher **ES/EN** + theme toggle (replaces "Sign in") |
| Hero with code-style mono headline + primary button | Hero with a mono headline like `if (visitor) { hello(); }` (syntax-colored), one-line bio, button "Ver proyectos"                        |
| **Spotlight** carousel (image cards)                | **Featured projects** carousel (cover + title)                                                                                           |
| **Explore** with `Trending                          | Latest` toggle                                                                                                                           | Toggle `Destacados | Recientes` over Projects / Materials |
| Modules with `View all →` (Spaces, Hackathons)      | Modules for **Experiencia**, **Comunidades**, **Materiales**, each with `Ver todo →`                                                     |
| Promo banner (Workshops)                            | Banner for a highlighted item (talk, course, material) with one button                                                                   |
| Trending topics chip cloud                          | **Skills / tech** chips (`#aws`, `#python`, …)                                                                                           |
| Wishlist promo card in right rail                   | **Contact / collaborate** card in the right rail                                                                                         |
| Detail page: header + tabs + sidebar                | Project page: cover, title, status/tech chips, tabs (_Resumen · Detalles · Enlaces_), sidebar with stack, role, links                    |
| Footer rows                                         | Footer: quick links, social links, legal/©                                                                                               |

**Color bridge:** Gray 850 `#161D26` ≈ the dark navy base; **Mint 400 `#00E582`** can act as the teal accent; Amber `#FF9900` as a rare warm highlight (e.g. the cursor of the hidden **mini-terminal** easter egg).

**Mini-terminal:** render its output with the syntax-highlighting palette (Magenta keywords, Mint strings, Purple functions, Blue types) on Gray 850.

**Light mode caution:** accents are fills/borders only on light backgrounds (Section 2 contrast rule).

**Prompt for the agent**

> _"Restructure the whole interface following DESIGN.md Section 0 (not just the styles): sticky grouped nav with ES/EN switcher, mono code-style hero, Featured Projects carousel, Explore area with a Destacados/Recientes toggle and modular blocks with 'Ver todo', right rail with skill chips and a contact card, multi-row footer. Then apply the tokens from Sections 2–9. Keep the five sections and the hidden mini-terminal easter egg. Verify the acceptance checklist before finishing."_
