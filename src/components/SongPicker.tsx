import { useState } from 'react'
import { songs } from '../data/songs'
import { useSavedSongs } from '../hooks/useSavedSongs'
import type { CustomSong } from '../types'

interface Props {
  currentSongId: string | null
  customSongs: CustomSong[]
  onSelect: (songId: string) => void
  onAddCustom: (title: string, lyrics: string) => void
}

export default function SongPicker({ currentSongId, customSongs, onSelect, onAddCustom }: Props) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [pasting, setPasting] = useState(false)
  const [pasteTitle, setPasteTitle] = useState('')
  const [pasteLyrics, setPasteLyrics] = useState('')
  const { savedSongs, addSavedSong } = useSavedSongs()

  const lowerSearch = search.toLowerCase()

  const filtered = songs.filter(
    (s) =>
      s.title.toLowerCase().includes(lowerSearch) ||
      s.artist.toLowerCase().includes(lowerSearch)
  )

  const filteredCustom = customSongs.filter(
    (s) => s.title.toLowerCase().includes(lowerSearch)
  )

  const filteredSaved = savedSongs.filter(
    (s) => s.title.toLowerCase().includes(lowerSearch)
  )

  // Don't show saved songs that are already in the jam's custom songs
  const customTitles = new Set(customSongs.map((s) => s.title.toLowerCase()))
  const uniqueSaved = filteredSaved.filter((s) => !customTitles.has(s.title.toLowerCase()))

  function handlePasteSubmit() {
    if (!pasteTitle.trim() || !pasteLyrics.trim()) return
    // Save to localStorage and add to jam
    addSavedSong(pasteTitle.trim(), pasteLyrics.trim())
    onAddCustom(pasteTitle.trim(), pasteLyrics.trim())
    setPasteTitle('')
    setPasteLyrics('')
    setPasting(false)
    setOpen(false)
  }

  function handleSelectSaved(song: CustomSong) {
    // Add to jam's custom songs via Firebase, then select it
    onAddCustom(song.title, song.lyrics)
    setOpen(false)
    setSearch('')
  }

  if (!open) {
    return (
      <div className="song-picker-bar">
        <button className="song-picker-toggle" onClick={() => setOpen(true)}>
          {currentSongId ? 'change song' : 'pick a song'}
        </button>
      </div>
    )
  }

  if (pasting) {
    return (
      <div className="song-picker">
        <input
          type="text"
          value={pasteTitle}
          onChange={(e) => setPasteTitle(e.target.value)}
          placeholder="song title"
          autoFocus
          className="song-search"
        />
        <textarea
          value={pasteLyrics}
          onChange={(e) => setPasteLyrics(e.target.value)}
          placeholder="paste lyrics here..."
          className="paste-lyrics"
          rows={8}
        />
        <div className="paste-actions">
          <button onClick={handlePasteSubmit} disabled={!pasteTitle.trim() || !pasteLyrics.trim()}>
            add song
          </button>
          <button className="secondary" onClick={() => setPasting(false)}>
            back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="song-picker">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="search songs..."
        autoFocus
        className="song-search"
      />
      <ul className="song-list">
        {filteredCustom.map((song) => (
          <li key={`custom:${song.id}`}>
            <button
              className={`song-item ${`custom:${song.id}` === currentSongId ? 'active' : ''}`}
              onClick={() => {
                onSelect(`custom:${song.id}`)
                setOpen(false)
                setSearch('')
              }}
            >
              <span className="song-item-title">{song.title}</span>
              <span className="song-item-artist pasted-label">in jam</span>
            </button>
          </li>
        ))}
        {uniqueSaved.map((song) => (
          <li key={`saved:${song.id}`}>
            <button
              className="song-item"
              onClick={() => handleSelectSaved(song)}
            >
              <span className="song-item-title">{song.title}</span>
              <span className="song-item-artist pasted-label">saved</span>
            </button>
          </li>
        ))}
        {filtered.map((song) => (
          <li key={song.id}>
            <button
              className={`song-item ${song.id === currentSongId ? 'active' : ''}`}
              onClick={() => {
                onSelect(song.id)
                setOpen(false)
                setSearch('')
              }}
            >
              <span className="song-item-title">{song.title}</span>
              <span className="song-item-artist">{song.artist}</span>
            </button>
          </li>
        ))}
      </ul>
      <div className="picker-bottom">
        <button className="secondary" onClick={() => setPasting(true)}>
          paste lyrics
        </button>
        <button className="secondary" onClick={() => { setOpen(false); setSearch('') }}>
          cancel
        </button>
      </div>
    </div>
  )
}
