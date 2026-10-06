"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { failure, type ActionState } from "@/lib/action-state";
import { prisma } from "@/lib/db";
import { createMedia, readUpload, releaseMedia } from "@/lib/media";
import {
  readApproach,
  readCertification,
  readEducation,
  readExperience,
  readId,
  readProject,
  readSkill,
} from "@/lib/validators";
import { guard, reorderIds, revalidatePortfolio, touch } from "@/actions/shared";

function directionOf(formData: FormData) {
  const parsed = z.enum(["up", "down"]).safeParse(formData.get("direction"));
  return parsed.success ? parsed.data : null;
}

async function appendOrder(model: "experience" | "project" | "skill" | "education" | "certification" | "approachItem") {
  const current =
    model === "experience"
      ? await prisma.experience.aggregate({ _max: { sortOrder: true } })
      : model === "project"
        ? await prisma.project.aggregate({ _max: { sortOrder: true } })
        : model === "skill"
          ? await prisma.skill.aggregate({ _max: { sortOrder: true } })
          : model === "education"
            ? await prisma.education.aggregate({ _max: { sortOrder: true } })
            : model === "certification"
              ? await prisma.certification.aggregate({ _max: { sortOrder: true } })
              : await prisma.approachItem.aggregate({ _max: { sortOrder: true } });
  return (current._max.sortOrder ?? -1) + 1;
}

export async function saveExperience(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await guard();
  const idResult = readId(formData);
  if (idResult.error) return failure(idResult.error);
  const parsed = readExperience(formData);
  if (!parsed.ok) return parsed.state;

  if (idResult.id) {
    const existing = await prisma.experience.findUnique({ where: { id: idResult.id }, select: { id: true } });
    if (!existing) return failure("That role could not be found.");
    await prisma.experience.update({ where: { id: idResult.id }, data: parsed.data });
  } else {
    const created = await prisma.experience.create({
      data: { ...parsed.data, sortOrder: await appendOrder("experience") },
    });
    await touch();
    revalidatePortfolio();
    redirect(`/admin/experience/${created.id}?saved=1`);
  }

  await touch();
  revalidatePortfolio();
  redirect(`/admin/experience/${idResult.id}?saved=1`);
}

export async function moveExperience(formData: FormData) {
  await guard();
  const idResult = readId(formData);
  const direction = directionOf(formData);
  if (!idResult.id || !direction) return;
  const items = await prisma.experience.findMany({ orderBy: { sortOrder: "asc" }, select: { id: true } });
  const next = reorderIds(items, idResult.id, direction);
  if (!next) return;
  await prisma.$transaction(
    next.map((item, sortOrder) => prisma.experience.update({ where: { id: item.id }, data: { sortOrder } })),
  );
  await touch();
  revalidatePortfolio();
}

export async function deleteExperience(formData: FormData) {
  await guard();
  const idResult = readId(formData);
  if (!idResult.id) return;
  await prisma.experience.delete({ where: { id: idResult.id } }).catch(() => undefined);
  await touch();
  revalidatePortfolio();
  redirect("/admin/experience");
}

export async function saveProject(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await guard();
  const idResult = readId(formData);
  if (idResult.error) return failure(idResult.error);
  const parsed = readProject(formData);
  if (!parsed.ok) return parsed.state;

  const upload = await readUpload(formData, "image", "image");
  if (upload.error) return failure(upload.error, { image: upload.error });

  const existing = idResult.id
    ? await prisma.project.findUnique({ where: { id: idResult.id }, select: { id: true, imageId: true } })
    : null;
  if (idResult.id && !existing) return failure("That project could not be found.");

  let imageId = existing?.imageId ?? null;
  if (upload.file) {
    imageId = (await createMedia(upload.file)).id;
  }

  const saved = existing
    ? await prisma.project.update({ where: { id: existing.id }, data: { ...parsed.data, imageId } })
    : await prisma.project.create({
        data: { ...parsed.data, imageId, sortOrder: await appendOrder("project") },
      });

  if (upload.file && existing?.imageId && existing.imageId !== imageId) {
    await releaseMedia(existing.imageId);
  }

  await touch();
  revalidatePortfolio();
  redirect(`/admin/projects/${saved.id}?saved=1`);
}

export async function moveProject(formData: FormData) {
  await guard();
  const idResult = readId(formData);
  const direction = directionOf(formData);
  if (!idResult.id || !direction) return;
  const project = await prisma.project.findUnique({ where: { id: idResult.id }, select: { featured: true } });
  if (!project) return;
  const items = await prisma.project.findMany({
    where: { featured: project.featured },
    orderBy: { sortOrder: "asc" },
    select: { id: true },
  });
  const next = reorderIds(items, idResult.id, direction);
  if (!next) return;
  await prisma.$transaction(
    next.map((item, sortOrder) => prisma.project.update({ where: { id: item.id }, data: { sortOrder } })),
  );
  await touch();
  revalidatePortfolio();
}

export async function deleteProject(formData: FormData) {
  await guard();
  const idResult = readId(formData);
  if (!idResult.id) return;
  const project = await prisma.project.delete({ where: { id: idResult.id } }).catch(() => null);
  if (project) await releaseMedia(project.imageId);
  await touch();
  revalidatePortfolio();
  redirect("/admin/projects");
}

export async function saveSkill(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await guard();
  const idResult = readId(formData);
  if (idResult.error) return failure(idResult.error);
  const parsed = readSkill(formData);
  if (!parsed.ok) return parsed.state;

  if (idResult.id) {
    const existing = await prisma.skill.findUnique({ where: { id: idResult.id }, select: { id: true } });
    if (!existing) return failure("That skill could not be found.");
    await prisma.skill.update({ where: { id: idResult.id }, data: parsed.data });
    await touch();
    revalidatePortfolio();
    redirect(`/admin/skills/${idResult.id}?saved=1`);
  }

  const created = await prisma.skill.create({
    data: { ...parsed.data, sortOrder: await appendOrder("skill") },
  });
  await touch();
  revalidatePortfolio();
  redirect(`/admin/skills/${created.id}?saved=1`);
}

export async function moveSkill(formData: FormData) {
  await guard();
  const idResult = readId(formData);
  const direction = directionOf(formData);
  if (!idResult.id || !direction) return;
  const skill = await prisma.skill.findUnique({ where: { id: idResult.id }, select: { category: true } });
  if (!skill) return;
  const items = await prisma.skill.findMany({
    where: { category: skill.category },
    orderBy: { sortOrder: "asc" },
    select: { id: true },
  });
  const next = reorderIds(items, idResult.id, direction);
  if (!next) return;
  await prisma.$transaction(
    next.map((item, sortOrder) => prisma.skill.update({ where: { id: item.id }, data: { sortOrder } })),
  );
  await touch();
  revalidatePortfolio();
}

export async function deleteSkill(formData: FormData) {
  await guard();
  const idResult = readId(formData);
  if (!idResult.id) return;
  await prisma.skill.delete({ where: { id: idResult.id } }).catch(() => undefined);
  await touch();
  revalidatePortfolio();
  redirect("/admin/skills");
}

export async function saveEducation(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await guard();
  const idResult = readId(formData);
  if (idResult.error) return failure(idResult.error);
  const parsed = readEducation(formData);
  if (!parsed.ok) return parsed.state;

  const saved = idResult.id
    ? await prisma.education.update({ where: { id: idResult.id }, data: parsed.data }).catch(() => null)
    : await prisma.education.create({
        data: { ...parsed.data, sortOrder: await appendOrder("education") },
      });
  if (!saved) return failure("That education record could not be found.");

  await touch();
  revalidatePortfolio();
  redirect(`/admin/education/${saved.id}?saved=1`);
}

export async function moveEducation(formData: FormData) {
  await guard();
  const idResult = readId(formData);
  const direction = directionOf(formData);
  if (!idResult.id || !direction) return;
  const items = await prisma.education.findMany({ orderBy: { sortOrder: "asc" }, select: { id: true } });
  const next = reorderIds(items, idResult.id, direction);
  if (!next) return;
  await prisma.$transaction(
    next.map((item, sortOrder) => prisma.education.update({ where: { id: item.id }, data: { sortOrder } })),
  );
  await touch();
  revalidatePortfolio();
}

export async function deleteEducation(formData: FormData) {
  await guard();
  const idResult = readId(formData);
  if (!idResult.id) return;
  await prisma.education.delete({ where: { id: idResult.id } }).catch(() => undefined);
  await touch();
  revalidatePortfolio();
  redirect("/admin/education");
}

export async function saveCertification(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await guard();
  const idResult = readId(formData);
  if (idResult.error) return failure(idResult.error);
  const parsed = readCertification(formData);
  if (!parsed.ok) return parsed.state;

  const saved = idResult.id
    ? await prisma.certification.update({ where: { id: idResult.id }, data: parsed.data }).catch(() => null)
    : await prisma.certification.create({
        data: { ...parsed.data, sortOrder: await appendOrder("certification") },
      });
  if (!saved) return failure("That certification could not be found.");

  await touch();
  revalidatePortfolio();
  redirect(`/admin/certifications/${saved.id}?saved=1`);
}

export async function moveCertification(formData: FormData) {
  await guard();
  const idResult = readId(formData);
  const direction = directionOf(formData);
  if (!idResult.id || !direction) return;
  const items = await prisma.certification.findMany({ orderBy: { sortOrder: "asc" }, select: { id: true } });
  const next = reorderIds(items, idResult.id, direction);
  if (!next) return;
  await prisma.$transaction(
    next.map((item, sortOrder) =>
      prisma.certification.update({ where: { id: item.id }, data: { sortOrder } }),
    ),
  );
  await touch();
  revalidatePortfolio();
}

export async function deleteCertification(formData: FormData) {
  await guard();
  const idResult = readId(formData);
  if (!idResult.id) return;
  await prisma.certification.delete({ where: { id: idResult.id } }).catch(() => undefined);
  await touch();
  revalidatePortfolio();
  redirect("/admin/certifications");
}

export async function saveApproach(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await guard();
  const idResult = readId(formData);
  if (idResult.error) return failure(idResult.error);
  const parsed = readApproach(formData);
  if (!parsed.ok) return parsed.state;

  const saved = idResult.id
    ? await prisma.approachItem.update({ where: { id: idResult.id }, data: parsed.data }).catch(() => null)
    : await prisma.approachItem.create({
        data: { ...parsed.data, sortOrder: await appendOrder("approachItem") },
      });
  if (!saved) return failure("That note could not be found.");

  await touch();
  revalidatePortfolio();
  redirect(`/admin/approach/${saved.id}?saved=1`);
}

export async function moveApproach(formData: FormData) {
  await guard();
  const idResult = readId(formData);
  const direction = directionOf(formData);
  if (!idResult.id || !direction) return;
  const items = await prisma.approachItem.findMany({ orderBy: { sortOrder: "asc" }, select: { id: true } });
  const next = reorderIds(items, idResult.id, direction);
  if (!next) return;
  await prisma.$transaction(
    next.map((item, sortOrder) =>
      prisma.approachItem.update({ where: { id: item.id }, data: { sortOrder } }),
    ),
  );
  await touch();
  revalidatePortfolio();
}

export async function deleteApproach(formData: FormData) {
  await guard();
  const idResult = readId(formData);
  if (!idResult.id) return;
  await prisma.approachItem.delete({ where: { id: idResult.id } }).catch(() => undefined);
  await touch();
  revalidatePortfolio();
  redirect("/admin/approach");
}
