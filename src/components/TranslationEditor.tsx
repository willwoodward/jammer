import { useState } from 'react'
import { LANGUAGES, codeForCustomName } from '../lib/languages'
import { buildTranslation, type Alignment } from '../lib/translation'
import type { CustomSong, SongTranslation } from '../types'

interface Props {
  song: CustomSong
  onSave: (translation: SongTranslation) => void
  onCancel: () => void
}

const OTHER = 'other'

/**
 * Adds a singable translation to a song. Translations are supplied by the
 * church — there is no machine translation here, because a literal translation
 * doesn't fit the tune, and sending lyrics to a translation service would break
 * jammer's promise that nothing leaves your device.
 */
export default function TranslationEditor({ song, onSave, onCancel }: Props) {
  const [choice, setChoice] = useState(LANGUAGES[0].code)
  const [customName, setCustomName] = useState('')
  const [text, setText] = useState('')

  const name = choice === OTHER ? customName.trim() : LANGUAGES.find((l) => l.code === choice)!.name
  const code = choice === OTHER ? codeForCustomName(customName) : choice
  const ready = name !== '' && text.trim() !== ''

  const preview: Alignment | null = ready
    ? buildTranslation(song, code, name, text).alignment
    : null

  function handleSave() {
    if (!ready) return
    onSave(buildTranslation(song, code, name, text).translation)
  }

  return (
    <div className="translation-editor">
      <p className="prep-help-heading">translation of “{song.title}”</p>

      <select
        className="song-search"
        value={choice}
        onChange={(e) => setChoice(e.target.value)}
        aria-label="Language"
      >
        {LANGUAGES.map((l) => (
          <option key={l.code} value={l.code}>
            {l.name}
          </option>
        ))}
        <option value={OTHER}>other...</option>
      </select>

      {choice === OTHER && (
        <input
          type="text"
          className="song-search"
          value={customName}
          onChange={(e) => setCustomName(e.target.value)}
          placeholder="language name"
          autoFocus
        />
      )}

      <textarea
        className="paste-lyrics"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="paste the translated lyrics, with a blank line between each verse and chorus..."
        rows={10}
      />

      {preview && (
        <p className={`translation-alignment ${preview.matches ? 'ok' : 'warn'}`}>
          {preview.matches
            ? `${preview.translationCount} sections — matches the original`
            : `${preview.translationCount} section${preview.translationCount === 1 ? '' : 's'}, but the original has ${preview.originalCount}. It will still work, though the two won't line up verse for verse.`}
        </p>
      )}

      <div className="paste-actions">
        <button onClick={handleSave} disabled={!ready}>
          save translation
        </button>
        <button className="secondary" onClick={onCancel}>
          cancel
        </button>
      </div>
    </div>
  )
}
