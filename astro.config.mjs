// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { config } from "./src/config";

// https://astro.build/config
export default defineConfig({
  site: "https://wallsified.dev",
  output: "static",
  integrations: [
    sitemap({
      // Keep English out of the sitemap until the owner approves it.
      filter: (page) => config.englishReviewed || !page.includes("/en/"),
    }),
  ],
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
