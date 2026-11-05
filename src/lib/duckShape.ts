// Shared rubber-duck silhouette (DESIGN.md §10, easter egg 3): one source of
// truth for the rail hint glyph (Icon.astro) and the falling ducks
// (duckRain.ts). viewBox 0 0 24 24, facing right, meant to be filled.

// Body with the little tail flick at the back and the neck seam tucked
// inside the head circle, so body + head + beak read as one solid shape.
export const DUCK_BODY =
  "M13 9.6C10.2 10.3 7.6 11.8 5.6 13.7L1.5 12.2L4.9 16.3C4.2 17.9 3.9 19.5 4.9 20.8C6.3 22.5 9 23 12 23C15.7 23 18.7 21.7 20 19.4C21 17.5 20.8 14.9 19.5 12.9C18.5 11.3 17.3 10.2 16.3 9.7Z";

export const DUCK_HEAD = { cx: 15.5, cy: 6.5, r: 4 } as const;

// Beak: triangle whose base sits inside the head, so the union is seamless.
export const DUCK_BEAK = "M19 5.3L23 6.9L19 8.4Z";

export const DUCK_EYE = { cx: 16.9, cy: 5.7, r: 0.95 } as const;
