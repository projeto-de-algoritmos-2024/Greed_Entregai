import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NumEntregas from './pages/NumEntregas'
import Horarios from './pages/Horarios'
import Resultado from './pages/Resultado';


// biome-ignore lint/style/noNonNullAssertion: <explanation>
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<NumEntregas />} />
        <Route path="/horarios" element={<Horarios />} />
        <Route path="/resultado" element={<Resultado />} />
      </Routes>
    </Router>
  </StrictMode>,
);
