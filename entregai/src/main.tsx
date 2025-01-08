import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import NumEntregas from './pages/NumEntregas'
import Horarios from './pages/Horarios'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NumEntregas />
    <Horarios />
  </StrictMode>,
)
