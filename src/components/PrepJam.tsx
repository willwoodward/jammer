import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSavedSongs } from '../hooks/useSavedSongs'
import { songs as builtInSongs } from '../data/songs'
import { IMPORT_ACCEPT, importSongFiles, parseSongText } from '../lib/parsers'
import { downloadLibrary } from '../lib/library'
import { sourceLabel } from '../lib/customSong'
import { useInstallPrompt } from '../hooks/useInstallPrompt'
import { isIos } from '../lib/pwa'
import VirtualList from './VirtualList'
import TranslationEditor from './TranslationEditor'
import type { CustomSong } from '../types'

export default function PrepJam() {
  const {
    savedSongs,
    addSavedSong,
    addSavedSongs,
    removeSavedSong,
    setTranslation,
    removeTranslation,
    storageError,
  } = useSavedSongs()
  const [translating, setTranslating] = useState<CustomSong | null>(null)
  const [pasting, setPasting] = useState(false)
  const [pasteTitle, setPasteTitle] = useState('')
  const [pasteLyrics, setPasteLyrics] = useState('')
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null)
  const [importMessage, setImportMessage] = useState('')
  const [showHelp, setShowHelp] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const folderInputRef = useRef<HTMLInputElement>(null)
  const { canInstall, install, installed, persisted, ensurePersisted } = useInstallPrompt()
  const navigate = useNavigate()

  // `webkitdirectory` isn't in the React types, so it's set on the element
  useEffect(() => {
    folderInputRef.current?.setAttribute('webkitdirectory', '')
  }, [])

  function handlePaste() {
    if (!pasteTitle.trim() || !pasteLyrics.trim()) return
    // A pasted SongSelect export parses into proper sections
    const parsed = parseSongText(pasteLyrics)
    addSavedSong(
      parsed
        ? { ...parsed, title: pasteTitle.trim() }
        : { title: pasteTitle.trim(), lyrics: pasteLyrics.trim(), source: 'pasted' }
    )
    setPasteTitle('')
    setPasteLyrics('')
    setPasting(false)
  }

  async function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    // Let the same files be picked again after an import
    e.target.value = ''
    if (files.length === 0) return

    setProgress({ done: 0, total: files.length })
    setImportMessage('')

    const { songs, failed } = await importSongFiles(files, (done, total) =>
      setProgress({ done, total })
    )
    const summary = songs.length > 0 ? addSavedSongs(songs) : { added: 0, duplicates: 0, saved: true }
    setProgress(null)
    // Saving songs is the meaningful moment to ask the browser to keep them
    if (summary.added > 0) void ensurePersisted()

    const parts: string[] = []
    if (summary.added > 0) parts.push(`imported ${summary.added} song${summary.added === 1 ? '' : 's'}`)
    if (summary.duplicates > 0) parts.push(`skipped ${summary.duplicates} already in your songs`)
    if (failed.length > 0) {
      const names = failed.slice(0, 3).join(', ')
      const more = failed.length > 3 ? ` and ${failed.length - 3} more` : ''
      parts.push(`couldn't read ${failed.length}: ${names}${more}`)
    }
    setImportMessage(parts.join(' · ') || 'nothing to import')
  }

  const importing = progress !== null

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
        {translating ? (
          <TranslationEditor
            song={translating}
            onSave={(translation) => {
              setTranslation(translating.id, translation)
              setTranslating(null)
            }}
            onCancel={() => setTranslating(null)}
          />
        ) : pasting ? (
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
            <div className="prep-add-actions">
              <button className="prep-add-btn" onClick={() => setPasting(true)} disabled={importing}>
                + paste new song
              </button>
              <button
                className="prep-add-btn"
                onClick={() => fileInputRef.current?.click()}
                disabled={importing}
              >
                + import files
              </button>
              <button
                className="prep-add-btn"
                onClick={() => folderInputRef.current?.click()}
                disabled={importing}
              >
                + import folder
              </button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept={IMPORT_ACCEPT}
              multiple
              onChange={handleFiles}
              hidden
            />
            <input ref={folderInputRef} type="file" multiple onChange={handleFiles} hidden />

            <button className="link-btn prep-help-toggle" onClick={() => setShowHelp(!showHelp)}>
              {showHelp ? 'hide help' : 'where do I find these files?'}
            </button>

            {showHelp && <ImportHelp />}

            {importing && (
              <p className="prep-import-result">
                importing {progress.done} of {progress.total}...
              </p>
            )}
            {!importing && importMessage && <p className="prep-import-result">{importMessage}</p>}
            {storageError && <p className="prep-import-result error">{storageError}</p>}

            {savedSongs.length > 0 && persisted === false && (
              <StorageNotice canInstall={canInstall} install={install} installed={installed} />
            )}

            {savedSongs.length > 0 && (
              <div className="prep-section">
                <div className="prep-section-head">
                  <p className="prep-section-label">saved songs ({savedSongs.length})</p>
                  <button className="link-btn" onClick={() => downloadLibrary(savedSongs)}>
                    export
                  </button>
                </div>
                <VirtualList
                  className="song-list"
                  items={savedSongs}
                  getKey={(song) => song.id}
                  renderItem={(song) => (
                    <div className="song-item prep-song-item">
                      <div>
                        <span className="song-item-title">{song.title}</span>
                        <span className="song-item-artist pasted-label">
                          {' '}
                          {sourceLabel(song)}
                          {song.sections ? ` · ${song.sections.length} sections` : ''}
                        </span>
                      </div>
                      <div className="prep-song-actions">
                        {(song.translations ?? []).map((t) => (
                          <button
                            key={t.language}
                            className="language-chip"
                            onClick={() => removeTranslation(song.id, t.language)}
                            title={`Remove ${t.name} translation`}
                          >
                            {t.name} &times;
                          </button>
                        ))}
                        <button
                          className="language-chip add"
                          onClick={() => setTranslating(song)}
                          title={`Add a translation of ${song.title}`}
                        >
                          + language
                        </button>
                        <button
                          className="icon-btn remove-btn"
                          onClick={() => removeSavedSong(song.id)}
                          aria-label={`Remove ${song.title}`}
                        >
                          &times;
                        </button>
                      </div>
                    </div>
                  )}
                />
              </div>
            )}

            <div className="prep-section">
              <p className="prep-section-label">built-in hymns ({builtInSongs.length})</p>
              <VirtualList
                className="song-list"
                items={builtInSongs}
                getKey={(song) => song.id}
                renderItem={(song) => (
                  <div className="song-item">
                    <span className="song-item-title">{song.title}</span>
                    <span className="song-item-artist">{song.artist}</span>
                  </div>
                )}
              />
            </div>
          </>
        )}
      </main>
    </div>
  )
}

interface StorageNoticeProps {
  canInstall: boolean
  install: () => Promise<boolean>
  installed: boolean
}

/**
 * Shown only when the browser has not promised to keep our storage. Songs are
 * saved either way — this is about whether the browser might clear them later.
 */
function StorageNotice({ canInstall, install, installed }: StorageNoticeProps) {
  return (
    <div className="prep-storage-notice">
      <p className="prep-help-heading">keep your songs safe</p>
      <p>
        Your songs are saved in this browser. Browsers clear that storage
        sometimes &mdash; on iPhone, after about a week without opening jammer.
      </p>
      {installed ? (
        <p>
          jammer is installed, which usually protects them. Use <strong>export</strong>{' '}
          now and then for a copy you keep yourself.
        </p>
      ) : isIos() ? (
        <p>
          To stop that, add jammer to your Home Screen: tap the{' '}
          <strong>Share</strong> button, then <strong>Add to Home Screen</strong>.
          And use <strong>export</strong> for a copy you keep yourself.
        </p>
      ) : (
        <>
          <p>
            Installing jammer keeps them safe, and gives you an icon on your home
            screen. Either way, <strong>export</strong> gives you a copy you keep.
          </p>
          {canInstall && (
            <button className="prep-install-btn" onClick={() => void install()}>
              install jammer
            </button>
          )}
        </>
      )}
    </div>
  )
}

function ImportHelp() {
  return (
    <div className="prep-help">
      <p className="prep-help-heading">From SongSelect</p>
      <p>
        Open a song on SongSelect and use its download option, choosing a plain text
        format. Import the downloaded <code>.txt</code> (or an older <code>.usr</code>)
        here — the verses, authors and CCLI song number come across automatically.
      </p>

      <p className="prep-help-heading">From ProPresenter</p>
      <p>
        Your songs are files in your ProPresenter library folder on the computer
        ProPresenter runs on — one <code>.pro</code> file per song (or{' '}
        <code>.pro4</code>&ndash;<code>.pro6</code> on older versions). Use{' '}
        <strong>import folder</strong> to bring the whole library in at once, or{' '}
        <strong>import files</strong> to pick a few.
      </p>

      <p className="prep-help-heading">Getting songs onto the device you lead from</p>
      <p>
        Songs are saved in this browser on this device. If you import on the church
        computer but lead from your phone, the phone won't have them.
      </p>
      <p>
        Use <strong>export</strong> to save your songs as a single file, move it across
        however you like &mdash; AirDrop, OneDrive or Google Drive, a USB stick, or
        email it to yourself &mdash; then import that file on the other device.
      </p>

      <p className="prep-help-note">
        Everything is read on your device. No file and no lyric is uploaded anywhere.
      </p>
    </div>
  )
}
