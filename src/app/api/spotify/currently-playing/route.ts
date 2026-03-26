import { NextResponse } from "next/server"

type SpotifyCurrentlyPlayingResponse = {
  playing: boolean
  updatedAt: string
  spotify?: {
    track: string
    artist: string
    albumArtUrl: string
  }
  error?: string
}

type SpotifyCurrentlyPlayingApiResponse = {
  item?: {
    name?: string
    artists?: { name?: string }[]
    album?: { images?: { url?: string }[] }
  } | null
}

async function getSpotifyAccessToken(): Promise<string> {
  const clientId = process.env.SPOTIFY_CLIENT_ID
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error("Spotify is not configured (missing env vars).")
  }

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64")

  const params = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  })

  const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  })

  if (!tokenRes.ok) {
    const text = await tokenRes.text().catch(() => "")
    throw new Error(`Spotify token refresh failed: ${text || tokenRes.status}`)
  }

  const tokenJson = (await tokenRes.json()) as {
    access_token?: string
    token_type?: string
    expires_in?: number
  }

  if (!tokenJson.access_token) {
    throw new Error("Spotify token refresh succeeded but no access_token returned.")
  }

  return tokenJson.access_token
}

export const dynamic = "force-dynamic"

export async function GET(req: Request) {
  const clientId = process.env.SPOTIFY_CLIENT_ID
  const market =
    new URL(req.url).searchParams.get("market") ||
    process.env.SPOTIFY_MARKET ||
    "US"

  if (!clientId) {
    return NextResponse.json(
      {
        playing: false,
        updatedAt: new Date().toISOString(),
        error: "Spotify is not configured (missing SPOTIFY_CLIENT_ID).",
      } satisfies SpotifyCurrentlyPlayingResponse,
      { status: 501 }
    )
  }

  try {
    const accessToken = await getSpotifyAccessToken()

    const r = await fetch(
      `https://api.spotify.com/v1/me/player/currently-playing?market=${encodeURIComponent(
        market
      )}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        cache: "no-store",
      }
    )

    // Spotify returns 204 No Content when nothing is currently playing.
    if (r.status === 204) {
      return NextResponse.json({
        playing: false,
        updatedAt: new Date().toISOString(),
      } satisfies SpotifyCurrentlyPlayingResponse)
    }

    if (!r.ok) {
      const text = await r.text().catch(() => "")
      return NextResponse.json(
        {
          playing: false,
          updatedAt: new Date().toISOString(),
          error: text || `Spotify API request failed: ${r.status}`,
        } satisfies SpotifyCurrentlyPlayingResponse,
        { status: r.status }
      )
    }

    const data = (await r.json()) as SpotifyCurrentlyPlayingApiResponse
    const item = data?.item

    // Extra guard: some responses can be missing `item` even if we got JSON.
    if (!item) {
      return NextResponse.json({
        playing: false,
        updatedAt: new Date().toISOString(),
      } satisfies SpotifyCurrentlyPlayingResponse)
    }

    const track: string = item?.name || ""
    const artist: string = item?.artists?.[0]?.name || ""
    const albumArtUrl: string = item?.album?.images?.[0]?.url || ""

    return NextResponse.json({
      playing: true,
      spotify: {
        track,
        artist,
        albumArtUrl,
      },
      updatedAt: new Date().toISOString(),
    } satisfies SpotifyCurrentlyPlayingResponse)
  } catch (e) {
    return NextResponse.json(
      {
        playing: false,
        updatedAt: new Date().toISOString(),
        error:
          e instanceof Error ? e.message : "Spotify currently-playing failed.",
      } satisfies SpotifyCurrentlyPlayingResponse,
      { status: 500 }
    )
  }
}

