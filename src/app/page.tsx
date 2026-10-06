import { About } from "@/components/about";
import { Approach } from "@/components/approach";
import { Contact } from "@/components/contact";
import { Education } from "@/components/education";
import { Experience } from "@/components/experience";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";

export default function Home() {
  return (
    <main id="content">
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Approach />
      <Skills />
      <Education />
      <Contact />
    </main>
  );
}
