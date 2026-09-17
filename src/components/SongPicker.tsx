import { useState } from 'react'
import { songs } from '../data/songs'
import { useSavedSongs } from '../hooks/useSavedSongs'
import { parseSongText } from '../lib/parsers'
import { sourceLabel } from '../lib/customSong'
import VirtualList from './VirtualList'
import type { CustomSong, ImportedSong, Song } from '../types'

/** One row in the picker: a song already in the jam, a saved one, or a built-in. */
type Row =
  | { kind: 'custom'; song: CustomSong }
  | { kind: 'saved'; song: CustomSong }
  | { kind: 'builtin'; song: Song }

interface Props {
  currentSongId: string | null
  customSongs: CustomSong[]
  onSelect: (songId: string) => void
  onAddCustom: (song: ImportedSong) => void
}

/** The jam assigns its own id, so a saved song's local id isn't carried over. */
function stripId(song: CustomSong): ImportedSong {
  const copy: Partial<CustomSong> = { ...song }
  delete copy.id
  return copy as ImportedSong
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

  // One combined, virtualised list: songs in the jam, then saved, then built-ins
  const rows: Row[] = [
    ...filteredCustom.map((song): Row => ({ kind: 'custom', song })),
    ...uniqueSaved.map((song): Row => ({ kind: 'saved', song })),
    ...filtered.map((song): Row => ({ kind: 'builtin', song })),
  ]

  function handlePasteSubmit() {
    if (!pasteTitle.trim() || !pasteLyrics.trim()) return
    // A pasted SongSelect export still parses into proper sections
    const parsed = parseSongText(pasteLyrics)
    const song: ImportedSong = parsed
      ? { ...parsed, title: pasteTitle.trim() }
      : { title: pasteTitle.trim(), lyrics: pasteLyrics.trim(), source: 'pasted' }
    // Save to localStorage and add to jam
    addSavedSong(song)
    onAddCustom(song)
    setPasteTitle('')
    setPasteLyrics('')
    setPasting(false)
    setOpen(false)
  }

  function handleSelectSaved(song: CustomSong) {
    // Add to jam's custom songs via Firebase, then select it
    onAddCustom(stripId(song))
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
      <VirtualList
        className="song-list"
        items={rows}
        resetKey={search}
        getKey={(row) => `${row.kind}:${row.song.id}`}
        renderItem={(row) => {
          if (row.kind === 'builtin') {
            return (
              <button
                className={`song-item ${row.song.id === currentSongId ? 'active' : ''}`}
                onClick={() => {
                  onSelect(row.song.id)
                  setOpen(false)
                  setSearch('')
                }}
              >
                <span className="song-item-title">{row.song.title}</span>
                <span className="song-item-artist">{row.song.artist}</span>
              </button>
            )
          }
          if (row.kind === 'custom') {
            const songId = `custom:${row.song.id}`
            return (
              <button
                className={`song-item ${songId === currentSongId ? 'active' : ''}`}
                onClick={() => {
                  onSelect(songId)
                  setOpen(false)
                  setSearch('')
                }}
              >
                <span className="song-item-title">{row.song.title}</span>
                <span className="song-item-artist pasted-label">in jam</span>
              </button>
            )
          }
          return (
            <button className="song-item" onClick={() => handleSelectSaved(row.song)}>
              <span className="song-item-title">{row.song.title}</span>
              <span className="song-item-artist pasted-label">{sourceLabel(row.song)}</span>
            </button>
          )
        }}
      />
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
