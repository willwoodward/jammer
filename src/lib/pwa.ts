/**
 * Progressive-web-app helpers.
 *
 * Saved songs live in localStorage, and that is deliberately still true whether
 * or not jammer is installed — nothing here changes where songs are stored.
 * What installation changes is how long the browser keeps them:
 *
 * Safari deletes all script-writable storage for a site you haven't opened in
 * seven days. A leader who imports a library and doesn't open jammer for a
 * fortnight would find it gone. Web apps added to the home screen are outside
 * Safari's counter, and `navigator.storage.persist()` asks other browsers not
 * to evict us either.
 *
 * Both are best-effort. If neither is granted, everything still works exactly
 * as before — the songs are just not protected from eviction, and we say so.
 */

export function isStandalone(): boolean {
  if (typeof window === 'undefined') return false
  // iOS Safari uses a non-standard flag rather than display-mode
  const iosStandalone = (window.navigator as Navigator & { standalone?: boolean }).standalone
  if (iosStandalone) return true
  return window.matchMedia?.('(display-mode: standalone)').matches ?? false
}

export function isIos(): boolean {
  if (typeof navigator === 'undefined') return false
  return (
    /iphone|ipad|ipod/i.test(navigator.userAgent) ||
    // iPadOS reports as a Mac, but with touch
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  )
}

/** Whether the browser has promised not to evict our storage. */
export async function isStoragePersisted(): Promise<boolean> {
  try {
    return (await navigator.storage?.persisted?.()) ?? false
  } catch {
    return false
  }
}

/**
 * Asks the browser to keep our storage. Chrome grants this based on engagement
 * signals such as being installed; Safari grants it for home-screen apps. A
 * refusal is normal and not an error — we fall back to ordinary storage.
 */
export async function requestPersistentStorage(): Promise<boolean> {
  try {
    if (await isStoragePersisted()) return true
    return (await navigator.storage?.persist?.()) ?? false
  } catch {
    return false
  }
}

export interface StorageEstimate {
  usage: number
  quota: number
}

export async function storageEstimate(): Promise<StorageEstimate | null> {
  try {
    const estimate = await navigator.storage?.estimate?.()
    if (!estimate) return null
    return { usage: estimate.usage ?? 0, quota: estimate.quota ?? 0 }
  } catch {
    return null
  }
}
