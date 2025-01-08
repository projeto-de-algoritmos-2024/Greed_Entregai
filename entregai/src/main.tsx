import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import NumEntregas from './pages/NumEntregas'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NumEntregas />
  </StrictMode>,
)
