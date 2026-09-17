import type { ImportedSong } from '../../types'
import { parseSongSelectText, parseSongSelectUsr } from './songselect'
import { parseLibraryJson } from '../library'

export { parseSongSelectText, parseSongSelectUsr } from './songselect'

/**
 * Kept here rather than imported so that merely checking a file name doesn't
 * pull in the ProPresenter parser — it carries protobuf definitions and is a
 * quarter of a megabyte, which no participant should ever download.
 */
export function isProPresenterFile(fileName: string): boolean {
  return /\.pro[4567]?$/i.test(fileName)
}

/** Extensions offered in the file picker. */
export const IMPORT_ACCEPT = '.txt,.usr,.bin,.json,.pro,.pro4,.pro5,.pro6'

export interface ImportResult {
  songs: ImportedSong[]
  /** File names we couldn't make sense of, so the UI can say which. */
  failed: string[]
}

/**
 * Parses whatever the user picked. Everything runs in the browser: no file,
 * and no lyric, is uploaded anywhere by this function.
 *
 * Importing a whole ProPresenter library means hundreds of files, so progress
 * is reported and the loop yields periodically to keep the UI responsive.
 */
export async function importSongFiles(
  files: File[],
  onProgress?: (done: number, total: number) => void
): Promise<ImportResult> {
  const songs: ImportedSong[] = []
  const failed: string[] = []

  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    const parsed = await importSongFile(file)
    if (parsed.length > 0) songs.push(...parsed)
    else if (!isIgnorable(file.name)) failed.push(file.name)

    onProgress?.(i + 1, files.length)
    // Let the browser paint between batches
    if (i % 20 === 19) await yieldToBrowser()
  }

  return { songs, failed }
}

function yieldToBrowser(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 0))
}

/**
 * Picking a whole library folder sweeps up things that aren't songs — hidden
 * files, thumbnails, ProPresenter's own metadata. Those aren't failures worth
 * reporting, they're noise.
 */
function isIgnorable(fileName: string): boolean {
  if (fileName.startsWith('.')) return true
  return /\.(plist|db|sqlite|png|jpe?g|gif|mp[34]|mov|m4v|pdf|zip|ds_store)$/i.test(fileName)
}

async function importSongFile(file: File): Promise<ImportedSong[]> {
  try {
    if (isProPresenterFile(file.name)) {
      // Loaded on demand: only someone importing a ProPresenter file pays for it
      const { parseProPresenter } = await import('./propresenter')
      const bytes = new Uint8Array(await file.arrayBuffer())
      const song = parseProPresenter(file.name, bytes)
      return song ? [song] : []
    }

    const ext = extensionOf(file.name)
    if (!TEXT_EXTENSIONS.has(ext)) return []

    const text = await file.text()

    if (ext === 'json') {
      return parseLibraryJson(text) ?? []
    }

    const parsed = parseSongText(text)
    if (parsed) return [parsed]

    // A plain .txt the user deliberately picked is still lyrics worth keeping.
    // Other extensions are not, which matters when a whole folder is selected.
    if (ext === 'txt' && text.trim() !== '') {
      return [{
        title: file.name.replace(/\.[^.]+$/, ''),
        lyrics: text.trim(),
        source: 'pasted',
      }]
    }

    return []
  } catch {
    return []
  }
}

const TEXT_EXTENSIONS = new Set(['txt', 'usr', 'bin', 'json'])

function extensionOf(fileName: string): string {
  return (/\.([^.]+)$/.exec(fileName)?.[1] ?? '').toLowerCase()
}

/** Tries each text format in turn. Returns null when none of them match. */
export function parseSongText(text: string): ImportedSong | null {
  return parseSongSelectUsr(text) ?? parseSongSelectText(text)
}
