import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSavedSongs } from '../hooks/useSavedSongs'
import { songs as builtInSongs } from '../data/songs'

export default function PrepJam() {
  const { savedSongs, addSavedSong, removeSavedSong } = useSavedSongs()
  const [pasting, setPasting] = useState(false)
  const [pasteTitle, setPasteTitle] = useState('')
  const [pasteLyrics, setPasteLyrics] = useState('')
  const navigate = useNavigate()

  function handlePaste() {
    if (!pasteTitle.trim() || !pasteLyrics.trim()) return
    addSavedSong(pasteTitle.trim(), pasteLyrics.trim())
    setPasteTitle('')
    setPasteLyrics('')
    setPasting(false)
  }

  return (
    <div className="prep-view">
      <header className="prep-header">
        <button className="icon-btn" onClick={() => navigate('/')} aria-label="Back">
          &larr;
        </button>
        <span className="prep-title">my songs</span>
        <div style={{ width: '2rem' }} />
      </header>

      <main className="prep-content">
        {pasting ? (
          <div className="prep-paste">
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
              rows={10}
            />
            <div className="paste-actions">
              <button onClick={handlePaste} disabled={!pasteTitle.trim() || !pasteLyrics.trim()}>
                save song
              </button>
              <button className="secondary" onClick={() => setPasting(false)}>
                cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <button className="prep-add-btn" onClick={() => setPasting(true)}>
              + paste new song
            </button>

            {savedSongs.length > 0 && (
              <div className="prep-section">
                <p className="prep-section-label">saved songs</p>
                <ul className="song-list">
                  {savedSongs.map((song) => (
                    <li key={song.id}>
                      <div className="song-item prep-song-item">
                        <div>
                          <span className="song-item-title">{song.title}</span>
                          <span className="song-item-artist pasted-label"> saved</span>
                        </div>
                        <button
                          className="icon-btn remove-btn"
                          onClick={() => removeSavedSong(song.id)}
                          aria-label={`Remove ${song.title}`}
                        >
                          &times;
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="prep-section">
              <p className="prep-section-label">built-in hymns ({builtInSongs.length})</p>
              <ul className="song-list">
                {builtInSongs.map((song) => (
                  <li key={song.id}>
                    <div className="song-item">
                      <span className="song-item-title">{song.title}</span>
                      <span className="song-item-artist">{song.artist}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
