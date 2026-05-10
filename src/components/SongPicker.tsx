import { useState } from 'react'
import { songs } from '../data/songs'

interface Props {
  currentSongId: string | null
  onSelect: (songId: string) => void
}

export default function SongPicker({ currentSongId, onSelect }: Props) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')

  const filtered = songs.filter(
    (s) =>
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.artist.toLowerCase().includes(search.toLowerCase())
  )

  if (!open) {
    return (
      <div className="song-picker-bar">
        <button className="song-picker-toggle" onClick={() => setOpen(true)}>
          {currentSongId ? 'change song' : 'pick a song'}
        </button>
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
      <button className="secondary" onClick={() => { setOpen(false); setSearch('') }}>
        cancel
      </button>
    </div>
  )
}
