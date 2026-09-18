import { useState, useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useJam } from '../context/JamContext'

export default function JoinJam() {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [joining, setJoining] = useState(false)
  const { joinJam } = useJam()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const autoTried = useRef(false)

  // Auto-join from a scanned QR code (and the dev view)
  useEffect(() => {
    const autoCode = searchParams.get('auto')
    if (!autoCode || autoTried.current) return
    autoTried.current = true
    setJoining(true)
    joinJam(autoCode)
      .then((ok) => {
        if (ok) {
          navigate(`/jam/${autoCode.toUpperCase().replace(/-A$/, '')}`)
          return
        }
        setCode(autoCode.toUpperCase())
        setError('jam not found')
      })
      .catch(() => {
        setCode(autoCode.toUpperCase())
        setError('jam not found')
      })
      .finally(() => setJoining(false))
  }, [searchParams, joinJam, navigate])

  async function handleJoin(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = code.trim()
    if (trimmed.length < 3) return

    setJoining(true)
    setError('')
    try {
      if (await joinJam(trimmed)) {
        navigate(`/jam/${trimmed.toUpperCase().replace(/-A$/, '')}`)
        return
      }
      setError('jam not found')
    } finally {
      // Never leave the button stuck on "joining..."
      setJoining(false)
    }
  }

  return (
    <div className="home">
      <form onSubmit={handleJoin}>
        <input
          type="text"
          value={code}
          onChange={(e) => { setCode(e.target.value.toUpperCase()); setError('') }}
          placeholder="enter code"
          maxLength={7}
          autoFocus
          autoComplete="off"
          className="code-input"
        />
        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={code.trim().length < 3 || joining}>
          {joining ? 'joining...' : 'join'}
        </button>
      </form>
    </div>
  )
}
