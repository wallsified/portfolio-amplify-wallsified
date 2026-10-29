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
    { number: "01.", key: "home", label: "About" },
    { number: "02.", key: "skills", label: "Experience" },
    { number: "03.", key: "projects", label: "Projects" },
    { number: "04.", key: "communities", label: "Communities" },
    { number: "05.", key: "resources", label: "Resources" },
  ],
  heroCta: "Learn more about me",
  sections: {
    about: "About Me",
    education: "Education",
    work: "Work Experience",
    certifications: "Certifications",
  },
  intros: {
    education: "Institutions where I received my academic training.",
    work: "Companies where I've applied my knowledge and made valuable contributions.",
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
