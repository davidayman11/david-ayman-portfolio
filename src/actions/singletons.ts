"use server";

import { redirect } from "next/navigation";
import { failure, type ActionState } from "@/lib/action-state";
import { prisma } from "@/lib/db";
import { createMedia, readUpload, releaseMedia } from "@/lib/media";
import { readAbout, readContact, readHero, readProfile, readSection, readSeo, readSettings } from "@/lib/validators";
import { guard, revalidatePortfolio, touch } from "@/actions/shared";

const sectionKeys = new Set([
  "about",
  "experience",
  "work",
  "approach",
  "skills",
  "education",
  "certifications",
  "contact",
]);

export async function saveProfile(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await guard();
  const parsed = readProfile(formData);
  if (!parsed.ok) return parsed.state;

  const image = await readUpload(formData, "image", "image");
  if (image.error) return failure(image.error, { image: image.error });
  const resume = await readUpload(formData, "resume", "pdf");
  if (resume.error) return failure(resume.error, { resume: resume.error });

  const existing = await prisma.profile.findUnique({ where: { id: "default" } });
  if (!existing) return failure("The profile has not been created yet.");

  let imageId = existing.imageId;
  let resumeId = existing.resumeId;
  if (image.file) imageId = (await createMedia(image.file)).id;
  if (resume.file) resumeId = (await createMedia(resume.file)).id;

  await prisma.profile.update({
    where: { id: "default" },
    data: { ...parsed.data, imageId, resumeId },
  });
  await prisma.hero.update({
    where: { id: "default" },
    data: { subheading: parsed.data.shortBio },
  });

  if (image.file && existing.imageId && existing.imageId !== imageId) await releaseMedia(existing.imageId);
  if (resume.file && existing.resumeId && existing.resumeId !== resumeId) await releaseMedia(existing.resumeId);

  await touch();
  revalidatePortfolio();
  redirect("/admin/profile?saved=1");
}

export async function savePortrait(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await guard();
  const position = Number(formData.get("portraitPosition"));
  if (!Number.isInteger(position) || position < 0 || position > 100) {
    return failure("Move the photo between the top and the bottom.", { portraitPosition: "Choose a position from 0 to 100." });
  }

  const image = await readUpload(formData, "image", "image");
  if (image.error) return failure(image.error, { image: image.error });

  const [profile, hero] = await Promise.all([
    prisma.profile.findUnique({ where: { id: "default" } }),
    prisma.hero.findUnique({ where: { id: "default" } }),
  ]);
  if (!profile || !hero) return failure("The profile has not been created yet.");

  let imageId = profile.imageId ?? hero.imageId;
  if (image.file) imageId = (await createMedia(image.file)).id;

  await prisma.profile.update({ where: { id: "default" }, data: { imageId } });
  await prisma.hero.update({ where: { id: "default" }, data: { imageId, portraitPosition: position } });

  const previous = new Set([profile.imageId, hero.imageId].filter((id): id is string => Boolean(id)));
  for (const id of previous) {
    if (id !== imageId) await releaseMedia(id);
  }

  await touch();
  revalidatePortfolio();
  redirect("/admin/profile?saved=photo");
}

export async function saveResume(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await guard();
  const resume = await readUpload(formData, "resume", "pdf");
  if (resume.error) return failure(resume.error, { resume: resume.error });
  if (!resume.file) return failure("Choose a PDF to upload.", { resume: "Choose a PDF to upload." });

  const existing = await prisma.profile.findUnique({ where: { id: "default" } });
  if (!existing) return failure("The profile has not been created yet.");

  const resumeId = (await createMedia(resume.file)).id;
  await prisma.profile.update({ where: { id: "default" }, data: { resumeId } });
  if (existing.resumeId && existing.resumeId !== resumeId) await releaseMedia(existing.resumeId);

  await touch();
  revalidatePortfolio();
  redirect("/admin/profile?saved=cv");
}

export async function saveHero(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await guard();
  const parsed = readHero(formData);
  if (!parsed.ok) return parsed.state;

  const image = await readUpload(formData, "image", "image");
  if (image.error) return failure(image.error, { image: image.error });

  const existing = await prisma.hero.findUnique({ where: { id: "default" } });
  if (!existing) return failure("The hero has not been created yet.");

  let imageId = existing.imageId;
  if (image.file) imageId = (await createMedia(image.file)).id;

  await prisma.hero.update({
    where: { id: "default" },
    data: { ...parsed.data, imageId },
  });
  await prisma.profile.update({
    where: { id: "default" },
    data: { shortBio: parsed.data.subheading },
  });

  if (image.file && existing.imageId && existing.imageId !== imageId) await releaseMedia(existing.imageId);

  await touch();
  revalidatePortfolio();
  redirect("/admin/hero?saved=1");
}

export async function saveAbout(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await guard();
  const parsed = readAbout(formData);
  if (!parsed.ok) return parsed.state;

  await prisma.section.upsert({
    where: { key: "about" },
    create: {
      key: "about",
      eyebrow: parsed.data.eyebrow,
      title: parsed.data.title,
      intro: parsed.data.intro,
    },
    update: {
      eyebrow: parsed.data.eyebrow,
      title: parsed.data.title,
      intro: parsed.data.intro,
    },
  });
  await prisma.about.upsert({
    where: { id: "default" },
    create: { id: "default", highlights: parsed.data.highlights },
    update: { highlights: parsed.data.highlights },
  });

  await touch();
  revalidatePortfolio();
  redirect("/admin/about?saved=1");
}

export async function saveSection(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await guard();
  const key = String(formData.get("sectionKey") ?? "");
  if (!sectionKeys.has(key)) return failure("That section could not be found.");
  const parsed = readSection(formData);
  if (!parsed.ok) return parsed.state;

  await prisma.section.upsert({
    where: { key },
    create: { key, ...parsed.data },
    update: parsed.data,
  });
  await touch();
  revalidatePortfolio();
  const returnTo = String(formData.get("returnTo") || "/admin");
  const safeReturn =
    returnTo.startsWith("/admin/") && !returnTo.includes("://") && !returnTo.includes("..")
      ? returnTo
      : "/admin";
  redirect(`${safeReturn}?saved=1`);
}

export async function saveContact(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await guard();
  const parsed = readContact(formData);
  if (!parsed.ok) return parsed.state;

  const { eyebrow, title, intro, extra, ...contact } = parsed.data;
  await prisma.profile.update({ where: { id: "default" }, data: contact });
  await prisma.section.upsert({
    where: { key: "contact" },
    create: { key: "contact", eyebrow, title, intro, extra },
    update: { eyebrow, title, intro, extra },
  });
  await touch();
  revalidatePortfolio();
  redirect("/admin/contact?saved=1");
}

export async function saveSeo(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await guard();
  const parsed = readSeo(formData);
  if (!parsed.ok) return parsed.state;

  const image = await readUpload(formData, "image", "image");
  if (image.error) return failure(image.error, { image: image.error });

  const existing = await prisma.seo.findUnique({ where: { id: "default" } });
  if (!existing) return failure("SEO settings have not been created yet.");

  let ogImageId = existing.ogImageId;
  if (image.file) ogImageId = (await createMedia(image.file)).id;

  await prisma.seo.update({
    where: { id: "default" },
    data: { ...parsed.data, ogImageId },
  });
  if (image.file && existing.ogImageId && existing.ogImageId !== ogImageId) {
    await releaseMedia(existing.ogImageId);
  }

  await touch();
  revalidatePortfolio();
  redirect("/admin/seo?saved=1");
}

export async function saveSettings(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await guard();
  const parsed = readSettings(formData);
  if (!parsed.ok) return parsed.state;

  await prisma.siteSettings.update({
    where: { id: "default" },
    data: parsed.data,
  });
  await touch();
  revalidatePortfolio();
  redirect("/admin/settings?saved=1");
}
