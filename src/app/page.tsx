import Header from "@/components/layout/Header";
import ProfileMain from "@/components/profile/ProfileMain";
import ProfileSidebar from "@/components/profile/ProfileSidebar";

export default function Home() {
  return (
    <>
      <Header />

      <main className="pt-20 mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Left: Profile */}
          <section id="home" className="col-span-8">
            <ProfileMain />
          </section>

          {/* Right: Status */}
          <aside id="activity" className="col-span-4">
            <ProfileSidebar />
          </aside>
        </div>
      </main>
    </>
  );
}
