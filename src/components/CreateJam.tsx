import { useNavigate } from 'react-router-dom'
import { useJam } from '../context/JamContext'

export default function CreateJam() {
  const { createJam } = useJam()
  const navigate = useNavigate()

  function handleStart() {
    const code = createJam()
    navigate(`/jam/${code}`)
  }

  return (
    <div className="home">
      <p className="subtle">you'll get a code to share with your group</p>
      <button onClick={handleStart}>start jam</button>
    </div>
  )
}
