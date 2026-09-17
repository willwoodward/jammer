import {
  ProPresenter4Parser,
  ProPresenter5Parser,
  ProPresenter6Parser,
  ProPresenter7Parser,
} from 'propresenter-parser'
import type { ImportedSong, Section } from '../../types'
import { makeSection, sectionsToText } from './sections'

/**
 * Reads a ProPresenter song into our shape.
 *
 * ProPresenter 4-6 are XML; 7 is protobuf. The `propresenter-parser` package
 * handles all four and its dependencies are browser-safe, so this runs entirely
 * client-side — no file ever leaves the device.
 *
 * A ProPresenter song is slide groups ("Verse 1", "Chorus") each holding slides
 * of text, which maps cleanly onto our sections. Where the song has a selected
 * arrangement we follow that ordering, since it is the order the church
 * actually sings.
 */

/** v4/v5 expose text as `textContent`; v6/v7 as `plainText`. */
interface TextElement {
  plainText?: string
  textContent?: string
}
interface Slide {
  label?: string
  enabled?: boolean
  textElements: TextElement[]
}
interface SlideGroup {
  groupLabel: string
  groupId: string
  slides: Slide[]
}
interface Arrangement {
  label: string
  groupOrder: { groupLabel: string; groupId: string }[]
}
interface ParsedPro {
  properties: Record<string, unknown>
  slideGroups?: SlideGroup[]
  slides?: Slide[]
  arrangements?: Arrangement[]
}

export function parseProPresenter(fileName: string, bytes: Uint8Array): ImportedSong | null {
  const parsed = runParser(fileName, bytes)
  if (!parsed) return null

  const sections = toSections(parsed)
  if (sections.length === 0) return null

  const props = parsed.properties
  const title = str(props.CCLISongTitle) || fileName.replace(/\.[^.]+$/, '')

  const song: ImportedSong = {
    title,
    lyrics: sectionsToText(sections),
    sections,
    source: 'propresenter',
  }

  const artist = str(props.CCLIAuthor) || str(props.author) || str(props.CCLIArtistCredits) || str(props.artist)
  if (artist) song.artist = artist

  const ccliNumber = str(props.CCLISongNumber)
  if (ccliNumber) song.ccliNumber = ccliNumber

  return song
}

function runParser(fileName: string, bytes: Uint8Array): ParsedPro | null {
  const ext = (/\.([^.]+)$/.exec(fileName)?.[1] ?? '').toLowerCase()
  try {
    switch (ext) {
      case 'pro4':
        return ProPresenter4Parser(decodeText(bytes)) as unknown as ParsedPro
      case 'pro5':
        return ProPresenter5Parser(decodeText(bytes)) as unknown as ParsedPro
      case 'pro6':
        return ProPresenter6Parser(decodeText(bytes)) as unknown as ParsedPro
      case 'pro':
        // The v7 parser accepts bytes, though its published type says string
        return (ProPresenter7Parser as unknown as (b: Uint8Array) => ParsedPro)(bytes)
      default:
        return null
    }
  } catch {
    return null
  }
}

function decodeText(bytes: Uint8Array): string {
  return new TextDecoder('utf-8').decode(bytes)
}

function toSections(parsed: ParsedPro): Section[] {
  // ProPresenter 4 has no groups — every slide stands alone
  if (!parsed.slideGroups) {
    return (parsed.slides ?? [])
      .map((slide) => makeSection(slide.label?.trim() ?? '', slideLines(slide)))
      .filter((s) => s.lines.length > 0)
  }

  const groups = orderGroups(parsed)
  return groups
    .map((group) => {
      const lines = group.slides
        .filter((slide) => slide.enabled !== false)
        .flatMap((slide) => slideLines(slide))
      return makeSection(group.groupLabel?.trim() ?? '', lines)
    })
    .filter((s) => s.lines.length > 0)
}

/**
 * Follows the selected arrangement when there is one — a group can appear more
 * than once in an arrangement (a repeated chorus), which is what we want.
 */
function orderGroups(parsed: ParsedPro): SlideGroup[] {
  const groups = parsed.slideGroups ?? []
  const arrangements = parsed.arrangements ?? []
  if (arrangements.length === 0) return groups

  const selectedId = str(parsed.properties.selectedArrangementID)
  const arrangement =
    arrangements.find((a) => str((a as unknown as Record<string, unknown>).id) === selectedId) ??
    arrangements[0]
  if (!arrangement?.groupOrder?.length) return groups

  const byId = new Map(groups.map((g) => [g.groupId, g]))
  const ordered = arrangement.groupOrder
    .map((ref) => byId.get(ref.groupId) ?? groups.find((g) => g.groupLabel === ref.groupLabel))
    .filter((g): g is SlideGroup => g !== undefined)

  return ordered.length > 0 ? ordered : groups
}

function slideLines(slide: Slide): string[] {
  return (slide.textElements ?? [])
    .map((el) => el.plainText ?? el.textContent ?? '')
    .join('\n')
    .replace(/\r\n?/g, '\n')
    .split('\n')
    // v4/v5 text comes out of RTF, which leaves a line-break backslash behind
    .map((l) => l.replace(/\\+$/, '').trim())
    .filter((l) => l !== '')
}

function str(value: unknown): string {
  if (value === null || value === undefined) return ''
  return String(value).trim()
}
