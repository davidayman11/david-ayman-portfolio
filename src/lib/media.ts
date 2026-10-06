import { prisma } from "@/lib/db";

const MAX_BYTES = 4 * 1024 * 1024;

const IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

export type StoredFile = {
  bytes: Buffer;
  filename: string;
  mimeType: string;
  size: number;
};

function matchesSignature(bytes: Uint8Array, mimeType: string) {
  if (bytes.length < 12) return false;
  if (mimeType === "image/jpeg") {
    return bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  }
  if (mimeType === "image/png") {
    return bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47;
  }
  if (mimeType === "image/webp") {
    return (
      bytes[0] === 0x52 &&
      bytes[1] === 0x49 &&
      bytes[2] === 0x46 &&
      bytes[3] === 0x46 &&
      bytes[8] === 0x57 &&
      bytes[9] === 0x45 &&
      bytes[10] === 0x42 &&
      bytes[11] === 0x50
    );
  }
  if (mimeType === "application/pdf") {
    return bytes[0] === 0x25 && bytes[1] === 0x50 && bytes[2] === 0x44 && bytes[3] === 0x46;
  }
  return false;
}

export async function readUpload(formData: FormData, field: string, kind: "image" | "pdf") {
  const value = formData.get(field);
  if (!(value instanceof File) || value.size === 0) {
    return { file: null, error: null as string | null };
  }
  if (value.size > MAX_BYTES) {
    return { file: null, error: "File must be 4 MB or smaller." };
  }

  const allowed = kind === "pdf" ? new Set(["application/pdf"]) : IMAGE_TYPES;
  if (!allowed.has(value.type)) {
    return {
      file: null,
      error: kind === "pdf" ? "Upload a PDF." : "Upload a JPEG, PNG, or WebP image.",
    };
  }

  const bytes = Buffer.from(await value.arrayBuffer());
  if (!matchesSignature(bytes, value.type)) {
    return { file: null, error: "The file contents do not match its type." };
  }

  const filename = value.name.replace(/[^\w.\- ]+/g, "").slice(0, 120) || "upload";
  return {
    file: { bytes, filename, mimeType: value.type, size: bytes.byteLength } satisfies StoredFile,
    error: null as string | null,
  };
}

export async function createMedia(file: StoredFile) {
  return prisma.media.create({
    data: {
      filename: file.filename,
      mimeType: file.mimeType,
      bytes: new Uint8Array(file.bytes) as Uint8Array<ArrayBuffer>,
      size: file.size,
    },
    select: { id: true },
  });
}

export function mediaPath(id: string | null | undefined) {
  return id ? `/media/${id}` : null;
}

export async function releaseMedia(id: string | null | undefined) {
  if (!id) return;

  const [profile, hero, projects, seo] = await Promise.all([
    prisma.profile.count({ where: { OR: [{ imageId: id }, { resumeId: id }] } }),
    prisma.hero.count({ where: { imageId: id } }),
    prisma.project.count({ where: { imageId: id } }),
    prisma.seo.count({ where: { ogImageId: id } }),
  ]);

  if (profile + hero + projects + seo === 0) {
    await prisma.media.delete({ where: { id } }).catch(() => undefined);
  }
}
