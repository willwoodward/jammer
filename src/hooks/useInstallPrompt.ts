import { useCallback, useEffect, useState } from 'react'
import { isStandalone, isStoragePersisted, requestPersistentStorage } from '../lib/pwa'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

/**
 * Chrome and Edge fire `beforeinstallprompt`, which lets us offer installation
 * in-app. Safari has no equivalent, so there the UI falls back to telling the
 * user where "Add to Home Screen" lives.
 */
export function useInstallPrompt() {
  const [promptEvent, setPromptEvent] = useState<BeforeInstallPromptEvent | null>(null)
  const [installed, setInstalled] = useState(isStandalone)
  const [persisted, setPersisted] = useState<boolean | null>(null)

  useEffect(() => {
    function onBeforeInstall(e: Event) {
      e.preventDefault()
      setPromptEvent(e as BeforeInstallPromptEvent)
    }
    function onInstalled() {
      setInstalled(true)
      setPromptEvent(null)
      // Installation is the signal browsers use to grant durable storage
      requestPersistentStorage().then(setPersisted)
    }
    window.addEventListener('beforeinstallprompt', onBeforeInstall)
    window.addEventListener('appinstalled', onInstalled)
    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstall)
      window.removeEventListener('appinstalled', onInstalled)
    }
  }, [])

  useEffect(() => {
    isStoragePersisted().then(setPersisted)
  }, [])

  const install = useCallback(async () => {
    if (!promptEvent) return false
    await promptEvent.prompt()
    const { outcome } = await promptEvent.userChoice
    setPromptEvent(null)
    return outcome === 'accepted'
  }, [promptEvent])

  /** Called when songs are saved, so the request happens at a meaningful moment. */
  const ensurePersisted = useCallback(async () => {
    const ok = await requestPersistentStorage()
    setPersisted(ok)
    return ok
  }, [])

  return { canInstall: promptEvent !== null, install, installed, persisted, ensurePersisted }
}
