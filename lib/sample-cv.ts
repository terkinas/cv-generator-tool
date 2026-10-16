import type { CvData } from "@/types/cv";

export const sampleCv: CvData = {
  personal: {
    firstName: "Daniel",
    lastName: "Rowe",
    title: "Senior Frontend Engineer",
    phone: "+370 600 00000",
    email: "daniel.rowe@example.com",
    portfolio: "portfolio.example.com/daniel",
    location: "Vilnius, Lithuania",
  },
  about:
    "Frontend engineer with 8+ years of experience building fast, accessible web applications. I enjoy turning complex product requirements into clean interfaces, mentoring teammates and improving developer workflows. Currently focused on React, Next.js and design systems.",
  education: [
    {
      id: "edu-1",
      institution: "Vilnius University",
      subtitle: "MSc in Software Engineering",
      date: "2016 – 2018",
    },
    {
      id: "edu-2",
      institution: "Vilnius University",
      subtitle: "BSc in Informatics",
      date: "2012 – 2016",
    },
  ],
  skills: [
    { id: "skill-1", name: "TypeScript" },
    { id: "skill-2", name: "React" },
    { id: "skill-3", name: "Next.js" },
    { id: "skill-4", name: "Tailwind CSS" },
    { id: "skill-5", name: "Node.js" },
    { id: "skill-6", name: "GraphQL" },
    { id: "skill-7", name: "Accessibility" },
    { id: "skill-8", name: "Testing" },
  ],
  languages: [
    { id: "lang-1", name: "Lithuanian", level: "Native" },
    { id: "lang-2", name: "English", level: "Fluent" },
    { id: "lang-3", name: "German", level: "Intermediate" },
  ],
  experience: [
    {
      id: "exp-1",
      title: "Senior Frontend Engineer",
      subtitle: "Northwind Labs, Vilnius",
      date: "2022 – Present",
      description:
        "• Lead a team of five engineers building a B2B analytics platform used by 40,000+ people.\n• Introduced a shared component library that cut feature delivery time by roughly 30%.\n• Improved Core Web Vitals across key pages, raising Lighthouse scores from 62 to 95.",
    },
    {
      id: "exp-2",
      title: "Frontend Engineer",
      subtitle: "Brightside Digital, Kaunas",
      date: "2019 – 2022",
      description:
        "• Built and maintained customer-facing React applications for e-commerce clients.\n• Migrated a legacy JavaScript codebase to TypeScript with zero downtime.\n• Set up end-to-end testing and CI pipelines that caught regressions before release.",
    },
    {
      id: "exp-3",
      title: "Junior Web Developer",
      subtitle: "Pixelworks Studio, Vilnius",
      date: "2017 – 2019",
      description:
        "• Implemented responsive marketing sites and landing pages from design mockups.\n• Collaborated with designers to keep UI consistent and accessible.",
    },
  ],
};
