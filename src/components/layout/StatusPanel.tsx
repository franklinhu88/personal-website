"use client";

import { useEffect, useMemo, useState } from "react";
import { mockStatus } from "@/lib/mock/status";
import type { SpotifyStatus } from "@/lib/types/status";

type SpotifyCurrentlyPlaying = {
  playing: boolean;
  updatedAt: string;
  spotify?: SpotifyStatus;
  error?: string;
};

export default function StatusPanel() {
  const baseStatus = mockStatus;

  // Spotify data updates on an interval so the sidebar feels "alive".
  const [spotifyNow, setSpotifyNow] = useState<SpotifyStatus | null>(null);
  const [spotifyLoading, setSpotifyLoading] = useState(true);
  const [spotifyError, setSpotifyError] = useState<string | null>(null);
  const [spotifyUpdatedAt, setSpotifyUpdatedAt] = useState<string>(
    baseStatus.updatedAt,
  );

  const updatedText = useMemo(() => {
    const d = new Date(spotifyUpdatedAt);
    if (Number.isNaN(d.getTime())) return "";
    return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  }, [spotifyUpdatedAt]);

  useEffect(() => {
    let cancelled = false;

    const fetchNow = async () => {
      try {
        setSpotifyLoading(true);
        setSpotifyError(null);

        // Dev UX: localhost often can’t access Spotify credentials correctly.
        // Render a mocked “currently playing” response so you can style/verify the UI.
        const host = window.location.hostname;
        const isLocalhost =
          host === "localhost" ||
          host === "127.0.0.1" ||
          host.endsWith(".localhost");

        if (isLocalhost) {
          setSpotifyUpdatedAt(new Date().toISOString());
          setSpotifyNow({
            track: "Faucet Failure",
            artist: "Ski Mask The Slump God",
            albumArtUrl:
              "https://i.scdn.co/image/ab67616d0000b273e62c8561e3b1bd9ad952ce01",
          });
          setSpotifyError(null);
          setSpotifyLoading(false);
          return;
        }

        const res = await fetch("/api/spotify/currently-playing", {
          cache: "no-store",
        });

        const data = (await res.json()) as SpotifyCurrentlyPlaying;

        if (cancelled) return;

        if (!res.ok) {
          setSpotifyNow(null);
          setSpotifyError(data.error || "Spotify unavailable");
          setSpotifyUpdatedAt(data.updatedAt || new Date().toISOString());
          return;
        }

        setSpotifyUpdatedAt(data.updatedAt || new Date().toISOString());
        // A successful response should clear any previous error.
        setSpotifyError(null);

        if (data.playing && data.spotify) {
          setSpotifyNow(data.spotify);
        } else {
          setSpotifyNow(null);
        }
      } catch (e) {
        if (cancelled) return;
        setSpotifyError(e instanceof Error ? e.message : "Spotify unavailable");
        setSpotifyNow(null);
        setSpotifyUpdatedAt(new Date().toISOString());
      } finally {
        if (!cancelled) setSpotifyLoading(false);
      }
    };

    fetchNow();
    const id = window.setInterval(fetchNow, 15000);

    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, []);

  const needsSpotifyConnect = Boolean(
    spotifyError &&
    /not configured|missing env|SPOTIFY_REFRESH_TOKEN/i.test(spotifyError),
  );

  const isSpotifyPlaying = Boolean(
    spotifyNow?.track && spotifyNow?.artist && spotifyNow?.albumArtUrl
  );

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
        {/* Spotify box */}
        <div
          className={`rounded-xl border border-[var(--border-subtle)] bg-white p-3 ${
            isSpotifyPlaying
              ? "border-l-4 border-l-[var(--accent-blue)] bg-[rgba(10,102,194,0.06)]"
              : ""
          }`}
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2">
              <p className="truncate text-sm font-semibold text-gray-900">
                {isSpotifyPlaying ? "Now Playing" : "Spotify"}
              </p>
              {isSpotifyPlaying && !spotifyLoading ? (
                <>
                  <span className="inline-flex items-center rounded-full bg-[var(--accent-blue)]/10 px-2 py-0.5 text-xs font-semibold text-[var(--accent-blue)]">
                    LIVE
                  </span>
                  <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[var(--accent-blue)]" />
                </>
              ) : null}
            </div>

            {spotifyLoading ? (
              <p className="text-xs text-gray-500">Checking...</p>
            ) : null}
          </div>

          {spotifyLoading ? (
            <div className="mt-3 flex items-center gap-3">
              <div className="h-10 w-10 animate-pulse rounded-md bg-gray-100" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-4/5 animate-pulse rounded bg-gray-100" />
                <div className="h-2 w-2/3 animate-pulse rounded bg-gray-100" />
              </div>
            </div>
          ) : needsSpotifyConnect ? (
            <div className="mt-3 space-y-2">
              <p className="text-sm text-gray-700">
                Connect Spotify to show what you&apos;re currently listening to.
              </p>
              <a
                href="/spotify-connect"
                className="block w-full rounded-full bg-[var(--accent-blue)] px-4 py-2 text-center text-sm font-semibold text-white hover:opacity-90"
              >
                Connect Spotify
              </a>
            </div>
          ) : isSpotifyPlaying ? (
            <div className="mt-3 flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={spotifyNow!.albumArtUrl}
                alt="Album art"
                className="h-10 w-10 rounded-md object-cover"
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-gray-900">
                  {spotifyNow!.track}
                </p>
                <p className="truncate text-xs text-gray-600">
                  {spotifyNow!.artist}
                </p>
              </div>
            </div>
          ) : (
            <div className="mt-3">
              <p className="text-sm text-gray-600">
                Not listening on Spotify right now
              </p>
            </div>
          )}
        </div>

        {/* Discord */}
        {baseStatus.discord ? (
          <p className="text-sm text-gray-700">
            💬 {baseStatus.discord.activity}
          </p>
        ) : null}
      </div>
    </div>
  );
}
