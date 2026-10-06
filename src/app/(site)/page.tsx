import { About } from "@/components/about";
import { Approach } from "@/components/approach";
import { Certifications } from "@/components/certifications";
import { Contact } from "@/components/contact";
import { Education } from "@/components/education";
import { Experience } from "@/components/experience";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { getPortfolio } from "@/lib/portfolio";

export default async function Home() {
  const data = await getPortfolio();

  if (!data.ready) {
    return (
      <main id="content" className="mx-auto flex min-h-svh w-full max-w-xl flex-col justify-center px-5">
        <h1 className="font-serif text-5xl tracking-[-0.04em]">Nothing has been published yet.</h1>
        <p className="mt-4 text-ink-soft">Add the portfolio from the admin dashboard after the database is seeded.</p>
      </main>
    );
  }

  const contactIndex = data.certifications.length > 0 ? "08" : "07";

  return (
    <main id="content">
      <Hero profile={data.profile} hero={data.hero} />
      <About about={data.about} paragraphs={data.profile.paragraphs} />
      <Experience section={data.experienceSection} items={data.experience} />
      <Projects section={data.workSection} projects={data.projects} />
      <Approach section={data.approachSection} items={data.approach} />
      <Skills section={data.skillsSection} groups={data.skillGroups} />
      <Education section={data.educationSection} items={data.education} />
      <Certifications section={data.certificationSection} items={data.certifications} />
      <Contact contact={data.contact} profile={data.profile} index={contactIndex} />
    </main>
  );
}
