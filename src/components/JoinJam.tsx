import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useJam } from '../context/JamContext'

export default function JoinJam() {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [joining, setJoining] = useState(false)
  const { joinJam } = useJam()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  // Auto-join support for dev view
  useEffect(() => {
    const autoCode = searchParams.get('auto')
    if (autoCode) {
      joinJam(autoCode).then((ok) => {
        if (ok) navigate(`/jam/${autoCode}`)
      })
    }
  }, [searchParams, joinJam, navigate])

  async function handleJoin(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = code.trim()
    if (trimmed.length < 3) return

    setJoining(true)
    setError('')
    const ok = await joinJam(trimmed)
    setJoining(false)

    if (ok) {
      navigate(`/jam/${trimmed.toUpperCase()}`)
    } else {
      setError('jam not found')
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
          maxLength={5}
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
