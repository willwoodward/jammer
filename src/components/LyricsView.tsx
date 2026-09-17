import type { Section, Song, ViewMode } from '../types'

interface Props {
  song: Song
  viewMode: ViewMode
  /**
   * Shown in smaller type beneath each line, for reading two languages at
   * once. Paired by section and line index against the song's own sections.
   */
  secondary?: Section[]
  /** A quiet line under the title, e.g. when a translation isn't available. */
  note?: string
}

function renderChordLine(chords: { chord: string; position: number }[]): string {
  const sorted = [...chords].sort((a, b) => a.position - b.position)
  let line = ''
  let pos = 0
  for (const c of sorted) {
    while (pos < c.position) {
      line += ' '
      pos++
    }
    line += c.chord
    pos += c.chord.length
  }
  return line
}

export default function LyricsView({ song, viewMode, secondary, note }: Props) {
  return (
    <div className="lyrics">
      <h2 className="song-title">{song.title}</h2>
      <p className="song-artist">
        {song.artist}
        {viewMode === 'chords' && song.key && ` · ${song.key}`}
      </p>
      {note && <p className="song-note">{note}</p>}
      {song.sections.map((section, si) => {
        const otherLines = secondary?.[si]?.lines
        return (
          <div key={si} className="section">
            {section.label && <p className="section-label">{section.label}</p>}
            <div className="section-lines">
              {section.lines.map((line, li) => (
                <div key={li} className="line">
                  {viewMode === 'chords' && line.chords && line.chords.length > 0 && (
                    <pre className="chord-line">{renderChordLine(line.chords)}</pre>
                  )}
                  <p className="lyric-line">{line.text}</p>
                  {otherLines?.[li] && (
                    <p className="lyric-line secondary">{otherLines[li].text}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
