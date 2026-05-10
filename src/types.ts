export interface ChordPosition {
  chord: string
  position: number // character index where chord sits above
}

export interface Line {
  text: string
  chords?: ChordPosition[]
}

export interface Section {
  type: 'verse' | 'chorus' | 'bridge' | 'pre-chorus' | 'tag' | 'intro' | 'outro'
  label: string
  lines: Line[]
}

export interface Song {
  id: string
  title: string
  artist: string
  key: string
  sections: Section[]
}

export type ViewMode = 'lyrics' | 'chords'
export type Theme = 'light' | 'dark'
export type Role = 'leader' | 'participant'

export interface JamState {
  code: string
  currentSongId: string | null
  role: Role
}
