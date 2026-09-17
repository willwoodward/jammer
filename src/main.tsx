import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { registerSW } from 'virtual:pwa-register'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Keeps an installed jammer up to date, and makes the app shell work offline.
// Nothing here is required for the app to run — if service workers are
// unavailable or blocked, jammer behaves exactly as it did before.
registerSW({ immediate: true })
