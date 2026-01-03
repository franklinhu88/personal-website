import ProfileHeader from "@/components/pages/profile/HeaderSection/ProfileHeader";
import AboutSection from "@/components/pages/profile/AboutSection";
import ExperienceSection from "./ExperienceSection/ExperienceSection";
import ProjectsSection from "./ProjectSection/ProfileSection";

export default function ProfileMain() {
  return (
    <div className="space-y-6">
      {/* ABOUT / HOME */}
      <section id="about" className="scroll-mt-20">
        <ProfileHeader />
      </section>

      <AboutSection />

      {/* BLOG */}
      <section id="blog" className="card p-6 scroll-mt-20">
        <h3 className="font-semibold mb-2 text-xl">Blog</h3>
        <p className="text-sm">Blog section coming soon.</p>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="scroll-mt-20">
        <ExperienceSection />
      </section>

      {/* PROJECTS */}
      <section id="projects" className="scroll-mt-20">
        <ProjectsSection />
      </section>
    </div>
  );
}
