import { LiveStatus } from "../types/status"

export const mockStatus: LiveStatus = {
  summary: "Listening to music",
  spotify: {
    track: "Feather",
    artist: "Nujabes",
    albumArtUrl: "/album-art.jpg"
  },
  discord: {
    activity: "Building my portfolio site"
  },
  updatedAt: new Date().toISOString()
}
