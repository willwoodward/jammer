import type { CustomSong, ImportedSong } from '../types'

/**
 * Your saved songs as a file you can move between devices.
 *
 * Saved songs live in one browser's localStorage, so a library imported on the
 * church computer isn't on the phone you lead from. Exporting writes a plain
 * JSON file you can move however you like — AirDrop, OneDrive, email it to
 * yourself, a USB stick — and importing it reads it back on the other device.
 */

const FORMAT = 'jammer-library'
const VERSION = 1

interface LibraryFile {
  format: typeof FORMAT
  version: number
  exported: string
  songs: ImportedSong[]
}

export function libraryFileName(date = new Date()): string {
  const stamp = date.toISOString().slice(0, 10)
  return `jammer-songs-${stamp}.json`
}

export function libraryToJson(songs: CustomSong[]): string {
  const file: LibraryFile = {
    format: FORMAT,
    version: VERSION,
    exported: new Date().toISOString(),
    // ids are local to the device that made them, so they aren't exported
    songs: songs.map(withoutId),
  }
  return JSON.stringify(file, null, 2)
}

function withoutId(song: CustomSong): ImportedSong {
  const copy: Partial<CustomSong> = { ...song }
  delete copy.id
  return copy as ImportedSong
}

/** Returns null when the JSON isn't one of our library files. */
export function parseLibraryJson(text: string): ImportedSong[] | null {
  let data: unknown
  try {
    data = JSON.parse(text)
  } catch {
    return null
  }

  const file = data as Partial<LibraryFile>
  if (!file || file.format !== FORMAT || !Array.isArray(file.songs)) return null

  const songs = file.songs
    .map(toImportedSong)
    .filter((s): s is ImportedSong => s !== null)

  return songs.length > 0 ? songs : null
}

function toImportedSong(raw: unknown): ImportedSong | null {
  if (!raw || typeof raw !== 'object') return null
  const song = raw as Record<string, unknown>
  if (typeof song.title !== 'string' || song.title.trim() === '') return null

  const imported: ImportedSong = {
    title: song.title,
    lyrics: typeof song.lyrics === 'string' ? song.lyrics : '',
  }
  if (typeof song.artist === 'string') imported.artist = song.artist
  if (typeof song.key === 'string') imported.key = song.key
  if (typeof song.ccliNumber === 'string') imported.ccliNumber = song.ccliNumber
  if (song.source === 'songselect' || song.source === 'propresenter' || song.source === 'pasted') {
    imported.source = song.source
  }
  if (Array.isArray(song.sections) && song.sections.length > 0) {
    imported.sections = song.sections as ImportedSong['sections']
  }

  // A song with neither text nor structure is nothing worth importing
  if (!imported.lyrics && !imported.sections) return null
  return imported
}

/** Triggers a download of the library in the browser. */
export function downloadLibrary(songs: CustomSong[]): void {
  const blob = new Blob([libraryToJson(songs)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = libraryFileName()
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

/** Songs are the same song when they share a CCLI number, or failing that a title. */
export function dedupeKey(song: ImportedSong): string {
  if (song.ccliNumber) return `ccli:${song.ccliNumber}`
  return `title:${song.title.trim().toLowerCase()}`
}
