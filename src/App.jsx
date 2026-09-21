import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import WaitlistPage from './pages/WaitlistPage.jsx'

// AndRho — under-construction landing page (see PRODUCT.md > Design).
// Full marketing site comes back once the backend is ready; for now this
// site's only job is: say we're under construction, explain the "why", and
// collect the waiting list (its own page, see WaitlistPage.jsx).
export default function App() {
  return (
    <div className="overflow-x-hidden antialiased">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/waitlist" element={<WaitlistPage />} />
      </Routes>
    </div>
  )
}
