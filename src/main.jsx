import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { completedForm, landingState, recordVisit } from './lib/visitor.js'
import App from './App.jsx'
import ShortLanding from './ShortLanding.jsx'

// The full landing the first time; a short, plain page when the visitor
// comes back or is already on the waiting list (lib/visitor.js). Someone
// with a session but no form (the team, beta accounts) keeps the full one.
const state = landingState(recordVisit())
const short = state === 'recurrente' || (state === 'registrado' && completedForm() === 'waitlist')
const Landing = short ? ShortLanding : App

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Landing />
  </StrictMode>,
)
