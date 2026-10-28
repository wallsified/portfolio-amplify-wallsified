# wallsified.dev — Portafolio de Daniel Paredes

Portafolio personal bilingüe (ES/EN) de Daniel Paredes ([@wallsified](https://github.com/wallsified)), en migración desde https://wallsified.is-a.dev/ a un sitio estático más rápido y listo para SEO.

Sitio final: **https://wallsified.dev/**

## Stack

- [Astro](https://astro.build/) con salida estática y TypeScript estricto
- Tailwind CSS v4
- Fuentes auto-alojadas vía `@fontsource-variable` (Fraunces, Inter, JetBrains Mono)
- `@astrojs/sitemap`

## Comandos

```bash
npm install      # dependencias
npm run dev      # servidor de desarrollo
npm run build    # build de producción (dist/)
npm run preview  # previsualizar el build
npx astro check  # tipos y templates
```

## Estructura

- `DESIGN.md` — guía de diseño (tokens, componentes, layout, terminal)
- `agent_docs/` — contenido real por idioma y guías de referencia
- `assets/` — imágenes, CVs y favicon originales
- `src/` — código del sitio (content collections en `src/content/{es,en}/`, cadenas de UI en `src/i18n/`)

## Licencia

MIT — ver [LICENCE](./LICENCE).
