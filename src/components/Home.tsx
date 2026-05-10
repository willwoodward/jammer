import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="home">
      <h1>worship</h1>
      <div className="home-actions">
        <button onClick={() => navigate('/create')}>start a jam</button>
        <button className="secondary" onClick={() => navigate('/join')}>
          join a jam
        </button>
      </div>
      <button className="link-btn" onClick={() => navigate('/prep')}>
        my songs
      </button>
    </div>
  )
}
