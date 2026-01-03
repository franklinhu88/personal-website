import { LiveStatus } from "../types/status"

export const mockStatus: LiveStatus = {
  summary: "section in progress",
  spotify: {
    track: "",
    artist: "Integrating Spotify API",
    albumArtUrl: "/album-art.jpg"
  },
  discord: {
    activity: "Building my portfolio site and attending my final semester at Vandy"
  },
  updatedAt: new Date().toISOString()
}
