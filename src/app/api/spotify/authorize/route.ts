import { NextResponse } from "next/server"
import { createHmac, randomUUID } from "crypto"

function getOrigin(req: Request) {
  return new URL(req.url).origin
}

export const dynamic = "force-dynamic"

function signOauthState(rawState: string): string {
  const secret = process.env.SPOTIFY_OAUTH_STATE_SECRET ??
    process.env.SPOTIFY_CLIENT_SECRET

  // SPOTIFY_CLIENT_SECRET is required for the token exchange anyway, so this
  // should always be present in practice.
  if (!secret) return ""

  return createHmac("sha256", secret).update(rawState).digest("hex")
}

export async function GET(req: Request) {
  const clientId = process.env.SPOTIFY_CLIENT_ID

  if (!clientId) {
    return NextResponse.json(
      { error: "Missing SPOTIFY_CLIENT_ID" },
      { status: 500 }
    )
  }

  const scopes = "user-read-currently-playing"

  const origin = getOrigin(req)
  const redirectUri =
    process.env.SPOTIFY_REDIRECT_URI ?? `${origin}/api/spotify/callback`

  // Minimal CSRF protection for OAuth callback.
  const rawState = randomUUID()
  const signature = signOauthState(rawState)
  const state = signature ? `${rawState}.${signature}` : rawState

  const authUrl = new URL("https://accounts.spotify.com/authorize")
  authUrl.searchParams.set("response_type", "code")
  authUrl.searchParams.set("client_id", clientId)
  authUrl.searchParams.set("redirect_uri", redirectUri)
  authUrl.searchParams.set("scope", scopes)
  authUrl.searchParams.set("state", state)
  authUrl.searchParams.set("show_dialog", "true")

  const res = NextResponse.redirect(authUrl.toString(), 302)
  // Cookie is optional now; we primarily validate state using an HMAC.
  res.cookies.set("spotify_oauth_state", state, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/api/spotify/callback",
  })

  return res
}

