import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  if (!z.string().cuid().safeParse(id).success) {
    return new NextResponse("Not found", { status: 404 });
  }

  const media = await prisma.media.findUnique({ where: { id } });
  if (!media) return new NextResponse("Not found", { status: 404 });

  const filename = media.filename.replace(/[^\w.\- ]+/g, "") || "file";
  const bytes = Buffer.from(media.bytes);

  return new NextResponse(bytes, {
    headers: {
      "Content-Type": media.mimeType,
      "Content-Length": String(bytes.byteLength),
      "Content-Disposition": `inline; filename="${filename}"`,
      "Cache-Control": "public, max-age=86400, immutable",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
