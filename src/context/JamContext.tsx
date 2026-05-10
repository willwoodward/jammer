import { createContext, useContext, useEffect, useState, useCallback, useRef, type ReactNode } from 'react'
import { ref, set, onValue, remove, get, push, onDisconnect, type Unsubscribe } from 'firebase/database'
import { db, isConfigured } from '../firebase'
import type { JamState, CustomSong } from '../types'

interface JamContextValue {
  jam: JamState | null
  memberCount: number
  createJam: () => string
  joinJam: (code: string) => boolean | Promise<boolean>
  selectSong: (songId: string) => void
  addCustomSong: (title: string, lyrics: string) => void
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
  const [memberCount, setMemberCount] = useState(0)
  const unsubRef = useRef<Unsubscribe | null>(null)
  const memberUnsubRef = useRef<Unsubscribe | null>(null)
  const customSongsUnsubRef = useRef<Unsubscribe | null>(null)
  const memberRefPath = useRef<string | null>(null)
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

  // Track members: add self on join, auto-remove on disconnect
  useEffect(() => {
    if (!isConfigured || !db || !jam?.code) return

    const membersRef = ref(db, `jams/${jam.code}/members`)
    const myRef = push(membersRef)
    set(myRef, true)
    onDisconnect(myRef).remove()
    memberRefPath.current = myRef.toString()

    const unsub = onValue(membersRef, (snapshot) => {
      const data = snapshot.val()
      setMemberCount(data ? Object.keys(data).length : 0)
    })

    memberUnsubRef.current = unsub

    return () => {
      remove(myRef)
      unsub()
      memberUnsubRef.current = null
      memberRefPath.current = null
    }
  }, [jam?.code])

  // Subscribe to custom songs
  useEffect(() => {
    if (!isConfigured || !db || !jam?.code) return

    const customSongsRef = ref(db, `jams/${jam.code}/customSongs`)
    const unsub = onValue(customSongsRef, (snapshot) => {
      const data = snapshot.val()
      const songs: CustomSong[] = data
        ? Object.entries(data).map(([id, val]: [string, any]) => ({
            id,
            title: val.title,
            lyrics: val.lyrics,
          }))
        : []
      setJam((prev) => prev ? { ...prev, customSongs: songs } : prev)
    })

    customSongsUnsubRef.current = unsub
    return () => {
      unsub()
      customSongsUnsubRef.current = null
    }
  }, [jam?.code])

  const createJam = useCallback(() => {
    const code = generateCode()
    setJam({ code, currentSongId: null, role: 'leader', customSongs: [] })

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

    // Check if joining as assistant (code ends with -A)
    const isAssistant = upperCode.endsWith('-A')
    const jamCode = isAssistant ? upperCode.slice(0, -2) : upperCode
    const role = isAssistant ? 'assistant' : 'participant'

    if (isConfigured && db) {
      const snapshot = await get(ref(db, `jams/${jamCode}`))
      if (!snapshot.exists()) {
        return false
      }
      const data = snapshot.val()
      setJam({ code: jamCode, currentSongId: data.currentSongId || null, role, customSongs: [] })
    } else {
      setJam({ code: jamCode, currentSongId: null, role, customSongs: [] })
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

  const addCustomSong = useCallback(
    (title: string, lyrics: string) => {
      if (!jam) return

      if (isConfigured && db) {
        const customSongsRef = ref(db, `jams/${jam.code}/customSongs`)
        const newRef = push(customSongsRef)
        const id = newRef.key!
        set(newRef, { title, lyrics })
        // Auto-select the new song
        const songId = `custom:${id}`
        set(ref(db, `jams/${jam.code}/currentSongId`), songId)
        setJam((prev) => prev ? { ...prev, currentSongId: songId } : prev)
      } else {
        // Local fallback
        const id = Date.now().toString()
        const songId = `custom:${id}`
        setJam((prev) =>
          prev
            ? {
                ...prev,
                currentSongId: songId,
                customSongs: [...prev.customSongs, { id, title, lyrics }],
              }
            : prev
        )
        if (channelRef.current && jam) {
          channelRef.current.postMessage({ type: 'song-change', songId, code: jam.code })
        }
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
    if (memberUnsubRef.current) {
      memberUnsubRef.current()
      memberUnsubRef.current = null
    }
    if (customSongsUnsubRef.current) {
      customSongsUnsubRef.current()
      customSongsUnsubRef.current = null
    }
    setMemberCount(0)
    setSynced(false)
    setJam(null)
  }, [jam])

  return (
    <JamContext.Provider value={{ jam, memberCount, createJam, joinJam, selectSong, addCustomSong, leaveJam, synced }}>
      {children}
    </JamContext.Provider>
  )
}

export function useJam() {
  const ctx = useContext(JamContext)
  if (!ctx) throw new Error('useJam must be used within JamProvider')
  return ctx
}
