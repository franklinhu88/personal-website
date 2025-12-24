import { mockStatus } from "@/lib/mock/status"

export default function StatusPanel() {
  const status = mockStatus

  return (
    <div className="border rounded-xl p-4 space-y-2">
      <h2 className="font-semibold">Currently</h2>
      <p className="text-sm text-gray-600">{status.summary}</p>

      {status.spotify && (
        <div className="text-sm">
          🎵 {status.spotify.track} — {status.spotify.artist}
        </div>
      )}

      {status.discord && (
        <div className="text-sm">
          💬 {status.discord.activity}
        </div>
      )}
    </div>
  )
}
