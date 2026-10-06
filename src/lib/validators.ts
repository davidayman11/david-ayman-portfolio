import { z } from "zod";
import { failure, type ActionState } from "@/lib/action-state";

const text = (max: number) => z.string().trim().min(1, "This field is required.").max(max);
const optionalText = (max: number) => z.string().trim().max(max);

export function isHttpUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function isSafeHref(value: string) {
  if (/^#[A-Za-z][\w-]*$/.test(value)) return true;
  if (value.startsWith("/") && !value.startsWith("//") && !value.includes("\\")) return true;
  return isHttpUrl(value);
}

const href = z
  .string()
  .trim()
  .min(1, "This field is required.")
  .max(500)
  .refine(isSafeHref, "Use a site anchor, a relative path, or an http(s) URL.");

const optionalUrl = z
  .string()
  .trim()
  .max(500)
  .refine((value) => value === "" || isHttpUrl(value), "Enter a valid http or https URL.");

const lines = z.array(z.string().trim().min(1).max(300)).max(40);

export function readLines(value: FormDataEntryValue | null) {
  return String(value ?? "")
    .split("\n")
    .map((line) => line.replace(/\u0000/g, "").trim())
    .filter(Boolean);
}

export function readHighlights(value: string) {
  return value
    .split("\n")
    .map((line) => {
      const [label, ...rest] = line.split("|");
      return { label: label?.trim() ?? "", value: rest.join("|").trim() };
    })
    .filter((item) => item.label && item.value)
    .slice(0, 12);
}

export function readNav(value: string) {
  return value
    .split("\n")
    .map((line) => {
      const [hrefValue, ...rest] = line.split("|");
      return { href: hrefValue?.trim() ?? "", label: rest.join("|").trim() };
    })
    .filter((item) => item.href && item.label)
    .slice(0, 12);
}

function invalid(error: z.ZodError): ActionState {
  const fieldErrors: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "");
    if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
  }
  return failure("Check the highlighted fields.", fieldErrors);
}

export function readId(formData: FormData) {
  const value = String(formData.get("id") ?? "").trim();
  if (!value) return { id: null, error: null as string | null };
  const parsed = z.string().cuid().safeParse(value);
  if (!parsed.success) return { id: null, error: "That record could not be found." };
  return { id: parsed.data, error: null as string | null };
}

function parse<T>(schema: z.ZodType<T>, input: unknown) {
  const parsed = schema.safeParse(input);
  if (!parsed.success) return { ok: false as const, state: invalid(parsed.error) };
  return { ok: true as const, data: parsed.data };
}

const highlightSchema = z.object({
  label: z.string().trim().min(1).max(40),
  value: z.string().trim().min(1).max(80),
});

const navSchema = z.object({
  href: href,
  label: z.string().trim().min(1).max(40),
});

export function readProfile(formData: FormData) {
  return parse(
    z.object({
      name: text(120),
      shortName: text(80),
      jobTitle: text(80),
      focus: text(80),
      shortBio: text(500),
      longBio: text(8000),
      location: text(120),
    }),
    {
      name: formData.get("name"),
      shortName: formData.get("shortName"),
      jobTitle: formData.get("jobTitle"),
      focus: formData.get("focus"),
      shortBio: formData.get("shortBio"),
      longBio: formData.get("longBio"),
      location: formData.get("location"),
    },
  );
}

export function readHero(formData: FormData) {
  return parse(
    z.object({
      headingLine1: text(80),
      headingLine2: optionalText(80),
      subheading: text(500),
      primaryCtaLabel: text(40),
      primaryCtaHref: href,
      secondaryCtaLabel: text(40),
      secondaryCtaHref: href,
      fact1Label: optionalText(40),
      fact1Value: optionalText(80),
      fact1Detail: optionalText(120),
      fact2Label: optionalText(40),
      fact2Value: optionalText(80),
      fact2Detail: optionalText(120),
      fact3Label: optionalText(40),
      fact3Value: optionalText(80),
      fact3Detail: optionalText(120),
    }),
    Object.fromEntries(
      [
        "headingLine1",
        "headingLine2",
        "subheading",
        "primaryCtaLabel",
        "primaryCtaHref",
        "secondaryCtaLabel",
        "secondaryCtaHref",
        "fact1Label",
        "fact1Value",
        "fact1Detail",
        "fact2Label",
        "fact2Value",
        "fact2Detail",
        "fact3Label",
        "fact3Value",
        "fact3Detail",
      ].map((key) => [key, formData.get(key)]),
    ),
  );
}

export function readAbout(formData: FormData) {
  const section = readSection(formData);
  if (!section.ok) return section;
  const highlights = readHighlights(String(formData.get("highlights") ?? ""));
  const parsed = z.array(highlightSchema).max(12).safeParse(highlights);
  if (!parsed.success) {
    return {
      ok: false as const,
      state: failure("Each highlight needs a label and a value, separated by |."),
    };
  }
  return { ok: true as const, data: { ...section.data, highlights: parsed.data } };
}

export function readSection(formData: FormData) {
  return parse(
    z.object({
      eyebrow: text(40),
      title: text(160),
      intro: optionalText(600),
      extra: optionalText(2000),
    }),
    {
      eyebrow: formData.get("eyebrow"),
      title: formData.get("title"),
      intro: formData.get("intro") ?? "",
      extra: formData.get("extra") ?? "",
    },
  );
}

export function readExperience(formData: FormData) {
  return parse(
    z.object({
      company: text(120),
      position: text(120),
      location: optionalText(120),
      dates: text(80),
      current: z.boolean(),
      description: text(2000),
      technologies: lines,
      achievements: lines,
    }),
    {
      company: formData.get("company"),
      position: formData.get("position"),
      location: formData.get("location") ?? "",
      dates: formData.get("dates"),
      current: formData.get("current") === "on",
      description: formData.get("description"),
      technologies: readLines(formData.get("technologies")),
      achievements: readLines(formData.get("achievements")),
    },
  );
}

export function readProject(formData: FormData) {
  return parse(
    z.object({
      name: text(120),
      period: text(80),
      kind: text(80),
      role: text(80),
      summary: text(2000),
      problem: optionalText(2000),
      contribution: optionalText(2000),
      functionality: lines,
      technologies: lines,
      projectUrl: optionalUrl,
      githubUrl: optionalUrl,
      androidUrl: optionalUrl,
      appleUrl: optionalUrl,
      featured: z.boolean(),
    }),
    {
      name: formData.get("name"),
      period: formData.get("period"),
      kind: formData.get("kind"),
      role: formData.get("role"),
      summary: formData.get("summary"),
      problem: formData.get("problem") ?? "",
      contribution: formData.get("contribution") ?? "",
      functionality: readLines(formData.get("functionality")),
      technologies: readLines(formData.get("technologies")),
      projectUrl: formData.get("projectUrl") ?? "",
      githubUrl: formData.get("githubUrl") ?? "",
      androidUrl: formData.get("androidUrl") ?? "",
      appleUrl: formData.get("appleUrl") ?? "",
      featured: formData.get("featured") === "on",
    },
  );
}

export function readSkill(formData: FormData) {
  return parse(
    z.object({
      name: text(80),
      category: text(40),
      icon: optionalText(40),
    }),
    {
      name: formData.get("name"),
      category: formData.get("category"),
      icon: formData.get("icon") ?? "",
    },
  );
}

export function readEducation(formData: FormData) {
  return parse(
    z.object({
      institution: text(160),
      degree: text(160),
      dates: text(80),
      location: optionalText(120),
      description: text(2000),
    }),
    {
      institution: formData.get("institution"),
      degree: formData.get("degree"),
      dates: formData.get("dates"),
      location: formData.get("location") ?? "",
      description: formData.get("description"),
    },
  );
}

export function readCertification(formData: FormData) {
  return parse(
    z.object({
      name: text(160),
      issuer: text(160),
      date: text(80),
      link: optionalUrl,
    }),
    {
      name: formData.get("name"),
      issuer: formData.get("issuer"),
      date: formData.get("date"),
      link: formData.get("link") ?? "",
    },
  );
}

export function readApproach(formData: FormData) {
  return parse(
    z.object({
      title: text(160),
      body: text(2000),
    }),
    {
      title: formData.get("title"),
      body: formData.get("body"),
    },
  );
}

export function readContact(formData: FormData) {
  const section = readSection(formData);
  if (!section.ok) return section;
  const parsed = parse(
    z.object({
      email: z.string().trim().email("Enter a valid email address.").max(200),
      phoneDisplay: text(40),
      phoneHref: z
        .string()
        .trim()
        .regex(/^tel:\+[0-9]{8,15}$/, "Use tel:+ and the country code, for example tel:+201200779554."),
      linkedinUrl: optionalUrl,
      linkedinLabel: optionalText(80),
      githubUrl: optionalUrl,
      githubLabel: optionalText(80),
      websiteUrl: optionalUrl,
      websiteLabel: optionalText(80),
    }),
    {
      email: formData.get("email"),
      phoneDisplay: formData.get("phoneDisplay"),
      phoneHref: formData.get("phoneHref"),
      linkedinUrl: formData.get("linkedinUrl"),
      linkedinLabel: formData.get("linkedinLabel"),
      githubUrl: formData.get("githubUrl"),
      githubLabel: formData.get("githubLabel"),
      websiteUrl: formData.get("websiteUrl"),
      websiteLabel: formData.get("websiteLabel"),
    },
  );
  if (!parsed.ok) return parsed;
  return { ok: true as const, data: { ...section.data, ...parsed.data } };
}

export function readSeo(formData: FormData) {
  return parse(
    z.object({
      metaTitle: text(120),
      metaDescription: text(300),
    }),
    {
      metaTitle: formData.get("metaTitle"),
      metaDescription: formData.get("metaDescription"),
    },
  );
}

export function readSettings(formData: FormData) {
  const navItems = readNav(String(formData.get("navItems") ?? ""));
  const navParsed = z.array(navSchema).min(1, "Add at least one navigation link.").max(12).safeParse(navItems);
  if (!navParsed.success) {
    return {
      ok: false as const,
      state: failure("Each navigation line needs an anchor and a label, separated by |.", {
        navItems: "Use one link per line, for example #about | About.",
      }),
    };
  }

  const parsed = parse(
    z.object({
      footerText: text(160),
      paperColor: z.string().trim().regex(/^#[0-9a-fA-F]{6}$/, "Use a hex color like #efece4."),
      inkColor: z.string().trim().regex(/^#[0-9a-fA-F]{6}$/, "Use a hex color like #171a17."),
      signalColor: z.string().trim().regex(/^#[0-9a-fA-F]{6}$/, "Use a hex color like #1f6b45."),
    }),
    {
      footerText: formData.get("footerText"),
      paperColor: formData.get("paperColor"),
      inkColor: formData.get("inkColor"),
      signalColor: formData.get("signalColor"),
    },
  );
  if (!parsed.ok) return parsed;
  return { ok: true as const, data: { ...parsed.data, navItems: navParsed.data } };
}

export function readPassword(formData: FormData) {
  return parse(
    z
      .object({
        currentPassword: z.string().min(1, "Enter your current password.").max(200),
        newPassword: z.string().min(12, "Use at least 12 characters.").max(200),
        confirmPassword: z.string().min(1, "Confirm the new password.").max(200),
      })
      .refine((value) => value.newPassword === value.confirmPassword, {
        message: "The new passwords do not match.",
        path: ["confirmPassword"],
      }),
    {
      currentPassword: formData.get("currentPassword"),
      newPassword: formData.get("newPassword"),
      confirmPassword: formData.get("confirmPassword"),
    },
  );
}

export function readLogin(formData: FormData) {
  return parse(
    z.object({
      email: z.string().trim().email("Enter a valid email address.").max(200),
      password: z.string().min(1, "Enter your password.").max(200),
    }),
    {
      email: formData.get("email"),
      password: formData.get("password"),
    },
  );
}
