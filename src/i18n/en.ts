// UI strings for the English locale (under /en/).
// Drafted from es.ts; flagged as reviewed: false in src/config.ts until the
// owner approves the translation. Real facts live in src/content/en/*.json.

import type { Dictionary } from "./es";

export const en: Dictionary = {
  lang: "en",
  ogLocale: "en_US",
  skipToContent: "Skip to content",
  cvLabel: "Resume",
  langLabel: "Language",
  navAriaLabel: "Main navigation",
  openMenu: "Open menu",
  closeMenu: "Close menu",
  verify: "Verify credential",
  socialLabels: { aws: "AWS Builder Center" },
  langNames: { es: "Español", en: "English" },
  nav: [
    { number: "01.", key: "home", label: "About Me" },
    { number: "02.", key: "experience", label: "Experience" },
    { number: "03.", key: "projects", label: "Projects" },
    { number: "04.", key: "communities", label: "Communities" },
    { number: "05.", key: "resources", label: "Resources" },
  ],
  heroCta: "See projects",
  sections: {
    about: "About Me",
    education: "Education",
    work: "Work Experience",
    certifications: "Certifications",
  },
  intros: {
    education: "Institutions where I received my academic training.",
    work: "Companies where I have been able to apply my knowledge and make valuable contributions.",
    certifications: "Certifications that validate my knowledge.",
    projects: "Some projects I've worked on using different technologies.",
    communities:
      "Communities and user groups where I contribute by sharing and creating knowledge.",
    materials:
      "Materials I've created for the communities I'm involved in, and talks/workshops I've given.",
  },
  educationStatus: "in progress",
  materialTypes: { guide: "guide", talk: "talk", templates: "templates" },
  inSpanish: "in Spanish",
  footer: {
    heading: "Get in touch",
    text: "Have a project or a question? Tell me about it and let's talk.",
    cta: "Email me",
  },
  meta: {
    home: {
      title: "Daniel Paredes — Computer Scientist / Developer",
      description:
        "Portfolio of Daniel Paredes (@wallsified), Computer Scientist / Developer in Mexico City. Projects, communities, and resources.",
    },
    experience: {
      title: "Experience — Daniel Paredes",
      description:
        "Education, work experience, and certifications of Daniel Paredes: Faculty of Sciences UNAM, Equilibra, América Móvil, GitHub, Google, Cambridge, and AWS.",
    },
    projects: {
      title: "Projects — Daniel Paredes",
      description:
        "Projects by Daniel Paredes: City Lens, Posadas de Código, K-Coloring of a Graph, and Python Portfolio.",
    },
    communities: {
      title: "Communities — Daniel Paredes",
      description:
        "Communities where Daniel Paredes shares knowledge: Sudo FCiencias, AWS Student Builder Group UNAM, and PythonCDMX.",
    },
    resources: {
      title: "Resources — Daniel Paredes",
      description:
        "Study guides, talks, and templates created by Daniel Paredes for tech communities.",
    },
  },
};
