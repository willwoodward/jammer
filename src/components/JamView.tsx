import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useJam } from '../context/JamContext'
import { songs } from '../data/songs'
import LyricsView from './LyricsView'
import SongPicker from './SongPicker'
import { HiOutlineUsers } from 'react-icons/hi2'
import type { ViewMode, Theme } from '../types'

export default function JamView() {
  const { code } = useParams<{ code: string }>()
  const { jam, memberCount, selectSong, leaveJam } = useJam()
  const navigate = useNavigate()
  const [viewMode, setViewMode] = useState<ViewMode>('lyrics')
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('worship-theme') as Theme) ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    }
    return 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('worship-theme', theme)
  }, [theme])

  // If no jam state, redirect home
  useEffect(() => {
    if (!jam) {
      navigate('/')
    }
  }, [jam, navigate])

  if (!jam) return null

  const currentSong = jam.currentSongId ? songs.find((s) => s.id === jam.currentSongId) : null

  return (
    <div className="jam-view">
      <header className="jam-header">
        <button className="icon-btn" onClick={leaveJam} title="Leave jam" aria-label="Leave jam">
          &larr;
        </button>
        <span className="jam-code">
          {jam.code}
          {memberCount > 0 && <span className="member-count"><HiOutlineUsers /> {memberCount}</span>}
        </span>
        <div className="header-controls">
          <button
            className={`view-toggle ${viewMode === 'chords' ? 'active' : ''}`}
            onClick={() => setViewMode(viewMode === 'lyrics' ? 'chords' : 'lyrics')}
          >
            {viewMode === 'lyrics' ? 'chords' : 'lyrics'}
          </button>
          <button
            className="icon-btn theme-toggle"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? '◐' : '◑'}
          </button>
        </div>
      </header>

      <main className="jam-content">
        {currentSong ? (
          <LyricsView song={currentSong} viewMode={viewMode} />
        ) : (
          <div className="empty-state">
            {jam.role === 'leader' ? (
              <p>pick a song to get started</p>
            ) : (
              <p>waiting for a song...</p>
            )}
          </div>
        )}
      </main>

      {jam.role === 'leader' && (
        <footer className="jam-footer">
          <SongPicker currentSongId={jam.currentSongId} onSelect={selectSong} />
        </footer>
      )}
    </div>
  )
}
