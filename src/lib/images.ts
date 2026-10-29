import type { ImageMetadata } from "astro";

const images = import.meta.glob<{ default: ImageMetadata }>(
  "../assets/images/**/*.{jpg,png}",
  { eager: true },
);

// Content JSON stores image paths like "/images/avatar.jpg"; the files live in
// src/assets/images so Astro can optimize them. Fails the build on a missing file.
export function getImage(src: string): ImageMetadata {
  const image = images[`../assets${src}`];
  if (!image) throw new Error(`Image not found in src/assets: ${src}`);
  return image.default;
}
