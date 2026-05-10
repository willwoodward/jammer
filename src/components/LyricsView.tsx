import type { Song, ViewMode } from '../types'

interface Props {
  song: Song
  viewMode: ViewMode
}

function renderChordLine(text: string, chords: { chord: string; position: number }[]): string {
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

export default function LyricsView({ song, viewMode }: Props) {
  return (
    <div className="lyrics">
      <h2 className="song-title">{song.title}</h2>
      <p className="song-artist">{song.artist}{viewMode === 'chords' && ` · ${song.key}`}</p>
      {song.sections.map((section, si) => (
        <div key={si} className="section">
          {section.label && <p className="section-label">{section.label}</p>}
          <div className="section-lines">
            {section.lines.map((line, li) => (
              <div key={li} className="line">
                {viewMode === 'chords' && line.chords && line.chords.length > 0 && (
                  <pre className="chord-line">{renderChordLine(line.text, line.chords)}</pre>
                )}
                <p className="lyric-line">{line.text}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
