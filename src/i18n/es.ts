// UI strings for the Spanish locale (default, no prefix).
// Real biography and facts live in src/content/es/*.json — never here.

export type PageKey =
  "home" | "experience" | "projects" | "communities" | "resources";

export const es = {
  lang: "es",
  ogLocale: "es_MX",
  skipToContent: "Saltar al contenido",
  cvLabel: "CV",
  langLabel: "Idioma",
  navAriaLabel: "Navegación principal",
  openMenu: "Abrir menú",
  closeMenu: "Cerrar menú",
  verify: "Verificar credencial",
  socialLabels: { aws: "AWS Builder Center" },
  langNames: { es: "Español", en: "English" },
  nav: [
    { number: "01.", key: "home" as PageKey, label: "Sobre mí" },
    { number: "02.", key: "experience" as PageKey, label: "Experiencia" },
    { number: "03.", key: "projects" as PageKey, label: "Proyectos" },
    { number: "04.", key: "communities" as PageKey, label: "Comunidades" },
    { number: "05.", key: "resources" as PageKey, label: "Materiales" },
  ],
  heroCta: "Ver proyectos",
  sections: {
    about: "Sobre mí",
    education: "Educación",
    work: "Experiencia laboral",
    certifications: "Certificaciones",
  },
  intros: {
    education: "Instituciones donde me he formado académicamente.",
    work: "Empresas en donde he podido aplicar mis conocimientos y crear aportes valiosos.",
    certifications: "Certificaciones que avalan mi conocimiento.",
    projects: "Algunos proyectos que he realizado con distintas tecnologías.",
    communities:
      "Comunidades y grupos de usuarios donde ayudo compartiendo y creando conocimiento.",
    materials:
      "Materiales que he creado para las comunidades en donde participo y charlas/talleres que he dado.",
  },
  educationStatus: "en curso",
  materialTypes: { guide: "guía", talk: "charla", templates: "plantillas" },
  inSpanish: "en español",
  footer: {
    heading: "¿Tienes un proyecto o una duda?",
    text: "Cuéntame y platicamos.",
    cta: "Escríbeme un correo",
  },
  meta: {
    home: {
      title: "Daniel Paredes — Computólogo / Desarrollador",
      description:
        "Portafolio de Daniel Paredes (@wallsified), computólogo y desarrollador en Ciudad de México. Proyectos, comunidades y recursos.",
    },
    experience: {
      title: "Experiencia — Daniel Paredes",
      description:
        "Educación, experiencia laboral y certificaciones de Daniel Paredes: Facultad de Ciencias UNAM, Equilibra, América Móvil, GitHub, Google, Cambridge y AWS.",
    },
    projects: {
      title: "Proyectos — Daniel Paredes",
      description:
        "Proyectos de Daniel Paredes: City Lens, Posadas de Código, K-Coloraciones de una Gráfica y Portafolio Pythonico.",
    },
    communities: {
      title: "Comunidades — Daniel Paredes",
      description:
        "Comunidades donde Daniel Paredes comparte conocimiento: Sudo FCiencias, AWS Student Builder Group UNAM y PythonCDMX.",
    },
    resources: {
      title: "Materiales — Daniel Paredes",
      description:
        "Guías de estudio, charlas y plantillas creadas por Daniel Paredes para comunidades tecnológicas.",
    },
  },
};

export type Dictionary = typeof es;
