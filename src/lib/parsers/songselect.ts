import type { ImportedSong, Section } from '../../types'
import { isSectionHeader, makeSection, sectionsToText } from './sections'

/**
 * Parsers for the two formats SongSelect lets a licensed user download:
 * plain text (.txt) and the older "USR" format (.usr, renamed .bin around 2015).
 *
 * Neither talks to CCLI — the user downloads the file themselves and we read it.
 */

/** Footer lines carry the copyright block rather than lyrics. */
const FOOTER_START =
  /^\s*(©|\(c\)\s|copyright\b|ccli\b|ccli-|for use solely|all rights reserved|www\.ccli\.com)/i

/** "CCLI Song # 2672885", "CCLI Number: 2672885", "CCLI-Liednummer: 2672885" */
const SONG_NUMBER = /ccli[^a-z0-9]*(?:song|lied)[^0-9]*([0-9]{3,})/i
/** The licence number is the *church's*, not the song's — never treat it as one. */
const LICENCE_LINE = /licen[cs]|lizenz/i

const NOISE = /^\s*(for use solely|all rights reserved|www\.ccli\.com|ccli[^a-z0-9]*licen|ccli[^a-z0-9]*lizenz)/i

function splitLines(text: string): string[] {
  return text.replace(/\r\n?/g, '\n').split('\n').map((l) => l.replace(/\s+$/, ''))
}

/**
 * Parses SongSelect's plain-text export. Its shape is:
 *
 *   Song Title
 *   <blank>
 *   Verse 1
 *   ...lyrics...
 *   <blank><blank>
 *   Chorus 1
 *   ...lyrics...
 *   <blank><blank>
 *   CCLI Song # 2672885
 *   © 1999 Integrity's Hosanna! Music
 *   Lenny LeBlanc | Paul Baloche
 *   For use solely with the SongSelect Terms of Use.
 *   CCLI License No. 14
 *
 * Returns null when the text doesn't look like this, so callers can fall back
 * to treating it as an unstructured paste.
 */
export function parseSongSelectText(text: string): ImportedSong | null {
  const lines = splitLines(text)

  const firstContent = lines.findIndex((l) => l.trim() !== '')
  if (firstContent === -1) return null
  const title = lines[firstContent].trim()

  // The footer begins at the first copyright-ish line after the lyrics
  let footerStart = lines.length
  for (let i = firstContent + 1; i < lines.length; i++) {
    if (FOOTER_START.test(lines[i])) {
      footerStart = i
      break
    }
  }

  const body = lines.slice(firstContent + 1, footerStart)
  const footer = lines.slice(footerStart)

  const sections = parseBody(body)
  const hasFooter = footer.some((l) => /ccli|©/i.test(l))
  const hasLabels = sections.some((s) => s.label !== '')

  // Without either a CCLI footer or section labels this is just pasted text
  if (!hasFooter && !hasLabels) return null
  if (sections.length === 0) return null

  const song: ImportedSong = {
    title,
    lyrics: sectionsToText(sections),
    sections,
    source: 'songselect',
  }

  const ccliNumber = findSongNumber(footer)
  if (ccliNumber) song.ccliNumber = ccliNumber

  const artist = findAuthors(footer)
  if (artist) song.artist = artist

  return song
}

function parseBody(body: string[]): Section[] {
  const sections: Section[] = []
  let label = ''
  let buffer: string[] = []

  function flush() {
    if (buffer.length > 0) sections.push(makeSection(label, buffer))
    buffer = []
  }

  for (const line of body) {
    if (line.trim() === '') {
      continue
    }
    if (isSectionHeader(line)) {
      flush()
      label = line.trim()
      continue
    }
    buffer.push(line.trim())
  }
  flush()

  return sections
}

function findSongNumber(footer: string[]): string | undefined {
  for (const line of footer) {
    if (LICENCE_LINE.test(line)) continue
    const match = SONG_NUMBER.exec(line)
    if (match) return match[1]
    // "CCLI Number: 2672885" with no Song/Lied word
    if (/ccli/i.test(line)) {
      const loose = /([0-9]{4,})/.exec(line)
      if (loose) return loose[1]
    }
  }
  return undefined
}

function findAuthors(footer: string[]): string | undefined {
  for (const line of footer) {
    const trimmed = line.trim()
    if (trimmed === '') continue
    if (/^(©|\(c\)|copyright)/i.test(trimmed)) continue
    if (/ccli/i.test(trimmed)) continue
    if (NOISE.test(trimmed)) continue
    return trimmed
  }
  return undefined
}

/**
 * Parses the SongSelect "USR" format — an INI-ish file where `Fields` names the
 * sections and `Words` holds their text, both tab-delimited with `/t`, and
 * newlines within a section written as `/n`.
 */
export function parseSongSelectUsr(text: string): ImportedSong | null {
  const lines = splitLines(text)
  if (!lines.some((l) => /^\s*\[File\]/i.test(l))) return null

  let title = ''
  let author = ''
  let keys = ''
  let fields = ''
  let words = ''
  let ccliNumber = ''

  for (const line of lines) {
    const songId = /^\[S (?:A)?([0-9]+)\]/.exec(line)
    if (songId) ccliNumber = songId[1]
    if (line.startsWith('Title=')) title = line.slice(6).trim()
    else if (line.startsWith('Author=')) author = line.slice(7).trim()
    else if (line.startsWith('Keys=')) keys = line.slice(5).trim()
    else if (line.startsWith('Fields=')) fields = line.slice(7).trim()
    else if (line.startsWith('Words=')) words = line.slice(6).trim()
  }

  if (!title || !words) return null

  const labels = fields ? fields.split('/t') : []
  const bodies = words.split('/t')

  const sections: Section[] = bodies.map((body, i) =>
    makeSection(
      (labels[i] ?? '').trim(),
      body
        .split('/n')
        .map((l) => l.trim())
        .filter((l) => l !== '')
    )
  ).filter((s) => s.lines.length > 0)

  if (sections.length === 0) return null

  const song: ImportedSong = {
    title,
    lyrics: sectionsToText(sections),
    sections,
    source: 'songselect',
  }
  if (ccliNumber) song.ccliNumber = ccliNumber
  if (keys) song.key = keys
  if (author) song.artist = normaliseAuthors(author)

  return song
}

/** USR authors are "Surname, First | Surname, First" — make them readable. */
function normaliseAuthors(raw: string): string {
  return raw
    .split('|')
    .map((a) => {
      const parts = a.split(',').map((p) => p.trim()).filter(Boolean)
      return parts.length === 2 ? `${parts[1]} ${parts[0]}` : a.trim()
    })
    .join(', ')
}
