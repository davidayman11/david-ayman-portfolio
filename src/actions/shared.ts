import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export async function guard() {
  return requireAdmin();
}

export async function touch() {
  await prisma.siteSettings.update({
    where: { id: "default" },
    data: { lastContentUpdate: new Date() },
  });
}

export function revalidatePortfolio() {
  revalidatePath("/", "layout");
  revalidatePath("/admin", "layout");
  revalidatePath("/opengraph-image");
}

export function reorderIds(items: { id: string }[], id: string, direction: "up" | "down") {
  const index = items.findIndex((item) => item.id === id);
  const target = index + (direction === "up" ? -1 : 1);
  if (index < 0 || target < 0 || target >= items.length) return null;

  const next = items.slice();
  const [row] = next.splice(index, 1);
  next.splice(target, 0, row);
  return next;
}
