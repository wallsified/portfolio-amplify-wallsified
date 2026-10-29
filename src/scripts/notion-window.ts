// Hidden Notion Mode window (DESIGN.md §10, easter egg 1). Lazy-loaded on the
// first trigger so it adds nothing to initial load, LCP or INP. Builds a
// non-modal role="dialog" with the current page digest in a single column.
// Every string is written with textContent, never innerHTML; nothing is
// stored or sent; it never intercepts normal clicks.
import type { NotionPayload } from "../lib/notion";

// Pastel wash rotation for emoji badges, same order as CommunityCard.
const WASHES = ["bg-wash-peach", "bg-wash-sage", "bg-wash-sky"] as const;

let windowEl: HTMLElement | null = null;
let searchInput: HTMLInputElement | null = null;
let lastTrigger: HTMLElement | null = null;

export function showNotion(
  payload: NotionPayload,
  trigger: HTMLElement | null,
): void {
  if (!windowEl) windowEl = buildWindow(payload);
  lastTrigger = trigger;
  windowEl.hidden = false;
  // Restart the open animation on repeat shows.
  windowEl.style.animation = "none";
  void windowEl.offsetWidth;
  windowEl.style.animation = "";
  searchInput?.focus();
}

function hide(): void {
  if (!windowEl) return;
  windowEl.hidden = true;
  lastTrigger?.focus();
}

// Esc closes the window and returns focus to wherever it came from. The nav
// sheet listens for Esc too, but only acts when it is open, so both coexist.
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && windowEl && !windowEl.hidden) hide();
});

function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className: string,
  text?: string,
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function closeIcon(): SVGSVGElement {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("width", "20");
  svg.setAttribute("height", "20");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("fill", "none");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("stroke-width", "2");
  svg.setAttribute("stroke-linecap", "round");
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", "M18 6 6 18M6 6l12 12");
  svg.append(path);
  return svg;
}

function buildWindow(payload: NotionPayload): HTMLElement {
  const { ui } = payload;

  const win = el("div", "notion-window");
  win.setAttribute("role", "dialog");
  win.setAttribute("aria-labelledby", "notion-window-title");
  win.hidden = true;

  // Title bar: three 10px pastel dots, the title and the ✕ close.
  const bar = el(
    "div",
    "flex items-center gap-3 border-b border-line px-4 py-2.5",
  );
  const dots = el("div", "flex gap-1.5");
  for (const wash of WASHES)
    dots.append(el("span", `h-2.5 w-2.5 rounded-full ${wash}`));
  dots.setAttribute("aria-hidden", "true");
  const title = el(
    "h2",
    "font-mono text-[13px] text-text-secondary",
    ui.modeTitle,
  );
  title.id = "notion-window-title";
  const close = el(
    "button",
    "-mr-2 flex h-11 w-11 shrink-0 items-center justify-center text-text-secondary transition-colors duration-fast hover:text-accent",
  );
  close.type = "button";
  close.setAttribute("aria-label", ui.closeLabel);
  close.append(closeIcon());
  close.addEventListener("click", hide);
  bar.append(dots, title, close);

  // Search over the current page content; auto-focused when the window opens.
  const searchRow = el("div", "border-b border-line px-4 py-2");
  const input = el(
    "input",
    "w-full bg-transparent py-2 text-base text-text-primary placeholder:text-text-secondary",
  );
  input.type = "search";
  input.placeholder = ui.searchPlaceholder;
  input.setAttribute("aria-label", ui.searchPlaceholder);
  searchRow.append(input);
  searchInput = input;

  // Content: one column, cream headings, accent links, emoji in pastel washes.
  const content = el("div", "flex-1 overflow-y-auto px-4 py-4 text-[18px]");
  if (payload.blurb) {
    content.append(
      el("p", "text-[15px] leading-relaxed text-text-secondary", payload.blurb),
    );
  }

  const sections: { section: HTMLElement; rows: HTMLElement[] }[] = [];
  for (const block of payload.blocks) {
    const section = el("section", "mt-6");
    if (block.heading) {
      section.append(
        el(
          "h3",
          "font-display text-[17px] leading-snug text-text-heading",
          block.heading,
        ),
      );
    }
    if (block.blurb) {
      section.append(
        el(
          "p",
          "mt-1 text-[15px] leading-relaxed text-text-secondary",
          block.blurb,
        ),
      );
    }
    const list = el("ul", "mt-2");
    const rows: HTMLElement[] = [];
    block.items.forEach((item, index) => {
      const row = el(
        "li",
        "flex gap-3 border-b border-line py-3 last:border-b-0",
      );
      row.dataset.text =
        `${item.title} ${item.detail ?? ""} ${item.meta ?? ""}`.toLowerCase();
      if (item.emoji) {
        const wash = WASHES[index % WASHES.length] ?? "bg-wash-sage";
        row.append(
          el(
            "span",
            `grid h-9 w-9 shrink-0 place-items-center rounded-full text-[20px] leading-none ${wash}`,
            item.emoji,
          ),
        );
      }
      const body = el("div", "min-w-0");
      if (item.href) {
        const link = el(
          "a",
          "text-accent underline decoration-line underline-offset-4 transition-colors duration-fast hover:decoration-accent",
          item.title,
        );
        link.href = item.href;
        link.rel = "noopener";
        body.append(link);
      } else {
        body.append(el("span", "text-text-primary", item.title));
      }
      if (item.detail) {
        body.append(
          el(
            "p",
            "mt-0.5 text-[15px] leading-relaxed text-text-secondary",
            item.detail,
          ),
        );
      }
      if (item.meta) {
        body.append(
          el("p", "mt-1 font-mono text-xs text-text-secondary", item.meta),
        );
      }
      row.append(body);
      list.append(row);
      rows.push(row);
    });
    section.append(list);
    content.append(section);
    sections.push({ section, rows });
  }

  const empty = el("p", "mt-4 text-[15px] text-text-secondary", ui.noResults);
  empty.hidden = true;
  content.append(empty);

  // Live filter over title, detail and meta. Headings with no visible rows
  // hide too; nothing is removed from the DOM.
  const filter = (value: string) => {
    const needle = value.trim().toLowerCase();
    let matches = 0;
    for (const { section, rows } of sections) {
      let visible = 0;
      for (const row of rows) {
        const hit = needle === "" || (row.dataset.text ?? "").includes(needle);
        row.hidden = !hit;
        if (hit) visible += 1;
      }
      section.hidden = visible === 0;
      matches += visible;
    }
    empty.hidden = needle === "" || matches > 0;
  };
  input.addEventListener("input", () => filter(input.value));

  // Mobile only (bottom sheet): chips to jump to the five main pages. On
  // desktop the nav already offers them (DESIGN.md §10).
  const chips = el(
    "nav",
    "flex gap-2 overflow-x-auto border-t border-line px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] md:hidden",
  );
  chips.setAttribute("aria-label", ui.navLabel);
  for (const page of ui.pages) {
    const chip = el(
      "a",
      `shrink-0 rounded-sm border px-3 py-2 font-mono text-xs transition-colors duration-fast ${
        page.current
          ? "border-accent/40 text-accent"
          : "border-line text-text-secondary hover:text-text-primary"
      }`,
      page.label,
    );
    chip.href = page.href;
    if (page.current) chip.setAttribute("aria-current", "page");
    chips.append(chip);
  }

  win.append(bar, searchRow, content, chips);
  document.body.append(win);
  return win;
}
