import { useState } from 'react'

export default function DevView() {
  const [jamCode, setJamCode] = useState('')
  const [started, setStarted] = useState(false)

  // Leader creates a jam in the left pane; we grab the code from the URL
  // and use it in the right pane to join as participant
  function handleLeaderLoad(iframe: HTMLIFrameElement | null) {
    if (!iframe) return
    // Poll for the jam code in the leader iframe URL
    const interval = setInterval(() => {
      try {
        const path = iframe.contentWindow?.location.pathname
        if (path && path.startsWith('/jam/')) {
          const code = path.split('/jam/')[1]
          if (code && code !== jamCode) {
            setJamCode(code)
          }
        }
      } catch {
        // cross-origin - won't happen for same-origin iframes
      }
    }, 500)
    return () => clearInterval(interval)
  }

  if (!started) {
    return (
      <div className="dev-launcher">
        <h2>dev mode</h2>
        <p>opens leader + participant side by side</p>
        <p className="subtle">songs sync between views via BroadcastChannel</p>
        <button onClick={() => setStarted(true)}>launch</button>
      </div>
    )
  }

  return (
    <div className="dev-view">
      <div className="dev-pane">
        <div className="dev-label">leader</div>
        <iframe src="/create" ref={handleLeaderLoad} title="Leader view" />
      </div>
      <div className="dev-pane">
        <div className="dev-label">participant</div>
        {jamCode ? (
          <iframe src={`/join?auto=${jamCode}`} title="Participant view" />
        ) : (
          <div className="dev-waiting">waiting for leader to create jam...</div>
        )}
      </div>
    </div>
  )
}
