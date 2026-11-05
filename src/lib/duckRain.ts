// Lazy module for the hidden Duck Rain (DESIGN.md §10, easter egg 3). Fetched
// with a dynamic import() on the first trigger, so it adds nothing to the
// initial JS. It spawns one rain of rubber ducks inside a fixed overlay that
// is pointer-events: none and aria-hidden, so it can never intercept a normal
// click or be announced; the overlay cleans itself up after ~6s and a second
// trigger while it rains is ignored. Under prefers-reduced-motion the ducks
// are static with ≤150ms opacity fades instead of falling. Nothing is stored
// or sent, no sound, no interaction.

import { DUCK_BODY, DUCK_BEAK, DUCK_EYE, DUCK_HEAD } from "./duckShape";

const SVG_NS = "http://www.w3.org/2000/svg";

let raining = false;

const rand = (min: number, max: number): number =>
  min + Math.random() * (max - min);

// One duck, built with DOM APIs (no innerHTML): body + head + beak in the
// token yellow, eye punched out in the canvas color — same shape as the
// rail hint glyph in Icon.astro.
const buildDuck = (): SVGSVGElement => {
  const svg = document.createElementNS(SVG_NS, "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("focusable", "false");
  // Inline style, not the fill attribute: var() in presentation attributes
  // is not reliably supported.
  svg.style.fill = "var(--color-duck)";

  const body = document.createElementNS(SVG_NS, "path");
  body.setAttribute("d", DUCK_BODY);

  const head = document.createElementNS(SVG_NS, "circle");
  head.setAttribute("cx", String(DUCK_HEAD.cx));
  head.setAttribute("cy", String(DUCK_HEAD.cy));
  head.setAttribute("r", String(DUCK_HEAD.r));

  const beak = document.createElementNS(SVG_NS, "path");
  beak.setAttribute("d", DUCK_BEAK);

  const eye = document.createElementNS(SVG_NS, "circle");
  eye.setAttribute("cx", String(DUCK_EYE.cx));
  eye.setAttribute("cy", String(DUCK_EYE.cy));
  eye.setAttribute("r", String(DUCK_EYE.r));
  eye.style.fill = "var(--color-surface-primary)";

  svg.append(body, head, beak, eye);
  return svg;
};

export const startDuckRain = (): void => {
  // One press = one rain: ignore the key while a rain is still falling.
  if (raining) return;
  raining = true;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mobile = window.matchMedia("(max-width: 767px)").matches;
  const count = mobile ? 20 : 40;

  const overlay = document.createElement("div");
  overlay.className = reduced ? "duck-rain duck-rain--static" : "duck-rain";
  overlay.setAttribute("aria-hidden", "true");

  for (let i = 0; i < count; i += 1) {
    const duck = document.createElement("span");
    duck.className = "duck";
    duck.style.setProperty(
      "--duck-size",
      `${Math.round(mobile ? rand(20, 34) : rand(28, 46))}px`,
    );

    if (reduced) {
      // Static scatter (DESIGN.md §7): no translation, only fades ≤150ms.
      // The in/out fades are CSS transitions toggled by classes on the
      // overlay (see global.css): the global reduced-motion rule zeroes
      // animation-delay, so keyframes could not be staggered.
      duck.style.setProperty("--duck-x", `${rand(2, 96)}%`);
      duck.style.setProperty("--duck-y", `${rand(4, 90)}%`);
      duck.style.setProperty("--duck-in", `${Math.round(rand(0, 600))}ms`);
      duck.style.setProperty("--duck-out", `${Math.round(rand(0, 600))}ms`);
    } else {
      duck.style.setProperty("--duck-x", `${rand(0, 100)}%`);
      duck.style.setProperty("--duck-delay", `${Math.round(rand(0, 1500))}ms`);
      duck.style.setProperty("--duck-dur", `${Math.round(rand(3000, 4500))}ms`);
      duck.style.setProperty("--duck-rot", `${Math.round(rand(-24, 24))}deg`);
      duck.style.setProperty(
        "--duck-spin",
        `${Math.round(rand(-200, 200))}deg`,
      );
    }

    duck.append(buildDuck());
    overlay.append(duck);
  }

  document.body.append(overlay);

  if (reduced) {
    // Drive the two fade phases with classes: .is-in on the next frame (so
    // the initial opacity:0 is committed first), .is-out ~2.6s later.
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => overlay.classList.add("is-in"));
    });
    window.setTimeout(() => overlay.classList.add("is-out"), 2600);
  }

  // Falling ducks are done by 1500 + 4500 = 6000ms; static ones by
  // 2600 + 600 + 150 = 3350ms. Remove the whole overlay after that.
  window.setTimeout(
    () => {
      overlay.remove();
      raining = false;
    },
    reduced ? 4000 : 6500,
  );
};
