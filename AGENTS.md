# AGENTS.md — Daniel Paredes portfolio (migration)

Personal portfolio of Daniel Paredes (@wallsified), migrating https://wallsified.is-a.dev/ to a faster, bilingual, SEO-ready static site. Read `DESIGN.md` before writing any UI and `agent_docs/spanish_content.md` and `agent_docs/english_content.md` before writing any copy. Do not duplicate their contents here.

## Stack

- Astro, static output (`output: "static"`), TypeScript strict, Tailwind CSS v4. No UI framework: components are `.astro`; the only client JS is the language/nav bits and the lazy-loaded terminal (vanilla TS).
- Content in Astro content collections: `src/content/{es,en}/`; UI strings in `src/i18n/{es,en}.ts`.
- Fonts self-hosted and subset (Fraunces, Inter, JetBrains Mono); images through Astro assets (AVIF/WebP, explicit sizes).
- Integrations: `@astrojs/sitemap`. Package manager: npm.

## Commands

`npm run dev` · `npm run build` · `npm run preview` · `npx astro check`. Before finishing any task: build and check must pass with no errors.

## Routes (Spanish keeps today's URLs; English under `/en/`)

`/` · `/experiencia` · `/proyectos` · `/comunidades` · `/materiales` ↔ `/en/` · `/en/skills` · `/en/projects` · `/en/communities` · `/en/resources` (redirect from the old `/en/experience`).
Config: `i18n: { defaultLocale: "es", locales: ["es","en"], routing: { prefixDefaultLocale: false } }`. Every ES page has an EN twin, and the language switch links to the twin of the current page. If a route ever changes, add a redirect.

## i18n rules

- Every page: `<html lang>`, self-referencing canonical, `hreflang` for `es`, `en` and `x-default`.
- English is drafted from Spanish, marked `reviewed: false`, and not shown in production until the owner approves it.
- Never hardcode visible strings in components; use the dictionaries.

## SEO rules

- Unique `<title>` and meta description per page and language; one H1 per page.
- JSON-LD: `Person` (name, jobTitle, `sameAs`: GitHub, LinkedIn, AWS Builder Center) and `WebSite`.
- Open Graph and Twitter card with an **absolute** image URL (1200×630) and `og:locale` `es_MX` / `en_US`.
- `robots.txt` and sitemap with both languages. Do not add the obsolete `keywords` meta.
- Fix on migration (seen on the old site): generic description repeated on every page, relative `og:image` path (`assets/images/avatar.jpg`, which does not match the real `/images/avatar.jpg`), and content duplicated in the DOM.

## Performance and accessibility

- Targets at p75: LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1; Lighthouse ≥ 95 in all four categories on mobile.
- Initial JS ≤ 30 KB gzip; the terminal loads only on its first trigger; no third-party scripts or trackers unless the owner asks.
- WCAG AA contrast, visible focus, keyboard-operable tabs and language switch, `prefers-reduced-motion` respected, one copy of each block in the DOM.

## Easter egg

Hidden terminal exactly as in `DESIGN.md` section 10. Output is written with `textContent`, never `innerHTML`; nothing is stored or sent; it never intercepts normal clicks.

## Working rules

- Follow the tokens in `DESIGN.md`; do not add colors, fonts or sections. If something is missing, propose a change to `DESIGN.md` instead of improvising.
- Never invent biography, employers, dates, links or metrics; take them from `agent_docs/spanish_content.md` and `agent_docs/english_content.md` or ask.
- Ask before adding a dependency, deleting files or changing routes. Keep commits small and described in plain language.
- Never commit secrets or `.env` files.

## Owner's decisions (settled; do not re-ask)

- Domain: `wallsified.dev` (canonical, hreflang, sitemap and og:image use this domain). Hosting: AWS, set up later.
- Contact email for the footer band: `wallsified@gmail.com`.
- English CV: `assets/documents/Resume_DanielParedes.pdf` (Spanish CV stays `CV_DanielParedes.pdf`).
- Featured projects (2, with image): **City Lens (API)** and **Posadas de Código**. The other two render as project cards.
- Community emoji badges: Sudo FCiencias 💻 · AWS Student Builder Group UNAM ☁️ · PythonCDMX 🐍.
- Fonts: `@fontsource-variable` packages (dependency approved by the owner).
