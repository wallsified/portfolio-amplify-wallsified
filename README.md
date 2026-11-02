# wallsified.dev — Portafolio de Daniel Paredes

Portafolio personal bilingüe (ES/EN) de Daniel Paredes ([@wallsified](https://github.com/wallsified))

## Stack

- [Astro](https://astro.build/) con salida estática y TypeScript estricto
- Tailwind CSS v4
- Fuentes auto-alojadas vía `@fontsource-variable` (Fraunces, Inter, JetBrains Mono)
- `@astrojs/sitemap`

## Requisitos

- Node.js 22 (la versión está fijada en `.nvmrc`; con nvm, `nvm install` la descarga y activa)
- npm (se distribuye con Node)
- No hay variables de entorno: el sitio es estático, no necesita secretos ni servicios externos

## Puesta en marcha

```bash
npm install     # dependencias
npm run dev     # servidor de desarrollo → http://localhost:4321
```

## Comandos

```bash
npm run dev      # servidor de desarrollo
npm run build    # build de producción (dist/)
npm run preview  # previsualizar el build
npm run check    # tipos y templates (astro check)
npm run format   # formatear con Prettier
```

El repo incluye un hook pre-commit (husky + lint-staged) que formatea con Prettier los archivos modificados en cada commit.

## Qué hay en este repo

- `DESIGN.md` — guía de diseño: tokens, tipografía, componentes, layout, terminal y los tres easter eggs
- `AGENTS.md` — reglas de trabajo para agentes de código (stack, rutas, i18n, SEO, rendimiento)
- `agent_docs/` — contenido real por idioma (`spanish_content.md`, `english_content.md`) y guías de referencia; nada de la biografía se inventa
- `src/` — código del sitio: content collections en `src/content/{es,en}/`, cadenas de UI en `src/i18n/`, componentes, layouts, librerías (`src/lib/`) y estilos (`src/styles/`)
- `public/` — estáticos: imágenes, CVs en `public/documents/`, favicon y `robots.txt`
- `LICENCE` — licencia MIT

## Ajustes para AWS Amplify

- `amplify.yml` — build y despliegue: instala Node 22 con nvm, corre `npm ci` y `npm run build`, y publica `dist/` como artefactos estáticos con caché de `node_modules`
- `customHttp.yml` — cabeceras de seguridad para todo el sitio (CSP, `X-Frame-Options`, `X-Content-Type-Options`, HSTS, `Referrer-Policy`, `Permissions-Policy`)
