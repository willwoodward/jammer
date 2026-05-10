import type { CustomSong } from '../types'

interface Props {
  song: CustomSong
}

export default function CustomLyricsView({ song }: Props) {
  // Split lyrics into sections by blank lines
  const sections = song.lyrics
    .split(/\n\s*\n/)
    .map((s) => s.trim())
    .filter(Boolean)

  return (
    <div className="lyrics">
      <h2 className="song-title">{song.title}</h2>
      <p className="song-artist">pasted</p>
      {sections.map((section, si) => (
        <div key={si} className="section">
          <div className="section-lines">
            {section.split('\n').map((line, li) => (
              <div key={li} className="line">
                <p className="lyric-line">{line}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
