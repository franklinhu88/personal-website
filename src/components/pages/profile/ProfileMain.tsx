import ProfileHeader from "@/components/pages/profile/HeaderSection/ProfileHeader";
import AboutSection from "@/components/pages/profile/AboutSection";
import ExperienceSection from "./ExperienceSection/ExperienceSection";
import ProjectsSection from "./ProjectSection/ProfileSection";

export default function ProfileMain() {
  return (
    <div className="space-y-6">
      <ProfileHeader />

      <AboutSection />

      <section className="card p-6">
        <h3 className="font-semibold mb-2 text-xl">Blog</h3>
        <p className="text-sm">Blog section coming soon.</p>
      </section>

      <ExperienceSection />

      <ProjectsSection />
    </div>
  );
}
