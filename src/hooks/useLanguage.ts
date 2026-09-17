import { useCallback, useState } from 'react'
import { ORIGINAL } from '../lib/customSong'

const STORAGE_KEY = 'worship-language'
const BILINGUAL_KEY = 'worship-bilingual'

/**
 * The viewer's language, remembered on their own device.
 *
 * This is deliberately *not* part of jam state: the leader picks the song, and
 * each person reads it in their own language on their own phone. Two people
 * sitting together can be reading different languages of the same song.
 */
export function useLanguage() {
  const [language, setLanguageState] = useState<string>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) || ORIGINAL
    } catch {
      return ORIGINAL
    }
  })

  const setLanguage = useCallback((next: string) => {
    setLanguageState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // A browser that won't store the preference still honours it this session
    }
  }, [])

  // "Show both" is also a per-device reading preference, not jam state
  const [bilingual, setBilingualState] = useState<boolean>(() => {
    try {
      return localStorage.getItem(BILINGUAL_KEY) === 'true'
    } catch {
      return false
    }
  })

  const setBilingual = useCallback((next: boolean) => {
    setBilingualState(next)
    try {
      localStorage.setItem(BILINGUAL_KEY, String(next))
    } catch {
      // Preference still applies for this session
    }
  }, [])

  return { language, setLanguage, bilingual, setBilingual }
}
