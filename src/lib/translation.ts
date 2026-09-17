import type { CustomSong, Section, SongTranslation } from '../types'
import { parseSongText } from './parsers'
import { makeSection } from './parsers/sections'

/**
 * Turns pasted text into a translation aligned to an existing song.
 *
 * A SongSelect export in another language parses into proper sections; anything
 * else is split on blank lines. Either way the result is only really useful if
 * it has the same number of sections as the original, so the caller can tell
 * the user when it doesn't.
 */
export function buildTranslation(
  original: CustomSong,
  language: string,
  name: string,
  text: string
): { translation: SongTranslation; alignment: Alignment } {
  const parsed = parseSongText(text)
  const sections = parsed?.sections ?? splitIntoSections(text)

  const translation: SongTranslation = { language, name, sections }
  if (parsed?.title) translation.title = parsed.title

  return { translation, alignment: describeAlignment(original, sections) }
}

export interface Alignment {
  matches: boolean
  originalCount: number
  translationCount: number
}

function describeAlignment(original: CustomSong, sections: Section[]): Alignment {
  const originalCount = original.sections?.length ?? 0
  return {
    matches: originalCount > 0 && originalCount === sections.length,
    originalCount,
    translationCount: sections.length,
  }
}

/** Blank lines separate sections, matching how pasted lyrics already behave. */
function splitIntoSections(text: string): Section[] {
  return text
    .replace(/\r\n?/g, '\n')
    .split(/\n\s*\n/)
    .map((block) => block.split('\n').map((l) => l.trim()).filter(Boolean))
    .filter((lines) => lines.length > 0)
    .map((lines) => makeSection('', lines))
}
