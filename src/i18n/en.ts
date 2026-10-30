import type { Dictionary } from "./es";

export const en: Dictionary = {
  lang: "en",
  ogLocale: "en_US",
  skipToContent: "Skip to content",
  cvLabel: "My Resume",
  langLabel: "Language",
  navAriaLabel: "Main navigation",
  openMenu: "Open menu",
  closeMenu: "Close menu",
  verify: "Verify credential",
  socialLabels: { aws: "AWS Builder Center" },
  langNames: { es: "Español", en: "English" },
  nav: [
    { number: "01.", key: "home", label: "About" },
    { number: "02.", key: "skills", label: "Skills & Experiences" },
    { number: "03.", key: "projects", label: "Projects" },
    { number: "04.", key: "communities", label: "Communities" },
    { number: "05.", key: "resources", label: "Resources" },
  ],
  heroCta: "Learn more about me",
  sections: {
    about: "About Me",
    education: "Education",
    work: "Work Experience",
    technologies: "Technologies I Use",
    certifications: "Certifications",
  },
  intros: {
    education: "Institutions where I received my academic training.",
    work: "Companies where I've applied my knowledge and made valuable contributions.",
    technologies:
      "Programming languages, frameworks, and tools I use in my projects.",
    certifications:
      "Certifications I've earned to validate my skills and knowledge.",
    projects: "Some projects I've worked on using different technologies.",
    communities:
      "Tech communities where I contribute by sharing and creating knowledge.",
    materials:
      "Materials, talks & workshops I've created for the communities I'm involved in.",
  },
  educationStatus: "in progress",
  materialTypes: { guide: "guide", talk: "talk", templates: "templates" },
  inSpanish: "in Spanish",
  builder: {
    loader: "Builder Mode Activated. Loading...",
    exitLabel: "Exit Builder Mode",
    hintLabel: "Activate Builder Mode",
    consoleHint: "psst… press the `b` key to toggle Builder Mode",
    navAriaLabel: "Builder navigation",
    crumbRoot: "Home",
    crumbAriaLabel: "Breadcrumb",
    heroCode: { keyword: "if", condition: "visitor", call: "hello" },
    heroCta: "See projects",
    explore: "Explore",
    toggleAria: "Order",
    toggleA: "Featured",
    toggleB: "Recent",
    viewAll: "View all →",
    pageHeads: {
      skills: {
        title: "Skills & Experiences",
        intro:
          "The tools and technologies I use, my education, work experience and certifications.",
      },
    },
    featuredChip: "Featured",
    filterAria: "Filter by type",
    filterAll: "All",
    tabsAria: "Experience sections",
  },
  footer: {
    heading: "Have a project or a question?",
    text: "Tell me about it and let's talk.",
    cta: "Email me",
  },
  meta: {
    home: {
      title: "Daniel Paredes — Computer Scientist / Developer",
      description:
        "Portfolio of Daniel Paredes (@wallsified), Computer Scientist / Developer in Mexico City. Projects, communities, and resources.",
    },
    skills: {
      title: "Experience — Daniel Paredes",
      description:
        "Education, work experience, technologies, and certifications of Daniel Paredes: Faculty of Sciences UNAM, Equilibra, América Móvil, GitHub, Google, Cambridge, and AWS.",
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
