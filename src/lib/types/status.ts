export interface SpotifyStatus {
  track: string
  artist: string
  albumArtUrl: string
}

export interface DiscordStatus {
  activity: string
}

export interface LiveStatus {
  summary: string
  spotify?: SpotifyStatus
  discord?: DiscordStatus
  updatedAt: string
}
