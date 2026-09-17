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

/** A singable translation of a song, aligned to the original's sections. */
export interface SongTranslation {
  /** Stable code, e.g. 'es' — matched against the viewer's chosen language. */
  language: string
  /** Name shown in the picker, in that language, e.g. 'Español'. */
  name: string
  title?: string
  sections: Section[]
}

export interface Song {
  id: string
  title: string
  artist: string
  key: string
  sections: Section[]
  /** The language these lyrics are written in. Defaults to English. */
  language?: string
  /** Other languages this song can be sung in. */
  translations?: SongTranslation[]
}

export type ViewMode = 'lyrics' | 'chords'
export type Theme = 'light' | 'dark'
export type Role = 'leader' | 'assistant' | 'participant'

export interface CustomSong {
  id: string
  title: string
  /** Plain-text lyrics — always present, and the fallback when parsing found no structure. */
  lyrics: string
  artist?: string
  key?: string
  ccliNumber?: string
  /** Set when the song was imported from a structured source (SongSelect, ProPresenter). */
  sections?: Section[]
  /** Where this song came from, shown in the UI. */
  source?: ImportSource
  /** The language these lyrics are written in. Defaults to English. */
  language?: string
  /** Other languages this song can be sung in. */
  translations?: SongTranslation[]
}

export type ImportSource = 'pasted' | 'songselect' | 'propresenter'

/** A song parsed out of an imported file, before it is given an id. */
export type ImportedSong = Omit<CustomSong, 'id'>

export interface JamState {
  code: string
  currentSongId: string | null
  role: Role
  customSongs: CustomSong[]
}
