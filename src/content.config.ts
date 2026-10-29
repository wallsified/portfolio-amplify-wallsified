import { defineCollection, z } from "astro:content";
import { file } from "astro/loaders";

// Schemas shared by both locales; the data lives in src/content/{es,en}/*.json.
// Never invent fields: everything here comes from agent_docs/*_content.md.

const profileSchema = z.object({
  id: z.string(),
  name: z.string(),
  handle: z.string(),
  title: z.string(),
  location: z.string(),
  greeting: z.string(),
  bio: z.string(),
  avatar: z.string(),
  email: z.string().email(),
  links: z.object({
    github: z.string().url(),
    linkedin: z.string().url(),
    aws: z.string().url(),
    cv: z.string(),
  }),
});

const projectSchema = z.object({
  id: z.string(),
  order: z.number(),
  title: z.string(),
  description: z.string(),
  tech: z.array(z.string()),
  url: z.string().url(),
  featured: z.boolean().default(false),
  image: z
    .object({
      src: z.string(),
      alt: z.string(),
    })
    .optional(),
});

const educationSchema = z.object({
  id: z.string(),
  order: z.number(),
  degree: z.string(),
  institution: z.string(),
  location: z.string(),
  status: z.enum(["in-progress", "completed"]),
});

const workSchema = z.object({
  id: z.string(),
  order: z.number(),
  role: z.string(),
  company: z.string(),
  location: z.string(),
  description: z.string(),
  start: z.string(),
  end: z.string().optional(),
});

const certificationSchema = z.object({
  id: z.string(),
  order: z.number(),
  title: z.string(),
  issuer: z.string(),
  validity: z.string(),
  url: z.string().url().optional(),
});

const communitySchema = z.object({
  id: z.string(),
  order: z.number(),
  name: z.string(),
  role: z.string(),
  description: z.string(),
  url: z.string().url(),
  emoji: z.string(),
});

const materialSchema = z.object({
  id: z.string(),
  order: z.number(),
  title: z.string(),
  type: z.enum(["guide", "talk", "templates"]),
  description: z.string(),
  url: z.string().url(),
  inSpanish: z.boolean().default(false),
});

const es = "./src/content/es";
const en = "./src/content/en";

export const collections = {
  profileEs: defineCollection({
    loader: file(`${es}/profile.json`),
    schema: profileSchema,
  }),
  profileEn: defineCollection({
    loader: file(`${en}/profile.json`),
    schema: profileSchema,
  }),
  projectsEs: defineCollection({
    loader: file(`${es}/projects.json`),
    schema: projectSchema,
  }),
  projectsEn: defineCollection({
    loader: file(`${en}/projects.json`),
    schema: projectSchema,
  }),
  educationEs: defineCollection({
    loader: file(`${es}/education.json`),
    schema: educationSchema,
  }),
  educationEn: defineCollection({
    loader: file(`${en}/education.json`),
    schema: educationSchema,
  }),
  workEs: defineCollection({
    loader: file(`${es}/work.json`),
    schema: workSchema,
  }),
  workEn: defineCollection({
    loader: file(`${en}/work.json`),
    schema: workSchema,
  }),
  certificationsEs: defineCollection({
    loader: file(`${es}/certifications.json`),
    schema: certificationSchema,
  }),
  certificationsEn: defineCollection({
    loader: file(`${en}/certifications.json`),
    schema: certificationSchema,
  }),
  communitiesEs: defineCollection({
    loader: file(`${es}/communities.json`),
    schema: communitySchema,
  }),
  communitiesEn: defineCollection({
    loader: file(`${en}/communities.json`),
    schema: communitySchema,
  }),
  materialsEs: defineCollection({
    loader: file(`${es}/materials.json`),
    schema: materialSchema,
  }),
  materialsEn: defineCollection({
    loader: file(`${en}/materials.json`),
    schema: materialSchema,
  }),
};
