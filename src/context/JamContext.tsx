import { createContext, useContext, useEffect, useState, useCallback, useRef, type ReactNode } from 'react'
import { ref, set, onValue, remove, get, type Unsubscribe } from 'firebase/database'
import { db, isConfigured } from '../firebase'
import type { JamState } from '../types'

interface JamContextValue {
  jam: JamState | null
  createJam: () => string
  joinJam: (code: string) => boolean | Promise<boolean>
  selectSong: (songId: string) => void
  leaveJam: () => void
  synced: boolean
}

const JamContext = createContext<JamContextValue | null>(null)

function generateCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = ''
  for (let i = 0; i < 5; i++) {
    code += chars[Math.floor(Math.random() * chars.length)]
  }
  return code
}

const CHANNEL_NAME = 'worship-jam'

export function JamProvider({ children }: { children: ReactNode }) {
  const [jam, setJam] = useState<JamState | null>(null)
  const [synced, setSynced] = useState(false)
  const unsubRef = useRef<Unsubscribe | null>(null)
  const channelRef = useRef<BroadcastChannel | null>(null)

  // BroadcastChannel fallback for local dev (when Firebase isn't configured)
  useEffect(() => {
    if (isConfigured) return
    const ch = new BroadcastChannel(CHANNEL_NAME)
    channelRef.current = ch
    ch.onmessage = (event) => {
      const { type, songId, code } = event.data
      if (type === 'song-change') {
        setJam((prev) => {
          if (prev && prev.code === code) {
            return { ...prev, currentSongId: songId }
          }
          return prev
        })
      }
    }
    return () => ch.close()
  }, [])

  // Subscribe to Firebase jam when we have a code
  useEffect(() => {
    if (!isConfigured || !db || !jam?.code) return

    const jamRef = ref(db, `jams/${jam.code}`)
    const unsub = onValue(jamRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        setJam((prev) => prev ? { ...prev, currentSongId: data.currentSongId || null } : prev)
        setSynced(true)
      }
    })

    unsubRef.current = unsub
    return () => {
      unsub()
      unsubRef.current = null
    }
  }, [jam?.code])

  const createJam = useCallback(() => {
    const code = generateCode()
    setJam({ code, currentSongId: null, role: 'leader' })

    if (isConfigured && db) {
      set(ref(db, `jams/${code}`), {
        currentSongId: null,
        createdAt: Date.now(),
      })
    }

    return code
  }, [])

  const joinJam = useCallback(async (code: string): Promise<boolean> => {
    const upperCode = code.toUpperCase()

    // If Firebase is configured, check the jam exists
    if (isConfigured && db) {
      const snapshot = await get(ref(db, `jams/${upperCode}`))
      if (!snapshot.exists()) {
        return false
      }
      const data = snapshot.val()
      setJam({ code: upperCode, currentSongId: data.currentSongId || null, role: 'participant' })
    } else {
      setJam({ code: upperCode, currentSongId: null, role: 'participant' })
    }
    return true
  }, [])

  const selectSong = useCallback(
    (songId: string) => {
      setJam((prev) => (prev ? { ...prev, currentSongId: songId } : prev))

      if (isConfigured && db && jam) {
        set(ref(db, `jams/${jam.code}/currentSongId`), songId)
      } else if (channelRef.current && jam) {
        channelRef.current.postMessage({ type: 'song-change', songId, code: jam.code })
      }
    },
    [jam]
  )

  const leaveJam = useCallback(() => {
    // If leader, clean up the jam from Firebase
    if (isConfigured && db && jam?.role === 'leader') {
      remove(ref(db, `jams/${jam.code}`))
    }
    if (unsubRef.current) {
      unsubRef.current()
      unsubRef.current = null
    }
    setSynced(false)
    setJam(null)
  }, [jam])

  return (
    <JamContext.Provider value={{ jam, createJam, joinJam, selectSong, leaveJam, synced }}>
      {children}
    </JamContext.Provider>
  )
}

export function useJam() {
  const ctx = useContext(JamContext)
  if (!ctx) throw new Error('useJam must be used within JamProvider')
  return ctx
}
