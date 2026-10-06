"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { failure, initialState, type ActionState } from "@/lib/action-state";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { clearSession, setSession } from "@/lib/session";
import { authConfigured } from "@/lib/session-token";
import { readLogin, readPassword } from "@/lib/validators";

const dummyHash = bcrypt.hash("unused-portfolio-placeholder", 12);

export async function login(_prev: ActionState, formData: FormData): Promise<ActionState> {
  if (!authConfigured()) {
    return failure("The admin sign-in is not configured yet.");
  }

  const parsed = readLogin(formData);
  if (!parsed.ok) return parsed.state;

  const email = parsed.data.email.toLowerCase();
  const admin = await prisma.admin.findUnique({ where: { email } });

  if (admin?.lockedUntil && admin.lockedUntil > new Date()) {
    return failure("Too many attempts. Try again in a few minutes.");
  }

  const matches = await bcrypt.compare(parsed.data.password, admin?.passwordHash ?? (await dummyHash));
  if (!admin || !matches) {
    if (admin) {
      const failedAttempts = admin.failedAttempts + 1;
      await prisma.admin.update({
        where: { id: admin.id },
        data: {
          failedAttempts,
          lockedUntil: failedAttempts >= 5 ? new Date(Date.now() + 15 * 60 * 1000) : null,
        },
      });
    }
    return failure("Invalid email or password.");
  }

  await prisma.admin.update({
    where: { id: admin.id },
    data: { failedAttempts: 0, lockedUntil: null },
  });
  await setSession(admin.id);
  redirect("/admin");
}

export async function logout() {
  await clearSession();
  redirect("/admin/login");
}

export async function changePassword(_prev: ActionState = initialState, formData: FormData): Promise<ActionState> {
  const admin = await requireAdmin();
  const parsed = readPassword(formData);
  if (!parsed.ok) return parsed.state;

  const record = await prisma.admin.findUnique({ where: { id: admin.id } });
  if (!record) return failure("The admin account could not be found.");

  const matches = await bcrypt.compare(parsed.data.currentPassword, record.passwordHash);
  if (!matches) return failure("The current password is incorrect.", { currentPassword: "The current password is incorrect." });

  await prisma.admin.update({
    where: { id: admin.id },
    data: { passwordHash: await bcrypt.hash(parsed.data.newPassword, 12) },
  });

  redirect("/admin/settings?saved=1");
}
