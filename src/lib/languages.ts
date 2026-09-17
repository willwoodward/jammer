/**
 * Languages offered when adding a translation.
 *
 * The list exists so the same language gets the same code across songs — a
 * viewer who picks Polish once should stay in Polish for every song that has
 * it. Names are written in the language itself, since the person choosing it
 * is reading in that language.
 */
export interface Language {
  code: string
  name: string
}

/** The language songs are assumed to be in when they don't say otherwise. */
export const DEFAULT_LANGUAGE = 'en'

export const LANGUAGES: Language[] = [
  { code: 'en', name: 'English' },
  { code: 'pl', name: 'Polski' },
  { code: 'ro', name: 'Română' },
  { code: 'pt', name: 'Português' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'it', name: 'Italiano' },
  { code: 'uk', name: 'Українська' },
  { code: 'ru', name: 'Русский' },
  { code: 'zh', name: '中文' },
  { code: 'ko', name: '한국어' },
  { code: 'ta', name: 'தமிழ்' },
  { code: 'ml', name: 'മലയാളം' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'ur', name: 'اردو' },
  { code: 'ar', name: 'العربية' },
  { code: 'fa', name: 'فارسی' },
  { code: 'tl', name: 'Tagalog' },
  { code: 'sw', name: 'Kiswahili' },
  { code: 'yo', name: 'Yorùbá' },
  { code: 'tw', name: 'Twi' },
]

/** Right-to-left languages need their lyrics laid out accordingly. */
const RTL = new Set(['ar', 'fa', 'ur', 'he'])

export function isRtl(code: string): boolean {
  return RTL.has(code)
}

export function languageName(code: string): string {
  const known = LANGUAGES.find((l) => l.code === code)
  if (known) return known.name
  // Languages added by hand are stored as x-slug — read it back out
  if (code.startsWith('x-')) {
    return code
      .slice(2)
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }
  return code
}

/** Codes for languages added by hand, so they stay stable and unique. */
export function codeForCustomName(name: string): string {
  const slug = name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  return slug ? `x-${slug}` : 'x-other'
}
