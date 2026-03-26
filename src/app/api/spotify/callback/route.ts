import { NextRequest, NextResponse } from "next/server"
import { Buffer } from "buffer"
import { createHmac } from "crypto"

type SpotifyTokenResponse = {
  access_token: string
  token_type: string
  expires_in: number
  refresh_token?: string
  scope?: string
  error?: string
  error_description?: string
}

function resolveRedirectUri(req: NextRequest) {
  const origin = new URL(req.url).origin
  return process.env.SPOTIFY_REDIRECT_URI ?? `${origin}/api/spotify/callback`
}

export const dynamic = "force-dynamic"

function verifyOauthState(state: string): boolean {
  const secret = process.env.SPOTIFY_OAUTH_STATE_SECRET ??
    process.env.SPOTIFY_CLIENT_SECRET

  if (!secret) return false

  const parts = state.split(".")
  if (parts.length !== 2) return false

  const [rawState, signature] = parts
  const expected = createHmac("sha256", secret).update(rawState).digest("hex")

  return signature === expected
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const code = url.searchParams.get("code")
  const state = url.searchParams.get("state")
  if (!code) {
    return NextResponse.json({ error: "Missing Spotify auth code." }, { status: 400 })
  }

  if (!state || !verifyOauthState(state)) {
    return NextResponse.json({ error: "Invalid Spotify OAuth state." }, { status: 400 })
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    return NextResponse.json(
      { error: "Missing SPOTIFY_CLIENT_ID/SPOTIFY_CLIENT_SECRET." },
      { status: 500 }
    )
  }

  const redirectUri = resolveRedirectUri(req)

  const params = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectUri,
  })

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64")

  const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  })

  const tokenJson = (await tokenRes.json()) as SpotifyTokenResponse

  if (!tokenRes.ok || !tokenJson.refresh_token) {
    return NextResponse.json(
      {
        error:
          tokenJson.error_description ||
          tokenJson.error ||
          "Spotify token exchange failed (no refresh token returned).",
      },
      { status: 400 }
    )
  }

  const refreshToken = tokenJson.refresh_token

  // Note: we don't persist to .env automatically (deployment environments are read-only).
  // Instead we render the refresh token so you can paste it into your env.
  const html = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Spotify Refresh Token</title>
  </head>
  <body style="font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Arial, sans-serif; padding: 24px; max-width: 900px; margin: 0 auto;">
    <h1 style="font-size: 20px; margin: 0 0 8px;">Spotify refresh token generated</h1>
    <p style="margin: 0 0 16px; color: #444;">
      Paste this value into your environment as <code>SPOTIFY_REFRESH_TOKEN</code>.
    </p>
    <textarea readonly style="width: 100%; min-height: 140px; padding: 12px; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, monospace; font-size: 12px;">${refreshToken}</textarea>
    <div style="margin-top: 12px; color: #666; font-size: 12px;">
      If you don't see a refresh token, make sure your Spotify app authorization includes the
      <code>user-read-currently-playing</code> scope and that you complete the consent flow once.
    </div>
  </body>
</html>`

  const res = new NextResponse(html, {
    headers: { "content-type": "text/html; charset=utf-8" },
  })

  // Best-effort cleanup so you don't reuse tokens accidentally.
  res.cookies.set("spotify_oauth_state", "", { path: "/api/spotify/callback", maxAge: 0 })

  return res
}

