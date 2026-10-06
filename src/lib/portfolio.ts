import { cache } from "react";
import { prisma } from "@/lib/db";
import { mediaPath } from "@/lib/media";

export type Highlight = { label: string; value: string };
export type NavItem = { href: string; label: string };

export type Portfolio = {
  ready: boolean;
  profile: {
    name: string;
    shortName: string;
    jobTitle: string;
    focus: string;
    shortBio: string;
    longBio: string;
    paragraphs: string[];
    location: string;
    email: string;
    phoneDisplay: string;
    phoneHref: string;
    linkedinUrl: string;
    linkedinLabel: string;
    githubUrl: string;
    githubLabel: string;
    websiteUrl: string;
    websiteLabel: string;
    imageUrl: string | null;
    resumeUrl: string | null;
  };
  hero: {
    headingLine1: string;
    headingLine2: string;
    subheading: string;
    primaryCtaLabel: string;
    primaryCtaHref: string;
    secondaryCtaLabel: string;
    secondaryCtaHref: string;
    imageUrl: string | null;
    portraitPosition: number;
    facts: { label: string; value: string; detail: string }[];
  };
  about: {
    eyebrow: string;
    title: string;
    intro: string;
    highlights: Highlight[];
  };
  experienceSection: { eyebrow: string; title: string; intro: string };
  experience: {
    id: string;
    company: string;
    position: string;
    location: string;
    dates: string;
    current: boolean;
    description: string;
    technologies: string[];
    achievements: string[];
  }[];
  workSection: { eyebrow: string; title: string; intro: string };
  projects: {
    id: string;
    name: string;
    period: string;
    kind: string;
    role: string;
    summary: string;
    problem: string;
    contribution: string;
    functionality: string[];
    technologies: string[];
    imageUrl: string | null;
    projectUrl: string;
    githubUrl: string;
    androidUrl: string;
    appleUrl: string;
    featured: boolean;
  }[];
  approachSection: { eyebrow: string; title: string; intro: string };
  approach: { id: string; title: string; body: string }[];
  skillsSection: { eyebrow: string; title: string; intro: string; note: string };
  skillGroups: { label: string; items: { name: string; icon: string }[] }[];
  educationSection: { eyebrow: string; title: string; intro: string };
  education: {
    id: string;
    institution: string;
    degree: string;
    dates: string;
    location: string;
    description: string;
  }[];
  certificationSection: { eyebrow: string; title: string; intro: string };
  certifications: { id: string; name: string; issuer: string; date: string; link: string }[];
  contact: { eyebrow: string; title: string; intro: string; ctaLabel: string };
  seo: { metaTitle: string; metaDescription: string; ogImageUrl: string | null };
  settings: {
    footerText: string;
    navItems: NavItem[];
    paperColor: string;
    inkColor: string;
    signalColor: string;
    lastContentUpdate: Date;
  };
};

function paragraphs(value: string) {
  return value
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

function asHighlights(value: unknown): Highlight[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const record = item as { label?: unknown; value?: unknown };
    if (typeof record.label !== "string" || typeof record.value !== "string") return [];
    return [{ label: record.label, value: record.value }];
  });
}

function asNav(value: unknown): NavItem[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const record = item as { href?: unknown; label?: unknown };
    if (typeof record.href !== "string" || typeof record.label !== "string") return [];
    return [{ href: record.href, label: record.label }];
  });
}

function sectionOf(
  sections: { key: string; eyebrow: string; title: string; intro: string; extra: string }[],
  key: string,
) {
  return sections.find((section) => section.key === key) ?? { eyebrow: "", title: "", intro: "", extra: "" };
}

const empty: Portfolio = {
  ready: false,
  profile: {
    name: "",
    shortName: "",
    jobTitle: "",
    focus: "",
    shortBio: "",
    longBio: "",
    paragraphs: [],
    location: "",
    email: "",
    phoneDisplay: "",
    phoneHref: "",
    linkedinUrl: "",
    linkedinLabel: "",
    githubUrl: "",
    githubLabel: "",
    websiteUrl: "",
    websiteLabel: "",
    imageUrl: null,
    resumeUrl: null,
  },
  hero: {
    headingLine1: "",
    headingLine2: "",
    subheading: "",
    primaryCtaLabel: "",
    primaryCtaHref: "",
    secondaryCtaLabel: "",
    secondaryCtaHref: "",
    imageUrl: null,
    portraitPosition: 18,
    facts: [],
  },
  about: { eyebrow: "", title: "", intro: "", highlights: [] },
  experienceSection: { eyebrow: "", title: "", intro: "" },
  experience: [],
  workSection: { eyebrow: "", title: "", intro: "" },
  projects: [],
  approachSection: { eyebrow: "", title: "", intro: "" },
  approach: [],
  skillsSection: { eyebrow: "", title: "", intro: "", note: "" },
  skillGroups: [],
  educationSection: { eyebrow: "", title: "", intro: "" },
  education: [],
  certificationSection: { eyebrow: "", title: "", intro: "" },
  certifications: [],
  contact: { eyebrow: "", title: "", intro: "", ctaLabel: "" },
  seo: { metaTitle: "", metaDescription: "", ogImageUrl: null },
  settings: {
    footerText: "",
    navItems: [],
    paperColor: "#efece4",
    inkColor: "#171a17",
    signalColor: "#1f6b45",
    lastContentUpdate: new Date(0),
  },
};

export const getPortfolio = cache(async (): Promise<Portfolio> => {
  const [
    profile,
    hero,
    about,
    sections,
    experience,
    projects,
    skills,
    education,
    certifications,
    approach,
    seo,
    settings,
  ] = await Promise.all([
    prisma.profile.findUnique({ where: { id: "default" } }),
    prisma.hero.findUnique({ where: { id: "default" } }),
    prisma.about.findUnique({ where: { id: "default" } }),
    prisma.section.findMany(),
    prisma.experience.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.project.findMany({ orderBy: [{ featured: "desc" }, { sortOrder: "asc" }] }),
    prisma.skill.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.education.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.certification.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.approachItem.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.seo.findUnique({ where: { id: "default" } }),
    prisma.siteSettings.findUnique({ where: { id: "default" } }),
  ]);

  if (!profile || !hero || !about || !seo || !settings) return empty;

  const aboutSection = sectionOf(sections, "about");
  const experienceSection = sectionOf(sections, "experience");
  const workSection = sectionOf(sections, "work");
  const approachSection = sectionOf(sections, "approach");
  const skillsSection = sectionOf(sections, "skills");
  const educationSection = sectionOf(sections, "education");
  const certificationSection = sectionOf(sections, "certifications");
  const contactSection = sectionOf(sections, "contact");

  const facts = [1, 2, 3].flatMap((index) => {
    const label = hero[`fact${index}Label` as "fact1Label"];
    const value = hero[`fact${index}Value` as "fact1Value"];
    const detail = hero[`fact${index}Detail` as "fact1Detail"];
    if (!label || !value) return [];
    return [{ label, value, detail }];
  });

  const skillGroups: Portfolio["skillGroups"] = [];
  for (const skill of skills) {
    const group = skillGroups.find((item) => item.label === skill.category);
    if (group) group.items.push({ name: skill.name, icon: skill.icon });
    else skillGroups.push({ label: skill.category, items: [{ name: skill.name, icon: skill.icon }] });
  }

  const featured = projects.filter((project) => project.featured);
  const rest = projects.filter((project) => !project.featured);

  return {
    ready: true,
    profile: {
      name: profile.name,
      shortName: profile.shortName,
      jobTitle: profile.jobTitle,
      focus: profile.focus,
      shortBio: profile.shortBio,
      longBio: profile.longBio,
      paragraphs: paragraphs(profile.longBio),
      location: profile.location,
      email: profile.email,
      phoneDisplay: profile.phoneDisplay,
      phoneHref: profile.phoneHref,
      linkedinUrl: profile.linkedinUrl,
      linkedinLabel: profile.linkedinLabel,
      githubUrl: profile.githubUrl,
      githubLabel: profile.githubLabel,
      websiteUrl: profile.websiteUrl,
      websiteLabel: profile.websiteLabel,
      imageUrl: mediaPath(profile.imageId),
      resumeUrl: mediaPath(profile.resumeId),
    },
    hero: {
      headingLine1: hero.headingLine1,
      headingLine2: hero.headingLine2,
      subheading: hero.subheading,
      primaryCtaLabel: hero.primaryCtaLabel,
      primaryCtaHref: hero.primaryCtaHref,
      secondaryCtaLabel: hero.secondaryCtaLabel,
      secondaryCtaHref: hero.secondaryCtaHref,
      imageUrl: mediaPath(profile.imageId) ?? mediaPath(hero.imageId),
      portraitPosition: hero.portraitPosition,
      facts,
    },
    about: {
      eyebrow: aboutSection.eyebrow,
      title: aboutSection.title,
      intro: aboutSection.intro,
      highlights: asHighlights(about.highlights),
    },
    experienceSection: {
      eyebrow: experienceSection.eyebrow,
      title: experienceSection.title,
      intro: experienceSection.intro,
    },
    experience: experience.map((item) => ({
      id: item.id,
      company: item.company,
      position: item.position,
      location: item.location,
      dates: item.dates,
      current: item.current,
      description: item.description,
      technologies: item.technologies,
      achievements: item.achievements,
    })),
    workSection: { eyebrow: workSection.eyebrow, title: workSection.title, intro: workSection.intro },
    projects: [...featured, ...rest].map((project) => ({
      id: project.id,
      name: project.name,
      period: project.period,
      kind: project.kind,
      role: project.role,
      summary: project.summary,
      problem: project.problem,
      contribution: project.contribution,
      functionality: project.functionality,
      technologies: project.technologies,
      imageUrl: mediaPath(project.imageId),
      projectUrl: project.projectUrl,
      githubUrl: project.githubUrl,
      androidUrl: project.androidUrl,
      appleUrl: project.appleUrl,
      featured: project.featured,
    })),
    approachSection: {
      eyebrow: approachSection.eyebrow,
      title: approachSection.title,
      intro: approachSection.intro,
    },
    approach: approach.map((item) => ({ id: item.id, title: item.title, body: item.body })),
    skillsSection: {
      eyebrow: skillsSection.eyebrow,
      title: skillsSection.title,
      intro: skillsSection.intro,
      note: skillsSection.extra,
    },
    skillGroups,
    educationSection: {
      eyebrow: educationSection.eyebrow,
      title: educationSection.title,
      intro: educationSection.intro,
    },
    education: education.map((item) => ({
      id: item.id,
      institution: item.institution,
      degree: item.degree,
      dates: item.dates,
      location: item.location,
      description: item.description,
    })),
    certificationSection: {
      eyebrow: certificationSection.eyebrow,
      title: certificationSection.title,
      intro: certificationSection.intro,
    },
    certifications: certifications.map((item) => ({
      id: item.id,
      name: item.name,
      issuer: item.issuer,
      date: item.date,
      link: item.link,
    })),
    contact: {
      eyebrow: contactSection.eyebrow,
      title: contactSection.title,
      intro: contactSection.intro,
      ctaLabel: contactSection.extra,
    },
    seo: {
      metaTitle: seo.metaTitle,
      metaDescription: seo.metaDescription,
      ogImageUrl: mediaPath(seo.ogImageId),
    },
    settings: {
      footerText: settings.footerText,
      navItems: asNav(settings.navItems),
      paperColor: settings.paperColor,
      inkColor: settings.inkColor,
      signalColor: settings.signalColor,
      lastContentUpdate: settings.lastContentUpdate,
    },
  };
});
