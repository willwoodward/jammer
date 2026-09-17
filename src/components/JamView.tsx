import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useJam } from '../context/JamContext'
import { songs } from '../data/songs'
import LyricsView from './LyricsView'
import CustomLyricsView from './CustomLyricsView'
import SongPicker from './SongPicker'
import QrModal from './QrModal'
import { HiOutlineUsers, HiOutlineQrCode } from 'react-icons/hi2'
import {
  asSong,
  availableTranslations,
  localise,
  originalSections,
  translationFor,
  ORIGINAL,
} from '../lib/customSong'
import { DEFAULT_LANGUAGE, isRtl, languageName } from '../lib/languages'
import { useLanguage } from '../hooks/useLanguage'
import type { ViewMode, Theme } from '../types'

export default function JamView() {
  const { jam, memberCount, selectSong, addCustomSong, leaveJam } = useJam()
  const navigate = useNavigate()
  const [viewMode, setViewMode] = useState<ViewMode>('lyrics')
  const [showQr, setShowQr] = useState(false)
  const { language, setLanguage, bilingual, setBilingual } = useLanguage()
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
  const builtInSong = jam.currentSongId && !isCustom
    ? songs.find((s) => s.id === jam.currentSongId)
    : undefined
  const currentSong = builtInSong ? localise(builtInSong, language) : null
  const currentCustomSong = isCustom
    ? jam.customSongs.find((s) => s.id === jam.currentSongId!.replace('custom:', ''))
    : null
  // Imported songs that parsed into sections render exactly like a built-in hymn
  const currentCustomAsSong = currentCustomSong ? asSong(currentCustomSong, language) : null

  // Each viewer picks their own language, so this never touches jam state
  const translatable = currentCustomSong ?? builtInSong
  const translations = availableTranslations(translatable)
  const activeTranslation = translatable ? translationFor(translatable, language) : undefined
  const showingTranslation = activeTranslation !== undefined
  // In bilingual mode the original sits in smaller type beneath each line
  const secondary =
    bilingual && translatable
      ? originalSections(translatable, language, activeTranslation)
      : undefined
  // The base lyrics are almost always English, but a church can import a song
  // in another language and translate it — so the song says which it is
  const baseLanguage = translatable?.language ?? DEFAULT_LANGUAGE
  // Explains why someone who chose a language is reading the base lyrics,
  // rather than letting them think their choice was lost
  const languageNote =
    language !== ORIGINAL && !showingTranslation && translatable
      ? `no ${languageName(language)} for this song`
      : undefined

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
          {showingTranslation && (
            <button
              className={`view-toggle ${bilingual ? 'active' : ''}`}
              onClick={() => setBilingual(!bilingual)}
              title="Show the original underneath"
            >
              both
            </button>
          )}
          {translations.length > 0 && (
            <select
              className="language-select"
              value={showingTranslation ? language : ORIGINAL}
              onChange={(e) => setLanguage(e.target.value)}
              aria-label="Language"
            >
              <option value={ORIGINAL}>{languageName(baseLanguage)}</option>
              {translations.map((t) => (
                <option key={t.language} value={t.language}>
                  {t.name}
                </option>
              ))}
            </select>
          )}
          <button
            className="icon-btn"
            onClick={() => setShowQr(true)}
            title="Show join QR code"
            aria-label="Show join QR code"
          >
            <HiOutlineQrCode />
          </button>
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
          <div dir={showingTranslation && isRtl(language) ? 'rtl' : undefined}>
            <LyricsView
              song={currentSong}
              viewMode={viewMode}
              secondary={secondary}
              note={languageNote}
            />
          </div>
        ) : currentCustomAsSong ? (
          <div dir={showingTranslation && isRtl(language) ? 'rtl' : undefined}>
            <LyricsView
              song={currentCustomAsSong}
              viewMode={viewMode}
              secondary={secondary}
              note={languageNote}
            />
          </div>
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

      {showQr && <QrModal code={jam.code} onClose={() => setShowQr(false)} />}
    </div>
  )
}
