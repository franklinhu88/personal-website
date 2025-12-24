import Sidebar from "@/components/layout/Sidebar"
import MainFeed from "@/components/layout/MainFeed"
import StatusPanel from "@/components/layout/StatusPanel"

export default function Home() {
  return (
    <main className="mx-auto max-w-7xl grid grid-cols-12 gap-6 p-6">
      <aside className="col-span-3">
        <Sidebar />
      </aside>

      <section className="col-span-6">
        <MainFeed />
      </section>

      <aside className="col-span-3">
        <StatusPanel />
      </aside>
    </main>
  )
}
