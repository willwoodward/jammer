import { useEffect, useState } from 'react'
import QRCode from 'qrcode'
import { joinUrl } from '../lib/joinUrl'

interface Props {
  code: string
  onClose: () => void
}

export default function QrModal({ code, onClose }: Props) {
  const [svg, setSvg] = useState('')
  const [copied, setCopied] = useState(false)
  const url = joinUrl(code)

  useEffect(() => {
    let cancelled = false
    QRCode.toString(url, {
      type: 'svg',
      margin: 2,
      errorCorrectionLevel: 'M',
      color: { dark: '#000000', light: '#ffffff' },
    })
      .then((s) => { if (!cancelled) setSvg(s) })
      .catch(() => { if (!cancelled) setSvg('') })
    return () => { cancelled = true }
  }, [url])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard unavailable — the code is on screen anyway
    }
  }

  return (
    <div
      className="qr-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Join code ${code}`}
    >
      <div className="qr-card" onClick={(e) => e.stopPropagation()}>
        {svg ? (
          <div className="qr-image" dangerouslySetInnerHTML={{ __html: svg }} />
        ) : (
          <div className="qr-image qr-image-empty" />
        )}
        <p className="qr-code-text">{code}</p>
        <p className="qr-hint">scan to join</p>
        <div className="qr-actions">
          <button className="qr-btn" onClick={handleCopy}>
            {copied ? 'link copied' : 'copy link'}
          </button>
          <button className="qr-btn" onClick={onClose}>done</button>
        </div>
      </div>
    </div>
  )
}
