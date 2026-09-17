import type { Section } from '../../types'

const SECTION_TYPES: Record<string, Section['type']> = {
  verse: 'verse',
  chorus: 'chorus',
  refrain: 'chorus',
  bridge: 'bridge',
  'pre-chorus': 'pre-chorus',
  prechorus: 'pre-chorus',
  tag: 'tag',
  intro: 'intro',
  introduction: 'intro',
  outro: 'outro',
  ending: 'outro',
  // Common localisations, since SongSelect exports in the user's language
  strophe: 'verse',
  vers: 'verse',
  verso: 'verse',
  estrofa: 'verse',
  couplet: 'verse',
  kehrvers: 'chorus',
  coro: 'chorus',
  estribillo: 'chorus',
  puente: 'bridge',
  ponte: 'bridge',
  pont: 'bridge',
}

/**
 * A section header is a short line naming a part of the song, optionally
 * numbered — "Verse 1", "Chorus", "Pre-Chorus 2", "Bridge:".
 */
const HEADER = new RegExp(
  `^\\s*(${Object.keys(SECTION_TYPES).join('|')})\\s*(\\d+)?\\s*:?\\s*$`,
  'i'
)

export function isSectionHeader(line: string): boolean {
  return HEADER.test(line)
}

/** Maps a label like "Verse 2" onto our section types, defaulting to verse. */
export function sectionTypeFor(label: string): Section['type'] {
  const match = HEADER.exec(label)
  if (!match) return 'verse'
  return SECTION_TYPES[match[1].toLowerCase()] ?? 'verse'
}

export function makeSection(label: string, lines: string[]): Section {
  return {
    type: sectionTypeFor(label),
    label: label.replace(/:\s*$/, '').trim(),
    lines: lines.map((text) => ({ text })),
  }
}

/** Renders parsed sections back to plain text, for the fallback view. */
export function sectionsToText(sections: Section[]): string {
  return sections
    .map((s) => s.lines.map((l) => l.text).join('\n'))
    .join('\n\n')
}
