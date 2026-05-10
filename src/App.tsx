import { HashRouter, Routes, Route } from 'react-router-dom'
import { JamProvider } from './context/JamContext'
import Home from './components/Home'
import CreateJam from './components/CreateJam'
import JoinJam from './components/JoinJam'
import JamView from './components/JamView'
import DevView from './components/DevView'

export default function App() {
  return (
    <JamProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateJam />} />
          <Route path="/join" element={<JoinJam />} />
          <Route path="/jam/:code" element={<JamView />} />
          <Route path="/dev" element={<DevView />} />
        </Routes>
      </HashRouter>
    </JamProvider>
  )
}
