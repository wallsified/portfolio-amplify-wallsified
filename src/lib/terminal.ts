// Lazy module for the hidden Terminal (DESIGN.md §10, easter egg 2). Fetched
// with a dynamic import() on the first trigger, so it adds nothing to the
// initial JS. It builds the window once and reuses it: output is written with
// textContent only (never innerHTML), nothing is stored or sent, and it never
// intercepts normal clicks outside the window.

export interface TerminalStrings {
  closeLabel: string;
  title: string;
  inputLabel: string;
  banner: string;
  help: string[];
  notFound: string;
  tryHelp: string;
  chipsLabel: string;
}

export interface TerminalPayload {
  prompt: string;
  strings: TerminalStrings;
  about: { name: string; title: string; location: string; bio: string };
  skills: { label: string; items: string[] }[];
  projects: string[];
  communities: string[];
  resources: string[];
  contact: string[];
  chips: { label: string; href: string }[];
}

let win: HTMLElement | null = null;
let output: HTMLElement | null = null;
let input: HTMLInputElement | null = null;
let payload: TerminalPayload | null = null;
let restoreFocusTo: HTMLElement | null = null;

// Announce the open state on every trigger (side rail, mobile monogram).
const syncOpeners = (open: boolean): void => {
  document
    .querySelectorAll<HTMLElement>("[data-terminal-open]")
    .forEach((el) => el.setAttribute("aria-expanded", String(open)));
};

// One output block per write; `white-space: pre-wrap` keeps the line breaks.
const write = (text: string, className?: string): void => {
  if (!output) return;
  const line = document.createElement("p");
  line.className = className ? `term-line ${className}` : "term-line";
  line.textContent = text; // never innerHTML (DESIGN.md §10)
  output.append(line);
  output.scrollTop = output.scrollHeight;
};

const run = (raw: string): void => {
  const p = payload;
  if (!p) return;
  const command = raw.trim().toLowerCase();
  if (!command) return;
  write(`${p.prompt} ${raw.trim()}`, "term-echo");
  switch (command) {
    case "help":
      write(p.strings.help.join("\n"));
      break;
    case "about":
      write(
        `${p.about.name} — ${p.about.title}\n${p.about.location}\n\n${p.about.bio}`,
      );
      break;
    case "skills":
      write(
        p.skills.map((c) => `${c.label}: ${c.items.join(", ")}`).join("\n"),
      );
      break;
    case "projects":
      write(p.projects.join("\n"));
      break;
    case "communities":
      write(p.communities.join("\n"));
      break;
    case "resources":
      write(p.resources.join("\n"));
      break;
    case "contact":
      write(p.contact.join("\n"));
      break;
    case "clear":
      output?.replaceChildren();
      break;
    default:
      // "Comando no encontrado" + a pointer to help.
      write(
        `${p.strings.notFound}: ${command}\n${p.strings.tryHelp}`,
        "term-dim",
      );
  }
};

export const isTerminalOpen = (): boolean => win !== null && !win.hidden;

export const closeTerminal = (): void => {
  if (!win) return;
  win.hidden = true;
  syncOpeners(false);
  if (restoreFocusTo?.isConnected) restoreFocusTo.focus();
  restoreFocusTo = null;
};

const build = (p: TerminalPayload): HTMLElement => {
  const dialog = document.createElement("div");
  dialog.className = "term-window";
  dialog.setAttribute("role", "dialog");
  dialog.setAttribute("aria-modal", "false"); // non-modal (DESIGN.md §10)
  dialog.setAttribute("aria-labelledby", "term-title");
  dialog.hidden = true;

  const bar = document.createElement("div");
  bar.className = "term-bar";

  const dots = document.createElement("span");
  dots.className = "term-dots";
  dots.setAttribute("aria-hidden", "true");
  for (const tone of ["peach", "sage", "sky"]) {
    const dot = document.createElement("span");
    dot.className = `term-dot term-dot--${tone}`;
    dots.append(dot);
  }

  const title = document.createElement("span");
  title.className = "term-title";
  title.id = "term-title";
  title.textContent = p.strings.title;

  const close = document.createElement("button");
  close.type = "button";
  close.className = "term-close";
  close.setAttribute("aria-label", p.strings.closeLabel);
  close.textContent = "✕";
  close.addEventListener("click", closeTerminal);

  bar.append(dots, title, close);

  output = document.createElement("div");
  output.className = "term-out";
  output.setAttribute("role", "log");
  output.setAttribute("aria-live", "polite");
  output.tabIndex = 0; // scrollable region stays keyboard-operable

  const form = document.createElement("form");
  form.className = "term-form";
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // inside the toy only; the page is untouched
    if (!input) return;
    const value = input.value;
    input.value = "";
    run(value);
  });

  const prompt = document.createElement("span");
  prompt.className = "term-prompt";
  prompt.setAttribute("aria-hidden", "true");
  prompt.textContent = p.prompt;

  input = document.createElement("input");
  input.type = "text";
  input.className = "term-input";
  input.setAttribute("aria-label", p.strings.inputLabel);
  input.setAttribute("autocomplete", "off");
  input.setAttribute("autocapitalize", "off");
  input.spellcheck = false;

  form.append(prompt, input);

  // Mobile affordance (DESIGN.md §10): chips to the five main pages; hidden
  // on desktop, where navigation already lives in the side rail.
  const chips = document.createElement("nav");
  chips.className = "term-chips";
  chips.setAttribute("aria-label", p.strings.chipsLabel);
  p.chips.forEach((chip) => {
    const link = document.createElement("a");
    link.className = "term-chip";
    link.href = chip.href;
    link.textContent = chip.label;
    chips.append(link);
  });

  dialog.append(bar, output, form, chips);
  document.body.append(dialog);

  // Esc closes and restores focus (DESIGN.md §10); non-modal, so no trap.
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !dialog.hidden) closeTerminal();
  });

  return dialog;
};

export const openTerminal = (p: TerminalPayload): void => {
  const wasOpen = win !== null && !win.hidden;
  payload = p;
  if (!win) {
    win = build(p);
    write(p.strings.banner, "term-dim"); // dim one-liner on first open
  }
  // Remember where to return focus only when opening from closed.
  if (!wasOpen && document.activeElement instanceof HTMLElement)
    restoreFocusTo = document.activeElement;
  win.hidden = false;
  syncOpeners(true);
  input?.focus();
};

// Triggers toggle; the `t` key only opens (typing `t` outside a field while
// the window is open should not throw the visitor out of the toy).
export const toggleTerminal = (p: TerminalPayload): void => {
  if (win && !win.hidden) closeTerminal();
  else openTerminal(p);
};
