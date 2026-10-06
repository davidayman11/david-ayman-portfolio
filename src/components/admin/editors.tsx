import {
  saveApproach,
  saveCertification,
  saveEducation,
  saveExperience,
  saveProject,
  saveSkill,
} from "@/actions/records";
import { mediaPath } from "@/lib/media";
import { ResourceForm } from "@/components/admin/resource-form";

const lineHint = "One item per line.";

export function ExperienceEditor({
  experience,
}: {
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
  } | null;
}) {
  return (
    <ResourceForm
      action={saveExperience}
      hidden={experience ? { id: experience.id } : undefined}
      values={{
        company: experience?.company ?? "",
        position: experience?.position ?? "",
        location: experience?.location ?? "",
        dates: experience?.dates ?? "",
        current: experience?.current ?? false,
        description: experience?.description ?? "",
        technologies: experience?.technologies.join("\n") ?? "",
        achievements: experience?.achievements.join("\n") ?? "",
      }}
      fields={[
        { name: "position", label: "Position", required: true },
        { name: "company", label: "Company", required: true },
        { name: "dates", label: "Dates", required: true, hint: "Example: Mar 2026 — Present" },
        { name: "location", label: "Location" },
        { name: "current", label: "Current role", type: "checkbox" },
        { name: "description", label: "Description", type: "textarea", required: true },
        { name: "achievements", label: "Achievements", type: "textarea", rows: 6, hint: lineHint },
        { name: "technologies", label: "Technologies", type: "textarea", rows: 4, hint: lineHint },
      ]}
    />
  );
}

export function ProjectEditor({
  project,
}: {
  project: {
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
    imageId: string | null;
    projectUrl: string;
    githubUrl: string;
    androidUrl: string;
    appleUrl: string;
    featured: boolean;
  } | null;
}) {
  return (
    <ResourceForm
      action={saveProject}
      hidden={project ? { id: project.id } : undefined}
      previewFrame="icon"
      preview={
        project?.imageId
          ? { src: mediaPath(project.imageId) ?? "", alt: `${project.name} icon` }
          : { src: "", alt: "App icon" }
      }
      values={{
        name: project?.name ?? "",
        period: project?.period ?? "",
        kind: project?.kind ?? "",
        role: project?.role ?? "",
        summary: project?.summary ?? "",
        problem: project?.problem ?? "",
        contribution: project?.contribution ?? "",
        functionality: project?.functionality.join("\n") ?? "",
        technologies: project?.technologies.join("\n") ?? "",
        projectUrl: project?.projectUrl ?? "",
        githubUrl: project?.githubUrl ?? "",
        androidUrl: project?.androidUrl ?? "",
        appleUrl: project?.appleUrl ?? "",
        featured: project?.featured ?? false,
      }}
      fields={[
        {
          name: "image",
          label: "App icon",
          type: "file",
          accept: "image/jpeg,image/png,image/webp",
          hint: "JPEG, PNG, or WebP. 4 MB maximum. Leave empty to keep the current icon.",
        },
        { name: "name", label: "Project name", required: true },
        { name: "period", label: "Dates", required: true },
        { name: "kind", label: "Kind", required: true },
        { name: "role", label: "My role", required: true },
        { name: "summary", label: "Description", type: "textarea", required: true },
        { name: "problem", label: "Problem", type: "textarea" },
        { name: "contribution", label: "Contribution", type: "textarea" },
        { name: "functionality", label: "What it does", type: "textarea", rows: 6, hint: lineHint },
        { name: "technologies", label: "Technologies", type: "textarea", rows: 4, hint: lineHint },
        { name: "projectUrl", label: "Project link", type: "url" },
        { name: "githubUrl", label: "GitHub link", type: "url" },
        {
          name: "appleUrl",
          label: "App Store link",
          type: "url",
          hint: "Shown as an Apple icon when this is filled in.",
        },
        {
          name: "androidUrl",
          label: "Google Play link",
          type: "url",
          hint: "Shown as a Play icon when this is filled in.",
        },
        { name: "featured", label: "Featured project", type: "checkbox" },
      ]}
    />
  );
}

export function SkillEditor({
  skill,
}: {
  skill: { id: string; name: string; category: string; icon: string } | null;
}) {
  return (
    <ResourceForm
      action={saveSkill}
      hidden={skill ? { id: skill.id } : undefined}
      values={{ name: skill?.name ?? "", category: skill?.category ?? "", icon: skill?.icon ?? "" }}
      fields={[
        { name: "name", label: "Skill", required: true },
        { name: "category", label: "Category", required: true, hint: "Skills in the same category stay grouped." },
        { name: "icon", label: "Icon", hint: "Optional. A short name or emoji." },
      ]}
    />
  );
}

export function EducationEditor({
  item,
}: {
  item: {
    id: string;
    institution: string;
    degree: string;
    dates: string;
    location: string;
    description: string;
  } | null;
}) {
  return (
    <ResourceForm
      action={saveEducation}
      hidden={item ? { id: item.id } : undefined}
      values={{
        degree: item?.degree ?? "",
        institution: item?.institution ?? "",
        dates: item?.dates ?? "",
        location: item?.location ?? "",
        description: item?.description ?? "",
      }}
      fields={[
        { name: "degree", label: "Degree", required: true },
        { name: "institution", label: "Institution", required: true },
        { name: "dates", label: "Dates", required: true },
        { name: "location", label: "Location" },
        { name: "description", label: "Description", type: "textarea", required: true },
      ]}
    />
  );
}

export function CertificationEditor({
  item,
}: {
  item: { id: string; name: string; issuer: string; date: string; link: string } | null;
}) {
  return (
    <ResourceForm
      action={saveCertification}
      hidden={item ? { id: item.id } : undefined}
      values={{
        name: item?.name ?? "",
        issuer: item?.issuer ?? "",
        date: item?.date ?? "",
        link: item?.link ?? "",
      }}
      fields={[
        { name: "name", label: "Name", required: true },
        { name: "issuer", label: "Issuer", required: true },
        { name: "date", label: "Date", required: true },
        { name: "link", label: "Link", type: "url" },
      ]}
    />
  );
}

export function ApproachEditor({ item }: { item: { id: string; title: string; body: string } | null }) {
  return (
    <ResourceForm
      action={saveApproach}
      hidden={item ? { id: item.id } : undefined}
      values={{ title: item?.title ?? "", body: item?.body ?? "" }}
      fields={[
        { name: "title", label: "Title", required: true },
        { name: "body", label: "Description", type: "textarea", required: true },
      ]}
    />
  );
}
