import { LiveStatus } from "../types/status"

export const mockStatus: LiveStatus = {
  summary:
    'Building my personal website and integrating a few "live" sections.',
  spotify: {
    track: "Spotify integration",
    artist: "Integrating Spotify API",
    albumArtUrl: "/album-art.jpg"
  },
  discord: {
    activity:
      "Browsing projects, writing code, and iterating on the layout."
  },
  updatedAt: new Date().toISOString()
}
