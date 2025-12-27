import Header from "@/components/layout/Header";
import StatusPanel from "@/components/layout/StatusPanel";
import ProfileMain from "@/components/pages/profile/ProfileMain";

export default function Home() {
  return (
    <>
      <Header />

      <main className="pt-20 mx-auto max-w-7xl px-6 h-[calc(100vh-5rem)]">
        <div className="grid grid-cols-12 gap-6 h-full">
          {/* Left: Profile */}
          <section
            id="home"
            className="col-span-8 overflow-auto h-full scrollbar-hide"
          >
            <ProfileMain />
          </section>

          {/* Right: Status / Sidebar */}
          <aside
            id="activity"
            className="col-span-4 sticky top-20 h-[calc(100vh-5rem)] overflow-hidden"
          >
            <StatusPanel />
          </aside>
        </div>
      </main>
    </>
  );
}
