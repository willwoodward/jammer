import { useCallback, useRef, useState } from 'react'
import { dedupeKey } from '../lib/library'
import type { CustomSong, ImportedSong, SongTranslation } from '../types'

const STORAGE_KEY = 'worship-saved-songs'

function load(): CustomSong[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

let counter = 0
function nextId(): string {
  counter += 1
  return `${Date.now().toString(36)}-${counter.toString(36)}`
}

export interface ImportSummary {
  added: number
  duplicates: number
  /** False when the browser refused to store the library. */
  saved: boolean
}

export function useSavedSongs() {
  const [savedSongs, setSavedSongs] = useState<CustomSong[]>(load)
  const [storageError, setStorageError] = useState('')

  // Mirrors state so batch imports can read the current library without going
  // through a state updater (writing to storage is a side effect). Every change
  // goes through commit(), which keeps the two in step.
  const songsRef = useRef(savedSongs)

  /**
   * Writes first, then updates state — so a browser that refuses the write
   * (private mode, full storage) leaves the library exactly as it was rather
   * than showing songs that would vanish on reload.
   */
  const commit = useCallback((next: CustomSong[]): boolean => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
      setStorageError("couldn't save — your browser's storage is full or unavailable")
      return false
    }
    setStorageError('')
    songsRef.current = next
    setSavedSongs(next)
    return true
  }, [])

  const addSavedSong = useCallback(
    (imported: ImportedSong) => {
      const song: CustomSong = { ...imported, id: nextId() }
      commit([song, ...songsRef.current])
      return song
    },
    [commit]
  )

  /** Imports a batch, skipping songs already in the library. */
  const addSavedSongs = useCallback(
    (imported: ImportedSong[]): ImportSummary => {
      const seen = new Set(songsRef.current.map(dedupeKey))
      const fresh: CustomSong[] = []

      for (const song of imported) {
        const key = dedupeKey(song)
        if (seen.has(key)) continue
        seen.add(key)
        fresh.push({ ...song, id: nextId() })
      }

      const duplicates = imported.length - fresh.length
      if (fresh.length === 0) return { added: 0, duplicates, saved: true }

      const saved = commit([...fresh, ...songsRef.current])
      return { added: saved ? fresh.length : 0, duplicates, saved }
    },
    [commit]
  )

  /** Adds or replaces a translation on a saved song. */
  const setTranslation = useCallback(
    (songId: string, translation: SongTranslation) => {
      commit(
        songsRef.current.map((song) => {
          if (song.id !== songId) return song
          const others = (song.translations ?? []).filter((t) => t.language !== translation.language)
          return { ...song, translations: [...others, translation] }
        })
      )
    },
    [commit]
  )

  const removeTranslation = useCallback(
    (songId: string, language: string) => {
      commit(
        songsRef.current.map((song) => {
          if (song.id !== songId) return song
          const translations = (song.translations ?? []).filter((t) => t.language !== language)
          return translations.length > 0
            ? { ...song, translations }
            : { ...song, translations: undefined }
        })
      )
    },
    [commit]
  )

  const removeSavedSong = useCallback(
    (id: string) => {
      commit(songsRef.current.filter((s) => s.id !== id))
    },
    [commit]
  )

  return {
    savedSongs,
    addSavedSong,
    addSavedSongs,
    removeSavedSong,
    setTranslation,
    removeTranslation,
    storageError,
  }
}
