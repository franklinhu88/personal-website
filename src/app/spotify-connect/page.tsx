import Link from "next/link"

export default function SpotifyConnectPage() {
  return (
    <main className="pt-20 mx-auto max-w-2xl px-6 pb-12">
      <div className="card p-6 space-y-4">
        <h1 className="text-2xl font-semibold">Connect Spotify</h1>
        <p className="text-sm text-gray-600">
          This will open Spotify authorization and generate a refresh token for
          the live “currently playing” sidebar.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            href="/api/spotify/authorize"
            className="rounded-full bg-[var(--accent-blue)] px-5 py-2 text-sm font-semibold text-white hover:opacity-90"
          >
            Connect with Spotify
          </Link>
        </div>

        <p className="text-xs text-gray-500">
          After authorization, you&apos;ll be shown the refresh token to paste
          into your environment as `SPOTIFY_REFRESH_TOKEN`.
        </p>
      </div>
    </main>
  )
}

