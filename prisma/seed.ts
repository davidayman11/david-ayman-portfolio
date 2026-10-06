import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import {
  about,
  approach,
  education,
  experience,
  heroFacts,
  nav,
  profile,
  projects,
  seo,
  skillGroups,
  skillNote,
} from "./content";

const prisma = new PrismaClient();

const shortBio =
  "I develop Flutter products that streamline real-world operations, including booking platforms, food ordering systems, warehouse management, attendance solutions, and healthcare applications.";

async function main() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password || password.length < 12) {
    throw new Error("Set ADMIN_EMAIL and an ADMIN_PASSWORD of at least 12 characters.");
  }

  await prisma.admin.upsert({
    where: { email },
    update: { passwordHash: await bcrypt.hash(password, 12), failedAttempts: 0, lockedUntil: null },
    create: { email, passwordHash: await bcrypt.hash(password, 12) },
  });

  const existing = await prisma.profile.findUnique({ where: { id: "default" } });
  if (existing) {
    console.log("Portfolio content already exists. The admin password was updated from ADMIN_PASSWORD.");
    return;
  }

  const portrait = await readFile(path.join(process.cwd(), "public/david-ayman.jpg"));
  const resume = await readFile(path.join(process.cwd(), "public/david-ayman-mahrous-cv.pdf"));
  const portraitMedia = await prisma.media.create({
    data: {
      filename: "david-ayman.jpg",
      mimeType: "image/jpeg",
      bytes: new Uint8Array(portrait),
      size: portrait.byteLength,
    },
  });
  const resumeMedia = await prisma.media.create({
    data: {
      filename: "david-ayman-mahrous-cv.pdf",
      mimeType: "application/pdf",
      bytes: new Uint8Array(resume),
      size: resume.byteLength,
    },
  });

  await prisma.profile.create({
    data: {
      id: "default",
      name: profile.name,
      shortName: profile.shortName,
      jobTitle: profile.title,
      focus: profile.focus,
      shortBio,
      longBio: about.paragraphs.join("\n\n"),
      location: profile.location,
      email: profile.email,
      phoneDisplay: profile.phoneDisplay,
      phoneHref: profile.phoneHref,
      linkedinUrl: profile.linkedin,
      linkedinLabel: profile.linkedinHandle,
      githubUrl: profile.github,
      githubLabel: profile.githubHandle,
      imageId: portraitMedia.id,
      resumeId: resumeMedia.id,
    },
  });

  await prisma.hero.create({
    data: {
      id: "default",
      headingLine1: "David Ayman",
      headingLine2: "Mahrous",
      subheading: shortBio,
      primaryCtaLabel: "View my work",
      primaryCtaHref: "#work",
      secondaryCtaLabel: "Contact me",
      secondaryCtaHref: "#contact",
      imageId: portraitMedia.id,
      fact1Label: heroFacts[0].label,
      fact1Value: heroFacts[0].value,
      fact1Detail: heroFacts[0].detail,
      fact2Label: heroFacts[1].label,
      fact2Value: heroFacts[1].value,
      fact2Detail: heroFacts[1].detail,
      fact3Label: heroFacts[2].label,
      fact3Value: heroFacts[2].value,
      fact3Detail: heroFacts[2].detail,
    },
  });

  await prisma.about.create({
    data: { id: "default", highlights: about.notes.map((note) => ({ label: note.label, value: note.value })) },
  });

  await prisma.section.createMany({
    data: [
      { key: "about", eyebrow: "Profile", title: "Mobile products, built as software." },
      {
        key: "experience",
        eyebrow: "Experience",
        title: "Product work, and a season in procurement.",
        intro:
          "Mobile engineering at PayBand Solutions is the current role. The Majid Al Futtaim internship was sourcing work with the procurement team.",
      },
      {
        key: "work",
        eyebrow: "Selected work",
        title: "Products with a job to do.",
        intro:
          "Current product work, a graduation project in healthcare, community tools for a scout group, and the first Flutter apps.",
      },
      {
        key: "approach",
        eyebrow: "Engineering",
        title: "How the work is put together.",
        intro: "Four habits that show up across the apps.",
      },
      {
        key: "skills",
        eyebrow: "Stack",
        title: "What I use, grouped the way the work uses it.",
        intro:
          "Languages from the degree and the diploma. Mobile, data, and backend tools from the products and the training that produced them.",
        extra: skillNote,
      },
      {
        key: "education",
        eyebrow: "Education",
        title: "Degree, diploma, and the Flutter training underneath.",
      },
      { key: "certifications", eyebrow: "Certifications", title: "Certifications" },
      {
        key: "contact",
        eyebrow: "Contact",
        title: "Tell me what you are building.",
        intro: "I am open to a role, a product conversation, or a closer look at the work. Based in Cairo.",
        extra: `Email ${profile.shortName}`,
      },
    ],
  });

  await prisma.experience.createMany({
    data: experience.map((item, sortOrder) => ({
      company: item.company,
      position: item.role,
      location: item.location ?? "",
      dates: item.period,
      current: Boolean(item.current),
      description: item.summary,
      technologies: [...item.technologies],
      achievements: [...item.points],
      sortOrder,
    })),
  });

  await prisma.project.createMany({
    data: projects.map((project, sortOrder) => ({
      name: project.name,
      period: project.period,
      kind: project.kind,
      role: project.role,
      summary: project.summary,
      problem: project.problem,
      contribution: project.contribution,
      functionality: [...project.functionality],
      technologies: [...project.stack],
      featured: project.featured,
      sortOrder,
    })),
  });

  let skillOrder = 0;
  await prisma.skill.createMany({
    data: skillGroups.flatMap((group) =>
      group.items.map((name) => ({
        name,
        category: group.label,
        sortOrder: skillOrder++,
      })),
    ),
  });

  await prisma.approachItem.createMany({
    data: approach.map((item, sortOrder) => ({
      title: item.title,
      body: item.body,
      sortOrder,
    })),
  });

  await prisma.education.createMany({
    data: education.map((item, sortOrder) => ({
      degree: item.title,
      institution: item.place,
      dates: item.period,
      location: item.location,
      description: item.detail,
      sortOrder,
    })),
  });

  await prisma.seo.create({
    data: { id: "default", metaTitle: seo.title, metaDescription: seo.description },
  });

  await prisma.siteSettings.create({
    data: {
      id: "default",
      footerText: profile.title,
      navItems: [...nav, { href: "#education", label: "Education" }],
      paperColor: "#efece4",
      inkColor: "#171a17",
      signalColor: "#1f6b45",
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
