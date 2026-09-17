import type { CustomSong, Section, Song, SongTranslation } from '../types'

/** The viewer's language preference when they want the song as written. */
export const ORIGINAL = 'original'

/**
 * Imported songs that parsed into sections render through the normal LyricsView,
 * exactly like a built-in hymn. Ones that didn't fall back to plain text.
 */
export function asSong(custom: CustomSong, language: string = ORIGINAL): Song | null {
  // Falls back to the original whenever this song has no such translation,
  // so a viewer's language choice never leaves them with a blank screen
  const translation = translationFor(custom, language)
  const sections = resolveSections(custom.sections, translation)
  if (!sections || sections.length === 0) return null

  return {
    id: `custom:${custom.id}`,
    title: translation?.title || custom.title,
    artist: custom.artist || sourceLabel(custom),
    key: custom.key ?? '',
    sections,
    translations: custom.translations,
  }
}

/** Applies a language choice to a built-in song. */
export function localise(song: Song, language: string = ORIGINAL): Song {
  const translation = translationFor(song, language)
  if (!translation) return song
  return {
    ...song,
    title: translation.title || song.title,
    sections: resolveSections(song.sections, translation) ?? song.sections,
  }
}

/**
 * A translation may cover fewer sections than the original — a hymn with four
 * verses translated for three. Missing sections fall back to the original so
 * the song is never cut short.
 */
function resolveSections(
  original: Section[] | undefined,
  translation: SongTranslation | undefined
): Section[] | undefined {
  if (!translation) return original
  if (!original || translation.sections.length >= original.length) return translation.sections
  return original.map((section, i) => translation.sections[i] ?? section)
}

type Translatable = { translations?: SongTranslation[] }

export function translationFor(song: Translatable, language: string): SongTranslation | undefined {
  if (!language || language === ORIGINAL) return undefined
  return song.translations?.find((t) => t.language === language)
}

/** Languages this song can actually be shown in, for the picker. */
export function availableTranslations(song: Translatable | null | undefined): SongTranslation[] {
  if (!song?.translations) return []
  return song.translations.filter((t) => t.sections.length > 0)
}

/**
 * The sections to show beneath the main ones in bilingual mode: always the
 * original, since the chosen language is what's shown first.
 */
export function originalSections(
  song: { sections?: Section[] },
  language: string,
  translation: SongTranslation | undefined
): Section[] | undefined {
  if (language === ORIGINAL || !translation) return undefined
  return song.sections
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

  const translations = normaliseTranslations(raw.translations)
  if (translations) song.translations = translations

  return song
}

function normaliseTranslations(raw: unknown): SongTranslation[] | undefined {
  const list = toArray(raw)
  if (!list) return undefined

  const translations = list
    .map((entry) => {
      const value = entry as Record<string, unknown>
      const sections = normaliseSections(value?.sections)
      if (!sections || typeof value.language !== 'string') return null
      const translation: SongTranslation = {
        language: value.language,
        name: typeof value.name === 'string' ? value.name : value.language,
        sections,
      }
      if (typeof value.title === 'string') translation.title = value.title
      return translation
    })
    .filter((t): t is SongTranslation => t !== null)

  return translations.length > 0 ? translations : undefined
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
