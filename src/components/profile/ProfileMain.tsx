import ProfileHeader from "@/components/profile/ProfileHeader";
import AboutSection from "@/components/profile/AboutSection";

export default function ProfileMain() {
  return (
    <div className="space-y-6">
      <ProfileHeader />

      <AboutSection />

      <section className="card p-6">
        <h3 className="font-semibold mb-2">Activity</h3>
        <p className="text-sm">Activity section coming soon.</p>
      </section>

      <section className="card p-6">
        <h3 className="font-semibold mb-2">Experience</h3>
        <p className="text-sm">Experience section coming soon.</p>
      </section>

      <section className="card p-6">
        <h3 className="font-semibold mb-2">Projects</h3>
        <p className="text-sm">Projects section coming soon.</p>
      </section>
    </div>
  );
}
