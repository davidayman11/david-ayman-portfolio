import { changePassword } from "@/actions/auth";
import { saveSettings } from "@/actions/singletons";
import { ResourceForm } from "@/components/admin/resource-form";
import { PageHeader, SavedNote } from "@/components/admin/shell";
import { prisma } from "@/lib/db";

function navText(value: unknown) {
  if (!Array.isArray(value)) return "";
  return value
    .flatMap((item) => {
      if (!item || typeof item !== "object") return [];
      const record = item as { href?: unknown; label?: unknown };
      if (typeof record.href !== "string" || typeof record.label !== "string") return [];
      return [`${record.href} | ${record.label}`];
    })
    .join("\n");
}

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const [{ saved }, settings] = await Promise.all([
    searchParams,
    prisma.siteSettings.findUnique({ where: { id: "default" } }),
  ]);
  if (!settings) return <p className="text-sm text-mute">Seed the database before editing settings.</p>;

  return (
    <>
      <PageHeader title="Settings" description="Footer, navigation, theme colors, and the admin password." />
      <SavedNote saved={saved} />
      <ResourceForm
        action={saveSettings}
        values={{
          footerText: settings.footerText,
          navItems: navText(settings.navItems),
          paperColor: settings.paperColor,
          inkColor: settings.inkColor,
          signalColor: settings.signalColor,
        }}
        fields={[
          { name: "footerText", label: "Footer text", required: true },
          {
            name: "navItems",
            label: "Navigation",
            type: "textarea",
            rows: 6,
            required: true,
            hint: "One per line: #about | About",
          },
          { name: "paperColor", label: "Paper color", required: true, hint: "Hex, for example #efece4" },
          { name: "inkColor", label: "Ink color", required: true },
          { name: "signalColor", label: "Signal color", required: true },
        ]}
      />
      <h2 className="mt-16 font-serif text-3xl tracking-[-0.03em]">Password</h2>
      <div className="mt-6">
        <ResourceForm
          action={changePassword}
          submitLabel="Update password"
          values={{}}
          fields={[
            { name: "currentPassword", label: "Current password", type: "password", required: true },
            {
              name: "newPassword",
              label: "New password",
              type: "password",
              required: true,
              hint: "At least 12 characters.",
            },
            { name: "confirmPassword", label: "Confirm new password", type: "password", required: true },
          ]}
        />
      </div>
    </>
  );
}
