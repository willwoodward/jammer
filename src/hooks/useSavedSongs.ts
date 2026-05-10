import { useState, useCallback } from 'react'
import type { CustomSong } from '../types'

const STORAGE_KEY = 'worship-saved-songs'

function load(): CustomSong[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function save(songs: CustomSong[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(songs))
}

export function useSavedSongs() {
  const [savedSongs, setSavedSongs] = useState<CustomSong[]>(load)

  const addSavedSong = useCallback((title: string, lyrics: string) => {
    const id = Date.now().toString()
    const song: CustomSong = { id, title, lyrics }
    setSavedSongs((prev) => {
      const next = [song, ...prev]
      save(next)
      return next
    })
    return song
  }, [])

  const removeSavedSong = useCallback((id: string) => {
    setSavedSongs((prev) => {
      const next = prev.filter((s) => s.id !== id)
      save(next)
      return next
    })
  }, [])

  return { savedSongs, addSavedSong, removeSavedSong }
}
