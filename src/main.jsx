import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { recordVisit } from './lib/visitor.js'
import App from './App.jsx'

recordVisit()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
