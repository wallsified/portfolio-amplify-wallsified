// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  site: "https://wallsified.dev",
  output: "static",
  integrations: [sitemap({})],
  // The old English route was renamed to /en/skills; keep the old URL alive.
  redirects: {
    "/en/experience": "/en/skills",
  },
  vite: {
    plugins: [tailwindcss()],
  },
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
