"use client"

import { useEffect, useMemo, useState } from "react"
import { mockStatus } from "@/lib/mock/status"
import type { SpotifyStatus } from "@/lib/types/status"

type SpotifyCurrentlyPlaying = {
  playing: boolean
  updatedAt: string
  spotify?: SpotifyStatus
  error?: string
}

export default function StatusPanel() {
  const baseStatus = mockStatus

  // Spotify data updates on an interval so the sidebar feels "alive".
  const [spotifyNow, setSpotifyNow] = useState<SpotifyStatus | null>(null)
  const [spotifyLoading, setSpotifyLoading] = useState(true)
  const [spotifyError, setSpotifyError] = useState<string | null>(null)
  const [spotifyUpdatedAt, setSpotifyUpdatedAt] = useState<string>(
    baseStatus.updatedAt
  )

  const updatedText = useMemo(() => {
    const d = new Date(spotifyUpdatedAt)
    if (Number.isNaN(d.getTime())) return ""
    return d.toLocaleDateString(undefined, { month: "short", day: "numeric" })
  }, [spotifyUpdatedAt])

  useEffect(() => {
    let cancelled = false

    const fetchNow = async () => {
      try {
        setSpotifyLoading(true)
        setSpotifyError(null)

        const res = await fetch("/api/spotify/currently-playing", {
          cache: "no-store",
        })

        const data = (await res.json()) as SpotifyCurrentlyPlaying

        if (cancelled) return

        if (!res.ok) {
          setSpotifyNow(null)
          setSpotifyError(data.error || "Spotify unavailable")
          setSpotifyUpdatedAt(data.updatedAt || new Date().toISOString())
          return
        }

        setSpotifyUpdatedAt(data.updatedAt || new Date().toISOString())

        if (data.playing && data.spotify) {
          setSpotifyNow(data.spotify)
          setSpotifyError(null)
        } else {
          setSpotifyNow(null)
        }
      } catch (e) {
        if (cancelled) return
        setSpotifyError(e instanceof Error ? e.message : "Spotify unavailable")
        setSpotifyNow(null)
        setSpotifyUpdatedAt(new Date().toISOString())
      } finally {
        if (!cancelled) setSpotifyLoading(false)
      }
    }

    fetchNow()
    const id = window.setInterval(fetchNow, 15000)

    return () => {
      cancelled = true
      window.clearInterval(id)
    }
  }, [])

  const needsSpotifyConnect = Boolean(
    spotifyError &&
      /not configured|missing env|SPOTIFY_REFRESH_TOKEN/i.test(
        spotifyError
      )
  )

  const spotifyLine = (() => {
    if (spotifyLoading) return "🎵 Checking Spotify..."
    if (spotifyError && needsSpotifyConnect)
      return "🎵 Connect Spotify to show your current listening"
    if (spotifyError) return `🎵 Spotify unavailable`
    if (spotifyNow?.track && spotifyNow?.artist) {
      return `🎵 ${spotifyNow.track} - ${spotifyNow.artist}`
    }
    if (spotifyNow?.artist) {
      return `🎵 ${spotifyNow.artist}`
    }
    return "🎵 Not listening on Spotify right now"
  })()

  return (
    <div className="card p-4 space-y-3">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-semibold">Currently</h2>
        {updatedText ? (
          <p className="text-xs text-gray-500">Updated {updatedText}</p>
        ) : null}
      </div>

      <p className="text-sm text-gray-700">{baseStatus.summary}</p>

      <div className="space-y-2">
        <p className="text-sm text-gray-700">{spotifyLine}</p>

        {needsSpotifyConnect ? (
          <a
            href="/spotify-connect"
            className="block w-full rounded-full bg-gray-100 px-4 py-2 text-center text-sm font-semibold text-gray-700 hover:bg-gray-200"
          >
            Connect Spotify
          </a>
        ) : null}

        {baseStatus.discord ? (
          <p className="text-sm text-gray-700">
            💬 {baseStatus.discord.activity}
          </p>
        ) : null}
      </div>
    </div>
  )
}
