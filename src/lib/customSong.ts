import type { CustomSong, Section, Song } from '../types'

/**
 * Imported songs that parsed into sections render through the normal LyricsView,
 * exactly like a built-in hymn. Ones that didn't fall back to plain text.
 */
export function asSong(custom: CustomSong): Song | null {
  if (!custom.sections || custom.sections.length === 0) return null
  return {
    id: `custom:${custom.id}`,
    title: custom.title,
    artist: custom.artist || sourceLabel(custom),
    key: custom.key ?? '',
    sections: custom.sections,
  }
}

export function sourceLabel(custom: CustomSong): string {
  switch (custom.source) {
    case 'songselect':
      return 'SongSelect'
    case 'propresenter':
      return 'ProPresenter'
    default:
      return 'pasted'
  }
}

/**
 * Firebase rejects `undefined`, and reads arrays back as objects keyed by index
 * when they aren't contiguous. Both directions are handled here so the rest of
 * the app only ever sees clean CustomSongs.
 */
export function toFirebase(song: Omit<CustomSong, 'id'>): Record<string, unknown> {
  return JSON.parse(JSON.stringify(song))
}

export function fromFirebase(id: string, value: unknown): CustomSong {
  const raw = (value ?? {}) as Record<string, unknown>
  const song: CustomSong = {
    id,
    title: typeof raw.title === 'string' ? raw.title : 'Untitled',
    lyrics: typeof raw.lyrics === 'string' ? raw.lyrics : '',
  }
  if (typeof raw.artist === 'string') song.artist = raw.artist
  if (typeof raw.key === 'string') song.key = raw.key
  if (typeof raw.ccliNumber === 'string') song.ccliNumber = raw.ccliNumber
  if (raw.source === 'songselect' || raw.source === 'propresenter' || raw.source === 'pasted') {
    song.source = raw.source
  }
  const sections = normaliseSections(raw.sections)
  if (sections) song.sections = sections
  return song
}

function normaliseSections(raw: unknown): Section[] | undefined {
  const list = toArray(raw)
  if (!list) return undefined
  const sections = list
    .map((entry) => {
      const section = entry as Record<string, unknown>
      const lines = toArray(section.lines)
      if (!lines) return null
      return {
        type: (section.type ?? 'verse') as Section['type'],
        label: typeof section.label === 'string' ? section.label : '',
        lines: lines
          .map((line) => {
            const l = line as Record<string, unknown>
            return typeof l?.text === 'string' ? { text: l.text } : null
          })
          .filter((l): l is { text: string } => l !== null),
      }
    })
    .filter((s): s is Section => s !== null && s.lines.length > 0)

  return sections.length > 0 ? sections : undefined
}

/** Accepts both a real array and Firebase's index-keyed object form. */
function toArray(raw: unknown): unknown[] | undefined {
  if (Array.isArray(raw)) return raw.filter((v) => v !== null && v !== undefined)
  if (raw && typeof raw === 'object') {
    const entries = Object.entries(raw as Record<string, unknown>)
      .filter(([key]) => /^\d+$/.test(key))
      .sort((a, b) => Number(a[0]) - Number(b[0]))
    if (entries.length > 0) return entries.map(([, value]) => value)
  }
  return undefined
}
