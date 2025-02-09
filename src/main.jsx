import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/index.css'
import App from '@/App.jsx'
import Squares from './components/Squares/Squares.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className="app-wrapper">
      <Squares 
        speed={0.5} 
        squareSize={40}
        direction="diagonal"
        borderColor="#FFFFFF"
        hoverFillColor="#00B825"
      />
      <div className="app-content">
        <App />
      </div>
    </div>
  </StrictMode>,
)