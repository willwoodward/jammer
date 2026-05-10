import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useJam } from '../context/JamContext'
import { songs } from '../data/songs'
import LyricsView from './LyricsView'
import CustomLyricsView from './CustomLyricsView'
import SongPicker from './SongPicker'
import { HiOutlineUsers } from 'react-icons/hi2'
import type { ViewMode, Theme } from '../types'

export default function JamView() {
  const { code } = useParams<{ code: string }>()
  const { jam, memberCount, selectSong, addCustomSong, leaveJam } = useJam()
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

  const isCustom = jam.currentSongId?.startsWith('custom:')
  const currentSong = jam.currentSongId
    ? isCustom
      ? null
      : songs.find((s) => s.id === jam.currentSongId)
    : null
  const currentCustomSong = isCustom
    ? jam.customSongs.find((s) => s.id === jam.currentSongId!.replace('custom:', ''))
    : null

  const canPickSongs = jam.role !== 'participant'

  return (
    <div className="jam-view">
      <header className="jam-header">
        <button className="icon-btn" onClick={leaveJam} title="Leave jam" aria-label="Leave jam">
          &larr;
        </button>
        <div className="jam-codes">
          <span className="jam-code">
            {jam.code}
            {memberCount > 0 && <span className="member-count"><HiOutlineUsers /> {memberCount}</span>}
          </span>
          {jam.role === 'leader' && (
            <span className="jam-code assistant-code">{jam.code}-A</span>
          )}
        </div>
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
        ) : currentCustomSong ? (
          <CustomLyricsView song={currentCustomSong} />
        ) : (
          <div className="empty-state">
            {canPickSongs ? (
              <p>pick a song to get started</p>
            ) : (
              <p>waiting for a song...</p>
            )}
          </div>
        )}
      </main>

      {canPickSongs && (
        <footer className="jam-footer">
          <SongPicker
            currentSongId={jam.currentSongId}
            customSongs={jam.customSongs}
            onSelect={selectSong}
            onAddCustom={addCustomSong}
          />
        </footer>
      )}
    </div>
  )
}
